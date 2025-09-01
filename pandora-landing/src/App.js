import React from 'react';
import Layout from './components/layout/Layout';
import Hero from './components/sections/Hero';
import ProblemSolution from './components/sections/ProblemSolution';
import Features from './components/sections/Features';
import Team from './components/sections/Team';
import EarlyAccess from './components/sections/EarlyAccess';
import UseCases from './components/sections/UseCases';
import MarketOpportunity from './components/sections/MarketOpportunity';
import Roadmap from './components/sections/Roadmap';
import './App.css';

function App() {
  return (
    <Layout>
      <div id="hero">
        <Hero />
      </div>
      <div id="problem-solution">
        <ProblemSolution />
      </div>
      <div id="features">
        <Features />
      </div>
      <div id="use-cases">
        <UseCases />
      </div>
      <div id="market-opportunity">
        <MarketOpportunity />
      </div>
      <div id="roadmap">
        <Roadmap />
      </div>
      <div id="team">
        <Team />
      </div>
      <div id="early-access">
        <EarlyAccess />
      </div>
      {/* Autres sections à venir */}
    </Layout>
  );
}

export default App;
