"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Trophy,
  Star,
  Target,
  BookOpen,
  CheckCircle2,
  Lock,
  Play,
  Award,
  Zap,
  Brain,
  Clock,
} from "lucide-react"
import Link from "next/link"

interface Quiz {
  id: string
  title: string
  description: string
  category: "tenant-rights" | "lease-terms" | "legal-basics" | "maintenance"
  difficulty: "beginner" | "intermediate" | "advanced"
  questions: Question[]
  timeLimit: number
  points: number
  isUnlocked: boolean
  isCompleted: boolean
  bestScore?: number
}

interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  points: number
}

interface UserProgress {
  totalPoints: number
  level: number
  streak: number
  completedQuizzes: string[]
  badges: string[]
  weeklyGoal: number
  weeklyProgress: number
}

export default function LearnPage() {
  const [userProgress, setUserProgress] = useState<UserProgress>({
    totalPoints: 1250,
    level: 5,
    streak: 7,
    completedQuizzes: ["1", "2", "3"],
    badges: ["first-quiz", "week-streak", "tenant-rights-expert"],
    weeklyGoal: 5,
    weeklyProgress: 3,
  })

  const [quizzes, setQuizzes] = useState<Quiz[]>([
    {
      id: "1",
      title: "Tenant Rights Basics",
      description: "Learn your fundamental rights as a tenant",
      category: "tenant-rights",
      difficulty: "beginner",
      timeLimit: 10,
      points: 100,
      isUnlocked: true,
      isCompleted: true,
      bestScore: 85,
      questions: [
        {
          id: "q1",
          question: "What is the maximum amount a landlord can charge for a security deposit in most states?",
          options: ["1 month's rent", "2 months' rent", "3 months' rent", "No limit"],
          correctAnswer: 1,
          explanation: "Most states limit security deposits to 1-2 months' rent, with many capping it at 2 months.",
          points: 20,
        },
      ],
    },
    {
      id: "2",
      title: "Understanding Lease Clauses",
      description: "Decode common lease terms and conditions",
      category: "lease-terms",
      difficulty: "intermediate",
      timeLimit: 15,
      points: 150,
      isUnlocked: true,
      isCompleted: true,
      bestScore: 92,
      questions: [],
    },
    {
      id: "3",
      title: "Maintenance Responsibilities",
      description: "Know what repairs are your responsibility vs. your landlord's",
      category: "maintenance",
      difficulty: "beginner",
      timeLimit: 12,
      points: 120,
      isUnlocked: true,
      isCompleted: true,
      bestScore: 78,
      questions: [],
    },
    {
      id: "4",
      title: "Eviction Process & Protection",
      description: "Understand eviction laws and your rights",
      category: "legal-basics",
      difficulty: "advanced",
      timeLimit: 20,
      points: 200,
      isUnlocked: true,
      isCompleted: false,
      questions: [],
    },
    {
      id: "5",
      title: "Rent Control & Increases",
      description: "Learn about rent control laws and legal increases",
      category: "legal-basics",
      difficulty: "intermediate",
      timeLimit: 15,
      points: 150,
      isUnlocked: false,
      isCompleted: false,
      questions: [],
    },
  ])

  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [quizScore, setQuizScore] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(0)

  const badges = [
    { id: "first-quiz", name: "First Steps", description: "Completed your first quiz", icon: "🎯" },
    { id: "week-streak", name: "Week Warrior", description: "7-day learning streak", icon: "🔥" },
    { id: "tenant-rights-expert", name: "Rights Expert", description: "Mastered tenant rights", icon: "⚖️" },
    { id: "perfect-score", name: "Perfectionist", description: "Got 100% on a quiz", icon: "💯" },
    { id: "speed-learner", name: "Speed Learner", description: "Completed quiz in record time", icon: "⚡" },
  ]

  const startQuiz = (quiz: Quiz) => {
    if (!quiz.isUnlocked) return
    setCurrentQuiz(quiz)
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setQuizScore(0)
    setTimeRemaining(quiz.timeLimit * 60) // Convert to seconds
  }

  const submitAnswer = () => {
    if (selectedAnswer === null || !currentQuiz) return

    const currentQuestion = currentQuiz.questions[currentQuestionIndex]
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer

    if (isCorrect) {
      setQuizScore((prev) => prev + currentQuestion.points)
    }

    setShowExplanation(true)
  }

  const nextQuestion = () => {
    if (!currentQuiz) return

    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      // Quiz completed
      completeQuiz()
    }
  }

  const completeQuiz = () => {
    if (!currentQuiz) return

    const scorePercentage = (quizScore / currentQuiz.points) * 100
    const updatedQuizzes = quizzes.map((q) =>
      q.id === currentQuiz.id ? { ...q, isCompleted: true, bestScore: Math.max(q.bestScore || 0, scorePercentage) } : q,
    )

    setQuizzes(updatedQuizzes)
    setUserProgress((prev) => ({
      ...prev,
      totalPoints: prev.totalPoints + quizScore,
      completedQuizzes: [...prev.completedQuizzes, currentQuiz.id],
      weeklyProgress: prev.weeklyProgress + 1,
    }))

    setCurrentQuiz(null)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-700"
      case "intermediate":
        return "bg-yellow-100 text-yellow-700"
      case "advanced":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "tenant-rights":
        return "⚖️"
      case "lease-terms":
        return "📋"
      case "legal-basics":
        return "🏛️"
      case "maintenance":
        return "🔧"
      default:
        return "📚"
    }
  }

  const getXPForLevel = (level: number) => level * 200

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="border-b border-blue-100 bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
              <span className="text-gray-600 hover:text-blue-600 transition-colors">Back to home</span>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-gray-900">Learn & Earn</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {currentQuiz ? (
            /* Quiz Interface */
            <div className="max-w-3xl mx-auto">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{currentQuiz.title}</CardTitle>
                      <p className="text-gray-600">
                        Question {currentQuestionIndex + 1} of {currentQuiz.questions.length}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">
                          {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, "0")}
                        </span>
                      </div>
                      <Badge className="bg-blue-100 text-blue-700">
                        Score: {quizScore}/{currentQuiz.points}
                      </Badge>
                    </div>
                  </div>
                  <Progress value={(currentQuestionIndex / currentQuiz.questions.length) * 100} className="mt-4" />
                </CardHeader>
                <CardContent className="space-y-6">
                  {currentQuiz.questions[currentQuestionIndex] && (
                    <>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">
                          {currentQuiz.questions[currentQuestionIndex].question}
                        </h3>
                        <div className="space-y-3">
                          {currentQuiz.questions[currentQuestionIndex].options.map((option, index) => (
                            <button
                              key={index}
                              onClick={() => !showExplanation && setSelectedAnswer(index)}
                              disabled={showExplanation}
                              className={`w-full text-left p-4 rounded-lg border transition-colors ${
                                selectedAnswer === index
                                  ? showExplanation
                                    ? index === currentQuiz.questions[currentQuestionIndex].correctAnswer
                                      ? "bg-green-100 border-green-300 text-green-800"
                                      : "bg-red-100 border-red-300 text-red-800"
                                    : "bg-blue-100 border-blue-300"
                                  : showExplanation &&
                                      index === currentQuiz.questions[currentQuestionIndex].correctAnswer
                                    ? "bg-green-100 border-green-300 text-green-800"
                                    : "hover:bg-gray-50 border-gray-200"
                              }`}
                            >
                              <div className="flex items-center space-x-3">
                                <div
                                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-medium ${
                                    selectedAnswer === index
                                      ? "bg-blue-600 text-white border-blue-600"
                                      : "border-gray-300"
                                  }`}
                                >
                                  {String.fromCharCode(65 + index)}
                                </div>
                                <span>{option}</span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {showExplanation && (
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <h4 className="font-medium text-blue-900 mb-2">Explanation:</h4>
                          <p className="text-blue-800">{currentQuiz.questions[currentQuestionIndex].explanation}</p>
                        </div>
                      )}

                      <div className="flex justify-between">
                        <Button variant="outline" onClick={() => setCurrentQuiz(null)}>
                          Exit Quiz
                        </Button>
                        {!showExplanation ? (
                          <Button
                            onClick={submitAnswer}
                            disabled={selectedAnswer === null}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            Submit Answer
                          </Button>
                        ) : (
                          <Button onClick={nextQuestion} className="bg-blue-600 hover:bg-blue-700 text-white">
                            {currentQuestionIndex < currentQuiz.questions.length - 1
                              ? "Next Question"
                              : "Complete Quiz"}
                          </Button>
                        )}
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          ) : (
            /* Main Learning Dashboard */
            <>
              {/* Progress Overview */}
              <div className="grid md:grid-cols-4 gap-6 mb-8">
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Trophy className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">{userProgress.totalPoints}</div>
                    <div className="text-sm text-gray-600">Total Points</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Star className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">Level {userProgress.level}</div>
                    <div className="text-sm text-gray-600">Current Level</div>
                    <Progress
                      value={
                        ((userProgress.totalPoints % getXPForLevel(userProgress.level)) /
                          getXPForLevel(userProgress.level)) *
                        100
                      }
                      className="mt-2"
                    />
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Zap className="w-6 h-6 text-orange-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">{userProgress.streak}</div>
                    <div className="text-sm text-gray-600">Day Streak</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Target className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      {userProgress.weeklyProgress}/{userProgress.weeklyGoal}
                    </div>
                    <div className="text-sm text-gray-600">Weekly Goal</div>
                    <Progress value={(userProgress.weeklyProgress / userProgress.weeklyGoal) * 100} className="mt-2" />
                  </CardContent>
                </Card>
              </div>

              <Tabs defaultValue="quizzes" className="space-y-6">
                <TabsList className="grid w-full grid-cols-3 bg-blue-50 p-1">
                  <TabsTrigger value="quizzes" className="data-[state=active]:bg-white">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Quizzes
                  </TabsTrigger>
                  <TabsTrigger value="badges" className="data-[state=active]:bg-white">
                    <Award className="w-4 h-4 mr-2" />
                    Badges
                  </TabsTrigger>
                  <TabsTrigger value="progress" className="data-[state=active]:bg-white">
                    <Trophy className="w-4 h-4 mr-2" />
                    Progress
                  </TabsTrigger>
                </TabsList>

                {/* Quizzes Tab */}
                <TabsContent value="quizzes" className="space-y-6">
                  <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Learn Tenant Rights</h1>
                    <p className="text-lg text-gray-600">
                      Master your rights as a tenant through interactive quizzes and earn points along the way.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {quizzes.map((quiz) => (
                      <Card key={quiz.id} className={`relative ${!quiz.isUnlocked ? "opacity-60" : ""}`}>
                        {!quiz.isUnlocked && (
                          <div className="absolute top-2 right-2">
                            <Lock className="w-5 h-5 text-gray-400" />
                          </div>
                        )}
                        <CardHeader>
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-2xl">{getCategoryIcon(quiz.category)}</div>
                            <Badge className={getDifficultyColor(quiz.difficulty)}>{quiz.difficulty}</Badge>
                          </div>
                          <CardTitle className="text-lg">{quiz.title}</CardTitle>
                          <p className="text-sm text-gray-600">{quiz.description}</p>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Time: {quiz.timeLimit} min</span>
                            <span className="text-blue-600 font-medium">{quiz.points} points</span>
                          </div>

                          {quiz.isCompleted && quiz.bestScore && (
                            <div className="flex items-center space-x-2">
                              <CheckCircle2 className="w-4 h-4 text-green-600" />
                              <span className="text-sm text-green-600">Best Score: {quiz.bestScore}%</span>
                            </div>
                          )}

                          <Button
                            onClick={() => startQuiz(quiz)}
                            disabled={!quiz.isUnlocked}
                            className={`w-full ${
                              quiz.isUnlocked
                                ? "bg-blue-600 hover:bg-blue-700 text-white"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                          >
                            <Play className="w-4 h-4 mr-2" />
                            {quiz.isCompleted ? "Retake Quiz" : "Start Quiz"}
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                {/* Badges Tab */}
                <TabsContent value="badges" className="space-y-6">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Achievements</h2>
                    <p className="text-gray-600">
                      Unlock badges by completing quizzes and reaching milestones in your learning journey.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {badges.map((badge) => {
                      const isEarned = userProgress.badges.includes(badge.id)
                      return (
                        <Card key={badge.id} className={`text-center ${!isEarned ? "opacity-60" : ""}`}>
                          <CardContent className="p-6">
                            <div className="text-4xl mb-3">{badge.icon}</div>
                            <h3 className="font-semibold text-gray-900 mb-2">{badge.name}</h3>
                            <p className="text-sm text-gray-600 mb-4">{badge.description}</p>
                            {isEarned ? (
                              <Badge className="bg-green-100 text-green-700">
                                <CheckCircle2 className="w-3 h-3 mr-1" />
                                Earned
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="text-gray-500">
                                <Lock className="w-3 h-3 mr-1" />
                                Locked
                              </Badge>
                            )}
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                </TabsContent>

                {/* Progress Tab */}
                <TabsContent value="progress" className="space-y-6">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Learning Progress</h2>
                    <p className="text-gray-600">Track your learning journey and see how you're improving over time.</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Quiz Completion</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {["tenant-rights", "lease-terms", "legal-basics", "maintenance"].map((category) => {
                            const categoryQuizzes = quizzes.filter((q) => q.category === category)
                            const completedCount = categoryQuizzes.filter((q) => q.isCompleted).length
                            const percentage = (completedCount / categoryQuizzes.length) * 100

                            return (
                              <div key={category}>
                                <div className="flex justify-between text-sm mb-1">
                                  <span className="capitalize">{category.replace("-", " ")}</span>
                                  <span>
                                    {completedCount}/{categoryQuizzes.length}
                                  </span>
                                </div>
                                <Progress value={percentage} />
                              </div>
                            )
                          })}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Learning Streak</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center">
                          <div className="text-4xl mb-2">🔥</div>
                          <div className="text-3xl font-bold text-orange-600 mb-2">{userProgress.streak} days</div>
                          <p className="text-gray-600 mb-4">Keep it up! Learning consistently helps retention.</p>
                          <div className="grid grid-cols-7 gap-1">
                            {Array.from({ length: 7 }, (_, i) => (
                              <div
                                key={i}
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                                  i < userProgress.streak
                                    ? "bg-orange-100 text-orange-600"
                                    : "bg-gray-100 text-gray-400"
                                }`}
                              >
                                {i + 1}
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </>
          )}
        </div>
      </main>
    </div>
  )
}
