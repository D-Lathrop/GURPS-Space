import shipData from "../data/ship-data.json"
import React, { useState, useEffect } from 'react';


const ShipClassWeaponStats = (props) => {

    return (
        <>
            {props.weaponStatsDisplay()}
        </>
    )
}

export default ShipClassWeaponStats;