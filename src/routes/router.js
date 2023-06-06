import React from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import Directory from '../components/filechange/Directory';
import styled from 'styled-components';
import Create from '../components/Create';
import Home from '../components/Home';
import Update from '../components/Update';
import Admin from '../components/Admin';
import Login from '../components/filechange/Login';
import Chat from '../components/filechange/Chat';

const AppBody =styled.div`
display: flex;
height: 100vh;
`

function Layout(){
    return(
        <>
        <Directory/>
        <AppBody>
            <React.Suspense fallback={<Admin active fullscreen={true} />}>
                <Outlet />
            </React.Suspense>

        </AppBody>
        </>
    )
}
export default createBrowserRouter([
    {
        path: '/',
        element:<Layout />,
        children: [
            {
                index: true,
                element:<Login />
            },
            {
                path: 'chat',
                element: <Chat />
            },
            {
                path: '/:id',
                element: <Update />
            }
        ]
    }
])

