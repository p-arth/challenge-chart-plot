import React from 'react';
import { jsonFormatter } from '../utilities/jsonFormatter';
import swal from 'sweetalert2';

const Footer = ({ jsonContent, setFormattedJson }) => {
  const handleButtonClick = () => {
    if (jsonContent.length > 1) {
      let formattedData = jsonFormatter(jsonContent);
      setFormattedJson(formattedData);
    } else {
      swal
        .fire({
          title: 'Invalid data!',
          text: 'Please, insert all kinds of data required!',
          icon: 'error'
        })
        .then(() => {
          window.location.reload();
        });
    }
  };

  return (
    <div className="footer">
      <button data-cy="footer-button" onClick={() => handleButtonClick()}>
        Generate Chart
      </button>
    </div>
  );
};

export default Footer;
