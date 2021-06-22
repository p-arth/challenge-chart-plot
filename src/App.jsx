import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import UserInput from './components/UserInput';

function App() {
  return (
    <div className="main-container">
      <Header />
      <UserInput />

      <Footer />
    </div>
  );
}

export default App;
