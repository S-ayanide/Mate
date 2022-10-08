/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import Camera from '../assets/video-call.png';
import AddFriend from '../assets/add-friend.png';
import AddFriendComponent from './AddFriend';
import More from '../assets/more.png';
import Messages from './Messages';
import Input from './Input';
import { useStoreState } from '../store';

const Chat: React.FC = () => {
  const [isAddFriendClicked, setIsAddFriendClicked] = useState<boolean>(false);
  const activeUser = useStoreState((state) => state.activeUser);

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{activeUser?.displayName}</span>
        <div className="chatIcons">
          <img src={Camera} alt="Camera" />
          <img src={AddFriend} alt="Add" onClick={() => setIsAddFriendClicked(!isAddFriendClicked)} />
          <img src={More} alt="settings" />
        </div>
      </div>
      {isAddFriendClicked ? <AddFriendComponent /> : null}
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
