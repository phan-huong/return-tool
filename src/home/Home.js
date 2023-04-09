import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import HistoryIcon from '@mui/icons-material/History';

const Home = () => {
    return (
        <div>
            <Title>Epic Return Tool</Title>
            <HomeOptions>
                <Option to="/return">
                    <div>
                        <LocalShippingOutlinedIcon />
                        <h2>Return items</h2>
                    </div>
                </Option>
                <Option to="/history">
                    <div>
                        <HistoryIcon />
                        <h2>See history</h2>
                    </div>
                </Option>
            </HomeOptions>
        </div>
    )
}

const Title = styled.h1`
    text-align: center;
    margin: 2rem 0;
`;

const HomeOptions = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 2rem;
`;

const Option = styled(Link)`
    display: flex;
    width: 150px;
    height: 150px;
    background-color: #a7d9fd;
    border-radius: 5px;
    justify-self: center;
    box-shadow: rgba(0, 0, 0, 0.26) 0px 2px 4px;

    div {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        align-items: center;
        justify-content: center;

        svg {
            font-size: 45px;
        }
    }
`;



export default Home;