import React from 'react';

const FormGroup = ({ label, children }) => {
  return (
    <div className="form-group">
      <label><strong>{label}</strong></label>
      {children}
    </div>
  );
};

export default FormGroup;