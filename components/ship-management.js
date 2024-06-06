import React, { useState } from 'react';
import styles from "../styles/ship-management.module.scss"
import ShipList from './ship-list.js';
import CreateShip from './create-ship.js';
import CreateShipClass from './create-ship-class.js';
import ShipClassList from './ship-class-list';

const ShipManagement = () => {
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
        <div className={styles.containerStyle}>
            <h2 className={styles.title}>Ship Management</h2>
            <button className={styles.buttonStyle} onClick={handleShipListClick}>Ship List</button>
            <button className={styles.buttonStyle} onClick={handleCreateShipClick}>Create New Ship</button>
            <button className={styles.buttonStyle} onClick={handleShipClassListClick}>Ship Class List</button>
            <button className={styles.buttonStyle} onClick={handleCreateShipClassClick}>Create New Ship Class</button>
            {currentComponent === 'ship-list' && <ShipList />}
            {currentComponent === 'create-ship' && <CreateShip />}
            {currentComponent === 'create-ship-class' && <CreateShipClass />}
            {currentComponent === 'ship-class-list' && <ShipClassList />}
        </div>
    )
}

export default ShipManagement;