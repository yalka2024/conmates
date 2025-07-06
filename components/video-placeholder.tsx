import React from 'react';
import { Play, Clock, FileText, Download } from 'lucide-react';

interface VideoPlaceholderProps {
  title: string;
  duration: string;
  description: string;
  materials?: string[];
  lessonNumber: number;
}

export default function VideoPlaceholder({
  title,
  duration,
  description,
  materials = [],
  lessonNumber
}: VideoPlaceholderProps) {
  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden">
      {/* Video Placeholder */}
      <div className="relative aspect-video bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Play className="w-8 h-8 text-white ml-1" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Lesson {lessonNumber}</h3>
          <p className="text-lg opacity-90">{title}</p>
          <div className="flex items-center justify-center gap-2 mt-3 text-sm opacity-75">
            <Clock className="w-4 h-4" />
            <span>{duration}</span>
          </div>
        </div>
        
        {/* Overlay with lesson info */}
        <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded text-sm">
          Lesson {lessonNumber}
        </div>
      </div>
      
      {/* Lesson Content */}
      <div className="p-6 bg-white">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 mb-4 leading-relaxed">{description}</p>
        
        {/* Materials */}
        {materials.length > 0 && (
          <div className="border-t pt-4">
            <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Lesson Materials
            </h4>
            <div className="space-y-2">
              {materials.map((material, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                  <Download className="w-4 h-4" />
                  <span>{material}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Action Button */}
        <button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors">
          Mark as Complete
        </button>
      </div>
    </div>
  );
} 