import styles from "./Results.module.css";


const SingleStat = (({stat, label}) => {
    return (
        <li className={styles['key-stat']}>
        <p>{stat}</p>
        <p>{label}</p>
    </li>
    )

})
export default SingleStat