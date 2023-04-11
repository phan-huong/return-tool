import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';

import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

import WarehouseIcon from '@mui/icons-material/Warehouse';
import InventoryIcon from '@mui/icons-material/Inventory';
import RateReviewIcon from '@mui/icons-material/RateReview';
import PostAddIcon from '@mui/icons-material/PostAdd';
import SendIcon from '@mui/icons-material/Send';

import Typography from '@mui/material/Typography';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import FormLocation from './FormLocation';
import FormSKU from './FormSKU';
import FormItems from './FormItems';
import FormReason from './FormReason';
import FormAnnotation from './FormAnnotation';
import FormSummary from './FormSummary';

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 15,
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            background: '#a7d9fd',
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            background: '#a7d9fd',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 3,
        border: 0,
        backgroundColor:
        theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
        borderRadius: 1,
    },
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 30,
    height: 30,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
        background: '#a7d9fd',
        boxShadow: '0 2px 4px 0 rgba(0,0,0,.26)',
    }),
    ...(ownerState.completed && {
        background: '#a7d9fd',
    }),
}));

function ColorlibStepIcon(props) {
    const { active, completed, className } = props;

    const icons = {
        1: <WarehouseIcon sx={{ fontSize: 18, color : '#333333' }} />,
        2: <InventoryIcon sx={{ fontSize: 18, color : '#333333' }} />,
        3: <RateReviewIcon sx={{ fontSize: 18, color : '#333333' }} />,
        4: <PostAddIcon sx={{ fontSize: 18, color : '#333333' }} />,
        5: <SendIcon sx={{ fontSize: 18, color : '#333333' }} />,
    };

    return (
        <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
            {icons[String(props.icon)]}
        </ColorlibStepIconRoot>
    );
}

ColorlibStepIcon.propTypes = {
    /**
     * Whether this step is active.
     * @default false
     */
    active: PropTypes.bool,
    className: PropTypes.string,
    /**
     * Mark the step as completed. Is passed to child components.
     * @default false
     */
    completed: PropTypes.bool,
    /**
     * The label displayed in the step icon.
     */
    icon: PropTypes.node,
};

const steps = ['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5'];

