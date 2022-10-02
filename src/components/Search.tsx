/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import {
  collection,
  doc,
  // eslint-disable-next-line import/named
  DocumentData,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import React, { useState } from 'react';
import { db } from '../config';
import Cancel from '../assets/cancel.png';
import { useLocalStorage } from '../hooks/useLocalStorage';

const Search: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [users, setUsers] = useState<DocumentData[] | undefined>(undefined);
  const { currentUser } = useLocalStorage();

  const handleSearch = async () => {
    const q = query(collection(db, 'users'));

    try {
      const querySnapshot = await getDocs(q);
      const searchResult: DocumentData[] = [];
      querySnapshot.forEach((doc) => {
        if (doc.data().displayName.toLowerCase().includes(username.toLowerCase())) {
          searchResult.push(doc.data());
        }
      });
      setUsers(searchResult);
    } catch (err) {
      console.error(err);
    }
  };

  const handleKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.code === 'Enter' && handleSearch();
  };

  const handleSelect = async (user: DocumentData) => {
    let combinedUID;
    if (currentUser) {
      try {
        combinedUID = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
        const res = await getDoc(doc(db, 'chats', combinedUID));
        if (!res.exists()) {
          // Create a new chat
          await setDoc(doc(db, 'chats', combinedUID), { messages: [] });
          // Create User chats
          await updateDoc(doc(db, 'userChats', currentUser.uid), {
            [combinedUID + '.userInfo']: {
              uid: user.uid,
              displayName: user.displayName,
              photoURL: user.photoURL,
            },
            [combinedUID + '.date']: serverTimestamp(),
          });
          await updateDoc(doc(db, 'userChats', user.uid), {
            [combinedUID + '.userInfo']: {
              uid: currentUser.uid,
              displayName: currentUser.displayName,
              photoURL: currentUser.photoURL,
            },
            [combinedUID + '.date']: serverTimestamp(),
          });
        }
      } catch (err) {
        console.error(err);
      }

      setUsername('');
      setUsers(undefined);
    }
  };

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <img
          src={Cancel}
          alt="cross"
          onClick={() => {
            setUsername('');
            setUsers(undefined);
          }}
        />
      </div>
      {users && users.length === 0 && <p>No user found</p>}
      {users &&
        users.map((user) => (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/interactive-supports-focus
          <div key={user.uid} className="userChat" onClick={() => handleSelect(user)} role="button">
            <img src={user?.photoURL} alt={user?.photoURL} />
            <div className="userChatInfo">
              <span>{user?.displayName}</span>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Search;
