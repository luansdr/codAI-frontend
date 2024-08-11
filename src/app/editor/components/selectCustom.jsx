import React, { useState, useEffect } from "react";

function SelectCustom({ options, onSelectChange, isValid }) {
  const [selectedValue, setSelectedValue] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const [hasBounced, setHasBounced] = useState(false);

  useEffect(() => {
    setIsInvalid(!isValid);
    if (!isValid && !hasBounced) {
      setHasBounced(true);
      setTimeout(() => {
        setHasBounced(false);
      }, 3000);
    }
  }, [isValid]);

  useEffect(() => {
    if (options.length > 0) {
      setSelectedValue(options[0].template); 
      onSelectChange(options[0].template); 
    }
  }, [options, onSelectChange]);

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue === "Selecione o framework") {
      setSelectedValue('');
    } else {
      setSelectedValue(selectedValue);
      onSelectChange(selectedValue);
    }
  };

  const selectClasses = `custom-select ${isInvalid && hasBounced ? 'animate-bounce' : ''}`;

  return (
    <label className={selectClasses}>
      <select value={selectedValue} onChange={handleChange}>
        <option value={null}>
          Selecione o framework
        </option>
        {options.map((option, index) => (
          <option key={index} value={option.template}>
            {option.title}
          </option>
        ))}
      </select>
    </label>
  );
}

export default SelectCustom;
