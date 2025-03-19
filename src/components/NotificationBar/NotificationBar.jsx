import React from 'react';
import './NotificationBar.css';

const NotificationBar = ({ isVisible, message }) => {
  return (
    isVisible && (
      <div className="notification-bar show">
        {message}
      </div>
    )
  );
};

export default NotificationBar;