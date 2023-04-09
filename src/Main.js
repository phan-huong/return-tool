
import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';

import Header from './shared/Header';
import Footer from './shared/Footer';
import Home from './home/Home';
import Return from './return/pages/Return';

const Main = () => {
    // const [darkMode, setDarkmode] = useState(false);

    return (
        <PageWrapper>
            <Header />
            <PageMain>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route exact path="/return" element={<Return />} />
                    <Route exact path="/history" element={<React.Fragment />} />
                </Routes>
            </PageMain>
            <Footer />
        </PageWrapper>
    )
}

const PageWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    padding: 0;
    margin: 0;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: column;
    flex-flow: column;
    justify-content: space-between;
    background-color: ${props => props.$night ? "#333333" : "white"};
    color: ${props => props.$night ? "white" : "#333333"};
`;

const PageMain = styled.main`
    flex: 2 1;
    overflow: auto;
    margin: 0.5rem 0;
    padding: 0 5%;
`;

export default Main;