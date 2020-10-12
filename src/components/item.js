import React from 'react';
import "./carStyle.css"

const Item = (props) => {

    const {edit, itemName, 
        itemValue, inputValue, 
        onEditEvent, onChangeEvent, onSubmitEvent} = props

    const handleChange = event => {
        onChangeEvent(event)
    }

    const handleEdit = event => {
        onEditEvent(event)
    }

    const handleSubmit = event => {
        onSubmitEvent(event)
    }

    return (
        <div >
            <div className=" item m-2">
                
                
                {edit ? 
                <div className="d-flex justify-content-between">
                    <div>
                        <h6 className="d-inline mr-2">{itemName}:</h6>
                        <input type="text" name={itemName.toLowerCase()} 
                        value={inputValue} onChange={handleChange}/>
                    </div>
                    <div>
                        <button className="btn btn-info btn-sm d-inline m-1"
                        name={itemName.toLowerCase()+"Edit"} 
                        onClick={handleSubmit}>Submit</button>
                        <button className="btn btn-danger btn-sm d-inline m-1" 
                        name={itemName.toLowerCase()+"Edit"} 
                        onClick={handleEdit}>Cancel</button>
                    </div>
                </div>
                :
                <div className="d-flex justify-content-between">
                    <div>
                        <h6 className="d-inline mr-2">{itemName}:</h6>
                        <p className="d-inline m-0">{itemValue}</p>
                    </div>
                    <div>
                        <button className="btn btn-info btn-sm button" 
                        name={itemName.toLowerCase()+"Edit"} 
                        onClick={handleEdit}>Edit</button>
                    </div>
                </div>
                }
            </div>
        </div>
    );
}



export default Item;
