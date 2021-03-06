import React, { useContext } from 'react';
import { firebaseAuth } from '../../../shared/providers/auth-provider';
import { withRouter } from 'react-router-dom';

const Signin = (props: any) => {
  const { handleSignin, inputs, setInputs, errors } = useContext(firebaseAuth);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await handleSignin();

    props.history.push('/admin/links');
  };
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setInputs((prev: any) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* replace the div tags with a form tag */}
      Signin
      {/* make inputs  */}
      <input
        onChange={handleChange}
        name='email'
        placeholder='email'
        value={inputs.email}
      />
      <input
        onChange={handleChange}
        name='password'
        placeholder='password'
        value={inputs.password}
      />
      <button onChange={handleSubmit}>signin</button>
      {errors.length > 0
        ? errors.map((error: any) => <p style={{ color: 'red' }}>{error}</p>)
        : null}
    </form>
  );
};

export default withRouter(Signin);
