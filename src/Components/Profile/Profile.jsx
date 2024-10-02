import React from 'react';

export default function Profile({ userData }) {
  let { name, email } = userData;
  return (
    <>
      <h2 className="h1 text-decoration-underline pb-4">Account Details :</h2>
      <h2 className="my-3 ">
        Name: {name}
      </h2>
    </>
  );
}
