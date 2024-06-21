import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const REGISTER_MUTATION = gql`
  mutation Register($regRequest: RegisterInput!) {
    register(regRequest: $regRequest) {
      status
      message
      error
      user
    }
  }
`;

const Register = () => {
  const [formState, setFormState] = useState({
    f_name: '',
    l_name: '',
    email: '',
    password: '',
    role: 'USER'
  });

  const navigate = useNavigate();
  const [register, { data, loading, error }] = useMutation(REGISTER_MUTATION);

  const handleSubmit = (e) => {
    e.preventDefault();
    register({ variables: { regRequest: formState } })
      .then((response) => {
        if (response.data.register.status === 200) {
          navigate('/success');
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          value={formState.f_name}
          onChange={(e) => setFormState({ ...formState, f_name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={formState.l_name}
          onChange={(e) => setFormState({ ...formState, l_name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={formState.email}
          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={formState.password}
          onChange={(e) => setFormState({ ...formState, password: e.target.value })}
        />
        <select
          value={formState.role}
          onChange={(e) => setFormState({ ...formState, role: e.target.value })}
        >
          <option value="STUDENT">Student</option>
          <option value="TEACHER">Teacher</option>
          <option value="MASTER">Master</option>
          <option value="CUSTOMER">Customer</option>

        </select>
        <button type="submit">Register</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && data.register.error && <p>{data.register.error}</p>}
    </div>
  );
};

export default Register;
