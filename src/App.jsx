import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import UserInput from './components/UserInput';
import UltimateChart from './components/UltimateChart';

function App() {
  return (
    <div className="main-container">
      <Header />
      <UserInput />
      <UltimateChart />
      <Footer />
    </div>
  );
}

export default App;
