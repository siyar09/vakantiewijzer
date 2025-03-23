import React from 'react';
import { motion } from 'framer-motion';

const ChecklistSection = ({ title, icon, items, checklist, section, handleCheckboxChange }) => {
  const handleItemClick = (index, event) => {
    if (event.target.type !== 'checkbox') {
      handleCheckboxChange(section, index);
    }
  };

  return (
    <div className="checklist-section">
      <h2>{icon} {title}</h2>
      <ul>
        {items.map((item, index) => (
          <motion.li
            key={index}
            className="checklist-item"
            onClick={(e) => handleItemClick(index, e)}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <div className="checkbox-wrapper">
              <input
                type="checkbox"
                className="custom-checkbox"
                checked={checklist[index]}
                onChange={() => handleCheckboxChange(section, index)}
              />
            </div>
            <label>{item}</label>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default ChecklistSection;