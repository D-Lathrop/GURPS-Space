import shipData from "../data/ship-data.json"
import React, { useState, useEffect } from 'react';


const ShipClassStatBlock = (props) => {

    return (
        <div className={props.styles.statBlockContainer}>
            <h2 className={props.styles.statTitle}>Basic Stat Block</h2>
            <span className={props.styles.statBlockLable}>Class Name:</span>
            <span className={props.styles.statBlockAreaLarge}>{props.shipClassName}</span>
            <span className={props.styles.statBlockLable}>Classification:</span>
            <span className={props.styles.statBlockAreaLarge}>{props.shipClassClassification}</span>
            <span className={props.styles.statBlockLable}>Designer:</span>
            <span className={props.styles.statBlockAreaLarge}>{props.shipClassDesigner}</span>
            <span className={props.styles.statBlockLable}>Manufacturer:</span>
            <span className={props.styles.statBlockAreaLarge}>{props.shipClassManufacturer}</span>
            <span className={props.styles.statBlockLable}>Cost:</span>
            <span className={props.styles.statBlockAreaLarge}>${props.shipDisplayCost}</span>
            <span className={`${props.styles.statBlockLable} ${props.styles.infoTitle}`} title="Manage steerage cargo in the habitat 
            and power stats tab, manage shielded and refrigerated cargo in the bottom center of the 
            screen.">Total Cargo Capacity:</span>
            <span className={props.styles.statBlockAreaLarge}>{props.shipTotalCargoAllTypes} tons</span>
            <span className={props.styles.statBlockLable}>TL:</span>
            <span className={props.styles.statBlockArea}>{props.shipTL}</span>
            <span className={props.styles.statBlockLable}>SM:</span>
            <span className={props.styles.statBlockArea}>{props.shipSM}</span>
            <span className={`${props.styles.statBlockLable} ${props.styles.infoTitle}`} title="This 
            includes any active or powered measures such as force screens.">dDR:</span>
            <span className={props.styles.statBlockArea}>{props.shipDisplaydDR}</span>
            <span className={`${props.styles.statBlockLable} ${props.styles.infoTitle}`} title="In this 
            early version of the website only one engine type may be selected.">Move:</span>
            <span className={props.styles.statBlockArea}>{props.shipMove}</span>
            <span className={props.styles.statBlockLable}>Max Power Gen.:</span>
            <span className={props.styles.statBlockArea}>{props.shipPowerGen}</span>
            <span className={props.styles.statBlockLable}>Fuel Load:</span>
            <span className={props.styles.statBlockArea}>{props.shipFuelLoad}</span>
            <span className={props.styles.statBlockLable}>Max Power Demand:</span>
            <span className={props.styles.statBlockArea}>{props.shipPowerDemand}</span>
            <span className={`${props.styles.statBlockLable} ${props.styles.infoTitle}`} title="Manage 
            cabin and open area allocation to bunkrooms, cells, etc. in the Habitat and Power Stats tab.">Cabins:</span>
            <span className={props.styles.statBlockArea}>{props.shipCabins}</span>
            <span className={props.styles.statBlockLable}>HT:</span>
            <span className={props.styles.statBlockArea}>{props.shipHT}</span>
            <span className={`${props.styles.statBlockLable} ${props.styles.infoTitle}`} title="If there 
            are no habitats this will display short term occupancy, otherwise it will display long term occupancy.">Occupancy:</span>
            <span className={props.styles.statBlockArea}>{props.shipOccupancy}</span>
            <span className={props.styles.statBlockLable}>dST/HP:</span>
            <span className={props.styles.statBlockArea}>{props.displaydSTHP}</span>
            <span className={props.styles.statBlockLable}>Workspaces:</span>
            <span className={props.styles.statBlockArea}>{props.shipWorkspaces}</span>
            <span className={props.styles.statBlockLable}>Un/Streamlined:</span>
            <span className={props.styles.statBlockArea}>{props.shipStreamlinedUnDisplay}</span>
            <span className={`${props.styles.statBlockLable} ${props.styles.infoTitle}`} title="This only applies if the missile or attacking ship is the same TL or lower.">ECM Bonus:</span>
            <span className={props.styles.statBlockArea}>{props.shipDefensiveECMBonus}</span>
            <span className={props.styles.statBlockLable}>Hnd/SR:</span>
            <span className={props.styles.statBlockArea}>{props.shipDisplayHndSR}</span>
            <span className={`${props.styles.statBlockLable} ${props.styles.infoTitleWarning}`} title="One spinal battery module must be selected in all 3 sections.  The middle module must be [Core], the others cannot be [Core].">Spinal Mounts:</span>
            <span className={props.styles.statBlockArea}>{props.shipSpinalMounts}</span>
            <span className={props.styles.statBlockLable}>Complexity:</span>
            <span className={props.styles.statBlockArea}>{props.shipComplexity}</span>
            <span className={`${props.styles.statBlockLable} ${props.styles.infoTitle}`} title="Select weapons for your mounts in the Weapon Stats tab.">Major Mounts:</span>
            <span className={props.styles.statBlockArea}>{props.shipMajorMounts}</span>
            <span className={props.styles.statBlockLable}>Weight:</span>
            <span className={props.styles.statBlockArea}>{props.shipDisplayMass}</span>
            <span className={`${props.styles.statBlockLable} ${props.styles.infoTitle}`} title="Select weapons for your mounts in the Weapon Stats tab.">Medium Mounts:</span>
            <span className={props.styles.statBlockArea}>{props.shipMediumMounts}</span>
            <span className={props.styles.statBlockLable}>Length:</span>
            <span className={props.styles.statBlockArea}>{props.shipDisplayLength}</span>
            <span className={`${props.styles.statBlockLable} ${props.styles.infoTitle}`} title="Select weapons for your mounts in the Weapon Stats tab.">Secondary Mounts:</span>
            <span className={props.styles.statBlockArea}>{props.shipSecondaryMounts}</span>
            <span className={`${props.styles.statBlockLable} ${props.styles.infoTitle}`} title="Capacity is measured in tons, for example if capacity is 1 the hangar can only hold 1 ton of cargo or vehicles.">Hangar Capacity:</span>
            <span className={props.styles.statBlockArea}>{props.shipHangarCapacity}</span>
            <span className={`${props.styles.statBlockLable} ${props.styles.infoTitle}`} title="Select weapons for your mounts in the Weapon Stats tab.">Tertiary Mounts:</span>
            <span className={props.styles.statBlockArea}>{props.shipTertiaryMounts}</span>
            <span className={`${props.styles.statBlockLable} ${props.styles.infoTitle}`} title="Capacity is measured in tons per minute, for example if capacity is 1,000 it would take 3 minutes to launch a 3,000 ton ship.">Launch Rate:</span>
            <span className={props.styles.statBlockArea}>{props.shipLaunchRateDisplay}</span>
        </div>
    )
}

export default ShipClassStatBlock;