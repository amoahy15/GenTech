import { createContext } from 'react';

const NotificationContext = createContext({
    notification: null,
    notificationText: null,
    success: () => {},
    error: () => {},
});

const STATES = {
    SUCCESS: 'success',
    ERROR: 'error',
};

export { NotificationContext, STATES };
