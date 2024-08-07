// src/context/SpeakTotals.js
import React, { createContext, useContext } from 'react';

const SpeakTotalsContext = createContext();

export const SpeakTotalsProvider = ({ children, speakTotals }) => (
  <SpeakTotalsContext.Provider value={speakTotals}>
    {children}
  </SpeakTotalsContext.Provider>
);

export const useSpeakTotals = () => useContext(SpeakTotalsContext);
