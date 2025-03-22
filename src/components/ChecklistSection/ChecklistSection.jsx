import React from 'react';
import ChecklistItem from '../ChecklistItem/ChecklistItem';

const ChecklistSection = ({ title, icon, items, checklist = [], section, handleCheckboxChange }) => {
  const checklistArray = Array.isArray(checklist) ? checklist : new Array(items.length).fill(false);

  return (
    <div className="checklist-section">
      <h2>
        <span className="checklist-icon">{icon}</span>
        {title}
      </h2>
      <div className="checklist-items">
        {items.map((item, index) => (
          <ChecklistItem
            key={`${section}-${index}`}
            item={item}
            checked={checklistArray[index] || false}
            onChange={() => handleCheckboxChange(section, index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ChecklistSection;