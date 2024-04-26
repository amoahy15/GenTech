import React, { useState } from 'react';
import { NotificationContext, STATES } from './notificationContext';

const NotificationProvider = (props) => {
  const [notification, setNotification] = useState(null);
  const [notificationText, setNotificationText] = useState(null);

  const success = (text) => {
      setNotificationText(text);
      setNotification(STATES.SUCCESS);
  };

  const error = (text) => {
      setNotificationText(text);
      setNotification(STATES.ERROR);
  };

  return (
      <NotificationContext.Provider
          value={{
              success, error, notification, notificationText
          }}
      >
          {props.children}
      </NotificationContext.Provider>
  );
};

export { NotificationProvider };
