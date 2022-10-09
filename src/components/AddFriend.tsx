import React, { useState } from 'react';
import Checked from '../assets/checked.png';
import ReactDOMServer from 'react-dom/server';
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
      const emailBody = ReactDOMServer.renderToStaticMarkup(
        <div style={{ backgroundColor: 'rgb(237,218,205)', width: '100%' }}>
          <div className="centerText">
            <img
              style={{ width: '150px', height: 'auto', marginLeft: '2.5%' }}
              src="https://i.ibb.co/SvXD6Dy/mote.png"
              alt="Mate"
            />
          </div>
          <div style={{ backgroundColor: 'white', width: '90%', padding: '10px', marginLeft: '3%' }}>
            <p>
              Hello {Object.values(target)[0].value},
              <br />
              <br />
              Mate is a new age, instant messaging service that also provides optional end-to-end encrypted chats and
              video calling, file sharing, and several other features.
            </p>
            <p>
              {currentUser?.displayName} has given you a special invite to join them on Mate, and carry on the
              conversation.
              <br />
              <br />
              Don&apos;t miss out on this opportunity and click here to accept your invitation:{' '}
              <a href={`${import.meta.env.VITE_APP_HOSTING_URL}/signup`} target="_blank" rel="noopener noreferrer">
                Accept Invitation
              </a>
              <br />
              <br />
            </p>
          </div>
          <br />
          <p style={{ fontSize: '12px', marginLeft: '3%', paddingBottom: '3%' }}>
            Best wishes,
            <br />
            Sayan
            <br />
            (Creator of Mate)
          </p>
        </div>,
      );

      Email.send({
        Host: 'smtp.elasticemail.com',
        Username: import.meta.env.VITE_SMTPJS_SMTP_USERNAME,
        Password: import.meta.env.VITE_SMTPJS_SMTP_PASSWORD,
        To: Object.values(target)[0].value,
        From: import.meta.env.VITE_SMTPJS_SMTP_USERNAME,
        Subject: `${currentUser?.displayName} has invited you to join Mate`,
        Body: emailBody,
      }).then(() => {
        setError('');
        setIsEmailSent(true);
      });
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
