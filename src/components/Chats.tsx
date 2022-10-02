// eslint-disable-next-line import/named
import { doc, DocumentData, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../config';
import { useLocalStorage } from '../hooks/useLocalStorage';

const Chats: React.FC = () => {
  const [chats, setChats] = useState<{ [s: string]: DocumentData } | ArrayLike<DocumentData> | undefined>();
  const { currentUser } = useLocalStorage();

  useEffect(() => {
    const getChats = () => {
      if (currentUser) {
        console.log(currentUser);
        const unsub = onSnapshot(doc(db, 'userChats', currentUser.uid), (doc) => {
          console.log('Data: ', doc.data());
          setChats(doc.data() as DocumentData[]);
        });

        return () => {
          unsub();
        };
      }
    };

    currentUser?.uid && getChats();
  }, [currentUser?.uid]);

  return (
    <div className="chats">
      {chats &&
        Object.entries(chats)?.map((chat) => (
          <div key={chat[1].userInfo.uid} className="userChat">
            <img src={chat[1].userInfo.photoURL} alt={chat[1].displayName} />
            <div className="userChatInfo">
              <span>{chat[1].userInfo.displayName}</span>
              <p>{chat[1].userInfo.lastMessage?.text}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Chats;
