/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// eslint-disable-next-line import/named
import { User } from 'firebase/auth';
// eslint-disable-next-line import/named
import { doc, DocumentData, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../config';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useStoreActions } from '../store';

const Chats: React.FC = () => {
  const [chats, setChats] = useState<{ [s: string]: DocumentData } | ArrayLike<DocumentData> | undefined>();
  const { currentUser } = useLocalStorage('user');
  const setActiveUser = useStoreActions((actions) => actions.setActiveUser);
  const setChatID = useStoreActions((actions) => actions.setChatID);

  useEffect(() => {
    const getChats = () => {
      if (currentUser) {
        const unsub = onSnapshot(doc(db, 'userChats', currentUser.uid), (doc) => {
          setChats(doc.data() as DocumentData[]);
        });

        return () => {
          unsub();
        };
      }
    };

    currentUser?.uid && getChats();
  }, [currentUser?.uid]);

  const handleSelect = (user: User) => {
    setActiveUser(user);
  };

  return (
    <div className="chats">
      {chats &&
        Object.entries(chats)
          ?.sort((a, b) => b[1].date - a[1].date)
          .map((chat) => (
            <div
              key={chat[1].userInfo.uid}
              className="userChat"
              onClick={() => {
                setChatID(chat[0]);
                handleSelect(chat[1].userInfo);
              }}
            >
              <img src={chat[1].userInfo.photoURL} alt={chat[1].displayName} />
              <div className="userChatInfo">
                <span>{chat[1].userInfo.displayName}</span>
                <p>{chat[1].lastMessage?.text}</p>
              </div>
            </div>
          ))}
    </div>
  );
};

export default Chats;
