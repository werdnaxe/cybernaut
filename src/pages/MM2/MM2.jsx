import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCompleteModule } from '../../features/users/hooks';
import '../Cybernaut.css';

// TODO: Replace images as needed
import Narrator from '../../components/Narrator';
import Quiz from '../../components/Quiz';
import TextInputSubmission from '../../components/TextInputSubmission';
import cybernautCharacter from '../../assets/standing-cybernaut.png';
import chat from './MM2-chat.png';
import contacts from './MM2-contacts.png';
import cybOnToilet from './MM2-cyb-on-toilet.png';
import friendsFall from './MM2-friends-fall.png';
import oneFalls from './MM2-one-falls.png';
import permissions from './MM2-permissions.png';

const MM2 = () => {
  const navigate = useNavigate();

  // Module state management variables
  const currentModule = 6;
  const [currentSegment, setCurrentSegment] = useState(0);
  const [lastDecisionIndex, setLastDecisionIndex] = useState(null);
  const { completeModule } = useCompleteModule();
  const totalSegments = 10;
  
  // Track actual progress through the decision tree
  const [actualProgress, setActualProgress] = useState(0);
  const totalProgressSteps = 6;
  
  // Decision state for quiz interactions
  const [decision, setDecision] = useState('');

  // Initialize progress on component mount
  useEffect(() => {
    updateActualProgress(currentSegment);
  }, []);

  // Update progress doc upon completion of module if user is logged in
  const handleClickFinish = async () => {
    const result = await completeModule(
      {
        title: "MM",
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

  // Function to update progress based on current segment
  const updateActualProgress = (segmentIndex) => {
    let progressStep = 0;

    // TODO: Update progress logic based on segmentIndex
    if (segmentIndex >= 0) progressStep = 1;   // welcome
    if (segmentIndex >= 1) progressStep = 2;   // friend called
    if (segmentIndex >= 2) progressStep = 3;   // first decision
    if (segmentIndex >= 3) progressStep = 4;   // first result - either good, good, or bad
    if (segmentIndex >= 6) progressStep = 5;   // second decision
    if (segmentIndex >= 7) progressStep = 6;   // second result - final (either bad, bad, or good)

    setActualProgress(progressStep);
  };

  // Validation logic for when users can proceed
  const canProceed = () => {
    const current = moduleSegments[currentSegment];
    
    // Always allow proceeding for non-decision segments
    if (current.type !== "decision") {
      return true;
    }

    // CHECK SPECIFIC DECISION SEGMENTS
    // Merch ad decision - must select a quiz option
    if (currentSegment === 2) {
      return ['Anything', 'Just camera', 'Just mic', 'None'].includes(decision);
    }

    // Cookie option decision - must select a quiz option
    if (currentSegment === 6) {
      return ['Allow full access', 'Select contacts', 'Don\'t allow'].includes(decision);
    }

    return true;   // default to allow proceeding
  };

  // Function to determine if we're at the actual end of the module
  const isAtModuleEnd = () => {
    const current = moduleSegments[currentSegment];
    return (
      current.title === "You allowed full access." ||
      current.title === "You allowed access to select contacts."||
      current.title === "You selected 'Don\'t allow'"
    );
  };

  // Module segments
  const moduleSegments = [
    {
      title: "Don't get Sucked in.", 
      type: "static",
      content: "Help Cybernaut learn how to use Sinkhole safely and responsibly for communicating with others.", 
      interactive: (
        <div className="flex flex-col items-center justify-center space-y-6 p-8">
           <img
            src={cybernautCharacter}   // TODO: Replace later
            alt="Cookie Monster Title"
            className="w-[300px] h-auto rounded-lg shadow-md"
          />
        </div>
      )
    },
    {
      title: "Make a Phone Call",
      type: "static",
      content: "A friend called Cybernaut using Sinkhole. Sinkhole asks for access.", 
      interactive: (
        <div className="flex flex-col items-center justify-center space-y-6 p-8">
          <img
            src={chat}
            alt="Chat image"
            className="w-[800px] h-auto rounded-lg shadow-md"
          />
        </div>
      )
    },
    {
      title: "Select an Option", 
      type: "decision",
      content: "What should Cybernaut do?", 
      interactive: (
        <div className="flex flex-row items-center justify-center space-y-6 p-8">
          <img
            src={permissions}
            alt="Permissions image"
            className="w-[350px] h-auto rounded-lg shadow-md"
          />
          <Quiz
            options={['Anything', 'Just camera', 'Just mic', 'None']} 
            correctAnswer={null}
            onAnswer={setDecision}
          />
        </div>
      )
    },
    {
      title: "You picked 'Anything'", 
      type: "outcome",
      content: "Oh no! Cybernaut's phone started recording while they were on the toilet.",
      interactive: (
        <div className="flex flex-col items-center justify-center space-y-6 p-8">
          <img
            src={cybOnToilet}
            alt="Cybernaut on toilet"
            className="w-[800px] h-auto rounded-lg shadow-md"
          />
        </div>
      )
    },
    {
      title: "You picked 'None'", 
      type: "good",
      content: "Good job protecting your privacy. However, you missed your friend's call.", 
      interactive: (
        <Narrator
          text="It's important to be cautious about what permissions you grant apps. Only allow access to features that are necessary for the app's functionality."
          image={cybernautCharacter}
        />
      )
    },
    {
      title: "You picked 'Just camera' or 'Just mic'", 
      type: "good",
      content: "Good job protecting your privacy. You managed to talk to your friend while only allowing minimal access to your device.", 
      interactive: (
        <div className="flex flex-col items-center justify-center space-y-6 p-8">
          <Narrator
            text="It's important to be cautious about what permissions you grant apps. Only allow access to features that are necessary for the app's functionality."
            image={cybernautCharacter}
          />
        </div>
      )
    },
    {
      title: "Allow Access?", 
      type: "decision",
      content: "Sinkhole asked Cybernaut to allow access to their contacts. What should Cybernaut do?",
      interactive: (
        <div className="flex flex-row items-center justify-center space-y-6 p-8">
          <img
            src={contacts}
            alt="Contacts image"
            className="w-[350px] h-auto rounded-lg shadow-md"
          />
          <Quiz
            options={['Allow full access', 'Select contacts', 'Don\'t allow']} 
            correctAnswer={null}
            onAnswer={setDecision}
          />
        </div>
      )
    },    
    {
      title: "You allowed full access.", 
      type: "outcome",
      content: "Oh no! Cybernaut's friends got sucked into sinkholes.",
      interactive: (
        <div className="flex flex-col items-center justify-center space-y-6 p-8">
          <img
            src={friendsFall}
            alt="Friends in sinkholes"
            className="w-[800px] h-auto rounded-lg shadow-md"
          />
        </div>
      )
    },
    {
      title: "You allowed access to select contacts.", 
      type: "outcome",
      content: "One of Cybernaut's friends got sucked into a sinkhole.",
      interactive: (
        <div className="flex flex-col items-center justify-center space-y-6 p-8">
          <img
            src={oneFalls}
            alt="Friend next to sinkhole"
            className="w-[800px] h-auto rounded-lg shadow-md"
          />
        </div>
      )
    },
    {
      title: "You selected 'Don\'t allow'", 
      type: "good",
      content: "Great work! Cybernaut's friends are safe from the sinkholes because you didn't allow access to their contacts.",
      interactive: (
        <Narrator
          text="It's good practice to minimize access to contacts as much as possible from third-party apps on your device. Good job!"
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
    
    // Don't allow proceeding if validation fails
    if (!canProceed()) {
      console.log('Cannot proceed - interaction required');
      return;
    }
    
    // Check for endings by title
    if (isAtModuleEnd()) {
      handleClickFinish();
      console.log('NAVIGATING - end segment reached');
      navigate('/mysterymountain');
      return;
    }

    // SAFETY CHECK: If we're at or past the last segment, navigate
    if (currentSegment >= moduleSegments.length - 1) {
      console.log('NAVIGATING - at or past last segment');
      navigate('/mysterymountain');
      return;
    }

    const current = moduleSegments[currentSegment];
    console.log('Current Title:', current.title);
    console.log('Current Type:', current.type);
    console.log('========================');

    // HANDLE DECISION SEGMENTS
    // Call settings decision
    if (currentSegment === 2) {
      console.log('User selected:', decision);
      setLastDecisionIndex(currentSegment);
      let nextSegment;
      switch (decision) {
        case 'Anything':
          nextSegment = 3;   // bad choice
          break;
        case 'Just camera':
          nextSegment = 5;   // good choice
          break;
        case 'Just mic':
          nextSegment = 5;
          break;
        case 'None':
          nextSegment = 4;   // alt good choice
          break;
      }

      setCurrentSegment(nextSegment);
      updateActualProgress(nextSegment);
      return;
    }

    // Allow contact access decision
    if (currentSegment === 6) {
      console.log('User selected:', decision);
      setLastDecisionIndex(currentSegment);
      let nextSegment;
      switch (decision) {
        case 'Allow full access':
          nextSegment = 7;   // worst choice
          break;
        case 'Select contacts':
          nextSegment = 8;   // bad choice
          break;
        case 'Don\'t allow':
          nextSegment = 9;   // good choice
          break;
      }

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
        navigate('/mysterymountain');
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
        navigate('/mysterymountain');
        return;
      }
      
      setCurrentSegment(nextSegment);
      updateActualProgress(nextSegment);
      return;
    }

    // Normal forward movement
    const nextSegment = currentSegment + 1;
    if (nextSegment < moduleSegments.length) {
      setCurrentSegment(nextSegment);
      updateActualProgress(nextSegment);
    } else {
      console.log('NAVIGATING - reached final segment fallback');
      navigate('/mysterymountain');
    }

    const XP = actualProgress * (100 / totalProgressSteps);
    console.log('XP:', XP);

  };

  const handlePrevious = () => {
    const current = moduleSegments[currentSegment];
    
    // If on an outcome segment, go back to the decision that led here (Try Again)
    if (current.type === "outcome" && lastDecisionIndex !== null) {
      setCurrentSegment(lastDecisionIndex);
      return;
    }

    // TODO: Repeat above for "good" segments

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
          Sinkhole!
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

export default MM2;
