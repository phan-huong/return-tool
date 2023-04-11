import React, { useState } from 'react';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import FormItems from './FormItems';

const FormSKU = (props) => {
    const [inputId, setInputId] = useState();

    return (
        <>
            <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">ID Types</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="idType"
                    value={props.formik.values.idType}
                    onChange={props.formik.handleChange}
                    error={props.formik.touched.idType && Boolean(props.formik.errors.idType)}
                >
                    <FormControlLabel value="DeliveryId" control={<Radio />} label="DeliveryId" />
                    <FormControlLabel value="DeliveryOrderId" control={<Radio />} label="DeliveryOrderId" />
                </RadioGroup>
                <FormHelperText>{props.formik.errors.idType}</FormHelperText>
            </FormControl>

            {props.formik.values.idType === 'DeliveryId' && (
                <>
                    <FormControl sx={{ mt: 2, display:'flex', flexDirection:'row' }}>
                        <FormLabel id="demo-radio-buttons-group-label"></FormLabel>
                        <TextField required
                            label="DeliveryId"
                            variant="outlined"
                            size="small"
                            type="text"
                            name="deliveryId"
                            onChange={props.formik.handleChange}
                            value={props.formik.values.deliveryId}
                            error={props.formik.touched.deliveryId && Boolean(props.formik.errors.deliveryId)}
                            helperText={props.formik.touched.deliveryId && props.formik.errors.deliveryId}
                        />

                        <Button onClick={() => setInputId(props.formik.values.deliveryId)} sx={{ mr: 1 }}>
                            Search
                        </Button>
                    </FormControl>
                    <FormItems id={inputId} />
                </>
            )}
            {props.formik.values.idType === 'DeliveryOrderId' && (
                <>
                    <FormControl sx={{ mt: 2 }}>
                        <FormLabel id="demo-radio-buttons-group-label"></FormLabel>
                        <TextField required
                            label="DeliveryOrderId"
                            variant="outlined"
                            size="small"
                            type="text"
                            name="deliveryOrderId"
                            onChange={props.formik.handleChange}
                            value={props.formik.values.deliveryOrderId}
                            error={props.formik.touched.deliveryOrderId && Boolean(props.formik.errors.deliveryOrderId)}
                            helperText={props.formik.touched.deliveryOrderId && props.formik.errors.deliveryOrderId}
                        />
                    </FormControl>
                    <FormItems id={inputId} />
                </>
            )}
        </>
    );
}

export default FormSKU;