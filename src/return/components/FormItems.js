import React, { useState, useEffect } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import { ITEMS } from '../../schema/dummy';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

const FormItems = (props) => {
    // const [selectedId, setSelectedId] = useState(props.id);
    const [itemValues, setItemValues] = useState([]);
    const [changeState, setChangeState] = useState(false);

    const initiateData = () => {
        if (props.id) {
            let finalItem = ITEMS.find((item) => item.deliveryId === props.id);
            if (finalItem) {
                let hasLS = window.localStorage.getItem('Return Items');
                if (hasLS) {
                    setItemValues(JSON.parse(hasLS));
                } else {
                    let finalObj = [];
                    for (const item of finalItem.items) {
                        let newObj = {
                            sku: item.sku,
                            name: item.name,
                            checkbox: false,
                            quantity: item.quantity,
                            returnQuantity: item.quantity,
                            reason: null,
                            annotations: ''
                        }
    
                        finalObj.push(newObj);
                    }
    
                    console.log(finalObj);
                    setItemValues(finalObj);
                    
                    window.localStorage.setItem('Return Items', JSON.stringify(finalObj))
                }
            } else {
                setItemValues([]);
                window.localStorage.removeItem('Return Items');
            }
        }
    }

    const handleChangeCheckbox = (sku) => {
        setChangeState(!changeState);

        if (sku) {
            let newData = itemValues;
            let newIndex = newData.findIndex((item) => item.sku === sku);
            if (newIndex > -1) {
                newData[newIndex].checkbox = !newData[newIndex].checkbox;
                console.log(newData);
                setItemValues(newData);
                window.localStorage.setItem('Return Items', JSON.stringify(newData))
            }
        }
    }

    const handleChangeQuantity = (sku, targetValue, maxValue) => {
        setChangeState(!changeState);

        var value = parseInt(targetValue, 10);
        var max = parseInt(maxValue, 10);
        if (value > max) value = max;
        if (value < 1) value = 1;

        if (value) {
            let newData = itemValues;
            let newIndex = newData.findIndex((item) => item.sku === sku);
            if (newIndex > -1) {
                newData[newIndex].returnQuantity = value;
                console.log(newData);
                setItemValues(newData);
                window.localStorage.setItem('Return Items', JSON.stringify(newData))
            }
        }
    }

    useEffect(() => {
        initiateData();
    }, [props.id])

    return (
        <>
            <div style={{ display: 'none' }}>{changeState}</div>
            {
                itemValues.length > 0 ?
                    <>
                        <Typography sx={{ mt: 2, fontWeight:'bold' }}>Purchased Items:</Typography>
                        <Typography sx={{ mt: 1, fontSize:'0.9rem' }}>Please choose items and number of items to return</Typography>
                        {
                            itemValues.map((result, index) => {
                                return (
                                    <React.Fragment key={index} >
                                        <Box sx={{ display:'grid', gridTemplateColumns:'3fr 1fr', mt: 1 }}>
                                            <FormControlLabel
                                                label={result.name}
                                                control={
                                                    <Checkbox
                                                        checked={result.checkbox}
                                                        onChange={() => handleChangeCheckbox(result.sku)}
                                                    />
                                                }
                                            />
                                            <TextField
                                                type="number"
                                                value={result.returnQuantity}
                                                onChange={(e) => { handleChangeQuantity(result.sku, e.target.value, result.quantity); }}
                                                variant="outlined"
                                            />
                                        </Box>
                                    </React.Fragment>
                                )
                            })
                        }
                    </>
                    : <Typography sx={{ mt: 2 }}>Please enter a valid ID</Typography>
            }
        </>
    );
}

export default FormItems;