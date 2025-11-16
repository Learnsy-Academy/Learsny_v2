import React from 'react';
import { LazyMotion, domAnimation } from 'framer-motion';
import LandingPage from './LandingPage';
import './App.css';

function App() {
  return (
    <LazyMotion features={domAnimation}>
      <div className="App">
        <LandingPage />
      </div>
    </LazyMotion>
  );
}

export default App;
