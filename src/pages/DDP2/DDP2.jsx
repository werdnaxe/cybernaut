import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCompleteModule } from '../../features/users/hooks';
import '../Cybernaut.css';

// TODO: Replace images as needed
import Narrator from '../../components/Narrator';
import Quiz from '../../components/Quiz';
import TextInputSubmission from '../../components/TextInputSubmission';
import cybernautCharacter from '../../assets/standing-cybernaut.png';
import earlyMorning from './DDP2-2am.png';
import allNigther from './DDP2-allnighter.png';
import cybLost from './DDP2-cyb-lost.png';
import cybScrolling from './DDP2-cyb-scrolling.png';
import nextMorning from './DDP2-next-morning.png';

const DDP2 = () => {
  const navigate = useNavigate();

  // Module state management variables
  const currentModule = 8;
  const { completeModule } = useCompleteModule();
  const [currentSegment, setCurrentSegment] = useState(0);
  const [lastDecisionIndex, setLastDecisionIndex] = useState(null);
  const [hasGoneBackToLastDecision, setHasGoneBackToLastDecision] = useState(false);
  const totalSegments = 8;
  
  // Track actual progress through the decision tree
  const [actualProgress, setActualProgress] = useState(0);
  const totalProgressSteps = 6;
  
  // Decision state for quiz interactions
  const [decision, setDecision] = useState('');

  // Initialize progress on component mount
  useEffect(() => {
    updateActualProgress(currentSegment);
  }, []);

  // Update XP whenever game progress updates
  useEffect(() => {
    const XP = actualProgress * (100 / totalProgressSteps);
    console.log('XP:', XP);
  }, [actualProgress, totalProgressSteps]);

  // Update progress doc upon completion of module if user is logged in
  const handleClickFinish = async () => {
    const result = await completeModule(
      {
        title: "DDP",
        nextSubmodule: currentModule + 1,
        isDisabled: false,
        actualProgress,
        totalProgressSteps
      }
    );

    if (result.success === true) {
      console.log(result.message);
    }
    else {
      console.error('Error updating progress:', result.message);
    }
  };

  // Function to update progress based on current segment
  const updateActualProgress = (segmentIndex) => {
    let progressStep = 0;

    if (segmentIndex >= 0) progressStep = 1;
    if (segmentIndex >= 1) progressStep = 2;
    if (segmentIndex >= 2) progressStep = 3;
    if (segmentIndex >= 4) progressStep = 4;
    if (segmentIndex >= 5) progressStep = 5;
    if (segmentIndex >= 7) progressStep = 6;

    setActualProgress(progressStep);
  };

  // Validation logic for when users can proceed
  const canProceed = () => {
    const current = moduleSegments[currentSegment];
    
    // Always allow proceeding for non-decision segments
    if (current.type !== "decision") {
      return true;
    }

    if (currentSegment === 2) {
      return decision !== '';
    }

    if (currentSegment === 5) {
      return decision !== '';
    }

    return true;   // default to allow proceeding
  };

  // Function to determine if we're at the actual end of the module
  const isAtModuleEnd = () => {
    const current = moduleSegments[currentSegment];
    return (
      current.title === "What happened when you started scrolling again in the morning..." ||
      current.title === "Great choice!"
    );
  };

  // Module segments
  const moduleSegments = [
    {
      title: "Cybernaut in bed",
      type: "static",
      content: "Cybernaut is in bed, scrolling through their phone.", 
      interactive: (
        <div className="flex flex-col items-center justify-center space-y-6 p-8">
          <img
            src={cybScrolling}
            alt="Cybernaut Scrolling"
            className="w-[800px] h-auto rounded-lg shadow-md"
          />
        </div>
      )
    },
    {
      title: "Cybernaut keeps scrolling", 
      type: "static",
      content: "The scroller shows more intense videos, like scary news and other high adrenaline videos.", 
      interactive: (
        <div className="flex flex-row items-center justify-center space-y-6 p-8">
          <img
            src={cybScrolling}
            alt="Cybernaut Scrolling"
            className="w-[800px] h-auto rounded-lg shadow-md"
          />
        </div>
      )
    },
    {
      title: "Decision point", 
      type: "decision",
      content: "It’s 2am and Cybernaut needs to get up at 8am: What should Cybernaut do?",
      interactive: (
        <div className="flex flex-col items-center justify-center space-y-6 p-8">
          <img
            src={earlyMorning}
            alt="Cybernaut at 2am"
            className="w-[800px] h-auto rounded-lg shadow-md"
          />
          <Quiz
            options={['Watch one more video', 'Use bedtime mode', 'Close the app and try to sleep', 'Text a friend to talk instead']}
            correctAnswer={null}
            onAnswer={setDecision}
          />
        </div>
      )
    },
    {
      title: "What happened when you kept scrolling...", 
      type: "outcome",
      content: "The sun rises and Cybernaut is frozen, still on their phone in bed. 'Sinkhole' whispers: Just one more...", 
      interactive: (
          <img
            src={allNigther}
            alt="The next morning"
            className="w-[800px] h-auto rounded-lg shadow-md"
          />
      )
    },
    {
      title: "Smart choice!", 
      type: "good",
      content: "Good job! You knew you were in a scrolling trap and you decided to take action instead of watching more videos.", 
      interactive: (
        <div className="flex flex-col items-center justify-center space-y-6 p-8">
          <Narrator
            text="It's important to recognize when you're in a scrolling trap and take steps to break free. Cybernaut decided to close the app and try to sleep, which is a great choice."
            image={cybernautCharacter}
          />
        </div>
      )
    },
    {
      title: "Decision point", 
      type: "decision",
      content: "Cybernaut wakes up the next day feeling tired and anxious. What should they do now?",
      interactive: (
        <div className="flex flex-col items-center justify-center space-y-6 p-8">
          <img
            src={nextMorning}
            alt="Cybernaut next morning"
            className="w-[800px] h-auto rounded-lg shadow-md"
          />
        <Quiz
          options={['Keep scrolling through the same kind of content', 'Try a breathing exercise', 'Talk to someone about how they\'re feeling', 'Change the content they\'re watching']}
          correctAnswer={null}
          onAnswer={setDecision}
        />
        </div>
      )
    },    
    {
      title: "What happened when you started scrolling again in the morning...",   
      type: "outcome",
      content: "The same videos loop again and again. Cybernaut is pulled into a foggy whirlpool--'You\'ve already started. You can't stop now.",
      interactive: (
        <div className="flex flex-col items-center justify-center space-y-6 p-8">
          <img
            src={cybLost}
            alt="Cybernaut whirlpool"
            className="w-[800px] h-auto rounded-lg shadow-md"
          />
        </div>
      )
    },
    {
      title: "Great choice!", 
      type: "good",
      content: "Good job! You recognized that you were in a scrolling trap and took action to break free. This is an important skill to develop, especially in today's digital world.",
      interactive: (
        <Narrator
          text="It's important to recognize when you're in a scrolling trap and take steps to break free. Cybernaut decided to close the app and try to sleep, which is a great choice."
          image={cybernautCharacter}
        />
      )
    },        
  ];

  // DECISION HANDLING - DECISION, OUTCOME, GOOD
  const handleNext = () => {
    console.log('=== handleNext DEBUG ===');
    console.log('Current Segment:', currentSegment);
    console.log('Can Proceed?', canProceed());
    setDecision('');
    
    // Don't allow proceeding if validation fails
    if (!canProceed()) {
      console.log('Cannot proceed - interaction required');
      return;
    }
    
    // SAFETY CHECK: If we're at or past the last segment, navigate
    if (currentSegment >= moduleSegments.length - 1) {
      handleClickFinish();
      console.log('NAVIGATING - at or past last segment');
      navigate('/datadetoxpit');
      return;
    }

    const current = moduleSegments[currentSegment];
    console.log('Current Title:', current.title);
    console.log('Current Type:', current.type);
    console.log('========================');

    // HANDLE DECISION SEGMENTS
    if (currentSegment === 2) {
      console.log('User chose:', decision);
      setLastDecisionIndex(currentSegment);
      setHasGoneBackToLastDecision(false);
      const nextSegment = decision === 'Watch one more video' ? 3 : 4;   // bad = 4, good = 5
      setCurrentSegment(nextSegment);
      updateActualProgress(nextSegment);
      return;
    }
      
    if (currentSegment === 5) {
      console.log('User chose:', decision);
      setLastDecisionIndex(currentSegment);
      setHasGoneBackToLastDecision(false);
      const nextSegment = decision === 'Keep scrolling through the same kind of content' ? 6 : 7;   // bad = 7, good = 8
      setCurrentSegment(nextSegment);
      updateActualProgress(nextSegment);
      return;   
    }

    // HANDLE OUTCOME SEGMENTS
    if (current.type === "outcome") {
      console.log('Outcome segment - checking next segment');

      let nextSegment = currentSegment + 1;
      // Skip to next decision or ending
      while (moduleSegments[nextSegment].type !== "decision" && nextSegment < moduleSegments.length) {
        nextSegment++;
      }

      // If next segment would be out of bounds, navigate
      if (nextSegment >= moduleSegments.length) {
        console.log('NAVIGATING - outcome leads past end');
        navigate('/datadetoxpit');
        return;
      }
      
      setCurrentSegment(nextSegment);
      updateActualProgress(nextSegment);
      return;
    }

    // HANDLE GOOD SEGMENTS
    if (current.type === "good") {
      console.log('Good segment - finding next decision or ending');
      
      let nextSegment = currentSegment + 1;
      // Skip to next decision or ending
      while (moduleSegments[nextSegment].type !== "decision" && nextSegment < moduleSegments.length) {
        nextSegment++;
      }

      console.log('Next index would be:', nextSegment);

      // If we've reached the end, navigate
      if (nextSegment >= moduleSegments.length) {
        console.log('NAVIGATING - reached end through good path');
        navigate('/datadetoxpit');
        return;
      }
      
      setCurrentSegment(nextSegment);
      updateActualProgress(nextSegment);
      return;
    }

    // Check for endings by title
    if (isAtModuleEnd()) {
      handleClickFinish();
      console.log('NAVIGATING - end segment reached');
      navigate('/datadetoxpit');
      return;
    }

    // Normal forward movement
    const nextSegment = currentSegment + 1;
    if (nextSegment < moduleSegments.length) {
      setCurrentSegment(nextSegment);
      updateActualProgress(nextSegment);
    } else {
      console.log('NAVIGATING - reached final segment fallback');
      navigate('/datadetoxpit');
    }

  };

  const handlePrevious = () => {
    const current = moduleSegments[currentSegment];
    
    // Always go back to the last decision index if it exists
    if (lastDecisionIndex !== null && !hasGoneBackToLastDecision) {
      setCurrentSegment(lastDecisionIndex);
      setHasGoneBackToLastDecision(true);
      return;
    }

    // Otherwise, go to previous segment
    if (currentSegment > 0) {
      setCurrentSegment(currentSegment - 1);
    }
  };

  const progressPercentage = (actualProgress / totalProgressSteps) * 100;

  return (
    <div className="bg-blue-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 relative">
        <h1 className="text-3xl font-bold mb-6 text-blue-800 text-center">
          Doomscrolling!
        </h1>
        
        <div className="mb-20">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">
            {moduleSegments[currentSegment].title}
          </h2>
          <div className="prose max-w-none">
            <p className="text-lg">
              {moduleSegments[currentSegment].content}
            </p>
            <div className="mt-8">
              <div key={currentSegment}>
                {moduleSegments[currentSegment].interactive ? (
                  moduleSegments[currentSegment].interactive
                ) : (
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="italic">
                      This is where additional interactive content for segment {currentSegment + 1} would go.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Navigation Controls */}
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
          
          {moduleSegments[currentSegment].type === 'outcome' && (
            <button 
              onClick={handlePrevious} 
              className="px-4 py-2 mr-2 rounded-lg font-medium bg-orange-500 text-white hover:bg-orange-600 transition-colors"
            >
              ← Try Again
            </button>
          )}

          <button 
            onClick={handleNext}
            disabled={!canProceed()}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              !canProceed()
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : isAtModuleEnd()
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
            title={!canProceed() ? 'Please complete the interaction before proceeding' : ''}
          >
            {isAtModuleEnd() ? 'Finish' : 'Next'} →
          </button>
        </div>
      </div>
    </div>
  );
};

export default DDP2;
