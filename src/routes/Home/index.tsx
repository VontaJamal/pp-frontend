import React from 'react';
import * as Theme from '@theme';
import {UserProvider, useUser} from '@providers';
// import * as API from '@api';

/* TODO:
1. Center Card component within the #home.
2. Display user's full name and their email. Use UserProvider's functionality (see providers.js)
3. Display user's masked phone number, and implement a way to unmask it. Use UserProvider's context.
*/

const phoneStyle = {
  display: 'flex',
  gap: 10,
};

const Card = () => {
  const {user, togglePhoneDisplay, displayedNumber, showPhoneNumber} =
    useUser();

  if (!user) return;
  const {first_name, last_name, email} = user;

  return (
    <div id='card'>
      <p>{`${first_name} ${last_name}`}</p>
      <p>{`${email}`}</p>
      <div style={phoneStyle}>
        <p>{`${displayedNumber}`}</p>
        <button onClick={togglePhoneDisplay}>
          {showPhoneNumber ? 'Mask Phone Number' : 'Unmask Phone Number'}
        </button>
      </div>
    </div>
  );
};

const homeStyle = {
  backgroundColor: Theme.colors.beige,
  width: '100vw',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const Home = () => {
  return (
    <UserProvider>
      <div id='home' style={homeStyle}>
        <Card />
      </div>
    </UserProvider>
  );
};

export default Home;
