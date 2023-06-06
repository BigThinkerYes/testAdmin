import React from 'react';
import { useNavigate } from 'react-router-dom';
import {NavLink, useMatch } from 'react-router-dom';
import styled from 'styled-components';

const FormContainer = styled.div`
background-color: #54a0ff;
height: 100vh;
width: 100vw;
display:flex;
align-items:center;
justify-content:center;
`;
// export const Container = styled.div`
// position: fixed;
// top:0;
// width: 100%;
// z-index:100;
// align-items:center;
// justify-content: space-between;
// padding:10px 0;
// background-color: #487eb0;
// color:white;
// // font-family: 'Love Light', cursive;


// margin-bottom:40px;
// `
// export const NavBar = styled.div`
// display:flex;
// gap:20px;
// padding: 5px 0px 3px;
// margin-right:6px;
// white-space: nowrap;
// a{
//     text-decoration: none;
//     span{
//         text-decoration: none;
//     }
// }
// .active span,
// a: hover{ color: #FFF; text-decoration: none;}
// `;

// export default function Directory(){
    
//         function ActiveLink({isActive}){
//             const linkMatch = useMatch('/');
//             return isActive || linkMatch ? 'active' :undefined;
//         }
const NavBar = styled.div`

`;
const User = styled.div`

`;
export default function Directory({token}){
        function ActiveLink({isActive}){
        const linkMatch = useMatch('/');
        return isActive || linkMatch ? 'active' :undefined;
    }
    let navigate = useNavigate()
    function handleLogout(){
        sessionStorage.removeItem('token')
        navigate('/')
    }
    return(
        <>
        <NavBar>
            <span className='logo'>Hustlers</span>
            <User>
            <NavLink to={'/'}>
            <span>Login</span>
            </NavLink>
            <NavLink to={'chat'} className={ActiveLink}>
                <span>Chat</span>
            </NavLink>
                {/* <span>{token.user.user_metadata.full_name}</span> */}
                <button onClick={handleLogout}>logout</button>
            </User>
        </NavBar>
       
   
        </>
    )
}
