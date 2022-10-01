import React from 'react';
import logo from '../assets/mote.png';
import userAvatar from '../assets/add-user.png';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db, storage } from '../config';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const navigate = useNavigate();
  // TODO: Create a toaster to handle error

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // TODO: Add a loader while user is registering

    e.preventDefault();
    const displayName = Object.values(e.target)[0].value;
    const email = Object.values(e.target)[1].value;
    const password = Object.values(e.target)[2].value;
    const file = Object.values(e.target)[3].value;

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        const storageRef = ref(storage, displayName);

        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          'state_changed',
          () => console.log('Uploading snapshot'),
          (error) => {
            console.error(error);
          },
          () => {
            console.log('Uploaded successfully');
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
              await updateProfile(user, {
                displayName: displayName,
                photoURL: downloadURL,
              });

              await setDoc(doc(db, 'users', user.uid), {
                uid: user.uid,
                displayName,
                email,
                photoURL: downloadURL,
              });

              await setDoc(doc(db, 'userChat', user.uid), {});
              navigate('/');
            });
          },
        );
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.error(errorMessage);
      });
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <img className="logo" src={logo} alt="Mote logo" />
        <span className="title">Register</span>
        <form onSubmit={(event) => handleSubmit(event)}>
          <input type="text" placeholder="Display Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <input className="inputForAvatar" type="file" id="avatar" />
          <label htmlFor="avatar">
            <img src={userAvatar} alt="Avatar input" />
            <span>Add an avatar</span>
          </label>
          <button>Sign Up</button>
        </form>
        <p>Already have an account? Login</p>
      </div>
    </div>
  );
};

export default Register;
