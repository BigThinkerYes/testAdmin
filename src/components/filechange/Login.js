import React,{useState} from 'react';
import styled from 'styled-components';
import supabase from '../../db/supabaseClient';

const FormContainer = styled.div`
background-color: #54a0ff;
height: 100vh;
width: 100vw;
display:flex;
align-items:center;
justify-content:center;
`;
const FormWrapper = styled.div`
background-color:white;
padding: 20px 60px;
border-radius:10px;
display: flex;
flex-direction:column;
gap:10px;
align-items:center;
form{
    display:flex;
    flex-direction: column;
    gap:15px;
}
>title{
    color:#ff6b6b;
    font-size: 12px;
}
input{
    padding:15px;
    border:none;
    border-bottom: 1pxsolid #ff6b6b;
}
&::placeholder{
    color:rgba(175,175,175);
}
button{
    background-color:#ff6b6b;
    color: #fff;
    padding: 10px;
    font-weight: bold;
    border: none;
    cursor:pointer;
}
>label, span{
    display:flex;
    align-items:center;
    gap:10px;
    color: #ff6b6b;
    font-size: 12px;
    cursor:pointer;
    img{
        width: 32px;
    }
    p{
        color: #8395a7;
        font-size: 12px;
        margin-top: 10px;
    }
}
`;
const  StyledAvatar = styled.div`
color:#8395a7;
font-weight: bold;
font-size: 24px;
`;

export default function Login(){
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [formError, setFormError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { error } = await supabase.auth.signIn({
        email: loginEmail,
        password: loginPassword,
      });

      if (error) {
        setFormError('Invalid email or password.');
      } else {
        setFormError(null);
        // Successful login, proceed with sending the message
        await sendMessage();
      }
    } catch (error) {
      console.log(error);
      setFormError('An error occurred while logging in.');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const { user, error } = await supabase.auth.signUp({
        email: registerEmail,
        password: registerPassword,
      });

      if (error) {
        setFormError('An error occurred while registering.');
      } else {
        setFormError(null);
        console.log(user);
      }
    } catch (error) {
      console.log(error);
      setFormError('An error occurred while registering.');
    }
  };

  const sendMessage = async () => {
    try {
      const user = supabase.auth.user();
      if (!user) {
        setFormError('You must be logged in to send a message.');
        return;
      }

      const { data, error } = await supabase
        .from('messages')
        .insert([{ userId: user.id, message: 'Hello, Supabase!' }])
        .select();

      if (error) {
        console.log(error);
        setFormError('An error occurred while sending the message.');
      } else {
        console.log(data);
        setFormError(null);
      }
    } catch (error) {
      console.log(error);
      setFormError('An error occurred while sending the message.');
    }
  };

    return(
        <>
        <FormContainer>
            <FormWrapper>
            <StyledAvatar>Hustlers</StyledAvatar>
            <span className='title'>Push the Limits</span>
            <form>
                <input type='email' placeholder="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
                <input type='password' placeholder='password' value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)}  />
                <button type='submit' onSubmit={handleLogin}>Sign In</button>
                {formError && <p className="error">{formError}</p>}
            </form>
            <p>Create account? Register</p>
            </FormWrapper>
        </FormContainer>
        </>
    )
}
