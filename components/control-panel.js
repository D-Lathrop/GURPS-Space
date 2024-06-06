import React, { useState } from 'react';
import styles from "../styles/control-panel.module.scss"
import RollResolveCombat from "./roll-resolve-combat.js";
import ShipManagement from "./ship-management.js";
import EnvironmentManagement from "./environment-management.js";

const ControlPanel = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [expandButton, setExpandButton] = useState('Expand')
    const [currentComponent, setCurrentComponent] = useState('combat')

    const handleExpand = () => {
        setIsExpanded(!isExpanded);
        setExpandButton(isExpanded ? 'Expand' : 'Collapse');
    };

    const handleCombatClick = () => {
        setCurrentComponent('combat');
    }

    const handleShipClick = () => {
        setCurrentComponent('ship');
    }

    const handleEnvironmentClick = () => {
        setCurrentComponent('environment');
    }

    return (
        <div className={`${isExpanded ? styles.expanded : styles.controlPanel}`}>
            <h1 className={styles.title}>Control Panel</h1>
            <button className={styles.controlPanelButton} onClick={handleCombatClick}>Combat</button>
            <button className={styles.controlPanelButton} onClick={handleShipClick}>Ship Management</button>
            <button className={styles.controlPanelButton} onClick={handleEnvironmentClick}>Environment Management</button>
            <button className={styles.controlPanelButton} onClick={handleExpand}>{expandButton}</button>
            {currentComponent === 'combat' && <RollResolveCombat />}
            {currentComponent === 'ship' && <ShipManagement />}
            {currentComponent === 'environment' && <EnvironmentManagement />}
        </div>
    )
}

export default ControlPanel;