const StepperForm = () => {

    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());

    const isStepOptional = (step) => {
        return step === 3;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            throw new Error("You can't skip a step that isn't optional.");
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });

        // Remove annotations if user skips Annotations-Step
        let selectedItems = JSON.parse(localStorage.getItem('Return Items'));
        if (selectedItems) {
            for (const selectedItem of selectedItems) {
                selectedItem.annotations = '';
            }
        }
        localStorage.setItem('Return Items', JSON.stringify(selectedItems));
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const handleSubmit = () => {        
        switch (activeStep) {
            case 0: formikLocation.handleSubmit(); break;
            case 1: formikSKU.handleSubmit(); handleFormSubmit(); break;      
            case 2: formikReason.handleSubmit(); break;      
            case 3: formikAnnotation.handleSubmit(); break;
            case 4: alert("Congrats!!!"); break;
        }                        
    };

    const handleFormSubmit = () => {
        var data = {
            Logistician: formikLocation.values.logistician,
            Warehouse: formikLocation.values.warehouse,
            idType: formikSKU.values.idType,
            deliveryId: formikSKU.values.deliveryId,
            deliveryOrderId: formikSKU.values.deliveryOrderId,
        }
        console.log('handleFormSubmit ', data);
        localStorage.setItem('Selected Data', JSON.stringify(data));
    }
  
    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return <FormLocation formik={formikLocation} />
            case 1:
                return <FormSKU formik={formikSKU} />
            case 2:
                return <FormReason formik={formikReason} />
            case 3:        
                return <FormAnnotation formik={formikAnnotation} />  
            case 4:        
                return (
                    <FormSummary 
                        selectedItems={localStorage.getItem('Return Items')}
                        selectedData={localStorage.getItem('Selected Data')}
                    />
                );
            default:
            return 'Unknown step';
        }
    }

    /** Formik and Validation */
    // Location
    const locationValidationSchema = Yup.object().shape({
        logistician: Yup.string()
            .required('Choose 1 of 3 logisticians'),
        warehouse: Yup.string()
            .required('Choose 1 of 5 warehouses'),
    });

    const formikLocation = useFormik({
        initialValues: {
            logistician: '',        
            warehouse: ''
        },
        validationSchema: locationValidationSchema,    
        onSubmit: values => { 
            handleNext();  
        },
    });

    // SKU
    // const skuValidationSchema = Yup.object().shape({
    //     idType: Yup.string()
    //         .required('Choose 1 of 2 ID Types'),
    //     deliveryId: Yup.number()
    //         .when('deliveryOrderId', {
    //             is: '',
    //             then: Yup.number('DeliveryId must be a number')
    //                 .required('DeliveryId is required')
    //                 .positive('DeliveryId must be a positive number')
    //                 .integer('DeliveryId must be an integer')
    //         }),
    //     deliveryOrderId: Yup.string()
    //         .when('deliveryId', {
    //             is: null,
    //             then: Yup.string()
    //                 .required('DeliveryOrderId is required')
    //                 .uuid('DeliveryOrderId must be a UUID')
    //         })
    // }, [['deliveryId', 'deliveryOrderId']]);

    // SKU
    const skuValidationSchema = Yup.object().shape({
        idType: Yup.string()
            .required('Choose 1 of 2 ID Types'),
        deliveryId: Yup.number('DeliveryId must be a number')
            .positive('DeliveryId must be a positive number')
            .integer('DeliveryId must be an integer'),
        deliveryOrderId: Yup.string()
            .uuid('DeliveryOrderId must be a UUID')
    });

    const formikSKU = useFormik({
        initialValues: {
            idType: '',        
            deliveryId: '',
            deliveryOrderId: '',
        },
        validationSchema: skuValidationSchema,    
        onSubmit: values => {     
            handleNext();  
        },
    });

    const reasonValidationSchema = Yup.object().shape({
        reasons: Yup.boolean()
            .required('Reason is required'),
    });
    const formikReason = useFormik({
        initialValues: {
            reasons: true
        },
        validationSchema: reasonValidationSchema, 
        onSubmit: values => { handleNext() },
    });

    const annotationValidationSchema = Yup.object().shape({
        annotations: Yup.boolean()
            .required('Annotations is required'),
    });
    const formikAnnotation = useFormik({
        initialValues: {
            annotations: true
        },
        validationSchema: annotationValidationSchema, 
        onSubmit: values => { handleNext() },
    });

    useEffect(() => {
        window.localStorage.removeItem('Return Items');
    }, [])
  
    return (
        <Stack sx={{ width:'100%', height:'100%' }} spacing={4}>
            <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    if (isStepOptional(index)) {
                        labelProps.optional = (
                            <Typography variant="caption">Optional</Typography>
                        );
                    }       
                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel StepIconComponent={ColorlibStepIcon} {...labelProps}></StepLabel>
                        </Step>
                    );
                })}
            </Stepper>

            {activeStep === steps.length ? (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        All steps completed - you&apos;re finished
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleReset}>Reset</Button>
                    </Box>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <Box sx={{ mt: 2, mb: 1, pl: 2, pr: 2 }}>
                        {getStepContent(activeStep)}
                    </Box>
                    <Box sx={{ display:'flex', flexDirection:'row', pt:2, position:'fixed', bottom:'4rem', width:'90%', backgroundColor:'white' }}>
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 , backgroundColor:'white'}}
                        >
                            Back
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        {isStepOptional(activeStep) && (
                            <Button color="inherit" onClick={handleSkip} sx={{ mr: 1, backgroundColor:'white'}}>
                                Skip
                            </Button>
                        )}
                        <Button onClick={handleSubmit} sx={{ backgroundColor:'white'}}>
                            {activeStep === steps.length - 1 ? 'Send' : 'Next'}
                        </Button>
                    </Box>
                </React.Fragment>
            )}
        </Stack>
    );
}

export default StepperForm;
