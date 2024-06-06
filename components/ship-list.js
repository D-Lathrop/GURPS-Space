import styles from "../styles/ship-list.module.scss"



const ShipList = () => {

    return (
        <div className={styles.containerStyle}>
            <h2 className={styles.title}>Ship List</h2>
            <span className={styles.textAreaTitle}>Import Ship:  </span>
            <textarea className={styles.buttonStyle} rows="1" cols="50">
                Enter your import code here.
            </textarea>
            <span className={styles.shipName}>Ship Name</span>
            <button className={styles.listButtonStyle}>View Stats</button>
            <button className={styles.listButtonStyle}>Deploy Ship to Map</button>
            <button className={styles.listButtonStyle}>Export Ship</button>
            <button className={styles.listButtonStyle}>Delete Ship</button>
        </div>
    )
}

export default ShipList;