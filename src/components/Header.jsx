import React from 'react';

const Header = () => {
  const chosenName = 'Pedro';
  let formattedName = chosenName.trim();

  const nameFormatter = () => {
    if (formattedName.charAt(formattedName.length - 1) === 's') {
      formattedName = formattedName + "'";
    } else {
      formattedName = formattedName + "'s";
    }
    return formattedName;
  };

  return (
    <div className="header">
      <h1>{nameFormatter(formattedName)} Challenge</h1>
    </div>
  );
};

export default Header;
