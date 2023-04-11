import React, { useState } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';

const FormAnnotation = (props) => {
    const [selectedItems, setSelectedItems] = useState(JSON.parse(localStorage.getItem('Return Items')) || []);
    const [changeState, setChangeState] = useState(false);

    const handleChange = (event, sku) => {
        setChangeState(!changeState);

        if (selectedItems.length) {
            let newData = selectedItems;
            let foundIndex = newData.findIndex((item) => item.sku === sku);
            if (foundIndex > -1) {
                newData[foundIndex].annotations = event.target.value;
            }

            setSelectedItems(newData);
            localStorage.setItem('Return Items', JSON.stringify(newData));
        }
    }
    return (
        <>
            <TextField
                style={{ display: 'none' }}
                value={props.formik.values.annotations}
                onChange={props.formik.handleChange}
            ></TextField>
            {
                selectedItems.map((item, index) => {
                    if (item.checkbox === true)
                        return (
                            <React.Fragment key={index}>
                                <FormControl sx={{mb:2}}>
                                    <FormLabel sx={{mb:1, fontWeight:'bold'}}>{item.name}</FormLabel>
                                    <TextField
                                        multiline
                                        rows={4}
                                        value={item.annotations}
                                        onChange={(e) => handleChange(e, item.sku)}
                                        sx={{width:'100%'}}
                                    />
                                </FormControl>
                            </React.Fragment>
                        )
                })
            }
        </>
    )
}

export default FormAnnotation;