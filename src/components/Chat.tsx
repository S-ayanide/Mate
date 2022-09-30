import React from 'react';
import Camera from '../assets/video-call.png';
import AddFriend from '../assets/add-friend.png';
import More from '../assets/more.png';

const Chat: React.FC = () => {
  return (
    <div className="chat">
      <div className="chatInfo">
        <span>Jane</span>
        <div className="chatIcons">
          <img src={Camera} alt="Camera" />
          <img src={AddFriend} alt="Add" />
          <img src={More} alt="settings" />
        </div>
      </div>
    </div>
  );
};

export default Chat;
