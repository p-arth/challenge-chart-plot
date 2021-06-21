import React from 'react';

const Footer = () => {
  const handleButtonClick = () => {
    return console.log('This is a placeholder for now!!!');
  };

  return (
    <div className="footer">
      <button onClick={handleButtonClick}>Generate Chart</button>
    </div>
  );
};

export default Footer;
