// eslint-disable-next-line import/named
import { collection, DocumentData, getDocs, query } from 'firebase/firestore';
import React, { useState } from 'react';
import { db } from '../config';

const Search: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [users, setUsers] = useState<DocumentData[]>();
  const [err, setError] = useState<boolean>(false);

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
      setError(true);
    }
  };

  const handleKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.code === 'Enter' && handleSearch();
  };

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      {users &&
        users.map((user) => (
          <div key={user.uid} className="userChat">
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
