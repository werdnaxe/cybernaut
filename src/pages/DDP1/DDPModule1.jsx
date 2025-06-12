import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Cybernaut.css';
import Quiz from '../../components/Quiz';
import Narrator from '../../components/Narrator';
import { useCompleteModule } from '../../features/users/hooks';

import cybernautCharacter from '../../assets/standing-cybernaut.png'
import noLikes from './DDP1-no-likes.png';
import tornado from './DDP1-tornado.png';
import filtered from './DDP1-filtered-cyb.png';
import filteredWin from './DDP1-filtered-cyb-winning.png';
import filteredLose from './DDP1-filtered-cyb-defeated.png';

const DDPModule1 = () => {
  const navigate = useNavigate();
  const currentModule = 9;
  const [currentSegment, setCurrentSegment] = useState(0);
  const [lastDecisionIndex, setLastDecisionIndex] = useState(null);
  const { completeModule } = useCompleteModule();
  const totalSegments = 9;

  const [actualProgress, setActualProgress] = useState(0);
  const totalProgressSteps = 5;

  const [decision, setDecision] = useState('');

  useEffect(() => {
    updateActualProgress(currentSegment);
  }, []);

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
      console.error('Error updating progress:', result.error);
    }
  };

  const updateActualProgress = (segmentIndex) => {
    let progressStep = 0;
    if (segmentIndex >= 0) progressStep = 1; // Bad selfie (1/7)
    if (segmentIndex >= 1) progressStep = 2; // Post decision (2/7)
    if (segmentIndex >= 2) progressStep = 3; // Post results (3/7)
    if (segmentIndex >= 4) progressStep = 4; // Likes decision (4/7)
    if (segmentIndex >= 5) progressStep = 5; // Likes results (5/7)
    if (segmentIndex >= 8) progressStrep = 6; // Feelings decision 
    if (segmentIndex >= 9) progressStep = 7; // Feelings result / end


    setActualProgress(progressStep);
  };

  const canProceed = () => {
    const current = moduleSegments[currentSegment];

    if (current.type !== "decision") {
      return true;
    }

    if (currentSegment === 1) {
      return ['Another selfie', 'A filtered selfie', 'Something creative', 'Something silly'].includes(decision);
    }

    if (currentSegment === 5) {
      return ['Keep checking', 'Delete it', 'Talk to a friend', 'Ignore it'].includes(decision);
    }

    if (currentSegment === 9) {
      return ['Talk to someone', 'Take a break', 'Do a breathing exercise', 'Express how you\'re feeling'].includes(decision);
    }

    /* Add quiz options here */
    return true;
  }

  const isAtModuleEnd = () => {
    const current = moduleSegments[currentSegment];
    return (
      current.title === "Placeholder"
    );
  };

  const moduleSegments = [
    {
      title: "Time for a selfie!",
      type: "static",
      content: "Cybernaut posted a selfie but it got no likes.",
      interactive: (
        <div className="flex flex-col items-center justify-center space-y-6 p-8">
          <img
            src={noLikes}
            alt="Cybernaut looks sadly at their selfie which received 0 likes."
            className="w-[300px] h-auto rounded-lg shadow-md"
          />
        </div>
      )
    },
    {
      title: "Select an Option",
      type: "decision",
      content: "What should Cybernaut post now?",
      interactive: (
        <div className="flex flex-row items-center justify-center space-y-6 p-8">
          <Quiz
            options={['Another selfie', 'A filtered selfie', 'Something creative', 'Something silly']} 
            correctAnswer={null}
            onAnswer={setDecision}
          />
        </div>
      )
    },
    {
      title: "You chose a filtered selfie",
      type: "outcome",
      content: "Oh no! The 'perfect' Cybernaut became more powerful!",
      interactive: (
        <div className="flex flex-col items-center justify-center space-y-6 p-8">
          <img
            src={filtered}
            alt="cybernaut enhanced with unrealistic filters"
            className="w-[300px] h-auto rounded-lg shadow-md"
          />
        </div>
      )
    },
    {
      title: "You chose not to use a filter",
      type: "good",
      content: "Good job! You didn't let the engagement affect you!",
      interactive: (
        <div className="flex flex-col items-center justify-center space-y-6 p-8">
          <Narrator
            text="Its important to not let social media engagement affect how you express yourself online!"
            image={cybernautCharacter}
          />
        </div>
      )
    },
    {
      title: "The first selfie still has no likes",
      type: "decision",
      content: "What should Cybernaut do now?",
      interactive: (
        <div className="flex flex-row items-center justify-center space-y-6 p-8">
          <Quiz
            options={['Keep checking', 'Delete it', 'Talk to a friend', 'Ignore it']} 
            correctAnswer={null}
            onAnswer={setDecision}
          />
        </div>
      )
    },
    {
      title: "You chose to keep checking the post",
      type: "outcome",
      content: "Oh no! Cybernaut got sucked up into the cloutnado!",
      interactive: (
        <div className="flex flex-col items-center justify-center space-y-6 p-8">
          <img
            src={tornado}
            alt="cybernaut being sucked into a tornado"
            className="w-[300px] h-auto rounded-lg shadow-md"
          />
        </div>
      )
    },
    {
      title: "You chose to delete the first post",
      type: "outcome",
      content: "You allowed ",
      interactive: (
        <div className="flex flex-col items-center justify-center space-y-6 p-8">
          <img
            src={filteredWin}
            alt="filtered 'perfect' Cybernaut overpowering normal Cybernaut"
            className="w-[300px] h-auto rounded-lg shadow-md"
          />
        </div>
      )
    },
    {
      title: "Good job!",
      type: "good",
      content: "Its often better to talk about your feelings with a friend, or just don't treat it as a problem in the first place!",
      interactive: (
        <div className="flex flex-col items-center justify-center space-y-6 p-8">
          <img
            src={filteredLose}
            alt="cybernaut being sucked into a tornado"
            className="w-[300px] h-auto rounded-lg shadow-md"
          />
        </div>
      )
    },
    {
      title: "Choose one!",
      type: "decision",
      content: "What should you do if you start feeling bad online?",
      interactive: (
        <div className="flex flex-row items-center justify-center space-y-6 p-8">
          <Quiz
            options={['Talk to someone', 'Take a break', 'Do a breathing exercise', 'Express how you\'re feeling']} 
            correctAnswer={null}
            onAnswer={setDecision}
          />
        </div>
      )
    },
    {
      title: "Great job!",
      type: "good",
      content: "Any one of those decisions is correct.",
      interactive: (
          <Narrator
            text="There are many healthy and mature ways to properly deal with negative emotions stemming from things you see on social media. It is important to recognize how you're feeling"
            image={cybernautCharacter}
          />
      )
    }
  ]

  const handleNext = () => {
    console.log('=== handleNext DEBUG ===');
    console.log('Current Segment:', currentSegment);
    console.log('Can Proceed?', canProceed());

    if (!canProceed()) {
      console.log('Cannot proceed - interaction required');
      return;
    }

    if (isAtModuleEnd()) {
      handleClickFinish();
      console.log('NAVIGATING - end segment reached');
      navigate('/datadetoxpit');
      return;
    }

    if (currentSegment >= moduleSegments.length - 1) {
      console.log('NAVIGATING - at or past last segment');
      navigate('/datadetoxpit');
      return;
    }

    const current = moduleSegments[currentSegment];
    console.log('Current Title:', current.title);
    console.log('Current Type:', current.type);
    console.log('========================');
    let nextSegment;

    if (current.type === "decision") {
      if (currentSegment === 1) {
        console.log('User selected:', decision);
        setLastDecisionIndex(currentSegment);
        switch (decision) {
          case 'Another selfie':
          case 'Something creative':
          case 'Something silly':
            nextSegment = 3;
            break;
          case 'A filtered selfie':
            nextSegment = 2;
            break;
          default:
            console.error('Unexpected decision in segment 1');
            return;
        }
      } else if (currentSegment === 4) {
        switch (decision) {
          case 'Keep checking':
            nextSegment = 5; 
            break;
          case 'Delete it':
            nextSegment = 6; 
            break;
          case 'Talk to a friend':
          case 'Ignore it':
            nextSegment = 7; 
            break;
          default:
            console.error('Unexpected decision in segment 4');
            return;
        }
      } else if (currentSegment === 8) {
        nextSegment = 9;
      }
      setCurrentSegment(nextSegment);
      updateActualProgress(nextSegment);
      return;
    }

    if (current.type === "outcome" || current.type === "good") {
      nextSegment = currentSegment + 1;
      while (nextSegment < moduleSegments.length && (moduleSegments[nextSegment].type === "outcome" || moduleSegments[nextSegment].type === "good")) {
        nextSegment++;
      }

      if (nextSegment >= moduleSegments.length) {
        console.log('NAVIGATING - reached end');
        navigate('/datadetoxpit');
        return;
      }

      setCurrentSegment(nextSegment);
      updateActualProgress(nextSegment);
      return;
    }

    nextSegment = currentSegment + 1;
    if (nextSegment < moduleSegments.length) {
      setCurrentSegment(nextSegment);
      updateActualProgress(nextSegment);
    } else {
      navigate('/datadetoxpit');
    }
    
  };

  const handlePrevious = () => {
    const current = moduleSegments[currentSegment];

    if (current.type  === "outcome" || current.type === "good" && lastDecisionIndex !== null) {
      setCurrentSegment(lastDecisionIndex);
      return;
    }

    if (currentSegment > 0) {
      setCurrentSegment(currentSegment - 1);
    }
  };

  const progressPercentage = (actualProgress / totalProgressSteps) * 100;

  return (
    <div className="bg-blue-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 relative">
        <h1 className="text-3xl font-bold mb-6 text-blue-800 text-center">
          Cookies!
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
}

export default DDPModule1