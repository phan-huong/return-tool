
import React from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";

import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';


const Footer = () => {
    return <PageFooter>
        <NavLink to="/">
            <HomeIcon />
        </NavLink>
        <NavLink to="/user">
            <PersonIcon />
        </NavLink>
        <NavLink to="/settings">
            <SettingsIcon />
        </NavLink>
    </PageFooter>
};


/** Styling */

const PageFooter = styled.footer`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(30px, 1fr));
    align-content: center;
    width: 100%;
    box-shadow: 0px -2px 6px rgba(0, 0, 0, 0.26);
`;

const NavLink = styled(Link)`
    text-align: center;
    padding: 5px 0;
    transition: .3s;

    &:hover {
        background-color: #333333;

        svg {
            color: #a7d9fd;
        }
    }

    svg {
        color: #333333;
        font-size: 2rem;
    }
`;


export default Footer;