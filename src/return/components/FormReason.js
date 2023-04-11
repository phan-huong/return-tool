import React, { useState } from 'react';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';

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
        }
    }

    return (
        <>
            <TextField
                style={{ display: 'none' }}
                value={props.formik.values.reasons}
                onChange={props.formik.handleChange}
            ></TextField>

            {
                selectedItems.map((item, index) => {
                    if (item.checkbox === true)
                        return (
                            <React.Fragment key={index}>
                                <FormControl>
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
                })
            }
        </>
    )
}

export default FormReason;