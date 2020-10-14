import React from "react";

const newItemInput = (props) => {
  const { label, inputType, inputName, inputValue, onChangeEvent } = props;

  const handleChange = (e) => {
    onChangeEvent(e);
  };

  return (
    <div className="form-group m-2">
      <label className="mr-2" htmlFor={inputName}>
        {label + ":"}
      </label>
      <input
        type={inputType}
        name={inputName}
        value={inputValue}
        onChange={handleChange}
      />
    </div>
  );
};

export default newItemInput;
