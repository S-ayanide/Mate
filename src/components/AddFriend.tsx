import React, { useState } from 'react';

const AddFriend: React.FC = () => {
  const [error, setError] = useState<string | undefined>(undefined);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as HTMLInputElement;
    if (target.value === undefined) setError('Please enter an email address');
  };

  return (
    <div className="addFriend">
      <div className="centerText bold">Assemble Your Friends</div>
      <div className="centerText">
        Mate is more fun with friends. Find out if some of your friends have already joined, or make some new ones!
      </div>
      <form onSubmit={(event) => handleSubmit(event)}>
        <input type="email" placeholder="Your friend's email" />
        <div className="error">{error && <p>{error}</p>}</div>

        <button>Add Friend</button>
      </form>
    </div>
  );
};

export default AddFriend;
