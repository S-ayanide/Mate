import React, { useState } from 'react';
import logo from '../assets/mote.png';
import userAvatar from '../assets/add-user.png';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db, storage } from '../config';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import LoadingWrapper from '../components/LoadingWrapper';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [file, setFile] = useState<File>();

  // TODO: Create a toaster to handle error

  const handleFileChange = (event: React.ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    setFile(file);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    // TODO: Add a loader while user is registering

    e.preventDefault();
    const displayName = Object.values(e.target)[0].value;
    const email = Object.values(e.target)[1].value;
    const password = Object.values(e.target)[2].value;

    if (file) {
      const fileName = file.name;
      const fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);
      if (/\.(jpe?g|png|gif)$/i.test(fileName) === false) {
        alert('not an image!');
        return;
      }

      try {
        //Create user
        const res = await createUserWithEmailAndPassword(auth, email, password);

        const storageRef = ref(storage, displayName);

        const metadata = {
          contentType: `image/${fileExtension}`,
        };

        await uploadBytesResumable(storageRef, file, metadata).then(() => {
          getDownloadURL(storageRef).then(async (downloadURL) => {
            try {
              //Update profile
              await updateProfile(res.user, {
                displayName,
                photoURL: downloadURL,
              });
              //create user on firestore
              await setDoc(doc(db, 'users', res.user.uid), {
                uid: res.user.uid,
                displayName,
                email,
                photoURL: downloadURL,
              });

              //create empty user chats on firestore
              await setDoc(doc(db, 'userChats', res.user.uid), {});
              navigate('/');
            } catch (err) {
              console.error(err);
            }
          });
        });
      } catch (err) {
        console.error(err);
      }
    }
    setLoading(false);
  };

  return (
    <LoadingWrapper loading={loading}>
      <div className="formContainer">
        <div className="formWrapper">
          <img className="logo" src={logo} alt="Mote logo" />
          <span className="title">Register</span>
          <form onSubmit={(event) => handleSubmit(event)}>
            <input type="text" placeholder="Display Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <input className="inputForAvatar" type="file" id="avatar" onChange={(event) => handleFileChange(event)} />
            <label htmlFor="avatar">
              <img src={userAvatar} alt="Avatar input" />
              <span>{file ? file.name : 'Add an avatar'}</span>
            </label>
            <button>Sign Up</button>
          </form>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </LoadingWrapper>
  );
};

export default Register;
