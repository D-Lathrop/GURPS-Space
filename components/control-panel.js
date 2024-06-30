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
        <div className={`${isExpanded ? styles.controlPanelExpanded : styles.controlPanelCollapsed}`}>
            <h1 className={`${isExpanded ? styles.titleExpanded : styles.titleCollapsed}`}>Control Panel</h1>
            <button className={isExpanded ? styles.controlPanelButtonExpanded : styles.controlPanelButtonCollapsed} onClick={handleCombatClick}>Combat</button>
            <button className={isExpanded ? styles.controlPanelButtonExpanded : styles.controlPanelButtonCollapsed} onClick={handleShipClick}>Ship Management</button>
            <button className={isExpanded ? styles.controlPanelButtonExpanded : styles.controlPanelButtonCollapsed} onClick={handleEnvironmentClick}>Environment Management</button>
            <button className={isExpanded ? styles.controlPanelButtonExpanded : styles.controlPanelButtonCollapsed} onClick={handleExpand}>{expandButton}</button>
            {currentComponent === 'combat' && <RollResolveCombat isExpanded={isExpanded} />}
            {currentComponent === 'ship' && <ShipManagement isExpanded={isExpanded} />}
            {currentComponent === 'environment' && <EnvironmentManagement isExpanded={isExpanded} />}
        </div>
    )
}

export default ControlPanel;