import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cybernaut.css';

// TODO: Import your components and assets here
// import Narrator from '../../components/Narrator';
// import Quiz from '../../components/Quiz';
// import TextInputSubmission from '../../components/TextInputSubmission';
// import cybernautCharacter from '../../assets/standing-cybernaut.png';
// import yourImage from './your-image.png';

const SkeletonSMSP2 = () => {
  const navigate = useNavigate();

  // TODO: Update these state variables based on your module's needs
  const [currentSegment, setCurrentSegment] = useState(0);
  const [lastDecisionIndex, setLastDecisionIndex] = useState(null);
  
  // TODO: Update progress tracking
  const [actualProgress, setActualProgress] = useState(0);
  const totalProgressSteps = 5; // TODO: Change this to match your total number of progress steps
  
  // TODO: Add state variables for storing user inputs/decisions
  const [userInput1, setUserInput1] = useState('');
  const [userInput2, setUserInput2] = useState('');
  // Add more state variables as needed for your module

  // Initialize progress on component mount
  useEffect(() => {
    updateActualProgress(currentSegment);
  }, []);

  // TODO: Update this function based on your module's progress flow
  const updateActualProgress = (segmentIndex) => {
    let progressStep = 0;
    
    if (segmentIndex >= 0) progressStep = 1; // Step 1
    if (segmentIndex >= 1) progressStep = 2; // Step 2
    if (segmentIndex >= 2) progressStep = 3; // Step 3
    if (segmentIndex >= 3) progressStep = 4; // Step 4
    if (segmentIndex >= 4) progressStep = 5; // Step 5
    
    setActualProgress(progressStep);
  };

  // TODO: Update validation logic for when users can proceed
  const canProceed = () => {
    const current = moduleSegments[currentSegment];
    
    // Always allow proceeding for non-decision segments
    if (current.type !== "decision") {
      return true;
    }

    // For template purposes, always allow proceeding
    // TODO: Add validation for each decision segment when you customize
    return true;
  };

  // Function to determine if we're at the actual end of the module
  const isAtModuleEnd = () => {
    const current = moduleSegments[currentSegment];
    return (
      current.title === "Module Complete!" || // TODO: Update with your final segment title
      current.title === "Final Outcome" // TODO: Update with your final outcome title
    );
  };

  // TODO: CUSTOMIZE YOUR MODULE SEGMENTS HERE
  const moduleSegments = [
    {
      title: "Welcome to Module Template", 
      type: "static",
      content: "This is a template module you can customize with your own content.", 
      interactive: (
        <div className="flex flex-col items-center justify-center space-y-6 p-8">
          <div className="bg-blue-100 border-2 border-blue-300 rounded-lg p-6 max-w-md text-center">
            <h3 className="text-xl font-bold text-blue-800 mb-4">Template Instructions</h3>
            <p className="text-blue-700">
              Replace this placeholder content with your introduction material, images, videos, or interactive elements.
            </p>
          </div>
        </div>
      )
    },
    {
      title: "First Decision Point", 
      type: "decision",
      content: "This is where users would make their first decision. Customize this content and add your interaction components.", 
      interactive: (
        <div className="flex flex-col items-center justify-center space-y-6 p-8">
          <div className="bg-yellow-100 border-2 border-yellow-300 rounded-lg p-6 max-w-md text-center">
            <h3 className="text-xl font-bold text-yellow-800 mb-4">Decision Template</h3>
            <p className="text-yellow-700 mb-4">
              Add your TextInputSubmission, Quiz, or other interactive components here.
            </p>
            <div className="bg-white p-4 rounded border">
              <p className="text-gray-600 italic">
                [Your interaction component goes here]
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Positive Feedback", 
      type: "good",
      content: "This shows when the user makes a good decision. Replace with your positive feedback content.", 
      interactive: (
        <div className="flex flex-col items-center justify-center space-y-6 p-8">
          <div className="bg-green-100 border-2 border-green-300 rounded-lg p-6 max-w-md text-center">
            <h3 className="text-xl font-bold text-green-800 mb-4">Good Choice!</h3>
            <p className="text-green-700">
              Replace this with your Narrator component, celebration content, or explanation of why the choice was correct.
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Negative Outcome", 
      type: "outcome",
      content: "This shows the consequence of a poor decision. Replace with your outcome content.", 
      interactive: (
        <div className="flex flex-col items-center justify-center space-y-6 p-8">
          <div className="bg-red-100 border-2 border-red-300 rounded-lg p-6 max-w-md text-center">
            <h3 className="text-xl font-bold text-red-800 mb-4">What Happened...</h3>
            <p className="text-red-700">
              Replace this with images, videos, or content showing the negative consequences of the poor decision.
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Module Complete!", 
      type: "good",
      content: "Congratulations! You've completed the template module. This would be your completion screen.", 
      interactive: (
        <div className="flex flex-col items-center justify-center space-y-6 p-8">
          <div className="bg-blue-100 border-2 border-blue-300 rounded-lg p-6 max-w-md text-center">
            <h3 className="text-xl font-bold text-blue-800 mb-4"> Template Complete!</h3>
            <p className="text-blue-700">
              Replace this with your completion content, final feedback, or next steps for users.
            </p>
          </div>
        </div>
      )
    }
  ];

  // TODO: UPDATE DECISION LOGIC HERE
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
      navigate('/SocialMediaPassage'); // Navigate back to Social Media Safe Passage
      return;
    }

    const current = moduleSegments[currentSegment];

    // TODO: ADD YOUR DECISION LOGIC HERE
    if (currentSegment === 1) {
      // Example: First decision logic (for template, we'll just alternate)
      setLastDecisionIndex(currentSegment);
      
      // For template: randomly go to good or bad outcome
      const isGoodChoice = Math.random() > 0.5; // Random for demo purposes
      const nextSegment = isGoodChoice ? 2 : 3; // good outcome : bad outcome
      
      setCurrentSegment(nextSegment);
      updateActualProgress(nextSegment);
      return;
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
        {/* TODO: Update module title */}
        <h1 className="text-3xl font-bold mb-6 text-blue-800 text-center">
          Module Template
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

export default SkeletonSMSP2;

/* 
INSTRUCTIONS FOR USING THIS TEMPLATE:

1. SETUP:
   - Copy this file and rename it to your module name (e.g., MyNewModule.jsx)
   - Update all imports at the top with your actual assets and components
   - Update the component name from ModuleTemplate to your module name

2. CONFIGURE BASIC SETTINGS:
   - Update totalProgressSteps to match your module's length
   - Add state variables for any user inputs your module needs
   - Update the module title in the JSX

3. CREATE YOUR CONTENT:
   - Replace the moduleSegments array with your actual content
   - Each segment needs: title, type, content, and interactive JSX
   - Segment types: "static", "decision", "good", "outcome"

4. ADD DECISION LOGIC:
   - In handleNext(), add your decision logic for each decision segment
   - Update the navigation destination (currently '/destinations')
   - Update canProceed() with validation for your decision points

5. UPDATE PROGRESS TRACKING:
   - Modify updateActualProgress() to match your module's flow
   - Update isAtModuleEnd() with your final segment titles

6. TEST YOUR MODULE:
   - Test all decision paths (good and bad choices)
   - Verify progress tracking works correctly
   - Check that navigation works properly

SEGMENT TYPES EXPLAINED:
- "static": Information/intro segments with no user interaction required
- "decision": Requires user input before proceeding (text input, quiz, etc.)
- "good": Positive feedback shown after a good decision
- "outcome": Negative consequence shown after a bad decision

TIPS:
- Look at the original SMSPModule1.jsx for examples of complex decision logic
- Use console.log statements to debug your decision flow
- Test edge cases like going back from outcome segments
*/