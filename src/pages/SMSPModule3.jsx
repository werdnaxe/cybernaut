import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cybernaut.css';

import cybernautCharacter from '../assets/standing-cybernaut.png';
import cybernautCreepyFollow from '../assets/SMSP3-sinkholer-rq.png'
import cybernautCreepyMessage from '../assets/SMSP3-sinkholer-dm.png';
import sittingCybernaut from '../assets/sitting-thinking-cyb.png';
import cyberGoo from '../assets/SMSP3-sinkholer-consequence.png'
import happyCyb from '../assets/happy-standing-cyb.png'
import sinkholerInvite from '../assets/SMSP3-sinkholer-invite.png'
import Quiz from '../components/Quiz.jsx';
import Narrator from '../components/Narrator';


const SMSPModule3 = () => {
  const navigate = useNavigate();

  const [currentSegment, setCurrentSegment] = useState(0);
  const [lastDecisionIndex, setLastDecisionIndex] = useState(null);
  
  const [actualProgress, setActualProgress] = useState(0);
  const totalProgressSteps = 6; // TODO: Change this to match your total number of progress steps
  
  const [quizAction, setQuizAction] = useState('');
  const [quizActionKeepTalking, setQuizActionKeepTalking] = useState('');
  // const [userInput2, setUserInput2] = useState('');

  // Add more state variables as needed for your module

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

    // For template purposes, always allow proceeding for other decision segments
    return true;
  };

    const isAtModuleEnd = () => currentSegment === moduleSegments.length - 1;

  const moduleSegments = [
    {
      // Segment 0
      title: "Cybernaut receives a follow from their favorite Sinkholer", 
      type: "static",
      content: "While Cybernaut is scrolling through Sinkhole, they receive a follow from their favorite Sinkholer!", 
      interactive: (
        <div className="flex flex-col items-center justify-center p-8">
        <img
            src={cybernautCreepyFollow}
            alt="Cybernaut handles a follow"
            className="rounded-lg shadow-lg"
            style={{ maxWidth: '50%', height: 'auto' }}
          />
        </div>
      )
    },
    {
      // Segment 1
      title: "What should Cybernaut do?",
      type: "decision",
      content: "Cybernaut receives a message from their favorite Sinkholer, CrushKooler.", 
      interactive: (
          <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-8">
            <img
              src={cybernautCreepyMessage}
              alt="Cybernaut receives a creepy message"
              className="w-[300px] h-auto rounded-lg shadow-md"
            />
            <Quiz
              options={['Keep talking', 'Stop talking', 'Block', 'Delete thread']} 
              correctAnswer={null} // Remove correctAnswer to get the actual option text
              onAnswer={setQuizAction}
            />
          </div>
        )
    },
    {
      // Segment 2
      title: "Should Cybernaut keep talking to CrushKooler?", 
      type: "decision",
      content: "KrushCooler has asked Cybernaut to meet up with them, but Cybernaut is unsure if they should go.", 
      interactive: (
        <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-8">
            <img
              src={sinkholerInvite}
              alt="Cybernaut receives a creepy message"
              className="w-[300px] h-auto rounded-lg shadow-md"
            />
            <Quiz
              options={['Go over', 'Block', 'Ask an adult', 'Go with friends']} 
              correctAnswer={null} // Remove correctAnswer to get the actual option text
              onAnswer={setQuizActionKeepTalking}
            />
          </div>
      )
    },
    {
      // Segment 3
      title: "Good job!", 
      type: "good",
      content: "You made a safe choice! If you chose to block, to stop talking, or to delete the thread, you did the right thing!", 
      interactive: (
        <Narrator
            text="Good job! But remember - it might be unsafe at times to delete a thread, because whoever you're talking to may be a threat to others online! Make sure to tell an trusted adult before you walk away from the conversation."
            image={sittingCybernaut}
          />
      )
    },
    {
      // Segment 4
      title: "Good job!", 
      type: "good",
      content: "Choosing to block or ask an adult was a good choice, especially if they're making you uncomfortable.", 
      interactive: (
        <Narrator
            text="Talking to an adult you trust can always be a good choice, and blocking someone can prevent you from further harassment!"
            image={cybernautCharacter}
          />
      )
    },
    {
      // Segment 5
      title: "Oh no!", 
      type: "outcome",
      content: "When Cybernaut met up with CrushKooler, he made Cybernaut do something they didn't want to do. Cybernaut felt embarassed in front of their friends", 
      interactive: (
        <div className="flex flex-col items-center justify-center p-8">
        <img
            src={cyberGoo}
            alt="Cybernaut handles a follow"
            className="rounded-lg shadow-lg"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </div>
      )
    },
    {
      // Segment 6
      title: "You completed the module!", 
      type: "good",
      content: "Congratulations! You completed this module! You successfully learned how to handle a situation where a stranger online is making you uncomfortable.", 
      interactive: (
        <div className="flex flex-col items-center justify-center p-8">
        <img
            src={happyCyb}
            alt="Cybernaut handles a follow"
            className="rounded-lg shadow-lg"
            style={{ maxWidth: '40%', height: 'auto' }}
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

    if(current.type === "decision" && currentSegment !== 0) {
      setLastDecisionIndex(currentSegment);

      if (currentSegment === 1) {
        // First decision segment
        const isGoodChoice = quizAction === 'Keep talking';
        const nextSegment = isGoodChoice ? 2 : 3; // Good choice leads to segment 2, bad choice to segment 3
        setCurrentSegment(nextSegment);
        updateActualProgress(nextSegment);
        return;
      }

      if (currentSegment === 2) {
        // Second decision segment
        console.log('quizActionKeepTalking:', quizActionKeepTalking);
        const isGoodChoiceSecond = quizActionKeepTalking === 'Ask an adult' || quizActionKeepTalking === 'Block';
        const nextSegment = isGoodChoiceSecond ? 4 : 5; // Good choice leads to segment 4, bad choice to segment 5
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
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-8 relative">
        {/* TODO: Update module title */}
        <h1 className="text-3xl font-bold mb-6 text-blue-800 text-center">
            Online Stranger Danger
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

export default SMSPModule3;
