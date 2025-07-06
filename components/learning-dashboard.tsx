'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Target, 
  TrendingUp, 
  Award, 
  Clock, 
  CheckCircle,
  Brain,
  Lightbulb,
  Users,
  Star,
  Calendar,
  BarChart3
} from 'lucide-react';

interface LearningStats {
  totalLessons: number;
  completedLessons: number;
  totalQuizzes: number;
  averageScore: number;
  studyStreak: number;
  proficiencyLevel: string;
  timeSpent: number;
  achievements: number;
}

interface LearningRecommendation {
  id: string;
  type: 'review' | 'practice' | 'advance' | 'challenge';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  estimatedTime: string;
}

export default function LearningDashboard() {
  const [stats, setStats] = useState<LearningStats>({
    totalLessons: 18,
    completedLessons: 8,
    totalQuizzes: 12,
    averageScore: 85,
    studyStreak: 5,
    proficiencyLevel: 'Intermediate',
    timeSpent: 420, // minutes
    achievements: 2
  });

  const [recommendations, setRecommendations] = useState<LearningRecommendation[]>([
    {
      id: '1',
      type: 'review',
      title: 'Review Security Deposit Laws',
      description: 'Your quiz score on this topic was 70%. A quick review will strengthen your understanding.',
      priority: 'high',
      estimatedTime: '15 min'
    },
    {
      id: '2',
      type: 'practice',
      title: 'Practice Negotiation Scenarios',
      description: 'Try the advanced negotiation scenarios to improve your skills.',
      priority: 'medium',
      estimatedTime: '25 min'
    },
    {
      id: '3',
      type: 'advance',
      title: 'Start Legal Compliance Course',
      description: 'You\'re ready to move to the next course level.',
      priority: 'medium',
      estimatedTime: '2 hours'
    }
  ]);

  const [aiInsights, setAiInsights] = useState<string>('');

  useEffect(() => {
    // Generate AI insights based on learning data
    generateAIInsights();
  }, [stats]);

  const generateAIInsights = async () => {
    try {
      const response = await fetch('/api/ai-learning', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: `Based on my learning stats (${stats.completedLessons}/${stats.totalLessons} lessons completed, ${stats.averageScore}% average quiz score, ${stats.studyStreak} day streak), what are my learning strengths and areas for improvement?`,
          lesson: 'Learning Analytics',
          context: 'Dashboard insights'
        }),
      });

      const data = await response.json();
      setAiInsights(data.answer);
    } catch (error) {
      console.error('Failed to generate AI insights:', error);
      setAiInsights('Keep up the great work! Your consistent study habits are paying off.');
    }
  };

  const progressPercentage = (stats.completedLessons / stats.totalLessons) * 100;
  const timeSpentHours = Math.round(stats.timeSpent / 60);

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Lessons Completed</p>
                <p className="text-2xl font-bold">{stats.completedLessons}/{stats.totalLessons}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Target className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Average Score</p>
                <p className="text-2xl font-bold">{stats.averageScore}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Study Streak</p>
                <p className="text-2xl font-bold">{stats.studyStreak} days</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Award className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Achievements</p>
                <p className="text-2xl font-bold">{stats.achievements}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              Learning Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Overall Progress</span>
                  <span className="text-sm text-gray-600">{Math.round(progressPercentage)}%</span>
                </div>
                <Progress value={progressPercentage} className="w-full" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <Clock className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                  <p className="text-sm text-gray-600">Time Spent</p>
                  <p className="font-semibold">{timeSpentHours}h {stats.timeSpent % 60}m</p>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-1" />
                  <p className="text-sm text-gray-600">Quizzes Taken</p>
                  <p className="font-semibold">{stats.totalQuizzes}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brain className="w-5 h-5 mr-2" />
              AI Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Badge variant="secondary">{stats.proficiencyLevel}</Badge>
                <span className="text-sm text-gray-600">Proficiency Level</span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                {aiInsights || 'Analyzing your learning patterns...'}
              </p>
              <Button size="sm" variant="outline" className="w-full">
                <Lightbulb className="w-4 h-4 mr-2" />
                Get More Insights
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Learning Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="w-5 h-5 mr-2" />
            Personalized Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recommendations.map((rec) => (
              <div key={rec.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                <div className="flex-shrink-0">
                  {rec.type === 'review' && <BookOpen className="w-6 h-6 text-blue-600" />}
                  {rec.type === 'practice' && <Target className="w-6 h-6 text-green-600" />}
                  {rec.type === 'advance' && <TrendingUp className="w-6 h-6 text-purple-600" />}
                  {rec.type === 'challenge' && <Award className="w-6 h-6 text-yellow-600" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium">{rec.title}</h4>
                    <Badge 
                      variant={rec.priority === 'high' ? 'destructive' : rec.priority === 'medium' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {rec.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{rec.description}</p>
                  <div className="flex items-center space-x-4">
                    <span className="text-xs text-gray-500 flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {rec.estimatedTime}
                    </span>
                    <Button size="sm" variant="outline">
                      Start
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Community Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="w-5 h-5 mr-2" />
            Community Engagement
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
              <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-blue-600">1,247</p>
              <p className="text-sm text-gray-600">Active Learners</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
              <Star className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-600">4.9</p>
              <p className="text-sm text-gray-600">Average Rating</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
              <Calendar className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-purple-600">89%</p>
              <p className="text-sm text-gray-600">Completion Rate</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 