import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cybernaut.css';

import cybernautCharacter from '../assets/standing-cybernaut.png';
import copycatFollow from '../assets/SMSP2-copycat-follow.png';
import cybernautCopyCat from '../assets/SMSP2-copycat-profile.png';
import sinkholeHateComment from '../assets/SMSP2-hate-comments.jpeg'
import cybernautFalling from '../assets/SMSP2-cyb-falling.png'
import cybernautBeingChased from '../assets/SMSP2-cyb-chased-by-hate.png'
import cybernautTriumph from '../assets/SMSP2-triumphant-cyb.png';
import Quiz from '../components/Quiz.jsx';
import Narrator from '../components/Narrator';


const SkeletonSMSP2 = () => {
  const navigate = useNavigate();

  const [currentSegment, setCurrentSegment] = useState(0);
  const [lastDecisionIndex, setLastDecisionIndex] = useState(null);
  
  const [actualProgress, setActualProgress] = useState(0);
  const totalProgressSteps = 9; // TODO: Change this to match your total number of progress steps
  
  const [quizAction, setQuizAction] = useState('');
  const [quizActionHateComment, setQuizActionHateComment] = useState('');

  // Initialize progress on component mount
  useEffect(() => {
    updateActualProgress(currentSegment);
  }, []);

  const updateActualProgress = (segmentIndex) => {
    let progressStep = 0;
    
    if (segmentIndex >= 0) progressStep = 1; // Step 1
    if (segmentIndex >= 1) progressStep = 2; // Step 2
    if (segmentIndex >= 2) progressStep = 3; // Step 3
    if (segmentIndex >= 3) progressStep = 4; // Step 4
    if (segmentIndex >= 4) progressStep = 5; // Step 5
    if (segmentIndex >= 5) progressStep = 5; // Step 5
    if (segmentIndex >= 6) progressStep = 6; // Step 6
    if (segmentIndex >= 7) progressStep = 7; // Step 7
    if (segmentIndex >= 8) progressStep = 8; // Step 8
    if (segmentIndex >= 9) progressStep = 9; // Step 9

    setActualProgress(progressStep);
  };

  const canProceed = () => {
    const current = moduleSegments[currentSegment];

    // Always allow proceeding for non-decision segments (including outcome segments)
    if (current.type !== "decision") {
      return true;
    }

    // Only allow proceeding if an option is selected in the quiz (segment 2)
    if (currentSegment === 2) {
      return quizAction && quizAction.length > 0;
    }

    if (currentSegment === 6) {
      return quizActionHateComment && quizActionHateComment.length > 0;
    }
    
    return true;
  };

  const isAtModuleEnd = () => currentSegment === moduleSegments.length - 1;

  const moduleSegments = [
    {
      // Segment 0
      title: "Cybernaut receives a follow", 
      type: "static",
      content: "Cybernaut receives a follow from an account with a name similar to theirs.", 
      interactive: (
        <div className="flex flex-col items-center justify-center p-8">
        <img
            src={copycatFollow}
            alt="Cybernaut handles a follow"
            className="rounded-lg shadow-lg"
            style={{ maxWidth: '50%', height: 'auto' }}
          />
        </div>
      )
    },
    {
      // Segment 1
      title: "Cybernaut investigates the account", 
      type: "static",
      content: "Oh no! The account is claiming to be Cybernaut!", 
      interactive: (
        <div className="flex flex-col items-center justify-center p-8">
        <img
            src={cybernautCopyCat}
            alt="Cybernaut handles a follow"
            className="rounded-lg shadow-lg"
            style={{ maxWidth: '50%', height: 'auto' }}
          />
        </div>
      )
    },
    {
      // Segment 2
      title: "What should Cybernaut do?",
      type: "decision",
      content: "Cybernaut has to do something about this account impersonating them.", 
      interactive: (
          <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-8">
            <Quiz
              options={['Tell an adult', 'Tell a friend', 'Report the account', 'Block the account']} 
              correctAnswer={null} // Remove correctAnswer to get the actual option text
              onAnswer={setQuizAction}
            />
          </div>
        )
    },
    {
      // Segment 3
      title: "Good idea!", 
      type: "good",
      content: "Here's why that was the right move...", 
      interactive: (
        <Narrator
            text="You made a safe choice! Telling an adult or reporting the account helps protect you and others online."
            image={cybernautCharacter}
          />
      )
    },
    // Segment 4
    {
      title: "Here's what happened when Cybernaut didn't act on the account...", 
      type: "outcome",
      content: "The impersonating account posted a mean picture of Cybernaut falling down the stairs!", 
      interactive: (
        <div className="flex flex-col items-center justify-center p-8">
        <img
            src={cybernautFalling}
            alt="Cybernaut handles a follow"
            className="rounded-lg shadow-lg"
            style={{ maxWidth: '50%', height: 'auto' }}
          />
        </div>
      )
    },
    {
      // Segment 5
      title: "Cybernaut receives a hate comment", 
      type: "static",
      content: "Cybernaut keeps receiving hate comments from people on Sinkhole!", 
      interactive: (
        <div className="flex flex-col items-center justify-center p-8">
        <img
            src={sinkholeHateComment}
            alt="Cybernaut handles a follow"
            className="rounded-lg shadow-lg"
            style={{ maxWidth: '50%', height: 'auto' }}
          />
        </div>
      )
    },
    {
      // Segment 6
      title: "What should Cybernaut do?", 
      type: "decision",
      content: "Cybernaut needs to do something about the hate comment.", 
      interactive: (
        <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-8">
            <Quiz
              options={['Google what to do', 'Delete the comment', 'Ignore the comment', 'Tell an adult']} 
              correctAnswer={null} // Remove correctAnswer to get the actual option text
              onAnswer={setQuizActionHateComment}
            />
          </div>
      )
    },
    {
      // Segment 7
      title: "Nice work!", 
      type: "good",
      content: "Here's why that was the right move...", 
      interactive: (
        <Narrator
            text="Telling an adult is always a good idea, but Googling what to do also works! Sometimes, online recources can be helpful to manage stressful online situations."
            image={cybernautCharacter}
          />
      )
    },
    {
      // Segment 8
      title: "Uh oh...", 
      type: "outcome",
      content: "Cybernaut continues to get overwhelmed with hate comments!", 
      interactive: (
        <div className="flex flex-col items-center justify-center p-8">
        <img
            src={cybernautBeingChased}
            alt="Cybernaut handles a follow"
            className="rounded-lg shadow-lg"
            style={{ maxWidth: '80%', height: 'auto' }}
          />
        </div>
      )
    },
    {
      // Segment 9
      title: "You completed the module!", 
      type: "good",
      content: "Congratulations! You completed this module! You successfully learned how to handle online impersonation and hate comments.", 
      interactive: (
        <div className="flex flex-col items-center justify-center p-8">
        <img
            src={cybernautTriumph}
            alt="Cybernaut handles a follow"
            className="rounded-lg shadow-lg"
            style={{ maxWidth: '80%', height: 'auto' }}
          />
        </div>
      )
    }
  ];

  const handleNext = () => {
    console.log('=== handleNext DEBUG ===');
    console.log('Current Segment:', currentSegment);
    console.log('Can Proceed?', canProceed());

    // Don't allow proceeding if validation fails
    if (!canProceed()) {
      console.log('Cannot proceed - interaction required');
      return;
    }

    // SAFETY CHECK: If we're at or past the last segment, navigate
    if (currentSegment >= moduleSegments.length - 1) {
      console.log('NAVIGATING - at or past last segment');
      navigate('/SocialMediaPassage');
      return;
    }

    const current = moduleSegments[currentSegment];

    if(current.type === "decision" && currentSegment !== 1) {
      setLastDecisionIndex(currentSegment);

      if (currentSegment === 2) {
        // First decision segment
        const isGoodChoice = quizAction === 'Report the account' || quizAction === 'Tell an adult';
        const nextSegment = isGoodChoice ? 3 : 4; // Good choice leads to segment 3, bad choice to segment 4
        setCurrentSegment(nextSegment);
        updateActualProgress(nextSegment);
        return;
      }

      if (currentSegment === 6) {
        // Second decision segment
        console.log('quizActionHateComment:', quizActionHateComment);
        const isGoodChoiceSecond = quizActionHateComment === 'Google what to do' || quizActionHateComment === 'Tell an adult';
        const nextSegment = isGoodChoiceSecond ? 7 : 8; // Good choice leads to segment 8, bad choice to segment 9
        setCurrentSegment(nextSegment);
        updateActualProgress(nextSegment);
        return;
      }

    }

    // Handle outcome segments (bad choice results)
    if (current.type === "outcome") {
      console.log('Outcome segment - checking next segment');
      const nextSegment = currentSegment + 1;
      
      if (nextSegment >= moduleSegments.length) {
        console.log('NAVIGATING - outcome leads past end');
        navigate('/SocialMediaPassage');
        return;
      }
      
      setCurrentSegment(nextSegment);
      updateActualProgress(nextSegment);
      return;
    }

    // Handle good choice segments
    if (current.type === "good") {
      console.log('Good segment - finding next decision or ending');
      
      // Skip to next decision or end
      let nextIndex = currentSegment + 1;
      while (nextIndex < moduleSegments.length && moduleSegments[nextIndex].type === "outcome") {
        nextIndex++; // Skip bad outcomes
      }
      
      if (nextIndex >= moduleSegments.length) {
        console.log('NAVIGATING - reached end through good path');
        navigate('/SocialMediaPassage');
        return;
      }
      
      setCurrentSegment(nextIndex);
      updateActualProgress(nextIndex);
      return;
    }

    // Check for module end
    if (isAtModuleEnd()) {
      console.log('NAVIGATING - end segment reached');
      navigate('/SocialMediaPassage');
      return;
    }

    // Normal forward movement
    const nextSegment = currentSegment + 1;
    if (nextSegment < moduleSegments.length) {
      setCurrentSegment(nextSegment);
      updateActualProgress(nextSegment);
    } else {
      navigate('/SocialMediaPassage');
    }
  };

  const handlePrevious = () => {
    const current = moduleSegments[currentSegment];
    
    // If on an outcome segment, go back to the decision that led here
    if (current.type === "outcome" && lastDecisionIndex !== null) {
      setCurrentSegment(lastDecisionIndex);
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
          Online Impersonation and Hate Comments
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

export default SkeletonSMSP2;