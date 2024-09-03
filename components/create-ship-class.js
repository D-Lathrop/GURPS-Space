import styles from "../styles/create-ship-class.module.scss"
import shipData from "../data/ship-data.json"
import SMData from "../data/shipSM-data.json"
import weaponData from "../data/weapon-data.json"
import weaponTables from "../data/weapon-tables.json"
import designFeature from "../data/designFeature-data.json"
import designSwitch from "../data/designSwitch-data.json"
import React, { useState, useEffect, useCallback } from 'react';
import ShipModuleSelector from "./ship-module-selector.js";
import ShipClassStatBlock from "./ship-class-statblock.js";
import ShipClassHabitatPowerWeapons from "./ship-class-habitatpower.js";
import ShipCustomization from "./ship-class-customization.js";
import ShipDesign from "./ship-design.js";

const CreateShipClass = ({ isExpanded }) => {
    // Basic Ship Class State Variables
    const [currentStatComponent, setStatCurrentComponent] = useState('shipClassStatBlock')
    const [superScienceChecked, setSuperScienceChecked] = useState(false);
    const [shipClassName, setClassName] = useState('Indefatigable');
    const [shipClassClassification, setClassClassification] = useState('Frigate');
    const [shipClassDesigner, setClassDesigner] = useState('Sir T. Slade');
    const [shipClassManufacturer, setClassManufacturer] = useState("Buckler's Hard");
    const [shipTL, setTL] = useState(7);
    const [shipSM, setSM] = useState(5);
    const [shipStreamlinedUn, setStreamlinedUn] = useState('unstreamlined');
    const [shipStreamlinedUnDisplay, setStreamlinedUnDisplay] = useState('Unstreamlined');
    const [shipdSTHP, setdSTHP] = useState(0);
    const [shipHT, setHT] = useState(0);
    const [shipCommSensorLvl, setCommSensorLvl] = useState(0);
    const [shipMass, setMass] = useState(0);
    const [shipLength, setLength] = useState(0);
    const [shipMaxGravity, setMaxGravity] = useState(0);
    const [shipComplexity, setComplexity] = useState(0);
    const [shipModules, setModules] = useState([[{}, {}, {}, {}, {}, {}, {}], [{}, {}, {}, {}, {}, {}, {}], [{}, {}, {}, {}, {}, {}, {}]]);
    const [classNotes, setClassNotes] = useState('Input any notes about the class here.');
    const [shipDisplayCost, setDisplayCost] = useState(0);
    const [shipTotalModulesCost, setTotalModulesCost] = useState(0);
    const [shipTotalCost, setTotalCost] = useState(0);


    // Ship Movement State Variables
    const [shipHnd, setHnd] = useState(0);
    const [shipSR, setSR] = useState(0);
    const [shipDisplayHndSR, setDisplayHndSR] = useState('0/0');
    const [selectedEngine, setSelectedEngine] = useState('');
    const [shipMove, setMove] = useState(0);
    const [shipAccel, setAccel] = useState(0);
    const [shipDeltaV, setDeltaV] = useState(0);
    const [shipJumpGateMax, setJumpGateMax] = useState(0);
    const [shipMaxFTL, setMaxFTL] = useState(0);
    const [shipFuelLoad, setFuelLoad] = useState(0);


    // Ship Weapon, ECM, and dDR State Variables
    const [shipDisplaydDR, setDisplaydDR] = useState('0/0/0');
    const [shipBaseFrontdDR, setBaseFrontdDR] = useState(0);
    const [shipFrontdDR, setFrontdDR] = useState(0);
    const [shipBaseMiddDR, setBaseMiddDR] = useState(0);
    const [shipMiddDR, setMiddDR] = useState(0);
    const [shipBaseReardDR, setBaseReardDR] = useState(0);
    const [shipReardDR, setReardDR] = useState(0);
    const [shipDefensiveECMTL, setShipDefensiveECMTL] = useState(0);
    const [shipDefensiveECMBonus, setShipDefensiveECMBonus] = useState(0);
    const [shipSpinalMounts, setSpinalMounts] = useState(0);
    const [shipMajorMounts, setMajorMounts] = useState(0);
    const [shipMediumMounts, setMediumMounts] = useState(0);
    const [shipSecondaryMounts, setSecondaryMounts] = useState(0);
    const [shipTertiaryMounts, setTertiaryMounts] = useState(0);


    // Ship Weapon Selection State Variables
    const [shipUnusedSpinalMounts, setUnusedSpinalMounts] = useState(0);
    // This tracks the number of weapon mounts in each location, [0] is front, [1] is middle, and [2] is rear.
    // The number of values in each subarray is the number of mounts in that location.
    const [shipMajorMountLocation, setMajorMountLocation] = useState([[0], [0], [0]]);
    const [shipUnusedMajorWeapons, setUnusedMajorWeapons] = useState(0);  // This tracks the total number of unused major mounts.
    const [shipMediumMountLocation, setMediumMountLocation] = useState([[0], [0], [0]]);
    const [shipUnusedMediumWeapons, setUnusedMediumWeapons] = useState(0);
    const [shipSecondaryMountLocation, setSecondaryMountLocation] = useState([[0], [0], [0]]);
    const [shipUnusedSecondaryWeapons, setUnusedSecondaryWeapons] = useState(0);
    const [shipTertiaryMountLocation, setTertiaryMountLocation] = useState([[0], [0], [0]]);
    const [shipUnusedTertiaryWeapons, setUnusedTertiaryWeapons] = useState(0);
    const [shipWeaponsCost, setWeaponsCost] = useState(0);
    const [unusedWeaponMountList, setUnusedWeaponMountList] = useState([])
    const [shipWeaponMountCargo, setWeaponMountCargo] = useState(0);
    const [selectedUninstalledCargo, setSelectedUninstalledCargo] = useState(0);
    const [selectedMountCostChange, setSelectedMountCostChange] = useState(0);
    const [selectedMountType, setSelectedMountType] = useState('');
    const [selectedWeaponType, setSelectedWeaponType] = useState('');
    const [weaponSubType, setWeaponSubType] = useState('');
    const [shipValidWeaponTypesList, setValidWeaponTypeList] = useState([]);


    // Weapon Stat State Variables
    const [weaponList, setWeaponList] = useState([]);
    const [selectedWeaponCount, setSelectedWeaponCount] = useState(1);
    const [selectedWeaponSize, setSelectedWeaponSize] = useState(0);
    const [selectedWeaponFixed, setSelectedWeaponFixed] = useState(false);
    const [selectedWeaponLargestWarhead, setSelectedWeaponLargestWarhead] = useState(["None", "None"]);
    const [selectedWeaponRangeArray, setSelectedWeaponRangeArray] = useState([[0, 0], [0, 0], [0, 0], [0, 0]]);
    const [warpMissileRange, setWarpMissileRange] = useState([0, 0, 0, 0]);
    const [selectedWeaponDmgDice, setSelectedWeaponDmgDice] = useState(0);
    const [selectedWeaponDmgMod, setSelectedWeaponDmgMod] = useState(0);
    const [selectedWeaponDmgMulti, setSelectedWeaponDmgMulti] = useState(0);
    const [selectedWeaponArmorDiv, setSelectedWeaponArmorDiv] = useState(0);
    const [selectedWeaponSAcc, setSelectedWeaponSAcc] = useState(0);
    const [selectedWeaponRcl, setSelectedWeaponRcl] = useState(0);
    const [selectedWeaponRoF, setSelectedWeaponRoF] = useState([0, 0, 0, 0]);
    const [selectedWeaponShots, setSelectedWeaponShots] = useState(0);
    const [selectedWeaponThrust, setSelectedWeaponThrust] = useState([[0, 0], [0, 0], [0, 0], [0, 0]]);
    const [selectedWeaponBurn, setSelectedWeaponBurn] = useState([[0, 0], [0, 0], [0, 0], [0, 0]]);
    const [selectedWeaponImpulse, setSelectedWeaponImpulse] = useState(0);
    const [selectedWeaponDamageTypes, setSelectedWeaponDamageTypes] = useState(['']);
    const [selectedWeaponImprovedValid, setSelectedWeaponImprovedValid] = useState(false);
    const [selectedWeaponImproved, setSelectedWeaponImproved] = useState(false);
    const [selectedWeaponRapidFire, setSelectedWeaponRapidFire] = useState(false);
    const [selectedWeaponVeryRapidFire, setSelectedWeaponVeryRapidFire] = useState(false);
    const [currentMediumCountFront, setCurrentMediumCountFront] = useState(0);
    const [currentSecondaryCountFront, setCurrentSecondaryCountFront] = useState(0);
    const [currentTertiaryCountFront, setCurrentTertiaryCountFront] = useState(0);
    const [currentMediumCountMid, setCurrentMediumCountMid] = useState(0);
    const [currentSecondaryCountMid, setCurrentSecondaryCountMid] = useState(0);
    const [currentTertiaryCountMid, setCurrentTertiaryCountMid] = useState(0);
    const [currentMediumCountRear, setCurrentMediumCountRear] = useState(0);
    const [currentSecondaryCountRear, setCurrentSecondaryCountRear] = useState(0);
    const [currentTertiaryCountRear, setCurrentTertiaryCountRear] = useState(0);

    // Ship Cargo State Variables
    const [shipTotalCargoAllTypes, setTotalCargoAllTypes] = useState(0);
    const [shipUPressCargoCapacity, setUPressCargoCapacity] = useState(0);
    const [shipUPressCargo, setUPressCargo] = useState(0);
    const [shipPressCargo, setPressCargo] = useState(0);
    const [shipShieldedCargo, setShieldedCargo] = useState(0);
    const [shipRefrigeratedCargo, setRefrigeratedCargo] = useState(0);
    const [shipSteerageCargo, setSteerageCargo] = useState(0);

    // Habitat State Variables
    const [shipOccupancy, setShipOccupancy] = useState(0);
    const [shipLongOccupancy, setLongOccupancy] = useState(0);
    const [shipShortOccupancy, setShortOccupancy] = useState(0);
    const [shipShortOccupancyCrew, setShortOccupancyCrew] = useState(0); // This value also works as the total crew compliment including non-essential personnele like stewards, waiters, etc.
    const [shipShortOccupancyPassengers, setShortOccupancyPassengers] = useState(0);
    const [shipCabinsCapacity, setCabinsCapacity] = useState(0);
    const [shipTotalLifeSupport, setTotalLifeSupport] = useState(false);
    const [shipCabins, setShipCabins] = useState(0);
    const [shipAreas, setShipAreas] = useState(0);
    const [shipSeats, setShipSeats] = useState(0);
    const [shipBunkrooms, setBunkrooms] = useState(0);
    const [shipCells, setCells] = useState(0);
    const [shipLuxuryCabins, setLuxuryCabins] = useState(0);
    const [shipBriefingRooms, setBriefingRooms] = useState(0);
    const [shipEstablishments, setEstablishments] = useState(0);
    const [shipHibernationChambers, setHibernationChambers] = useState(0);
    const [shipLabs, setLabs] = useState(0);
    const [shipPhysicsLabs, setPhysicsLabs] = useState(0);
    const [shipSuperScienceLabs, setSuperScienceLabs] = useState(0);
    const [shipMiniFabricators, setMiniFabricators] = useState(0);
    const [shipMiniRoboFacs, setMiniRoboFacs] = useState(0);
    const [shipMiniNanoFacs, setMiniNanoFacs] = useState(0);
    const [shipMiniReplicators, setMiniReplicators] = useState(0);
    const [shipOffices, setOffices] = useState(0);
    const [shipSickBays, setSickBays] = useState(0);
    const [shipSickBaysAuto, setSickBaysAuto] = useState(0);
    const [shipTeleportProjectors, setTeleportProjectors] = useState(0);
    const [shipTeleportProjectorsSend, setTeleportProjectorsSend] = useState(0);
    const [shipTeleportProjectorsReceive, setTeleportProjectorsReceive] = useState(0);
    const [shipWorkspaces, setWorkspaces] = useState(0);
    const [shipBaseWorkspaces, setBaseWorkspaces] = useState(0);
    const [shipControlStations, setControlStations] = useState(0);
    const [shipHabitatPowerCost, setHabitatPowerCost] = useState(0);

    // Ship Power, Hangar, and Factory State Variables
    const [shipPowerPlants, setShipPowerPlants] = useState([]);
    const [shipPowerDemand, setPowerDemand] = useState(0);
    const [shipPowerGen, setPowerGen] = useState(0);
    const [shipLaunchRate, setShipLaunchRate] = useState(0);
    const [shipHangarCapacity, setShipHangarCapacity] = useState(0);
    const [shipMiningCapacity, setMiningCapacity] = useState(0);
    const [shipRefineryCapacity, setRefineryCapacity] = useState(0);
    const [shipFacValueHour, setFacValueHour] = useState(0);
    const [shipFacWeightHour, setFacWeightHour] = useState(0);

    // Module Customization State Variables
    const [shipUncustomizedModules, setUncustomizedModules] = useState([]);

    // Design Switch and Feature State Variables
    const [shipHardenedArmorCost, setHardenedArmorCost] = useState(0);
    const [shipRamRocketCost, setRamRocketCost] = useState(0);
    const [shipSingularityDriveCost, setSingularityDriveCost] = useState(0);
    const [shipValidDesignSwitchArray, setValidDesignSwitchArray] = useState([]);
    const [shipValidDesignFeatureArray, setValidDesignFeatureArray] = useState([]);
    const [shipSelectedFeaturesArray, setSelectedFeatures] = useState([]);
    const [shipSelectedSwitchesArray, setSelectedSwitches] = useState([]);
    const [shipDesignCost, setDesignCost] = useState(0)

    // This is a higher order function used to loop through the shipModules 2D Grid and apply a callback function to each module.
    function processShipModules(shipModules, callbackFunction) {
        for (let gridRow of shipModules) {
            for (let shipModule of gridRow) {
                callbackFunction(shipModule);
            }
        }
    }

    // This function gets the index values of a module in the 2D array based on the moduleLocation1 and moduleNumber so that module can be manipulated.
    function getModuleIndex(moduleLocation1, moduleNumber) {
        let rowIndex = 0;
        let colIndex = 0;
        const coreIndex = 6

        switch (moduleLocation1) {
            case 'front':
                rowIndex = 0;
                break;
            case 'middle':
                rowIndex = 1;
                break;
            case 'rear':
                rowIndex = 2;
                break;
            default:
                console.log('Unexpected value for moduleLocation1, module selector.');
                break;
        }

        if (typeof moduleNumber === 'number') {
            colIndex = moduleNumber - 1;
        } else if (typeof moduleNumber === 'string') {
            colIndex = coreIndex;
        } else {
            console.log('Unexpected type for moduleNumber, module selector.');
        }

        return [rowIndex, colIndex]
    }

    // ****************************************************************************************************************************************************
    // ****************************************************************************************************************************************************
    // Modules and Overall Ship Stats - START

    const engineKeys = ['Chemical', 'HEDM', 'Ion Drive', 'Mass Driver', 'Nuclear Thermal Rocket',
        'Nuclear Light Bulb', 'Nuclear Saltwater Rocket', 'External Pulsed Plasma', 'Fusion Pulse Drive',
        'Advanced Fusion Pulse Drive', 'Super Fusion Pulse Drive', 'Fusion Rocket', 'Fusion Torch',
        'Super Fusion Torch', 'Antimatter Thermal Rocket', 'Antimatter Plasma Rocket', 'Antimatter Plasma Torch',
        'Super Antimatter Plasma Torch', 'Antimatter Pion', 'Antimatter Pion Torch', 'Total Conversion Torch',
        'Super Conversion Torch', 'Rotary', 'Standard', 'Hot Reactionless', 'Super Reactionless', 'Subwarp']

    // This useEffect handles changes of the SM to calculate basic ship statistics including mass, length, handling, SR, ST, and HP.  It also displays more readable values to the page.
    useEffect(() => {
        const selectedSMData = SMData.find(ship => ship.SM === shipSM);
        const selectedMass = selectedSMData.LoadedMass;
        const selectedLength = selectedSMData.Length;
        const selecteddSTHP = selectedSMData.dSTHP;
        const selectedHnd = selectedSMData.Hnd;
        const selectedSR = selectedSMData.SR;

        setdSTHP(selecteddSTHP);
        setLength(selectedLength)
        setMass(selectedMass)
        setHnd(selectedHnd);
        setSR(selectedSR);

        setDisplayHndSR(selectedHnd.toLocaleString() + '/' + selectedSR.toLocaleString());

    }, [shipSM]);

    // This useEffect handles changes of the SM and TL to calculate ship computer complexity.
    useEffect(() => {
        const selectedSMControlRoomData = shipData['Control Room'].find(ship => ship.SM === shipSM);
        const selectedSMBaseComplexity = selectedSMControlRoomData.Complexity;
        let selectedSMFinalComplexity = 0;

        switch (shipTL) {
            case 7:
                selectedSMFinalComplexity = selectedSMBaseComplexity - 6;
                break;
            case 8:
                selectedSMFinalComplexity = selectedSMBaseComplexity - 4;
                break;
            case 9:
                selectedSMFinalComplexity = selectedSMBaseComplexity - 2;
                break;
            case 10:
                selectedSMFinalComplexity = selectedSMBaseComplexity
                break;
            case 11:
                selectedSMFinalComplexity = selectedSMBaseComplexity + 1;
                break;
            case 12:
            case 13:
            case 14:
            case 15:
                selectedSMFinalComplexity = selectedSMBaseComplexity + 2;
                break;
            default:
                selectedSMFinalComplexity = 'No support';
                break;
        }

        setComplexity(selectedSMFinalComplexity);
    }, [shipTL, shipSM]);

    // This useEffect calculates Comm/Sensor array level based on the presence of a sensor module, the SM, and the TL.
    useEffect(() => {
        const TL = shipTL;

        let commSensor = 0;
        let sensorArrayPresent = false;

        processShipModules(shipModules, (module) => {
            if (module.moduleKey === "Sensor Array, Multipurpose" ||
                module.moduleKey === "Sensor Array, Science" ||
                module.moduleKey === "Sensor Array, Tactical" ||
                module.moduleKey === "Sensor Array, Enhanced") {
                sensorArrayPresent = true;
            }
        });

        const adjustment = sensorArrayPresent ? 2 : 0;

        switch (shipSM) {
            case 5:
                commSensor = TL - (6 - adjustment);
                break;
            case 6:
                commSensor = TL - (5 - adjustment);
                break;
            case 7:
                commSensor = TL - (4 - adjustment);
                break;
            case 8:
                commSensor = TL - (3 - adjustment);
                break;
            case 9:
                commSensor = TL - (2 - adjustment);
                break;
            case 10:
                commSensor = TL - (1 - adjustment);
                break;
            case 11:
                commSensor = TL + adjustment;
                break;
            case 12:
                commSensor = TL + (1 + adjustment);
                break;
            case 13:
                commSensor = TL + (2 + adjustment);
                break;
            case 14:
                commSensor = TL + (3 + adjustment);
                break;
            case 15:
                commSensor = TL + (4 + adjustment);
                break;
            default:
                commSensor = 'Error';
                break;
        }

        setCommSensorLvl(commSensor);
    }, [shipModules, shipSM, shipTL]);

    // This function handles changes to the SuperScience checkbox.
    const handleSuperScienceCheckboxChange = () => {
        setSuperScienceChecked(!superScienceChecked);
    };

    // This function handles changes to the shipClassName value and updates the state variable.
    const handleClassNameChange = (event) => {
        setClassName(event.target.value);
    }

    // This function handles changes to the shipSM value and updates the state variable.
    const handleSMChange = (event) => {
        const newSM = Number(event.target.value);
        setSM(newSM);
    }

    // This function handles changes to the shipClassification value and updates the state variable.
    const handleClassificationChange = (event) => {
        const newClassification = event.target.value;
        setClassClassification(newClassification);
    }

    // This function handles changes to the shipDesigner value and updates the state variable.
    const handleDesignerChange = (event) => {
        const newDesigner = event.target.value;
        setClassDesigner(newDesigner);
    }

    // This function handles changes to the shipManufacturer value and updates the state variable.
    const handleManufacturerChange = (event) => {
        const newManufacturer = event.target.value;
        setClassManufacturer(newManufacturer);
    }

    // This function handles changes to the shipTL value and updates the state variable.
    const handleTLChange = (event) => {
        const newTL = Number(event.target.value);
        setTL(newTL);
    }

    // This function handles changes to the shipStreamlinedUn value and updates the display value.
    const handleStreamlinedUnChange = (event) => {
        const newStreamlinedUn = event.target.value;
        setStreamlinedUn(newStreamlinedUn);
        if (newStreamlinedUn === 'streamlined') {
            setStreamlinedUnDisplay('Streamlined');
        } else {
            setStreamlinedUnDisplay('Unstreamlined');
        }
    }

    // This function calculates the deltaV multiplier based on the mpsTank and tankCount.
    function deltaVMultiplier(mpsTank, tankCount) {
        let finalDeltaV = 0;
        const deltaVMultipliers = [1.2, 1.4, 1.6, 1.8, 2, 2.2, 2.5, 3];
        switch (tankCount) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                finalDeltaV = mpsTank * tankCount
                break;
            case 6:
            case 7:
            case 8:
                finalDeltaV = (mpsTank * tankCount) * deltaVMultipliers[0]
                break;
            case 9:
            case 10:
            case 11:
            case 12:
                finalDeltaV = (mpsTank * tankCount) * deltaVMultipliers[1]
                break;
            case 13:
            case 14:
                finalDeltaV = (mpsTank * tankCount) * deltaVMultipliers[2]
                break;
            case 15:
                finalDeltaV = (mpsTank * tankCount) * deltaVMultipliers[3]
                break;
            case 16:
                finalDeltaV = (mpsTank * tankCount) * deltaVMultipliers[4]
                break;
            case 17:
                finalDeltaV = (mpsTank * tankCount) * deltaVMultipliers[5]
                break;
            case 18:
                finalDeltaV = (mpsTank * tankCount) * deltaVMultipliers[6]
                break;
            case 19:
                finalDeltaV = (mpsTank * tankCount) * deltaVMultipliers[7]
                break;
            default:
                break;
        }
        finalDeltaV = parseFloat(finalDeltaV.toFixed(2))

        return finalDeltaV
    }

    // This useEffect handles changes to the shipdDR values to update the displaydDR value.
    useEffect(() => {
        setDisplaydDR(`${shipFrontdDR}/${shipMiddDR}/${shipReardDR}`)
    }, [shipFrontdDR, shipMiddDR, shipReardDR])

    // This useEffect handles changes to shipAccel and shipDeltaV to update the shipMove value used for display.
    useEffect(() => {
        if (shipDeltaV === Infinity) {
            setMove(`${shipAccel}/ ∞`)
        } else {
            setMove(`${shipAccel}/${shipDeltaV}`)
        }
    }, [shipAccel, shipDeltaV])

    // This function handles changes to the shipModules array and updates the state variable.
    const handleSetModules = (moduleKey, moduleCategory, moduleLocation1, moduleLocation2, moduleNumber, moduleCost, moduleWorkspaces, fuelTypes) => {
        const [rowIndex, colIndex] = getModuleIndex(moduleLocation1, moduleNumber);

        let newModuleList = [...shipModules];

        let newModuleListObj = {
            moduleKey: moduleKey,
            moduleCategory: moduleCategory,
            moduleLocation1: moduleLocation1,
            moduleLocation2: moduleLocation2,
            moduleNumber: moduleNumber,
            baseModuleCost: moduleCost,
            moduleCost: moduleCost,
            baseModuleWorkspaces: moduleWorkspaces,
            moduleWorkspaces: moduleWorkspaces,
            alreadyCustomized: false
        }

        if (fuelTypes) {
            newModuleListObj.fuelTypes = fuelTypes
        }

        function highAndTotalAutomation() {
            newModuleListObj.customizable = true;
            if (moduleWorkspaces > 0) {
                newModuleListObj.totalAutomation = false;
            }
            if (moduleWorkspaces > 0 && shipSM >= 12) {
                newModuleListObj.highAutomation = false;
            }
        }

        function highAndTotalAutomationOnly() {
            if (moduleWorkspaces > 0) {
                newModuleListObj.totalAutomation = false;
                newModuleListObj.customizable = true;
                if (shipSM >= 12) {
                    newModuleListObj.highAutomation = false;
                }
            } else {
                newModuleListObj.customizable = false;
            }
        }

        function reactorGenAndLife(powerGen, internalLifespan) {
            newModuleListObj.powerGen = powerGen;
            newModuleListObj.internalLifespan = internalLifespan;
        }

        function addArmorValues(unstreamlinedArmor, streamlinedArmor) {
            newModuleListObj.baseModuleStreamlineddDR = streamlinedArmor;
            newModuleListObj.baseModuleUnstreamlineddDR = unstreamlinedArmor;
            newModuleListObj.moduledDR = 0;
        }

        const moduleKeyObj = shipData[moduleKey];
        const SMData = moduleKeyObj.find(module => module.SM === shipSM);

        switch (moduleKey) {
            case "Control Room":
                highAndTotalAutomation();
                newModuleListObj.controlStations = SMData.ControlStations;
                newModuleListObj.defaultControlStations = defaultNumberControlStations;
                break;
            case "Armor, Exotic Laminate":
                newModuleListObj.customizable = true;
                newModuleListObj.hardenedArmor = false;
                newModuleListObj.indestructibleArmor = false;
                addArmorValues(SMData.USdDR, SMData.SdDR)
                break;
            case "Armor, Diamondoid":
            case "Armor, Nanocomposite":
            case "Armor, Advanced Metallic Laminate":
            case "Armor, Metallic Laminate":
            case "Armor, Light Alloy":
            case "Armor, Steel":
                newModuleListObj.customizable = true;
                newModuleListObj.hardenedArmor = false;
                addArmorValues(SMData.USdDR, SMData.SdDR)
                break;
            case "Armor, Organic":
            case "Armor, Stone":
            case "Armor, Ice":
                addArmorValues(SMData.USdDR, SMData.SdDR)
                newModuleListObj.customizable = false;
                break;
            case "Spinal Battery":
            case "Major Battery":
            case "Medium Battery":
            case "Secondary Battery":
            case "Tertiary Battery":
                highAndTotalAutomation();
                newModuleListObj.mountedWeapons = [];
                // newModuleListObj.graviticFocus = false;
                // newModuleListObj.rapidFire = false;
                // newModuleListObj.veryRapidFire = false;
                // newModuleListObj.improved = false;
                break;
            case "Solar Panel Array":
                highAndTotalAutomationOnly();
                reactorGenAndLife(1, Infinity);
                break;
            case "Reactor, Super Fusion":
                highAndTotalAutomation();
                reactorGenAndLife(4, shipTL === 11 ? 400 : shipTL === 12 ? 1000 : 400)
                break;
            case "Reactor, Total Conversion":
                highAndTotalAutomationOnly();
                reactorGenAndLife(5, Infinity);
                break;
            case "Reactor, Antimatter":
                highAndTotalAutomation();
                reactorGenAndLife(4, shipTL === 10 ? 2 : shipTL === 11 ? 20 : 200)
                break;
            case "Reactor, Fusion":
                highAndTotalAutomation();
                reactorGenAndLife(2, shipTL === 9 ? 50 : shipTL === 10 ? 200 : shipTL === 11 ? 600 : 1500)
                break;
            case "Reactor, Fission":
                highAndTotalAutomationOnly();
                reactorGenAndLife(1, shipTL === 8 ? 25 : shipTL === 9 ? 50 : 75)
                break;
            case "Chemical, MHD Turbine":
                highAndTotalAutomation();
                newModuleListObj.powerGen = 2;
                newModuleListObj.internalLifespan = shipTL === 9 ? 6 : shipTL === 10 ? 12 : 12;
                break;
            case "Chemical, Fuel Cell":
                highAndTotalAutomation();
                newModuleListObj.powerGen = 1;
                newModuleListObj.internalLifespan = shipTL === 7 ? 3 : shipTL === 8 ? 6 : shipTL === 9 ? 12 : 24;
                break;
            case "Jump Gate":
                highAndTotalAutomation();
                newModuleListObj.maxTonnage = SMData.MaxTonnage;
                newModuleListObj.combinedGates = [];
                break;
            case "Hangar Bay":
                highAndTotalAutomation();
                newModuleListObj.hangarCapacity = SMData.Capacity;
                newModuleListObj.launchRate = SMData.LaunchRate;
                newModuleListObj.combinedBays = [];
                break;
            case "Habitat":
                highAndTotalAutomation();
                newModuleListObj.baseCabins = SMData.Cabins;
                newModuleListObj.customizedCabins = {};
                newModuleListObj.steerageCargo = 0;
                newModuleListObj.totalLifeSupport = false;
                break;
            case "Open Space":
                highAndTotalAutomation();
                newModuleListObj.customizedAreas = {};
                newModuleListObj.baseAreas = SMData.Areas;
                break;
            case "Fuel Tank":
                newModuleListObj.customizable = true;
                newModuleListObj.assignedContents = '';
                newModuleListObj.fuelLoad = SMData.Fuel;
                break;
            case "Force Screen, TL12 Heavy":
            case "Force Screen, TL12 Light":
            case "Force Screen, TL11 Heavy":
            case "Force Screen, TL11 Light":
                highAndTotalAutomation();
                newModuleListObj.screendDR = SMData.dDr;
                newModuleListObj.mandatorySwitch = false;
                newModuleListObj.adjustableScreen = false;
                newModuleListObj.cloakingScreen = false;
                newModuleListObj.energyScreen = false;
                newModuleListObj.hardenedScreen = false;
                newModuleListObj.kineticScreen = false;
                newModuleListObj.nuclearDamperScreen = false;
                newModuleListObj.opaqueScreen = false;
                newModuleListObj.partialScreen = false;
                newModuleListObj.realityStabilizedScreen = false;
                newModuleListObj.twoWayScreen = false;
                newModuleListObj.velocityScreen = false;
                break;
            case "Cargo Hold":
                highAndTotalAutomation();
                newModuleListObj.baseUPressCargoCapacity = SMData.LoadUPr;
                newModuleListObj.uPressCargoCapacity = SMData.LoadUPr;
                newModuleListObj.refrigeratedCargo = 0;
                newModuleListObj.shieldedCargo = 0;
                break;
            case "Sensor Array, Multipurpose":
            case "Sensor Array, Science":
                highAndTotalAutomation();
                newModuleListObj.ftlCommArray = false;
                newModuleListObj.ftlSensorArray = false;
                newModuleListObj.multiScannerArray = false;
                break;
            case "Sensor Array, Tactical":
            case "Sensor Array, Enhanced":
                highAndTotalAutomation();
                newModuleListObj.ftlCommArray = false;
                newModuleListObj.ftlSensorArray = false;
                break;
            case "Super Reactionless":
            case "Hot Reactionless":
            case "Standard":
            case "Rotary":
            case "Subwarp":
                highAndTotalAutomation();
                newModuleListObj.pseudoVelocity = false;
                newModuleListObj.singularityDrive = false;
                newModuleListObj.driveField = false;
                newModuleListObj.negativeMassPropulsionDrive = false;
                break;
            case "Super Stardrive Engine":
            case "Stardrive Engine":
                highAndTotalAutomation();
                newModuleListObj.driveField = false;
                newModuleListObj.pseudoVelocity = false;
                newModuleListObj.singularityDrive = false;
                newModuleListObj.stardriveFuel = false;
                newModuleListObj.fuelTanks = 0;
                newModuleListObj.reactionlessEngineSuper = false;
                newModuleListObj.reactionlessEngineHot = false;
                newModuleListObj.reactionlessEngineStandard = false;
                newModuleListObj.reactionlessEngineRotary = false;
                newModuleListObj.reactionlessEngineExtraCost = false;
                break;
            case "Antimatter Plasma Torch":
            case "Super Antimatter Plasma Torch":
            case "Antimatter Thermal Rocket":
            case "Super Fusion Torch":
            case "Fusion Torch":
                highAndTotalAutomation();
                newModuleListObj.ramRocket = false;
                newModuleListObj.highThrust = false;
                break;
            case "Nuclear Thermal Rocket":
                highAndTotalAutomation();
                newModuleListObj.ramRocket = false;
                break;
            case "Super Conversion Torch":
            case "Total Conversion Torch":
            case "Antimatter Pion Torch":
            case "Antimatter Pion":
            case "Antimatter Plasma Rocket":
            case "Fusion Rocket":
            case "Super Fusion Pulse Drive":
            case "Advanced Fusion Pulse Drive":
            case "Fusion Pulse Drive":
            case "External Pulsed Plasma":
            case "Mass Driver":
            case "Ion Drive":
                highAndTotalAutomation();
                newModuleListObj.highThrust = false;
                break;
            case "Factory, Nanofactory":
            case "Factory, Robofac":
            case "Factory, Fabricator":
                highAndTotalAutomationOnly();
                newModuleListObj.valuePerHour = SMData.$Hr;
                break;
            case "Factory, Replicator":
                highAndTotalAutomationOnly();
                newModuleListObj.weightPerHour = SMData.lbsHr;
                break;
            case "Refinery":
                newModuleListObj.tonsPerHour = SMData.TonsHrRefinery;
                highAndTotalAutomationOnly();
                break;
            case "Mining":
                newModuleListObj.tonsPerHour = SMData.TonsHrMining;
                highAndTotalAutomationOnly();
                break;
            case "Nuclear Saltwater Rocket":
            case "Nuclear Light Bulb":
            case "Jet Engine":
            case "HEDM":
            case "Chemical":
            case "Stasis Web":
            case "Robot Arm":
            case "Ramscoop":
            case "Engine Room":
            case "Defensive ECM":
            case "Contragravity Lifter":
                highAndTotalAutomationOnly();
                break;
            default:
                newModuleListObj.customizable = false;
                break;
        }

        if (moduleKey === '') {
            newModuleList[rowIndex].splice(colIndex, 1, {});
        } else {
            newModuleList[rowIndex].splice(colIndex, 1, newModuleListObj);
        }
        setModules(newModuleList);
    }


    // This useCallback checks if modules are still valid based on SM, TL, superScience and other variable and deletes the if they aren't.
    // It then updates the cost, workspace, and other values in each module array to match new SM, TL, etc.
    const updateShipModules = useCallback((shipModules, shipData, shipSM, shipStreamlinedUn, shipTL, shipReardDR, superScienceChecked) => {

        let newShipModules = shipModules.map(row => [...row]);
        let currentShipModules = shipModules.map(row => [...row]);

        processShipModules(newShipModules, (shipModule) => {
            if (shipModule.moduleKey !== undefined) {
                const moduleKey = shipModule.moduleKey;
                const moduleKeyObj = shipData[moduleKey];
                const SMData = moduleKeyObj.find(module => module.SM === shipSM);
                const [rowIndex, colIndex] = getModuleIndex(shipModule.moduleLocation1, shipModule.moduleNumber);

                let isValid = false;

                if (
                    (moduleKeyObj[0].SuperScience === true && superScienceChecked === true || moduleKeyObj[0].SuperScience === false)
                    && (moduleKeyObj[0].TL <= shipTL)
                    && (moduleKey !== 'Engine Room' || moduleKey === 'Engine Room' && shipSM <= 9)
                    && (moduleKey !== 'Open Space' || moduleKey === 'Open Space' && shipSM >= 8)
                    && (moduleKey !== 'Habitat' || moduleKey === 'Habitat' && shipSM >= 6)
                    && (moduleKey !== 'Armor, Ice' || moduleKey === 'Armor, Ice' && shipSM >= 8 && shipStreamlinedUn === 'unstreamlined')
                    && (moduleKey !== 'Armor, Stone' || moduleKey === 'Armor, Stone' && shipSM >= 7 && shipStreamlinedUn === 'unstreamlined')
                    && (moduleKey !== 'Jump Gate' || moduleKey === 'Jump Gate' && shipSM >= 9)
                    && (moduleKey !== 'Factory, Replicator' || moduleKey === 'Factory, Replicator' && shipSM >= 6)
                    && (moduleKey !== 'Factory, Nanofactory' || moduleKey === 'Factory, Nanofactory' && shipSM >= 6)
                    && (moduleKey !== 'Factory, Robofac' || moduleKey === 'Factory, Robofac' && shipSM >= 6)
                    && (moduleKey !== 'Factory, Fabricator' || moduleKey === 'Factory, Fabricator' && shipSM >= 6)
                    && (moduleKey !== 'Secondary Battery' || moduleKey === 'Secondary Battery' && shipSM >= 6)
                    && (moduleKey !== 'Tertiary Battery' || moduleKey === 'Tertiary Battery' && shipSM >= 7)
                    && (moduleKey !== "External Pulsed Plasma" || moduleKey === "External Pulsed Plasma" && shipReardDR >= 50)
                ) {
                    isValid = true;
                } else {
                    newShipModules[rowIndex].splice(colIndex, 1, {});
                }

                function updateBaseCostAndWorkspaces() {
                    shipModule.baseModuleCost = SMData.cost;
                    shipModule.baseModuleWorkspaces = SMData.Workspaces;
                }

                if (isValid) {
                    switch (moduleKey) {
                        case "Control Room":
                            shipModule.defaultControlStations = SMData.ControlStations;
                            updateBaseCostAndWorkspaces();
                            break;
                        case "Armor, Exotic Laminate":
                        case "Armor, Diamondoid":
                        case "Armor, Nanocomposite":
                        case "Armor, Advanced Metallic Laminate":
                        case "Armor, Metallic Laminate":
                        case "Armor, Light Alloy":
                        case "Armor, Steel":
                        case "Armor, Organic":
                        case "Armor, Stone":
                        case "Armor, Ice":
                            updateBaseCostAndWorkspaces()
                            shipModule.baseModuleStreamlineddDR = SMData.SdDR;
                            shipModule.baseModuleUnstreamlineddDR = SMData.USdDR;
                            shipModule.moduledDR = shipStreamlinedUn === 'streamlined' ? SMData.SdDR : SMData.USdDR;
                            break;
                        case "Spinal Battery":
                        case "Major Battery":
                        case "Medium Battery":
                        case "Secondary Battery":
                        case "Tertiary Battery":
                            updateBaseCostAndWorkspaces();
                            let mountedWeaponsArr = shipModule.mountedWeapons;
                            Object.values(mountedWeaponsArr).forEach((weaponObj, index) => {
                                const weaponDataObj = weaponData[weaponObj.weaponName];
                                const weaponTL = weaponDataObj[TL];
                                const weaponSuperScience = weaponDataObj[SuperScience];

                                if (weaponTL > shipTL || (superScienceChecked === false && weaponSuperScience === true)) {
                                    mountedWeaponsArr.splice(index, 1);
                                    shipModule.alreadyCustomized = false;
                                }
                            });
                            shipModule.mountedWeapons = mountedWeaponsArr;
                            break;
                        case "Jump Gate":
                            const combinedGates = shipModule.combinedGates;
                            let allGatesPresent = true;
                            combinedGates.forEach(([rowIndex, colIndex]) => {
                                if (shipModules[rowIndex] && shipModules[rowIndex][colIndex].moduleKey !== 'Jump Gate') {
                                    allGatesPresent = false;
                                }
                            });

                            if (allGatesPresent === false) {
                                shipModule.combinedGates = [];
                                shipModule.alreadyCustomized = false;
                            }

                            shipModule.maxTonnage = SMData.MaxTonnage;
                            updateBaseCostAndWorkspaces();
                            break;
                        case "Hangar Bay":
                            const combinedBays = shipModule.combinedBays;
                            let allBaysPresent = true;
                            combinedBays.forEach(([rowIndex, colIndex]) => {
                                if (shipModules[rowIndex] && shipModules[rowIndex][colIndex].moduleKey !== 'Hangar Bay') {
                                    allBaysPresent = false;
                                }
                            });

                            if (allBaysPresent === false) {
                                shipModule.combinedBays = [];
                                shipModule.alreadyCustomized = false;
                            }

                            shipModule.hangarCapacity = SMData.Capacity;
                            shipModule.launchRate = SMData.LaunchRate;
                            updateBaseCostAndWorkspaces();
                            break;
                        case "Habitat":
                            const originalCabins = shipModule.baseCabins;
                            shipModule.baseCabins = SMData.Cabins;

                            function resetHabs() {
                                shipModule.customizedCabins = {};
                                shipModule.alreadyCustomized = false;
                                shipModule.steerageCargo = 0;
                            }

                            if (originalCabins > SMData.Cabins) {
                                resetHabs();
                            } else if (shipModule.customizedCabins.hasOwnProperty('Hibernation') && shipTL < 9) {
                                resetHabs();
                            } else if (shipModule.customizedCabins.hasOwnProperty('SuperScience Labs') && superScienceChecked === false) {
                                resetHabs();
                            } else if (shipModule.customizedCabins.hasOwnProperty('Mini Fab') && shipTL < 9) {
                                resetHabs();
                            } else if (shipModule.customizedCabins.hasOwnProperty('Mini Robo Fab') && shipTL < 10) {
                                resetHabs();
                            } else if (shipModule.customizedCabins.hasOwnProperty('Mini Nano Fab') && shipTL < 11) {
                                resetHabs();
                            } else if (shipModule.customizedCabins.hasOwnProperty('Mini Rep Fab') && (shipTL < 12 || superScienceChecked === false)) {
                                resetHabs();
                            } else if ((shipModule.customizedCabins.hasOwnProperty('Teleport Receive') || shipModule.customizedCabins.hasOwnProperty('Teleport Send') || shipModule.customizedCabins.hasOwnProperty('Teleport')) && (shipTL < 12 || superScienceChecked === false)) {
                                resetHabs();
                            }
                            updateBaseCostAndWorkspaces();
                            break;
                        case "Open Space":
                            let originalAreas = shipModule.baseAreas;
                            shipModule.baseAreas = SMData.Areas;
                            if (originalAreas > SMData.Areas) {
                                shipModule.customizedAreas = {};
                                shipModule.alreadyCustomized = false;
                            }
                            updateBaseCostAndWorkspaces();
                            break;
                        case "Fuel Tank":
                            shipModule.fuelLoad = SMData.Fuel;
                            updateBaseCostAndWorkspaces();
                            break;
                        case "Force Screen, TL12 Heavy":
                        case "Force Screen, TL12 Light":
                        case "Force Screen, TL11 Heavy":
                        case "Force Screen, TL11 Light":
                            shipModule.screendDR = SMData.dDr;
                            updateBaseCostAndWorkspaces();
                            break;
                        case "Cargo Hold":
                            shipModule.baseUPressCargoCapacity = SMData.LoadUPr;
                            if (shipModule.shieldedCargo + shipModule.refrigeratedCargo > SMData.LoadUPr) {
                                shipModule.shieldedCargo = 0;
                                shipModule.refrigeratedCargo = 0;
                                shipModule.alreadyCustomized = false;
                            }
                            updateBaseCostAndWorkspaces();
                            break;
                        case "Refinery":
                            updateBaseCostAndWorkspaces();
                            shipModule.tonsPerHour = SMData.TonsHrRefinery;
                            break;
                        case "Mining":
                            updateBaseCostAndWorkspaces();
                            shipModule.tonsPerHour = SMData.TonsHrMining;
                            break;
                        case "Factory, Nanofactory":
                        case "Factory, Robofac":
                        case "Factory, Fabricator":
                            updateBaseCostAndWorkspaces();
                            shipModule.valuePerHour = SMData.$Hr;
                            break;
                        case "Factory, Replicator":
                            updateBaseCostAndWorkspaces();
                            shipModule.weightPerHour = SMData.lbsHr;
                            break;
                        case "Reactor, Super Fusion":
                        case "Reactor, Total Conversion":
                        case "Reactor, Antimatter":
                        case "Reactor, Fusion":
                        case "Reactor, Fission":
                        case "Chemical, MHD Turbine":
                        case "Chemical, Fuel Cell":
                            // Add logic to update internalLifespan.
                            updateBaseCostAndWorkspaces();
                            break;
                        case "Solar Panel Array":
                        case "Sensor Array, Multipurpose":
                        case "Sensor Array, Science":
                        case "Sensor Array, Tactical":
                        case "Sensor Array, Enhanced":
                        case "Super Reactionless":
                        case "Hot Reactionless":
                        case "Standard":
                        case "Rotary":
                        case "Subwarp":
                        case "Super Stardrive Engine":
                        case "Stardrive Engine":
                        case "Antimatter Plasma Torch":
                        case "Super Antimatter Plasma Torch":
                        case "Antimatter Thermal Rocket":
                        case "Super Fusion Torch":
                        case "Fusion Torch":
                        case "Nuclear Thermal Rocket":
                        case "Super Conversion Torch":
                        case "Total Conversion Torch":
                        case "Antimatter Pion Torch":
                        case "Antimatter Pion":
                        case "Antimatter Plasma Rocket":
                        case "Fusion Rocket":
                        case "Super Fusion Pulse Drive":
                        case "Advanced Fusion Pulse Drive":
                        case "Fusion Pulse Drive":
                        case "External Pulsed Plasma":
                        case "Mass Driver":
                        case "Ion Drive":
                        case "Nuclear Saltwater Rocket":
                        case "Nuclear Light Bulb":
                        case "Jet Engine":
                        case "HEDM":
                        case "Chemical":
                        case "Stasis Web":
                        case "Robot Arm":
                        case "Ramscoop":
                        case "Engine Room":
                        case "Defensive ECM":
                        case "Contragravity Lifter":
                            updateBaseCostAndWorkspaces();
                            break;
                        default:
                            break;
                    }
                }
            }
        });
        if (JSON.stringify(newShipModules) !== JSON.stringify(currentShipModules)) {
            setShipModules(newShipModules);
        }
    }, []);

    // This useEffect handles changes to the selected module array to update overall ship statistics.
    const updateShipValues = useCallback((shipModules, shipStreamlinedUn, shipTL, shipSM) => {
        const modulesUseEffect = shipModules;
        const modulesUseEffectData = shipData;
        let tankCount = shipModules.filter(module => module.moduleKey === 'Fuel Tank').length;
        let frontdDR = 0;
        let middDR = 0;
        let reardDR = 0;
        let cost = 0;
        let workspaces = 0;
        let defensiveECMTL = 0;
        let defensiveECMBonus = 0;
        let powerDemand = 0;
        let powerGeneration = 0;
        let cabinsCapacity = 0;
        let shortOccupancyCrew = 0;
        let shortOccupancyPassengers = 0;
        let longOccupancy = 0;
        let areas = 0;
        let seats = 0;
        let cabins = 0;
        let bunkrooms = 0;
        let cells = 0;
        let luxuryCabins = 0;
        let briefingRooms = 0;
        let establishments = 0;
        let offices = 0;
        let labs = 0;
        let physicsLabs = 0;
        let superScienceLabs = 0;
        let hibernationChambers = 0;
        let fabricators = 0;
        let roboFacs = 0;
        let nanoFacs = 0;
        let replicators = 0;
        let sickbays = 0;
        let sickbaysAuto = 0;
        let teleProjectors = 0;
        let teleProjectorsSend = 0;
        let teleProjectorsReceive = 0;
        let farms = 0;
        let gardens = 0;
        let pools = 0;
        let theaters = 0;
        let zoos = 0;
        let gyms = 0;
        let controlStations = 0;
        let fuelLoad = 0;
        let jumpGate = 0;
        let maxFTL = 0;
        let uPressCargo = 0;
        let arrayLevel = 0;
        let facValueHour = 0;
        let facWeightHour = 0;
        let launchRate = 0;
        let hangarCapacity = 0;
        let miningCapacity = 0;
        let refineryCapacity = 0;
        let spinalMounts = 0;
        let majorMounts = 0;
        let mediumMounts = 0;
        let secondaryMounts = 0;
        let tertiaryMounts = 0;
        let frontSpinal = false;
        let midSpinal = false;
        let rearSpinal = false;
        let accel = 0;
        let deltaV = 0;

        // if (modulesUseEffect.length === 0) {
        //     frontdDR = 0
        //     middDR = 0
        //     reardDR = 0
        //     cost = 0
        //     workspaces = 0
        //     defensiveECMTL = 0
        //     defensiveECMBonus = 0
        //     powerDemand = 0
        //     powerGeneration = 0
        //     cabinsCapacity = 0
        //     shortOccupancyCrew = 0
        //     shortOccupancyPassengers = 0
        //     longOccupancy = 0
        //     areas = 0
        //     seats = 0
        //     controlStations = 0
        //     engineRoomCount = 0
        //     fuelLoad = 0
        //     jumpGate = 0
        //     maxFTL = 0
        //     uPressCargo = 0
        //     arrayLevel = 0
        //     facValueHour = 0
        //     facWeightHour = 0
        //     launchRate = 0
        //     hangarCapacity = 0
        //     miningCapacity = 0
        //     refineryCapacity = 0
        //     spinalMounts = 0
        //     majorMounts = 0
        //     majorMountLocation = [[0], [0], [0]]
        //     unusedMajorMounts = 0
        //     mediumMounts = 0
        //     mediumMountLocation = [[0], [0], [0]]
        //     unusedMediumMounts = 0
        //     secondaryMounts = 0
        //     secondaryMountLocation = [[0], [0], [0]]
        //     unusedSecondaryMounts = 0
        //     tertiaryMounts = 0
        //     tertiaryMountLocation = [[0], [0], [0]]
        //     unusedTertiaryMounts = 0
        //     frontSpinal = false
        //     midSpinal = false
        //     rearSpinal = false
        //     accel = 0
        //     deltaV = 0
        //     tankCount = 0
        // }

        function updatedDR(currentModuleLocation, dDRValue) {
            if (currentModuleLocation === 'front') {
                frontdDR += dDRValue
            } else if (currentModuleLocation === 'middle') {
                middDR += dDRValue
            } else if (currentModuleLocation === 'rear') {
                reardDR += dDRValue
            }
        }

        for (let rowIndex = 0; rowIndex < modulesUseEffect.length; rowIndex++) {
            for (let colIndex = 0; colIndex < modulesUseEffect[rowIndex].length; colIndex++) {
                let currentModule = modulesUseEffect[rowIndex][colIndex];
                let currentModuleKey = currentModule.moduleKey;
                if (Object.keys(currentModule).length === 0) {
                    continue;
                }
                let currentModuleLocation = currentModule.moduleLocation1;
                let moduleKeyObj = modulesUseEffectData[currentModuleKey];

                let moduleCategory = moduleKeyObj[0].Category;
                let modulePowerGeneration = moduleKeyObj[0].PowerGeneration;
                let modulePowerDemand = moduleKeyObj[0].PowerDemand;
                let SMData = moduleKeyObj.find(module => module.SM === shipSM);
                let baseModuleCost = SMData.cost;
                let moduleCost = currentModule.moduleCost;
                let moduleWorkspaces = SMData.Workspaces;

                switch (moduleCategory) {
                    case 'Armor and Survivability':
                        if (currentModuleKey.includes('Armor')) {
                            let unStreamlineddDR = SMData.USdDR
                            let streamlineddDR = SMData.SdDR

                            switch (shipStreamlinedUn) {
                                case 'streamlined':
                                    if (currentModuleKey === "Armor, Exotic Laminate") {
                                        if (currentModule.hardenedArmor === true) {
                                            moduleCost = currentModule.baseModuleCost * 2;
                                        }
                                        if (currentModule.indestructibleArmor === true) {
                                            moduleCost = baseModuleCost * 10;
                                            streamlineddDR = Infinity;
                                        }
                                        updatedDR(currentModuleLocation, streamlineddDR)
                                    } else {
                                        if (currentModule.hardenedArmor === true) {
                                            moduleCost = baseModuleCost * 2;
                                        }
                                        updatedDR(currentModuleLocation, streamlineddDR)
                                    }
                                    break;
                                case 'unstreamlined':
                                    if (currentModuleKey === "Armor, Exotic Laminate") {
                                        if (currentModule.hardenedArmor === true) {
                                            moduleCost = baseModuleCost * 2;
                                        }
                                        if (currentModule.indestructibleArmor === true) {
                                            moduleCost = baseModuleCost * 10;
                                            streamlineddDR = Infinity;
                                        }
                                        updatedDR(currentModuleLocation, unStreamlineddDR)
                                    } else {
                                        if (currentModule.hardenedArmor === true) {
                                            moduleCost = baseModuleCost * 2;
                                        }
                                        updatedDR(currentModuleLocation, unStreamlineddDR)
                                    }
                                    break;
                                default:
                                    frontdDR = 'System Error'
                                    middDR = 'System Error'
                                    reardDR = 'System Error'
                                    hardenedFrontdDR = 'System Error'
                                    hardenedMiddDR = 'System Error'
                                    hardenedReardDR = 'System Error'
                                    break;
                            }
                            break;
                        }

                        if (currentModuleKey === 'Defensive ECM') {
                            defensiveECMTL = shipTL
                            defensiveECMBonus += 2
                        }

                        if (currentModuleKey.includes('Force Screen')) {
                            let forcedDR = SMData.dDr;
                            moduleCost = baseModuleCost;

                            if (currentModule.mandatorySwitch === false) {
                                if (currentModule.adjustableScreen) {
                                    moduleCost *= 2;
                                }
                                if (currentModule.cloakingScreen) {
                                    moduleCost *= 2;
                                }
                                if (currentModule.energyScreen) {
                                    moduleCost *= 0.5;
                                }
                                if (currentModule.hardenedScreen) {
                                    moduleCost *= 1.5;
                                }
                                if (currentModule.kineticScreen) {
                                    moduleCost *= 0.5;
                                }
                                if (currentModule.opaqueScreen) {
                                    moduleCost *= 1.5;
                                }
                                if (currentModule.realityStabilizedScreen) {
                                    moduleCost *= 2;
                                }
                                if (currentModule.twoWayScreen) {
                                    moduleCost *= 0.6;
                                }
                                if (currentModule.velocityScreen) {
                                    moduleCost *= 0.9;
                                }
                            }
                            if (moduleCost < baseModuleCost * 0.1) {
                                moduleCost = baseModuleCost * 0.1;
                            }
                            if (currentModule.nuclearDamperScreen) {
                                forcedDR = 0;
                            }
                            if (partialScreen) {
                                if (currentModuleLocation === 'front') {
                                    frontdDR += forcedDR * 3;
                                } else if (currentModuleLocation === 'middle') {
                                    middDR += forcedDR * 3;
                                } else if (currentModuleLocation === 'rear') {
                                    reardDR += forcedDR * 3;
                                } else {
                                    console.log('Error: Invalid location for partial screen.');
                                }
                            } else {
                                frontdDR += forcedDR;
                                middDR += forcedDR;
                                reardDR += forcedDR;
                            }
                        }
                        break;

                    case 'Crew':
                        if (currentModuleKey === 'Habitat') {
                            const defaultNumberCabins = SMData.Cabins
                            if (Object.keys(currentModule.customizedCabins).length > 0) {
                                longOccupancy += (currentModule.customizedCabins.cabins ?? 0) * 2;
                                longOccupancy += (currentModule.customizedCabins.luxuryCabins ?? 0) * 2;
                                longOccupancy += (currentModule.customizedCabins.bunkrooms ?? 0) * 4;
                                longOccupancy += (currentModule.customizedCabins.cells ?? 0) * 4;
                                longOccupancy += (currentModule.customizedCabins.hibernationChambers ?? 0) * 1;
                                shortOccupancyCrew += (currentModule.customizedCabins.labs ?? 0) * 2;
                                shortOccupancyCrew += (currentModule.customizedCabins.physicsLabs ?? 0) * 2;
                                shortOccupancyCrew += (currentModule.customizedCabins.superScienceLabs ?? 0) * 2;
                                shortOccupancyCrew += (currentModule.customizedCabins.establishments ?? 0) * 2;
                                shortOccupancyCrew += (currentModule.customizedCabins.offices ?? 0) * 2;
                                shortOccupancyPassengers += (currentModule.customizedCabins.brifingRooms ?? 0) * 10;
                                shortOccupancyPassengers += (currentModule.customizedCabins.establishments ?? 0) * 30;

                                cabins += currentModule.customizedCabins.cabins ?? 0;
                                luxuryCabins += currentModule.customizedCabins.luxuryCabins ?? 0;
                                bunkrooms += currentModule.customizedCabins.bunkrooms ?? 0;
                                cells += currentModule.customizedCabins.cells ?? 0;
                                hibernationChambers += currentModule.customizedCabins.hibernationChambers ?? 0;
                                labs += currentModule.customizedCabins.labs ?? 0;
                                physicsLabs += currentModule.customizedCabins.physicsLabs ?? 0;
                                superScienceLabs += currentModule.customizedCabins.superScienceLabs ?? 0;
                                establishments += currentModule.customizedCabins.establishments ?? 0;
                                offices += currentModule.customizedCabins.offices ?? 0;
                                briefingRooms += currentModule.customizedCabins.briefingRooms ?? 0;
                                fabricators += currentModule.customizedCabins.fabricators ?? 0;
                                roboFacs += currentModule.customizedCabins.roboFacs ?? 0;
                                nanoFacs += currentModule.customizedCabins.nanoFacs ?? 0;
                                replicators += currentModule.customizedCabins.replicators ?? 0;
                                sickbays += currentModule.customizedCabins.sickbays ?? 0;
                                sickbaysAuto += currentModule.customizedCabins.sickbaysAuto ?? 0;
                                teleProjectors += currentModule.customizedCabins.teleProjectors ?? 0;
                                teleProjectorsSend += currentModule.customizedCabins.teleProjectorsSend ?? 0;
                                teleProjectorsReceive += currentModule.customizedCabins.teleProjectorsReceive ?? 0;

                                moduleCost += (currentModule.customizedCabins.sickbaysAuto ?? 0) * 100000
                                moduleCost += (currentModule.customizedCabins.teleProjectors ?? 0) * 20000000
                                moduleCost += (currentModule.customizedCabins.teleProjectorsSend ?? 0) * 10000000
                                moduleCost += (currentModule.customizedCabins.teleProjectorsReceive ?? 0) * 10000000
                                moduleCost += (currentModule.customizedCabins.labs ?? 0) * 1000000
                                moduleCost += (currentModule.customizedCabins.physicsLabs ?? 0) * 10000000
                                moduleCost += (currentModule.customizedCabins.superScienceLabs ?? 0) * 30000000
                            } else {
                                longOccupancy += defaultNumberCabins * 2;
                            }
                        }

                        if (currentModuleKey === 'Open Space') {
                            if (Object.keys(currentModule.customizedAreas).length > 0) {
                                farms += currentModule.customizedAreas.farms ?? 0;
                                gardens += currentModule.customizedAreas.gardens ?? 0;
                                pools += currentModule.customizedAreas.pools ?? 0;
                                theaters += currentModule.customizedAreas.theaters ?? 0;
                                zoos += currentModule.customizedAreas.zoos ?? 0;
                                gyms += currentModule.customizedAreas.gyms ?? 0;
                            } else {
                                farms += SMData.Areas;
                            }
                            areas += SMData.Areas;
                            shortOccupancyPassengers += 100;
                        }

                        if (currentModuleKey === 'Passenger Seating') {
                            seats += SMData.Seats
                            shortOccupancyPassengers += SMData.Seats
                        }
                        break;

                    case 'Engineering':
                        if (currentModuleKey === 'Control Room') {
                            if (currentModule.totalAutomation === true) {
                                controlStations += SMData.ControlStations
                                shortOccupancyCrew += SMData.ControlStations
                            }
                            controlStations = SMData.ControlStations
                            shortOccupancyCrew += SMData.ControlStations
                        }
                        if (currentModuleKey === 'Engine Room') {
                            controlStations += 1
                            shortOccupancyCrew += 1
                        }
                        break;

                    case 'Power':

                        break;

                    case 'Propulsion':
                        if (currentModuleKey === 'Fuel Tank') {
                            fuelLoad += SMData.Fuel
                        }
                        if (currentModuleKey === 'Jump Gate') {
                            jumpGate += SMData.MaxTonnage
                        }
                        if (currentModuleKey === 'Stardrive Engine') {
                            maxFTL += 1
                        }
                        if (currentModuleKey === 'Super Stardrive Engine') {
                            maxFTL += 2
                        }
                        break;

                    case 'Utility':
                        if (currentModuleKey === 'Cargo Hold') {
                            uPressCargo += SMData.LoadUPr
                        }
                        if (currentModuleKey === "Sensor Array, Science"
                            || currentModuleKey === "Sensor Array, Tactical"
                            || currentModuleKey === "Sensor Array, Enhanced"
                            || currentModuleKey === "Sensor Array, Multipurpose") {

                        }
                        if (currentModuleKey === 'Factory, Replicator') {
                            facWeightHour += SMData.lbsHr

                        } else if (currentModuleKey === 'Factory, Nanofactory' || 'Factory, Robofac' || 'Factory, Fabricator') {
                            facValueHour += SMData.$Hr
                        }
                        if (currentModuleKey === 'Hangar Bay') {
                            hangarCapacity += SMData.Capacity
                            launchRate += SMData.LaunchRate
                        }
                        if (currentModuleKey === 'Mining') {
                            miningCapacity += SMData.TonsHrMining
                        }
                        if (currentModuleKey === 'Refinery') {
                            refineryCapacity += SMData.TonsHrRefinery
                        }
                        break;

                    case 'Weapons':
                        function handleWeaponLocationEmpty(mountLocationArray, index) {
                            if (mountLocationArray[index][0] === 0) {
                                mountLocationArray[index][0] = 1
                            } else {
                                mountLocationArray[index].push(1)
                            }
                        }
                        if (currentModuleKey === 'Major Battery') {
                            majorMounts += 1
                            unusedMajorMounts += 1
                            switch (currentModuleLocation) {
                                case 'front':
                                    handleWeaponLocationEmpty(majorMountLocation, 0)
                                    break;
                                case 'middle':
                                    handleWeaponLocationEmpty(majorMountLocation, 1)
                                    break;
                                case 'rear':
                                    handleWeaponLocationEmpty(majorMountLocation, 2)
                                    break;
                                default:
                                    break;
                            }
                        }
                        if (currentModuleKey === 'Medium Battery') {
                            mediumMounts += 1
                            unusedMediumMounts += 3
                            switch (currentModuleLocation) {
                                case 'front':
                                    handleWeaponLocationEmpty(mediumMountLocation, 0)
                                    break;
                                case 'middle':
                                    handleWeaponLocationEmpty(mediumMountLocation, 1)
                                    break;
                                case 'rear':
                                    handleWeaponLocationEmpty(mediumMountLocation, 2)
                                    break;
                                default:
                                    break;
                            }
                        }
                        if (currentModuleKey === 'Secondary Battery') {
                            secondaryMounts += 1
                            unusedSecondaryMounts += 10
                            switch (currentModuleLocation) {
                                case 'front':
                                    handleWeaponLocationEmpty(secondaryMountLocation, 0)
                                    break;
                                case 'middle':
                                    handleWeaponLocationEmpty(secondaryMountLocation, 1)
                                    break;
                                case 'rear':
                                    handleWeaponLocationEmpty(secondaryMountLocation, 2)
                                    break;
                                default:
                                    break;
                            }
                        }
                        if (currentModuleKey === 'Tertiary Battery') {
                            tertiaryMounts += 1
                            unusedTertiaryMounts += 30
                            switch (currentModuleLocation) {
                                case 'front':
                                    handleWeaponLocationEmpty(tertiaryMountLocation, 0)
                                    break;
                                case 'middle':
                                    handleWeaponLocationEmpty(tertiaryMountLocation, 1)
                                    break;
                                case 'rear':
                                    handleWeaponLocationEmpty(tertiaryMountLocation, 2)
                                    break;
                                default:
                                    break;
                            }
                        }
                        if (currentModuleKey === 'Spinal Battery') {
                            if (currentModuleLocation === 'front') {
                                frontSpinal = true;
                            } else if (currentModuleLocation === 'middle') {
                                midSpinal = true;
                            } else if (currentModuleLocation === 'rear') {
                                rearSpinal = true;
                            }
                            spinalMounts = 0;
                            if (frontSpinal && midSpinal && rearSpinal) {
                                spinalMounts = 1
                            } else {
                                if (frontSpinal) spinalMounts += 0.33;
                                if (midSpinal) spinalMounts += 0.33;
                                if (rearSpinal) spinalMounts += 0.33;
                            }
                        }
                        break;

                    case 'Engine, Chemical & HEDM':
                        accel += moduleKeyObj[0].Accel
                        deltaV = deltaVMultiplier(moduleKeyObj[0].mpsTank, tankCount)
                        break;

                    case 'Engine, Electric':
                        accel += moduleKeyObj[0].Accel
                        deltaV = deltaVMultiplier(moduleKeyObj[0].mpsTank, tankCount)
                        break;

                    case 'Engine, Fission':
                        accel += moduleKeyObj[0].Accel
                        deltaV = deltaVMultiplier(moduleKeyObj[0].mpsTank, tankCount)
                        break;

                    case 'Engine, Nuclear Pulse':
                        accel += moduleKeyObj[0].Accel
                        deltaV = deltaVMultiplier(moduleKeyObj[0].mpsTank, tankCount)
                        break;

                    case 'Engine, Fusion':
                        accel += moduleKeyObj[0].Accel
                        deltaV = deltaVMultiplier(moduleKeyObj[0].mpsTank, tankCount)
                        break;
                    case 'Engine, TotalConv. & Antimatter':
                        accel += moduleKeyObj[0].Accel
                        deltaV = deltaVMultiplier(moduleKeyObj[0].mpsTank, tankCount)
                        break;

                    case 'Reactionless Engine':
                        accel += moduleKeyObj[0].Accel
                        deltaV = Infinity
                        singularityDriveCost += moduleCost
                        break;
                    default:
                        break;
                }

                if (currentModule.highAutomation === true) {
                    moduleWorkspaces *= 0.1;
                }
                if (currentModule.totalAutomation === true) {
                    moduleWorkspaces = 0;
                }

                cost += moduleCost;
                workspaces += moduleWorkspaces;
                powerDemand += modulePowerDemand;
                powerGeneration += modulePowerGeneration;
                shortOccupancyCrew += SMData.Workspaces

                // const moduleObject = shipModules[2][0];

                // if (moduleObject && typeof moduleObject === 'object') {
                //     for (const [key, value] of Object.entries(moduleObject)) {
                //         console.log(`${key}: ${value}`);
                //     }
                //     console.log('*****************************************');
                // } else {
                //     console.log('No valid object found at the specified coordinates.');
                // }

                setFrontdDR(frontdDR)
                setBaseFrontdDR(frontdDR)
                setMiddDR(middDR)
                setBaseMiddDR(middDR)
                setReardDR(reardDR)
                setBaseReardDR(reardDR)
                setShipDefensiveECMBonus(defensiveECMBonus)
                setShipDefensiveECMTL(defensiveECMTL)
                setTotalModulesCost(cost)
                setWorkspaces(workspaces)
                setBaseWorkspaces(workspaces)
                setCabinsCapacity(cabinsCapacity)
                setLongOccupancy(longOccupancy)
                setShortOccupancy(shortOccupancyCrew + shortOccupancyPassengers)
                setShortOccupancyCrew(shortOccupancyCrew)
                setShortOccupancyPassengers(shortOccupancyPassengers)
                setShipCabins(cabinsCapacity)
                setShipAreas(areas)
                setShipSeats(seats)
                setPowerDemand(powerDemand)
                setPowerGen(powerGeneration)
                setControlStations(controlStations)
                setFuelLoad(fuelLoad)
                setJumpGateMax(jumpGate)
                setMaxFTL(maxFTL)
                setUPressCargo(uPressCargo)
                setUPressCargoCapacity(uPressCargo)
                setFacValueHour(facValueHour)
                setFacWeightHour(facWeightHour)
                setShipLaunchRate(launchRate)
                setShipHangarCapacity(hangarCapacity)
                setMiningCapacity(miningCapacity)
                setRefineryCapacity(refineryCapacity)
                setSpinalMounts(spinalMounts)
                setUnusedSpinalMounts(spinalMounts)
                setMajorMounts(majorMounts)
                setMediumMounts(mediumMounts)
                setSecondaryMounts(secondaryMounts)
                setTertiaryMounts(tertiaryMounts)
                setAccel(accel)
                setDeltaV(deltaV)
            }
        }
    }, []);

    useEffect(() => {
        updateShipModules(shipModules, shipData, shipSM, shipStreamlinedUn, shipTL, shipReardDR, superScienceChecked)
        updateShipValues(shipModules, shipStreamlinedUn, shipTL, shipSM)
    }, [updateShipModules, updateShipValues, shipModules, shipSM, shipStreamlinedUn, shipTL, shipReardDR, superScienceChecked])

    // This useEffect resets the selected modules array state variable when one of the dependencies change.
    // useEffect(() => {
    //     setModules([[{}, {}, {}, {}, {}, {}, {}], [{}, {}, {}, {}, {}, {}, {}], [{}, {}, {}, {}, {}, {}, {}]]);
    // }, [shipSM, shipTL, superScienceChecked, shipStreamlinedUn])

    // These four functions handle changes to the currentStatComponent state variable to display the correct component.
    const handleBasicStatsClick = () => {
        setStatCurrentComponent('shipClassStatBlock');
    }
    const handleHabitatPowerClick = () => {
        setStatCurrentComponent('shipHabitatPowerStats');
    }
    const handleCustomizationClick = () => {
        setStatCurrentComponent('shipCustomization');
    }
    const handleShipDesignClick = () => {
        setStatCurrentComponent('shipDesign');
    }

    // This function displays the stat panel.
    function statsDisplay() {
        return (
            <div className={isExpanded ? styles.statBlockContainerExpanded : styles.statBlockContainerCollapsed}>
                <h2 className={isExpanded ? styles.statTitleExpanded : styles.statTitleCollapsed}>Basic Stat Block</h2>
                <span className={styles.statBlockLable}>Class Name:</span>
                <span className={styles.statBlockAreaLarge}>{shipClassName}</span>
                <span className={styles.statBlockLable}>Classification:</span>
                <span className={styles.statBlockAreaLarge}>{shipClassClassification}</span>
                <span className={styles.statBlockLable}>Designer:</span>
                <span className={styles.statBlockAreaLarge}>{shipClassDesigner}</span>
                <span className={styles.statBlockLable}>Manufacturer:</span>
                <span className={styles.statBlockAreaLarge}>{shipClassManufacturer}</span>
                <span className={styles.statBlockLable}>Cost:</span>
                <span className={styles.statBlockAreaLarge}>${shipDisplayCost}</span>
                <span className={`${styles.statBlockLable} ${styles.infoTitle}`} title="Manage steerage cargo in the habitat 
            and power stats tab, manage shielded and refrigerated cargo in the bottom center of the 
            screen.">Total Cargo Capacity:</span>
                <span className={styles.statBlockAreaLarge}>{shipTotalCargoAllTypes} tons</span>
                <span className={styles.statBlockLable}>TL:</span>
                <span className={isExpanded ? styles.statBlockArea : styles.statBlockAreaLarge}>{shipTL}</span>
                <span className={styles.statBlockLable}>SM:</span>
                <span className={isExpanded ? styles.statBlockArea : styles.statBlockAreaLarge}>{shipSM}</span>
                <span className={`${styles.statBlockLable} ${styles.infoTitle}`} title="This 
            includes any active or powered measures such as force screens.">dDR:</span>
                <span className={isExpanded ? styles.statBlockArea : styles.statBlockAreaLarge}>{shipDisplaydDR}</span>
                <span className={`${styles.statBlockLable} ${styles.infoTitle}`} title="In this 
            early version of the website only one engine type may be selected.">Move:</span>
                <span className={isExpanded ? styles.statBlockArea : styles.statBlockAreaLarge}>{shipMove}</span>
                <span className={styles.statBlockLable}>Max Power Gen.:</span>
                <span className={isExpanded ? styles.statBlockArea : styles.statBlockAreaLarge}>{shipPowerGen}</span>
                <span className={styles.statBlockLable}>Fuel Load:</span>
                <span className={isExpanded ? styles.statBlockArea : styles.statBlockAreaLarge}>{shipFuelLoad}</span>
                <span className={styles.statBlockLable}>Max Power Demand:</span>
                <span className={isExpanded ? styles.statBlockArea : styles.statBlockAreaLarge}>{shipPowerDemand}</span>
                <span className={`${styles.statBlockLable} ${styles.infoTitle}`} title="Manage 
            cabin and open area allocation to bunkrooms, cells, etc. in the Habitat and Power Stats tab.">Cabins:</span>
                <span className={isExpanded ? styles.statBlockArea : styles.statBlockAreaLarge}>{shipCabins}</span>
                <span className={styles.statBlockLable}>HT:</span>
                <span className={isExpanded ? styles.statBlockArea : styles.statBlockAreaLarge}>{shipHT}</span>
                <span className={`${styles.statBlockLable} ${styles.infoTitle}`} title="If there 
            are no habitats this will display short term occupancy, otherwise it will display long term occupancy.">Occupancy:</span>
                <span className={isExpanded ? styles.statBlockArea : styles.statBlockAreaLarge}>{shipOccupancy}</span>
                <span className={styles.statBlockLable}>dST/HP:</span>
                <span className={isExpanded ? styles.statBlockArea : styles.statBlockAreaLarge}>{shipdSTHP.toLocaleString()}</span>
                <span className={styles.statBlockLable}>Workspaces:</span>
                <span className={isExpanded ? styles.statBlockArea : styles.statBlockAreaLarge}>{shipWorkspaces}</span>
                <span className={styles.statBlockLable}>Un/Streamlined:</span>
                <span className={isExpanded ? styles.statBlockArea : styles.statBlockAreaLarge}>{shipStreamlinedUnDisplay}</span>
                <span className={`${styles.statBlockLable} ${styles.infoTitle}`} title="This only applies if the missile or attacking ship is the same TL or lower.">ECM Bonus:</span>
                <span className={isExpanded ? styles.statBlockArea : styles.statBlockAreaLarge}>{shipDefensiveECMBonus}</span>
                <span className={styles.statBlockLable}>Hnd/SR:</span>
                <span className={isExpanded ? styles.statBlockArea : styles.statBlockAreaLarge}>{shipDisplayHndSR}</span>
                <span className={`${styles.statBlockLable} ${styles.infoTitleWarning}`} title="One spinal battery module must be selected in all 3 sections.  The middle module must be [Core], the others cannot be [Core].">Spinal Mounts:</span>
                <span className={isExpanded ? styles.statBlockArea : styles.statBlockAreaLarge}>{shipSpinalMounts}</span>
                <span className={styles.statBlockLable}>Complexity:</span>
                <span className={isExpanded ? styles.statBlockArea : styles.statBlockAreaLarge}>{shipComplexity}</span>
                <span className={`${styles.statBlockLable} ${styles.infoTitle}`} title="Select weapons for your mounts in the Weapon Stats tab.">Major Mounts:</span>
                <span className={isExpanded ? styles.statBlockArea : styles.statBlockAreaLarge}>{shipMajorMounts}</span>
                <span className={styles.statBlockLable}>Weight:</span>
                <span className={isExpanded ? styles.statBlockArea : styles.statBlockAreaLarge}>{shipMass.toLocaleString()}</span>
                <span className={`${styles.statBlockLable} ${styles.infoTitle}`} title="Select weapons for your mounts in the Weapon Stats tab.">Medium Mounts:</span>
                <span className={isExpanded ? styles.statBlockArea : styles.statBlockAreaLarge}>{shipMediumMounts}</span>
                <span className={styles.statBlockLable}>Length:</span>
                <span className={isExpanded ? styles.statBlockArea : styles.statBlockAreaLarge}>{shipLength.toLocaleString()}</span>
                <span className={`${styles.statBlockLable} ${styles.infoTitle}`} title="Select weapons for your mounts in the Weapon Stats tab.">Secondary Mounts:</span>
                <span className={isExpanded ? styles.statBlockArea : styles.statBlockAreaLarge}>{shipSecondaryMounts}</span>
                <span className={`${styles.statBlockLable} ${styles.infoTitle}`} title="Capacity is measured in tons, for example if capacity is 1 the hangar can only hold 1 ton of cargo or vehicles.">Hangar Capacity:</span>
                <span className={isExpanded ? styles.statBlockArea : styles.statBlockAreaLarge}>{shipHangarCapacity}</span>
                <span className={`${styles.statBlockLable} ${styles.infoTitle}`} title="Select weapons for your mounts in the Weapon Stats tab.">Tertiary Mounts:</span>
                <span className={isExpanded ? styles.statBlockArea : styles.statBlockAreaLarge}>{shipTertiaryMounts}</span>
                <span className={`${styles.statBlockLable} ${styles.infoTitle}`} title="Capacity is measured in tons per minute, for example if capacity is 1,000 it would take 3 minutes to launch a 3,000 ton ship.">Launch Rate:</span>
                <span className={isExpanded ? styles.statBlockArea : styles.statBlockAreaLarge}>{shipLaunchRate.toLocaleString()}</span>
            </div>
        )
    }

    // Modules and Overall Ship Stats - END
    // ****************************************************************************************************************************************************
    // ****************************************************************************************************************************************************

    // ****************************************************************************************************************************************************
    // ****************************************************************************************************************************************************
    // Extra Stats - START

    // This useEffect handles changes to the cost state variables to update the total cost.
    useEffect(() => {
        let totalCost = 0
        totalCost = shipTotalModulesCost + shipHabitatPowerCost + shipWeaponsCost + shipDesignCost
        setDisplayCost(totalCost.toLocaleString())
        setTotalCost(totalCost)
    }, [shipTotalModulesCost, shipHabitatPowerCost, shipWeaponsCost, shipDesignCost])

    // This useEffect updates the shipTotalCargoAllTypes state variable when the shipPressCargo, shipUPressCargo, 
    //shipShieldedCargo, shipRefrigeratedCargo, or shipSteerageCargo state variables change.
    useEffect(() => {
        let totalCargo = shipPressCargo + shipUPressCargo + shipShieldedCargo + shipRefrigeratedCargo + shipSteerageCargo + shipWeaponMountCargo
        setTotalCargoAllTypes(totalCargo)
    }, [shipPressCargo, shipUPressCargo, shipShieldedCargo, shipRefrigeratedCargo, shipSteerageCargo, shipWeaponMountCargo])

    // useEffect updates the shipPowerPlants array when the ship modules or TL change.
    useEffect(() => {
        let newPowerPlants = [];
        let effectShipModules = shipModules;
        effectShipModules.forEach(module => {

            if (module.moduleCategory === 'Power') {
                let existingModule = shipPowerPlants.find(powerModule =>
                    powerModule.moduleLocation1 === module.moduleLocation1
                    && powerModule.moduleNumber === module.moduleNumber
                    && powerModule.powerPlantKey === module.moduleKey)

                if (existingModule) {
                    newPowerPlants.push(existingModule);
                } else {
                    let moduleKeyObj = shipData[module.moduleKey];
                    let powerGeneration = shipData[module.moduleKey][0].PowerGeneration;
                    let SMData = moduleKeyObj.find(module => module.SM === shipSM);
                    let moduleCost = SMData.cost;
                    let reactorLifeYears = 0;
                    let reactorLifeHours = 0;

                    if (module.moduleKey === 'Chemical, Fuel Cell' || module.moduleKey === 'Chemical, MHD Turbine') {
                        reactorLifeHours = defaultReactorLife(module.moduleKey, shipTL);
                    } else {
                        reactorLifeYears = defaultReactorLife(module.moduleKey, shipTL);
                    }

                    let newPowerPlantModule = {
                        powerPlantKey: module.moduleKey,
                        moduleLocation1: module.moduleLocation1,
                        moduleNumber: module.moduleNumber,
                        maxPowerGeneration: powerGeneration,
                        powerGeneration: powerGeneration,
                        defaultReactorLifeYears: reactorLifeYears,
                        reactorLifeYears: reactorLifeYears,
                        defaultReactorLifeHours: reactorLifeHours,
                        reactorLifeHours: reactorLifeHours,
                        deRated: 0,
                        defaultCost: moduleCost,
                        finalCost: moduleCost
                    }
                    newPowerPlants.push(newPowerPlantModule);
                }
            }
        });
        setShipPowerPlants(newPowerPlants);
    }, [shipModules, shipTL]);

    // This useEffect triggers when shipPowerPlants changes and updated the shipPowerGen state variable.
    // This is only really needed if upRate and deRate are used.
    useEffect(() => {
        let newPowerGen = 0;
        const effectShipPowerPlants = shipPowerPlants
        effectShipPowerPlants.forEach(module => {
            newPowerGen += module.powerGeneration
        })
        setPowerGen(newPowerGen)
    }, [shipPowerPlants])

    // This function takes the cost changes made in the habitat and power tab and updates the total cost.
    function habitatPowerUpdateTotalCost(defaultCost, finalCost) {
        let updatedCost = finalCost - defaultCost
        setHabitatPowerCost(updatedCost)
    }

    // This function take a cost argument and adds it to the shipHabitatPowerCost state variable.
    function habitatPowerAddCost(cost) {
        let updatedCost = shipHabitatPowerCost + cost;
        setHabitatPowerCost(updatedCost)
    }

    // This function sets shipCabinsCapacity, and shipLongOccupancy when the total life support checkbox is changed.
    // It also resets all habitat state variables because the cabins and cabins capacity are fundamental variables the habitat 
    // variables depend on.
    function handleTotalLifeSupportChange(event) {
        const totalLifeSupportBoolean = event.target.checked
        if (totalLifeSupportBoolean === true) {
            setShipCabins(shipCabinsCapacity / 2)
            setLongOccupancy((shipCabinsCapacity / 2) * 2)
        } else if (totalLifeSupportBoolean === false) {
            setShipCabins(shipCabinsCapacity)
            setLongOccupancy(shipCabinsCapacity * 2)
        }
        setTotalLifeSupport(totalLifeSupportBoolean)
        setBunkrooms(0)
        setCells(0)
        setLuxuryCabins(0)
        setBriefingRooms(0)
        setEstablishments(0)
        setHibernationChambers(0)
        setLabs(0)
        setPhysicsLabs(0)
        setSuperScienceLabs(0)
        setMiniFabricators(0)
        setMiniNanoFacs(0)
        setMiniRoboFacs(0)
        setMiniReplicators(0)
        setOffices(0)
        setSickBays(0)
        setTeleportProjectors(0)
        setSteerageCargo(0)
    }

    // This useEffect updates the shipOccupancy state variable when the shipShortOccupancyCrew, shipShortOccupancyPassengers, 
    // or shipLongOccupancy state variables change.
    useEffect(() => {
        let shortOccupancy = shipShortOccupancyCrew + shipShortOccupancyPassengers
        if (shipLongOccupancy === 0) {
            setShipOccupancy(shortOccupancy)
        } else if (shipLongOccupancy > 0) {
            setShipOccupancy(shipLongOccupancy)
        }

        setShortOccupancy(shortOccupancy)
    }, [shipShortOccupancyCrew, shipShortOccupancyPassengers, shipLongOccupancy])

    // This useEffect resets the ship cargo, habitat, and selected weapon state variables when the shipModules state variable changes.
    useEffect(() => {
        setRefrigeratedCargo(0)
        setShieldedCargo(0)
        setPressCargo(0)
        setWeaponSubType('')
        setSelectedWeaponType('')
        setSelectedMountType('')
        setSelectedUninstalledCargo(0)
        setWeaponList([])
        resetWeaponStats()
        setTotalLifeSupport(false)
        setBunkrooms(0)
        setCells(0)
        setLuxuryCabins(0)
        setBriefingRooms(0)
        setEstablishments(0)
        setHibernationChambers(0)
        setLabs(0)
        setPhysicsLabs(0)
        setSuperScienceLabs(0)
        setMiniFabricators(0)
        setMiniNanoFacs(0)
        setMiniRoboFacs(0)
        setMiniReplicators(0)
        setOffices(0)
        setSickBays(0)
        setTeleportProjectors(0)
        setSteerageCargo(0)
    }, [shipModules])

    // This useEffect updates the shipUPressCargoCapacity, shipRefrigeratedCargo, and shipShieldedCargo state variables when the user 
    // changes them.
    function cargoIncrementDecrement(cargoType, value) {
        let newPressCargo = shipPressCargo
        let newCost = 0
        let newUPressCargo = shipUPressCargo
        let newShieldedCargo = shipShieldedCargo
        let newRefrigeratedCargo = shipRefrigeratedCargo

        switch (cargoType) {
            case 'Refrigerated':
                newCost = value * 500
                newRefrigeratedCargo += value
                newPressCargo += value
                newUPressCargo = shipUPressCargo - value
                if (newRefrigeratedCargo >= 0 && newUPressCargo >= 0) {
                    setRefrigeratedCargo(newRefrigeratedCargo)
                    setUPressCargo(newUPressCargo)
                    habitatPowerAddCost(newCost)
                    setPressCargo(newPressCargo)
                }
                break;
            case 'Shielded':
                newCost = value * 4000
                newShieldedCargo += value
                newPressCargo += value
                newUPressCargo = shipUPressCargo - (value * 2)
                if (newShieldedCargo >= 0 && newUPressCargo >= 0) { // (value <= newUPressCargo || value === 0)
                    setShieldedCargo(newShieldedCargo)
                    setUPressCargo(newUPressCargo)
                    habitatPowerAddCost(newCost)
                    setPressCargo(newPressCargo)
                }
                break;

            default:
                console.log('Error in cargoIncrementDecrement function.')
                break;
        }
    }

    // These functions increment or decrement the provided state variable arguments, and update cost and cabins variables.
    function habitatIncrementDecrement(habitatType, value) {
        let newCost = 0
        let newCabins = 0
        let newLongOccupancy = 0
        let newShortOccupancy = shipShortOccupancy
        let newCrewOccupancy = shipShortOccupancyCrew
        let newPassOccupancy = shipShortOccupancyPassengers
        let newBunkrooms = shipBunkrooms
        let newCells = shipCells
        let newLuxury = shipLuxuryCabins
        let newBriefing = shipBriefingRooms
        let newEstablishments = shipEstablishments
        let newHibernation = shipHibernationChambers
        let newLabs = shipLabs
        let newPhysicsLabs = shipPhysicsLabs
        let newSuperScienceLabs = shipSuperScienceLabs
        let newMiniFabs = shipMiniFabricators
        let newMiniRoboFabs = shipMiniRoboFacs
        let newMiniNanoFabs = shipMiniNanoFacs
        let newMiniReplicators = shipMiniReplicators
        let newOffices = shipOffices
        let newSickbays = shipSickBays
        let newSickbaysAuto = shipSickBaysAuto
        let newTeleport = shipTeleportProjectors
        let newTeleportSend = shipTeleportProjectorsSend
        let newTeleportReceive = shipTeleportProjectorsReceive
        let newSteerage = shipSteerageCargo
        let newPressCargo = shipPressCargo
        let newFacValueHour = shipFacValueHour
        let newFacWeightHour = shipFacWeightHour

        switch (habitatType) {
            case 'Bunkrooms':
                newBunkrooms += value;
                newCabins = shipCabins - value;
                newLongOccupancy = (newCabins * 2) + (newLuxury * 2) + (newBunkrooms * 4) + (newCells * 4)
                if (newBunkrooms >= 0 && value <= shipCabins) {
                    setBunkrooms(newBunkrooms);
                    setShipCabins(newCabins);
                    setLongOccupancy(newLongOccupancy);
                }
                break;
            case 'Cells':
                newCells += value;
                newCabins = shipCabins - value;
                newLongOccupancy = (newCabins * 2) + (newLuxury * 2) + (newBunkrooms * 4) + (newCells * 4)
                if (newCells >= 0 && value <= shipCabins) {
                    setCells(newCells);
                    setShipCabins(newCabins);
                    setLongOccupancy(newLongOccupancy);
                }
                break;
            case 'Luxury':
                newLuxury += value;
                newCabins = shipCabins - (value * 2);
                newLongOccupancy = (newCabins * 2) + (newLuxury * 2) + (newBunkrooms * 4) + (newCells * 4)
                if (newLuxury >= 0 && (value * 2) <= shipCabins) {
                    setLuxuryCabins(newLuxury);
                    setShipCabins(newCabins);
                    setLongOccupancy(newLongOccupancy);
                }
                break;

            case 'Briefing':
                newBriefing += value;
                newCabins = shipCabins - value;
                newLongOccupancy = (newCabins * 2) + (newLuxury * 2) + (newBunkrooms * 4) + (newCells * 4)
                newPassOccupancy = (newBriefing * 10) + (newEstablishments * 30) + newSickbays + newSickbaysAuto
                if (newBriefing >= 0 && value <= shipCabins) {
                    setBriefingRooms(newBriefing);
                    setShipCabins(newCabins);
                    setLongOccupancy(newLongOccupancy);
                    setShortOccupancyPassengers(newPassOccupancy);
                }
                break;

            case 'Establishment':
                newEstablishments += value;
                newCabins = shipCabins - (value * 2);
                newLongOccupancy = (newCabins * 2) + (newLuxury * 2) + (newBunkrooms * 4) + (newCells * 4)
                newPassOccupancy = (newBriefing * 10) + (newEstablishments * 30) + newSickbays + newSickbaysAuto
                newCrewOccupancy = (newLabs * 2) + (newPhysicsLabs * 2) + (newSuperScienceLabs * 2) + (newEstablishments * 2) + (newOffices * 2)
                if (newEstablishments >= 0 && value <= shipCabins) {
                    setEstablishments(newEstablishments);
                    setShipCabins(newCabins);
                    setLongOccupancy(newLongOccupancy);
                    setShortOccupancyCrew(newCrewOccupancy);
                    setShortOccupancyPassengers(newPassOccupancy);
                }
                break;

            case 'Hibernation':
                newHibernation += value;
                newCabins = shipCabins - (value * 0.25);
                newLongOccupancy = (newCabins * 2) + (newLuxury * 2) + (newBunkrooms * 4) + (newCells * 4)
                if (newHibernation >= 0 && value <= shipCabins) {
                    setHibernationChambers(newHibernation);
                    setShipCabins(newCabins);
                    setLongOccupancy(newLongOccupancy);
                }
                break;

            case 'Labs':
                newCost = value * 1000000
                newLabs += value;
                newCabins = shipCabins - (value * 2);
                newLongOccupancy = (newCabins * 2) + (newLuxury * 2) + (newBunkrooms * 4) + (newCells * 4)
                newCrewOccupancy = (newLabs * 2) + (newPhysicsLabs * 2) + (newSuperScienceLabs * 2) + (newEstablishments * 2) + (newOffices * 2)
                if (newLabs >= 0 && value <= shipCabins) {
                    setLabs(newLabs);
                    setShipCabins(newCabins);
                    setLongOccupancy(newLongOccupancy);
                    setShortOccupancyCrew(newCrewOccupancy);
                    habitatPowerAddCost(newCost)
                }
                break;

            case 'Physics Labs':
                newPhysicsLabs += value;
                newCost = value * 10000000
                newCabins = shipCabins - (value * 2);
                newLongOccupancy = (newCabins * 2) + (newLuxury * 2) + (newBunkrooms * 4) + (newCells * 4)
                newCrewOccupancy = (newLabs * 2) + (newPhysicsLabs * 2) + (newSuperScienceLabs * 2) + (newEstablishments * 2) + (newOffices * 2)
                if (newPhysicsLabs >= 0 && value <= shipCabins) {
                    setPhysicsLabs(newPhysicsLabs);
                    setShipCabins(newCabins);
                    setLongOccupancy(newLongOccupancy);
                    setShortOccupancyCrew(newCrewOccupancy);
                    habitatPowerAddCost(newCost)
                }
                break;

            case 'SuperScience Labs':
                newSuperScienceLabs += value;
                newCost = value * 30000000
                newCabins = shipCabins - (value * 2);
                newLongOccupancy = (newCabins * 2) + (newLuxury * 2) + (newBunkrooms * 4) + (newCells * 4)
                newCrewOccupancy = (newLabs * 2) + (newPhysicsLabs * 2) + (newSuperScienceLabs * 2) + (newEstablishments * 2) + (newOffices * 2)
                if (newSuperScienceLabs >= 0 && value <= shipCabins) {
                    setSuperScienceLabs(newSuperScienceLabs);
                    setShipCabins(newCabins);
                    setLongOccupancy(newLongOccupancy);
                    setShortOccupancyCrew(newCrewOccupancy);
                    habitatPowerAddCost(newCost);
                }
                break;

            case 'Mini Fab':
                newFacValueHour += value * 500
                newMiniFabs += value;
                newCabins = shipCabins - value;
                newLongOccupancy = (newCabins * 2) + (newLuxury * 2) + (newBunkrooms * 4) + (newCells * 4)
                if (newMiniFabs >= 0 && value <= shipCabins) {
                    setMiniFabricators(newMiniFabs);
                    setShipCabins(newCabins);
                    setLongOccupancy(newLongOccupancy);
                    setFacValueHour(newFacValueHour);
                }
                break;


            case 'Mini Robo Fab':
                newFacValueHour += value * 1000
                newMiniRoboFabs += value;
                newCabins = shipCabins - value;
                newLongOccupancy = (newCabins * 2) + (newLuxury * 2) + (newBunkrooms * 4) + (newCells * 4)
                if (newMiniRoboFabs >= 0 && value <= shipCabins) {
                    setMiniRoboFacs(newMiniRoboFabs);
                    setShipCabins(newCabins);
                    setLongOccupancy(newLongOccupancy);
                    setFacValueHour(newFacValueHour);
                }
                break;

            case 'Mini Nano Fab':
                newFacValueHour += value * 10000
                newMiniNanoFabs += value;
                newCabins = shipCabins - value;
                newLongOccupancy = (newCabins * 2) + (newLuxury * 2) + (newBunkrooms * 4) + (newCells * 4)
                if (newMiniNanoFabs >= 0 && value <= shipCabins) {
                    setMiniNanoFacs(newMiniNanoFabs);
                    setShipCabins(newCabins);
                    setLongOccupancy(newLongOccupancy);
                    setFacValueHour(newFacValueHour);
                }
                break;

            // const [shipFacValueHour, setFacValueHour] = useState(0);
            // const [shipFacWeightHour, setFacWeightHour] = useState(0);
            // newFacValueHour newFacWeightHour
            case 'Mini Rep Fab':
                newFacWeightHour += value * 0.05
                newMiniReplicators += value;
                newCabins = shipCabins - value;
                newLongOccupancy = (newCabins * 2) + (newLuxury * 2) + (newBunkrooms * 4) + (newCells * 4)
                if (newMiniReplicators >= 0 && value <= shipCabins) {
                    setMiniReplicators(newMiniReplicators);
                    setShipCabins(newCabins);
                    setLongOccupancy(newLongOccupancy);
                    setFacWeightHour(newFacWeightHour);
                }
                break;

            case 'Office':
                newOffices += value;
                newCabins = shipCabins - value;
                newLongOccupancy = (newCabins * 2) + (newLuxury * 2) + (newBunkrooms * 4) + (newCells * 4)
                newCrewOccupancy = (newLabs * 2) + (newPhysicsLabs * 2) + (newSuperScienceLabs * 2) + (newEstablishments * 2) + (newOffices * 2)
                if (newOffices >= 0 && value <= shipCabins) {
                    setOffices(newOffices);
                    setShipCabins(newCabins);
                    setLongOccupancy(newLongOccupancy);
                    setShortOccupancyCrew(newCrewOccupancy);
                }
                break;

            case 'Sickbay':
                newSickbays += value;
                newCabins = shipCabins - value;
                newLongOccupancy = (newCabins * 2) + (newLuxury * 2) + (newBunkrooms * 4) + (newCells * 4)
                newPassOccupancy = (newBriefing * 10) + (newEstablishments * 30) + newSickbays + newSickbaysAuto
                if (newSickbays >= 0 && value <= shipCabins) {
                    setSickBays(newSickbays);
                    setShipCabins(newCabins);
                    setLongOccupancy(newLongOccupancy);
                    setShortOccupancyPassengers(newPassOccupancy);
                }
                break;

            case 'SickbayAuto':
                newCost = value * 1000000
                newSickbaysAuto += value;
                newCabins = shipCabins - value;
                newLongOccupancy = (newCabins * 2) + (newLuxury * 2) + (newBunkrooms * 4) + (newCells * 4)
                newPassOccupancy = (newBriefing * 10) + (newEstablishments * 30) + newSickbays + newSickbaysAuto
                if (newSickbaysAuto >= 0 && value <= shipCabins) {
                    setSickBaysAuto(newSickbaysAuto);
                    setShipCabins(newCabins);
                    setLongOccupancy(newLongOccupancy);
                    setShortOccupancyPassengers(newPassOccupancy);
                    habitatPowerAddCost(newCost)
                }
                break;

            case 'Teleport':
                newTeleport += value;
                newCabins = shipCabins - value;
                newCost = value * 20000000
                newLongOccupancy = (newCabins * 2) + (newLuxury * 2) + (newBunkrooms * 4) + (newCells * 4)
                if (newTeleport >= 0 && value <= shipCabins) {
                    setTeleportProjectors(newTeleport);
                    setShipCabins(newCabins);
                    setLongOccupancy(newLongOccupancy);
                    habitatPowerAddCost(newCost)
                }
                break;

            case 'Teleport Send':
                newTeleportSend += value;
                newCabins = shipCabins - value;
                newCost = value * 10000000
                newLongOccupancy = (newCabins * 2) + (newLuxury * 2) + (newBunkrooms * 4) + (newCells * 4)
                if (newTeleportSend >= 0 && value <= shipCabins) {
                    setTeleportProjectorsSend(newTeleportSend);
                    setShipCabins(newCabins);
                    setLongOccupancy(newLongOccupancy);
                    habitatPowerAddCost(newCost)
                }
                break;

            case 'Teleport Receive':
                newTeleportReceive += value;
                newCabins = shipCabins - value;
                newCost = value * 10000000
                newLongOccupancy = (newCabins * 2) + (newLuxury * 2) + (newBunkrooms * 4) + (newCells * 4)
                if (newTeleportReceive >= 0 && value <= shipCabins) {
                    setTeleportProjectorsReceive(newTeleportReceive);
                    setShipCabins(newCabins);
                    setLongOccupancy(newLongOccupancy);
                    habitatPowerAddCost(newCost)
                }
                break;

            case 'Steerage':
                newPressCargo = shipPressCargo + (value * 5);
                newSteerage += value * 5;
                newCabins = shipCabins - value;
                newLongOccupancy = (newCabins * 2) + (newLuxury * 2) + (newBunkrooms * 4) + (newCells * 4)
                if (newSteerage >= 0 && value <= shipCabins) {
                    setSteerageCargo(newSteerage);
                    setShipCabins(newCabins);
                    setLongOccupancy(newLongOccupancy);
                    setPressCargo(newPressCargo);
                }
                break;

            default: //   
                break;
        }
    }

    // This function displays habitat information.
    function habitatsDisplay() {
        return (
            <div className={styles.habitatStatsSubContainer}>
                <h2 className={styles.habitatStatTitle}>Habitat Stat Block</h2>
                <span className={styles.habitatStatsLabel}>
                    Workspaces:
                </span>
                <span className={styles.habitatStatsValue}>
                    {shipWorkspaces.toLocaleString()}
                </span>
                <span className={styles.habitatStatsLabel}>
                    Long Term Occupancy:
                </span>
                <span className={styles.habitatStatsValue}>
                    {shipLongOccupancy.toLocaleString()}
                </span>
                <span className={styles.habitatStatsLabel}>
                    Short Term Occupancy:
                </span>
                <span className={styles.habitatStatsValue}>
                    {shipShortOccupancy.toLocaleString()}
                </span>
                <span className={styles.habitatStatsLabel}>
                    Cabins Capacity:
                </span>
                <span className={styles.habitatStatsValue}>
                    {shipCabinsCapacity.toLocaleString()}
                </span>
                <span className={styles.habitatStatsLabel}>
                    Short Occ. (Crew):
                </span>
                <span className={styles.habitatStatsValue}>
                    {shipShortOccupancyCrew.toLocaleString()}
                </span>
                <span className={styles.habitatStatsLabel}>
                    Short Occ. (Pax.):
                </span>
                <span className={styles.habitatStatsValue}>
                    {shipShortOccupancyPassengers.toLocaleString()}
                </span>
                {shipCabins > 0 && <span className={styles.habitatStatsLabel}>
                    Cabins:
                </span>}
                {shipCabins > 0 && <span className={styles.habitatStatsValue}>
                    {shipCabins.toLocaleString()}
                </span>}
                {shipSeats > 0 && <span className={styles.habitatStatsLabel}>
                    Ship Seats:
                </span>}
                {shipSeats > 0 && <span className={styles.habitatStatsValue}>
                    {shipSeats.toLocaleString()}
                </span>}
                {shipAreas > 0 && <span className={styles.habitatStatsLabel}>
                    Areas:
                </span>}
                {shipAreas > 0 && <span className={styles.habitatStatsValue}>
                    {shipAreas.toLocaleString()}
                </span>}
                {shipHibernationChambers > 0 && <span className={styles.habitatStatsLabel}>
                    Hibernation Chambers:
                </span>}
                {shipHibernationChambers > 0 && <span className={styles.habitatStatsValue}>
                    {shipHibernationChambers.toLocaleString()}
                </span>}
                {shipLuxuryCabins > 0 && <span className={styles.habitatStatsLabel}>
                    Luxury Cabins:
                </span>}
                {shipLuxuryCabins > 0 && <span className={styles.habitatStatsValue}>
                    {shipLuxuryCabins.toLocaleString()}
                </span>}
                {shipOffices > 0 && <span className={styles.habitatStatsLabel}>
                    Offices:
                </span>}
                {shipOffices > 0 && <span className={styles.habitatStatsValue}>
                    {shipOffices.toLocaleString()}
                </span>}
                {shipEstablishments > 0 && <span className={styles.habitatStatsLabel}>
                    Establish- ments:
                </span>}
                {shipEstablishments > 0 && <span className={styles.habitatStatsValue}>
                    {shipEstablishments.toLocaleString()}
                </span>}
                {shipCells > 0 && <span className={styles.habitatStatsLabel}>
                    Cells:
                </span>}
                {shipCells > 0 && <span className={styles.habitatStatsValue}>
                    {shipCells.toLocaleString()}
                </span>}
                {shipBriefingRooms > 0 && <span className={styles.habitatStatsLabel}>
                    Briefing Rooms:
                </span>}
                {shipBriefingRooms > 0 && <span className={styles.habitatStatsValue}>
                    {shipBriefingRooms.toLocaleString()}
                </span>}
                {shipLabs > 0 && <span className={styles.habitatStatsLabel}>
                    Labs:
                </span>}
                {shipLabs > 0 && <span className={styles.habitatStatsValue}>
                    {shipLabs.toLocaleString()}
                </span>}
                {shipPhysicsLabs > 0 && <span className={styles.habitatStatsLabel}>
                    Physics Labs:
                </span>}
                {shipPhysicsLabs > 0 && <span className={styles.habitatStatsValue}>
                    {shipPhysicsLabs.toLocaleString()}
                </span>}
                {shipSuperScienceLabs > 0 && <span className={styles.habitatStatsLabel}>
                    Super Science Labs:
                </span>}
                {shipSuperScienceLabs > 0 && <span className={styles.habitatStatsValue}>
                    {shipSuperScienceLabs.toLocaleString()}
                </span>}
                {shipMiniFabricators > 0 && <span className={styles.habitatStatsLabel}>
                    Mini- Fabs:
                </span>}
                {shipMiniFabricators > 0 && <span className={styles.habitatStatsValue}>
                    {shipMiniFabricators.toLocaleString()}
                </span>}
                {shipMiniRoboFacs > 0 && <span className={styles.habitatStatsLabel}>
                    Mini- Robo Fabs:
                </span>}
                {shipMiniRoboFacs > 0 && <span className={styles.habitatStatsValue}>
                    {shipMiniRoboFacs.toLocaleString()}
                </span>}
                {shipMiniNanoFacs > 0 && <span className={styles.habitatStatsLabel}>
                    Mini- Nano Fabs:
                </span>}
                {shipMiniNanoFacs > 0 && <span className={styles.habitatStatsValue}>
                    {shipMiniNanoFacs.toLocaleString()}
                </span>}
                {shipSickBays > 0 && <span className={styles.habitatStatsLabel}>
                    Sickbays:
                </span>}
                {shipSickBays > 0 && <span className={styles.habitatStatsValue}>
                    {shipSickBays.toLocaleString()}
                </span>}
                {shipSickBaysAuto > 0 && <span className={styles.habitatStatsLabel}>
                    Auto-Sickbays:
                </span>}
                {shipSickBaysAuto > 0 && <span className={styles.habitatStatsValue}>
                    {shipSickBaysAuto.toLocaleString()}
                </span>}
                {shipMiniReplicators > 0 && <span className={styles.habitatStatsLabel}>
                    Mini- Replicators:
                </span>}
                {shipMiniReplicators > 0 && <span className={styles.habitatStatsValue}>
                    {shipMiniReplicators.toLocaleString()}
                </span>}
                {shipTeleportProjectors > 0 && <span className={styles.habitatStatsLabel}>
                    Teleport Projectors:
                </span>}
                {shipTeleportProjectors > 0 && <span className={styles.habitatStatsValue}>
                    {shipTeleportProjectors.toLocaleString()}
                </span>}
                {shipTeleportProjectorsSend > 0 && <span className={styles.habitatStatsLabel}>
                    Teleport Projectors (Send):
                </span>}
                {shipTeleportProjectorsSend > 0 && <span className={styles.habitatStatsValue}>
                    {shipTeleportProjectorsSend.toLocaleString()}
                </span>}
                {shipTeleportProjectorsReceive > 0 && <span className={styles.habitatStatsLabel}>
                    Teleport Projectors (Recieve):
                </span>}
                {shipTeleportProjectorsReceive > 0 && <span className={styles.habitatStatsValue}>
                    {shipTeleportProjectorsReceive.toLocaleString()}
                </span>}
            </div >
        )
    }

    // This function displays the Weapon Stats component.
    function weaponStatsDisplay() {
        return (
            <div className={isExpanded ? styles.weaponStatsContainerExpanded : styles.weaponStatsContainerCollapsed}>
                <h2 className={isExpanded ? styles.statTitleExpanded : styles.statTitleCollapsed}>Weapon Stat Block</h2>
                <p className={styles.weaponExplanation}>Unconventional warheads can be added and missile types changed when deploying
                    your ship to the battle map (with TL and Super Science restrictions). Selections at this stage represent the
                    default shell and missile type.</p>




                {/* <span className={styles.weaponSelectLabel} >Mount: </span>
                <select className={styles.weaponSelect} value={selectedMountType} onChange={handleWeaponMountChange}>
                    <option value="">Select Weapon Mount</option>
                    {unusedWeaponMountList.map((mountType) => (
                        <option key={mountType} value={mountType}>{mountType}</option>
                    ))}
                </select>

                <span className={styles.weaponSelectLabel} >Weapon Type: </span>
                {selectedMountType && (
                    <select className={styles.weaponSelect} value={selectedWeaponType} onChange={handleWeaponTypeChange}>
                        <option value="">Select Weapon Type</option>

                        {selectedMountType === 'Spinal Mount' && <option value="GunSpinalFront">Gun (Front Facing)</option>}
                        {selectedMountType === 'Spinal Mount' && <option value="MissileSpinalFront">Missile (Front Facing)</option>}
                        {selectedMountType === 'Spinal Mount' && (shipTL >= 9 || superScienceChecked === true) && <option value="BeamSpinalFront">Beam (Front Facing)</option>}
                        {selectedMountType === 'Spinal Mount' && <option value="GunSpinalRear">Gun (Rear Facing)</option>}
                        {selectedMountType === 'Spinal Mount' && <option value="MissileSpinalRear">Missile (Rear Facing)</option>}
                        {selectedMountType === 'Spinal Mount' && (shipTL >= 9 || superScienceChecked === true) && <option value="BeamSpinalRear">Beam (Rear Facing)</option>}

                        {selectedMountType !== 'Spinal Mount' && <option value="Uninstalled">Empty Mount</option>}
                        {selectedMountType !== 'Spinal Mount' && <option value="GunTurret">Gun (Turret)</option>}
                        {selectedMountType !== 'Spinal Mount' && <option value="GunFixed">Gun (Fixed)</option>}
                        {selectedMountType !== 'Spinal Mount' && <option value="MissileTurret">Missile (Turret)</option>}
                        {selectedMountType !== 'Spinal Mount' && <option value="MissileFixed">Missile (Fixed)</option>}
                        {selectedMountType !== 'Spinal Mount' && (shipTL >= 9 || superScienceChecked === true) && <option value="BeamTurret">Beam (Turret)</option>}
                        {selectedMountType !== 'Spinal Mount' && (shipTL >= 9 || superScienceChecked === true) && <option value="BeamFixed">Beam (Fixed)</option>}

                    </select>
                )}

                <span className={styles.weaponSelectLabel} >Weapon Sub-type: </span>
                {selectedWeaponType && (
                    <>
                        <select className={styles.weaponSelect} value={weaponSubType} onChange={handleSpecificTypeChange}>
                            <option value="">Select Sub Type</option>
                            {shipValidWeaponTypesList.map((weaponType) => (
                                <option key={weaponType} value={weaponType}>{weaponType}</option>
                            ))}
                        </select>

                    </>
                )}

                {weaponSubType && (
                    <>
                        <span className={styles.statTitle}>{weaponSubType}</span>

                        <span className={styles.freeFillWeaponLabel}>Size: </span>
                        {selectedWeaponType !== "Uninstalled" && <span className={styles.freeFillWeaponValue}>{`${weaponSizeDisplayConverter(selectedWeaponSize).toLocaleString()}`}</span>}
                        {selectedWeaponType === "Uninstalled" && <span className={styles.freeFillWeaponValue}>{`${selectedUninstalledCargo.toLocaleString()} tons`}</span>}

                        {(selectedWeaponType === "GunSpinalFront" || selectedWeaponType === "GunSpinalRear" || selectedWeaponType === "GunTurret" || selectedWeaponType === "GunFixed" || selectedWeaponType === "MissileSpinalFront" || selectedWeaponType === "MissileSpinalRear" || selectedWeaponType === "MissileTurret" || selectedWeaponType === "MissileFixed") &&
                            <span className={styles.freeFillWeaponLabel}>Shots: </span>}
                        {(selectedWeaponType === "GunSpinalFront" || selectedWeaponType === "GunSpinalRear" || selectedWeaponType === "GunTurret" || selectedWeaponType === "GunFixed" || selectedWeaponType === "MissileSpinalFront" || selectedWeaponType === "MissileSpinalRear" || selectedWeaponType === "MissileTurret" || selectedWeaponType === "MissileFixed") &&
                            <span className={styles.freeFillWeaponValue}>{selectedWeaponShots}</span>}

                        {(selectedWeaponType === "BeamSpinalFront" || selectedWeaponType === "BeamSpinalRear" || selectedWeaponType === "BeamTurret" || selectedWeaponType === "BeamFixed") && <span className={styles.freeFillWeaponLabel}>
                            Range (Full Dmg) (10 /100 /1k /10k): </span>}
                        {(selectedWeaponType === "BeamSpinalFront" || selectedWeaponType === "BeamSpinalRear" || selectedWeaponType === "BeamTurret" || selectedWeaponType === "BeamFixed") && <span className={styles.freeFillWeaponValue}>
                            {`${selectedWeaponRangeArray[0][0]}/${selectedWeaponRangeArray[1][0]}/${selectedWeaponRangeArray[2][0]}/${selectedWeaponRangeArray[3][0]}`}</span>}

                        {(selectedWeaponType === "BeamSpinalFront" || selectedWeaponType === "BeamSpinalRear" || selectedWeaponType === "BeamTurret" || selectedWeaponType === "BeamFixed") && <span className={styles.freeFillWeaponLabel}>
                            Range (1/2 Dmg) (10 /100 /1k /10k): </span>}
                        {(selectedWeaponType === "BeamSpinalFront" || selectedWeaponType === "BeamSpinalRear" || selectedWeaponType === "BeamTurret" || selectedWeaponType === "BeamFixed") && <span className={styles.freeFillWeaponValue}>
                            {`${selectedWeaponRangeArray[0][1]}/${selectedWeaponRangeArray[1][1]}/${selectedWeaponRangeArray[2][1]}/${selectedWeaponRangeArray[3][1]}`}</span>}

                        {weaponSubType === "Warp Missile" && <span className={styles.freeFillWeaponLabel}>
                            Range (10 /100 /1k /10k): </span>}
                        {weaponSubType === "Warp Missile" && <span className={styles.freeFillWeaponValue}>
                            {`${warpMissileRange[0].toLocaleString()}/${warpMissileRange[1].toLocaleString()}/${warpMissileRange[2].toLocaleString()}/${warpMissileRange[3].toLocaleString()}`}</span>}

                        {selectedWeaponType !== "Uninstalled" && <span className={styles.freeFillWeaponLabel}>Rate of Fire (20s /1m /3m /10m): </span>}
                        {selectedWeaponType !== "Uninstalled" && <span className={styles.freeFillWeaponValue}>{`${selectedWeaponRoF[0]}/${selectedWeaponRoF[1]}/${selectedWeaponRoF[2]}/${selectedWeaponRoF[3]}`}</span>}

                        {selectedWeaponType !== "Uninstalled" && <span className={styles.freeFillWeaponLabel}>Recoil: </span>}
                        {selectedWeaponType !== "Uninstalled" && <span className={styles.freeFillWeaponValue}>{selectedWeaponRcl}</span>}

                        {selectedWeaponType !== "Uninstalled" && <span className={styles.freeFillWeaponLabel}>Damage Type: </span>}
                        {selectedWeaponType !== "Uninstalled" && <span className={styles.freeFillWeaponValue}>{selectedWeaponDamageTypes.join(', ')}</span>}

                        {selectedWeaponType !== "Uninstalled" && <span className={styles.freeFillWeaponLabel}>Base Damage: </span>}
                        {selectedWeaponType !== "Uninstalled" && <span className={styles.freeFillWeaponValue}>
                            {`${selectedWeaponDmgDice + 'd'}${selectedWeaponDmgMod !== 0 || selectedWeaponDmgMulti !== 0 ? (selectedWeaponDmgMod !== 0 ? selectedWeaponDmgMod : 'x' + selectedWeaponDmgMulti) : '+0'} / ${selectedWeaponArmorDiv}`}</span>}

                        {selectedWeaponType !== "Uninstalled" && <span className={styles.freeFillWeaponLabel}>Space Accuracy: </span>}
                        {selectedWeaponType !== "Uninstalled" && <span className={styles.freeFillWeaponValue}>{selectedWeaponSAcc}</span>}

                        {(weaponSubType !== "Warp Missile" && (selectedWeaponType === "MissileSpinalFront" || selectedWeaponType === "MissileSpinalRear" || selectedWeaponType === "MissileTurret" || selectedWeaponType === "MissileFixed")) &&
                            <span className={styles.freeFillWeaponLabel1}>Thrust (10 Mile) (20s /1m /3m /10m): </span>}
                        {(weaponSubType !== "Warp Missile" && (selectedWeaponType === "MissileSpinalFront" || selectedWeaponType === "MissileSpinalRear" || selectedWeaponType === "MissileTurret" || selectedWeaponType === "MissileFixed")) &&
                            <span className={styles.freeFillWeaponValue}>{`${selectedWeaponThrust[0][0]}/${selectedWeaponThrust[0][1]}/${selectedWeaponThrust[0][2]}/${selectedWeaponThrust[0][3]}`}</span>}

                        {(weaponSubType !== "Warp Missile" && (selectedWeaponType === "MissileSpinalFront" || selectedWeaponType === "MissileSpinalRear" || selectedWeaponType === "MissileTurret" || selectedWeaponType === "MissileFixed")) &&
                            <span className={styles.freeFillWeaponLabel}>Thrust (1000 Mile) (20s /1m /3m /10m): </span>}
                        {(weaponSubType !== "Warp Missile" && (selectedWeaponType === "MissileSpinalFront" || selectedWeaponType === "MissileSpinalRear" || selectedWeaponType === "MissileTurret" || selectedWeaponType === "MissileFixed")) &&
                            <span className={styles.freeFillWeaponValue}>{`${selectedWeaponThrust[2][0]}/${selectedWeaponThrust[2][1]}/${selectedWeaponThrust[2][2]}/${selectedWeaponThrust[2][3]}`}</span>}

                        {(weaponSubType !== "Warp Missile" && (selectedWeaponType === "MissileSpinalFront" || selectedWeaponType === "MissileSpinalRear" || selectedWeaponType === "MissileTurret" || selectedWeaponType === "MissileFixed")) &&
                            <span className={styles.freeFillWeaponLabel}>Burn (10 Mile) (20s /1m /3m /10m): </span>}
                        {(weaponSubType !== "Warp Missile" && (selectedWeaponType === "MissileSpinalFront" || selectedWeaponType === "MissileSpinalRear" || selectedWeaponType === "MissileTurret" || selectedWeaponType === "MissileFixed")) &&
                            <span className={styles.freeFillWeaponValue}>{`${selectedWeaponBurn[0][0]}/${selectedWeaponBurn[0][1]}/${selectedWeaponBurn[0][2]}/${selectedWeaponBurn[0][3]}`}</span>}

                        {(weaponSubType !== "Warp Missile" && (selectedWeaponType === "MissileSpinalFront" || selectedWeaponType === "MissileSpinalRear" || selectedWeaponType === "MissileTurret" || selectedWeaponType === "MissileFixed")) &&
                            <span className={styles.freeFillWeaponLabel}>Burn (1000 Mile) (20s /1m /3m /10m): </span>}
                        {(weaponSubType !== "Warp Missile" && (selectedWeaponType === "MissileSpinalFront" || selectedWeaponType === "MissileSpinalRear" || selectedWeaponType === "MissileTurret" || selectedWeaponType === "MissileFixed")) &&
                            <span className={styles.freeFillWeaponValue}>{`${selectedWeaponBurn[2][0]}/${selectedWeaponBurn[2][1]}/${selectedWeaponBurn[2][2]}/${selectedWeaponBurn[2][3]}`}</span>}

                        {(selectedWeaponType === "GunSpinalFront" || selectedWeaponType === "GunSpinalRear" || selectedWeaponType === "GunTurret" || selectedWeaponType === "GunFixed") &&
                            <span className={styles.freeFillWeaponLabel}>Gun Impulse (10 Mile) (20s /1m /3m /10m): </span>}
                        {(selectedWeaponType === "GunSpinalFront" || selectedWeaponType === "GunSpinalRear" || selectedWeaponType === "GunTurret" || selectedWeaponType === "GunFixed") &&
                            <span className={styles.freeFillWeaponValue}>{`${selectedWeaponImpulse[0][0]} /${selectedWeaponImpulse[0][1]} /${selectedWeaponImpulse[0][2]} /${selectedWeaponImpulse[0][3]}`}</span>}

                        {(selectedWeaponType === "GunSpinalFront" || selectedWeaponType === "GunSpinalRear" || selectedWeaponType === "GunTurret" || selectedWeaponType === "GunFixed") &&
                            <span className={styles.freeFillWeaponLabel}>Gun Impulse (1000 Mile) (20s /1m /3m /10m): </span>}
                        {(selectedWeaponType === "GunSpinalFront" || selectedWeaponType === "GunSpinalRear" || selectedWeaponType === "GunTurret" || selectedWeaponType === "GunFixed") &&
                            <span className={styles.freeFillWeaponValue}>{`${selectedWeaponImpulse[2][0]} /${selectedWeaponImpulse[2][1]} /${selectedWeaponImpulse[2][2]} /${selectedWeaponImpulse[2][3]}`}</span>}


                        {(selectedWeaponType === "BeamSpinalFront" || selectedWeaponType === "BeamSpinalRear" || selectedWeaponType === "BeamTurret" || selectedWeaponType === "BeamFixed" || selectedWeaponType === "GunSpinalFront" || selectedWeaponType === "GunSpinalRear" || selectedWeaponType === "GunTurret" || selectedWeaponType === "GunFixed") &&
                            <div className={styles.freeFillWeaponLabelContainer}>
                                {selectedWeaponVeryRapidFire !== true && weaponSubType !== 'Graviton Beam' && weaponSubType !== 'Tractor Beam' && <label className={styles.freeFillWeaponLabel1}>
                                    Rapid Fire:&nbsp;
                                    <input className={styles.inputCheckbox}
                                        type="checkbox"
                                        checked={selectedWeaponRapidFire}
                                        onChange={handleRapidFireChange}
                                    />
                                </label>}

                                {selectedWeaponRapidFire !== true && weaponSubType !== 'Graviton Beam' && weaponSubType !== 'Tractor Beam' && <label className={styles.freeFillWeaponLabel2}>
                                    Very Rapid Fire:&nbsp;
                                    <input className={styles.inputCheckbox}
                                        type="checkbox"
                                        checked={selectedWeaponVeryRapidFire}
                                        onChange={handleVeryRapidFireChange}
                                    />
                                </label>}

                                {selectedWeaponImprovedValid === true && <label className={styles.freeFillWeaponLabel3}>
                                    Improved:&nbsp;
                                    <input className={styles.inputCheckbox}
                                        type="checkbox"
                                        checked={selectedWeaponImproved}
                                        onChange={handleImprovedChange}
                                    />
                                </label>}</div>}

                        {(selectedWeaponLargestWarhead[0] !== "None" && (selectedWeaponType === "GunSpinalFront" || selectedWeaponType === "GunSpinalRear" || selectedWeaponType === "GunTurret" || selectedWeaponType === "GunFixed" || selectedWeaponType === "MissileSpinalFront" || selectedWeaponType === "MissileSpinalRear" || selectedWeaponType === "MissileTurret" || selectedWeaponType === "MissileFixed")) &&
                            <span className={styles.freeFillWeaponLabel1}>Largest Warhead (Type): </span>}
                        {(selectedWeaponLargestWarhead[0] !== "None" && (selectedWeaponType === "GunSpinalFront" || selectedWeaponType === "GunSpinalRear" || selectedWeaponType === "GunTurret" || selectedWeaponType === "GunFixed" || selectedWeaponType === "MissileSpinalFront" || selectedWeaponType === "MissileSpinalRear" || selectedWeaponType === "MissileTurret" || selectedWeaponType === "MissileFixed")) &&
                            <span className={styles.freeFillWeaponValue}>{selectedWeaponLargestWarhead[0]}</span>}

                        {(selectedWeaponLargestWarhead[0] !== "None" && (selectedWeaponType === "GunSpinalFront" || selectedWeaponType === "GunSpinalRear" || selectedWeaponType === "GunTurret" || selectedWeaponType === "GunFixed" || selectedWeaponType === "MissileSpinalFront" || selectedWeaponType === "MissileSpinalRear" || selectedWeaponType === "MissileTurret" || selectedWeaponType === "MissileFixed")) &&
                            <span className={styles.freeFillWeaponLabel}>Largest Warhead (Size): </span>}
                        {(selectedWeaponLargestWarhead[0] !== "None" && (selectedWeaponType === "GunSpinalFront" || selectedWeaponType === "GunSpinalRear" || selectedWeaponType === "GunTurret" || selectedWeaponType === "GunFixed" || selectedWeaponType === "MissileSpinalFront" || selectedWeaponType === "MissileSpinalRear" || selectedWeaponType === "MissileTurret" || selectedWeaponType === "MissileFixed")) &&
                            <span className={styles.freeFillWeaponValue}>{largestWarheadDisplay(selectedWeaponLargestWarhead[1])}</span>}

                        {(selectedWeaponLargestWarhead[0] !== "None" && (selectedWeaponType === "GunSpinalFront" || selectedWeaponType === "GunSpinalRear" || selectedWeaponType === "GunTurret" || selectedWeaponType === "GunFixed" || selectedWeaponType === "MissileSpinalFront" || selectedWeaponType === "MissileSpinalRear" || selectedWeaponType === "MissileTurret" || selectedWeaponType === "MissileFixed")) &&
                            <span className={styles.freeFillWeaponLabel}>Warhead Damage: </span>}
                        {(selectedWeaponLargestWarhead[0] !== "None" && (selectedWeaponType === "GunSpinalFront" || selectedWeaponType === "GunSpinalRear" || selectedWeaponType === "GunTurret" || selectedWeaponType === "GunFixed" || selectedWeaponType === "MissileSpinalFront" || selectedWeaponType === "MissileSpinalRear" || selectedWeaponType === "MissileTurret" || selectedWeaponType === "MissileFixed")) &&
                            <span className={styles.freeFillWeaponValue}>{`${weaponTables["NuclearAntiMatterDmgTable"][selectedWeaponLargestWarhead[1]]["DamageDice"]}x${weaponTables["NuclearAntiMatterDmgTable"][selectedWeaponLargestWarhead[1]]["DamageMultiplier"].toLocaleString()}`}</span>}

                        {(selectedWeaponLargestWarhead[0] !== "None" && (selectedWeaponType === "GunSpinalFront" || selectedWeaponType === "GunSpinalRear" || selectedWeaponType === "GunTurret" || selectedWeaponType === "GunFixed" || selectedWeaponType === "MissileSpinalFront" || selectedWeaponType === "MissileSpinalRear" || selectedWeaponType === "MissileTurret" || selectedWeaponType === "MissileFixed")) &&
                            <span className={styles.freeFillWeaponLabel}>Warhead Linked Damage: </span>}
                        {(selectedWeaponLargestWarhead[0] !== "None" && (selectedWeaponType === "GunSpinalFront" || selectedWeaponType === "GunSpinalRear" || selectedWeaponType === "GunTurret" || selectedWeaponType === "GunFixed" || selectedWeaponType === "MissileSpinalFront" || selectedWeaponType === "MissileSpinalRear" || selectedWeaponType === "MissileTurret" || selectedWeaponType === "MissileFixed")) &&
                            <span className={styles.freeFillWeaponValue}>{`${weaponTables["NuclearAntiMatterDmgTable"][selectedWeaponLargestWarhead[1]]["LinkedDmgDice"]}x${weaponTables["NuclearAntiMatterDmgTable"][selectedWeaponLargestWarhead[1]]["LinkedDmgMultiplier"].toLocaleString()}`}</span>}

                        <div className={styles.addWeaponsNumberButtons}>
                            <button className={styles.weaponNumberButtonMinusTen} onClick={() => handleWeaponNumberClick(-10, selectedMountType)}>-10</button>
                            <button className={styles.weaponNumberButtonMinusOne} onClick={() => handleWeaponNumberClick(-1, selectedMountType)}>-1</button>
                            <span className={styles.weaponNumberDisplay}>{selectedWeaponCount}</span>
                            <button className={styles.weaponNumberButtonOne} onClick={() => handleWeaponNumberClick(1, selectedMountType)}>1</button>
                            <button className={styles.weaponNumberButtonTen} onClick={() => handleWeaponNumberClick(10, selectedMountType)}>10</button>
                        </div>

                        <button className={styles.addWeaponButton} onClick={handleAddWeapon}>Add Weapon(s)</button> */}


                {/* </>
                )}
                {weaponList && <>
                    {weaponList.map((weapon, weaponIndex) => (

                        <div className={styles.weaponInfoContainer} key={weaponIndex}>
                            <span className={styles.weaponInfoLabel1}>Mount Type:</span>
                            <span className={styles.weaponInfoValue}>{weapon.mountType}</span>
                            <span className={styles.weaponInfoLabel2}>Module Number:</span>
                            <span className={styles.weaponInfoValue}>{weapon.moduleNumber}</span>
                            <span className={styles.weaponInfoLabel1}>Weapon Type:</span>
                            <span className={styles.weaponInfoValue}>{weapon.weaponType}</span>
                            <span className={styles.weaponInfoLabel2}>Weapon Count:</span>
                            <span className={styles.weaponInfoValue}>{weapon.count}</span>
                            <span className={styles.weaponDeleteWarning}>Only weapons in a full mount can be removed.</span>
                            <button className={styles.addWeaponButton} onClick={() => handleDeleteWeapon(weapon, weaponIndex)}>Remove</button>
                        </div>
                    ))}
                </>} */}
            </div>
        )
    }

    // This function is passed into the ShipClassHabitatPower component to display the power plant information.
    function powerPlantsDisplay() {
        return shipPowerPlants.map((module, index) => (
            <React.Fragment key={index}>
                <span className={styles.habitatPowerInfoLabelCol1}>
                    Power Plant:
                </span>
                <span className={styles.habitatPowerInfoValueCol1}>
                    {module.powerPlantKey}
                </span>
                <span className={styles.habitatPowerInfoLabelCol2}>
                    Power Generation:
                </span>
                <span className={styles.habitatPowerInfoValueCol2}>
                    {module.powerGeneration}
                </span>
                <span className={styles.habitatPowerInfoLabelCol1}>
                    Reactor Life (Years):
                </span>
                <span className={styles.habitatPowerInfoValueCol1}>
                    {module.reactorLifeYears}
                </span>
                <span className={styles.habitatPowerInfoLabelCol2}>
                    Reactor Life (Hours):
                </span>
                <span className={styles.habitatPowerInfoValueCol2}>
                    {module.reactorLifeHours}
                </span>
                <span className={styles.habitatPowerInfoLabelCol1}>
                    Cost:
                </span>
                <span className={styles.habitatPowerInfoValueCol1}>
                    ${module.finalCost.toLocaleString()}
                </span>
                {
                    ["Reactor, Fusion", "Reactor, Antimatter", "Reactor, Super Fusion"].includes(module.powerPlantKey) &&
                    <button className={styles.deRateButton} onClick={() => handleDeRatedChange(module)}>De-Rate</button>
                }
                {
                    ["Reactor, Fusion", "Reactor, Antimatter", "Reactor, Super Fusion"].includes(module.powerPlantKey) &&
                    <button className={styles.upRateButton} onClick={() => handleUpRatedChange(module)}>Up-Rate</button>
                }
            </React.Fragment>
        ))
    }

    // Extra Stats - END
    // ****************************************************************************************************************************************************
    // ****************************************************************************************************************************************************

    // ****************************************************************************************************************************************************
    // ****************************************************************************************************************************************************
    // Customization - START

    // This function resets all weapon stats to avoid issues when dependencies change.
    function resetWeaponStats() {
        setWeaponList([])
        setSelectedWeaponCount(0);
        setSelectedWeaponSize(0);
        setSelectedWeaponRangeArray([[0, 0], [0, 0], [0, 0], [0, 0]]);
        setSelectedWeaponDmgDice(0);
        setSelectedWeaponDmgMod(0);
        setSelectedWeaponDmgMulti(0);
        setSelectedWeaponArmorDiv(0);
        setSelectedWeaponSAcc(0);
        setSelectedWeaponRcl(0);
        setSelectedWeaponRoF([0, 0, 0, 0]);
        setSelectedWeaponShots(0);
        setSelectedWeaponThrust(0);
        setSelectedWeaponBurn(0);
        setSelectedWeaponImpulse(0);
        setSelectedWeaponDamageTypes(['']);
        setSelectedWeaponImprovedValid(false);
        setSelectedWeaponImproved(false);
        setSelectedWeaponRapidFire(false);
        setSelectedWeaponVeryRapidFire(false);
        setSelectedWeaponType('')
        setCurrentMediumCountFront(0);
        setCurrentSecondaryCountFront(0);
        setCurrentTertiaryCountFront(0);
        setCurrentMediumCountMid(0);
        setCurrentSecondaryCountMid(0);
        setCurrentTertiaryCountMid(0);
        setCurrentMediumCountRear(0);
        setCurrentSecondaryCountRear(0);
        setCurrentTertiaryCountRear(0);
    }

    // This function converts beam power and weapon calibers to more readable formats.
    function weaponSizeDisplayConverter(weaponSize) {

        if (selectedWeaponType === 'BeamTurret' || selectedWeaponType === 'BeamFixed' || selectedWeaponType === 'BeamSpinalFront' || selectedWeaponType === 'BeamSpinalRear') {
            let kilojoules = weaponSize
            let megajoules = kilojoules / 1000
            let gigajoules = kilojoules / 1000000
            let terajoules = kilojoules / 1000000000
            let petajoules = kilojoules / 1000000000000

            if (kilojoules < 1000) {
                return `${kilojoules} KJ`
            } else if (kilojoules >= 1000 && kilojoules < 1000000) {
                return `${megajoules} MJ`
            } else if (kilojoules >= 1000000 && kilojoules < 1000000000) {
                return `${gigajoules} GJ`
            } else if (kilojoules >= 1000000000 && kilojoules < 1000000000000) {
                return `${terajoules} TJ`
            } else {
                return `${petajoules} PJ`
            }
        } else if (selectedWeaponType === 'MissileTurret' || selectedWeaponType === 'MissileFixed' || selectedWeaponType === 'MissileSpinalFront' || selectedWeaponType === 'MissileSpinalRear' || selectedWeaponType === 'GunTurret' || selectedWeaponType === 'GunFixed' || selectedWeaponType === 'GunSpinalFront' || selectedWeaponType === 'GunSpinalRear') {
            return `${weaponSize} cm`
        }
    }

    // This useEffect determines the valid weapon sub types based on ship TL, selectedWeaponType, and superScience.
    useEffect(() => {
        let validWeaponTypeList = []
        let TL = shipTL

        switch (selectedWeaponType) {
            case 'Uninstalled':
                validWeaponTypeList.push(`${selectedUninstalledCargo} tons unpressurized cargo`)
                break;
            case 'GunSpinalFront':
            case 'GunSpinalRear':
            case 'GunTurret':
            case 'GunFixed':
                Object.values(weaponData).forEach(weaponArray => {
                    weaponArray.forEach(weapon => {
                        if (weapon.Type === 'Gun' && weapon.TL <= TL && (!weapon.SuperScience || (superScienceChecked && weapon.SuperScience))) {
                            validWeaponTypeList.push(weapon.Name);
                        }
                    });
                });
                break;
            case 'MissileSpinalFront':
            case 'MissileSpinalRear':
            case 'MissileTurret':
            case 'MissileFixed':
                Object.values(weaponData).forEach(weaponArray => {
                    weaponArray.forEach(weapon => {
                        if (weapon.Type === 'Missile' && weapon.TL <= TL && (!weapon.SuperScience || (superScienceChecked && weapon.SuperScience))) {
                            validWeaponTypeList.push(weapon.Name);
                        }
                    });
                });

                break;
            case 'BeamSpinalFront':
            case 'BeamSpinalRear':
            case 'BeamTurret':
            case 'BeamFixed':
                Object.values(weaponData).forEach(weaponArray => {
                    weaponArray.forEach(weapon => {
                        if (weapon.Type === 'Beam' && weapon.TL <= TL && (!weapon.SuperScience || (superScienceChecked && weapon.SuperScience))) {
                            validWeaponTypeList.push(weapon.Name);
                        }
                    });
                });
                break;

            default:
                break;
        }

        setValidWeaponTypeList(validWeaponTypeList)
    }, [selectedWeaponType, shipTL, shipSM, superScienceChecked, selectedUninstalledCargo])

    // This useEffect determines uninstalled cargo based on mount type and SM.
    useEffect(() => {
        let shipDataSMIndex = shipSM - 4
        let moduleKey = ''
        let selectedUninstalledCargo = 0

        function setUninstalledCargoFunc(moduleKey, shipDataSMIndex) {
            let selectedCostChange = 0
            switch (moduleKey) {
                case "Tertiary Battery":
                    selectedCostChange = shipData[moduleKey][shipDataSMIndex].cost / 30
                    break;
                case "Secondary Battery":
                    selectedCostChange = shipData[moduleKey][shipDataSMIndex].cost / 10
                    break;
                case "Medium Battery":
                    selectedCostChange = shipData[moduleKey][shipDataSMIndex].cost / 3
                    break;
                default:
                    break;
            }

            selectedUninstalledCargo = shipData[moduleKey][shipDataSMIndex].Uninstalled
            setSelectedUninstalledCargo(selectedUninstalledCargo)
            setSelectedMountCostChange(selectedCostChange)
        }

        switch (selectedMountType) {
            case 'Medium (Front)':
            case 'Medium (Middle)':
            case 'Medium (Rear)':
                setUninstalledCargoFunc('Medium Battery', shipDataSMIndex)
                break;

            case 'Secondary (Front)':
            case 'Secondary (Middle)':
            case 'Secondary (Rear)':
                setUninstalledCargoFunc('Secondary Battery', shipDataSMIndex)
                break;

            case 'Tertiary (Front)':
            case 'Tertiary (Middle)':
            case 'Tertiary (Rear)':
                setUninstalledCargoFunc('Tertiary Battery', shipDataSMIndex)
                break;

            default:
                break;
        }

        setSelectedWeaponCount(0)
    }, [selectedMountType, shipSM])

    // Let moduleKey = '';
    // switch (selectedMountType) {
    //     case 'Spinal Mount':
    //         moduleKey = 'Spinal Battery'
    //         break;

    //     case 'Major (Front)':
    //     case 'Major (Middle)':
    //     case 'Major (Rear)':
    //         moduleKey = 'Major Battery'
    //         break;

    //     case 'Medium (Front)':
    //     case 'Medium (Middle)':
    //     case 'Medium (Rear)':
    //         moduleKey = 'Medium Battery'
    //         break;

    //     case 'Secondary (Front)':
    //     case 'Secondary (Middle)':
    //     case 'Secondary (Rear)':
    //         moduleKey = 'Secondary Battery'
    //         break;

    //     case 'Tertiary (Front)':
    //     case 'Tertiary (Middle)':
    //     case 'Tertiary (Rear)':
    //         moduleKey = 'Tertiary Battery'
    //         break;

    //     default:
    //         break;
    // }

    function getWeaponStats(weaponName, moduleKey, rapidFire, veryRapidFire, improved, shipSM, shipTL) {
        let shipDataSMIndex = shipSM - 4
        let weaponType = ''
        let finalWeaponObj = {}

        let damageDice = 0
        let damageModifier = 0
        let damageMultiplier = 0
        let weaponRcL = 0
        let weaponsAcc = 0

        let beamPower = shipData[moduleKey][shipDataSMIndex]['Beam/kj']
        let armorDiv = 0
        let tenMileRangeArray = []
        let hundredMileRangeArray = []
        let thousandMileRangeArray = []
        let tenThousandMileRangeArray = []
        let rangeValuesArray = []
        let damageTypesArray = []

        let gunCaliber = shipData[moduleKey][shipDataSMIndex].Gun
        let gunShots = shipData[moduleKey][shipDataSMIndex]['Gun Shots']
        let tenMileImpulse = []
        let hundredMileImpulse = []
        let thousandMileImpulse = []
        let tenThousandMileImpulse = []
        let gunImpulse = []

        const launcherCaliber = shipData[moduleKey][shipDataSMIndex].Launcher
        const launcherShots = shipData[moduleKey][shipDataSMIndex]['Launcher Shots']
        let missileThrust10Mile = []
        let missileThrust100Mile = []
        let missileThrust1000Mile = []
        let missileThrust10000Mile = []
        let missileThrust = []
        let missileBurn10Mile = []
        let missileBurn100Mile = []
        let missileBurn1000Mile = []
        let missileBurn10000Mile = []
        let missileBurn = []
        let warpMissileRange = []

        if (rapidFire) {
            beamPower = beamPower / 10
            gunCaliber = gunCaliber / 2
            gunShots = gunShots * 5
        } else if (veryRapidFire) {
            beamPower = beamPower / 100
            gunCaliber = gunCaliber / 4
            gunShots = gunShots * 20
        }

        Object.values(weaponData).forEach(weaponArray => {
            weaponArray.forEach(weapon => {
                if (weapon.Name === weaponName) {
                    weaponType = weapon.Type
                }
            });
        });

        function getBeamStats(subWeaponTable) {
            const weaponStats = weaponTables[subWeaponTable][beamPower.toString()];

            damageDice = weaponStats.DamageDice;
            damageModifier = weaponStats.DamageModifier;
            damageMultiplier = weaponStats.DamageMultiplier;
            tenMileRangeArray = weaponStats['10Mile'];
            hundredMileRangeArray = weaponStats['100Mile'];
            thousandMileRangeArray = weaponStats['1000Mile'];
            tenThousandMileRangeArray = weaponStats['10000Mile'];
            rangeValuesArray = [tenMileRangeArray, hundredMileRangeArray, thousandMileRangeArray, tenThousandMileRangeArray];
        }

        function getBeamWeaponObject() {
            return {
                weaponType: weaponType,
                weaponName: weaponName,
                weaponSize: beamPower,
                weaponDmgDice: damageDice,
                weaponDmgMod: damageModifier,
                weaponDmgMulti: damageMultiplier,
                weaponArmorDiv: armorDiv,
                weaponRangeArray: rangeValuesArray,
                weaponSAcc: weaponsAcc,
                weaponRcl: weaponRcL,
                weaponRoF: getRoFStats(),
                weaponDamageTypes: damageTypesArray,
                weaponImproved: improved,
                weaponRapidFire: rapidFire,
                weaponVeryRapidFire: veryRapidFire
            }
        }

        function getGunStats(weaponName) {
            const weaponStats = weaponTables['ConventionalWarheadDmgTable'][gunCaliber.toString()];

            const selectedWeaponData = weaponData[weaponName]
            tenMileImpulse = selectedWeaponData[1]['10MileImpulse']
            hundredMileImpulse = selectedWeaponData[1]['100MileImpulse']
            thousandMileImpulse = selectedWeaponData[1]['1000MileImpulse']
            tenThousandMileImpulse = selectedWeaponData[1]['10000MileImpulse']
            gunImpulse = [tenMileImpulse, hundredMileImpulse, thousandMileImpulse, tenThousandMileImpulse]
            damageDice = weaponStats.DamageDice;
            damageModifier = weaponStats.DamageModifier;
            damageMultiplier = weaponStats.DamageMultiplier;
        }

        function getGunWeaponObject() {
            return {
                weaponType: weaponType,
                weaponName: weaponName,
                weaponSize: gunCaliber,
                largestWarhead: getLargestWarhead(),
                weaponDmgDice: damageDice,
                weaponDmgMod: damageModifier,
                weaponDmgMulti: damageMultiplier,
                weaponImpulse: gunImpulse,
                weaponShots: gunShots,
                weaponSAcc: weaponsAcc,
                weaponRcl: weaponRcL,
                weaponRoF: getRoFStats(),
                weaponRapidFire: rapidFire,
                weaponVeryRapidFire: veryRapidFire
            }
        }

        function getMissileStats(weaponName) {
            const weaponStats = weaponTables['ConventionalWarheadDmgTable'][launcherCaliber.toString()];
            const selectedWeaponData = weaponData[weaponName]
            damageDice = weaponStats.DamageDice;
            damageModifier = weaponStats.DamageModifier;
            damageMultiplier = weaponStats.DamageMultiplier;

            if (weaponName === "Warp Missile") {
                console.log(`Weapon Name: ${weaponName}, selectedWeaponData: ${selectedWeaponData}, weaponData: ${weaponData}`)
                if (launcherCaliber <= 28) {
                    warpMissileRange = selectedWeaponData[1]["WarpRange28cm"]
                } else if (launcherCaliber >= 29) {
                    warpMissileRange = selectedWeaponData[1]["WarpRange32cm"]
                } else {
                    warpMissileRange = 'Error'
                }
            } else {
                missileThrust10Mile = selectedWeaponData[1]['10MileThrust']
                missileThrust100Mile = selectedWeaponData[1]['100MileThrust']
                missileThrust1000Mile = selectedWeaponData[1]['1000MileThrust']
                missileThrust10000Mile = selectedWeaponData[1]['10000MileThrust']
                missileThrust = [missileThrust10Mile, missileThrust100Mile, missileThrust1000Mile, missileThrust10000Mile]

                missileBurn10Mile = selectedWeaponData[2]['10MileBurn']
                missileBurn100Mile = selectedWeaponData[2]['100MileBurn']
                missileBurn1000Mile = selectedWeaponData[2]['1000MileBurn']
                missileBurn10000Mile = selectedWeaponData[2]['10000MileBurn']
                if (launcherCaliber >= 32) {
                    missileBurn10Mile = missileBurn10Mile.map(value => value * 2);
                    missileBurn100Mile = missileBurn100Mile.map(value => value * 2);
                    missileBurn1000Mile = missileBurn1000Mile.map(value => value * 2);
                    missileBurn10000Mile = missileBurn10000Mile.map(value => value * 2);
                }
                missileBurn = [missileBurn10Mile, missileBurn100Mile, missileBurn1000Mile, missileBurn10000Mile]
            }
        }

        function getMissileWeaponObject() {
            if (weaponName === 'Warp Missile') {
                return {
                    weaponType: weaponType,
                    weaponName: weaponName,
                    weaponSize: launcherCaliber,
                    largestWarhead: getLargestWarhead(),
                    weaponDmgDice: damageDice,
                    weaponDmgMod: damageModifier,
                    weaponDmgMulti: damageMultiplier,
                    weaponRange: warpMissileRange,
                    weaponShots: launcherShots,
                    weaponSAcc: weaponsAcc,
                    weaponRcl: weaponRcL,
                    weaponRoF: getRoFStats()
                }
            } else {
                return {
                    weaponType: weaponType,
                    weaponName: weaponName,
                    weaponSize: launcherCaliber,
                    largestWarhead: getLargestWarhead(),
                    weaponDmgDice: damageDice,
                    weaponDmgMod: damageModifier,
                    weaponDmgMulti: damageMultiplier,
                    weaponThrust: missileThrust,
                    weaponBurn: missileBurn,
                    weaponShots: launcherShots,
                    weaponSAcc: weaponsAcc,
                    weaponRcl: weaponRcL,
                    weaponRoF: getRoFStats()
                }
            }

        }

        function getRcLsAccStats() {
            let sAccResult = 0;
            let rcLResult = 0;

            function getMissileRcLsAcc() {
                if (launcherCaliber <= 28) {
                    sAccResult = shipTL - 8;
                    rcLResult = 1
                } else if (launcherCaliber >= 29) {
                    sAccResult = shipTL - 7;
                    rcLResult = 1
                } else {
                    sAccResult = 'Error'
                    rcLResult = 'Error'
                }
            }

            switch (weaponName) {
                case 'Conventional Gun':
                    if (gunCaliber <= 6) {
                        sAccResult = -10
                        rcLResult = 3
                    } else if (gunCaliber <= 14) {
                        sAccResult = -9
                        rcLResult = 4
                    } else if (gunCaliber >= 16) {
                        sAccResult = -8
                        rcLResult = 5
                    } else {
                        sAccResult = 'Error'
                        rcLResult = 'Error'
                    }
                    break;
                case 'Electromagnetic Gun':
                    if (gunCaliber <= 6) {
                        sAccResult = -8
                        rcLResult = 2
                    } else if (gunCaliber <= 14) {
                        sAccResult = -7
                        rcLResult = 3
                    } else if (gunCaliber >= 16) {
                        sAccResult = -6
                        rcLResult = 4
                    } else {
                        sAccResult = 'Error'
                        rcLResult = 'Error'
                    }
                    break;
                case 'Grav Gun':
                    sAccResult = -5
                    rcLResult = 2
                    break;

                case 'Missile TL 7-8':
                    getMissileRcLsAcc();
                    break;

                case 'Missile TL 9-12':
                    getMissileRcLsAcc();
                    break;

                case 'Super Missile':
                    if (launcherCaliber <= 28) {
                        sAccResult = shipTL - 8;
                        rcLResult = 1
                    } else if (launcherCaliber >= 29) {
                        sAccResult = shipTL - 7;
                        rcLResult = 1
                    } else {
                        sAccResult = 'Error'
                        rcLResult = 'Error'
                    }
                    break;

                case 'Warp Missile':
                    if (launcherCaliber <= 28) {
                        sAccResult = 17
                        rcLResult = 1
                    } else if (launcherCaliber >= 29) {
                        sAccResult = 18
                        rcLResult = 1
                    } else {
                        sAccResult = 'Error'
                        rcLResult = 'Error'
                    }
                    break;

                // sAcc and RcL information for beams is stored in each beam object in the weaponData file.
                default:
                    sAccResult = 'Error, or N/A.';
                    rcLResult = 'Error, or N/A.';
                    break;
            }
            return [rcLResult, sAccResult]
        }

        switch (weaponType) {
            case "Beam":
                Object.values(weaponData).forEach(weaponArray => {
                    weaponArray.forEach(weapon => {
                        if (weapon.Name === weaponName) {
                            weaponsAcc = weapon.sAcc
                            weaponRcL = weapon.Rcl
                            if (weapon.ArmorDivisor === 'Infinity') {
                                armorDiv = Infinity
                            } else {
                                armorDiv = weapon.ArmorDivisor
                            }
                            if (weapon.TypeBurn === true) {
                                damageTypesArray.push('Burn')
                            }
                            if (weapon.TypeCor === true) {
                                damageTypesArray.push('Cor')
                            }
                            if (weapon.TypeCr === true) {
                                damageTypesArray.push('Cr')
                            }
                            if (weapon.TypeSur === true) {
                                damageTypesArray.push('Sur')
                            }
                            if (weapon.TypeExp === true) {
                                damageTypesArray.push('Exp')
                            }
                            if (weapon.TypeRad === true) {
                                damageTypesArray.push('Rad')
                            }
                        }
                    });
                });

                switch (weaponName) {
                    case 'Heat Ray':
                    case 'Laser Beam':
                    case 'Conversion Beam':
                    case 'Disintegrator Beam':
                        getBeamStats('ConversionDisintegratorHeatLaserTable');
                        finalWeaponObj = getBeamWeaponObject();
                        break;
                    case 'Graser Beam':
                    case 'X-Ray Laser':
                    case 'UV Laser':
                        getBeamStats('GraserUvXrayLaserTable');
                        finalWeaponObj = getBeamWeaponObject();
                        break;
                    case 'Ghost Particle Beam':
                    case 'Particle Beam':
                        getBeamStats('GhostParticleParticleTable');
                        finalWeaponObj = getBeamWeaponObject();
                        break;
                    case 'Antiparticle Beam':
                        getBeamStats('AntiParticleTable');
                        finalWeaponObj = getBeamWeaponObject();
                        break;
                    case 'Tractor Beam':
                    case 'Graviton Beam':
                        getBeamStats('TractorGravitonTable');
                        finalWeaponObj = getBeamWeaponObject();
                        break;
                    case 'Plasma Beam':
                        getBeamStats('PlasmaTable');
                        finalWeaponObj = getBeamWeaponObject();
                        break;
                    default:
                        break;
                }
                break;

            case "Gun":
                [weaponRcL, weaponsAcc] = getRcLsAccStats();
                switch (weaponName) {
                    case 'Conventional Gun':
                        getGunStats('Conventional Gun')
                        finalWeaponObj = getGunWeaponObject();
                        break;
                    case 'Electromagnetic Gun':
                        getGunStats('Electromagnetic Gun')
                        finalWeaponObj = getGunWeaponObject();
                        break;
                    case 'Grav Gun':
                        getGunStats('Grav Gun')
                        finalWeaponObj = getGunWeaponObject();
                        break;
                    default:
                        break;
                }
                break;

            case "Missile":
                [weaponRcL, weaponsAcc] = getRcLsAccStats();
                switch (weaponName) {
                    case 'Missile TL 7-8':
                        getMissileStats('Missile TL 7-8');
                        finalWeaponObj = getMissileWeaponObject();
                        break;
                    case 'Missile TL 9-12':
                        getMissileStats('Missile TL 9-12');
                        finalWeaponObj = getMissileWeaponObject();
                        break;
                    case 'Super Missile':
                        getMissileStats('Super Missile');
                        finalWeaponObj = getMissileWeaponObject();
                        break;
                    case 'Warp Missile':
                        getMissileStats('Warp Missile');
                        finalWeaponObj = getMissileWeaponObject();
                        break;
                    default:
                        break;
                }
            default:
                break;
        }

        function getLargestWarhead() {
            let largestWarhead = []
            switch (weaponType) {
                case "Gun":
                    if (shipTL >= 10) {
                        if (gunCaliber >= 40) {
                            largestWarhead = ["Antimatter", "10Mega"]
                        } else if (gunCaliber >= 24) {
                            largestWarhead = ["Antimatter", "2.5Mega"]
                        } else if (gunCaliber >= 16) {
                            largestWarhead = ["Antimatter", "100Kilo"]
                        } else if (gunCaliber >= 10) {
                            largestWarhead = ["Antimatter", "25Kilo"]
                        } else {
                            largestWarhead = ["None", "None"]
                        }
                    } else {
                        if (gunCaliber >= 56) {
                            largestWarhead = ["Nuclear", "10Mega"]
                        } else if (gunCaliber >= 40) {
                            largestWarhead = ["Nuclear", "2.5Mega"]
                        } else if (gunCaliber >= 20) {
                            largestWarhead = ["Nuclear", "100Kilo"]
                        } else if (gunCaliber >= 16) {
                            largestWarhead = ["Nuclear", "25Kilo"]
                        } else {
                            largestWarhead = ["None", "None"]
                        }
                    }
                    break;

                case "Missile":
                    if (shipTL >= 10) {
                        if (launcherCaliber >= 40) {
                            largestWarhead = ["Antimatter", "10Mega"]
                        } else if (launcherCaliber >= 24) {
                            largestWarhead = ["Antimatter", "2.5Mega"]
                        } else if (launcherCaliber >= 16) {
                            largestWarhead = ["Antimatter", "100Kilo"]
                        } else if (launcherCaliber >= 10) {
                            largestWarhead = ["Antimatter", "25Kilo"]
                        } else {
                            largestWarhead = ["None", "None"]
                        }
                    } else {
                        if (launcherCaliber >= 56) {
                            largestWarhead = ["Nuclear", "10Mega"]
                        } else if (launcherCaliber >= 40) {
                            largestWarhead = ["Nuclear", "2.5Mega"]
                        } else if (launcherCaliber >= 20) {
                            largestWarhead = ["Nuclear", "100Kilo"]
                        } else if (launcherCaliber >= 16) {
                            largestWarhead = ["Nuclear", "25Kilo"]
                        } else {
                            largestWarhead = ["None", "None"]
                        }
                    }
                    break;

                default:
                    break;
            }
            return largestWarhead;
        }

        function getRoFStats() {
            let roFArray = [];
            if (weaponType === 'Missile') {
                roFArray = weaponTables['LaunchersBeamGunRoFTable'].slice();
            } else if (rapidFire === false && veryRapidFire === false) {
                if (improved) {
                    roFArray = weaponTables['LaunchersBeamGunRoFTable'].slice();
                    roFArray[0] = roFArray[0] * 2;
                    roFArray[1] = roFArray[1] * 2;
                    roFArray[2] = roFArray[2] * 2;
                    roFArray[3] = roFArray[3] * 2;
                } else {
                    roFArray = weaponTables['LaunchersBeamGunRoFTable'].slice();
                }
            } else if (rapidFire === true && veryRapidFire === false) {
                if (improved) {
                    roFArray = weaponTables['RapidBeamGunRoFTable'].slice();
                    roFArray[0] = roFArray[0] * 2;
                    roFArray[1] = roFArray[1] * 2;
                    roFArray[2] = roFArray[2] * 2;
                    roFArray[3] = roFArray[3] * 2;
                } else {
                    roFArray = weaponTables['RapidBeamGunRoFTable'].slice();
                }
            } else if (rapidFire === false && veryRapidFire === true) {
                if (improved) {
                    roFArray = weaponTables['VeryRapidBeamGunRoFTable'].slice();
                    roFArray[0] = roFArray[0] * 2;
                    roFArray[1] = roFArray[1] * 2;
                    roFArray[2] = roFArray[2] * 2;
                    roFArray[3] = roFArray[3] * 2;
                } else {
                    roFArray = weaponTables['VeryRapidBeamGunRoFTable'].slice();
                }
            }
            return roFArray;
        }
        return finalWeaponObj;
    }
    // console.log(`weaponStats:`)
    // const weaponStats = getWeaponStats("Heat Ray", 'Major Battery', false, false, false, 12, 12);
    // // console.log("weaponType:", weaponStats.weaponType);
    // // console.log("weaponName:", weaponStats.weaponName);
    // // console.log("weaponSize:", weaponStats.weaponSize);
    // // console.log("largestWarhead:", weaponStats.largestWarhead);
    // // console.log("weaponDmgDice:", weaponStats.weaponDmgDice);
    // // console.log("weaponDmgMod:", weaponStats.weaponDmgMod);
    // // console.log("weaponDmgMulti:", weaponStats.weaponDmgMulti);
    // // console.log("weaponRange:", weaponStats.weaponRange);
    // // console.log("weaponShots:", weaponStats.weaponShots);
    // // console.log("weaponSAcc:", weaponStats.weaponSAcc);
    // // console.log("weaponRcl:", weaponStats.weaponRcl);
    // // console.log("weaponRoF:", weaponStats.weaponRoF);
    // Object.entries(weaponStats).forEach(([key, value]) => {
    //     console.log(`${key}: ${value}`);
    // });
    // console.log("-------------------------------------------------")


    // console.log(weaponData["Warp Missile"][1]["WarpRange28cm"])

    // This function converts the selected weapon's largest warhead size to a more readable format.
    function largestWarheadDisplay(string) {
        let result = ""
        switch (string) {
            case "None":
                result = "None"
                break;

            case "25Kilo":
                result = "25 Kilotons"
                break;

            case "100Kilo":
                result = "100 Kilotons"
                break;

            case "2.5Mega":
                result = "2.5 Megatons"
                break;

            case "10Mega":
                result = "10 Megatons"
                break;

            default:
                result = "Error"
                break;
        }
        return result;
    }

    // This function checks if the weapon can be improved based on shipTL.
    function handleImprovedValid(weaponName) {
        let isValid = false;
        Object.values(weaponData).forEach(weaponArray => {
            weaponArray.forEach(weapon => {
                if (weapon.Name === weaponName && weapon.TL + 1 <= shipTL) {
                    isValid = true;
                }
            });
        });
        setSelectedWeaponImprovedValid(isValid);
    }

    // This function handles interaction with the rapid fire button and updates the weapon stats.
    function handleRapidFireChange() {
        setSelectedWeaponRapidFire(!selectedWeaponRapidFire)
        getWeaponSubTypeStats(weaponSubType, !selectedWeaponRapidFire, false, selectedWeaponImproved)
    }

    // This function handles interaction with the very rapid fire button and updates the weapon stats.
    function handleVeryRapidFireChange() {
        setSelectedWeaponVeryRapidFire(!selectedWeaponVeryRapidFire)
        getWeaponSubTypeStats(weaponSubType, false, !selectedWeaponVeryRapidFire, selectedWeaponImproved)
    }

    // This function handles interaction with the improved button and updates the weapon stats.
    function handleImprovedChange() {
        setSelectedWeaponImproved(!selectedWeaponImproved)
        getWeaponSubTypeStats(weaponSubType, selectedWeaponRapidFire, selectedWeaponVeryRapidFire, !selectedWeaponImproved)
    }

    // This function sets the selected weapon mount (Major Mount, Secondary Mount, etc.).
    function handleWeaponMountChange(event) {
        setSelectedMountType(event.target.value)
        setWeaponSubType('')
        setSelectedWeaponType('')
        setSelectedUninstalledCargo(0)
        setSelectedWeaponCount(0)
    }

    // This function sets the selected weapon type (Beam, Gun, Missile).
    function handleWeaponTypeChange(event) {
        setSelectedWeaponType(event.target.value)
        setWeaponSubType('')
        setSelectedWeaponCount(0)
        setSelectedWeaponFixed(handleSelectedWeaponFixed(event.target.value))
    }

    // This function sets selectedWeaponFixed to true or false based on the weapon type parameter. 
    function handleSelectedWeaponFixed(weaponType) {
        switch (weaponType) {
            case "GunSpinalFront":
            case "MissileSpinalFront":
            case "BeamSpinalFront":
            case "GunSpinalRear":
            case "MissileSpinalRear":
            case "BeamSpinalRear":
            case "GunFixed":
            case "MissileFixed":
            case "BeamFixed":
                return true

            default:
                return false
        }
    }

    // This function handles interaction with the weapon sub type select and sets the 
    // relevant state variables and calls functions to set the weapon stats.
    function handleSpecificTypeChange(event) {
        setWeaponSubType(event.target.value)
        setSelectedWeaponCount(0)
        handleImprovedValid(event.target.value)
        getWeaponSubTypeStats(event.target.value, false, false, false)

    }

    // This function handles clicks on the weapon number buttons to update the number of weapons in 
    // the mount and the mount count state variables.
    function handleWeaponNumberClick(value, mountType) {
        let newValue = value + selectedWeaponCount
        let mountCount = 0

        switch (mountType) {
            case 'Spinal Mount':
            case 'Major (Front)':
            case 'Major (Middle)':
            case 'Major (Rear)':
                if (newValue <= 1 && newValue > 0) {
                    setSelectedWeaponCount(newValue)
                }
                break;

            case 'Medium (Front)':
                mountCount = currentMediumCountFront
                mountCount += newValue
                if (mountCount <= 3 && newValue > 0) {
                    setSelectedWeaponCount(newValue)
                }
                break;

            case 'Medium (Middle)':
                mountCount = currentMediumCountMid
                mountCount += newValue
                if (mountCount <= 3 && newValue > 0) {
                    setSelectedWeaponCount(newValue)
                }
                break;

            case 'Medium (Rear)':
                mountCount = currentMediumCountRear
                mountCount += newValue
                if (mountCount <= 3 && newValue > 0) {
                    setSelectedWeaponCount(newValue)
                }
                break;

            case 'Secondary (Front)':
                mountCount = currentSecondaryCountFront
                mountCount += newValue
                if (mountCount <= 10 && newValue > 0) {
                    setSelectedWeaponCount(newValue)
                }
                break;

            case 'Secondary (Middle)':
                mountCount = currentSecondaryCountMid
                mountCount += newValue
                if (mountCount <= 10 && newValue > 0) {
                    setSelectedWeaponCount(newValue)
                }
                break;

            case 'Secondary (Rear)':
                mountCount = currentSecondaryCountRear
                mountCount += newValue
                if (mountCount <= 10 && newValue > 0) {
                    setSelectedWeaponCount(newValue)
                }
                break;

            case 'Tertiary (Front)':
                mountCount = currentTertiaryCountFront
                mountCount += newValue
                if (mountCount <= 30 && newValue > 0) {
                    setSelectedWeaponCount(newValue)
                }
                break;

            case 'Tertiary (Middle)':
                mountCount = currentTertiaryCountMid
                mountCount += newValue
                if (mountCount <= 30 && newValue > 0) {
                    setSelectedWeaponCount(newValue)
                }
                break;

            case 'Tertiary (Rear)':
                mountCount = currentTertiaryCountRear
                mountCount += newValue
                if (mountCount <= 30 && newValue > 0) {
                    setSelectedWeaponCount(newValue)
                }
                break;

            default:
                break;
        }
    }


    // This function creates a weapon object with all relevant states and adds it to the weaponList state variable.
    function handleAddWeapon() {
        let newWeaponList = weaponList.slice()
        if (selectedWeaponCount > 0) {
            let weapon = {}

            function handleWeaponMissile() {
                if (weaponSubType === "Warp Missile") {
                    weapon = {
                        mountType: selectedMountType,
                        weaponType: selectedWeaponType,
                        weapon: weaponSubType,
                        fixed: selectedWeaponFixed,
                        size: selectedWeaponSize,
                        shots: selectedWeaponShots,
                        dmgDice: selectedWeaponDmgDice,
                        dmgMod: selectedWeaponDmgMod,
                        dmgMulti: selectedWeaponDmgMulti,
                        sAcc: selectedWeaponSAcc,
                        rcL: selectedWeaponRcl,
                        roF: selectedWeaponRoF,
                        dmgTypes: selectedWeaponDamageTypes,
                        range: warpMissileRange,
                        count: selectedWeaponCount,
                        moduleNumber: 0
                    }
                } else {
                    weapon = {
                        mountType: selectedMountType,
                        weaponType: selectedWeaponType,
                        weapon: weaponSubType,
                        fixed: selectedWeaponFixed,
                        size: selectedWeaponSize,
                        shots: selectedWeaponShots,
                        dmgDice: selectedWeaponDmgDice,
                        dmgMod: selectedWeaponDmgMod,
                        dmgMulti: selectedWeaponDmgMulti,
                        sAcc: selectedWeaponSAcc,
                        rcL: selectedWeaponRcl,
                        roF: selectedWeaponRoF,
                        dmgTypes: selectedWeaponDamageTypes,
                        thrust: selectedWeaponThrust,
                        burn: selectedWeaponBurn,
                        count: selectedWeaponCount,
                        moduleNumber: 0
                    }
                }
            }

            function handleWeaponGun() {
                weapon = {
                    mountType: selectedMountType,
                    weaponType: selectedWeaponType,
                    weapon: weaponSubType,
                    fixed: selectedWeaponFixed,
                    size: selectedWeaponSize,
                    shots: selectedWeaponShots,
                    dmgDice: selectedWeaponDmgDice,
                    dmgMod: selectedWeaponDmgMod,
                    dmgMulti: selectedWeaponDmgMulti,
                    sAcc: selectedWeaponSAcc,
                    rcL: selectedWeaponRcl,
                    roF: selectedWeaponRoF,
                    impulse: selectedWeaponImpulse,
                    dmgTypes: selectedWeaponDamageTypes,
                    rapidFire: selectedWeaponRapidFire,
                    veryRapidFire: selectedWeaponVeryRapidFire,
                    improved: selectedWeaponImproved,
                    count: selectedWeaponCount,
                    moduleNumber: 0
                }
            }

            function handleWeaponBeam() {
                weapon = {
                    mountType: selectedMountType,
                    weaponType: selectedWeaponType,
                    weapon: weaponSubType,
                    fixed: selectedWeaponFixed,
                    size: selectedWeaponSize,
                    dmgDice: selectedWeaponDmgDice,
                    dmgMod: selectedWeaponDmgMod,
                    dmgMulti: selectedWeaponDmgMulti,
                    armorDiv: selectedWeaponArmorDiv,
                    sAcc: selectedWeaponSAcc,
                    rcL: selectedWeaponRcl,
                    roF: selectedWeaponRoF,
                    rangeArray: selectedWeaponRangeArray,
                    dmgTypes: selectedWeaponDamageTypes,
                    rapidFire: selectedWeaponRapidFire,
                    veryRapidFire: selectedWeaponVeryRapidFire,
                    improved: selectedWeaponImproved,
                    count: selectedWeaponCount,
                    moduleNumber: 0
                }
            }

            function handleWeaponUninstalled() {
                let finalCargo = selectedUninstalledCargo * selectedWeaponCount
                let finalCost = (selectedMountCostChange * selectedWeaponCount) * -1
                let newShipWeaponsCost = shipWeaponsCost + finalCost
                let newShipWeaponsCargo = shipWeaponMountCargo + finalCargo

                weapon = {
                    mountType: selectedMountType,
                    weaponType: selectedWeaponType,
                    cargo: finalCargo,
                    cost: finalCost,
                    count: selectedWeaponCount,
                    moduleNumber: 0
                }

                setWeaponsCost(newShipWeaponsCost)
                setWeaponMountCargo(newShipWeaponsCargo)
            }

            switch (selectedWeaponType) {
                case "GunSpinalFront":
                case "GunSpinalRear":
                case "GunTurret":
                case "GunFixed":
                    handleWeaponGun()
                    break;

                case "MissileSpinalFront":
                case "MissileSpinalRear":
                case "MissileTurret":
                case "MissileFixed":
                    handleWeaponMissile()
                    break;

                case "BeamSpinalFront":
                case "BeamSpinalRear":
                case "BeamTurret":
                case "BeamFixed":
                    handleWeaponBeam()
                    break;

                case "Uninstalled":
                    handleWeaponUninstalled()
                    break;

                default:
                    break;
            }

            // Each mountLocation array is [[0],[0],[0]] where each array is one section of the ship.  
            // The first array is the front, the second is the middle, and the third is the rear.
            // As weapon mounts are selected values will be added to each sub array.
            // A zero value means there is no mount in that section.
            // A value of 1 means the mount is present but not filled.
            // A value of 2 means the mount is filled
            // For example, if the ship has 2 full major front mounts and 2 empty major rear mounts 
            // shipMajorMountLocation would be [[2, 2], [0], [1, 1]].
            // The moduleNumber value (that shows which module the weapon is associated with) of each weapon object 
            // will be incremented based on the index of the mountLocation array.
            // The end result is that the moduleNumbmer value of each weapon object will be its index value plus 1.

            function resetWeaponSelection() {
                setSelectedMountType('')
                setSelectedWeaponType('')
                setWeaponSubType('')
            }

            function updateSelectedLocationCount(shipLocationCount, setLocationCount) {
                let locationCount = shipLocationCount + selectedWeaponCount
                setLocationCount(locationCount)
            }

            function updateTotalUnusedWeapons(shipUnusedWeapons, setUnusedWeapons) {
                let newUnusedWeapons = shipUnusedWeapons - selectedWeaponCount
                setUnusedWeapons(newUnusedWeapons)
            }

            function updateWeaponModuleNumber(weaponLocationArray) {
                let newModuleNumber = weaponLocationArray.findIndex(value => value === 1)
                return newModuleNumber + 1
            }

            function updateMountLocation(mountLocationArray, mountIndex, setMountLocationArray) {
                let newLocationArray = mountLocationArray.slice()
                let emptyMountIndex = newLocationArray[mountIndex].findIndex(value => value === 1)
                newLocationArray[mountIndex][emptyMountIndex] = 2
                setMountLocationArray(newLocationArray)
            }

            switch (selectedMountType) {
                case 'Spinal Mount':
                    setUnusedSpinalMounts(0)
                    resetWeaponSelection()
                    setSelectedWeaponCount(0)
                    break;

                case 'Major (Front)':
                    updateTotalUnusedWeapons(shipUnusedMajorWeapons, setUnusedMajorWeapons)
                    weapon.moduleNumber = updateWeaponModuleNumber(shipMajorMountLocation[0])
                    updateMountLocation(shipMajorMountLocation, 0, setMajorMountLocation)
                    resetWeaponSelection()
                    setSelectedWeaponCount(0)
                    break;

                case 'Major (Middle)':
                    updateTotalUnusedWeapons(shipUnusedMajorWeapons, setUnusedMajorWeapons)
                    weapon.moduleNumber = updateWeaponModuleNumber(shipMajorMountLocation[1])
                    updateMountLocation(shipMajorMountLocation, 1, setMajorMountLocation)
                    resetWeaponSelection()
                    setSelectedWeaponCount(0)
                    break;
                case 'Major (Rear)':
                    updateTotalUnusedWeapons(shipUnusedMajorWeapons, setUnusedMajorWeapons)
                    weapon.moduleNumber = updateWeaponModuleNumber(shipMajorMountLocation[2])
                    updateMountLocation(shipMajorMountLocation, 2, setMajorMountLocation)
                    resetWeaponSelection()
                    setSelectedWeaponCount(0)
                    break;

                case 'Medium (Front)':
                    weapon.moduleNumber = updateWeaponModuleNumber(shipMediumMountLocation[0])
                    updateTotalUnusedWeapons(shipUnusedMediumWeapons, setUnusedMediumWeapons)
                    if (selectedWeaponCount + currentMediumCountFront === 3) {
                        updateMountLocation(shipMediumMountLocation, 0, setMediumMountLocation)
                        setCurrentMediumCountFront(0)
                    } else {
                        updateSelectedLocationCount(currentMediumCountFront, setCurrentMediumCountFront)
                    }
                    resetWeaponSelection()
                    setSelectedWeaponCount(0)
                    break;

                case 'Medium (Middle)':
                    weapon.moduleNumber = updateWeaponModuleNumber(shipMediumMountLocation[1])
                    updateTotalUnusedWeapons(shipUnusedMediumWeapons, setUnusedMediumWeapons)
                    if (selectedWeaponCount + currentMediumCountMid === 3) {
                        updateMountLocation(shipMediumMountLocation, 1, setMediumMountLocation)
                        setCurrentMediumCountMid(0)
                    } else {
                        updateSelectedLocationCount(currentMediumCountMid, setCurrentMediumCountMid)
                    }
                    resetWeaponSelection()
                    setSelectedWeaponCount(0)
                    break;

                case 'Medium (Rear)':
                    weapon.moduleNumber = updateWeaponModuleNumber(shipMediumMountLocation[2])
                    updateTotalUnusedWeapons(shipUnusedMediumWeapons, setUnusedMediumWeapons)
                    if (selectedWeaponCount + currentMediumCountRear === 3) {
                        updateMountLocation(shipMediumMountLocation, 2, setMediumMountLocation)
                        setCurrentMediumCountRear(0)
                    } else {
                        updateSelectedLocationCount(currentMediumCountRear, setCurrentMediumCountRear)
                    }
                    resetWeaponSelection()
                    setSelectedWeaponCount(0)
                    break;

                case 'Secondary (Front)':
                    weapon.moduleNumber = updateWeaponModuleNumber(shipSecondaryMountLocation[0])
                    updateTotalUnusedWeapons(shipUnusedSecondaryWeapons, setUnusedSecondaryWeapons)
                    if (selectedWeaponCount + currentSecondaryCountFront === 10) {
                        updateMountLocation(shipSecondaryMountLocation, 0, setSecondaryMountLocation)
                        setCurrentSecondaryCountFront(0)
                    } else {
                        updateSelectedLocationCount(currentSecondaryCountFront, setCurrentSecondaryCountFront)
                    }
                    resetWeaponSelection()
                    setSelectedWeaponCount(0)
                    break;

                case 'Secondary (Middle)':
                    weapon.moduleNumber = updateWeaponModuleNumber(shipSecondaryMountLocation[1])
                    updateTotalUnusedWeapons(shipUnusedSecondaryWeapons, setUnusedSecondaryWeapons)
                    if (selectedWeaponCount + currentSecondaryCountMid === 10) {
                        updateMountLocation(shipSecondaryMountLocation, 1, setSecondaryMountLocation)
                        setCurrentSecondaryCountMid(0)
                    } else {
                        updateSelectedLocationCount(currentSecondaryCountMid, setCurrentSecondaryCountMid)
                    }
                    resetWeaponSelection()
                    setSelectedWeaponCount(0)
                    break;

                case 'Secondary (Rear)':
                    weapon.moduleNumber = updateWeaponModuleNumber(shipSecondaryMountLocation[2])
                    updateTotalUnusedWeapons(shipUnusedSecondaryWeapons, setUnusedSecondaryWeapons)
                    if (selectedWeaponCount + currentSecondaryCountRear === 10) {
                        updateMountLocation(shipSecondaryMountLocation, 2, setSecondaryMountLocation)
                        setCurrentSecondaryCountRear(0)
                    } else {
                        updateSelectedLocationCount(currentSecondaryCountRear, setCurrentSecondaryCountRear)
                    }
                    resetWeaponSelection()
                    setSelectedWeaponCount(0)
                    break;

                case 'Tertiary (Front)':
                    weapon.moduleNumber = updateWeaponModuleNumber(shipTertiaryMountLocation[0])
                    updateTotalUnusedWeapons(shipUnusedTertiaryWeapons, setUnusedTertiaryWeapons)
                    if (selectedWeaponCount + currentTertiaryCountFront === 30) {
                        updateMountLocation(shipTertiaryMountLocation, 0, setTertiaryMountLocation)
                        setCurrentTertiaryCountFront(0)
                    } else {
                        updateSelectedLocationCount(currentTertiaryCountFront, setCurrentTertiaryCountFront)
                    }
                    resetWeaponSelection()
                    setSelectedWeaponCount(0)
                    break;

                case 'Tertiary (Middle)':
                    weapon.moduleNumber = updateWeaponModuleNumber(shipTertiaryMountLocation[1])
                    updateTotalUnusedWeapons(shipUnusedTertiaryWeapons, setUnusedTertiaryWeapons)
                    if (selectedWeaponCount + currentTertiaryCountMid === 30) {
                        updateMountLocation(shipTertiaryMountLocation, 1, setTertiaryMountLocation)
                        setCurrentTertiaryCountMid(0)
                    } else {
                        updateSelectedLocationCount(currentTertiaryCountMid, setCurrentTertiaryCountMid)
                    }
                    resetWeaponSelection()
                    setSelectedWeaponCount(0)
                    break;

                case 'Tertiary (Rear)':
                    weapon.moduleNumber = updateWeaponModuleNumber(shipTertiaryMountLocation[2])
                    updateTotalUnusedWeapons(shipUnusedTertiaryWeapons, setUnusedTertiaryWeapons)
                    if (selectedWeaponCount + currentTertiaryCountRear === 30) {
                        updateMountLocation(shipTertiaryMountLocation, 2, setTertiaryMountLocation)
                        setCurrentTertiaryCountRear(0)
                    } else {
                        updateSelectedLocationCount(currentTertiaryCountRear, setCurrentTertiaryCountRear)
                    }
                    resetWeaponSelection()
                    setSelectedWeaponCount(0)
                    break;

                default:
                    break;
            }

            newWeaponList.push(weapon);
            setWeaponList(newWeaponList);
        }
    }

    // This function deletes the weapon object removes it from the weaponList state variable.
    function handleDeleteWeapon(weapon, weaponIndex) {

        function updateWeaponListSingle() {
            let newWeaponList = weaponList.slice()
            newWeaponList.splice(weaponIndex, 1)
            setWeaponList(newWeaponList)
        }

        function updateWeaponListMulti() {
            let newWeaponList = weaponList.slice()
            const deletedWeaponMount = { moduleNumber: weapon.moduleNumber, mountType: weapon.mountType }
            const deleteTheseWeapons = findMatchingWeapons(deletedWeaponMount)
            let newWeaponsCost = shipWeaponsCost
            let newWeaponsCargo = shipWeaponMountCargo

            function findMatchingWeapons(deletedWeaponMount) {
                return newWeaponList.filter(weapon =>
                    weapon.moduleNumber === deletedWeaponMount.moduleNumber &&
                    weapon.mountType === deletedWeaponMount.mountType
                );
            }

            deleteTheseWeapons.forEach(deletedWeapon => {
                if (deletedWeapon.weaponType === "Uninstalled") {
                    newWeaponsCost += deletedWeapon.cost * -1
                    newWeaponsCargo += deletedWeapon.cargo * -1
                }

                const index = newWeaponList.findIndex(weapon =>
                    weapon.moduleNumber === deletedWeapon.moduleNumber &&
                    weapon.mountType === deletedWeapon.mountType
                );
                if (index !== -1) {
                    newWeaponList.splice(index, 1);
                }
            });

            setWeaponMountCargo(newWeaponsCargo)
            setWeaponsCost(newWeaponsCost)
            setWeaponList(newWeaponList)
        }

        function updateLocationArray(arrayIndex, hullSection, mountLocationArray, setMountLocationArray) {
            let newLocationArray = mountLocationArray.slice()
            newLocationArray[hullSection][arrayIndex] = 1
            setMountLocationArray(newLocationArray)
        }

        function deleteSingleWeapon(hullSection, mountLocationArray, setMountLocationArray) {
            updateLocationArray(weapon.moduleNumber - 1, hullSection, mountLocationArray, setMountLocationArray)
            updateWeaponListSingle()
        }

        function deleteMultiWeapon(weaponCount, hullSection, mountLocationArray, setMountLocationArray) {
            if (weaponCount !== 0) {
                // Do nothing, add an error message saying the current mount cannot be partially filled.
            } else {
                updateLocationArray(weapon.moduleNumber - 1, hullSection, mountLocationArray, setMountLocationArray)
                updateWeaponListMulti()
            }
        }

        switch (weapon.mountType) {
            case 'Spinal Mount':
                updateWeaponListSingle()
                setUnusedSpinalMounts(1)
                break;
            case 'Major (Front)':
                deleteSingleWeapon(0, shipMajorMountLocation, setMajorMountLocation)
                break;
            case 'Major (Middle)':
                deleteSingleWeapon(1, shipMajorMountLocation, setMajorMountLocation)
                break;
            case 'Major (Rear)':
                deleteSingleWeapon(2, shipMajorMountLocation, setMajorMountLocation)
                break;
            case 'Medium (Front)':
                deleteMultiWeapon(currentMediumCountFront, 0, shipMediumMountLocation, setMediumMountLocation)
                break;
            case 'Medium (Middle)':
                deleteMultiWeapon(currentMediumCountMid, 1, shipMediumMountLocation, setMediumMountLocation)
                break;
            case 'Medium (Rear)':
                deleteMultiWeapon(currentMediumCountRear, 2, shipMediumMountLocation, setMediumMountLocation)
                break;
            case 'Secondary (Front)':
                deleteMultiWeapon(currentSecondaryCountFront, 0, shipSecondaryMountLocation, setSecondaryMountLocation)
                break;
            case 'Secondary (Middle)':
                deleteMultiWeapon(currentSecondaryCountMid, 1, shipSecondaryMountLocation, setSecondaryMountLocation)
                break;
            case 'Secondary (Rear)':
                deleteMultiWeapon(currentSecondaryCountRear, 2, shipSecondaryMountLocation, setSecondaryMountLocation)
                break;
            case 'Tertiary (Front)':
                deleteMultiWeapon(currentTertiaryCountFront, 0, shipTertiaryMountLocation, setTertiaryMountLocation)
                break;
            case 'Tertiary (Middle)':
                deleteMultiWeapon(currentTertiaryCountMid, 1, shipTertiaryMountLocation, setTertiaryMountLocation)
                break;
            case 'Tertiary (Rear)':
                deleteMultiWeapon(currentTertiaryCountRear, 2, shipTertiaryMountLocation, setTertiaryMountLocation)
                break;

            default:
                console.log("handleDeleteWeaponClick error.")
                break;
        }

    }

    function habitatCustomizationDisplay() {
        return (
            <div className={styles.habitatSubContainer}>
                <span className={styles.habitatInfoLabelCol1}>
                    Bunk- rooms:
                </span>
                {shipBunkrooms >= 100 && <button
                    onClick={() => habitatIncrementDecrement('Bunkrooms', -100)}
                    className={styles.habitatMinus100}>
                    -100
                </button>}
                {shipBunkrooms >= 10 && <button
                    onClick={() => habitatIncrementDecrement('Bunkrooms', -10)}
                    className={styles.habitatMinus10}>
                    -10
                </button>}
                {shipBunkrooms >= 1 && <button
                    onClick={() => habitatIncrementDecrement('Bunkrooms', -1)}
                    className={styles.habitatMinus1}>
                    -1
                </button>}
                <span className={styles.habitatButton}>
                    {shipBunkrooms}
                </span>
                {shipCabins >= 1 && <button
                    onClick={() => habitatIncrementDecrement('Bunkrooms', 1)}
                    className={styles.habitatPlus1}>
                    +1
                </button>}
                {shipCabins >= 10 && <button
                    onClick={() => habitatIncrementDecrement('Bunkrooms', 10)}
                    className={styles.habitatPlus10}>
                    +10
                </button>}
                {shipCabins >= 100 && <button
                    onClick={() => habitatIncrementDecrement('Bunkrooms', 100)}
                    className={styles.habitatPlus100}>
                    +100
                </button>}
                <span className={styles.habitatInfoLabelCol1}>
                    Cells:
                </span>
                {shipCells >= 100 && <button
                    onClick={() => habitatIncrementDecrement('Cells', -100)}
                    className={styles.habitatMinus100}>
                    -100
                </button>}
                {shipCells >= 10 && <button
                    onClick={() => habitatIncrementDecrement('Cells', -10)}
                    className={styles.habitatMinus10}>
                    -10
                </button>}
                {shipCells >= 1 && <button
                    onClick={() => habitatIncrementDecrement('Cells', -1)}
                    className={styles.habitatMinus1}>
                    -1
                </button>}
                <span className={styles.habitatButton}>
                    {shipCells}
                </span>
                {shipCabins >= 1 && <button
                    onClick={() => habitatIncrementDecrement('Cells', 1)}
                    className={styles.habitatPlus1}>
                    +1
                </button>}
                {shipCabins >= 10 && <button
                    onClick={() => habitatIncrementDecrement('Cells', 10)}
                    className={styles.habitatPlus10}>
                    +10
                </button>}
                {shipCabins >= 100 && <button
                    onClick={() => habitatIncrementDecrement('Cells', 100)}
                    className={styles.habitatPlus100}>
                    +100
                </button>}
                <span className={styles.habitatInfoLabelCol1}>
                    Luxury Cabins:
                </span>
                {shipLuxuryCabins >= 100 && <button
                    onClick={() => habitatIncrementDecrement('Luxury', -100)}
                    className={styles.habitatMinus100}>
                    -100
                </button>}
                {shipLuxuryCabins >= 10 && <button
                    onClick={() => habitatIncrementDecrement('Luxury', -10)}
                    className={styles.habitatMinus10}>
                    -10
                </button>}
                {shipLuxuryCabins >= 1 && <button
                    onClick={() => habitatIncrementDecrement('Luxury', -1)}
                    className={styles.habitatMinus1}>
                    -1
                </button>}
                <span className={styles.habitatButton}>
                    {shipLuxuryCabins}
                </span>
                {shipCabins >= 2 && <button
                    onClick={() => habitatIncrementDecrement('Luxury', 1)}
                    className={styles.habitatPlus1}>
                    +1
                </button>}
                {shipCabins >= 20 && <button
                    onClick={() => habitatIncrementDecrement('Luxury', 10)}
                    className={styles.habitatPlus10}>
                    +10
                </button>}
                {shipCabins >= 200 && <button
                    onClick={() => habitatIncrementDecrement('Luxury', 100)}
                    className={styles.habitatPlus100}>
                    +100
                </button>}
                <span className={styles.habitatInfoLabelCol1}>
                    Briefing Rooms:
                </span>
                {shipBriefingRooms >= 100 && <button
                    onClick={() => habitatIncrementDecrement('Briefing', -100)}
                    className={styles.habitatMinus100}>
                    -100
                </button>}
                {shipBriefingRooms >= 10 && <button
                    onClick={() => habitatIncrementDecrement('Briefing', -10)}
                    className={styles.habitatMinus10}>
                    -10
                </button>}
                {shipBriefingRooms >= 1 && <button
                    onClick={() => habitatIncrementDecrement('Briefing', -1)}
                    className={styles.habitatMinus1}>
                    -1
                </button>}
                <span className={styles.habitatButton}>
                    {shipBriefingRooms}
                </span>
                {shipCabins >= 1 && <button
                    onClick={() => habitatIncrementDecrement('Briefing', 1)}
                    className={styles.habitatPlus1}>
                    +1
                </button>}
                {shipCabins >= 10 && <button
                    onClick={() => habitatIncrementDecrement('Briefing', 10)}
                    className={styles.habitatPlus10}>
                    +10
                </button>}
                {shipCabins >= 100 && <button
                    onClick={() => habitatIncrementDecrement('Briefing', 100)}
                    className={styles.habitatPlus100}>
                    +100
                </button>}
                <span className={styles.habitatInfoLabelCol1}>
                    Establish- ments:
                </span>
                {shipEstablishments >= 100 && <button
                    onClick={() => habitatIncrementDecrement('Establishment', -100)}
                    className={styles.habitatMinus100}>
                    -100
                </button>}
                {shipEstablishments >= 10 && <button
                    onClick={() => habitatIncrementDecrement('Establishment', -10)}
                    className={styles.habitatMinus10}>
                    -10
                </button>}
                {shipEstablishments >= 1 && <button
                    onClick={() => habitatIncrementDecrement('Establishment', -1)}
                    className={styles.habitatMinus1}>
                    -1
                </button>}
                <span className={styles.habitatButton}>
                    {shipEstablishments}
                </span>
                {shipCabins >= 2 && <button
                    onClick={() => habitatIncrementDecrement('Establishment', 1)}
                    className={styles.habitatPlus1}>
                    +1
                </button>}
                {shipCabins >= 20 && <button
                    onClick={() => habitatIncrementDecrement('Establishment', 10)}
                    className={styles.habitatPlus10}>
                    +10
                </button>}
                {shipCabins >= 200 && <button
                    onClick={() => habitatIncrementDecrement('Establishment', 100)}
                    className={styles.habitatPlus100}>
                    +100
                </button>}
                {shipTL >= 9 && < span className={styles.habitatInfoLabelCol1}>
                    Hibernation Chambers:
                </span>}
                {shipHibernationChambers >= 100 && shipTL >= 9 && <button
                    onClick={() => habitatIncrementDecrement('Hibernation', -100)}
                    className={styles.habitatMinus100}>
                    -100
                </button>}
                {shipHibernationChambers >= 10 && shipTL >= 9 && <button
                    onClick={() => habitatIncrementDecrement('Hibernation', -10)}
                    className={styles.habitatMinus10}>
                    -10
                </button>}
                {shipHibernationChambers >= 1 && shipTL >= 9 && <button
                    onClick={() => habitatIncrementDecrement('Hibernation', -1)}
                    className={styles.habitatMinus1}>
                    -1
                </button>}
                {shipTL >= 9 && <span className={styles.habitatButton}>
                    {shipHibernationChambers}
                </span>}
                {shipCabins >= 0.25 && shipTL >= 9 && <button
                    onClick={() => habitatIncrementDecrement('Hibernation', 1)}
                    className={styles.habitatPlus1}>
                    +1
                </button>}
                {shipCabins >= 2.5 && shipTL >= 9 && <button
                    onClick={() => habitatIncrementDecrement('Hibernation', 10)}
                    className={styles.habitatPlus10}>
                    +10
                </button>}
                {shipCabins >= 25 && shipTL >= 9 && <button
                    onClick={() => habitatIncrementDecrement('Hibernation', 100)}
                    className={styles.habitatPlus100}>
                    +100
                </button>}
                <span className={styles.habitatInfoLabelCol1}>
                    Labs:
                </span>
                {shipLabs >= 100 && <button
                    onClick={() => habitatIncrementDecrement('Labs', -100)}
                    className={styles.habitatMinus100}>
                    -100
                </button>}
                {shipLabs >= 10 && <button
                    onClick={() => habitatIncrementDecrement('Labs', -10)}
                    className={styles.habitatMinus10}>
                    -10
                </button>}
                {shipLabs >= 1 && <button
                    onClick={() => habitatIncrementDecrement('Labs', -1)}
                    className={styles.habitatMinus1}>
                    -1
                </button>}
                <span className={styles.habitatButton}>
                    {shipLabs}
                </span>
                {shipCabins >= 2 && <button
                    onClick={() => habitatIncrementDecrement('Labs', 1)}
                    className={styles.habitatPlus1}>
                    +1
                </button>}
                {shipCabins >= 20 && <button
                    onClick={() => habitatIncrementDecrement('Labs', 10)}
                    className={styles.habitatPlus10}>
                    +10
                </button>}
                {shipCabins >= 200 && <button
                    onClick={() => habitatIncrementDecrement('Labs', 100)}
                    className={styles.habitatPlus100}>
                    +100
                </button>}
                <span className={styles.habitatInfoLabelCol1}>
                    Physics Labs:
                </span>
                {shipPhysicsLabs >= 100 && <button
                    onClick={() => habitatIncrementDecrement('Physics Labs', -100)}
                    className={styles.habitatMinus100}>
                    -100
                </button>}
                {shipPhysicsLabs >= 10 && <button
                    onClick={() => habitatIncrementDecrement('Physics Labs', -10)}
                    className={styles.habitatMinus10}>
                    -10
                </button>}
                {shipPhysicsLabs >= 1 && <button
                    onClick={() => habitatIncrementDecrement('Physics Labs', -1)}
                    className={styles.habitatMinus1}>
                    -1
                </button>}
                <span className={styles.habitatButton}>
                    {shipPhysicsLabs}
                </span>
                {shipCabins >= 2 && <button
                    onClick={() => habitatIncrementDecrement('Physics Labs', 1)}
                    className={styles.habitatPlus1}>
                    +1
                </button>}
                {shipCabins >= 20 && <button
                    onClick={() => habitatIncrementDecrement('Physics Labs', 10)}
                    className={styles.habitatPlus10}>
                    +10
                </button>}
                {shipCabins >= 200 && <button
                    onClick={() => habitatIncrementDecrement('Physics Labs', 100)}
                    className={styles.habitatPlus100}>
                    +100
                </button>}
                {superScienceChecked === true && <span className={styles.habitatInfoLabelCol1}>
                    Science! Labs:
                </span>}
                {shipSuperScienceLabs >= 100 && superScienceChecked === true && <button
                    onClick={() => habitatIncrementDecrement('SuperScience Labs', -100)}
                    className={styles.habitatMinus100}>
                    -100
                </button>}
                {shipSuperScienceLabs >= 10 && superScienceChecked === true && <button
                    onClick={() => habitatIncrementDecrement('SuperScience Labs', -10)}
                    className={styles.habitatMinus10}>
                    -10
                </button>}
                {shipSuperScienceLabs >= 1 && superScienceChecked === true && <button
                    onClick={() => habitatIncrementDecrement('SuperScience Labs', -1)}
                    className={styles.habitatMinus1}>
                    -1
                </button>}
                {superScienceChecked === true && <span className={styles.habitatButton}>
                    {shipSuperScienceLabs}
                </span>}
                {shipCabins >= 2 && superScienceChecked === true && <button
                    onClick={() => habitatIncrementDecrement('SuperScience Labs', 1)}
                    className={styles.habitatPlus1}>
                    +1
                </button>}
                {shipCabins >= 20 && superScienceChecked === true && <button
                    onClick={() => habitatIncrementDecrement('SuperScience Labs', 10)}
                    className={styles.habitatPlus10}>
                    +10
                </button>}
                {shipCabins >= 200 && superScienceChecked === true && <button
                    onClick={() => habitatIncrementDecrement('SuperScience Labs', 100)}
                    className={styles.habitatPlus100}>
                    +100
                </button>}
                {shipTL >= 8 && <span className={styles.habitatInfoLabelCol1}>
                    Minifac (Fabricators):
                </span>}
                {shipMiniFabricators >= 100 && shipTL >= 8 && <button
                    onClick={() => habitatIncrementDecrement('Mini Fab', -100)}
                    className={styles.habitatMinus100}>
                    -100
                </button>}
                {shipMiniFabricators >= 10 && shipTL >= 8 && <button
                    onClick={() => habitatIncrementDecrement('Mini Fab', -10)}
                    className={styles.habitatMinus10}>
                    -10
                </button>}
                {shipMiniFabricators >= 1 && shipTL >= 8 && <button
                    onClick={() => habitatIncrementDecrement('Mini Fab', -1)}
                    className={styles.habitatMinus1}>
                    -1
                </button>}
                {shipTL >= 8 && <span className={styles.habitatButton}>
                    {shipMiniFabricators}
                </span>}
                {shipCabins >= 1 && shipTL >= 8 && <button
                    onClick={() => habitatIncrementDecrement('Mini Fab', 1)}
                    className={styles.habitatPlus1}>
                    +1
                </button>}
                {shipCabins >= 10 && shipTL >= 8 && <button
                    onClick={() => habitatIncrementDecrement('Mini Fab', 10)}
                    className={styles.habitatPlus10}>
                    +10
                </button>}
                {shipCabins >= 100 && shipTL >= 8 && <button
                    onClick={() => habitatIncrementDecrement('Mini Fab', 100)}
                    className={styles.habitatPlus100}>
                    +100
                </button>}
                {shipTL >= 10 && <span className={styles.habitatInfoLabelCol1}>
                    Minifac (RoboFacs):
                </span>}
                {shipMiniRoboFacs >= 100 && shipTL >= 10 && <button
                    onClick={() => habitatIncrementDecrement('Mini Robo Fab', -100)}
                    className={styles.habitatMinus100}>
                    -100
                </button>}
                {shipMiniRoboFacs >= 10 && shipTL >= 10 && <button
                    onClick={() => habitatIncrementDecrement('Mini Robo Fab', -10)}
                    className={styles.habitatMinus10}>
                    -10
                </button>}
                {shipMiniRoboFacs >= 1 && shipTL >= 10 && <button
                    onClick={() => habitatIncrementDecrement('Mini Robo Fab', -1)}
                    className={styles.habitatMinus1}>
                    -1
                </button>}
                {shipTL >= 10 && <span className={styles.habitatButton}>
                    {shipMiniRoboFacs}
                </span>}
                {shipCabins >= 1 && shipTL >= 10 && <button
                    onClick={() => habitatIncrementDecrement('Mini Robo Fab', 1)}
                    className={styles.habitatPlus1}>
                    +1
                </button>}
                {shipCabins >= 10 && shipTL >= 10 && <button
                    onClick={() => habitatIncrementDecrement('Mini Robo Fab', 10)}
                    className={styles.habitatPlus10}>
                    +10
                </button>}
                {shipCabins >= 100 && shipTL >= 10 && <button
                    onClick={() => habitatIncrementDecrement('Mini Robo Fab', 100)}
                    className={styles.habitatPlus100}>
                    +100
                </button>}
                {shipTL >= 11 && <span className={styles.habitatInfoLabelCol1}>
                    Minifac (NanoFacs):
                </span>}
                {shipMiniNanoFacs >= 100 && shipTL >= 11 && <button
                    onClick={() => habitatIncrementDecrement('Mini Nano Fab', -100)}
                    className={styles.habitatMinus100}>
                    -100
                </button>}
                {shipMiniNanoFacs >= 10 && shipTL >= 11 && <button
                    onClick={() => habitatIncrementDecrement('Mini Nano Fab', -10)}
                    className={styles.habitatMinus10}>
                    -10
                </button>}
                {shipMiniNanoFacs >= 1 && shipTL >= 11 && <button
                    onClick={() => habitatIncrementDecrement('Mini Nano Fab', -1)}
                    className={styles.habitatMinus1}>
                    -1
                </button>}
                {shipTL >= 11 && <span className={styles.habitatButton}>
                    {shipMiniNanoFacs}
                </span>}
                {shipCabins >= 1 && shipTL >= 11 && <button
                    onClick={() => habitatIncrementDecrement('Mini Nano Fab', 1)}
                    className={styles.habitatPlus1}>
                    +1
                </button>}
                {shipCabins >= 10 && shipTL >= 11 && <button
                    onClick={() => habitatIncrementDecrement('Mini Nano Fab', 10)}
                    className={styles.habitatPlus10}>
                    +10
                </button>}
                {shipCabins >= 100 && shipTL >= 11 && <button
                    onClick={() => habitatIncrementDecrement('Mini Nano Fab', 100)}
                    className={styles.habitatPlus100}>
                    +100
                </button>}
                {shipTL >= 12 && superScienceChecked === true && <span className={styles.habitatInfoLabelCol1}>
                    Minifac (Replicators):
                </span>}
                {shipMiniReplicators >= 100 && shipTL >= 12 && superScienceChecked === true && <button
                    onClick={() => habitatIncrementDecrement('Mini Rep Fab', -100)}
                    className={styles.habitatMinus100}>
                    -100
                </button>}
                {shipMiniReplicators >= 10 && shipTL >= 12 && superScienceChecked === true && <button
                    onClick={() => habitatIncrementDecrement('Mini Rep Fab', -10)}
                    className={styles.habitatMinus10}>
                    -10
                </button>}
                {shipMiniReplicators >= 1 && shipTL >= 12 && superScienceChecked === true && <button
                    onClick={() => habitatIncrementDecrement('Mini Rep Fab', -1)}
                    className={styles.habitatMinus1}>
                    -1
                </button>}
                {shipTL >= 12 && superScienceChecked === true && <span className={styles.habitatButton}>
                    {shipMiniReplicators}
                </span>}
                {shipCabins >= 1 && shipTL >= 12 && superScienceChecked === true && <button
                    onClick={() => habitatIncrementDecrement('Mini Rep Fab', 1)}
                    className={styles.habitatPlus1}>
                    +1
                </button>}
                {shipCabins >= 10 && shipTL >= 12 && superScienceChecked === true && <button
                    onClick={() => habitatIncrementDecrement('Mini Rep Fab', 10)}
                    className={styles.habitatPlus10}>
                    +10
                </button>}
                {shipCabins >= 100 && shipTL >= 12 && superScienceChecked === true && <button
                    onClick={() => habitatIncrementDecrement('Mini Rep Fab', 100)}
                    className={styles.habitatPlus100}>
                    +100
                </button>}
                <span className={styles.habitatInfoLabelCol1}>
                    Offices:
                </span>
                {shipOffices >= 100 && <button
                    onClick={() => habitatIncrementDecrement('Office', -100)}
                    className={styles.habitatMinus100}>
                    -100
                </button>}
                {shipOffices >= 10 && <button
                    onClick={() => habitatIncrementDecrement('Office', -10)}
                    className={styles.habitatMinus10}>
                    -10
                </button>}
                {shipOffices >= 1 && <button
                    onClick={() => habitatIncrementDecrement('Office', -1)}
                    className={styles.habitatMinus1}>
                    -1
                </button>}
                <span className={styles.habitatButton}>
                    {shipOffices}
                </span>
                {shipCabins >= 1 && <button
                    onClick={() => habitatIncrementDecrement('Office', 1)}
                    className={styles.habitatPlus1}>
                    +1
                </button>}
                {shipCabins >= 10 && <button
                    onClick={() => habitatIncrementDecrement('Office', 10)}
                    className={styles.habitatPlus10}>
                    +10
                </button>}
                {shipCabins >= 100 && <button
                    onClick={() => habitatIncrementDecrement('Office', 100)}
                    className={styles.habitatPlus100}>
                    +100
                </button>}
                <span className={styles.habitatInfoLabelCol1}>
                    Sick Bays:
                </span>
                {shipSickBays >= 100 && <button
                    onClick={() => habitatIncrementDecrement('Sickbay', -100)}
                    className={styles.habitatMinus100}>
                    -100
                </button>}
                {shipSickBays >= 10 && <button
                    onClick={() => habitatIncrementDecrement('Sickbay', -10)}
                    className={styles.habitatMinus10}>
                    -10
                </button>}
                {shipSickBays >= 1 && <button
                    onClick={() => habitatIncrementDecrement('Sickbay', -1)}
                    className={styles.habitatMinus1}>
                    -1
                </button>}
                <span className={styles.habitatButton}>
                    {shipSickBays}
                </span>
                {shipCabins >= 1 && <button
                    onClick={() => habitatIncrementDecrement('Sickbay', 1)}
                    className={styles.habitatPlus1}>
                    +1
                </button>}
                {shipCabins >= 10 && <button
                    onClick={() => habitatIncrementDecrement('Sickbay', 10)}
                    className={styles.habitatPlus10}>
                    +10
                </button>}
                {shipCabins >= 100 && <button
                    onClick={() => habitatIncrementDecrement('Sickbay', 100)}
                    className={styles.habitatPlus100}>
                    +100
                </button>}
                <span className={styles.habitatInfoLabelCol1}>
                    Sick Bays (Auto):
                </span>
                {shipSickBaysAuto >= 100 && <button
                    onClick={() => habitatIncrementDecrement('SickbayAuto', -100)}
                    className={styles.habitatMinus100}>
                    -100
                </button>}
                {shipSickBaysAuto >= 10 && <button
                    onClick={() => habitatIncrementDecrement('SickbayAuto', -10)}
                    className={styles.habitatMinus10}>
                    -10
                </button>}
                {shipSickBaysAuto >= 1 && <button
                    onClick={() => habitatIncrementDecrement('SickbayAuto', -1)}
                    className={styles.habitatMinus1}>
                    -1
                </button>}
                <span className={styles.habitatButton}>
                    {shipSickBaysAuto}
                </span>
                {shipCabins >= 1 && <button
                    onClick={() => habitatIncrementDecrement('SickbayAuto', 1)}
                    className={styles.habitatPlus1}>
                    +1
                </button>}
                {shipCabins >= 10 && <button
                    onClick={() => habitatIncrementDecrement('SickbayAuto', 10)}
                    className={styles.habitatPlus10}>
                    +10
                </button>}
                {shipCabins >= 100 && <button
                    onClick={() => habitatIncrementDecrement('SickbayAuto', 100)}
                    className={styles.habitatPlus100}>
                    +100
                </button>}
                {shipTL >= 12 && superScienceChecked === true && <span className={styles.habitatInfoLabelCol1}>
                    Teleport Projectors:
                </span>}
                {shipTeleportProjectors >= 100 && shipTL >= 12 && superScienceChecked === true && <button
                    onClick={() => habitatIncrementDecrement('Teleport', -100)}
                    className={styles.habitatMinus100}>
                    -100
                </button>}
                {shipTeleportProjectors >= 10 && shipTL >= 12 && superScienceChecked === true && <button
                    onClick={() => habitatIncrementDecrement('Teleport', -10)}
                    className={styles.habitatMinus10}>
                    -10
                </button>}
                {shipTeleportProjectors >= 1 && shipTL >= 12 && superScienceChecked === true && <button
                    onClick={() => habitatIncrementDecrement('Teleport', -1)}
                    className={styles.habitatMinus1}>
                    -1
                </button>}
                {shipTL >= 12 && superScienceChecked === true && <span className={styles.habitatButton}>
                    {shipTeleportProjectors}
                </span>}
                {shipCabins >= 1 && shipTL >= 12 && superScienceChecked === true && <button
                    onClick={() => habitatIncrementDecrement('Teleport', 1)}
                    className={styles.habitatPlus1}>
                    +1
                </button>}
                {shipCabins >= 10 && shipTL >= 12 && superScienceChecked === true && <button
                    onClick={() => habitatIncrementDecrement('Teleport', 10)}
                    className={styles.habitatPlus10}>
                    +10
                </button>}
                {shipCabins >= 100 && shipTL >= 12 && superScienceChecked === true && <button
                    onClick={() => habitatIncrementDecrement('Teleport', 100)}
                    className={styles.habitatPlus100}>
                    +100
                </button>}
                {shipTL >= 12 && superScienceChecked === true && <span className={styles.habitatInfoLabelCol1}>
                    Tele. Proj. (Send):
                </span>}
                {shipTeleportProjectorsSend >= 100 && shipTL >= 12 && superScienceChecked === true && <button
                    onClick={() => habitatIncrementDecrement('Teleport Send', -100)}
                    className={styles.habitatMinus100}>
                    -100
                </button>}
                {shipTeleportProjectorsSend >= 10 && shipTL >= 12 && superScienceChecked === true && <button
                    onClick={() => habitatIncrementDecrement('Teleport Send', -10)}
                    className={styles.habitatMinus10}>
                    -10
                </button>}
                {shipTeleportProjectorsSend >= 1 && shipTL >= 12 && superScienceChecked === true && <button
                    onClick={() => habitatIncrementDecrement('Teleport Send', -1)}
                    className={styles.habitatMinus1}>
                    -1
                </button>}
                {shipTL >= 12 && superScienceChecked === true && <span className={styles.habitatButton}>
                    {shipTeleportProjectorsSend}
                </span>}
                {shipCabins >= 1 && shipTL >= 12 && superScienceChecked === true && <button
                    onClick={() => habitatIncrementDecrement('Teleport Send', 1)}
                    className={styles.habitatPlus1}>
                    +1
                </button>}
                {shipCabins >= 10 && shipTL >= 12 && superScienceChecked === true && <button
                    onClick={() => habitatIncrementDecrement('Teleport Send', 10)}
                    className={styles.habitatPlus10}>
                    +10
                </button>}
                {shipCabins >= 100 && shipTL >= 12 && superScienceChecked === true && <button
                    onClick={() => habitatIncrementDecrement('Teleport Send', 100)}
                    className={styles.habitatPlus100}>
                    +100
                </button>}
                {shipTL >= 12 && superScienceChecked === true && <span className={styles.habitatInfoLabelCol1}>
                    Tele. Proj. (Receive):
                </span>}
                {shipTeleportProjectorsReceive >= 100 && shipTL >= 12 && superScienceChecked === true && <button
                    onClick={() => habitatIncrementDecrement('Teleport Receive', -100)}
                    className={styles.habitatMinus100}>
                    -100
                </button>}
                {shipTeleportProjectorsReceive >= 10 && shipTL >= 12 && superScienceChecked === true && <button
                    onClick={() => habitatIncrementDecrement('Teleport Receive', -10)}
                    className={styles.habitatMinus10}>
                    -10
                </button>}
                {shipTeleportProjectorsReceive >= 1 && shipTL >= 12 && superScienceChecked === true && <button
                    onClick={() => habitatIncrementDecrement('Teleport Receive', -1)}
                    className={styles.habitatMinus1}>
                    -1
                </button>}
                {shipTL >= 12 && superScienceChecked === true && <span className={styles.habitatButton}>
                    {shipTeleportProjectorsReceive}
                </span>}
                {shipCabins >= 1 && shipTL >= 12 && superScienceChecked === true && <button
                    onClick={() => habitatIncrementDecrement('Teleport Receive', 1)}
                    className={styles.habitatPlus1}>
                    +1
                </button>}
                {shipCabins >= 10 && shipTL >= 12 && superScienceChecked === true && <button
                    onClick={() => habitatIncrementDecrement('Teleport Receive', 10)}
                    className={styles.habitatPlus10}>
                    +10
                </button>}
                {shipCabins >= 100 && shipTL >= 12 && superScienceChecked === true && <button
                    onClick={() => habitatIncrementDecrement('Teleport Receive', 100)}
                    className={styles.habitatPlus100}>
                    +100
                </button>}
                <span className={styles.habitatInfoLabelCol1}>
                    Steerage Cargo:
                </span>
                {shipSteerageCargo >= 500 && <button
                    onClick={() => habitatIncrementDecrement('Steerage', -100)}
                    className={styles.habitatMinus100}>
                    -100
                </button>}
                {shipSteerageCargo >= 50 && <button
                    onClick={() => habitatIncrementDecrement('Steerage', -10)}
                    className={styles.habitatMinus10}>
                    -10
                </button>}
                {shipSteerageCargo >= 5 && <button
                    onClick={() => habitatIncrementDecrement('Steerage', -1)}
                    className={styles.habitatMinus1}>
                    -1
                </button>}
                <span className={styles.habitatButton}>
                    {shipSteerageCargo}
                </span>
                {shipCabins >= 1 && <button
                    onClick={() => habitatIncrementDecrement('Steerage', 1)}
                    className={styles.habitatPlus1}>
                    +1
                </button>}
                {shipCabins >= 10 && <button
                    onClick={() => habitatIncrementDecrement('Steerage', 10)}
                    className={styles.habitatPlus10}>
                    +10
                </button>}
                {shipCabins >= 100 && <button
                    onClick={() => habitatIncrementDecrement('Steerage', 100)}
                    className={styles.habitatPlus100}>
                    +100
                </button>}

            </div>
        )
    }

    function customizationDisplay() {
        return (
            <div className={isExpanded ? styles.habitatPowerContainerExpanded : styles.habitatPowerContainerCollapsed}>
                <h2 className={isExpanded ? styles.statTitleExpanded : styles.statTitleCollapsed}>Module Customization</h2>
                <span className={styles.infoTitleWarningPower}>WARNING: Changing cost here will not change the module cost, but will change the total cost on the basic stats tab.</span>
                {habitatCustomizationDisplay()}
            </div>
        )
    }

    // Customization - END
    // ****************************************************************************************************************************************************
    // ****************************************************************************************************************************************************

    // ****************************************************************************************************************************************************
    // ****************************************************************************************************************************************************
    // Design Switches and Design Features - START

    // This useEffect updates valid design features and switches based on SM, TL, and Super Science.
    useEffect(() => {
        let newValidDesignFeatures = []
        let newValidSwitches = []

        const notArmorArray = ["Armor, Ice", "Armor, Stone", "Armor, Organic", "Stasis Web", "Force Screen, TL12 Heavy", "Force Screen, TL12 Light", "Force Screen, TL11 Heavy", "Force Screen, TL11 Light", "Defensive ECM"]
        const armorPresentArray = shipModules.filter(shipModule =>
            shipModule.moduleCategory === "Armor and Survivability" && !notArmorArray.includes(shipModule.moduleKey)
        );

        function checkShipModulesIncludes(referenceArray) {
            return shipModules.filter(shipModule => referenceArray.includes(shipModule.moduleKey))
        }

        const validRamEngineArray = ["Super Antimatter Plasma Torch", "Antimatter Plasma Torch", "Antimatter Thermal Rocket", "Super Fusion Torch", "Fusion Torch", "Nuclear Thermal Rocket"]
        const validScannerArray = ["Sensor Array, Multipurpose", "Sensor Array, Science"]
        const validPseudoEngineArray = ["Super Stardrive Engine", "Stardrive Engine", "Subwarp", "Super Reactionless", "Hot Reactionless", "Standard", "Rotary"]
        const validStardriveArray = ["Super Stardrive Engine", "Stardrive Engine"]
        const validRamEnginePresentArray = checkShipModulesIncludes(validRamEngineArray)
        const validScannerPresentArray = checkShipModulesIncludes(validScannerArray);
        const validPseudoEnginePresentArray = checkShipModulesIncludes(validPseudoEngineArray);
        const validStardrivePresentArray = checkShipModulesIncludes(validStardriveArray);

        if (shipModules.length < 20) {
            newValidDesignFeatures.push("Select all modules.");
            newValidSwitches.push("Select all modules.");
        } else {
            for (const key in designFeature) {
                switch (key) {
                    case "Artificial Grav":
                    case "Grav Compensator":
                        if (superScienceChecked === true) {
                            newValidDesignFeatures.push(key)
                        }
                        break;
                    case "High Automation":
                        if (shipSM >= 12) {
                            newValidDesignFeatures.push(key)
                        }
                        break;
                    case "Total Automation":
                        newValidDesignFeatures.push(key)
                        break;
                    case "Emergency Ejection":
                        const validEjectionControlRoom = shipModules.filter(shipModule =>
                            shipModule.moduleKey === "Control Room" && shipModule.moduleLocation2 != "core"
                        );
                        if (validEjectionControlRoom.length > 0 && shipSM <= 8) {
                            newValidDesignFeatures.push(key)
                        }
                        break;
                    case "Hardened Armor":
                    case "Indestructible Armor":
                        if (armorPresentArray.length > 0) {
                            if (key === "Indestructible Armor" && superScienceChecked) {
                                newValidDesignFeatures.push(key)
                            } else if (key === "Hardened Armor") {
                                newValidDesignFeatures.push(key)
                            }
                        }
                        break;
                    case "Ram Rockets":
                        if (validRamEnginePresentArray.length > 0) {
                            newValidDesignFeatures.push(key)
                        }
                        break;
                    case "Spin Grav":
                        if (shipStreamlinedUn === "unstreamlined" && shipSM >= 8) {
                            newValidDesignFeatures.push(key)
                        }
                        break;
                    case "Dynamic Chameleon":
                        if (shipTL >= 8) {
                            newValidDesignFeatures.push(key)
                        }
                        break;
                    case "Stealth":
                        if (shipTL >= 10) {
                            newValidDesignFeatures.push(key)
                        }
                        break;
                    case "Winged":
                        if (shipStreamlinedUn === "streamlined" && shipSM <= 12) {
                            newValidDesignFeatures.push(key)
                        }
                        break;
                    default:
                        newValidDesignFeatures.push("Error.")
                        break;
                }
            }
            for (const key in designSwitch) {
                switch (key) {
                    case "Electro-Mechanical Computers":
                        newValidSwitches.push(key)
                        break;
                    case "FTL Comms":
                    case "FTL Sensors":
                        if (superScienceChecked) {
                            newValidSwitches.push(key)
                        }
                        break;
                    case "Multi Scanner":
                        if (validScannerPresentArray.length > 0 && superScienceChecked) {
                            newValidSwitches.push(key)
                        }
                        break;
                    case "Pseudo Velocity":
                        if (validPseudoEnginePresentArray.length > 0) {
                            newValidSwitches.push(key)
                        }
                        break;
                    case "Singularity Drive":
                        if (validPseudoEngineArray.length > 0 && shipSM >= shipTL - 22) {
                            newValidSwitches.push(key)
                        }
                        break;
                    case "Reactionless Stardrive":
                        if (validStardrivePresentArray.length > 0) {
                            newValidSwitches.push(key)
                        }
                        break;
                    default:
                        newValidSwitches.push("Error.")
                        break;
                }
            }
        }

        setValidDesignFeatureArray(newValidDesignFeatures)
        setValidDesignSwitchArray(newValidSwitches)
        setSelectedFeatures([])
        setSelectedSwitches([])
    }, [shipSM, shipTL, superScienceChecked, shipModules, shipStreamlinedUn])

    // This useEffect updated shipMaxGravity based on the presence of gravity related features in the selectedFeaturesArray.
    useEffect(() => {
        const spinGravObject = designFeature["Spin Grav"]
        const spinGravCostIndex = shipSM - 8
        let shipMaxGrav = 0
        let maxSpinGrav = 0
        maxSpinGrav = spinGravObject[1][spinGravCostIndex]

        if (shipSelectedFeaturesArray.includes("Artificial Grav")) {
            shipMaxGrav = 3
        } else if (shipSelectedFeaturesArray.includes("Spin Grav")) {
            shipMaxGrav = maxSpinGrav
        } else {
            shipMaxGrav = 0
        }
        setMaxGravity(shipMaxGrav)
    }, [shipSelectedFeaturesArray, shipSM])

    // This function adds the passed in design feature to the selected features state variable, removes it from the 
    // valid features variable, and updates relevant ship stats.
    function addDesignFeature(key) {
        let newValidDesignFeatures = shipValidDesignFeatureArray.slice();
        let newDesignCost = shipDesignCost;
        const keyObject = designFeature[key];
        const SMCostIndex = shipSM - 5;
        let newWorkspaces = shipWorkspaces;

        let newFeatureArray = shipSelectedFeaturesArray.slice();
        newFeatureArray.push(key);

        function removeFromValidFeatures(key) {
            let index = newValidDesignFeatures.indexOf(key)
            newValidDesignFeatures.splice(index, 1);
        }

        removeFromValidFeatures(key)
        switch (key) {
            case "Artificial Grav":
                newDesignCost += keyObject[SMCostIndex]
                break;
            case "Grav Compensator":
                newDesignCost += keyObject[SMCostIndex]
                break;
            case "High Automation":
                newWorkspaces = shipBaseWorkspaces / 10
                removeFromValidFeatures("Total Automation")
                newDesignCost += shipBaseWorkspaces * 1000000
                break;
            case "Total Automation":
                newWorkspaces = 0
                removeFromValidFeatures("High Automation")
                newDesignCost += shipBaseWorkspaces * 5000000
                break;
            case "Emergency Ejection":
                newDesignCost += 500000
                break;
            case "Hardened Armor":
                removeFromValidFeatures("Indestructible Armor")
                newDesignCost += shipHardenedArmorCost
                break;
            case "Indestructible Armor":
                removeFromValidFeatures("Hardened Armor")
                newDesignCost += shipHardenedArmorCost * 9
                setFrontdDR(Infinity)
                setMiddDR(Infinity)
                setReardDR(Infinity)
                break;
            case "Ram Rockets":
                newDesignCost += shipRamRocketCost * 4
                break;
            case "Spin Grav":
                const spinGravCostIndex = shipSM - 8
                newDesignCost += keyObject[0][spinGravCostIndex]
                break;
            case "Dynamic Chameleon":
                newDesignCost += keyObject[SMCostIndex]
                break;
            case "Stealth":
                newDesignCost += keyObject[SMCostIndex]
                break;
            case "Winged":
                newDesignCost += keyObject[SMCostIndex]
                break;
            default:
                console.log("addDesignFeature Error.")
                break;
        }
        setValidDesignFeatureArray(newValidDesignFeatures)
        setSelectedFeatures(newFeatureArray)
        setWorkspaces(newWorkspaces)
        setDesignCost(newDesignCost)
    }

    // This function handles the design feature select element click event. 
    function handleDesignFeatureChange(event) {
        addDesignFeature(event.target.value)
    }

    // This function adds the passed in design switch to the selected switches state variable, removes it from the 
    // valid switches variable, and updates relevant ship stats.
    function addDesignSwitch(key) {
        let newValidDesignSwitches = shipValidDesignSwitchArray.slice();
        let newDesignCost = shipDesignCost;
        let newComplexity = shipComplexity;

        let newSwitchArray = shipSelectedSwitchesArray.slice();
        newSwitchArray.push(key)

        function removeFromValidSwitches(key) {
            let index = newValidDesignSwitches.indexOf(key)
            newValidDesignSwitches.splice(index, 1);
        }

        removeFromValidSwitches(key)

        switch (key) {
            case "Electro-Mechanical Computers":
                switch (shipTL) {
                    case 7:
                        newComplexity = newComplexity - 1
                        break;
                    case 8:
                        newComplexity = newComplexity - 2
                        break;
                    case 9:
                        newComplexity = newComplexity - 3
                        break;
                    case 10:
                    case 11:
                    case 12:
                    case 13:
                    case 14:
                    case 15:
                        newComplexity = newComplexity - 4
                        break;
                    default:
                        break;
                }
                break;

            case "Singularity Drive":
                newDesignCost += shipSingularityDriveCost * 4
                break;
            case "FTL Comms":
            case "FTL Sensors":
            case "Multi Scanner":
            case "Pseudo Velocity":
            case "Reactionless Stardrive":
                console.log("FTL Comms, FTL Sensors, Multi Scanner, Pseudo Velocity, or Reactionless Stardrive design switches triggered.")
                break;
            default:
                console.log("addDesignSwitch Error.")
                break;
        }

        setValidDesignSwitchArray(newValidDesignSwitches)
        setSelectedSwitches(newSwitchArray)
        setComplexity(newComplexity)
        setDesignCost(newDesignCost)
    }

    // This function handles the design feature select element click event. 
    function handleDesignSwitchChange(event) {
        addDesignSwitch(event.target.value)
    }

    // This function removes the passed in design feature from the selected features state variable, adds it to the 
    // valid features variable, and updates relevant ship stats.
    function handleDeleteFeature(feature, featureIndex) {
        let newValidDesignFeatures = shipValidDesignFeatureArray.slice();
        let newDesignCost = shipDesignCost;
        const keyObject = designFeature[feature];
        const SMCostIndex = shipSM - 5;
        let newWorkspaces = shipWorkspaces;
        let newMaxGrav = shipMaxGravity;

        let newFeatureArray = shipSelectedFeaturesArray.slice();
        newFeatureArray.splice(featureIndex, 1);

        function pushToValidFeatures(feature) {
            newValidDesignFeatures.push(feature);
        }

        pushToValidFeatures(feature)
        switch (feature) {
            case "Artificial Grav":
                newDesignCost -= keyObject[SMCostIndex]
                break;
            case "Grav Compensator":
                newDesignCost -= keyObject[SMCostIndex]
                break;
            case "High Automation":
                newDesignCost -= shipBaseWorkspaces * 1000000
                newWorkspaces = shipBaseWorkspaces * 10
                pushToValidFeatures("Total Automation")
                break;
            case "Total Automation":
                newWorkspaces = shipBaseWorkspaces
                pushToValidFeatures("High Automation")
                newDesignCost -= shipBaseWorkspaces * 5000000
                break;
            case "Emergency Ejection":
                newDesignCost -= 500000
                break;
            case "Hardened Armor":
                pushToValidFeatures("Indestructible Armor")
                newDesignCost -= shipHardenedArmorCost
                break;
            case "Indestructible Armor":
                pushToValidFeatures("Hardened Armor")
                newDesignCost -= shipHardenedArmorCost * 9
                setFrontdDR(shipBaseFrontdDR)
                setMiddDR(shipBaseMiddDR)
                setReardDR(shipBaseReardDR)
                break;
            case "Ram Rockets":
                newDesignCost -= shipRamRocketCost * 4
                break;
            case "Spin Grav":
                const spinGravCostIndex = shipSM - 8
                newDesignCost -= keyObject[0][spinGravCostIndex]
                break;
            case "Dynamic Chameleon":
                newDesignCost -= keyObject[SMCostIndex]
                break;
            case "Stealth":
                newDesignCost -= keyObject[SMCostIndex]
                break;
            case "Winged":
                newDesignCost -= keyObject[SMCostIndex]
                break;
            default:
                console.log("deleteDesignFeature Error.")
                break;
        }
        setValidDesignFeatureArray(newValidDesignFeatures)
        setSelectedFeatures(newFeatureArray)
        setWorkspaces(newWorkspaces)
        setDesignCost(newDesignCost)
        setMaxGravity(newMaxGrav)
    }

    // This function removes the passed in design switch from the selected switches state variable, adds it to the 
    // valid switches variable, and updates relevant ship stats.
    function handleDeleteSwitch(designSwitch, switchIndex) {
        let newValidDesignSwitches = shipValidDesignSwitchArray.slice();
        let newDesignCost = shipDesignCost;
        let newComplexity = shipComplexity;

        let newSwitchArray = shipSelectedSwitchesArray.slice();
        newSwitchArray.splice(switchIndex, 1)

        function pushToValidSwitches(designSwitch) {
            newValidDesignSwitches.push(designSwitch);
        }

        pushToValidSwitches(designSwitch)

        switch (designSwitch) {
            case "Electro-Mechanical Computers":
                switch (shipTL) {
                    case 7:
                        newComplexity = newComplexity + 1
                        break;
                    case 8:
                        newComplexity = newComplexity + 2
                        break;
                    case 9:
                        newComplexity = newComplexity + 3
                        break;
                    case 10:
                    case 11:
                    case 12:
                    case 13:
                    case 14:
                    case 15:
                        newComplexity = newComplexity + 4
                        break;
                    default:
                        break;
                }
                break;

            case "Singularity Drive":
                newDesignCost -= shipSingularityDriveCost * 4
                break;
            case "FTL Comms":
            case "FTL Sensors":
            case "Multi Scanner":
            case "Pseudo Velocity":
            case "Reactionless Stardrive":
                console.log("FTL Comms, FTL Sensors, Multi Scanner, Pseudo Velocity, or Reactionless Stardrive design switches triggered.")
                break;
            default:
                console.log("addDesignSwitch Error.")
                break;
        }

        setValidDesignSwitchArray(newValidDesignSwitches)
        setSelectedSwitches(newSwitchArray)
        setComplexity(newComplexity)
        setDesignCost(newDesignCost)
    }

    // This function displays the design features and switches component.
    function designDisplay() {
        return (
            <div className={isExpanded ? styles.statBlockContainerExpanded : styles.statBlockContainerCollapsed}>
                <h2 className={isExpanded ? styles.statTitleExpanded : styles.statTitleCollapsed}>Ship Design</h2>
                <p className={styles.weaponExplanation}>Some design features and switches are not implemented in this
                    version of the website.</p>
                <span className={styles.freeFillWeaponLabel}>Design Features:</span>
                <select className={styles.weaponSelect} value={designFeature} onChange={handleDesignFeatureChange}>
                    <option value="">Select Design Feature</option>
                    {shipValidDesignFeatureArray.map((designFeature) => (
                        <option key={designFeature} value={designFeature}>{designFeature}</option>
                    ))}
                </select>
                <span className={styles.freeFillWeaponLabel}>Design Switches:</span>
                <select className={styles.weaponSelect} value={designSwitch} onChange={handleDesignSwitchChange}>
                    <option value="">Select Design Switch</option>
                    {shipValidDesignSwitchArray.map((designSwitch) => (
                        <option key={designSwitch} value={designSwitch}>{designSwitch}</option>
                    ))}
                </select>
                {shipSelectedFeaturesArray && <>
                    {shipSelectedFeaturesArray.map((feature, featureIndex) => (

                        <div className={styles.featureInfoContainer} key={featureIndex}>
                            <span className={styles.featureInfoValue}>Feature: </span>
                            <span className={styles.featureInfoValue}>{feature}</span>
                            <button className={styles.addWeaponButton} onClick={() => handleDeleteFeature(feature, featureIndex)}>Remove</button>
                        </div>
                    ))}
                </>}
                {shipSelectedSwitchesArray && <>
                    {shipSelectedSwitchesArray.map((designSwitch, switchIndex) => (

                        <div className={styles.featureInfoContainer} key={switchIndex}>
                            <span className={styles.featureInfoValue}>Switch: </span>
                            <span className={styles.featureInfoValue}>{designSwitch}</span>
                            <button className={styles.addWeaponButton} onClick={() => handleDeleteSwitch(designSwitch, switchIndex)}>Remove</button>
                        </div>
                    ))}
                </>}
            </div>
        )
    }

    // Weapon Stats and Options - END
    // ****************************************************************************************************************************************************
    // ****************************************************************************************************************************************************

    // ****************************************************************************************************************************************************
    // ****************************************************************************************************************************************************
    // Component JSX - START

    return (
        <div className={isExpanded ? styles.containerStyleExpanded : styles.containerStyleCollapsed}>
            <h2 className={isExpanded ? styles.titleExpanded : styles.titleCollapsed}>Create Ship Class</h2>
            <div className={isExpanded ? styles.topRow3Expanded : styles.topRow3Collapsed}>
                <span className={styles.label}>Ship Class Name:&nbsp;</span>
                <textarea value={shipClassName} onChange={handleClassNameChange} />
            </div>
            <div className={isExpanded ? styles.topRow3Expanded : styles.topRow3Collapsed}>
                <span className={styles.label}>Classification:&nbsp;</span>
                <textarea className={styles.topRowTextArea} value={shipClassClassification} onChange={handleClassificationChange} />
            </div>
            <div className={isExpanded ? styles.topRow3Expanded : styles.topRow3Collapsed}>
                <span className={styles.label}>Ship Class Designer:&nbsp;</span>
                <textarea value={shipClassDesigner} onChange={handleDesignerChange} />
            </div>
            <div className={isExpanded ? styles.topRow3Expanded : styles.topRow3Collapsed}>
                <span className={styles.label}>Ship Manufacturer:&nbsp;</span>
                <textarea value={shipClassManufacturer} onChange={handleManufacturerChange} />
            </div>
            <div className={isExpanded ? styles.topRow2Expanded : styles.topRow2Collapsed}>
                <span className={styles.label}>TL: </span>
                <select onChange={handleTLChange}>
                    <option value="7" selected>7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                </select>
            </div>
            <div className={isExpanded ? styles.topRow2Expanded : styles.topRow2Collapsed}>
                <span className={styles.label}>SM: </span>
                <select onChange={handleSMChange}>
                    <option value="5" selected>5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                </select>
            </div>
            <div className={isExpanded ? styles.topRow2Expanded : styles.topRow2Collapsed}>
                <label className={styles.label}>
                    Super Science:&nbsp;
                    <input className={styles.inputCheckbox}
                        type="checkbox"
                        checked={superScienceChecked}
                        onChange={handleSuperScienceCheckboxChange}
                    />
                </label>
            </div>
            <div className={isExpanded ? styles.topRow2Expanded : styles.topRow2Collapsed}>
                <span className={styles.label}>Un/ Streamlined:</span>
                <select onChange={handleStreamlinedUnChange}>
                    <option value="unstreamlined" selected>Unstreamlined</option>
                    <option value="streamlined">Streamlined</option>
                </select>
            </div>

            <span className={isExpanded ? styles.topRowWarningExpanded : styles.topRowWarningCollapsed}>WARNING: Changing the TL, SM, Super Science, or Un/Streamlined will reset all modules. &nbsp;WARNING: Some actions and modules allowed in the rules are not allowed in this version.  Mouse over to see details.</span>

            <span className={`${styles.buildLabel} ${isExpanded ? `${styles.buildCol1} ${styles.buildRow1}` : `${styles.buildColCollapsed} ${styles.buildRowCollapsed}`}`}>Front</span>
            <ShipModuleSelector handleSetModules={handleSetModules} styles={styles} buildCol={isExpanded ? styles.buildCol1 : styles.buildColCollapsed} buildRow={isExpanded ? styles.buildRow2 : styles.buildRowCollapsed} shipModules={shipModules} shipStreamlinedUn={shipStreamlinedUn} moduleLocation1={'front'} moduleLocation2={'hull'} moduleNumber={1} shipSM={shipSM} shipTL={shipTL} superScience={superScienceChecked} reardDR={shipReardDR} getModuleIndex={getModuleIndex} processShipModules={processShipModules} />
            <ShipModuleSelector handleSetModules={handleSetModules} styles={styles} buildCol={isExpanded ? styles.buildCol1 : styles.buildColCollapsed} buildRow={isExpanded ? styles.buildRow3 : styles.buildRowCollapsed} shipModules={shipModules} shipStreamlinedUn={shipStreamlinedUn} moduleLocation1={'front'} moduleLocation2={'hull'} moduleNumber={2} shipSM={shipSM} shipTL={shipTL} superScience={superScienceChecked} reardDR={shipReardDR} getModuleIndex={getModuleIndex} processShipModules={processShipModules} />
            <ShipModuleSelector handleSetModules={handleSetModules} styles={styles} buildCol={isExpanded ? styles.buildCol1 : styles.buildColCollapsed} buildRow={isExpanded ? styles.buildRow4 : styles.buildRowCollapsed} shipModules={shipModules} shipStreamlinedUn={shipStreamlinedUn} moduleLocation1={'front'} moduleLocation2={'hull'} moduleNumber={3} shipSM={shipSM} shipTL={shipTL} superScience={superScienceChecked} reardDR={shipReardDR} getModuleIndex={getModuleIndex} processShipModules={processShipModules} />
            <ShipModuleSelector handleSetModules={handleSetModules} styles={styles} buildCol={isExpanded ? styles.buildCol1 : styles.buildColCollapsed} buildRow={isExpanded ? styles.buildRow5 : styles.buildRowCollapsed} shipModules={shipModules} shipStreamlinedUn={shipStreamlinedUn} moduleLocation1={'front'} moduleLocation2={'hull'} moduleNumber={4} shipSM={shipSM} shipTL={shipTL} superScience={superScienceChecked} reardDR={shipReardDR} getModuleIndex={getModuleIndex} processShipModules={processShipModules} />
            <ShipModuleSelector handleSetModules={handleSetModules} styles={styles} buildCol={isExpanded ? styles.buildCol1 : styles.buildColCollapsed} buildRow={isExpanded ? styles.buildRow6 : styles.buildRowCollapsed} shipModules={shipModules} shipStreamlinedUn={shipStreamlinedUn} moduleLocation1={'front'} moduleLocation2={'hull'} moduleNumber={5} shipSM={shipSM} shipTL={shipTL} superScience={superScienceChecked} reardDR={shipReardDR} getModuleIndex={getModuleIndex} processShipModules={processShipModules} />
            <ShipModuleSelector handleSetModules={handleSetModules} styles={styles} buildCol={isExpanded ? styles.buildCol1 : styles.buildColCollapsed} buildRow={isExpanded ? styles.buildRow7 : styles.buildRowCollapsed} shipModules={shipModules} shipStreamlinedUn={shipStreamlinedUn} moduleLocation1={'front'} moduleLocation2={'hull'} moduleNumber={6} shipSM={shipSM} shipTL={shipTL} superScience={superScienceChecked} reardDR={shipReardDR} getModuleIndex={getModuleIndex} processShipModules={processShipModules} />
            <ShipModuleSelector handleSetModules={handleSetModules} styles={styles} buildCol={isExpanded ? styles.buildCol1 : styles.buildColCollapsed} buildRow={isExpanded ? styles.buildRow8 : styles.buildRowCollapsed} shipModules={shipModules} shipStreamlinedUn={shipStreamlinedUn} moduleLocation1={'front'} moduleLocation2={'core'} moduleNumber={'CoreFront'} shipSM={shipSM} shipTL={shipTL} superScience={superScienceChecked} reardDR={shipReardDR} getModuleIndex={getModuleIndex} processShipModules={processShipModules} />

            <span className={`${styles.buildLabel} ${isExpanded ? `${styles.buildCol2} ${styles.buildRow1}` : `${styles.buildColCollapsed} ${styles.buildRowCollapsed}`}`}>Middle</span>
            <ShipModuleSelector handleSetModules={handleSetModules} styles={styles} buildCol={isExpanded ? styles.buildCol2 : styles.buildColCollapsed} buildRow={isExpanded ? styles.buildRow2 : styles.buildRowCollapsed} shipModules={shipModules} shipStreamlinedUn={shipStreamlinedUn} moduleLocation1={'middle'} moduleLocation2={'hull'} moduleNumber={1} shipSM={shipSM} shipTL={shipTL} superScience={superScienceChecked} reardDR={shipReardDR} getModuleIndex={getModuleIndex} processShipModules={processShipModules} />
            <ShipModuleSelector handleSetModules={handleSetModules} styles={styles} buildCol={isExpanded ? styles.buildCol2 : styles.buildColCollapsed} buildRow={isExpanded ? styles.buildRow3 : styles.buildRowCollapsed} shipModules={shipModules} shipStreamlinedUn={shipStreamlinedUn} moduleLocation1={'middle'} moduleLocation2={'hull'} moduleNumber={2} shipSM={shipSM} shipTL={shipTL} superScience={superScienceChecked} reardDR={shipReardDR} getModuleIndex={getModuleIndex} processShipModules={processShipModules} />
            <ShipModuleSelector handleSetModules={handleSetModules} styles={styles} buildCol={isExpanded ? styles.buildCol2 : styles.buildColCollapsed} buildRow={isExpanded ? styles.buildRow4 : styles.buildRowCollapsed} shipModules={shipModules} shipStreamlinedUn={shipStreamlinedUn} moduleLocation1={'middle'} moduleLocation2={'hull'} moduleNumber={3} shipSM={shipSM} shipTL={shipTL} superScience={superScienceChecked} reardDR={shipReardDR} getModuleIndex={getModuleIndex} processShipModules={processShipModules} />
            <ShipModuleSelector handleSetModules={handleSetModules} styles={styles} buildCol={isExpanded ? styles.buildCol2 : styles.buildColCollapsed} buildRow={isExpanded ? styles.buildRow5 : styles.buildRowCollapsed} shipModules={shipModules} shipStreamlinedUn={shipStreamlinedUn} moduleLocation1={'middle'} moduleLocation2={'hull'} moduleNumber={4} shipSM={shipSM} shipTL={shipTL} superScience={superScienceChecked} reardDR={shipReardDR} getModuleIndex={getModuleIndex} processShipModules={processShipModules} />
            <ShipModuleSelector handleSetModules={handleSetModules} styles={styles} buildCol={isExpanded ? styles.buildCol2 : styles.buildColCollapsed} buildRow={isExpanded ? styles.buildRow6 : styles.buildRowCollapsed} shipModules={shipModules} shipStreamlinedUn={shipStreamlinedUn} moduleLocation1={'middle'} moduleLocation2={'hull'} moduleNumber={5} shipSM={shipSM} shipTL={shipTL} superScience={superScienceChecked} reardDR={shipReardDR} getModuleIndex={getModuleIndex} processShipModules={processShipModules} />
            <ShipModuleSelector handleSetModules={handleSetModules} styles={styles} buildCol={isExpanded ? styles.buildCol2 : styles.buildColCollapsed} buildRow={isExpanded ? styles.buildRow7 : styles.buildRowCollapsed} shipModules={shipModules} shipStreamlinedUn={shipStreamlinedUn} moduleLocation1={'middle'} moduleLocation2={'hull'} moduleNumber={6} shipSM={shipSM} shipTL={shipTL} superScience={superScienceChecked} reardDR={shipReardDR} getModuleIndex={getModuleIndex} processShipModules={processShipModules} />
            <ShipModuleSelector handleSetModules={handleSetModules} styles={styles} buildCol={isExpanded ? styles.buildCol2 : styles.buildColCollapsed} buildRow={isExpanded ? styles.buildRow8 : styles.buildRowCollapsed} shipModules={shipModules} shipStreamlinedUn={shipStreamlinedUn} moduleLocation1={'middle'} moduleLocation2={'core'} moduleNumber={'CoreMid'} shipSM={shipSM} shipTL={shipTL} superScience={superScienceChecked} reardDR={shipReardDR} getModuleIndex={getModuleIndex} processShipModules={processShipModules} />

            <span className={`${styles.buildLabel} ${isExpanded ? `${styles.buildCol3} ${styles.buildRow1}` : `${styles.buildColCollapsed} ${styles.buildRowCollapsed}`}`}>Rear</span>
            <ShipModuleSelector handleSetModules={handleSetModules} styles={styles} buildCol={isExpanded ? styles.buildCol3 : styles.buildColCollapsed} buildRow={isExpanded ? styles.buildRow2 : styles.buildRowCollapsed} shipModules={shipModules} shipStreamlinedUn={shipStreamlinedUn} moduleLocation1={'rear'} moduleLocation2={'hull'} moduleNumber={1} shipSM={shipSM} shipTL={shipTL} superScience={superScienceChecked} reardDR={shipReardDR} getModuleIndex={getModuleIndex} processShipModules={processShipModules} />
            <ShipModuleSelector handleSetModules={handleSetModules} styles={styles} buildCol={isExpanded ? styles.buildCol3 : styles.buildColCollapsed} buildRow={isExpanded ? styles.buildRow3 : styles.buildRowCollapsed} shipModules={shipModules} shipStreamlinedUn={shipStreamlinedUn} moduleLocation1={'rear'} moduleLocation2={'hull'} moduleNumber={2} shipSM={shipSM} shipTL={shipTL} superScience={superScienceChecked} reardDR={shipReardDR} getModuleIndex={getModuleIndex} processShipModules={processShipModules} />
            <ShipModuleSelector handleSetModules={handleSetModules} styles={styles} buildCol={isExpanded ? styles.buildCol3 : styles.buildColCollapsed} buildRow={isExpanded ? styles.buildRow4 : styles.buildRowCollapsed} shipModules={shipModules} shipStreamlinedUn={shipStreamlinedUn} moduleLocation1={'rear'} moduleLocation2={'hull'} moduleNumber={3} shipSM={shipSM} shipTL={shipTL} superScience={superScienceChecked} reardDR={shipReardDR} getModuleIndex={getModuleIndex} processShipModules={processShipModules} />
            <ShipModuleSelector handleSetModules={handleSetModules} styles={styles} buildCol={isExpanded ? styles.buildCol3 : styles.buildColCollapsed} buildRow={isExpanded ? styles.buildRow5 : styles.buildRowCollapsed} shipModules={shipModules} shipStreamlinedUn={shipStreamlinedUn} moduleLocation1={'rear'} moduleLocation2={'hull'} moduleNumber={4} shipSM={shipSM} shipTL={shipTL} superScience={superScienceChecked} reardDR={shipReardDR} getModuleIndex={getModuleIndex} processShipModules={processShipModules} />
            <ShipModuleSelector handleSetModules={handleSetModules} styles={styles} buildCol={isExpanded ? styles.buildCol3 : styles.buildColCollapsed} buildRow={isExpanded ? styles.buildRow6 : styles.buildRowCollapsed} shipModules={shipModules} shipStreamlinedUn={shipStreamlinedUn} moduleLocation1={'rear'} moduleLocation2={'hull'} moduleNumber={5} shipSM={shipSM} shipTL={shipTL} superScience={superScienceChecked} reardDR={shipReardDR} getModuleIndex={getModuleIndex} processShipModules={processShipModules} />
            <ShipModuleSelector handleSetModules={handleSetModules} styles={styles} buildCol={isExpanded ? styles.buildCol3 : styles.buildColCollapsed} buildRow={isExpanded ? styles.buildRow7 : styles.buildRowCollapsed} shipModules={shipModules} shipStreamlinedUn={shipStreamlinedUn} moduleLocation1={'rear'} moduleLocation2={'hull'} moduleNumber={6} shipSM={shipSM} shipTL={shipTL} superScience={superScienceChecked} reardDR={shipReardDR} getModuleIndex={getModuleIndex} processShipModules={processShipModules} />
            <ShipModuleSelector handleSetModules={handleSetModules} styles={styles} buildCol={isExpanded ? styles.buildCol3 : styles.buildColCollapsed} buildRow={isExpanded ? styles.buildRow8 : styles.buildRowCollapsed} shipModules={shipModules} shipStreamlinedUn={shipStreamlinedUn} moduleLocation1={'rear'} moduleLocation2={'core'} moduleNumber={'CoreRear'} shipSM={shipSM} shipTL={shipTL} superScience={superScienceChecked} reardDR={shipReardDR} getModuleIndex={getModuleIndex} processShipModules={processShipModules} />

            <div className={isExpanded ? styles.statComponentButtonContainerExpanded : styles.statComponentButtonContainerCollapsed}>
                <button className={styles.statComponentButton} onClick={handleBasicStatsClick}>Basic Stats</button>
                <button className={styles.statComponentButton} onClick={handleHabitatPowerClick}>Extra Stats</button>
                <button className={styles.statComponentButton} onClick={handleCustomizationClick}>Customization</button>
                <button className={styles.statComponentButton} onClick={handleShipDesignClick}>Ship Design</button>
            </div>

            {currentStatComponent === 'shipClassStatBlock' && <ShipClassStatBlock
                statsDisplay={statsDisplay}
            />}
            {currentStatComponent === 'shipHabitatPowerStats' && <ShipClassHabitatPowerWeapons
                isExpanded={isExpanded}
                styles={styles}
                powerPlantsDisplay={powerPlantsDisplay}
                habitatsDisplay={habitatsDisplay}
                weaponStatsDisplay={weaponStatsDisplay}
            />}
            {currentStatComponent === 'shipCustomization' && <ShipCustomization
                customizationDisplay={customizationDisplay}
            />}

            {currentStatComponent === 'shipDesign' && <ShipDesign
                isExpanded={isExpanded}
                styles={styles}
                designDisplay={designDisplay}
            />}

            <div className={isExpanded ? styles.classNotesExpanded : styles.classNotesCollapsed}>
                <p className={styles.label}>Class Notes:</p>
                <textarea className={isExpanded ? styles.notesAreaExpanded : styles.notesAreaCollapsed} value={classNotes} onChange={(e) => setClassNotes(e.target.value)} />
            </div>

            <div className={isExpanded ? styles.cargoContainerExpanded : styles.cargoContainerCollapsed}>
                <span className={styles.statBlockLableUPressCargo}>Unpress. Cargo:</span>
                <span className={styles.statBlockAreaUPressCargo}>{shipUPressCargo.toLocaleString()}</span>
                <span className={styles.statBlockLablePressCargo}>Pressurized Cargo:</span>
                <span className={styles.statBlockAreaPressCargo}>{shipPressCargo.toLocaleString()}</span>
                <span className={styles.habitatInfoLabelCol1}>
                    Refrigerated:
                </span>
                {shipRefrigeratedCargo >= 100 && <button
                    onClick={() => cargoIncrementDecrement('Refrigerated', -100)}
                    className={styles.habitatMinus100}>
                    -100
                </button>}
                {shipRefrigeratedCargo >= 10 && <button
                    onClick={() => cargoIncrementDecrement('Refrigerated', -10)}
                    className={styles.habitatMinus10}>
                    -10
                </button>}
                {shipRefrigeratedCargo >= 1 && <button
                    onClick={() => cargoIncrementDecrement('Refrigerated', -1)}
                    className={styles.habitatMinus1}>
                    -1
                </button>}
                <span className={styles.habitatButton}>
                    {shipRefrigeratedCargo.toLocaleString()}
                </span>
                {shipUPressCargo >= 1 && <button
                    onClick={() => cargoIncrementDecrement('Refrigerated', 1)}
                    className={styles.habitatPlus1}>
                    +1
                </button>}
                {shipUPressCargo >= 10 && <button
                    onClick={() => cargoIncrementDecrement('Refrigerated', 10)}
                    className={styles.habitatPlus10}>
                    +10
                </button>}
                {shipUPressCargo >= 100 && <button
                    onClick={() => cargoIncrementDecrement('Refrigerated', 100)}
                    className={styles.habitatPlus100}>
                    +100
                </button>}
                <span className={styles.habitatInfoLabelCol1}>
                    Shielded:
                </span>
                {shipShieldedCargo >= 100 && <button
                    onClick={() => cargoIncrementDecrement('Shielded', -100)}
                    className={styles.habitatMinus100}>
                    -100
                </button>}
                {shipShieldedCargo >= 10 && <button
                    onClick={() => cargoIncrementDecrement('Shielded', -10)}
                    className={styles.habitatMinus10}>
                    -10
                </button>}
                {shipShieldedCargo >= 1 && <button
                    onClick={() => cargoIncrementDecrement('Shielded', -1)}
                    className={styles.habitatMinus1}>
                    -1
                </button>}
                <span className={styles.habitatButton}>
                    {shipShieldedCargo.toLocaleString()}
                </span>
                {shipUPressCargo >= 2 && <button
                    onClick={() => cargoIncrementDecrement('Shielded', 1)}
                    className={styles.habitatPlus1}>
                    +1
                </button>}
                {shipUPressCargo >= 20 && <button
                    onClick={() => cargoIncrementDecrement('Shielded', 10)}
                    className={styles.habitatPlus10}>
                    +10
                </button>}
                {shipUPressCargo >= 200 && <button
                    onClick={() => cargoIncrementDecrement('Shielded', 100)}
                    className={styles.habitatPlus100}>
                    +100
                </button>}
            </div>
        </div>
    )
}

export default CreateShipClass;