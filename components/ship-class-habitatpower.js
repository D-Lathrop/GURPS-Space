import React, { useState, useEffect } from 'react';


const ShipClassHabitatPower = (props) => {

    return (
        <div className={props.isExpanded ? props.styles.habitatPowerContainerExpanded : props.styles.habitatPowerContainerCollapsed}>
            <h2 className={props.isExpanded ? props.styles.statTitleExpanded : props.styles.statTitleCollapsed}>Habitat, Power, and Weapons</h2>
            {props.habitatsDisplay()}
            {props.weaponStatsDisplay()}
            {props.powerPlantsDisplay()}
        </div>
    )
}

export default ShipClassHabitatPower;