import { useState, useEffect, useCallback, useContext, createContext, use } from 'react';
import { useAuthContext } from './AuthProvider';
import * as usersAPI from './api';

// Allow a user to login
export function useLoginUser() {
  const { loginAction } = useAuthContext();

  const loginUser = async (payload) => {
    try {
      await loginAction(payload);   // calls loginAction from AuthProvider
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return { loginUser };
}

// Create a new user and progress doc
export function useCreateUser() {
  const createUser = useCallback(async (payload) => {
    const newUser = await usersAPI.createUser(payload);

    // Seed modules field with default values
    const defaultModules = [
      { title: 'SMSP', nextSubmodule: 1, isDisabled: false },
      { title: 'SMSP', nextSubmodule: 2, isDisabled: true },
      { title: 'SMSP', nextSubmodule: 3, isDisabled: true },
      { title: 'SMSP', nextSubmodule: 4, isDisabled: true },
      { title: 'MM', nextSubmodule: 5, isDisabled: true },
      { title: 'MM', nextSubmodule: 6, isDisabled: true },
      { title: 'MM', nextSubmodule: 7, isDisabled: true },
      { title: 'MM', nextSubmodule: 8, isDisabled: true },
      { title: 'DDP', nextSubmodule: 9, isDisabled: true },
      { title: 'DDP', nextSubmodule: 10, isDisabled: true },
      { title: 'DDP', nextSubmodule: 11, isDisabled: true },
      { title: 'DDP', nextSubmodule: 12, isDisabled: true }
    ]

    const newProgress = await usersAPI.createProgress({ 
      user: newUser._id,
      modules: defaultModules
    });
    
    if (!newProgress) {
      throw new Error('Failed to create progress document');
    }
    
  }, [])
  
  return { createUser };
}

// Update user's progress upon completing a module
export function useCompleteModule() {
  const { user, progress, updateProgress } = useAuthContext();
  const completeModule = useCallback(async (moduleConfig) => {
    const {
      title,
      nextSubmodule,
      isDisabled = false,
      actualProgress,
      totalProgressSteps,
    } = moduleConfig;

    // Check here to see if next module is already unlocked (has been updated previously)
    if (progress.modules.some(module => module.nextSubmodule === nextSubmodule && !module.isDisabled)) {
      return { success: false, message: 'Next module is already unlocked' };   // will ensure extra XP points are not added to user's progress
    }

    // Map through existing modules to find the one to update (AKA the next one)
    const updatedModules = progress.modules.map(
      (module) => module.nextSubmodule === nextSubmodule
        ? {
            ...module,
            isDisabled: false   // ensure next module is unlocked
          }
        : module
    );

    // Update progress doc in database
    try {
      await updateProgress(
        user._id,
        {
          XP: progress.XP + actualProgress * (100 / totalProgressSteps),
          modules: updatedModules
        }
      );
      return { success: true, message: 'Progress updated successfully' };
    } catch (error) {
      // console.error('Error updating progrss:', error);
      return { success: false, error };
    }
  }, [user, progress, updateProgress]);

  return { completeModule };
}
