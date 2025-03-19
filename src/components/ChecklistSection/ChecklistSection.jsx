import React from 'react';
import ChecklistItem from '../ChecklistItem/ChecklistItem';

const ChecklistSection = ({ title, items, checklist, section, handleCheckboxChange }) => {
  return (
    <div className="checklist-section">
      <h2>{title}</h2>
      <hr />
      <ul>
        {items.map((item, index) => (
          <ChecklistItem
            key={index}
            item={item}
            checked={checklist[section][index] || false}
            onChange={() => handleCheckboxChange(section, index)}
          />
        ))}
      </ul>
    </div>
  );
};

export default ChecklistSection;