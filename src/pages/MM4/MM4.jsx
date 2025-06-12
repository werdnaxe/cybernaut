import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Cybernaut.css';

import Narrator from '../../components/Narrator';
import Quiz from '../../components/Quiz';
import TextInputSubmission from '../../components/TextInputSubmission';
import cybernautCharacter from '../../assets/standing-cybernaut.png';
import TOSImage from './TOS.png';
import canonBallCyb from './canon-ball-cyb.png';
import killedByTOS from './killed-by-TOS.png';
import eomjiSpeak from './emoji-speak.png';
import happyCyb from './happy-standing-cyb.png';
import TOSdenial from './TOS-denial.png';
import creativeRights from './creative-rights.png';
import billboard from './billboard.png';

const MM4 = () => {
  const navigate = useNavigate();

  const [currentSegment, setCurrentSegment] = useState(0);
  const [lastDecisionIndex, setLastDecisionIndex] = useState(null);
  
  const [actualProgress, setActualProgress] = useState(0);
  const totalProgressSteps = 4;
  
  const [TOSresponse, setTOSresponse] = useState('');
  const [Rightsresponse, setRightsresponse] = useState('');

  // Initialize progress on component mount
  useEffect(() => {
    updateActualProgress(currentSegment);
  }, []);

  const updateActualProgress = (segmentIndex) => {
    let progressStep = 0;
    
    if (segmentIndex >= 0) progressStep = 1; // Step 1
    if (segmentIndex >= 1) progressStep = 2; // Step 2
    if (segmentIndex >= 5) progressStep = 3; // Step 3
    if (segmentIndex >= 6) progressStep = 4; // Step 4
    
    setActualProgress(progressStep);
  };

  const canProceed = () => {
    const current = moduleSegments[currentSegment];
    
    // Always allow proceeding for non-decision segments
    if (current.type !== "decision") {
      return true;
    }

    // For decision segments, check if user made a choice
    if (currentSegment === 0) {
      return TOSresponse !== '';
    }
    if (currentSegment === 5) {
      return Rightsresponse !== '';
    }

    return true;
  };

  // Function to determine if we're at the actual end of the module
  const isAtModuleEnd = () => {
    const current = moduleSegments[currentSegment];
    
    // Check if this is the last segment in the array
    if (currentSegment >= moduleSegments.length - 1) {
      return true;
    }
    
    // Check if this is a good/outcome segment and there are no more decision segments after it
    if (current.type === "good" || current.type === "outcome") {
      let nextIndex = currentSegment + 1;
      while (nextIndex < moduleSegments.length && 
            moduleSegments[nextIndex].type !== "decision") {
        nextIndex++;
      }
      // If no more decision segments found, end
      return nextIndex >= moduleSegments.length;
    }
    
    // For other segment types, check for specific end titles if needed
    return (
      current.title === "Module Complete!" ||
      current.title === "Final Outcome"
    );
  };

  const moduleSegments = [
    {
      title: "Terms of Sneakiness", 
      type: "decision",
      content: "What should Cybernaut do?", 
      interactive: (
        <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-8">
            <img
                src={TOSImage}
                alt="Terms of Sneakiness"
                className="w-[300px] h-auto rounded-lg shadow-md"
            />
            <Quiz
                options={['Accept All', 'Read All', 'Skim', 'Deny All']} 
                correctAnswer={null}
                onAnswer={(answer) => setTOSresponse(answer)}
            />
        </div>
      )
    },
    {
      title: "You Skimmed", 
      type: "good",
      content: "Here's why that was the right move...", 
      interactive: (
        <Narrator
            text="Good choice, you looked for the important information without overwhelming me."
            image={canonBallCyb}
        />
      )
    },
    {
      title: "You denied the Terms of Sneakiness", 
      type: "outcome",
      content: "While this can be a good idea if you don't agree with what Sinkhole wants to do, you will get kicked off for denying.", 
      interactive: (
        <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-8">
            <img
                src={TOSdenial}
                alt="Bad outcome..."
                className="w-[800px] h-auto rounded-lg shadow-md"
            />
        </div>
      )
    },
    {
      title: "You tried to read all the Terms of Sneakiness", 
      type: "outcome",
      content: "This seems like a smart idea, but this was confusing and took too long. Cybernaut got buried under the TOS.", 
      interactive: (
        <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-8">
            <img
                src={killedByTOS}
                alt="Bad outcome..."
                className="w-[800px] h-auto rounded-lg shadow-md"
            />
        </div>
      )
    },
    {
      title: "You accepted the Terms of Sneakiness without reading them", 
      type: "outcome",
      content: "Sinkhole hid some weird things in the Terms of Sneakiness--one of them is that Cybernaut can only speak in emojis now!", 
      interactive: (
        <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-8">
            <img
                src={eomjiSpeak}
                alt="Bad outcome..."
                className="w-[800px] h-auto rounded-lg shadow-md"
            />
        </div>
      )
    },
    {
      title: "Creative Rights", 
      type: "decision",
      content: "What should Cybernaut do?", 
      interactive: (
        <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-8">
            <img
                src={creativeRights}
                alt="Creative Rights"
                className="w-[300px] h-auto rounded-lg shadow-md"
            />
            <Quiz
                options={['Accept', 'Deny', 'Ask for help', 'Learn more']} 
                correctAnswer={null}
                onAnswer={(answer) => setRightsresponse(answer)}
            />
        </div>
      )
    },
    {
      title: "You didn't give away your rights!", 
      type: "good",
      content: "Here's why that was the right move...", 
      interactive: (
        <Narrator
            text="You know what's yours is yours. People having the rights to what you share can easily get out of control and be dangerous."
            image={happyCyb}
        />
      )
    },
    {
      title: "You gave away your rights...", 
      type: "outcome",
      content: "Now Sinkhole can do whatever it wants with the content Cybernaut uploads to the app. It decided to make a post of Cybernaut's a mean billboard.", 
      interactive: (
        <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-8">
            <img
                src={billboard}
                alt="Bad outcome..."
                className="w-[800px] h-auto rounded-lg shadow-md"
            />
        </div>
      )
    }
  ];

  const handleNext = () => {
    console.log('=== handleNext DEBUG ===');
    console.log('Current Segment:', currentSegment);
    console.log('Can Proceed?', canProceed());
    
    if (!canProceed()) {
      console.log('Cannot proceed - interaction required');
      return;
    }
    
    // If we're at or past the last segment, navigate
    if (currentSegment >= moduleSegments.length - 1) {
      console.log('NAVIGATING - at or past last segment');
      navigate('/mysterymountain');
      return;
    }

    const current = moduleSegments[currentSegment];

    // DECISION LOGIC FOR SEGMENT 0 (Terms of Sneakiness)
    if (currentSegment === 0) {
      setLastDecisionIndex(currentSegment);
      let nextSegment = null;

      if (TOSresponse === 'Skim') {
        nextSegment = 1; // Good outcome
      } else if (TOSresponse === 'Deny All') {
        nextSegment = 2; // Bad outcome
      } else if (TOSresponse === 'Read All') {
        nextSegment = 3; // Bad outcome
      } else if (TOSresponse === 'Accept All') {
        nextSegment = 4; // Bad outcome
      }
      
      if (nextSegment !== null) {
        setCurrentSegment(nextSegment);
        updateActualProgress(nextSegment);
      }
      return;
    } 
    
    // DECISION LOGIC FOR SEGMENT 5 (Creative Rights)
    if (currentSegment === 5) {
      setLastDecisionIndex(currentSegment);
      let nextSegment = null;

      if (Rightsresponse === 'Accept') {
        nextSegment = 7; // Bad outcome
      } else {
        nextSegment = 6; // Good outcome (any non-Accept answer)
      }

      if (nextSegment !== null) {
        setCurrentSegment(nextSegment);
        updateActualProgress(nextSegment);
      }
      return;
    }

    // Handle outcome segments (bad choice results)
    if (current.type === "outcome") {
      console.log('Outcome segment - looking for next decision or ending');
      
      // Find the next decision segment or end the module
      let nextIndex = currentSegment + 1;
      while (nextIndex < moduleSegments.length && 
             moduleSegments[nextIndex].type !== "decision") {
        nextIndex++;
      }
      
      if (nextIndex >= moduleSegments.length) {
        console.log('NAVIGATING - no more decisions after outcome');
        navigate('/mysterymountain');
        return;
      }
      
      setCurrentSegment(nextIndex);
      updateActualProgress(nextIndex);
      return;
    }

    // Handle good choice segments
    if (current.type === "good") {
      console.log('Good segment - looking for next decision or ending');
      
      // Find the next decision segment or end the module
      let nextIndex = currentSegment + 1;
      while (nextIndex < moduleSegments.length && 
             moduleSegments[nextIndex].type !== "decision") {
        nextIndex++;
      }
      
      if (nextIndex >= moduleSegments.length) {
        console.log('NAVIGATING - no more decisions after good choice');
        navigate('/mysterymountain');
        return;
      }
      
      setCurrentSegment(nextIndex);
      updateActualProgress(nextIndex);
      return;
    }

    // Check for module end
    if (isAtModuleEnd()) {
      console.log('NAVIGATING - end segment reached');
      navigate('/mysterymountain');
      return;
    }

    // Normal forward movement (fallback)
    const nextSegment = currentSegment + 1;
    if (nextSegment < moduleSegments.length) {
      setCurrentSegment(nextSegment);
      updateActualProgress(nextSegment);
    } else {
      navigate('/mysterymountain');
    }
  };

  const handlePrevious = () => {
    const current = moduleSegments[currentSegment];
    
    // If on an outcome or good segment, go back to the decision that led here
    if ((current.type === "outcome" || current.type === "good") && lastDecisionIndex !== null) {
      setCurrentSegment(lastDecisionIndex);
      // Clear the previous response for new choice
      if (lastDecisionIndex === 0) {
        setTOSresponse('');
      } else if (lastDecisionIndex === 5) {
        setRightsresponse('');
      }
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
          Terms of Sneakiness
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

export default MM4;