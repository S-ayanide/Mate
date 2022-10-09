import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import Checked from '../assets/checked.png';
import { useStoreState } from '../store';

const AddFriend: React.FC = () => {
  const [isEmailSent, setIsEmailSent] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const currentUser = useStoreState((state) => state.currentUser);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as HTMLInputElement;
    if (Object.values(target)[0].value === '') setError('Please enter an email address');
    else {
      // eslint-disable-next-line import/no-named-as-default-member
      emailjs
        .send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          {
            from_name: currentUser?.displayName,
            to_name: Object.values(target)[0].value,
            to_email: Object.values(target)[0].value,
            reply_to: Object.values(target)[0].value,
          },
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        )
        .then(
          (result) => {
            if (result.status === 200) {
              setError('');
              setIsEmailSent(true);
            }
          },
          (error) => {
            setError(error.text);
            setIsEmailSent(false);
          },
        );
    }
  };

  return (
    <div className="addFriend">
      <div className="centerText bold">Assemble Your Friends</div>
      <div className="centerText">
        Mate is more fun with friends. Find out if some of your friends have already joined, or make some new ones!
      </div>
      {!isEmailSent ? (
        <form className="form" onSubmit={(event) => handleSubmit(event)}>
          <input type="email" placeholder="Your friend's email" />
          <div className="error">{error && <p>{error}</p>}</div>

          <button>Add Friend</button>
        </form>
      ) : (
        <div className="form">
          <div className="centerText">
            <img src={Checked} alt="checked" />
          </div>
          <p className="centerText">Invite sent successfully</p>
          <button
            onClick={() => {
              setIsEmailSent(false);
            }}
          >
            Add Another Friend
          </button>
        </div>
      )}
    </div>
  );
};

export default AddFriend;
