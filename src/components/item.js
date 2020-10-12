import React from 'react';

const Item = (props) => {

    const {edit, itemName, 
        itemValue, inputValue, 
        onEditEvent, onChangeEvent} = props

    
    const handleChange = event => {
        onChangeEvent(event)
    }
    const handleEdit = event => {
        onEditEvent(event)
        console.log("editHandler-Child")
    }

    const handleSubmit = event => {
        // onSubmitEvent(event)
        console.log("handle submit - child")
    }

    return (
        <div>
            <div className="m-2">
                
                <h6 className="d-inline mr-2">{itemName}:</h6>
                {edit ? 
                <div className="d-inline">
                    <input type="text" name={itemName} value={inputValue} onChange={handleChange}/>
                    <button className="btn btn-info btn-sm d-inline m-1">Submit</button>
                    <button className="btn btn-danger btn-sm d-inline m-1" 
                    name={itemName.toLowerCase()+"Edit"} onClick={handleEdit}>Cancel</button>
                </div>
                :
                <div className="d-inline">
                    <p className="d-inline">{itemValue}</p>
                    <button className="btn btn-info btn-sm d-inline m-1" 
                    name={itemName.toLowerCase()+"Edit"} onClick={handleEdit}>Edit</button>
                </div>
                }
            </div>
        </div>
    );
}

export default Item;
