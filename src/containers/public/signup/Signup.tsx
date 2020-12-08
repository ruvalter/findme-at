// add useContext
import React, {useContext} from 'react';
import {withRouter} from 'react-router-dom'
import { firebaseAuth } from '../../../shared/providers/auth-provider';

const Signup = (props: any) => {


  const {handleSignup, inputs, setInputs, errors} = useContext(firebaseAuth)
  
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    
    //wait to signup 
    await handleSignup()
    //push home
    props.history.push('/')
  }
  const handleChange = (e: any) => {
    const {name, value} = e.target
    console.log(inputs)
    setInputs((prev: any) => ({...prev, [name]: value}))
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* replace the div tags with a form tag */}
      Signup
      {/* make inputs  */}
      <input onChange={handleChange} name="email" placeholder='email' value={inputs.email} />
      <input onChange={handleChange} name="password" placeholder='password' value={inputs.password} />
      <button>signup</button>
      {errors.length > 0 ? errors.map((error: any) => <p style={{color: 'red'}}>{error}</p> ) : null}
    </form>
  );
};

export default withRouter(Signup)