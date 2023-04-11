import React, { useState } from 'react';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import { Typography, Box } from '@mui/material';

const REASONS = [
    { id: 1, title: "Reason 1" },
    { id: 2, title: "Reason 2" },
    { id: 3, title: "Reason 3" },
    { id: 4, title: "Reason 4" },
    { id: 5, title: "Reason 5" }
]

const FormReason = (props) => {
    const [selectedItems, setSelectedItems] = useState(JSON.parse(localStorage.getItem('Return Items')) || []);
    const [changeState, setChangeState] = useState(false);
    // const [hasReturn, sethasReturn] = useState(false);

    const handleChange = (event, sku) => {
        setChangeState(!changeState);

        if (selectedItems.length) {
            let newData = selectedItems;
            let foundIndex = newData.findIndex((item) => item.sku === sku);
            if (foundIndex > -1) {
                newData[foundIndex].reason = event.target.value;
            }

            setSelectedItems(newData);
            localStorage.setItem('Return Items', JSON.stringify(newData));

            let selected = JSON.parse(localStorage.getItem('Return Items'));

            // for (let i = 0; i < selected.length; i++) {
            //     if (selected[i].checkbox === true) {
            //         sethasReturn(true);
            //         i = selected.length + 1;
            //     }
            // }
        }
    }

    return (
        <>
            <TextField
                style={{ display: 'none' }}
                value={props.formik.values.reasons}
                onChange={props.formik.handleChange}
            ></TextField>
            {/* { (hasReturn === false) && (
                <Typography sx={{ mt: 2, fontWeight:'bold', color:'red' }}>No items to return! Please choose at least one item from last step</Typography>
            ) } */}
            <Box sx={{display:'flex', flexDirection:'column', pb : 2}}>
                <Typography sx={{ mb: 1}}>Choose a return reason:</Typography>
                {
                    selectedItems.map((item, index) => {
                        if (item.checkbox === true) {
                            return (
                                <React.Fragment key={index}>
                                    <FormControl sx={{mt:1, mb : 2}}>
                                        <FormLabel id="demo-radio-buttons-group-label">{item.name}</FormLabel>
                                        <RadioGroup
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            name="logistician"
                                            value={item.reason}
                                            onChange={(e) => handleChange(e, item.sku)}
                                        >
                                            {
                                                REASONS.map((REASON, index) => {
                                                    return (
                                                        <FormControlLabel key={index} value={REASON.id} control={<Radio />} label={REASON.title} />
                                                    )
                                                })
                                            }
                                        </RadioGroup>
                                    </FormControl>
                                </React.Fragment>
                            )
                        }
                    })
                }
            </Box>
        </>
    )
}

export default FormReason;