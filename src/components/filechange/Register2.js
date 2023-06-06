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


export default function RegisterData() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [formError, setFormError] = useState(null);
  
    const handleRegister = async (e) => {
      e.preventDefault();
  
      try {
        const { user, error } = await supabase.auth.signUp({
          email,
          password
        });
  
        if (error) {
          setFormError(error.message);
        } else {
          // Registration successful
          setFormError(null);
          console.log('User registered:', user);
          // Perform any additional actions after successful registration
        }
      } catch (error) {
        console.log(error);
        setFormError('An error occurred while registering the user.');
      }
    };

    return(
        <>
        <FormContainer>
            <FormWrapper>
                <StyledAvatar>Hustlers</StyledAvatar>
                <span className='title'>Register</span>
                <form>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                <button onSubmit={handleRegister} type="submit">Register</button>
                {formError && <p className="error">{formError}</p>}

                </form>
            </FormWrapper>
        </FormContainer>
        </>
    )
}