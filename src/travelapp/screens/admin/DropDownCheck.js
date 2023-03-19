import React, { useState, useContext } from 'react';
import { Dropdown, Form } from 'react-bootstrap';
import {
  TableColContext,
} from "../../context/Context";

const options = [
  { value: 'No', label: 'No' },
  { value: 'Code', label: 'Travel Code' },
  { value: 'Package', label: 'Package' },
  { value: 'Cost', label: 'Cost' },
  { value: 'Paid', label: 'Paid' },
  { value: 'Balance', label: 'Balance' },
  { value: 'Cancellation', label: 'Cancellation' }
];

const TableDropdownSelect = () => {
  // const [colSelected, setColSelected] = useState([]);
  const { colSelected ,setColSelected } = useContext(TableColContext);

  const handleSelect = (event) => {
    const optionValue = event.target.value;
    const optionIndex = colSelected.findIndex(option => option.value === optionValue);
    if (optionIndex >= 0) {
      const updatedOptions = [...colSelected];
      updatedOptions.splice(optionIndex, 1);
      setColSelected(updatedOptions);
    } else {
      const selectedOption = options.find(option => option.value === optionValue);
      setColSelected([...colSelected, selectedOption]);
    }
  }

  return (
    <Dropdown>
      <Dropdown.Toggle variant="outline-primary" id="table-dropdown">
        {colSelected.length > 0 ? `${colSelected.length} selected` : 'Select'}
      </Dropdown.Toggle>
      <Dropdown.Menu style={{ padding: 5 }}>
        {options.map((option, index) => (
         
          <Form.Check
            key={index}
            type="checkbox"
            label={option.label}
            value={option.value}
            checked={colSelected.some(selectedOption => selectedOption.value === option.value)}
            onChange={handleSelect}
          />
         
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default TableDropdownSelect;
