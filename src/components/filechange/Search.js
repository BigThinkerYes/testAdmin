import React, {useState} from 'react';
import styled from 'styled-components';

const SearchForm = styled.div`
border-bottom: 1px solid #fff;
>input{
    background-color:transparent;
    border:none;
    color: #fff;
    outline:none;
    &::placeholder{

    }
}
`;

const SearchChat = styled.div`
padding:10px;
display:flex;
align-items:center;
color:#fff;
cursor:pointer;

&:hover{
    background-color: #ff6b6b;
}
img{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit:cover;
}
`;
const UserChatlog = styled.div`

`;
const SearchContent = styled.div`

`;

export default function Search(){
    // const [username, setUsername] = useState('');
    // const [username, setUsername] = useState('');
    // const [user, setUser] = useState(null);
    // const [err, setErr] = useState(false);


    
    return(
        <SearchContent>
            <SearchForm>
                <input type='text' placeholder='search' onKeyDown={handleKey} onChange={e=>setUsername(e.target.value)} />
            </SearchForm>
            <SearchChat>
                <UserChatlog>
                    <span>Let's chat</span>
                </UserChatlog>
            </SearchChat>
        </SearchContent>
    )
}
