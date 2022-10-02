import React from 'react';
import Camera from '../assets/video-call.png';
import AddFriend from '../assets/add-friend.png';
import More from '../assets/more.png';
import Messages from './Messages';
import Input from './Input';
import { useStoreState } from '../store';

const Chat: React.FC = () => {
  const activeUser = useStoreState((state) => state.activeUser);

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{activeUser?.displayName}</span>
        <div className="chatIcons">
          <img src={Camera} alt="Camera" />
          <img src={AddFriend} alt="Add" />
          <img src={More} alt="settings" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
