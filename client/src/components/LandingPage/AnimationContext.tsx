import React, { createContext, useContext, ReactNode } from 'react';

interface AnimationContextType {
  // Add any animation-related state or functions here
  animationsEnabled: boolean;
}

const defaultContext: AnimationContextType = {
  animationsEnabled: true,
};

const AnimationContext = createContext<AnimationContextType>(defaultContext);

export const useAnimation = () => useContext(AnimationContext);

interface AnimationProviderProps {
  children: ReactNode;
}

export const AnimationProvider: React.FC<AnimationProviderProps> = ({ children }) => {
  // You can add state and functions related to animations here
  
  const value = {
    animationsEnabled: true,
  };

  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  );
};

export default AnimationContext; 