import React from 'react';
import * as API from '@api';

/* TODO:
Complete the UserProvider to manage user data and phone number masking.
1. Fetch user data with API.me() on provider's mount.
2. Implement a function to toggle phone number masking (you can fetch unmasked phone number with API.phone()
3. Pass down the user data and the toggle function to the context value.
*/

const UserContext = React.createContext(null);

interface UserProviderProps {
  children: React.ReactNode;
}

const userCache = {};

export const UserProvider = ({children}: UserProviderProps) => {
  const [user, setUser] = React.useState(null);
  const [showPhoneNumber, setShowPhoneNumber] = React.useState(false);
  const [displayedNumber, setDisplayedNumber] = React.useState('');

  React.useEffect(() => {
    if (!user) {
      fetchUserData();
    }

    async function fetchUserData() {
      const userData = await API.me();
      setUser(userData);
      setDisplayedNumber(userData.masked_phone);
    }
  }, []);

  React.useEffect(() => {
    if (showPhoneNumber) {
      userCache[user.id]
        ? setDisplayedNumber(userCache[user.id])
        : fetchPhoneNumber();
    } else {
      setDisplayedNumber(user?.masked_phone);
    }

    async function fetchPhoneNumber() {
      const {phone} = await API.phone();
      userCache[user.id] = phone;
      setDisplayedNumber(phone);
    }
  }, [showPhoneNumber]);

  function togglePhoneDisplay() {
    setShowPhoneNumber((show) => !show);
  }

  const value = {user, togglePhoneDisplay, displayedNumber, showPhoneNumber};

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be called within a UserContext provider');
  }
  return context;
};
