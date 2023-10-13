/* TODO:
Complete the following API functions to fetch user's data and its unmasked phone number.
Each request should be authenticated with a Bearer token of 'WellTheoryCode2023'.
Use the default fetch API.

(Optional) Use JSDoc to document the functions.
*/

export type User = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  masked_phone: string;
  address: Address;
  shipping: {name: string; address: Address};
};

type Address = {
  city: string;
  country: string;
  line1: string;
  postal_code: string;
  state: string;
};

export const me = async (): Promise<User> => {
  // GET https://us-central1-internals-358114.cloudfunctions.net/react-challenge/me
  const response = await fetch(
    'https://us-central1-internals-358114.cloudfunctions.net/react-challenge/me',
    {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_BEARER_TOKEN}`,
      },
    }
  );

  if (response.ok) {
    const userData = await response.json();
    console.log('userData', userData);
    return userData;
  } else {
    throw new Error('Error retrieving user data');
  }
};

export const phone = async (): Promise<{phone: string}> => {
  // GET https://us-central1-internals-358114.cloudfunctions.net/react-challenge/phone
  const response = await fetch(
    'https://us-central1-internals-358114.cloudfunctions.net/react-challenge/phone',
    {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_BEARER_TOKEN}`,
      },
    }
  );

  if (response.ok) {
    const userPhoneNumber = await response.json();
    return userPhoneNumber;
  } else {
    throw new Error('Error retrieving user phone number');
  }
};
