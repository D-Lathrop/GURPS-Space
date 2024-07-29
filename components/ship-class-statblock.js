import shipData from "../data/ship-data.json"
import React, { useState, useEffect } from 'react';


const ShipClassStatBlock = (props) => {

    return (
        <>
            {props.statsDisplay()}
        </>
    )
}

export default ShipClassStatBlock;