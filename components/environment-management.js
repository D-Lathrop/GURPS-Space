import styles from "../styles/environment-management.module.scss"

const EnvironmentManagement = ({ isExpanded }) => {

    return (
        <div className={isExpanded ? styles.containerStyleExpanded : styles.containerStyleCollapsed}>
            <h2 className={styles.title}>Environment Management</h2>
        </div>
    )
}

export default EnvironmentManagement;