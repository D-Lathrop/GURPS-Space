import shipData from "../data/ship-data.json"
import React, { useState, useEffect, useCallback } from 'react';


const ShipModuleSelector = ({ handleSetModules, styles, buildCol, buildRow, shipModules, shipStreamlinedUn, moduleLocation1, moduleLocation2, moduleNumber, shipSM, shipTL, superScience, reardDR, getModuleIndex, processShipModules }) => {
    const [category, setCategory] = useState('');
    const [module, setModule] = useState('');
    const [moduleList, setModuleList] = useState([''])
    const [cost, setCost] = useState(0);
    const [displayCost, setDisplayCost] = useState(0);
    const [workspaces, setWorkspaces] = useState(0);
    const [displayWorkspaces, setDisplayWorkspaces] = useState(0);
    const [powerDemand, setPowerDemand] = useState(0);
    const [powerGeneration, setPowerGeneration] = useState(0);
    const [repairSkill, setRepairSkill] = useState('');

    const moduleShipData = shipData;
    const categoryList = ['Armor and Survivability', 'Crew', 'Engineering', 'Power', 'Propulsion', 'Utility',
        'Weapons', 'Engine, Chemical & HEDM', 'Engine, Electric', 'Engine, Fission', 'Engine, Nuclear Pulse',
        'Engine, Fusion', 'Engine, TotalConv. & Antimatter', 'Reactionless Engine'];

    // This useEffect updates the module, cost, workspaces, and repairSkill state variables (used for display purposes) 
    // when the shipModule state variable is changed in the higher component.
    // useEffect(() => {

    // }, [shipModules])

    // This use effect retrieves the values for cost and workspaces from the modules array in the create-ship-class component, 
    // this is to reflect changes caused by customization such as automation and other design features.
    useEffect(() => {
        const [rowIndex, colIndex] = getModuleIndex(moduleLocation1, moduleNumber);

        if (shipModules[rowIndex][colIndex] !== '') {
            const shipModule = shipModules[rowIndex][colIndex];
            const newDisplayCost = shipModule.moduleCost ?? 0;
            const newDisplayWorkspaces = shipModule.moduleWorkspaces ?? 0;

            setModule(shipModule.moduleKey);
            setDisplayCost(newDisplayCost.toLocaleString());
            setDisplayWorkspaces(newDisplayWorkspaces.toLocaleString());
        } else {
            setDisplayCost(0);
            setDisplayWorkspaces(0);
        }

    }, [getModuleIndex, shipModules, moduleLocation1, moduleNumber])

    // This function sets the selected category and updates the module list.
    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
        const newModuleList = validModuleSorter(moduleShipData, moduleLocation1, moduleLocation2, shipSM, shipTL, shipStreamlinedUn, e.target.value, superScience, shipModules, reardDR);
        setModuleList(newModuleList);
    }

    // This function sets the selected module and updates the cost and workspaces.
    const handleModuleChange = (e) => {
        let moduleCategory = '';

        if (e.target.value === '') {
            moduleCategory = ''
        } else if (e.target.value !== '') {
            moduleCategory = moduleShipData[e.target.value][0].Category
        }

        if (e.target.value === '') {
            // setModule(e.target.value);
            // setCost(0);
            // setWorkspaces(0);
            // setRepairSkill('');
            handleSetModules(e.target.value, moduleCategory, moduleLocation1, moduleLocation2, moduleNumber, 0, 0, null, 0, 0, 0)
        } else {
            let moduleKeyObj = moduleShipData[e.target.value];
            let SMData = moduleKeyObj.find(module => module.SM === shipSM);
            let fuelTypes = null;
            let accel = null;
            let mpsTank = null;
            if (moduleKeyObj[0].FuelTypes !== undefined) {
                fuelTypes = moduleKeyObj[0].FuelTypes;
            }
            if (moduleKeyObj[0].Accel !== undefined) {
                accel = moduleKeyObj[0].Accel;
            }
            if (moduleKeyObj[0].mpsTank !== undefined) {
                mpsTank = moduleKeyObj[0].mpsTank;
            }

            // setModule(e.target.value);
            handleSetModules(e.target.value, moduleCategory, moduleLocation1, moduleLocation2, moduleNumber, SMData.cost, SMData.Workspaces, fuelTypes, accel, mpsTank, moduleKeyObj[0].PowerDemand);
            // setCost(SMData.cost);
            // setWorkspaces(SMData.Workspaces);
            // setRepairSkill(moduleKeyObj[0].RepairSkill);
        }
    }

    // This useEffect sets the cost and workspaces for the selected module.
    useEffect(() => {
        let moduleKeyObj = moduleShipData[module];
        if (moduleKeyObj) {
            let SMData = moduleKeyObj.find(module => module.SM === shipSM);
            setCost(SMData.cost);
            setWorkspaces(SMData.Workspaces);
        }
    }, [shipSM, moduleShipData, module])

    // This function filters the valid modules based on the ship's tech level, streamlined/unstreamlined, and other module requirements.
    const validModuleSorter = useCallback((moduleShipData, moduleLocation1, moduleLocation2, shipSM, shipTL, shipStreamlinedUn, category, superScience, shipModules, reardDR) => {
        if (shipModules) {
            let newCategory = category
            let newModuleList = [];
            let coreCount = 0;
            let activeCore = [];
            let spinalFront = false
            let spinalMid = false
            let spinalRear = false

            processShipModules(shipModules, (shipModule) => {
                if (shipModule.moduleLocation2 === 'core') {
                    coreCount++;
                    activeCore.push(shipModule);
                }
            });

            for (let gridRow of shipModules) {
                for (let shipModule of gridRow) {
                    if (shipModule.moduleLocation1 === 'front') {
                        spinalFront = true;
                    } else if (shipModule.moduleLocation1 === 'middle') {
                        spinalMid = true;
                    } else if (shipModule.moduleLocation1 === 'rear') {
                        spinalRear = true;
                    }
                }
            }

            let defensiveECMCount = 0;
            let engineRoomCount = 0;

            for (let gridRow of shipModules) {
                for (let shipModule of gridRow) {
                    if (shipModule.moduleKey === 'Defensive ECM') {
                        defensiveECMCount++;
                    }
                    if (shipModule.moduleKey === 'Engine Room') {
                        engineRoomCount++;
                    }
                }
            }

            if (!activeCore.some(module => module.moduleNumber === moduleNumber) && coreCount >= 2 && moduleLocation2 === 'core') {
                newModuleList.push('All Core Modules Already in Use');
            } else {
                for (let key in moduleShipData) {
                    let selectedCategory = newCategory

                    if (
                        (moduleShipData[key][0].Location === moduleLocation1 || moduleShipData[key][0].Location === moduleLocation2 || moduleShipData[key][0].Location === 'any')
                        && moduleShipData[key][0].Category === selectedCategory
                        && (moduleShipData[key][0].SuperScience === true && superScience === true || moduleShipData[key][0].SuperScience === false)
                        && (moduleShipData[key][0].TL <= shipTL)
                        && (key !== 'Engine Room' || key === 'Engine Room' && shipSM <= 9)
                        && (key !== 'Open Space' || key === 'Open Space' && shipSM >= 8)
                        && (key !== 'Habitat' || key === 'Habitat' && shipSM >= 6)
                        && (key !== 'Armor, Ice' || key === 'Armor, Ice' && shipSM >= 8 && shipStreamlinedUn === 'unstreamlined')
                        && (key !== 'Armor, Stone' || key === 'Armor, Stone' && shipSM >= 7 && shipStreamlinedUn === 'unstreamlined')
                        && (key !== 'Defensive ECM' || key === 'Defensive ECM' && defensiveECMCount < 3)
                        && (key !== 'Engine Room' || key === 'Engine Room' && shipSM <= 9 && engineRoomCount < 1)
                        && (key !== 'Jump Gate' || key === 'Jump Gate' && shipSM >= 9)
                        && (key !== 'Factory, Replicator' || key === 'Factory, Replicator' && shipSM >= 6)
                        && (key !== 'Factory, Nanofactory' || key === 'Factory, Nanofactory' && shipSM >= 6)
                        && (key !== 'Factory, Robofac' || key === 'Factory, Robofac' && shipSM >= 6)
                        && (key !== 'Factory, Fabricator' || key === 'Factory, Fabricator' && shipSM >= 6)
                        && (key !== 'Secondary Battery' || key === 'Secondary Battery' && shipSM >= 6)
                        && (key !== 'Tertiary Battery' || key === 'Tertiary Battery' && shipSM >= 7)
                        && (key !== 'Spinal Battery' || key === 'Spinal Battery' && (spinalFront === false && moduleLocation1 === 'front' && moduleLocation2 === 'hull') || (spinalMid === false && moduleLocation1 === 'middle' && moduleLocation2 === 'core') || (spinalRear === false && moduleLocation1 === 'rear' && moduleLocation2 === 'hull'))
                        && (key !== "External Pulsed Plasma" || key === "External Pulsed Plasma" && reardDR >= 50)
                    ) {
                        newModuleList.push(key);
                    }
                }
            }
            return newModuleList;
        }
    }, [moduleNumber, processShipModules])

    // This useEffect calls the validModuleSorter function to filter valid modules based and updates the module list.
    useEffect(() => {
        const newModuleList = validModuleSorter(moduleShipData, moduleLocation1, moduleLocation2, shipSM, shipTL, shipStreamlinedUn, category, superScience, shipModules, reardDR);
        setModuleList(newModuleList);
    }, [validModuleSorter, moduleShipData, moduleLocation1, moduleLocation2, shipSM, shipTL, shipStreamlinedUn, category, superScience, shipModules, reardDR, moduleNumber, processShipModules])

    // This use effect resets the current module when the fundamental ship characteristics are changed,
    // it would be better to upgrade this to only remove them if they are no longer valid but this will 
    // work for now.
    // useEffect(() => {
    //     setModule('');
    // }, [shipSM, shipTL, superScience, shipStreamlinedUn])

    function resetButtonHandler() {
        handleSetModules('', null, moduleLocation1, moduleLocation2, moduleNumber, 0, 0, null, 0, 0, 0)
    }

    function formatModuleNumber(moduleNumber) {
        let moduleNumberStr = String(moduleNumber);
        if (moduleNumberStr.startsWith('Core')) {
            return moduleNumberStr.replace('Core', 'Core ');
        }
        return moduleNumberStr;
    }

    return (
        <div className={`${styles.buildLabel} ${buildCol} ${buildRow}`}>
            <span className={styles.moduleLabel1}>&#91;{formatModuleNumber(moduleNumber)}&#93; </span>
            <span className={styles.moduleLabel2}> {module} </span>
            <br></br>
            {module === '' || module === undefined && (
                <>
                    <select value={category} onChange={handleCategoryChange}>
                        <option value="">Select Category</option>
                        {categoryList.map((category) => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>

                    {category && (
                        <select value={module} onChange={handleModuleChange}>
                            <option value="">Select Module</option>
                            {moduleList.map((module) => (
                                <option key={module} value={module} disabled={module === 'All Core Modules Already in Use'}>{module}</option>
                            ))}
                        </select>
                    )}
                </>
            )}
            <br></br>
            <span className={styles.moduleInfoSpanTitle}>Cost: ${displayCost} Workspaces: {displayWorkspaces}<br></br></span>
            <span className={styles.moduleInfoSpanTitle} title={repairSkill}>Repair Skill</span>
            {module !== '' && module !== undefined && <button className={styles.statComponentButtonModule} onClick={resetButtonHandler}>Reset</button>}
        </div>
    )
}

export default ShipModuleSelector;