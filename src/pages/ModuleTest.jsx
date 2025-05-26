import React, { useState } from 'react';
import '../pages/Cybernaut.css';
import Scroller from '../components/Scroller';
import Quiz from '../components/Quiz';
import { checkpointTwo } from '../data/mediaArrays';
import Narrator from '../components/Narrator';
import cybernautCharacter from '../assets/standing-cybernaut.png';

const ModuleTest = () => {
  const [currentSegment, setCurrentSegment] = useState(0);
  const totalSegments = 10;

  const moduleSegments = [
    {
        title: "A",
        content: "first stage",
        interactive: <Scroller media={checkpointTwo} />
    },
    {
        title: "B",
        content: "second stage",
        interactive: <Quiz options={['Cyberbullying', 'Privacy Settings', 'Algorithms', 'Digital Footprint']} />
    },
    {
        title: "C",
        content: "third stage",
        interactive: null
    },
    {
        title: "D",
        content: "fourth stage",
        interactive: null
    },
    {
        title: "E",
        content: "fifth stage",
        interactive: null
    },
    {
        title: "F",
        content: "sixth stage",
        interactive: null
    },
    {
        title: "G",
        content: "seventh stage",
        interactive: null
    },
    {
        title: "H",
        content: "eigth stage",
        interactive: null
    },
    {
        title: "I",
        content: "ninth stage",
        interactive: null
    },
    {
        title: "J",
        content: "tenth stage",
        interactive: null
    }
    
  ];

  const handleNext = () => {
    if (currentSegment < totalSegments - 1) {
        setCurrentSegment(currentSegment + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSegment > 0) {
        setCurrentSegment(currentSegment - 1);
    }
  };

  const progressPercentage = (currentSegment / (totalSegments - 1)) * 100;

  return (
    <div className="min-h-screen bg-blue-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 min-h-[70vh] relative">
        <h1 className="text-3xl font-bold mb-6 text-blue-800 text-center">
          Module: Social Media Effects
        </h1>
        

        <div className="mb-20">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">
            {currentSegment + 1}. {moduleSegments[currentSegment].title}
          </h2>
          <div className="prose max-w-none">
            <p className="text-lg">
              {moduleSegments[currentSegment].content}
            </p>
            <div className="mt-8">
              {moduleSegments[currentSegment].interactive ? (
                moduleSegments[currentSegment].interactive
              ) : (
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="italic">
                    This is where additional interactive content, exercises, or resources for segment {currentSegment + 1} would go.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gray-50 border-t flex items-center">
          <button 
            onClick={handlePrevious}
            disabled={currentSegment === 0}
            className={`px-4 py-2 rounded-lg font-medium ${
              currentSegment === 0 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'bg-blue-500 text-white hover:bg-blue-600'
            } transition-colors`}
          >
            ← Previous
          </button>
          
          <div className="flex-1 mx-4">
            <div className="w-full bg-gray-200 rounded-full h-8">
        
              <div 
                className="bg-blue-600 h-8 rounded-full transition-all duration-300 ease-in-out relative"
                style={{ width: `${progressPercentage}%` }}
              >
                {currentSegment > 0 && (
                <span className="absolute inset-0 flex items-center justify-center text-white font-medium">
                    {Math.round(progressPercentage)}%
                </span>
                )}
              </div>
              
            </div>
          </div>
          
          <button 
            onClick={handleNext}
            disabled={currentSegment === totalSegments - 1}
            className={`px-4 py-2 rounded-lg font-medium ${
              currentSegment === totalSegments - 1 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'bg-blue-500 text-white hover:bg-blue-600'
            } transition-colors`}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModuleTest