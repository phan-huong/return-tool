import React from 'react';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';

const FormLocation = (props) => {
    return (
        <>
            <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">Logisticians</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="logistician"
                    value={props.formik.values.logistician}
                    onChange={props.formik.handleChange}
                    error={props.formik.touched.logistician && Boolean(props.formik.errors.logistician)}
                >
                    <FormControlLabel value="Finecom" control={<Radio />} label="Finecom" />
                    <FormControlLabel value="Best Solutions" control={<Radio />} label="Best Solutions" />
                    <FormControlLabel value="Self Service" control={<Radio />} label="Self Service" />
                </RadioGroup>
                <FormHelperText>{props.formik.errors.logistician}</FormHelperText>
            </FormControl>

            <FormControl sx={{ mt: 2 }}>
                <FormLabel id="demo-radio-buttons-group-label">Warehouses</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="warehouse"
                    value={props.formik.values.warehouse}
                    onChange={props.formik.handleChange}
                    error={props.formik.touched.warehouse && Boolean(props.formik.errors.warehouse)} 
                >
                    <FormControlLabel value="Hamburg" control={<Radio />} label="Hamburg" />
                    <FormControlLabel value="Berlin" control={<Radio />} label="Berlin" />
                    <FormControlLabel value="Plattling" control={<Radio />} label="Plattling" />
                    <FormControlLabel value="Gelsenkirchen" control={<Radio />} label="Gelsenkirchen" />
                    <FormControlLabel value="Aschaffenburg" control={<Radio />} label="Aschaffenburg" />
                    <FormHelperText>{props.formik.errors.warehouse}</FormHelperText>
                </RadioGroup>
            </FormControl>
        </>
    );
}

export default FormLocation;