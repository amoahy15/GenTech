import React, { useContext, useState, useEffect } from 'react';
import { NotificationContext } from './notificationContext.js';
import styles from '../../components/styles/notifs.module.css';

const NotificationBar = () => {
    const { notification, notificationText } = useContext(NotificationContext);
    const [exit, setExit] = useState(false);
    const [width, setWidth] = useState(0);
    const [intervalID, setIntervalID] = useState(null);

    const handleStartTimer = () => {
        const id = setInterval(() => {
            setWidth((prev) => {
                if (prev < 100) {
                    return prev + 0.5;
                }
                clearInterval(id);
                return prev;
            });
        }, 20);

        setIntervalID(id);
    };

    const handlePauseTimer = () => {
        clearInterval(intervalID);
    };

    const handleCloseNotif = () => {
        handlePauseTimer();
        setExit(true);
    };

    useEffect(() => {
        if (notification !== null) {
            handleStartTimer();
            const timer = setTimeout(() => {
                handleCloseNotif();
            }, 5000);  

            return () => {
                clearTimeout(timer);
                clearInterval(intervalID);
            };
        }
    }, [notification]);

    useEffect(() => {
        if (width === 100) {
            handleCloseNotif();
        }
    }, [width]);

    return (
        notification !== null && !exit && (
            <div
                onMouseEnter={handlePauseTimer}
                onMouseLeave={handleStartTimer}
                className={`${styles.notificationWrapper}`}
            >
                {notificationText && <p className={styles.notificationText}>{notificationText}</p>}
                <div className={styles.bar} style={{ width: `${width}%` }} />
            </div>
        )
    );
};

export default NotificationBar;
