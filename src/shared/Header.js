import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// import './Header.scss';

const PageHeader = styled.header`
    display: flex;
    justify-content: center;
    padding: 5px 10%;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.26);
`;

const SiteLogo = styled.img`
    height: auto;
    width: auto;
`;

const Header = () => {
    return <PageHeader>
        <div className="header_logo">
            <Link to="/">
                <SiteLogo src={`${process.env.PUBLIC_URL}/assets/FortuneGlobe_black1.png`} alt={'Site Logo'} />
            </Link>
        </div>
    </PageHeader>
};

export default Header;