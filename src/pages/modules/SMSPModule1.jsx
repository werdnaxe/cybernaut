// Function to check if current segment is ready to proceedimport '../Cybernaut.css';

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Cybernaut.css';
import Scroller from '../../components/Scroller';
import Quiz from '../../components/Quiz';
import { checkpointTwo } from '../../data/mediaArrays';
import Narrator from '../../components/Narrator';
import cybernautCharacter from '../../assets/standing-cybernaut.png';
import winnerCybernaut from './winner-cyb.png';
import { useAuthContext } from '../../features/users/AuthProvider';
import introVideo from './intro.MP4';
import TextInputSubmission from '../../components/TextInputSubmission';

import setNameImage from './set-name.png.PNG';
import setAgeImage from './set-age.png.PNG';
import setPasswordImage from './set-password.png.PNG';
import nameBadOutcome from './name-result-bad.png';
import birthdayBadOutcome from './presents-stolen.PNG';
import locationBadOutcome from './location-decision-bad.png';
import passwordBadOutcome from './hacked-account.png';

const SMSPModule1 = () => {
  const navigate = useNavigate();

  const [currentSegment, setCurrentSegment] = useState(0);
  const [lastDecisionIndex, setLastDecisionIndex] = useState(null);
  const { user, progress, updateProgress } = useAuthContext();
  const totalSegments = 10;
  
  // Track actual progress through the decision tree
  const [actualProgress, setActualProgress] = useState(0);
  const totalProgressSteps = 7; // Welcome, Name, Name Result, Birthday, Birthday Result, Password, Password Result

  const [profileName, setProfileName] = useState('');
  const [profileAge, setProfileAge] = useState('');
  const [profilePassword, setProfilePassword] = useState('');

  // Initialize progress on component mount
  useEffect(() => {
    updateActualProgress(currentSegment);
  }, []);

  // Function to determine if we're at the actual end of the module
  const isAtModuleEnd = () => {
    const current = moduleSegments[currentSegment];
    return (
      current.title === "Well done!" ||
      current.title === "What happened when you entered a simple password..."
    );
  };

  // Function to update progress based on current segment
  const updateActualProgress = (segmentIndex) => {
    let progressStep = 0;
    
    if (segmentIndex >= 0) progressStep = 1; // Welcome (step 1/7)
    if (segmentIndex >= 1) progressStep = 2; // Name decision (step 2/7)
    if (segmentIndex >= 2) progressStep = 3; // Name result - either good or bad (step 3/7)
    if (segmentIndex >= 4) progressStep = 4; // Birthday decision (step 4/7)
    if (segmentIndex >= 5) progressStep = 5; // Birthday result - either good or bad (step 5/7)
    if (segmentIndex >= 7) progressStep = 6; // Password decision (step 6/7)
    if (segmentIndex >= 8) progressStep = 7; // Password result - final (step 7/7)
    
    setActualProgress(progressStep);
  };
  const canProceed = () => {
    const current = moduleSegments[currentSegment];
    
    // Always allow proceeding for non-decision segments
    if (current.type !== "decision") {
      return true;
    }

    // Check specific decision segments
    if (currentSegment === 1) {
      // Username decision - need some input
      return profileName.trim().length > 0;
    }
    
    if (currentSegment === 4) {
      // Birthday decision - need to have clicked any quiz option (profileAge will be the selected option text)
      return profileAge && profileAge.length > 0;
    }
    
    if (currentSegment === 7) {
      // Password decision - need some input
      return profilePassword.trim().length > 0;
    }
    
    return true; // Default to allow proceeding
  };

  const moduleSegments = [
    {
        title: "Welcome to Sinkhole",
        type: "static",
        content: "Time to help Cybernaut create a social media profile.",
        interactive: (
          <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-8">
            <video
              src={introVideo}
              alt="Choose a profile name"
              className="w-[300px] h-auto rounded-lg shadow-md"
              autoPlay
              muted
              playsInline
            />
          </div>
        )
    },
    {
        title: "Choose a Profile Name",
        type: "decision",
        content: "Cybernaut's full name is Cybernaut C. Cool. What should Cybernaut put for a username?",
        interactive: (
          <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-8">
            <img
              src={setNameImage}
              alt="Choose a profile name"
              className="w-[300px] h-auto rounded-lg shadow-md"
            />
            <TextInputSubmission 
              value={profileName} 
              onChange={setProfileName}
              placeholder="Enter a username..."
            />
          </div>
        )
    },
    {
        title: "Smart choice!",
        type: "good",
        content: "Here's why that was the right move...",
        interactive: (
          <Narrator
            text="You choose a username that's creative safe — not a full name. That protects Cybernaut's identity. Smart thinking!"
            image={cybernautCharacter}
          />
        )
    },
    {
        title: "What happened when you entered Cybernaut's full name...",
        type: "outcome",
        content: "Someone tried to imperssonate Cybernaut at school!",
        interactive: (
          <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-8">
            <img
              src={nameBadOutcome}
              alt="Bad outcome..."
              className="w-[800px] h-auto rounded-lg shadow-md"
            />
          </div>
        )
    },
    {
        title: "Enter Cybernaut's Birthday",
        type: "decision",
        content: "Cybernaut was actually born on Janurary 1, 1010. What should Cybernaut say here?",
        interactive: (
          <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-8">
            <img
              src={setAgeImage}
              alt="Enter what Cybernaut should say here"
              className="w-[300px] h-auto rounded-lg shadow-md"
            />
            <Quiz
              options={['Janurary 1, 1010', 'Janurary 2, 1901', 'October 3, 2004', 'June 30, 5067']} 
              correctAnswer={null} // Remove correctAnswer to get the actual option text
              onAnswer={setProfileAge}
            />
          </div>
        )
    },
    {
        title: "Good thinking!",
        type: "good",
        content: "Here's why that was the right move...",
        interactive: (
          <Narrator
            text="You choose a fake birthday. That keeps others from pretending to be Cybernaut. Good thinking!"
            image={winnerCybernaut}
          />
        )
    },
    {
        title: "What happened when you entered Cybernaut's real birthday...",
        type: "outcome",
        content: "Someone stole Cybernaut's birthday presents!",
        interactive: (
          <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-8">
            <img
              src={birthdayBadOutcome}
              alt="Bad outcome..."
              className="w-[800px] h-auto rounded-lg shadow-md"
            />
          </div>
        )
    },
    {
        title: "Choose Cybernaut's Password",
        type: "decision",
        content: "What should Cybernaut say here?",
        interactive: (
          <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-8">
            <img
              src={setPasswordImage}
              alt="Enter what Cybernaut should say here"
              className="w-[300px] h-auto rounded-lg shadow-md"
            />
            <TextInputSubmission 
              value={profilePassword} 
              onChange={setProfilePassword}
              placeholder="Enter a password..."
            />
          </div>
        )
    },
    {
        title: "Well done!",
        type: "good",
        content: "Here's why that was the right move...",
        interactive: (
          <Narrator
            text="You choose a password with both upper and lower case letters, numbers, and symbols. That makes it really hard to guess. Well done!"
            image={cybernautCharacter}
          />
        )
    },
    {
        title: "What happened when you entered a simple password...",
        type: "outcome",
        content: "Hack-A-Byte was able to get in to Cybernaut's Sinkhole account!",
        interactive: (
          <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-8">
            <img
              src={passwordBadOutcome}
              alt="Bad outcome..."
              className="w-[800px] h-auto rounded-lg shadow-md"
            />
          </div>
        )
    }
  ];

  const containsCybernautName = (name) => {
    const normalized = name.toLowerCase().replace(/[^a-z]/g, '');
    return normalized.includes('cybernautcool') || normalized.includes('cybernautccool');
  };

  const handleNext = () => {
    console.log('=== handleNext DEBUG ===');
    console.log('Current Segment:', currentSegment);
    console.log('Total Segments:', moduleSegments.length);
    console.log('Can Proceed?', canProceed());
    
    // Don't allow proceeding if validation fails
    if (!canProceed()) {
      console.log('❌ Cannot proceed - interaction required');
      return;
    }
    
    // SAFETY CHECK: If we're at or past the last segment, navigate immediately
    if (currentSegment >= moduleSegments.length - 1) {
      console.log('🚀 NAVIGATING - at or past last segment');
      navigate('/SocialMediaPassage');
      return;
    }

    const current = moduleSegments[currentSegment];
    console.log('Current Title:', current.title);
    console.log('Current Type:', current.type);
    console.log('========================');

    if (currentSegment === 1) {
      // Username decision
      const isCybernaut = containsCybernautName(profileName);
      console.log('Username decision - isCybernaut:', isCybernaut);
      setLastDecisionIndex(currentSegment);
      const nextSegment = isCybernaut ? 3 : 2;
      setCurrentSegment(nextSegment);
      updateActualProgress(nextSegment);
      return;
    }

    if (current.type === "decision" && currentSegment !== 1) {
      setLastDecisionIndex(currentSegment);

      if (currentSegment === 4) {
        // Birthday decision
        console.log('Birthday decision - profileAge:', profileAge);
        const correct = profileAge !== 'Janurary 1, 1010'; // Now comparing with actual selected text
        const nextSegment = correct ? 5 : 6; // good = 5, bad = 6
        setCurrentSegment(nextSegment);
        updateActualProgress(nextSegment);
        return;
      }

      if (currentSegment === 7) {
        // Password decision
        console.log('Password decision - profilePassword:', profilePassword);
        const strongPassword = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9])/.test(profilePassword);
        console.log('Strong password?', strongPassword);
        const nextSegment = strongPassword ? 8 : 9; // good = 8, bad = 9
        setCurrentSegment(nextSegment);
        updateActualProgress(nextSegment);
        return;
      }
    }

    if (current.type === "outcome") {
      console.log('Outcome segment - checking next segment');
      const nextSegment = currentSegment + 1;
      
      // If next segment would be out of bounds, navigate
      if (nextSegment >= moduleSegments.length) {
        console.log('🚀 NAVIGATING - outcome leads past end');
        navigate('/SocialMediaPassage');
        return;
      }
      
      setCurrentSegment(nextSegment);
      updateActualProgress(nextSegment);
      return;
    }

    if (current.type === "good") {
      console.log('Good segment - finding next decision or ending');
      // Skip the outcome and go to the next decision
      let nextIndex = currentSegment + 2;
      while (nextIndex < moduleSegments.length && moduleSegments[nextIndex].type !== "decision") {
        nextIndex++;
      }
      
      console.log('Next index would be:', nextIndex);
      
      // If we've reached the end, navigate
      if (nextIndex >= moduleSegments.length) {
        console.log('🚀 NAVIGATING - reached end through good path');
        navigate('/SocialMediaPassage');
        return;
      }
      
      setCurrentSegment(nextIndex);
      updateActualProgress(nextIndex);
      return;
    }

    // Check for specific ending segments by title
    if (isAtModuleEnd()) {
      console.log('🚀 NAVIGATING - end segment reached by title');
      navigate('/SocialMediaPassage');
      return;
    }

    // Normal forward movement
    const nextSegment = currentSegment + 1;
    if (nextSegment < moduleSegments.length) {
      console.log('Moving to next segment:', nextSegment);
      setCurrentSegment(nextSegment);
      updateActualProgress(nextSegment);
    } else {
      console.log('🚀 NAVIGATING - reached final segment fallback');
      navigate('/SocialMediaPassage');
    }
  };

  const handlePrevious = () => {
    const current = moduleSegments[currentSegment];
    
    if (current.type === "outcome" && lastDecisionIndex !== null) {
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
          Become a Sinkholer
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
                      This is where additional interactive content, exercises, or resources for segment {currentSegment + 1} would go.
                    </p>
                  </div>
                )}
              </div>
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

export default SMSPModule1