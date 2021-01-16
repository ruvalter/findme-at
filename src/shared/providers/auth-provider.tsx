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
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const lastSignInTime = new Date(user.metadata.lastSignInTime as string);
        const lastSignInTimeTimeStamp = Math.round(
          lastSignInTime.getTime() / 1000
        );
        const yesterdayTimeStamp =
          Math.round(new Date().getTime() / 1000) - 24 * 3600;
        if (lastSignInTimeTimeStamp < yesterdayTimeStamp) {
          await handleSignout();
          setPending(false);
          return false;
        }
        const userInfo = (await getUserInfo(user?.uid)) as any;
        setLoggedUser(userInfo);
      }
      setPending(false);
    });
  }, []);

  const handleSignup = () => {
    authMethods.signup(inputs.email, inputs.password, setErrors, setToken);

    setLoggedUser({ ...loggedUser });
  };

  const handleSignin = () => {
    authMethods.signin(
      inputs.email,
      inputs.password,
      setErrors,
      setToken,
      setCurrentUser
    );

    setLoggedUser({ ...loggedUser, logged: true });
    console.log(currentUser);
  };

  const handleSignout = () => {
    authMethods.signout(setErrors, setToken, setLoggedUser);
  };

  return (
    <firebaseAuth.Provider
      value={{
        loggedUser,
        pending,
        token,
        inputs,
        errors,
        handleSignup,
        handleSignin,
        setInputs,
        handleSignout,
      }}
    >
      {props.children}
    </firebaseAuth.Provider>
  );
};

export default AuthProvider;
