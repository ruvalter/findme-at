import React, { useState, createContext, useContext, useEffect } from 'react';
import { authMethods } from '../../firebase/auth-methods';
import { auth } from '../../firebase/firebase';
import { getUserInfo } from '../services/user-service';

export const firebaseAuth = createContext({} as any);

export const useAuthContext = () => useContext(firebaseAuth);

const AuthProvider = (props: any) => {
  const initState = { email: '', password: '' };
  const [inputs, setInputs] = useState(initState);
  const [errors, setErrors] = useState([]);
  const [token, setToken] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const [pending, setPending] = useState(true);
  // eslint-disable-next-line
  const [loggedUser, setLoggedUser] = useState(null as any);

  useEffect(() => {
    auth.onAuthStateChanged(async (user: any) => {
      const userInfo = (await getUserInfo(user?.uid)) as any;
      setLoggedUser(userInfo);
      setPending(false);
    });
  }, []);

  const handleSignup = () => {
    // middle man between firebase and signup
    console.log('handleSignup');
    // calling signup from firebase server
    authMethods.signup(inputs.email, inputs.password, setErrors, setToken);
    setLoggedUser({ ...loggedUser });
    console.log(errors, token);
  };

  const handleSignin = () => {
    //changed to handleSingin
    console.log('handleSignin!!!!');
    // made signup signin
    authMethods.signin(
      inputs.email,
      inputs.password,
      setErrors,
      setToken,
      setCurrentUser
    );
    setLoggedUser({ ...loggedUser, logged: true });
    console.log(errors, token);
    console.log(currentUser);
  };

  const handleSignout = () => {
    authMethods.signout(setErrors, setToken);
  };

  return (
    <firebaseAuth.Provider
      value={{
        loggedUser,
        pending,
        handleSignup,
        handleSignin,
        token,
        inputs,
        setInputs,
        errors,
        handleSignout,
      }}
    >
      {props.children}
    </firebaseAuth.Provider>
  );
};

export default AuthProvider;
