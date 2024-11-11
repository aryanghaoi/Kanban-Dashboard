import React, { useState } from 'react';
import '../styles/Dropdown.css';
import displayIcon from '../icons_FEtask/Display.svg';
import downIcon from '../icons_FEtask/down.svg';
import OptionsSelector from './OptionsSelector';

function Dropdown({ setDisplay, display }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div style={{ display: "flex", minHeight: "10vh", alignItems: "center", padding: "0px 16px" }}>
      <div className="dropdown">
        <button className="dropdown-button" onClick={toggleDropdown}>
          <img src={displayIcon} alt="Display Icon" /> 
          <span>Display</span>
          <img src={downIcon} alt="Display"  /> 
        </button>
        {isOpen && (
          <div className="dropdown-content">
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", flexDirection: "column", padding: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "0px 12px", alignItems: "center", width: "100%" }}>
                <span style={{ color: "#333333" }}>Grouping: </span>
                <OptionsSelector 
                  title="grouping" 
                  setDisplay={setDisplay} 
                  options={["status", "user", "priority"]} 
                  display={display} // Pass display state to OptionsSelector
                />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "0px 12px", width: "100%" }}>
                <span style={{ color: "#333333" }}>Ordering: </span>
                <OptionsSelector 
                  title="ordering" 
                  setDisplay={setDisplay} 
                  options={["priority", "title"]} 
                  display={display} // Pass display state to OptionsSelector
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dropdown;
