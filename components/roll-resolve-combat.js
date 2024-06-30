import styles from "../styles/roll-resolve-combat.module.scss"
const RollResolveCombat = ({ isExpanded }) => {

    return (
        <div className={isExpanded ? styles.containerStyleExpanded : styles.containerStyleCollapsed}>
            <h2 className={styles.title}>Combat</h2>
        </div>
    );
}

export default RollResolveCombat;