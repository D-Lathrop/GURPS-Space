import styles from "../styles/ship-list.module.scss"



const ShipList = ({ isExpanded }) => {

    return (
        <div className={isExpanded ? styles.containerStyleExpanded : styles.containerStyleCollapsed}>
            <h2 className={isExpanded ? styles.titleExpanded : styles.titleCollapsed}>Ship List</h2>
            <span className={isExpanded ? styles.textAreaTitleExpanded : styles.textAreaTitleCollapsed}>Import Ship:  </span>
            <textarea className={isExpanded ? styles.buttonStyleExpanded : styles.buttonStyleCollapsed} rows="1" cols={isExpanded ? "50" : "30"}>
                Enter your import code here.
            </textarea>
            <span className={isExpanded ? styles.shipNameExpanded : styles.shipNameCollapsed}>Ship Name</span>
            <button className={isExpanded ? styles.listButtonStyleExpanded : styles.listButtonStyleCollapsed}>View Stats</button>
            <button className={isExpanded ? styles.listButtonStyleExpanded : styles.listButtonStyleCollapsed}>Deploy Ship</button>
            <button className={isExpanded ? styles.listButtonStyleExpanded : styles.listButtonStyleCollapsedNextRow}>Export Ship</button>
            <button className={isExpanded ? styles.listButtonStyleExpanded : styles.listButtonStyleCollapsed}>Delete Ship</button>
        </div>
    )
}

export default ShipList;