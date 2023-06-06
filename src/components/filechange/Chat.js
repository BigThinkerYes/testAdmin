import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../db/supabaseClient";
import styled from "styled-components";

const ChatContainer = styled.div`
border-radius: 20px;
>form{
    position: relative;
    display:flex;
    justify-content:center;
}
> form > input{

    position:fixed;
    left: 20%;
    bottom: 30px;
    width: 60%;
    border: 1px solid gray;
    border-radius: 3px;
    padding: 20px;
    outline: none;
}
>form > button{
    display: none !important;
}
`;
const ErrorText = styled.p`
  /* Styles for error text */
  color: red;
`;

const FormContainer = styled.div`
background-color: #54a0ff;
height: 100vh;
width: 100vw;
display:flex;
align-items:center;
justify-content:center;
`;

export default function Chat(){
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [formError, setFormError] = useState(null);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!message) {
        setFormError('Please enter a message.');
        return;
      }
  
      try {
        const user = supabase.auth.user();
        if (!user) {
          setFormError('You must be logged in to send a message.');
          return;
        }
  
        const { data, error } = await supabase
          .from('messages')
          .insert([{ userId: user.id, message }])
          .select();
  
        if (error) {
          console.log(error);
          setFormError('An error occurred while sending the message.');
        } else {
          console.log(data);
          setFormError(null);
          setMessage('');
        }
      } catch (error) {
        console.log(error);
        setFormError('An error occurred while sending the message.');
      }
    };
  
    return (
      <>
      <FormContainer>
      <ChatContainer>
            <form>
            <input placeholder="Enter your message (up to 3000 words) and press enter."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button hidden type="submit" onSubmit={handleSubmit}>Send</button>
              {formError && <ErrorText className="error">{formError}</ErrorText>}
            </form>
       </ChatContainer>
      </FormContainer>
      </>
    )
}