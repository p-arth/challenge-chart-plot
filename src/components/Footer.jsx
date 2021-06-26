import React from 'react';
import { jsonFormatter } from '../utilities/jsonFormatter';

const Footer = ({ jsonContent, formattedJson, setFormattedJson }) => {
  const handleButtonClick = () => {
    let formattedData = jsonFormatter(jsonContent);
    setFormattedJson(formattedData);
    return console.log('This is a placeholder for now!!!');
  };

  return (
    <div className="footer">
      <button onClick={handleButtonClick}>Generate Chart</button>
    </div>
  );
};

export default Footer;
