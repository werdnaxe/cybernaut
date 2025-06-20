import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCompleteModule } from '../../features/users/hooks';
import '../Cybernaut.css';

// TODO: Replace images as needed
import Narrator from '../../components/Narrator';
import Quiz from '../../components/Quiz';
import TextInputSubmission from '../../components/TextInputSubmission';
import cybernautCharacter from '../../assets/standing-cybernaut.png';
import cookieOptions from './MM1-cookie-options.png';
import evilCookies from './MM1-evil-cookies.png';
import sinkholeMerch from './MM1-sinkhole-merch.png';
import titleImage from './MM1-title.png';

const MM1 = () => {
  const navigate = useNavigate();

  // Module state management variables
  const currentModule = 4;
  const [currentSegment, setCurrentSegment] = useState(0);
  const [lastDecisionIndex, setLastDecisionIndex] = useState(null);
  const [hasGoneBackToLastDecision, setHasGoneBackToLastDecision] = useState(false);
  const { completeModule } = useCompleteModule();
  const totalSegments = 9;
  
  // Track actual progress through the decision tree
  const [actualProgress, setActualProgress] = useState(0);
  const totalProgressSteps = 5;
  
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
      console.error('Error updating progress:', result.message);
    }
  };

  // Function to update progress based on current segment
  const updateActualProgress = (segmentIndex) => {
    let progressStep = 0;

    // Define progress based on the actual progression through the module
    switch (segmentIndex) {
      case 0: // Welcome
        progressStep = 1;
        break;
      case 1: // Ad decision
        progressStep = 2;
        break;
      case 2: // Cookie decision (after clicking ad)
        progressStep = 3;
        break;
      case 3: // Bad outcome (accepted all cookies)
        progressStep = 5;
        break;
      case 4: // Good ending (rejected all cookies)
        progressStep = 5;
        break;
      case 5: // Customization decision
        progressStep = 4;
        break;
      case 6: // Good ending (necessary cookies only)
        progressStep = 5;
        break;
      case 7: // Bad outcome (accepted unnecessary cookies)
        progressStep = 5;
        break;
      case 8: // Good ending (rejected ad)
        progressStep = 5;
        break;
      default:
        progressStep = Math.min(segmentIndex + 1, totalProgressSteps);
    }

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
    if (currentSegment === 1) {
      return decision === 'Yes' || decision === 'No';
    }

    // Cookie option decision - must select a quiz option
    if (currentSegment === 2) {
      return ['Accept all', 'Reject all', 'Customize'].includes(decision);
    }

    // Customization decision - must select a quiz option
    if (currentSegment === 5) {
      return ['Marketing', 'Tracking', 'Necessary', 'All'].includes(decision);
    }

    return true;   // default to allow proceeding
  };

  // Function to determine if we're at the actual end of the module
  const isAtModuleEnd = () => {
    return [3, 4, 6, 7, 8].includes(currentSegment);
  };

  // Module segments
  const moduleSegments = [
    {
      title: "Welcome.", 
      type: "static",
      content: "Time to help Cybernaut navigate the world of digital cookies.", 
      interactive: (
        <div className="flex flex-col items-center justify-center space-y-6 p-8">
           <img
            src={titleImage}
            alt="Cybernaut and bad cookies"
            className="w-[600px] h-auto rounded-lg shadow-md"
          />
        </div>
      )
    },
    {
      title: "To Click or Not to Click?",
      type: "decision",
      content: "Cybernaut sees an ad for Sinkhole merch. Click?", 
      interactive: (
        <div className="flex flex-col items-center justify-center space-y-6 p-8">
          <img
            src={sinkholeMerch}
            alt="Merch Ad"
            className="w-[300px] h-auto rounded-lg shadow-md"
          />
          <Quiz
            options={['Yes', 'No']} 
            correctAnswer={null}
            onAnswer={setDecision}
          />
        </div>
      )
    },
    {
      title: "You clicked the ad.", 
      type: "decision",
      content: "Cybernaut gets a cookie pop-up. What should Cybernaut do?", 
      interactive: (
        <div className="flex flex-row items-center justify-center space-y-6 p-8">
          <img
            src={cookieOptions}
            alt="Cookie Options"
            className="w-[380px] h-auto rounded-lg shadow-md"
          />
          <Quiz
            options={['Accept all', 'Reject all', 'Customize']} 
            correctAnswer={null}
            onAnswer={setDecision}
          />
        </div>
      )
    },
    {
      title: "What happened when you accepted all cookies?", 
      type: "outcome",
      content: "The evil cookies started tracking Cybernaut's every move. Cookies can track what you buy or view, and that data can be shared with advertisers.",
      interactive: (
        <div className="flex flex-col items-center justify-center space-y-6 p-8">
          <img
            src={evilCookies}
            alt="Evil Cookies Image"
            className="w-[800px] h-auto rounded-lg shadow-md"
          />
        </div>
      )
    },
    {
      title: "You rejected all cookies.", 
      type: "good",
      content: "Good job! You protected your privacy by rejecting all cookies.", 
      interactive: (
        <Narrator
          text="Rejecting cookies is a good privacy-preserving practice. It prevents tracking and data collection that can be used for targeted advertising."
          image={cybernautCharacter}
        />
      )
    },
    {
      title: "You chose to customize cookies.", 
      type: "decision",
      content: "Which cookies do you want to turn on?", 
      interactive: (
        <div className="flex flex-col items-center justify-center space-y-6 p-8">
          <Quiz
            options={['Marketing', 'Tracking', 'Necessary', 'All']}
            correctAnswer={null}
            onAnswer={setDecision}
          />
        </div>
      )
    },
    {
      title: "You only accepted necessary cookies.", 
      type: "good",
      content: "Excellent! You protected your privacy by only accepting necessary cookies.",
      interactive: (
        <Narrator
          text="Generally, it's best to only accept necessary cookies that are essential for website functionality. This minimizes tracking and helps to preserve your privacy."
          image={cybernautCharacter}
        />
      )
    },    
    {
      title: "You accepted unnecessary cookies.", 
      type: "outcome",
      content: "The evil cookies started tracking Cybernaut's every move. Cookies can track what you buy or view, and that data can be shared with advertisers.",
      interactive: (
        <div className="flex flex-col items-center justify-center space-y-6 p-8">
          <img
            src={evilCookies}
            alt="Evil Cookies Image"
            className="w-[800px] h-auto rounded-lg shadow-md"
          />
        </div>
      )
    },
    {
      title: "You rejected the ad.", 
      type: "good",
      content: "Great work! You avoided the cookie monster's trap by rejecting the ad.",
      interactive: (
        <Narrator
          text="While choosing whether or not to click on ads is a personal decision, rejecting ads can help you avoid tracking and data collection that can be used to target you for advertising."
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
      handleClickFinish();
      console.log('NAVIGATING - at or past last segment');
      navigate('/mysterymountain');
      return;
    }

    const current = moduleSegments[currentSegment];
    console.log('Current Title:', current.title);
    console.log('Current Type:', current.type);
    console.log('========================');

    // HANDLE DECISION SEGMENTS
    // Merch ad decision
    if (currentSegment === 1) {
      const seeAd = decision;
      console.log('User clicked on ad?', seeAd);
      setLastDecisionIndex(currentSegment);
      setHasGoneBackToLastDecision(false);
      const nextSegment = seeAd === 'Yes' ? 2 : 8;   // continue = 2, good (final) = 8
      setCurrentSegment(nextSegment);
      updateActualProgress(nextSegment);
      return;
    }

    // Select cookie option decision
    if (currentSegment === 2) {
      const cookieOption = decision;
      console.log('User selected cookie option:', cookieOption);
      setLastDecisionIndex(currentSegment);
      setHasGoneBackToLastDecision(false);
      let nextSegment;
      switch (cookieOption) {
        case 'Accept all':
          nextSegment = 3;   // bad choice
          break;
        case 'Reject all':
          nextSegment = 4;   // good choice
          break;
        case 'Customize':
          nextSegment = 5;   // alt good choice
          break;
      }

      setCurrentSegment(nextSegment);
      updateActualProgress(nextSegment);
      return;
    }
      
    // Customize cookie decision
    if (currentSegment === 5) {
      const customization = decision;
      console.log('User customized cookie:', customization);
      setLastDecisionIndex(currentSegment);
      setHasGoneBackToLastDecision(false);
      const nextSegment = customization === 'Necessary' ? 6 : 7;   // good = 6, bad = 7
      setCurrentSegment(nextSegment);
      updateActualProgress(nextSegment);
      return;   
    }

    // HANDLE OUTCOME SEGMENTS
    if (current.type === "outcome") {
      console.log('Outcome segment - checking next segment');
      const nextSegment = currentSegment + 1;

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
      
      // Skip outcome and go to next decision
      let nextSegment = currentSegment + 1;
      while (nextSegment < moduleSegments.length && moduleSegments[nextSegment].type !== "decision") {
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

  };

  const handlePrevious = () => {
    const current = moduleSegments[currentSegment];
    let previousSegment;
    
    // If on an outcome segment, go back to the decision that led here (Try Again)
    if (current.type === "outcome" && lastDecisionIndex !== null) {
      previousSegment = lastDecisionIndex;
      setCurrentSegment(previousSegment);
      updateActualProgress(previousSegment);
      return;
    }

    // Otherwise, go to previous segment
    if (currentSegment > 0) {
      previousSegment = currentSegment - 1;
      setCurrentSegment(previousSegment);
      updateActualProgress(previousSegment);
    }
  };

  const progressPercentage = (actualProgress / totalProgressSteps) * 100;

  return (
    <div className="bg-blue-50 p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-8 relative">
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
                {actualProgress > 0 && (
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

export default MM1;