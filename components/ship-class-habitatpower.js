import shipData from "../data/ship-data.json"
import React, { useState, useEffect } from 'react';


const ShipClassHabitatPower = (props) => {

    return (
        <div className={props.styles.habitatPowerContainer}>
            <h2 className={props.styles.statTitle}>Habitat & Power Stat Block</h2>
            <span className={props.styles.infoTitleWarningPower}>WARNING: Changing cost here will not change the module cost, but will change the total cost on the basic stats tab.</span>
            {props.habitatsDisplay(props.shipHabitats)}
            {props.powerPlantsDisplay(props.shipPowerPlants)}
        </div>
    )
}

export default ShipClassHabitatPower;