import shipData from "../data/ship-data.json"
import React, { useState, useEffect } from 'react';


const ShipModuleSelector = ({ handleSetModules, handleSelectedEngine, selectedEngine, engineKeys, styles, buildCol, buildRow, shipModules, shipStreamlinedUn, moduleLocation1, moduleLocation2, moduleNumber, shipSM, shipTL, superScience }) => {
    const [category, setCategory] = useState('');
    const [module, setModule] = useState('');
    const [moduleList, setModuleList] = useState([])
    const [cost, setCost] = useState(0);
    const [displayCost, setDisplayCost] = useState(0);
    const [workspaces, setWorkspaces] = useState(0);
    const [displayWorkspaces, setDisplayWorkspaces] = useState(0);
    const [powerDemand, setPowerDemand] = useState(0);
    const [powerGeneration, setPowerGeneration] = useState(0);
    const [repairSkill, setRepairSkill] = useState('');

    const moduleShipData = shipData;
    let categoryList = ['Armor and Survivability', 'Crew', 'Engineering', 'Power', 'Propulsion', 'Utility',
        'Weapons', 'Engine, Chemical & HEDM', 'Engine, Electric', 'Engine, Fission', 'Engine, Nuclear Pulse',
        'Engine, Fusion', 'Engine, TotalConv. & Antimatter', 'Reactionless Engine'];

    // This function sets the selected category and updates the module list.
    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
        const newModuleList = validModuleSorter(moduleShipData, moduleLocation1, moduleLocation2, shipSM, shipTL, shipStreamlinedUn, e.target.value, superScience, shipModules);
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
            setModule(e.target.value);
            handleSetModules(e.target.value, moduleCategory, moduleLocation1, moduleLocation2, moduleNumber)
        } else {
            setModule(e.target.value);
            handleSetModules(e.target.value, moduleCategory, moduleLocation1, moduleLocation2, moduleNumber)

            let moduleKeyObj = moduleShipData[e.target.value];
            let SMData = moduleKeyObj.find(module => module.SM === shipSM);
            setCost(SMData.cost);
            setWorkspaces(SMData.Workspaces);
            setRepairSkill(moduleKeyObj[0].RepairSkill);
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

    useEffect(() => {
        if (selectedEngine && selectedEngine !== '') {
        }
    }, [selectedEngine])

    // This function filters the valid modules based on the ship's tech level, streamlined/unstreamlined, and other module requirements.
    function validModuleSorter(moduleShipData, moduleLocation1, moduleLocation2, shipSM, shipTL, shipStreamlinedUn, category, superScience, shipModules) {
        if (shipModules) {
            let newCategory = category
            let newModuleList = [];
            let coreCount = shipModules.filter(module => module.moduleLocation2 === 'core').length;
            let activeCore = shipModules.filter(module => module.moduleLocation2 === 'core');
            let spinalFront = false
            let spinalMid = false
            let spinalRear = false
            if (module !== '') {
                let currentModule = module

                if (currentModule && currentModule !== '') {
                    if ((moduleShipData[currentModule][0].Category.includes('Engine,') && selectedEngine === '') || (moduleShipData[currentModule][0].Category.includes('Reactionless') && selectedEngine === '')) {
                        handleSelectedEngine(currentModule)
                    }
                }
            }

            shipModules.forEach(module => {
                if (module.moduleKey === 'Spinal Battery') {
                    if (module.moduleLocation1 === 'front') {
                        spinalFront = true;
                    } else if (module.moduleLocation1 === 'middle') {
                        spinalMid = true;
                    } else if (module.moduleLocation1 === 'rear') {
                        spinalRear = true;
                    }
                }
            });

            if (!activeCore.some(module => module.moduleNumber === moduleNumber) && coreCount >= 2 && moduleLocation2 === 'core') {
                newModuleList.push('All Core Modules Already in Use');
            } else {
                for (let key in moduleShipData) {
                    let selectedCategory = newCategory
                    let keyIsEngineKey = engineKeys.includes(key)

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
                        && (key !== 'Defensive ECM' || key === 'Defensive ECM' && shipModules.filter(module => module.moduleKey === 'Defensive ECM').length < 3)
                        && (key !== 'Engine Room' || key === 'Engine Room' && shipSM <= 9 && shipModules.filter(module => module.moduleKey === 'Engine Room').length < 1)
                        && (key !== 'Jump Gate' || key === 'Jump Gate' && shipSM >= 9)
                        && (key !== 'Factory, Replicator' || key === 'Factory, Replicator' && shipSM >= 6)
                        && (key !== 'Factory, Nanofactory' || key === 'Factory, Nanofactory' && shipSM >= 6)
                        && (key !== 'Factory, Robofac' || key === 'Factory, Robofac' && shipSM >= 6)
                        && (key !== 'Factory, Fabricator' || key === 'Factory, Fabricator' && shipSM >= 6)
                        && (key !== 'Secondary Battery' || key === 'Secondary Battery' && shipSM >= 6)
                        && (key !== 'Tertiary Battery' || key === 'Tertiary Battery' && shipSM >= 7)
                        && (key !== 'Spinal Battery' || key === 'Spinal Battery' && (spinalFront === false && moduleLocation1 === 'front' && moduleLocation2 === 'hull') || (spinalMid === false && moduleLocation1 === 'middle' && moduleLocation2 === 'core') || (spinalRear === false && moduleLocation1 === 'rear' && moduleLocation2 === 'hull'))
                        && (keyIsEngineKey === false || (keyIsEngineKey === true && selectedEngine === '') || (keyIsEngineKey === true && key === selectedEngine))
                    ) {
                        newModuleList.push(key);
                    }
                }
            }
            return newModuleList;
        }
    }

    // This useEffect calls the validModuleSorter function to filter valid modules based and updates the module list.
    useEffect(() => {
        const newModuleList = validModuleSorter(moduleShipData, moduleLocation1, moduleLocation2, shipSM, shipTL, shipStreamlinedUn, category, superScience, shipModules);
        setModuleList(newModuleList);

    }, [shipTL, superScience, shipStreamlinedUn, shipSM, moduleLocation1, moduleLocation2, moduleShipData, category, module, shipModules, selectedEngine])

    // This useEffect updates the display cost and workspaces when the cost and workspaces change.
    useEffect(() => {
        let displayCost = ''
        let displayWorkspaces = ''
        if (module === '') {
            displayCost = '0';
            displayWorkspaces = '0';
        } else {
            displayCost = cost.toLocaleString();
            displayWorkspaces = workspaces.toLocaleString();
        }
        setDisplayCost(displayCost);
        setDisplayWorkspaces(displayWorkspaces);
    }, [cost, workspaces, module])

    // This use effect resets the current module when the fundamental ship characteristics are changed,
    // it would be better to upgrade this to only remove them if they are no longer valid but this will 
    // work for now.
    useEffect(() => {
        setModule('');
    }, [shipSM, shipTL, superScience, shipStreamlinedUn])

    return (
        <div className={`${styles.buildLabel} ${buildCol} ${buildRow}`}>
            <span className={styles.moduleLabel}>&#91;{moduleNumber}&#93;   {module} </span>
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

            <span className={styles.moduleInfoSpanTitle} title='These are default values and will not show changes due to de-rated reactors, unused weapons, automation, etc.'>Cost: ${displayCost} Workspaces: {displayWorkspaces}</span>
            <span className={styles.moduleInfoSpanTitle} title={repairSkill}>Repair Skill</span>
        </div>
    )
}

export default ShipModuleSelector;