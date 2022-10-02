// eslint-disable-next-line import/named
import { doc, DocumentData, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../config';
import { useStoreState } from '../store';
import Message from './Message';

const Messages: React.FC = () => {
  const [messages, setMessages] = useState<DocumentData[] | undefined>();
  const activeUser = useStoreState((state) => state.activeUser);
  const chatID = useStoreState((state) => state.chatID);

  useEffect(() => {
    if (chatID) {
      const unsub = onSnapshot(doc(db, 'chats', chatID), (doc) => {
        doc.exists() && setMessages(doc.data().messages as DocumentData[]);
      });

      return () => {
        unsub();
      };
    }
  }, [chatID]);

  return (
    <div className="messages">
      {activeUser ? (
        messages?.map((message) => <Message key={message.id} message={message} />)
      ) : (
        <div className="centerText">
          Please select a user to see conversation
          <br />
          or add a friend if there are no users
        </div>
      )}
    </div>
  );
};

export default Messages;
