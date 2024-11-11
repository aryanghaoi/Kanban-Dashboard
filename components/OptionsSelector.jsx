import React from 'react';

const OptionsSelector = ({ setDisplay, options, title, display }) => {
  const handleChange = (event) => {
    setDisplay((prev) => ({ ...prev, [title]: event.target.value }));
  };

  return (
    <select 
      value={display[title]}  
      onChange={handleChange} 
      style={{ background: "white", color: "black", height: "50%" }}
    >
      {options.map((item, index) => (
        <option value={item} key={index}>{item}</option>
      ))}
    </select>
  );
};

export default OptionsSelector;
