import React, { useState, useEffect } from 'react';


const FormSummary = (props) => {
    const [selectedData, setSelectedData] = useState(JSON.parse(props.selectedData))
    const [selectedItems, setSelectedItems] = useState(JSON.parse(props.selectedItems))

    useEffect(() => {
        setSelectedData(JSON.parse(props.selectedData));
        setSelectedItems(JSON.parse(props.selectedItems));
    }, [props.selectedItems, props.selectedData])

    return <>
        { selectedData.Logistician ? <h4>Logistician: {selectedData.Logistician}</h4> : <></> }
        { selectedData.Warehouse ? <h4>Warehouse: {selectedData.Warehouse}</h4> : <></> }
        { selectedData.idType ? <h4>idType: {selectedData.idType}</h4> : <></> }
        { selectedData.deliveryId ? <h4>deliveryId: {selectedData.deliveryId}</h4> : <></> }
        { selectedData.deliveryOrderId ? <h4>deliveryOrderId: {selectedData.deliveryOrderId}</h4> : <></> }
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