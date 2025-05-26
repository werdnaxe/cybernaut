import React, { useState } from 'react';
import '../pages/Cybernaut.css';
import { useAuthContext } from '../features/users/AuthProvider';


const ModuleTest = () => {
  const [currentSegment, setCurrentSegment] = useState(0);
  const { user, progress, updateProgress } = useAuthContext();
  const totalSegments = 10;

  const moduleSegments = [
    {
        title: "A",
        content: "first stage"
    },
    {
        title: "B",
        content: "second stage"
    },
    {
        title: "C",
        content: "third stage"
    },
    {
        title: "D",
        content: "fourth stage"
    },
    {
        title: "E",
        content: "fifth stage"
    },
    {
        title: "F",
        content: "sixth stage"
    },
    {
        title: "G",
        content: "seventh stage"
    },
    {
        title: "H",
        content: "eigth stage"
    },
    {
        title: "I",
        content: "ninth stage"
    },
    {
        title: "J",
        content: "tenth stage"
    }
    
  ];

  const handleNext = () => {
    if (currentSegment < totalSegments - 1) {
        setCurrentSegment(currentSegment + 1);   // currentSegment will not show incremented until the next render cycle
    }

    // Update progress document with new XP and last submodule completed
    if (user) {
      console.log("Client user ID:", user._id);
        const moduleName = "Social Media Effects";   // store module name so last completed submodule can be overwritten every time user completes a submodule
        const updatedSubmodules = [...progress.submodulePerModule];
        const currentModule = updatedSubmodules.find(sub => sub.module === moduleName);

        if (currentModule) {   // if the module exists and is found
          currentModule.nextSubmodule = currentSegment + 1;   // update the next submodule to be completed
        } else {   // if the module does not exist, create a new entry for it
          updatedSubmodules.push({ module: moduleName, nextSubmodule: currentSegment + 1 });
        }

        // Update progress doc with new XP and next submodule to be completed
        updateProgress(user._id, { 
          XP: progress.XP + 1,
          submodulePerModule: updatedSubmodules
        });
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
            
            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <p className="italic">
                This is where additional interactive content, exercises, or resources for segment {currentSegment + 1} would go.
              </p>
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