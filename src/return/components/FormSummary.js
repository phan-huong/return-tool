import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';

const FormSummary = (props) => {
    const [selectedData, setSelectedData] = useState(JSON.parse(props.selectedData))
    const [selectedItems, setSelectedItems] = useState(JSON.parse(props.selectedItems))

    useEffect(() => {
        setSelectedData(JSON.parse(props.selectedData));
        setSelectedItems(JSON.parse(props.selectedItems));
    }, [props.selectedItems, props.selectedData])

    return <>
        <Typography sx={{ mb: 2, fontWeight:'bold'}}>Summary:</Typography>
        { selectedData.Logistician ? <p>Logistician: {selectedData.Logistician}</p> : <></> }
        { selectedData.Warehouse ? <p>Warehouse: {selectedData.Warehouse}</p> : <></> }
        { selectedData.idType ? <p>idType: {selectedData.idType}</p> : <></> }
        { selectedData.deliveryId ? <p>deliveryId: {selectedData.deliveryId}</p> : <></> }
        { selectedData.deliveryOrderId ? <p>deliveryOrderId: {selectedData.deliveryOrderId}</p> : <></> }
        {
            selectedItems.map((item, index) => {
                if (item.checkbox)
                return (
                    <ul key={index} style={{ listStylePosition: 'inside', listStyleType: 'square' }}><b>{item.name}</b>
                        <li>Quantity: {item.returnQuantity}</li>
                        <li>Reason: {item.reason}</li>
                        { item.annotations ? <li>Annotations: {item.annotations}</li> : <></> }
                    </ul>
                );
            })
        }
    </>
}

export default FormSummary;