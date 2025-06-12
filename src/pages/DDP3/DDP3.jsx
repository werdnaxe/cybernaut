import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Cybernaut.css';
import BreathingTriangle from '../../components/BreathingTriangle';
import BoxBreathing from '../../components/BoxBreathing';
import BellyBreathing from '../../components/BellyBreathing';
import Quiz from '../../components/Quiz';
import Narrator from '../../components/Narrator';
import TextInputSubmission from '../../components/TextInputSubmission';
import cybernautCharacter from '../../assets/standing-cybernaut.png';

import cybVsFinalBoss from './cyb-vs-final-boss.png';
import neverBeatMe from './never-beat-me.png';
import moreEmotion from './more-emotion.png';
import bossCracking from './boss-cracking.png';
import peacefulCyb from './peaceful-cyb.png';
import bossAlmostDead from './boss-almost-dead.png';
import victory from './victory.png';
import bossRecovering from './boss-recovering.png';

const DDP3 = () => {
  const navigate = useNavigate();

  const [currentSegment, setCurrentSegment] = useState(0);
  const [lastDecisionIndex, setLastDecisionIndex] = useState(null);
  
  const [actualProgress, setActualProgress] = useState(0);
  const totalProgressSteps = 8;
  
  const [firstDecision, setFirstDecision] = useState('');
  const [secondDecision, setSecondDecision] = useState('');
  const [finalDecision, setFinalDecision] = useState('');
  const [breathingChoice, setBreathingChoice] = useState('');
  const [userReflection, setUserReflection] = useState('');

  // Initialize progress on component mount
  useEffect(() => {
    updateActualProgress(currentSegment);
  }, []);

  const updateActualProgress = (segmentIndex) => {
    let progressStep = 0;
    
    if (segmentIndex >= 0) progressStep = 1; // Enter
    if (segmentIndex >= 1) progressStep = 2; // Final Boss Taunts
    if (segmentIndex >= 2) progressStep = 3; // First decision made
    if (segmentIndex >= 3) progressStep = 4; // First decision response
    if (segmentIndex >= 6) progressStep = 5; // Second decision made
    if (segmentIndex >= 7) progressStep = 6; // Second decision response
    if (segmentIndex >= 11) progressStep = 7; // Final decision
    if (segmentIndex >= 12) progressStep = 8; // Final victory
    
    setActualProgress(progressStep);
  };

  const canProceed = () => {
    const current = moduleSegments[currentSegment];
    
    // Interaction validation
    if (currentSegment === 2) {
        return firstDecision !== '';
    }
    if (currentSegment === 4) {
        return breathingChoice !== '';
    }
    if (currentSegment === 7) {
        return secondDecision !== '';
    }
    if (currentSegment === 11) {
        return finalDecision !== '';
    }

    return true;
  };

  const isAtModuleEnd = () => {
    const current = moduleSegments[currentSegment];
    return (
        current.title === "Victory!" ||
        current.title === "Module Complete!" ||
        current.title === "The Light of Complete Mindfulness" ||
        currentSegment >= moduleSegments.length - 1
    );
  };

  const moduleSegments = [
    {
      title: "The Core of the Sinkhole", 
      type: "static",
      content: "Cybernaut steps into the heart of the digital sinkhole and sees the Final Boss, sitting on a throne made of pop-ups, angry DMs, and viral content.", 
      interactive: (
        <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-8">
        <img
            src={cybVsFinalBoss}
            alt="Bad outcome..."
            className="w-[800px] h-auto rounded-lg shadow-md"
        />
        </div>
      )
    },
    {
      title: "The Challenge", 
      type: "static",
      content: "The Final Boss laughs with a sound like breaking glass and endless notification pings.", 
      interactive: (
        <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-8">
        <img
            src={neverBeatMe}
            alt="Bad outcome..."
            className="w-[800px] h-auto rounded-lg shadow-md"
        />
        </div>
      )
    },
    {
      title: "First Challenge: Stay Grounded", 
      type: "decision",
      content: "The chaos is overwhelming. What should Cybernaut do?", 
      interactive: (
        <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-8">
          <Quiz
            options={[
              'React with anger',
              'Use breathing exercise',
              'Run away',
              'Cover ears and eyes'
            ]}
            onAnswer={(choice) => {
              const choiceMap = {
                'React with anger': 'anger',
                'Use breathing exercise': 'breathing',
                'Run away': 'run',
                'Cover ears and eyes': 'cover'
              };
              setFirstDecision(choiceMap[choice]);
            }}
          />
        </div>
      )
    },
    {
      title: "The Final Boss grew more powerful...", 
      type: "outcome",
      content: "That approach made things worse. The Final Boss feeds on strong emotions and avoidance behaviors.", 
      interactive: (
        <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-8">
        <img
            src={moreEmotion}
            alt="Bad outcome..."
            className="w-[800px] h-auto rounded-lg shadow-md"
        />
        </div>
      )
    },
    {
      title: "Choose Your Breathing Style", 
      type: "decision",
      content: "Which should Cybernaut do?", 
      interactive: (
        <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-8">
          <Quiz
            options={[
              'Box Breathing (4-4-4-4)',
              'Triangle Breathing (4-7-8)',
              'Belly Breathing (simple)',
              'Try them all!'
            ]}
            onAnswer={(choice) => {
              const choiceMap = {
                'Box Breathing (4-4-4-4)': 'box',
                'Triangle Breathing (4-7-8)': 'triangle',
                'Belly Breathing (simple)': 'belly',
                'Try them all!': 'all'
              };
              setBreathingChoice(choiceMap[choice]);
            }}
          />
        </div>
      )
    },
    {
      title: "The Power of Breath", 
      type: "good",
      content: "You focus on your breathing. The room begins to steady as your nervous system calms.", 
      interactive: (
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="w-full">
            {breathingChoice === 'box' && <BoxBreathing />}
            {breathingChoice === 'triangle' && <BreathingTriangle />}
            {breathingChoice === 'belly' && <BellyBreathing />}
            {breathingChoice === 'all' && (
              <div className="space-y-4">
                <BoxBreathing />
                <BreathingTriangle />
                <BellyBreathing />
              </div>
            )}
          </div>
        </div>
      )
    },
    {
      title: "Final Boss Weakens", 
      type: "static",
      content: "For the first time, the Final Boss weakens, he starts to crack.", 
      interactive: (
        <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-8">
        <img
            src={bossCracking}
            alt="Bad outcome..."
            className="w-[800px] h-auto rounded-lg shadow-md"
        />
        </div>
      )
    },
    {
      title: "Second Challenge: Stay Present", 
      type: "decision",
      content: "What should Cybernaut do to stay present now?", 
      interactive: (
        <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-8">
          <Quiz
            options={[
              'Scroll to distract',
              'Use 5-4-3-2-1 grounding',
              'Taunt the Final Boss',
              'Freeze and wait'
            ]}
            onAnswer={(choice) => {
              const choiceMap = {
                'Scroll to distract': 'scroll',
                'Use 5-4-3-2-1 grounding': 'grounding',
                'Taunt the Final Boss': 'taunt',
                'Freeze and wait': 'freeze'
              };
              setSecondDecision(choiceMap[choice]);
            }}
          />
        </div>
      )
    },
    {
      title: "Falling Back Into the Trap", 
      type: "outcome",
      content: "The Final Boss regains his strength. You need a different approach.", 
      interactive: (
        <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-8">
        <img
            src={bossRecovering}
            alt="Bad outcome..."
            className="w-[800px] h-auto rounded-lg shadow-md"
        />
        </div>
      )
    },
    {
      title: "Grounding in Reality", 
      type: "good",
      content: "Great job! You used the 5-4-3-2-1 grounding technique. This brings you fully into the present moment.", 
      interactive: (
        <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-8">
          <Narrator
            text="You named; 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste."
            image={peacefulCyb}
            float
          />
        </div>
      )
    },
    {
      title: "Your Mindfulness Practices are working...", 
      type: "static",
      content: "You've almost done it! Keep going!", 
      interactive: (
        <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-8">
        <img
            src={bossAlmostDead}
            alt="Boss dying..."
            className="w-[800px] h-auto rounded-lg shadow-md"
        />
        </div>
      )
    },
    {
      title: "Final Challenge: Complete Victory", 
      type: "decision",
      content: "The Final Boss is almost defeated. What last method should Cybernaut try?", 
      interactive: (
        <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-8">
          <Quiz
            options={[
              'Use journaling',
              'Reflect on learning',
              'Visualize safe place',
              'Combine ALL skills'
            ]}
            onAnswer={(choice) => {
              const choiceMap = {
                'Use journaling': 'journal',
                'Reflect on learning': 'reflect',
                'Visualize safe place': 'visualize',
                'Combine ALL skills': 'all'
              };
              setFinalDecision(choiceMap[choice]);
            }}
          />
        </div>
      )
    },
    {
      title: "Victory!", 
      type: "static",
      content: "You beat him—with your BRAIN! You've freed everyone from mindless scrolling! Now Sinkhole can become a more peaceful place.", 
      interactive: (
        <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-8">
          <img
            src={victory}
            alt="Victory"
            className="w-[800px] h-auto rounded-lg shadow-md"
          />
        </div>
      )
    }
  ];

  // DECISION LOGIC
  const handleNext = () => {
    console.log('=== handleNext DEBUG ===');
    console.log('Current Segment:', currentSegment);
    console.log('Can Proceed?', canProceed());
    
    if (!canProceed()) {
      console.log('Cannot proceed - interaction required');
      return;
    }
    
    if (currentSegment >= moduleSegments.length - 1) {
      console.log('NAVIGATING - at or past last segment');
      navigate('/datadetoxpit');
      return;
    }

    const current = moduleSegments[currentSegment];

    // DECISION LOGIC FOR SEGMENT 2 (First Challenge)
    if (currentSegment === 2) {
      setLastDecisionIndex(currentSegment);
      let nextSegment = null;

      if (firstDecision === 'breathing') {
        nextSegment = 4; // Good choice
      } else {
        nextSegment = 3; // Bad choice
      }
      
      if (nextSegment !== null) {
        setCurrentSegment(nextSegment);
        updateActualProgress(nextSegment);
      }
      return;
    }

    // Always proceed to breathing practice
    if (currentSegment === 4) {
      setCurrentSegment(5);
      updateActualProgress(5);
      return;
    }

    // DECISION LOGIC FOR SEGMENT 7 (Second Challenge)
    if (currentSegment === 7) {
      setLastDecisionIndex(currentSegment);
      let nextSegment = null;

      if (secondDecision === 'grounding') {
        nextSegment = 9; // Good choice
      } else {
        nextSegment = 8; // Bad choice
      }

      if (nextSegment !== null) {
        setCurrentSegment(nextSegment);
        updateActualProgress(nextSegment);
      }
      return;
    }

    if (currentSegment === 11) {
        setLastDecisionIndex(currentSegment);
        let nextSegment = null;

        if (finalDecision !== '') {
            nextSegment = 12; // Victory
        }

        if (nextSegment !== null) {
            setCurrentSegment(nextSegment);
            updateActualProgress(nextSegment);
        }
        return;
    }

    // Handle outcome segments
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
        navigate('/datadetoxpit');
        return;
      }
      
      setCurrentSegment(nextIndex);
      updateActualProgress(nextIndex);
      return;
    }

    // Handle good choice segments
    if (current.type === "good") {
    console.log('Good segment - looking for next segment');
    
    // After breathing exercise, always go to segment 6
    if (currentSegment === 5) {
        setCurrentSegment(6);
        updateActualProgress(6);
        return;
    }
    
    // For other good segments, go to next decision segment or end of module
    let nextIndex = currentSegment + 1;
    while (nextIndex < moduleSegments.length && 
            moduleSegments[nextIndex].type !== "decision") {
        nextIndex++;
    }
    
    if (nextIndex >= moduleSegments.length) {
        console.log('NAVIGATING - no more decisions after good choice');
        navigate('/datadetoxpit');
        return;
    }
    
    setCurrentSegment(nextIndex);
    updateActualProgress(nextIndex);
    return;
    }

    // Normal forward movement (fallback)
    const nextSegment = currentSegment + 1;
    if (nextSegment < moduleSegments.length) {
      setCurrentSegment(nextSegment);
      updateActualProgress(nextSegment);
    } else {
      navigate('/datadetoxpit');
    }
  };

  const handlePrevious = () => {
    const current = moduleSegments[currentSegment];
    
    // If on an outcome or good segment, go back to the decision that led here
    if ((current.type === "outcome" || current.type === "good") && lastDecisionIndex !== null) {
      setCurrentSegment(lastDecisionIndex);
      // Clear the previous response for new choice
      if (lastDecisionIndex === 2) {
        setFirstDecision('');
      } else if (lastDecisionIndex === 4) {
        setBreathingChoice('');
      } else if (lastDecisionIndex === 7) {
        setSecondDecision('');
      } else if (lastDecisionIndex === 11) {
        setFinalDecision('');
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
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-8 relative">
        <h1 className="text-3xl font-bold mb-6 text-blue-800 text-center">
          The Final Confrontation
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

export default DDP3;