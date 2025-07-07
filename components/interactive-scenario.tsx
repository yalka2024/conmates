'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  AlertTriangle, 
  Lightbulb,
  ArrowRight,
  RefreshCw,
  BookOpen,
  Clock
} from 'lucide-react';

interface ScenarioOption {
  id: string;
  text: string;
  outcome: string;
  learning: string;
  consequences: string[];
  nextScenario?: string;
  points: number;
}

interface Scenario {
  id: string;
  title: string;
  description: string;
  background: string;
  options: ScenarioOption[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  estimatedTime: string;
}

interface InteractiveScenarioProps {
  scenario: Scenario;
  onComplete: (score: number, feedback: string) => void;
  onNext?: () => void;
}

export default function InteractiveScenario({ scenario, onComplete, onNext }: InteractiveScenarioProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showOutcome, setShowOutcome] = useState(false);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<string[]>([]);

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
    setShowOutcome(true);
    
    const option = scenario.options.find(opt => opt.id === optionId);
    if (option) {
      setScore(option.points);
      setFeedback([option.learning, ...option.consequences]);
    }
  };

  const handleContinue = () => {
    if (onComplete) {
      onComplete(score, feedback.join('. '));
    }
    if (onNext) {
      onNext();
    }
  };

  const handleRestart = () => {
    setSelectedOption(null);
    setShowOutcome(false);
    setScore(0);
    setFeedback([]);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <Badge className={getDifficultyColor(scenario.difficulty)}>
                {scenario.difficulty.charAt(0).toUpperCase() + scenario.difficulty.slice(1)}
              </Badge>
              <Badge variant="outline">{scenario.category}</Badge>
              <span className="text-sm text-gray-500 flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {scenario.estimatedTime}
              </span>
            </div>
            <CardTitle className="text-xl">{scenario.title}</CardTitle>
            <p className="text-gray-600 mt-2">{scenario.description}</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Scenario Background */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">Scenario Background</h3>
          <p className="text-blue-800 leading-relaxed">{scenario.background}</p>
        </div>

        {/* Decision Point */}
        {!showOutcome && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">What would you do?</h3>
            <div className="grid gap-3">
              {scenario.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleOptionSelect(option.id)}
                  className={`w-full text-left p-4 border rounded-lg transition-all hover:shadow-md ${
                    selectedOption === option.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{option.text}</span>
                    <ArrowRight className="w-5 h-5 text-gray-400" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Outcome and Learning */}
        {showOutcome && selectedOption && (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg">
              <div className="flex items-center space-x-2 mb-3">
                {score >= 80 ? (
                  <CheckCircle className="w-6 h-6 text-green-600" />
                ) : score >= 60 ? (
                  <AlertTriangle className="w-6 h-6 text-yellow-600" />
                ) : (
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                )}
                <h3 className="font-semibold text-lg">
                  {score >= 80 ? 'Excellent Choice!' : score >= 60 ? 'Good Decision' : 'Let\'s Learn From This'}
                </h3>
              </div>
              
              <div className="space-y-3">
                {feedback.map((item, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <Lightbulb className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 p-3 bg-white rounded border">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Your Score</span>
                  <span className="text-lg font-bold text-blue-600">{score}/100</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between">
              <Button onClick={handleRestart} variant="outline">
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
              
              <div className="flex space-x-2">
                <Button variant="outline">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Learn More
                </Button>
                <Button onClick={handleContinue}>
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Tips and Resources */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">💡 Pro Tips</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Consider the long-term consequences of your decision</li>
            <li>• Think about how this affects your rights as a tenant</li>
            <li>• Remember to document everything in real situations</li>
            <li>• When in doubt, consult with legal resources</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
} 