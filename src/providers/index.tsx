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

export const UserProvider = ({children}: UserProviderProps) => {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    if (!user) {
      fetchUserData();
    }

    async function fetchUserData() {
      const userData = await API.me();
      setUser(userData);
    }
  }, []);

  const value = {user};

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be called within a UserContext provider');
  }
  return context;
};
