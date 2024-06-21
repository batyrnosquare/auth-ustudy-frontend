import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER } from './queries';

const Profile = ({email}) => {
  const { loading, error, data } = useQuery( GET_USER, {
    variables: {email: email},
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const user = data?.user;

  if (!user) return <p>No user found</p>;


  return (
    <div>
      <h2>User Profile</h2>
      <p>Name: {user.firstName} {user.lastName}</p>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
    </div>
  );
};

export default Profile;
