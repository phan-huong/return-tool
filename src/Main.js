
import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';

import Header from './shared/Header';
import Footer from './shared/Footer';
import Home from './home/Home';
import Return from './return/pages/Return';

const Main = () => {
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
    background-color: ${props => props.$night ? "#333333" : "white"};
    color: ${props => props.$night ? "white" : "#333333"};
`;

const PageMain = styled.main`
    overflow: auto;
    margin: 0 0 2rem 0;
    padding: 2rem 5% 0 5%;
    height: 100%;
`;

export default Main;