import React, { useState } from 'react';
import styles from "../styles/ship-management.module.scss"
import ShipList from './ship-list.js';
import CreateShip from './create-ship.js';
import CreateShipClass from './create-ship-class.js';
import ShipClassList from './ship-class-list';

const ShipManagement = ({ isExpanded }) => {
    const [currentComponent, setCurrentComponent] = useState('ship-list');

    const handleCreateShipClick = () => {
        setCurrentComponent('create-ship');
    }

    const handleCreateShipClassClick = () => {
        setCurrentComponent('create-ship-class');
    }

    const handleShipListClick = () => {
        setCurrentComponent('ship-list');
    }

    const handleShipClassListClick = () => {
        setCurrentComponent('ship-class-list');
    }

    return (
        <div className={isExpanded ? styles.containerStyleExpanded : styles.containerStyleCollapsed}>
            <h2 className={isExpanded ? styles.titleExpanded : styles.titleCollapsed}>Ship Management</h2>
            <button className={isExpanded ? styles.buttonStyleExpanded : styles.buttonStyleCollapsed} onClick={handleShipListClick}>Ship List</button>
            <button className={isExpanded ? styles.buttonStyleExpanded : styles.buttonStyleCollapsed} onClick={handleCreateShipClick}>Create New Ship</button>
            <button className={isExpanded ? styles.buttonStyleExpanded : styles.buttonStyleCollapsed} onClick={handleShipClassListClick}>Ship Class List</button>
            <button className={isExpanded ? styles.buttonStyleExpanded : styles.buttonStyleCollapsed} onClick={handleCreateShipClassClick}>Create New Ship Class</button>
            {currentComponent === 'ship-list' && <ShipList isExpanded={isExpanded} />}
            {currentComponent === 'create-ship' && <CreateShip isExpanded={isExpanded} />}
            {currentComponent === 'create-ship-class' && <CreateShipClass isExpanded={isExpanded} />}
            {currentComponent === 'ship-class-list' && <ShipClassList isExpanded={isExpanded} />}
        </div>
    )
}

export default ShipManagement;