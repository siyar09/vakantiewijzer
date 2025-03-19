import React from 'react';

const ChecklistItem = ({ item, checked, onChange }) => {
  return (
    <li>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
      /> {item}
    </li>
  );
};

export default ChecklistItem;