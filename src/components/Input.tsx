import React from 'react';
import Attach from '../assets/attach.png';
import Picture from '../assets/picture.png';

const Input: React.FC = () => {
  return (
    <div className="input">
      <input type="text" placeholder="Type your message" />
      <div className="send">
        <img src={Attach} alt="Attach" />
        <input type="file" style={{ display: 'none' }} id="file" />
        <label htmlFor="file">
          <img src={Picture} alt="" />
        </label>
      </div>
    </div>
  );
};

export default Input;
