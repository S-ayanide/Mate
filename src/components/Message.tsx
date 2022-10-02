// eslint-disable-next-line import/named
import { DocumentData } from 'firebase/firestore';
import React, { useEffect, useRef } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useStoreState } from '../store';

interface IMessage {
  message: DocumentData;
}

const Message: React.FC<IMessage> = ({ message }) => {
  const { currentUser } = useLocalStorage('user');
  const activeUser = useStoreState((state) => state.activeUser);

  const ref = useRef<any>(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ behaviour: 'smooth' });
  }, [message]);

  return (
    <div ref={ref} className={`message ${message.senderId === currentUser?.uid && 'owner'}`}>
      <div className="messageInfo">
        <img
          src={
            message.senderId === currentUser?.uid ? (currentUser?.photoURL as string) : (activeUser?.photoURL as string)
          }
          alt={currentUser?.displayName as string}
        />
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
};

export default Message;
