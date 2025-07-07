import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_SECRET_KEY,
});

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizData {
  lessonTitle: string;
  questions: QuizQuestion[];
}

export async function POST(request: NextRequest) {
  try {
    const { answers, lessonId, userId, quizData }: {
      answers: Array<{ questionId: number; selectedAnswer: number }>;
      lessonId: number;
      userId: string;
      quizData: QuizData;
    } = await request.json();

    // Calculate score
    let correctAnswers = 0;
    const feedback = [];

    for (const answer of answers) {
      const question = quizData.questions.find((q: QuizQuestion) => q.id === answer.questionId);
      if (question && answer.selectedAnswer === question.correctAnswer) {
        correctAnswers++;
        feedback.push({
          questionId: answer.questionId,
          correct: true,
          explanation: question.explanation,
          message: "Great job! You understand this concept well."
        });
      } else {
        feedback.push({
          questionId: answer.questionId,
          correct: false,
          explanation: question?.explanation || "Review the lesson material for this topic.",
          message: "Let's review this concept together."
        });
      }
    }

    const score = (correctAnswers / answers.length) * 100;

    // Generate personalized feedback using AI
    const systemPrompt = `You are an expert tenant rights educator providing personalized feedback on quiz performance. 

The student scored ${score}% on a quiz about ${quizData.lessonTitle || 'tenant rights'}.

Provide encouraging, constructive feedback that:
1. Acknowledges their strengths
2. Identifies areas for improvement
3. Suggests specific study strategies
4. Motivates continued learning
5. Relates the concepts to real-world situations

Keep the tone supportive and educational.`;

    const userPrompt = `Quiz Results:
- Score: ${score}%
- Correct answers: ${correctAnswers}/${answers.length}
- Lesson: ${quizData.lessonTitle || 'Tenant Rights'}

Please provide personalized feedback and study recommendations.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      max_tokens: 300,
      temperature: 0.7,
    });

    const aiFeedback = completion.choices[0]?.message?.content || 'Great effort! Keep studying and you\'ll master these concepts.';

    // Determine proficiency level
    let proficiencyLevel = 'Beginner';
    if (score >= 90) proficiencyLevel = 'Expert';
    else if (score >= 80) proficiencyLevel = 'Advanced';
    else if (score >= 70) proficiencyLevel = 'Intermediate';
    else if (score >= 60) proficiencyLevel = 'Basic';

    // Log assessment results
    console.log('Quiz Assessment:', {
      userId,
      lessonId,
      score,
      proficiencyLevel,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      score,
      correctAnswers,
      totalQuestions: answers.length,
      proficiencyLevel,
      feedback,
      aiFeedback,
      recommendations: generateRecommendations(score, feedback),
      nextSteps: generateNextSteps(score, lessonId),
    });

  } catch (error: unknown) {
    console.error("Error processing quiz assessment:", error);
    return NextResponse.json(
      { error: "Failed to process assessment" },
      { status: 500 }
    );
  }
}

function generateRecommendations(score: number, feedback: Array<{
  questionId: number;
  correct: boolean;
  explanation: string;
  message: string;
}>) {
  const recommendations = [];
  
  if (score < 70) {
    recommendations.push('Review the lesson video again');
    recommendations.push('Complete the interactive scenarios');
    recommendations.push('Download and study the lesson materials');
  }
  
  if (score >= 70 && score < 90) {
    recommendations.push('Practice with real-world scenarios');
    recommendations.push('Review specific areas of confusion');
    recommendations.push('Take the advanced quiz if available');
  }
  
  if (score >= 90) {
    recommendations.push('Excellent! Consider helping other learners');
    recommendations.push('Move to the next lesson');
    recommendations.push('Apply your knowledge to real situations');
  }

  return recommendations;
}

function generateNextSteps(score: number, lessonId: number) {
  if (score >= 70) {
    return {
      action: 'proceed',
      message: 'You\'re ready for the next lesson!',
      nextLesson: lessonId + 1,
    };
  } else {
    return {
      action: 'review',
      message: 'Let\'s review this lesson to strengthen your understanding.',
      resources: ['video', 'scenarios', 'materials'],
    };
  }
} 