import styles from "../styles/create-ship.module.scss"



const CreateShip = ({ isExpanded }) => {

    return (
        <div className={isExpanded ? styles.containerStyleExpanded : styles.containerStyleCollapsed}>
            <h2 className={isExpanded ? styles.titleExpanded : styles.titleCollapsed}>Create New Ship</h2>
        </div>
    )
}

export default CreateShip;