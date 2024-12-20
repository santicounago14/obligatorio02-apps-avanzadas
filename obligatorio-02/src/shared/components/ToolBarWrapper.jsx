import React from 'react';
import Toolbar from './Toolbar';
import { Outlet } from 'react-router-dom';


const ToolBarWrapper = () => {
    return (
        <div className="wrapper">
            <Outlet />
            <Toolbar />
        </div>
    );
};

export default ToolBarWrapper;