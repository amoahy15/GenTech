import React, {useState, useEffect} from 'react'
import CircleLoader from 'react-spinners/CircleLoader';
import styles from "../styles/loading.module.css";

const Loading = () => {
   
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 8000)
  },  [])
  return (
    <div className={styles.loadingContainer}> 
        {loading ? (
            <CircleLoader
                size={30}
                color="#a80505"
                loading={loading}
            />
        ) : null}
    </div>
);
};

export default Loading;