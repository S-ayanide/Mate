/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
// import Attach from '../assets/attach.png';
import Picture from '../assets/picture.png';
import Send from '../assets/send.png';
import { db, storage } from '../config';
import { v4 as uuid } from 'uuid';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useStoreState } from '../store';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

const Input: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [img, setImg] = useState<File | null>(null);

  const { currentUser } = useLocalStorage('user');
  const activeUser = useStoreState((state) => state.activeUser);
  const chatID = useStoreState((state) => state.chatID);

  const handleFileChange = (event: React.ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    setImg(file);
  };

  const handleSend = async () => {
    if (chatID) {
      if (img) {
        const storageRef = ref(storage, uuid());

        await uploadBytesResumable(storageRef, img).then(() => {
          getDownloadURL(storageRef).then(async (downloadURL) => {
            try {
              await updateDoc(doc(db, 'chats', chatID), {
                messages: arrayUnion({
                  id: uuid(),
                  text,
                  senderId: currentUser?.uid,
                  data: Timestamp.now(),
                  img: downloadURL,
                }),
              });
            } catch (err) {
              console.error(err);
            }
          });
        });
      } else {
        await updateDoc(doc(db, 'chats', chatID), {
          messages: arrayUnion({
            id: uuid(),
            text,
            senderId: currentUser?.uid,
            data: Timestamp.now(),
          }),
        });
      }

      if (activeUser)
        await updateDoc(doc(db, 'userChats', activeUser.uid), {
          [chatID + '.lastMessage']: {
            text,
          },
          [chatID + '.date']: serverTimestamp(),
        });

      if (currentUser)
        await updateDoc(doc(db, 'userChats', currentUser.uid), {
          [chatID + '.lastMessage']: {
            text,
          },
          [chatID + '.date']: serverTimestamp(),
        });

      setText('');
      setImg(null);
    }
  };

  return (
    <div className="input">
      <input
        type="text"
        value={text}
        placeholder="Type your message"
        onChange={(event) => setText(event.target.value)}
      />
      <div className="send">
        {/* <img src={Attach} alt="Attach" /> */}
        <input type="file" style={{ display: 'none' }} id="file" onChange={(event) => handleFileChange(event)} />
        <label htmlFor="file">
          <img src={Picture} alt="" />
        </label>
        <img src={Send} alt="" onClick={handleSend} />
      </div>
    </div>
  );
};

export default Input;
