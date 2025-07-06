import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  CheckCircle, 
  Clock, 
  Target, 
  Award,
  TrendingUp,
  BookOpen
} from "lucide-react";

interface Lesson {
  id: number;
  title: string;
  duration: string;
  completed: boolean;
}

interface Module {
  id: number;
  title: string;
  duration: string;
  lessons: Lesson[];
}

interface CourseProgressProps {
  courseTitle: string;
  modules: Module[];
  totalLessons: number;
  completedLessons: number;
  totalDuration: string;
  achievementEligible: boolean;
}

export default function CourseProgress({
  courseTitle,
  modules,
  totalLessons,
  completedLessons,
  totalDuration,
  achievementEligible
}: CourseProgressProps) {
  const progress = (completedLessons / totalLessons) * 100;
  const remainingLessons = totalLessons - completedLessons;

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="w-5 h-5 mr-2" />
            Your Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Course Progress</span>
              <span className="text-sm text-gray-600">{completedLessons}/{totalLessons} lessons</span>
            </div>
            <Progress value={progress} className="w-full" />
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">{Math.round(progress)}% complete</span>
              <span className="text-gray-600">{remainingLessons} lessons remaining</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Clock className="w-4 h-4 text-blue-600 mr-1" />
                </div>
                <div className="text-sm font-medium">{totalDuration}</div>
                <div className="text-xs text-gray-500">Total Duration</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <BookOpen className="w-4 h-4 text-green-600 mr-1" />
                </div>
                <div className="text-sm font-medium">{totalLessons}</div>
                <div className="text-xs text-gray-500">Total Lessons</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Module Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Module Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {modules.map((module) => {
              const moduleCompletedLessons = module.lessons.filter(lesson => lesson.completed).length;
              const moduleProgress = (moduleCompletedLessons / module.lessons.length) * 100;
              
              return (
                <div key={module.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{module.title}</h4>
                    <Badge variant={moduleProgress === 100 ? "default" : "secondary"}>
                      {moduleProgress === 100 ? "Complete" : `${Math.round(moduleProgress)}%`}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                    <span>{moduleCompletedLessons}/{module.lessons.length} lessons</span>
                    <span>{module.duration}</span>
                  </div>
                  <Progress value={moduleProgress} className="w-full" />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Achievement Status */}
      {achievementEligible && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center text-green-800">
              <Award className="w-5 h-5 mr-2" />
              Learning Achievement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-800 mb-1">
                  {progress >= 100 ? "Achievement Unlocked!" : "Complete course to earn achievement"}
                </p>
                {progress >= 100 ? (
                  <p className="text-xs text-green-600">Track your learning milestone</p>
                ) : (
                  <p className="text-xs text-green-600">{remainingLessons} more lessons to go</p>
                )}
              </div>
              {progress >= 100 && (
                <Badge className="bg-green-600 text-white">
                  <Award className="w-3 h-3 mr-1" />
                  Unlocked
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Next Lesson */}
      {remainingLessons > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              Continue Learning
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {modules.map((module) => {
                const nextLesson = module.lessons.find(lesson => !lesson.completed);
                if (nextLesson) {
                  return (
                    <div key={module.id} className="p-3 border rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Next lesson in {module.title}:</p>
                      <p className="font-medium">{nextLesson.title}</p>
                      <p className="text-sm text-gray-500">{nextLesson.duration}</p>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 