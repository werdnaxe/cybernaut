import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Cybernaut.css';
import Quiz from '../../components/Quiz';
import Narrator from '../../components/Narrator';
import { useCompleteModule } from '../../features/users/hooks';

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
  const totalSegments = 10;

  const [actualProgess, setActualProgress] = useState(0);
  const totalProgressSteps = 5;

  const [devision, setDecision] = useState('');

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

    if (segmentIndex === 0) progressStep = 1;
    if (segment === 1) progressStep = 2;
    /* Add more here */

    setActualProgress(progressStep);
  };

  const canProceed = () => {
    const current = moduleSegments[currentSegment];

    if (current.type !== "decision") {
      return true;
    }

    if (currentSegment === 1) {
      return decision
    }
  }


  return (
    <div>hello</div>
  )
}

export default DDPModule1