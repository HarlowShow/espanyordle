import styles from './Misc.module.css'

const VisuallyHidden = ({ children }) => {
    return (
      <span className={styles['visually-hidden']}>
        {children}
      </span>

    );
  };
  
  export default VisuallyHidden;