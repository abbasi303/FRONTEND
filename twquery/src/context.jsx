import React, { useState, createContext } from 'react'

export const DarkContext = createContext();

export const DarkContextProvider = ({ children }) => {
  const [dark, setDark] = useState(false);

  return (
    <DarkContext.Provider value={{ dark, setDark }}>
      {children}
    </DarkContext.Provider>
  );
};

export const LangContext = createContext();

export const LangContextProvider = ({ children }) => {
  const [eng, setEng] = useState(false);

  return (
    <LangContext.Provider value={{ eng, setEng }}>
      {children}
    </LangContext.Provider>
  );
};