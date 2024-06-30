import styles from "../styles/ship-class-list.module.scss"



const ShipClassList = ({ isExpanded }) => {

    return (
        <div className={isExpanded ? styles.containerStyleExpanded : styles.containerStyleCollapsed}>
            <h2 className={isExpanded ? styles.titleExpanded : styles.titleCollapsed}>Ship Class List</h2>
        </div>
    )
}

export default ShipClassList;