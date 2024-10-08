import styles from "../styles/create-ship-class.module.scss"
import shipData from "../data/ship-data.json"
import SMData from "../data/shipSM-data.json"
import weaponData from "../data/weapon-data.json"
import weaponTables from "../data/weapon-tables.json"
import designFeature from "../data/designFeature-data.json"
import designSwitch from "../data/designSwitch-data.json"
import React, { useState, useEffect, useCallback, useRef } from 'react';
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
    const [shipMove, setMove] = useState(0);
    const [shipJumpGateArr, setJumpGateArr] = useState([]);
    const [shipMaxFTL, setMaxFTL] = useState(0);
    const [shipEngineAccelDelta, setEngineAccelDelta] = useState([]);


    // Ship Weapon, ECM, and dDR State Variables
    const [shipDisplaydDR, setDisplaydDR] = useState('0/0/0');
    const [shipFrontdDR, setFrontdDR] = useState(0);
    const [shipMiddDR, setMiddDR] = useState(0);
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
    const [shipTotalHangarCapacity, setShipTotalHangarCapacity] = useState(0);
    const [shipMiningCapacity, setMiningCapacity] = useState(0);
    const [shipRefineryCapacity, setRefineryCapacity] = useState(0);
    const [shipFacValueHour, setFacValueHour] = useState(0);
    const [shipFacWeightHour, setFacWeightHour] = useState(0);

    // Module Customization State Variables
    const [shipUncustomizedModules, setUncustomizedModules] = useState([]);
    const [shipAlreadyCustomizedModules, setAlreadyCustomizedModules] = useState([]);
    const [stardriveNeedsFuel, setStardriveNeedsFuel] = useState(false);
    const [heatSinkCount, setHeatSinkCount] = useState(0);
    const [shipAllCombinedBaysArr, setShipCombinedBaysArr] = useState([]);
    const [currentCustomizationPanel, setCurrentCustomizationPanel] = useState('Habitats');
    const [habitatsArr, setHabitatsArr] = useState([{}]);
    const [selectedHabitat, setSelectedHabitat] = useState(null);
    const [enginesArr, setEnginesArr] = useState([{}]);
    const [stardriveReactionlessArr, setStardriveReactionlessArr] = useState([]);
    const [shipFuelTanksArr, setFuelTanksArr] = useState([]);
    const [shipFuelLoad, setFuelLoad] = useState(0);
    const [shipFuelLoadObj, setFuelLoadObj] = useState({});
    const [shipFuelObj, setFuelObj] = useState({});
    const [shipValidFuelTypes, setValidFuelTypes] = useState([]);

    const [selectedMount, setSelectedMount] = useState({});
    const [shipWeaponMountsArr, setWeaponMountsArr] = useState([{}]);

    // Design Switch and Feature State Variables
    const [shipHardenedArmorCost, setHardenedArmorCost] = useState(0);
    const [shipRamRocketCost, setRamRocketCost] = useState(0);
    const [shipSingularityDriveCost, setSingularityDriveCost] = useState(0);
    const [shipValidDesignSwitchArray, setValidDesignSwitchArray] = useState([]);
    const [shipValidDesignFeatureArray, setValidDesignFeatureArray] = useState([]);
    const [shipSelectedFeaturesArray, setSelectedFeatures] = useState([]);
    const [shipSelectedSwitchesArray, setSelectedSwitches] = useState([]);
    const [shipDesignCost, setDesignCost] = useState(0)

    const shipModulesRef = useRef(shipModules);

    useEffect(() => {
        shipModulesRef.current = shipModules;
    }, [shipModules]);

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

    // This function makes deep copies of objects.
    function deepCopyObj(obj) {
        return JSON.parse(JSON.stringify(obj));
    }

    // ****************************************************************************************************************************************************
    // ****************************************************************************************************************************************************
    // Modules and Overall Ship Stats - START

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
    // useEffect(() => {
    //     if (shipDeltaV === Infinity) {
    //         setMove(`${shipAccel}/ ∞`)
    //     } else {
    //         setMove(`${shipAccel}/${shipDeltaV}`)
    //     }
    // }, [shipAccel, shipDeltaV])

    // This function handles changes to the shipModules array and updates the state variable.
    const handleSetModules = (moduleKey, moduleCategory, moduleLocation1, moduleLocation2, moduleNumber, moduleCost, moduleWorkspaces, fuelTypes, accel, mpsTank, modulePowerDemand) => {
        const [rowIndex, colIndex] = getModuleIndex(moduleLocation1, moduleNumber);

        let newModuleList = [...shipModules];

        let newModuleListObj = {
            moduleKey: moduleKey,
            moduleCategory: moduleCategory,
            moduleLocation1: moduleLocation1,
            moduleLocation2: moduleLocation2,
            moduleNumber: moduleNumber,
            baseModulePowerDemand: modulePowerDemand,
            modulePowerDemand: modulePowerDemand,
            baseModuleCost: moduleCost,
            moduleCost: moduleCost,
            baseModuleWorkspaces: moduleWorkspaces,
            moduleWorkspaces: moduleWorkspaces,
            alreadyCustomized: false
        }

        if (fuelTypes) {
            newModuleListObj.fuelTypes = fuelTypes;
        }

        function addmpsTankandDeltaV() {
            newModuleListObj.baseAccel = accel;
            newModuleListObj.accel = accel;
            newModuleListObj.basempsTank = mpsTank;
            newModuleListObj.mpsTank = mpsTank;
            newModuleListObj.fuelTypes = fuelTypes;
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
            newModuleListObj.basePowerGen = powerGen;
            newModuleListObj.powerGen = powerGen;
            newModuleListObj.internalLifespan = internalLifespan;
        }

        function addArmorValues(unstreamlinedArmor, streamlinedArmor) {
            newModuleListObj.baseModuleStreamlineddDR = streamlinedArmor;
            newModuleListObj.baseModuleUnstreamlineddDR = unstreamlinedArmor;
            newModuleListObj.moduledDR = 0;
        }

        let SMData;

        if (moduleKey !== '') {
            const moduleKeyObj = shipData[moduleKey];
            SMData = moduleKeyObj.find(module => module.SM === shipSM);
        }

        switch (moduleKey) {
            case "Control Room":
                highAndTotalAutomation();
                newModuleListObj.controlStations = SMData.ControlStations;
                newModuleListObj.defaultControlStations = SMData.ControlStations;
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
                break;
            case "Chemical, Fuel Cell":
                highAndTotalAutomation();
                reactorGenAndLife(2, shipTL === 7 ? 3 : shipTL === 8 ? 6 : shipTL === 9 ? 12 : 24);
                break;
            case "Chemical, MHD Turbine":
                highAndTotalAutomation();
                reactorGenAndLife(2, shipTL === 9 ? 6 : shipTL === 10 ? 12 : 12);
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
            case "Jump Gate":
                highAndTotalAutomation();
                newModuleListObj.maxTonnage = SMData.MaxTonnage;
                newModuleListObj.combinedGates = [];
                break;
            case "Hangar Bay":
                highAndTotalAutomation();
                newModuleListObj.hangarCapacity = SMData.Capacity;
                newModuleListObj.launchRate = SMData.LaunchRate;
                newModuleListObj.combinedBays = [[rowIndex, colIndex]];
                break;
            case "Habitat":
                highAndTotalAutomation();
                const baseCabins = SMData.Cabins;
                newModuleListObj.baseCabins = baseCabins;
                newModuleListObj.customizedCabins = { cabins: baseCabins };
                newModuleListObj.steerageCargo = 0;
                newModuleListObj.totalLifeSupport = false;
                break;
            case "Passenger Seating":
                newModuleListObj.seats = SMData.Seats;
                break;
            case "Open Space":
                highAndTotalAutomation();
                newModuleListObj.customizedAreas = {};
                newModuleListObj.baseAreas = SMData.Areas;
                break;
            case "Fuel Tank":
                newModuleListObj.customizable = true;
                newModuleListObj.assignedContents = 'Empty';
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
                newModuleListObj.accel = accel;
                newModuleListObj.pseudoVelocity = false;
                newModuleListObj.singularityDrive = false;
                newModuleListObj.driveField = false;
                newModuleListObj.negativeMassPropulsionDrive = false;
                newModuleListObj.mpsTank = Infinity
                break;
            case "Super Stardrive Engine":
            case "Stardrive Engine":
                highAndTotalAutomation();
                newModuleListObj.driveField = false;
                newModuleListObj.pseudoVelocity = false;
                newModuleListObj.singularityDrive = false;
                newModuleListObj.stardriveFuel = false;
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
                addmpsTankandDeltaV();
                newModuleListObj.ramRocket = false;
                newModuleListObj.highThrust = false;
                break;
            case "Nuclear Thermal Rocket":
                highAndTotalAutomation();
                addmpsTankandDeltaV();
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
                addmpsTankandDeltaV();
                newModuleListObj.highThrust = false;
                break;
            case "HEDM":
            case "Chemical":
            case "Nuclear Light Bulb":
            case "Nuclear Saltwater Rocket":
                highAndTotalAutomation();
                addmpsTankandDeltaV();
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
            case "Jet Engine":
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
        // console.log(JSON.stringify(newModuleList));
        setModules(newModuleList);
    }


    // const customizedCabinsKeys = [
    //     'hibernationChambers',
    //     'labs',
    //     'physicsLabs',
    //     'superScienceLabs',
    //     'miniFabs',
    //     'miniRoboFabs',
    //     'miniNanoFabs',
    //     'miniReplicators',
    //     'offices',
    //     'sickbays',
    //     'sickbaysAuto',
    //     'teleport',
    //     'teleportSend',
    //     'teleportReceive'
    // ];

    // Add conditions to check if the customized modules are still valid, and if they aren't reset customized modules.
    // Hibernation: TL 9+ SuperScience Labs: superScienceChecked Mini Fab: TL 8+ Mini Robo Fab TL 10+ Mini Nano Fab TL 11+ Mini Rep Fab TL 12+ && superScience 
    // Teleport Teleport Send Teleport Receive TL 12+ && superScienceChecked 

    // This useCallback checks if modules are still valid based on SM, TL, superScience and other variable and deletes them if they aren't.
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
                // let habitatValid = false;

                if (
                    (moduleKeyObj[0].SuperScience === true && superScienceChecked === true || moduleKeyObj[0].SuperScience === false)
                    && (moduleKeyObj[0].TL <= shipTL)
                    && (moduleKey !== 'Engine Room' || moduleKey === 'Engine Room' && shipSM <= 9)
                    && (moduleKey !== 'Open Space' || moduleKey === 'Open Space' && shipSM >= 8)
                    && (moduleKey !== 'Habitat' || moduleKey === 'Habitat' && shipSM >= 6 && shipModule.customizedCabins)
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
                    if (moduleKey === 'Habitat') {
                        setSelectedHabitat('');
                    }
                }

                function updateBaseCostAndWorkspaces() {
                    shipModule.baseModuleCost = SMData.cost;
                    shipModule.baseModuleWorkspaces = SMData.Workspaces;
                    updateAutomation();
                }

                function getInternalLifespan(basePowerGen, powerGen, baseInternalLifespan) {
                    const increment = baseInternalLifespan / basePowerGen;
                    const incrementCount = basePowerGen - powerGen;
                    const internalLifespan = baseInternalLifespan + (increment * incrementCount);
                    return Math.floor(internalLifespan);
                }

                function updateAutomation() {
                    if (shipModule.totalAutomation !== undefined) {
                        if (SMData.Workspaces === 0) {
                            shipModule.totalAutomation = false;
                        }
                    }
                    if (shipModule.highAutomation !== undefined) {
                        if (SMData.Workspaces === 0 || shipSM < 12) {
                            shipModule.highAutomation = false;
                        }
                    }
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
                                shipModule.combinedBays = [[rowIndex, colIndex]];
                                shipModule.alreadyCustomized = false;
                            }

                            shipModule.hangarCapacity = SMData.Capacity;
                            shipModule.launchRate = SMData.LaunchRate;
                            updateBaseCostAndWorkspaces();
                            break;
                        case "Habitat":
                            // const originalCabins = shipModule.baseCabins;
                            // shipModule.baseCabins = SMData.Cabins;

                            // function resetHabs() {
                            //     shipModule.customizedCabins = { cabins: SMData.Cabins };
                            //     shipModule.alreadyCustomized = false;
                            //     shipModule.steerageCargo = 0;
                            //     setSelectedHabitat('');
                            // }

                            // const hasSpecificProperties = (
                            //     shipModule.customizedCabins.hasOwnProperty('hibernationChambers') ||
                            //     shipModule.customizedCabins.hasOwnProperty('superScienceLabs') ||
                            //     shipModule.customizedCabins.hasOwnProperty('miniFabs') ||
                            //     shipModule.customizedCabins.hasOwnProperty('miniRoboFabs') ||
                            //     shipModule.customizedCabins.hasOwnProperty('miniNanoFabs') ||
                            //     shipModule.customizedCabins.hasOwnProperty('miniReplicators') ||
                            //     shipModule.customizedCabins.hasOwnProperty('teleport') ||
                            //     shipModule.customizedCabins.hasOwnProperty('teleportSend') ||
                            //     shipModule.customizedCabins.hasOwnProperty('teleportReceive')
                            // );

                            // habitatValid = !hasSpecificProperties || (
                            //     (shipModule.customizedCabins.hasOwnProperty('hibernationChambers') && shipTL >= 9) ||
                            //     (shipModule.customizedCabins.hasOwnProperty('superScienceLabs') && superScienceChecked === true) ||
                            //     (shipModule.customizedCabins.hasOwnProperty('miniFabs') && shipTL >= 8) ||
                            //     (shipModule.customizedCabins.hasOwnProperty('miniRoboFabs') && shipTL >= 10) ||
                            //     (shipModule.customizedCabins.hasOwnProperty('miniNanoFabs') && shipTL >= 11) ||
                            //     ((shipModule.customizedCabins.hasOwnProperty('miniReplicators') || shipModule.customizedCabins.hasOwnProperty('teleport') || shipModule.customizedCabins.hasOwnProperty('teleportSend') || shipModule.customizedCabins.hasOwnProperty('teleportReceive')) && shipTL >= 12 && superScienceChecked === true)
                            // );

                            // if (!habitatValid) {
                            //     resetHabs();
                            // }

                            updateBaseCostAndWorkspaces();
                            break;
                        case "Passenger Seating":
                            shipModule.seats = SMData.Seats;
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
                        case "Chemical, Fuel Cell":
                            shipModule.internalLifespan = shipTL === 7 ? 3 : shipTL === 8 ? 6 : shipTL === 9 ? 12 : 24;
                            break;
                        case "Chemical, MHD Turbine":
                            shipModule.internalLifespan = shipTL === 9 ? 6 : shipTL === 10 ? 12 : 12;
                            break;
                        case "Reactor, Super Fusion":
                            shipModule.internalLifespan = getInternalLifespan(shipModule.basePowerGen, shipModule.powerGen, shipTL === 11 ? 400 : shipTL === 12 ? 1000 : 400);
                            break;
                        case "Reactor, Antimatter":
                            shipModule.internalLifespan = getInternalLifespan(shipModule.basePowerGen, shipModule.powerGen, shipTL === 10 ? 2 : shipTL === 11 ? 20 : 200);
                            break;
                        case "Reactor, Fusion":
                            shipModule.internalLifespan = getInternalLifespan(shipModule.basePowerGen, shipModule.powerGen, shipTL === 9 ? 50 : shipTL === 10 ? 200 : shipTL === 11 ? 600 : 1500);
                            break;
                        case "Reactor, Fission":
                            shipModule.internalLifespan = getInternalLifespan(shipModule.basePowerGen, shipModule.powerGen, shipTL === 8 ? 25 : shipTL === 9 ? 50 : 75);
                            break;
                        case "Reactor, Total Conversion":
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
            setModules(newShipModules);
        }
    }, []);

    // useEffect(() => {
    //     console.log(`stardriveReactionlessArr: ${JSON.stringify(stardriveReactionlessArr)}`);
    // }, [stardriveReactionlessArr]);

    // This useEffect handles changes to the selected module array to update overall ship statistics.
    const updateShipValues = useCallback((shipModules, shipTL, shipSM) => {
        const modulesUseEffectData = shipData;
        let newShipModules = shipModules;
        let currentShipModules = shipModules;

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
        let fuelObj = {};
        let fuelLoad = 0;
        let fuelLoadObj = {};
        let jumpGate = [];
        let allCombinedBaysArr = [];
        let maxFTL = 0;
        let uPressCargo = 0;
        let pressCargo = 0;
        let refrigeratedCargo = 0;
        let shieldedCargo = 0;
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
        let stardriveNeedsFuel = false;
        let heatSinks = 0;

        let newStardriveReactionlessArr = [];

        for (let rowIndex = 0; rowIndex < newShipModules.length; rowIndex++) {
            for (let colIndex = 0; colIndex < newShipModules[rowIndex].length; colIndex++) {
                let currentModule = newShipModules[rowIndex][colIndex];
                let currentModuleKey = currentModule.moduleKey;
                if (Object.keys(currentModule).length === 0) {
                    continue;
                }
                let currentModuleLocation = currentModule.moduleLocation1;
                let currentModuleNumber = currentModule.moduleNumber;
                let moduleKeyObj = modulesUseEffectData[currentModuleKey];

                let moduleCategory = currentModule.moduleCategory;
                let modulePowerGeneration = 0;
                let modulePowerDemand = currentModule.baseModulePowerDemand;

                let SMData = moduleKeyObj.find(module => module.SM === shipSM);
                let baseModuleCost = currentModule.baseModuleCost;
                let moduleCost = currentModule.baseModuleCost;
                let moduleWorkspaces = currentModule.baseModuleWorkspaces;

                if (currentModule.powerGen !== undefined) {
                    modulePowerGeneration = currentModule.powerGen;
                }

                if (currentModule.totalAutomation !== undefined) {
                    if (currentModule.totalAutomation) {
                        const totalAutoCost = currentModule.baseModuleWorkspaces * 5000000;
                        moduleCost += totalAutoCost;
                        moduleWorkspaces = 0;
                    }
                }

                if (currentModule.highAutomation !== undefined) {
                    if (currentModule.highAutomation) {
                        const highAutoCost = currentModule.baseModuleWorkspaces * 1000000;
                        moduleCost += highAutoCost;
                        moduleWorkspaces = Math.floor(currentModule.baseModuleWorkspaces * .1);
                    }
                }

                function handleStardrive() {
                    function addReactionlessEngine(EngineType) {
                        if (newStardriveReactionlessArr.length === 0) {
                            newStardriveReactionlessArr.push({
                                title: 'Stardrive Reactionless Engines',
                                info: 'This section shows reactionless engines that are part of stardrive modules.',
                            })
                        }

                        const reactionlessEngine = modulesUseEffectData[EngineType];
                        const reactionlessEngineSM = reactionlessEngine.find(module => module.SM === shipSM);

                        if (currentModule.reactionlessEngineExtraCost) {
                            const reactionlessCost = reactionlessEngineSM.cost;
                            moduleCost += (currentModule.baseModuleCost * 2) + (reactionlessCost * 2);
                        }

                        const newReactionlessEngine = {
                            moduleKey: EngineType,
                            moduleCategory: reactionlessEngine[0].Category,
                            moduleLocation1: currentModuleLocation,
                            moduleNumber: currentModuleNumber,
                            baseAccel: reactionlessEngine[0].Accel,
                            accel: reactionlessEngine[0].Accel,
                            mpsTank: Infinity,
                        }
                        newStardriveReactionlessArr.push(newReactionlessEngine);
                    }

                    function addForceScreen(ScreenType) {
                        const forceScreen = modulesUseEffectData[ScreenType];
                        const forceScreenSM = forceScreen.find(module => module.SM === shipSM);
                        const screendDR = forceScreenSM.dDr;
                        frontdDR += screendDR * 3;
                    }

                    if (currentModule.driveField) {
                        if (shipTL <= 11) {
                            addForceScreen("Force Screen, TL11 Light");
                        } else {
                            addForceScreen("Force Screen, TL12 Light");
                        }
                    }
                    if (currentModule.singularityDrive) {
                        modulePowerDemand = 0;
                        moduleCost += currentModule.baseModuleCost * 4;
                    }
                    if (currentModule.stardriveFuel) {
                        stardriveNeedsFuel = true;
                    }
                    if (currentModule.reactionlessEngineSuper) {
                        addReactionlessEngine("Super Reactionless");
                    }
                    if (currentModule.reactionlessEngineHot) {
                        addReactionlessEngine("Hot Reactionless");
                    }
                    if (currentModule.reactionlessEngineRotary) {
                        addReactionlessEngine("Rotary");
                    }
                    if (currentModule.reactionlessEngineStandard) {
                        addReactionlessEngine("Standard");
                    }
                }

                function handleReactionEngine() {
                    if (currentModule.highThrust ?? false) {
                        currentModule.accel = currentModule.baseAccel * 2;
                        currentModule.mpsTank = currentModule.basempsTank / 2;
                    } else {
                        currentModule.accel = currentModule.baseAccel;
                        currentModule.mpsTank = currentModule.basempsTank;
                    }

                    if (currentModule.ramRocket ?? false) {
                        moduleCost += currentModule.baseModuleCost * 5;
                    } else {
                        moduleCost += currentModule.baseModuleCost;
                    }
                }

                function handleReactionlessEngine() {
                    function addForceScreen(ScreenType) {
                        const forceScreen = modulesUseEffectData[ScreenType];
                        const forceScreenSM = forceScreen.find(module => module.SM === shipSM);
                        const screendDR = forceScreenSM.dDr;
                        frontdDR += screendDR * 3;
                    }

                    if (currentModule.driveField) {
                        if (shipTL <= 11) {
                            addForceScreen("Force Screen, TL11 Light");
                        } else {
                            addForceScreen("Force Screen, TL12 Light");
                        }
                    }

                    if (currentModule.negativeMassPropulsionDrive) {
                        moduleCost += currentModule.baseModuleCost * 9;
                        modulePowerDemand = 0;
                    }

                    if (currentModule.singularityDrive) {
                        moduleCost += currentModule.baseModuleCost * 4;
                        modulePowerDemand = 0;
                    }
                }

                switch (moduleCategory) {
                    case 'Armor and Survivability':
                        if (currentModuleKey.includes('Armor')) {
                            let newdDR = currentModule.moduledDR;

                            if (currentModuleKey === "Armor, Exotic Laminate" && currentModule.indestructibleArmor) {
                                moduleCost = currentModule.baseModuleCost * 10;
                                newdDR = Infinity;
                            }
                            if (currentModule.hardenedArmor !== undefined) {
                                if (currentModule.hardenedArmor) {
                                    moduleCost = currentModule.baseModuleCost * 2;
                                }
                            }

                            switch (currentModuleLocation) {
                                case 'front':
                                    frontdDR += newdDR;
                                    break;
                                case 'middle':
                                    middDR += newdDR;
                                    break;
                                case 'rear':
                                    reardDR += newdDR;
                                    break;
                            }
                        }

                        if (currentModuleKey === 'Defensive ECM') {
                            defensiveECMTL = shipTL
                            defensiveECMBonus += 2
                        }

                        if (currentModuleKey.includes('Force Screen')) {
                            let forcedDR = currentModule.screendDR;
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
                            const habStrings = ['Cabins', 'Bunkrooms', 'Cells', 'Luxury', 'Briefing', 'Establishment', 'Hibernation', 'Labs', 'Physics Labs', 'SuperScience Labs',
                                'Mini Fab', 'Mini Robo Fab', 'Mini Nano Fab', 'Mini Rep Fab', 'Office', 'Sickbay', 'SickbayAuto', 'Teleport', 'Teleport Send', 'Teleport Receive',
                                'Steerage'];

                            const defaultNumberCabins = SMData.Cabins;
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
                                shortOccupancyPassengers += (currentModule.customizedCabins.briefingRooms ?? 0) * 10;
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
                                fabricators += currentModule.customizedCabins.miniFabs ?? 0;
                                roboFacs += currentModule.customizedCabins.miniRoboFabs ?? 0;
                                nanoFacs += currentModule.customizedCabins.miniNanoFabs ?? 0;
                                replicators += currentModule.customizedCabins.miniReplicators ?? 0;
                                sickbays += currentModule.customizedCabins.sickBays ?? 0;
                                sickbaysAuto += currentModule.customizedCabins.sickBaysAuto ?? 0;
                                teleProjectors += currentModule.customizedCabins.teleportProjectors ?? 0;
                                teleProjectorsSend += currentModule.customizedCabins.teleportProjectorsSend ?? 0;
                                teleProjectorsReceive += currentModule.customizedCabins.teleportProjectorsReceive ?? 0;

                                moduleCost += (currentModule.customizedCabins.sickBaysAuto ?? 0) * 100000;
                                moduleCost += (currentModule.customizedCabins.teleportProjectors ?? 0) * 20000000;
                                moduleCost += (currentModule.customizedCabins.teleportProjectorsSend ?? 0) * 10000000;
                                moduleCost += (currentModule.customizedCabins.teleportProjectorsReceive ?? 0) * 10000000;
                                moduleCost += (currentModule.customizedCabins.labs ?? 0) * 1000000;
                                moduleCost += (currentModule.customizedCabins.physicsLabs ?? 0) * 10000000;
                                moduleCost += (currentModule.customizedCabins.superScienceLabs ?? 0) * 30000000;

                                pressCargo += currentModule.steerageCargo;
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
                                farms += currentModule.baseAreas;
                            }
                            areas += currentModule.baseAreas;
                            shortOccupancyPassengers += 100;
                        }

                        if (currentModuleKey === 'Passenger Seating') {
                            seats += currentModule.seats;
                            shortOccupancyPassengers += currentModule.seats;
                        }
                        break;

                    case 'Engineering':
                        if (currentModuleKey === 'Control Room') {
                            if (currentModule.totalAutomation === true) {
                                controlStations = 0;
                                currentModule.controlStations = 0;
                                shortOccupancyCrew += 0;
                            } else {
                                controlStations = currentModule.controlStations;
                                shortOccupancyCrew += currentModule.controlStations;
                            }
                        }
                        if (currentModuleKey === 'Engine Room' && currentModule.totalAutomation !== true) {
                            controlStations += 1
                            shortOccupancyCrew += 1
                        }
                        break;

                    case 'Power':
                        powerGeneration += currentModule.powerGen;
                        break;

                    case 'Propulsion':
                        if (currentModuleKey === 'Fuel Tank') {
                            const key = currentModule.assignedContents;

                            if (key !== 'ThermalFluid') {
                                if (fuelObj.hasOwnProperty(key)) {
                                    fuelObj[key] += 1;
                                } else {
                                    fuelObj[key] = 1;
                                }
                            }

                            if (key !== 'ThermalFluid') {
                                if (fuelLoadObj.hasOwnProperty(key)) {
                                    fuelLoadObj[key] += currentModule.fuelLoad;
                                } else {
                                    fuelLoadObj[key] = currentModule.fuelLoad;
                                }

                                fuelLoad += currentModule.fuelLoad;
                            } else {
                                heatSinks += 1;
                            }
                        }
                        if (currentModuleKey === 'Jump Gate') {
                            const combinedGatesExists = jumpGate.some(gate =>
                                Array.isArray(gate) &&
                                gate.length === currentModule.combinedGates.length &&
                                gate.every((value, index) => value === currentModule.combinedGates[index])
                            );

                            if (!combinedGatesExists) {
                                jumpGate.push(currentModule.combinedGates);
                            }
                        }
                        if (currentModuleKey === 'Stardrive Engine') {
                            handleStardrive(stardriveReactionlessArr);
                            maxFTL += 1
                        }
                        if (currentModuleKey === 'Super Stardrive Engine') {
                            handleStardrive(stardriveReactionlessArr);
                            maxFTL += 2
                        }
                        break;

                    case 'Utility':
                        if (currentModuleKey === 'Cargo Hold') {
                            uPressCargo += currentModule.uPressCargoCapacity;
                            refrigeratedCargo += currentModule.refrigeratedCargo;
                            shieldedCargo += currentModule.shieldedCargo
                        }
                        if (currentModuleKey === "Sensor Array, Science"
                            || currentModuleKey === "Sensor Array, Tactical"
                            || currentModuleKey === "Sensor Array, Enhanced"
                            || currentModuleKey === "Sensor Array, Multipurpose") {
                            // Is this still needed?
                        }
                        if (currentModuleKey === 'Factory, Replicator') {
                            facWeightHour += currentModule.weightPerHour;
                        } else if (currentModuleKey === 'Factory, Nanofactory' || 'Factory, Robofac' || 'Factory, Fabricator') {
                            facValueHour += currentModule.valuePerHour;
                        }
                        if (currentModuleKey === 'Hangar Bay') {
                            const combinedBaysExists = allCombinedBaysArr.some(bays =>
                                Array.isArray(bays) &&
                                bays.length === currentModule.combinedBays.length &&
                                bays.every((value, index) => value === currentModule.combinedBays[index])
                            );

                            if (!combinedBaysExists) {
                                allCombinedBaysArr.push(currentModule.combinedBays);
                                hangarCapacity += currentModule.hangarCapacity * currentModule.combinedBays.length;
                                launchRate = currentModule.launchRate;
                            }
                        }
                        if (currentModuleKey === 'Mining') {
                            miningCapacity += currentModule.tonsPerHour;
                        }
                        if (currentModuleKey === 'Refinery') {
                            refineryCapacity += currentModule.tonsPerHour;
                        }
                        break;

                    case 'Weapons':

                        if (currentModuleKey === 'Major Battery') {
                            majorMounts += 1
                        }
                        if (currentModuleKey === 'Medium Battery') {
                            mediumMounts += 1
                        }
                        if (currentModuleKey === 'Secondary Battery') {
                            secondaryMounts += 1
                        }
                        if (currentModuleKey === 'Tertiary Battery') {
                            tertiaryMounts += 1
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
                        handleReactionEngine();
                        break;

                    case 'Engine, Electric':
                        handleReactionEngine();
                        break;

                    case 'Engine, Fission':
                        handleReactionEngine();
                        break;

                    case 'Engine, Nuclear Pulse':
                        handleReactionEngine();
                        break;

                    case 'Engine, Fusion':
                        handleReactionEngine();
                        break;
                    case 'Engine, TotalConv. & Antimatter':
                        handleReactionEngine();
                        break;

                    case 'Reactionless Engine':
                        handleReactionlessEngine();
                        break;
                    default:
                        break;
                }

                cost += moduleCost;
                currentModule.moduleCost = moduleCost;
                workspaces += moduleWorkspaces;
                currentModule.moduleWorkspaces = moduleWorkspaces;
                powerDemand += modulePowerDemand;
                currentModule.modulePowerDemand = modulePowerDemand;
                powerGeneration += modulePowerGeneration;
                shortOccupancyCrew += moduleWorkspaces;

                if (currentModule.powerGen !== undefined) {
                    currentModule.powerGen = modulePowerGeneration;
                }
            }
        }

        setFrontdDR(frontdDR);
        setMiddDR(middDR);
        setReardDR(reardDR);
        setShipDefensiveECMBonus(defensiveECMBonus);
        setShipDefensiveECMTL(defensiveECMTL);
        setTotalModulesCost(cost);
        setWorkspaces(workspaces);
        setBaseWorkspaces(workspaces);
        setCabinsCapacity(cabinsCapacity);
        setLongOccupancy(longOccupancy);
        setShortOccupancy(shortOccupancyCrew + shortOccupancyPassengers);
        setShortOccupancyCrew(shortOccupancyCrew);
        setShortOccupancyPassengers(shortOccupancyPassengers);
        setShipCabins(cabinsCapacity);
        setShipAreas(areas);
        setShipSeats(seats);
        setPowerDemand(powerDemand);
        setPowerGen(powerGeneration);
        setControlStations(controlStations);
        setJumpGateArr(jumpGate);
        setMaxFTL(maxFTL);
        setUPressCargo(uPressCargo);
        setUPressCargoCapacity(uPressCargo);
        setFacValueHour(facValueHour);
        setFacWeightHour(facWeightHour);
        setShipLaunchRate(launchRate);
        setShipTotalHangarCapacity(hangarCapacity);
        setShipCombinedBaysArr(allCombinedBaysArr);
        setMiningCapacity(miningCapacity);
        setRefineryCapacity(refineryCapacity);
        setSpinalMounts(spinalMounts);
        setUnusedSpinalMounts(spinalMounts);
        setMajorMounts(majorMounts);
        setMediumMounts(mediumMounts);
        setSecondaryMounts(secondaryMounts);
        setTertiaryMounts(tertiaryMounts);
        setFuelLoad(fuelLoad);
        setFuelObj(fuelObj);
        setFuelLoadObj(fuelLoadObj);
        setStardriveNeedsFuel(stardriveNeedsFuel);
        setHeatSinkCount(heatSinks);

        setShipCabins(cabins);
        setLuxuryCabins(luxuryCabins);
        setBunkrooms(bunkrooms);
        setCells(cells);
        setHibernationChambers(hibernationChambers);
        setLabs(labs);
        setPhysicsLabs(physicsLabs);
        setSuperScienceLabs(superScienceLabs);
        setEstablishments(establishments);
        setOffices(offices);
        setBriefingRooms(briefingRooms);
        setMiniFabricators(fabricators);
        setMiniRoboFacs(roboFacs);
        setMiniNanoFacs(nanoFacs);
        setMiniReplicators(replicators);
        setSickBays(sickbays);
        setSickBaysAuto(sickbaysAuto);
        setTeleportProjectors(teleProjectors);
        setTeleportProjectorsSend(teleProjectorsSend);
        setTeleportProjectorsReceive(teleProjectorsReceive);

        setStardriveReactionlessArr(newStardriveReactionlessArr);

        // console.log(`newShipModules: ${JSON.stringify(newShipModules)}`);

        if (JSON.stringify(newShipModules) !== JSON.stringify(currentShipModules)) {
            setModules([...newShipModules]);
        }
    }, []);

    // This useEffect calls the updateShipModules and updateShipValues callbacks.
    useEffect(() => {
        updateShipModules(shipModules, shipData, shipSM, shipStreamlinedUn, shipTL, shipReardDR, superScienceChecked)
        updateShipValues(shipModules, shipTL, shipSM) // **************************************************************** Call this directly in updateShipModules?
    }, [updateShipModules, updateShipValues, shipModules, shipSM, shipStreamlinedUn, shipTL, shipReardDR, superScienceChecked]);

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
                <span className={isExpanded ? styles.statBlockArea : styles.statBlockAreaLarge}>{shipTotalHangarCapacity}</span>
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
    // function handleTotalLifeSupportChange(event) {
    //     const totalLifeSupportBoolean = event.target.checked
    //     if (totalLifeSupportBoolean === true) {
    //         setShipCabins(shipCabinsCapacity / 2)
    //         setLongOccupancy((shipCabinsCapacity / 2) * 2)
    //     } else if (totalLifeSupportBoolean === false) {
    //         setShipCabins(shipCabinsCapacity)
    //         setLongOccupancy(shipCabinsCapacity * 2)
    //     }
    //     setTotalLifeSupport(totalLifeSupportBoolean)
    //     setBunkrooms(0)
    //     setCells(0)
    //     setLuxuryCabins(0)
    //     setBriefingRooms(0)
    //     setEstablishments(0)
    //     setHibernationChambers(0)
    //     setLabs(0)
    //     setPhysicsLabs(0)
    //     setSuperScienceLabs(0)
    //     setMiniFabricators(0)
    //     setMiniNanoFacs(0)
    //     setMiniRoboFacs(0)
    //     setMiniReplicators(0)
    //     setOffices(0)
    //     setSickBays(0)
    //     setTeleportProjectors(0)
    //     setSteerageCargo(0)
    // }

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
    // useEffect(() => {
    //     setRefrigeratedCargo(0)
    //     setShieldedCargo(0)
    //     setPressCargo(0)
    //     setWeaponSubType('')
    //     setSelectedWeaponType('')
    //     setSelectedMountType('')
    //     setSelectedUninstalledCargo(0)
    //     setWeaponList([])
    //     resetWeaponStats()
    //     setTotalLifeSupport(false)
    //     setBunkrooms(0)
    //     setCells(0)
    //     setLuxuryCabins(0)
    //     setBriefingRooms(0)
    //     setEstablishments(0)
    //     setHibernationChambers(0)
    //     setLabs(0)
    //     setPhysicsLabs(0)
    //     setSuperScienceLabs(0)
    //     setMiniFabricators(0)
    //     setMiniNanoFacs(0)
    //     setMiniRoboFacs(0)
    //     setMiniReplicators(0)
    //     setOffices(0)
    //     setSickBays(0)
    //     setTeleportProjectors(0)
    //     setSteerageCargo(0)
    // }, [shipModules])

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


    const HabitatStat = ({ label, value }) => {
        return (
            <>
                <span className={styles.habitatStatsLabel}>{label}:</span>
                <span className={styles.habitatStatsValue}>{value.toLocaleString()}</span>
            </>
        );
    };

    // This function displays habitat information.
    function habitatsDisplay() {
        return (
            <div className={styles.habitatStatsSubContainer}>
                <h2 className={styles.habitatStatTitle}>Habitat Stat Block</h2>
                <HabitatStat label="Control Stations" value={shipControlStations} />
                <HabitatStat label="Workspaces" value={shipWorkspaces} />
                <HabitatStat label="Long Term Occupancy" value={shipLongOccupancy} />
                <HabitatStat label="Short Term Occupancy" value={shipShortOccupancy} />
                <HabitatStat label="Short Occ. (Crew)" value={shipShortOccupancyCrew} />
                <HabitatStat label="Short Occ. (Pax.)" value={shipShortOccupancyPassengers} />
                {shipSeats > 0 && <HabitatStat label="Ship Seats" value={shipSeats} />}
                {shipCabins > 0 && <HabitatStat label="Cabins" value={shipCabins} />}
                {shipBunkrooms > 0 && <HabitatStat label="Bunkrooms" value={shipBunkrooms} />}
                {shipAreas > 0 && <HabitatStat label="Areas" value={shipAreas} />}
                {shipHibernationChambers > 0 && <HabitatStat label="Hibernation Chambers" value={shipHibernationChambers} />}
                {shipLuxuryCabins > 0 && <HabitatStat label="Luxury Cabins" value={shipLuxuryCabins} />}
                {shipOffices > 0 && <HabitatStat label="Offices" value={shipOffices} />}
                {shipEstablishments > 0 && <HabitatStat label="Establish- ments" value={shipEstablishments} />}
                {shipCells > 0 && <HabitatStat label="Cells" value={shipCells} />}
                {shipBriefingRooms > 0 && <HabitatStat label="Briefing Rooms" value={shipBriefingRooms} />}
                {shipLabs > 0 && <HabitatStat label="Labs" value={shipLabs} />}
                {shipPhysicsLabs > 0 && <HabitatStat label="Physics Labs" value={shipPhysicsLabs} />}
                {shipSuperScienceLabs > 0 && <HabitatStat label="Super Science Labs" value={shipSuperScienceLabs} />}
                {shipMiniFabricators > 0 && <HabitatStat label="Mini- Fabs" value={shipMiniFabricators} />}
                {shipMiniRoboFacs > 0 && <HabitatStat label="Mini- Robo Fabs" value={shipMiniRoboFacs} />}
                {shipMiniNanoFacs > 0 && <HabitatStat label="Mini- Nano Fabs" value={shipMiniNanoFacs} />}
                {shipSickBays > 0 && <HabitatStat label="Sickbays" value={shipSickBays} />}
                {shipSickBaysAuto > 0 && <HabitatStat label="Auto-Sickbays" value={shipSickBaysAuto} />}
                {shipMiniReplicators > 0 && <HabitatStat label="Mini- Replicators" value={shipMiniReplicators} />}
                {shipTeleportProjectors > 0 && <HabitatStat label="Teleport Projectors" value={shipTeleportProjectors} />}
                {shipTeleportProjectorsSend > 0 && <HabitatStat label="Teleport Projectors (Send)" value={shipTeleportProjectorsSend} />}
                {shipTeleportProjectorsReceive > 0 && <HabitatStat label="Teleport Projectors (Recieve)" value={shipTeleportProjectorsReceive} />}
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
                weaponGraviticFocus: graviticFocus,
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

    // const [shipUncustomizedModules, setUncustomizedModules] = useState([]);
    // const [shipAlreadyCustomizedModules, setAlreadyCustomizedModules] = useState([]);
    useEffect(() => {
        let uncustomizedModulesArr = [];
        let alreadyCustomizedArr = [];
        processShipModules(shipModules, (shipModule) => {
            if (shipModule.customizable === true && shipModule.alreadyCustomized === false) {
                uncustomizedModulesArr.push(shipModule.moduleKey);
            }
            if (shipModule.customizable === true && shipModule.alreadyCustomized === true) {
                alreadyCustomizedArr.push(shipModule.moduleKey);
            }
        });

        setUncustomizedModules(uncustomizedModulesArr);
        setAlreadyCustomizedModules(alreadyCustomizedArr);
    }, [shipModules])

    // This useEffect updates the list of habitats that can be customized based on the ship's habitat modules.
    useEffect(() => {
        let habitatModulesArr = [];
        processShipModules(shipModules, (shipModule) => {
            if (shipModule.moduleKey === "Habitat") {
                habitatModulesArr.push(shipModule);
            }

        });

        setHabitatsArr(habitatModulesArr);
    }, [shipModules])

    // This useEffect resets selectedHabitat any time shipSM, shipTL, or superScienceChecked change.
    // This is the avoid any issues with the selectedHabitat state variable not being updated to match the shipModules variable.
    // A nice improvement in the future would be to update the selectedHabitat state variable to match the shipModules variable, but it can wait.
    // As it is all you have to do is reselected your habitat module.
    useEffect(() => {
        processShipModules(shipModulesRef.current, (shipModule) => {
            if (shipModule.moduleKey === 'Habitat') {
                const moduleKeyObj = shipData[shipModule.moduleKey];
                const SMData = moduleKeyObj.find(module => module.SM === shipSM);
                shipModule.baseCabins = SMData.Cabins;
                shipModule.customizedCabins = { cabins: SMData.Cabins };
                shipModule.totalLifeSupport = false;
                shipModule.alreadyCustomized = false;
                shipModule.steerageCargo = 0;
            }
        });
        setSelectedHabitat('');
    }, [shipSM, shipTL, superScienceChecked, setSelectedHabitat]);

    function handleHabitatChange(event) {
        const selectedModuleKey = event.target.value;
        const selectedModule = habitatsArr.find(module => module.moduleLocation1 + module.moduleNumber === selectedModuleKey);
        setSelectedHabitat(selectedModule);
    }

    function habitatIncrementDecrement(habitatType, value) {
        const [rowIndex, colIndex] = getModuleIndex(selectedHabitat.moduleLocation1, selectedHabitat.moduleNumber);

        let selectedHabitatSteerage = selectedHabitat.steerageCargo;
        let newCustomizedCabins = { ...selectedHabitat.customizedCabins };
        let newCabins = selectedHabitat.customizedCabins.cabins || 0;
        let newBunkrooms = selectedHabitat.customizedCabins.bunkrooms || 0;
        let newCells = selectedHabitat.customizedCabins.cells || 0;
        let newLuxury = selectedHabitat.customizedCabins.luxuryCabins || 0;
        let newBriefing = selectedHabitat.customizedCabins.briefingRooms || 0;
        let newEstablishments = selectedHabitat.customizedCabins.establishments || 0;
        let newHibernation = selectedHabitat.customizedCabins.hibernationChambers || 0;
        let newLabs = selectedHabitat.customizedCabins.labs || 0;
        let newPhysicsLabs = selectedHabitat.customizedCabins.physicsLabs || 0;
        let newSuperScienceLabs = selectedHabitat.customizedCabins.superScienceLabs || 0;
        let newMiniFabs = selectedHabitat.customizedCabins.miniFabs || 0;
        let newMiniRoboFabs = selectedHabitat.customizedCabins.miniRoboFabs || 0;
        let newMiniNanoFabs = selectedHabitat.customizedCabins.miniNanoFabs || 0;
        let newMiniReplicators = selectedHabitat.customizedCabins.miniReplicators || 0;
        let newOffices = selectedHabitat.customizedCabins.offices || 0;
        let newSickbays = selectedHabitat.customizedCabins.sickBays || 0;
        let newSickbaysAuto = selectedHabitat.customizedCabins.sickBaysAuto || 0;
        let newTeleport = selectedHabitat.customizedCabins.teleportProjectors || 0;
        let newTeleportSend = selectedHabitat.customizedCabins.teleportProjectorsSend || 0;
        let newTeleportReceive = selectedHabitat.customizedCabins.teleportProjectorsReceive || 0;
        let newSteerage = shipSteerageCargo;

        let newRoomValue = 0;
        let newCabinValue = 0;

        function handleIncrementDecrement(roomValue, cabinValueMultiplier, habitatType) {
            newRoomValue = roomValue + value;
            newCabinValue = newCabins - (value * cabinValueMultiplier);
            if (newRoomValue >= 0 && newCabinValue >= 0) {
                newCustomizedCabins.cabins = newCabinValue;
                if (newRoomValue === 0) {
                    delete newCustomizedCabins[habitatType];
                } else {
                    newCustomizedCabins[habitatType] = newRoomValue;
                }
            }
        }

        switch (habitatType) {
            case 'bunkrooms':
                handleIncrementDecrement(newBunkrooms, 1, 'bunkrooms');
                break;
            case 'cells':
                handleIncrementDecrement(newCells, 1, 'cells');
                break;
            case 'luxuryCabins':
                handleIncrementDecrement(newLuxury, 2, 'luxuryCabins');
                break;
            case 'briefingRooms':
                handleIncrementDecrement(newBriefing, 1, 'briefingRooms');
                break;
            case 'establishments':
                handleIncrementDecrement(newEstablishments, 2, 'establishments');
                break;
            case 'hibernationChambers':
                handleIncrementDecrement(newHibernation, 0.25, 'hibernationChambers');
                break;
            case 'labs':
                handleIncrementDecrement(newLabs, 2, 'labs');
                break;
            case 'physicsLabs':
                handleIncrementDecrement(newPhysicsLabs, 2, 'physicsLabs');
                break;
            case 'superScienceLabs':
                handleIncrementDecrement(newSuperScienceLabs, 2, 'superScienceLabs');
                break;
            case 'miniFabs':
                handleIncrementDecrement(newMiniFabs, 1, 'miniFabs');
                break;
            case 'miniRoboFabs':
                handleIncrementDecrement(newMiniRoboFabs, 1, 'miniRoboFabs');
                break;
            case 'miniNanoFabs':
                handleIncrementDecrement(newMiniNanoFabs, 1, 'miniNanoFabs');
                break;
            case 'miniReplicators':
                handleIncrementDecrement(newMiniReplicators, 1, 'miniReplicators');
                break;
            case 'offices':
                handleIncrementDecrement(newOffices, 1, 'offices');
                break;
            case 'sickBays':
                handleIncrementDecrement(newSickbays, 1, 'sickBays');
                break;
            case 'sickBaysAuto':
                handleIncrementDecrement(newSickbaysAuto, 1, 'sickBaysAuto');
                break;
            case 'teleportProjectors':
                handleIncrementDecrement(newTeleport, 1, 'teleportProjectors');
                break;
            case 'teleportProjectorsSend':
                handleIncrementDecrement(newTeleportSend, 1, 'teleportProjectorsSend');
                break;
            case 'teleportProjectorsReceive':
                handleIncrementDecrement(newTeleportReceive, 1, 'teleportProjectorsReceive');
                break;
            case 'Steerage':
                let newSteerageValue = selectedHabitat.steerageCargo + (value * 5);
                newSteerage += value * 5;
                newCabinValue = newCabins - value;
                if (newSteerageValue >= 0 && newCabinValue >= 0) {
                    setSteerageCargo(newSteerage);
                    newCustomizedCabins.cabins = newCabinValue;
                    selectedHabitatSteerage = newSteerageValue;
                }
                break;
            default:
                console.log("Unexpected value in habitatIncrementDecrement.")
                break;
        }

        setSelectedHabitat((prevState) => ({
            ...prevState,
            steerageCargo: selectedHabitatSteerage,
            customizedCabins: newCustomizedCabins
        }));

        setModules((prevModules) =>
            prevModules.map((row, i) =>
                i === rowIndex
                    ? row.map((module, j) =>
                        j === colIndex
                            ? {
                                ...module,
                                steerageCargo: selectedHabitatSteerage,
                                customizedCabins: newCustomizedCabins
                            }
                            : module
                    )
                    : row
            )
        );
    }

    function handleSelectedHabTotalLifeSupport(event) {
        const [rowIndex, colIndex] = getModuleIndex(selectedHabitat.moduleLocation1, selectedHabitat.moduleNumber);
        const baseCabins = selectedHabitat.baseCabins;
        const newTotalLifeSupport = event.target.checked;

        let newCustomizedCabins = { cabins: baseCabins };

        if (newTotalLifeSupport) {
            newCustomizedCabins = { cabins: baseCabins / 2 };
        }

        setSelectedHabitat((prevState) => ({
            ...prevState,
            totalLifeSupport: newTotalLifeSupport,
            customizedCabins: newCustomizedCabins
        }));

        setModules((prevModules) =>
            prevModules.map((row, i) =>
                i === rowIndex
                    ? row.map((module, j) =>
                        j === colIndex
                            ? {
                                ...module,
                                totalLifeSupport: newTotalLifeSupport,
                                customizedCabins: newCustomizedCabins
                            }
                            : module
                    )
                    : row
            )
        );
    }

    const HabitatButton = ({ condition, onClick, className, label }) => {
        return condition ? (
            <button onClick={onClick} className={className}>
                {label}
            </button>
        ) : null;
    };

    const HabitatSection = ({ label, habitatType, incrementValues, decrementValues, customizedCabins, habitatIncrementDecrement }) => {
        return (
            <>
                <span className={styles.habitatInfoLabelCol1}>{label}:</span>
                {decrementValues
                    .sort((a, b) => b - a) // Sort in descending order
                    .map((decValue) => (
                        <HabitatButton
                            key={`dec-${decValue}`}
                            condition={customizedCabins[habitatType] >= decValue}
                            onClick={() => habitatIncrementDecrement(habitatType, -decValue)}
                            className={styles[`habitatMinus${decValue}`]}
                            label={`-${decValue.toLocaleString()}`}
                        />
                    ))}
                <span className={styles.habitatButton}>{(customizedCabins[habitatType] || 0).toLocaleString()}</span>
                {incrementValues.map((incValue) => (
                    <HabitatButton
                        key={`inc-${incValue}`}
                        condition={customizedCabins.cabins >= incValue}
                        onClick={() => habitatIncrementDecrement(habitatType, incValue)}
                        className={styles[`habitatPlus${incValue}`]}
                        label={`+${incValue.toLocaleString()}`}
                    />
                ))}
            </>
        );
    };

    function handleSelectedTotalAutomation(event, shipModule, setFunction) {
        const [rowIndex, colIndex] = getModuleIndex(shipModule.moduleLocation1, shipModule.moduleNumber);
        const baseWorkspaces = shipModule.baseModuleWorkspaces;
        const newTotalAutomation = event.target.checked;

        let newModuleHighAutomation = shipModule.highAutomation;
        let newWorkspaces = baseWorkspaces;

        if (newTotalAutomation) {
            newWorkspaces = 0;
            newModuleHighAutomation = false;
        }

        setFunction((prevState) => ({
            ...prevState,
            moduleWorkspaces: newWorkspaces,
            highAutomation: newModuleHighAutomation,
            totalAutomation: newTotalAutomation
        }));

        setModules((prevModules) =>
            prevModules.map((row, i) =>
                i === rowIndex
                    ? row.map((module, j) =>
                        j === colIndex
                            ? {
                                ...module,
                                moduleWorkspaces: newWorkspaces,
                                highAutomation: newModuleHighAutomation,
                                totalAutomation: newTotalAutomation
                            }
                            : module
                    )
                    : row
            )
        );
    }

    function handleSelectedHighAutomation(event, shipModule, setFunction) {
        const [rowIndex, colIndex] = getModuleIndex(shipModule.moduleLocation1, shipModule.moduleNumber);
        const baseWorkspaces = shipModule.baseModuleWorkspaces;
        const newHighAutomation = event.target.checked;

        let newModuleTotalAutomation = shipModule.totalAutomation;
        let newWorkspaces = baseWorkspaces;

        if (newHighAutomation) {
            newWorkspaces = baseWorkspaces / 10;
            newModuleTotalAutomation = false;
        }

        setFunction((prevState) => ({
            ...prevState,
            moduleWorkspaces: newWorkspaces,
            highAutomation: newHighAutomation,
            totalAutomation: newModuleTotalAutomation
        }));

        setModules((prevModules) =>
            prevModules.map((row, i) =>
                i === rowIndex
                    ? row.map((module, j) =>
                        j === colIndex
                            ? {
                                ...module,
                                moduleWorkspaces: newWorkspaces,
                                highAutomation: newHighAutomation,
                                totalAutomation: newModuleTotalAutomation
                            }
                            : module
                    )
                    : row
            )
        );
    }

    // This is a component that displays all UI for customizing habitats.
    function HabitatCustomizationDisplay() {
        return (
            <div className={styles.habitatSubContainer}>
                <h2 className={isExpanded ? styles.statTitleExpanded : styles.statTitleCollapsed}>Habitat Customization</h2>
                <select className={styles.customizationSelect} value={selectedHabitat?.moduleLocation1 + selectedHabitat?.moduleNumber || ''} onChange={handleHabitatChange}>
                    <option value="">Unselected</option>
                    {habitatsArr.map((module, index) => (
                        <option key={index} value={module.moduleLocation1 + module.moduleNumber}>
                            {module.moduleLocation1} - {module.moduleNumber}
                        </option>
                    ))}
                </select>
                {selectedHabitat && (
                    <>
                        {shipTL >= 9 && (<label className={styles.lifeSuppLabel}>
                            Total Life<br />Support:
                            <input className={styles.inputCheckbox}
                                type="checkbox"
                                checked={selectedHabitat.totalLifeSupport}
                                onChange={handleSelectedHabTotalLifeSupport}
                            />
                        </label>)}
                        {selectedHabitat.baseModuleWorkspaces >= 1 && (<label className={styles.automationLabelCol1}>
                            Total Automation:
                            <input className={styles.inputCheckbox}
                                type="checkbox"
                                checked={selectedHabitat.totalAutomation}
                                onChange={(event) => handleSelectedTotalAutomation(event, selectedHabitat, setSelectedHabitat)}
                            />
                        </label>)}

                        {selectedHabitat.baseModuleWorkspaces >= 1 && shipSM >= 12 && (<label className={styles.automationLabelCol2}>
                            High Automation:
                            <input className={styles.inputCheckbox}
                                type="checkbox"
                                checked={selectedHabitat.highAutomation}
                                onChange={(event) => handleSelectedHighAutomation(event, selectedHabitat, setSelectedHabitat)}
                            />
                        </label>)}

                        <span className={styles.habitatInfoLabelCol1}>
                            Cabins:
                        </span>
                        <span className={styles.habitatButton}>
                            {(selectedHabitat.customizedCabins.cabins || 0).toLocaleString()}
                        </span>



                        <HabitatSection
                            label="Bunk- rooms"
                            habitatType="bunkrooms"
                            incrementValues={[1, 10, 100]}
                            decrementValues={[1, 10, 100]}
                            customizedCabins={selectedHabitat.customizedCabins}
                            habitatIncrementDecrement={habitatIncrementDecrement}
                        />
                        <HabitatSection
                            label="Cells"
                            habitatType="cells"
                            incrementValues={[1, 10, 100]}
                            decrementValues={[1, 10, 100]}
                            customizedCabins={selectedHabitat.customizedCabins}
                            habitatIncrementDecrement={habitatIncrementDecrement}
                        />
                        <HabitatSection
                            label="Luxury Cabins"
                            habitatType="luxuryCabins"
                            incrementValues={[1, 10, 100]}
                            decrementValues={[1, 10, 100]}
                            customizedCabins={selectedHabitat.customizedCabins}
                            habitatIncrementDecrement={habitatIncrementDecrement}
                        />
                        <HabitatSection
                            label="Briefing Rooms"
                            habitatType="briefingRooms"
                            incrementValues={[1, 10, 100]}
                            decrementValues={[1, 10, 100]}
                            customizedCabins={selectedHabitat.customizedCabins}
                            habitatIncrementDecrement={habitatIncrementDecrement}
                        />
                        <HabitatSection
                            label="Establishments"
                            habitatType="establishments"
                            incrementValues={[1, 10, 100]}
                            decrementValues={[1, 10, 100]}
                            customizedCabins={selectedHabitat.customizedCabins}
                            habitatIncrementDecrement={habitatIncrementDecrement}
                        />
                        {shipTL >= 9 && (
                            <HabitatSection
                                label="Hibernation Chambers"
                                habitatType="hibernationChambers"
                                incrementValues={[1, 10, 100]}
                                decrementValues={[1, 10, 100]}
                                customizedCabins={selectedHabitat.customizedCabins}
                                habitatIncrementDecrement={habitatIncrementDecrement}
                            />
                        )}
                        <HabitatSection
                            label="Labs"
                            habitatType="labs"
                            incrementValues={[1, 10, 100]}
                            decrementValues={[1, 10, 100]}
                            customizedCabins={selectedHabitat.customizedCabins}
                            habitatIncrementDecrement={habitatIncrementDecrement}
                        />
                        <HabitatSection
                            label="Physics Labs"
                            habitatType="physicsLabs"
                            incrementValues={[1, 10, 100]}
                            decrementValues={[1, 10, 100]}
                            customizedCabins={selectedHabitat.customizedCabins}
                            habitatIncrementDecrement={habitatIncrementDecrement}
                        />
                        {superScienceChecked && (
                            <HabitatSection
                                label="Super Science Labs"
                                habitatType="superScienceLabs"
                                incrementValues={[1, 10, 100]}
                                decrementValues={[1, 10, 100]}
                                customizedCabins={selectedHabitat.customizedCabins}
                                habitatIncrementDecrement={habitatIncrementDecrement}
                            />
                        )}
                        {shipTL >= 8 && (
                            <HabitatSection
                                label="Mini Fabs"
                                habitatType="miniFabs"
                                incrementValues={[1, 10, 100]}
                                decrementValues={[1, 10, 100]}
                                customizedCabins={selectedHabitat.customizedCabins}
                                habitatIncrementDecrement={habitatIncrementDecrement}
                            />
                        )}
                        {shipTL >= 10 && (
                            <HabitatSection
                                label="Mini Robo Fabs"
                                habitatType="miniRoboFabs"
                                incrementValues={[1, 10, 100]}
                                decrementValues={[1, 10, 100]}
                                customizedCabins={selectedHabitat.customizedCabins}
                                habitatIncrementDecrement={habitatIncrementDecrement}
                            />
                        )}
                        {shipTL >= 11 && (
                            <HabitatSection
                                label="Mini Nano Fabs"
                                habitatType="miniNanoFabs"
                                incrementValues={[1, 10, 100]}
                                decrementValues={[1, 10, 100]}
                                customizedCabins={selectedHabitat.customizedCabins}
                                habitatIncrementDecrement={habitatIncrementDecrement}
                            />
                        )}
                        {shipTL >= 12 && superScienceChecked && (
                            <HabitatSection
                                label="Mini Replicators"
                                habitatType="miniReplicators"
                                incrementValues={[1, 10, 100]}
                                decrementValues={[1, 10, 100]}
                                customizedCabins={selectedHabitat.customizedCabins}
                                habitatIncrementDecrement={habitatIncrementDecrement}
                            />
                        )}
                        <HabitatSection
                            label="Offices"
                            habitatType="offices"
                            incrementValues={[1, 10, 100]}
                            decrementValues={[1, 10, 100]}
                            customizedCabins={selectedHabitat.customizedCabins}
                            habitatIncrementDecrement={habitatIncrementDecrement}
                        />
                        <HabitatSection
                            label="Sick Bays"
                            habitatType="sickBays"
                            incrementValues={[1, 10, 100]}
                            decrementValues={[1, 10, 100]}
                            customizedCabins={selectedHabitat.customizedCabins}
                            habitatIncrementDecrement={habitatIncrementDecrement}
                        />
                        <HabitatSection
                            label="Sick Bays (Auto)"
                            habitatType="sickBaysAuto"
                            incrementValues={[1, 10, 100]}
                            decrementValues={[1, 10, 100]}
                            customizedCabins={selectedHabitat.customizedCabins}
                            habitatIncrementDecrement={habitatIncrementDecrement}
                        />
                        {shipTL >= 12 && superScienceChecked && (
                            <HabitatSection
                                label="Teleport Projectors"
                                habitatType="teleportProjectors"
                                incrementValues={[1, 10, 100]}
                                decrementValues={[1, 10, 100]}
                                customizedCabins={selectedHabitat.customizedCabins}
                                habitatIncrementDecrement={habitatIncrementDecrement}
                            />
                        )}
                        {shipTL >= 12 && superScienceChecked && (
                            <HabitatSection
                                label="Tele. Proj. (Send)"
                                habitatType="teleportProjectorsSend"
                                incrementValues={[1, 10, 100]}
                                decrementValues={[1, 10, 100]}
                                customizedCabins={selectedHabitat.customizedCabins}
                                habitatIncrementDecrement={habitatIncrementDecrement}
                            />
                        )}
                        {shipTL >= 12 && superScienceChecked && (
                            <HabitatSection
                                label="Tele. Proj. (Receive)"
                                habitatType="teleportProjectorsReceive"
                                incrementValues={[1, 10, 100]}
                                decrementValues={[1, 10, 100]}
                                customizedCabins={selectedHabitat.customizedCabins}
                                habitatIncrementDecrement={habitatIncrementDecrement}
                            />
                        )}
                        <span className={styles.habitatInfoLabelCol1}>
                            Steerage Cargo (tons):
                        </span>
                        {selectedHabitat.steerageCargo >= 500 && <button
                            onClick={() => habitatIncrementDecrement('Steerage', -100)}
                            className={styles.habitatMinus100}>
                            -100
                        </button>}
                        {selectedHabitat.steerageCargo >= 50 && <button
                            onClick={() => habitatIncrementDecrement('Steerage', -10)}
                            className={styles.habitatMinus10}>
                            -10
                        </button>}
                        {selectedHabitat.steerageCargo >= 5 && <button
                            onClick={() => habitatIncrementDecrement('Steerage', -1)}
                            className={styles.habitatMinus1}>
                            -1
                        </button>}
                        <span className={styles.habitatButton}>
                            {selectedHabitat.steerageCargo}
                        </span>
                        {selectedHabitat.customizedCabins.cabins >= 1 && <button
                            onClick={() => habitatIncrementDecrement('Steerage', 1)}
                            className={styles.habitatPlus1}>
                            +1
                        </button>}
                        {selectedHabitat.customizedCabins.cabins >= 10 && <button
                            onClick={() => habitatIncrementDecrement('Steerage', 10)}
                            className={styles.habitatPlus10}>
                            +10
                        </button>}
                        {selectedHabitat.customizedCabins.cabins >= 100 && <button
                            onClick={() => habitatIncrementDecrement('Steerage', 100)}
                            className={styles.habitatPlus100}>
                            +100
                        </button>}
                    </>
                )}
            </div>

        )
    }

    useEffect(() => {
        const engineKeys = ['Chemical', 'HEDM', 'Ion Drive', 'Mass Driver', 'Nuclear Thermal Rocket',
            'Nuclear Light Bulb', 'Nuclear Saltwater Rocket', 'External Pulsed Plasma', 'Fusion Pulse Drive',
            'Advanced Fusion Pulse Drive', 'Super Fusion Pulse Drive', 'Fusion Rocket', 'Fusion Torch',
            'Super Fusion Torch', 'Antimatter Thermal Rocket', 'Antimatter Plasma Rocket', 'Antimatter Plasma Torch',
            'Super Antimatter Plasma Torch', 'Antimatter Pion', 'Antimatter Pion Torch', 'Total Conversion Torch',
            'Super Conversion Torch', 'Rotary', 'Standard', 'Hot Reactionless', 'Super Reactionless', 'Subwarp', 'Super Stardrive Engine',
            'Stardrive Engine']

        const infoMessage = 'This section shows all engines along with customization options.';


        let newEngineModulesArr = [
            {
                title: 'Engines',
                info: infoMessage
            }
        ];

        processShipModules(shipModules, (shipModule) => {
            if (engineKeys.includes(shipModule.moduleKey)) {
                newEngineModulesArr.push(shipModule);
            }
        });

        setEnginesArr(newEngineModulesArr);
    }, [shipModules])

    function useScrollPosition() {
        const containerRef = useRef(null);
        const scrollPosition = useRef(0);

        const saveScrollPosition = () => {
            if (containerRef.current) {
                scrollPosition.current = containerRef.current.scrollTop;
            }
        };

        const restoreScrollPosition = () => {
            if (containerRef.current) {
                containerRef.current.scrollTop = scrollPosition.current;
            }
        };

        return { containerRef, saveScrollPosition, restoreScrollPosition };
    }

    const { containerRef, saveScrollPosition, restoreScrollPosition } = useScrollPosition();

    useEffect(() => {
        restoreScrollPosition();
    });

    function handleEngineTotalAutomation(event, shipModule) {
        saveScrollPosition();

        const [rowIndex, colIndex] = getModuleIndex(shipModule.moduleLocation1, shipModule.moduleNumber);
        const baseWorkspaces = shipModule.baseModuleWorkspaces;
        const newTotalAutomation = event.target.checked;

        let newHighAutomation = shipModule.highAutomation;
        let newWorkspaces = baseWorkspaces;

        if (newTotalAutomation) {
            newWorkspaces = 0;
            newHighAutomation = false;
        }

        setModules((prevModules) =>
            prevModules.map((row, i) =>
                i === rowIndex
                    ? row.map((module, j) =>
                        j === colIndex
                            ? {
                                ...module,
                                moduleWorkspaces: newWorkspaces,
                                highAutomation: newHighAutomation,
                                totalAutomation: newTotalAutomation
                            }
                            : module
                    )
                    : row
            )
        );

        restoreScrollPosition();
    }

    function handleEngineHighAutomation(event, shipModule) {
        saveScrollPosition();

        const [rowIndex, colIndex] = getModuleIndex(shipModule.moduleLocation1, shipModule.moduleNumber);
        const baseWorkspaces = shipModule.baseModuleWorkspaces;
        const newHighAutomation = event.target.checked;

        let newTotalAutomation = shipModule.totalAutomation;
        let newWorkspaces = baseWorkspaces;

        if (newHighAutomation) {
            newWorkspaces = baseWorkspaces / 10;
            newTotalAutomation = false;
        }

        setModules((prevModules) =>
            prevModules.map((row, i) =>
                i === rowIndex
                    ? row.map((module, j) =>
                        j === colIndex
                            ? {
                                ...module,
                                moduleWorkspaces: newWorkspaces,
                                highAutomation: newHighAutomation,
                                totalAutomation: newTotalAutomation
                            }
                            : module
                    )
                    : row
            )
        );

        restoreScrollPosition();
    }

    function formatFuelType(fuelType) {
        if (fuelType === undefined || fuelType === null) {
            return 'None';
        }
        return fuelType
            .replace(/([a-z])([A-Z])/g, '$1 $2') // Add space between lowercase and uppercase letters
            .replace(/([a-zA-Z])([A-Z][a-z])/g, '$1 $2') // Add space before capitalized words
            .replace(/([a-z])([A-Z])/g, '$1 $2') // Add space between lowercase and uppercase letters again for edge cases
            .replace(/([a-z])([0-9])/g, '$1 $2') // Add space between letters and numbers
            .replace(/([0-9])([A-Z])/g, '$1 $2') // Add space between numbers and uppercase letters
            .replace(/\//g, '/ '); // Add space after forward slash
    }

    function unformatFuelType(formattedFuelType) {
        if (formattedFuelType === undefined || formattedFuelType === null) {
            return 'None';
        }
        return formattedFuelType
            .replace(/([a-z])\s([A-Z])/g, '$1$2') // Remove space between lowercase and uppercase letters
            .replace(/([a-zA-Z])\s([A-Z][a-z])/g, '$1$2') // Remove space before capitalized words
            .replace(/([a-z])\s([A-Z])/g, '$1$2') // Remove space between lowercase and uppercase letters again for edge cases
            .replace(/([a-z])\s([0-9])/g, '$1$2') // Remove space between letters and numbers
            .replace(/([0-9])\s([A-Z])/g, '$1$2') // Remove space between numbers and uppercase letters
            .replace(/\/\s/g, '/'); // Remove space after forward slash
    }

    function formatModuleLocation(location) {
        switch (location) {
            case 'front':
                return 'Front';
            case 'middle':
                return 'Middle';
            case 'rear':
                return 'Rear';
            default:
                return 'Unknown';
        }
    }

    function getEngineDisplayClass(moduleKey) {
        switch (moduleKey) {
            case "Super Stardrive Engine":
            case "Stardrive Engine":
                return styles.engineCustomizationSubContainer9Options;
            case "Nuclear Saltwater Rocket":
            case "Nuclear Light Bulb":
            case "HEDM":
            case "Chemical":
                return styles.engineCustomizationSubContainerNoOptions;
            case "Super Antimatter Plasma Torch":
            case "Super Conversion Torch":
            case "Total Conversion Torch":
            case "Antimatter Pion Torch":
            case "Antimatter Pion":
            case "Antimatter Plasma Torch":
            case "Antimatter Plasma Rocket":
            case "Antimatter Thermal Rocket":
            case "Super Fusion Torch":
            case "Fusion Torch":
            case "Fusion Rocket":
            case "Mass Driver":
            case "Ion Drive":
            case "Nuclear Thermal Rocket":
            case "Super Fusion Pulse Drive":
            case "Advanced Fusion Pulse Drive":
            case "Fusion Pulse Drive":
            case "External Pulsed Plasma":
                return styles.engineCustomizationSubContainer1to2Options;
            case "Super Reactionless":
            case "Hot Reactionless":
            case "Standard":
            case "Rotary":
            case "Subwarp":
                return styles.engineCustomizationSubContainer3to4Options;
            default:
                return styles.engineCustomizationSubContainer9Options;
        }
    }

    function getFuelDisplayClass() {
        const arrLength = shipValidFuelTypes.length;

        switch (arrLength) {
            case 1:
            case 2:
                return styles.engineCustomizationSubContainer1to2Options;
            case 3:
            case 4:
                return styles.engineCustomizationSubContainer3to4Options;
            case 5:
            case 6:
            case 7:
            case 8:
                return styles.engineCustomizationSubContainer9Options;
            default:
                return styles.engineCustomizationSubContainer1to2Options;
        }
    }

    // This useEffect populates the validFuelTypes state variable used to customize fuel tanks.
    useEffect(() => {
        let newValidFuelTypes = ['Empty'];
        let updatedShipModules = [...shipModules];
        let assignedContentsChanged = false;

        processShipModules(shipModules, (shipModule) => {
            if (shipModule.fuelTypes) {
                shipModule.fuelTypes.forEach((fuelType) => {
                    if (!newValidFuelTypes.includes(formatFuelType(fuelType))) {
                        newValidFuelTypes.push(formatFuelType(fuelType));
                    }
                });
            }
        });

        // Ensure assignedContents are valid
        processShipModules(updatedShipModules, (shipModule) => {
            if (shipModule.moduleKey === 'Fuel Tank') {
                if (!newValidFuelTypes.includes(formatFuelType(shipModule.assignedContents))) {
                    shipModule.assignedContents = 'Empty';
                    assignedContentsChanged = true;
                }
            }
        });

        if (assignedContentsChanged) {
            setModules(updatedShipModules);
        }

        setValidFuelTypes(newValidFuelTypes);
    }, [shipModules]);

    // This useEffect populates the fuelTanksArr state variable used to display and customize fuel tanks.
    useEffect(() => {
        const infoMessage = 'This section shows each fuel tank module along with options for contents. Select an engine to enable its fuel options or select Exposed Radiators in the Ship Design tab to assign thermal fluid for heat sinks.';

        let fuelTanksArr = [
            {
                title: 'Fuel Tanks',
                info: infoMessage
            },
            {
                titleAssignAll: 'Assign All Fuel Tanks'
            }
        ];

        processShipModules(shipModules, (shipModule) => {
            if (shipModule.moduleKey === 'Fuel Tank') {
                fuelTanksArr.push(deepCopyObj(shipModule));
            }

        });

        setFuelTanksArr(fuelTanksArr);
    }, [shipModules]);

    // This useEffect updates the shipEngineAccelDelta array based on ship modules and the fuelObj.
    useEffect(() => {
        const infoMessage = 'This section shows the acceleration and delta-v for each unique reaction engine, customization, and fuel combination. Each delta-v calculation assumes all fuel tanks of that fuel type will be used by that single set of engines.';

        let newEngineAccelDelta = [
            {
                title: 'Reaction Engine Accel & Delta V',
                info: infoMessage
            }
        ]

        processShipModules(shipModules, (shipModule) => {
            let moduleKey = shipModule.moduleKey;

            function addReactionAccelDelta(moduleKey) {
                const fuelTypes = shipModule.fuelTypes;
                const moduleAccel = shipModule.accel;
                const moduleMpsTank = shipModule.mpsTank;
                const ramRocket = shipModule.hasOwnProperty('ramRocket') ? shipModule.ramRocket : undefined;
                const highThrust = shipModule.hasOwnProperty('highThrust') ? shipModule.highThrust : undefined;

                for (let i = 0; i < fuelTypes.length; i++) {
                    let fuelType = fuelTypes[i];
                    let fuelObj = shipFuelObj;

                    let deltaV = 0;
                    let accel = moduleAccel;

                    if (fuelObj.hasOwnProperty(fuelType) && fuelType !== 'Water') {
                        deltaV = fuelObj[fuelType] * moduleMpsTank;
                    } else if (fuelObj.hasOwnProperty(fuelType) && fuelType === 'Water') {
                        deltaV = fuelObj[fuelType] * (moduleMpsTank / 3);
                        accel *= 3;
                    }

                    if (deltaV > 0) {
                        let existingEntry = newEngineAccelDelta.find(entry => entry.engineType === moduleKey && entry.fuelType === fuelType && entry.ramRocket === ramRocket && entry.highThrust === highThrust);
                        if (existingEntry) {
                            existingEntry.accel += accel;
                        } else {
                            let newEntry = {
                                engineType: moduleKey,
                                fuelType: fuelType,
                                accel: accel,
                                deltaV: deltaV
                            };
                            if (ramRocket !== undefined) {
                                newEntry.ramRocket = ramRocket;
                            }
                            if (highThrust !== undefined) {
                                newEntry.highThrust = highThrust;
                            }
                            newEngineAccelDelta.push(newEntry);
                        }
                    }
                }
            }


            switch (moduleKey) {
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
                case "HEDM":
                case "Chemical":
                    addReactionAccelDelta(moduleKey);
                    break;
                default:
                    break;
            }
            setEngineAccelDelta(newEngineAccelDelta);
        })
    }, [shipModules, shipFuelObj]);

    const handleEngineCheckboxChange = (moduleLocation1, moduleNumber, property) => {
        saveScrollPosition();

        const [rowIndex, colIndex] = getModuleIndex(moduleLocation1, moduleNumber);

        let newModuleObj = { ...shipModules[rowIndex][colIndex] };

        switch (property) {
            case 'ramRocket':
                newModuleObj.ramRocket = !newModuleObj.ramRocket;
                break;
            case 'highThrust':
                newModuleObj.highThrust = !newModuleObj.highThrust;
                break;
            case 'driveField':
                newModuleObj.driveField = !newModuleObj.driveField;
                break;
            case 'pseudoVelocity':
                newModuleObj.pseudoVelocity = !newModuleObj.pseudoVelocity;
                break;
            case 'singularityDrive':
                newModuleObj.singularityDrive = !newModuleObj.singularityDrive;
                if (newModuleObj.singularityDrive) {
                    newModuleObj.negativeMassPropulsionDrive = false;
                }
                break;
            case 'negativeMassPropulsionDrive':
                newModuleObj.negativeMassPropulsionDrive = !newModuleObj.negativeMassPropulsionDrive;
                if (newModuleObj.negativeMassPropulsionDrive) {
                    newModuleObj.singularityDrive = false;
                }
                break;
            case 'stardriveFuel':
                newModuleObj.stardriveFuel = !newModuleObj.stardriveFuel;
                break;
            case 'reactionlessEngineSuper':
                newModuleObj.reactionlessEngineSuper = !newModuleObj.reactionlessEngineSuper;
                if (newModuleObj.reactionlessEngineSuper) {
                    newModuleObj.reactionlessEngineHot = false;
                    newModuleObj.reactionlessEngineStandard = false;
                    newModuleObj.reactionlessEngineRotary = false;
                }
                break;
            case 'reactionlessEngineHot':
                newModuleObj.reactionlessEngineHot = !newModuleObj.reactionlessEngineHot;
                if (newModuleObj.reactionlessEngineHot) {
                    newModuleObj.reactionlessEngineSuper = false;
                    newModuleObj.reactionlessEngineStandard = false;
                    newModuleObj.reactionlessEngineRotary = false;
                }
                break;
            case 'reactionlessEngineStandard':
                newModuleObj.reactionlessEngineStandard = !newModuleObj.reactionlessEngineStandard;
                if (newModuleObj.reactionlessEngineStandard) {
                    newModuleObj.reactionlessEngineSuper = false;
                    newModuleObj.reactionlessEngineHot = false;
                    newModuleObj.reactionlessEngineRotary = false;
                }
                break;
            case 'reactionlessEngineRotary':
                newModuleObj.reactionlessEngineRotary = !newModuleObj.reactionlessEngineRotary;
                if (newModuleObj.reactionlessEngineRotary) {
                    newModuleObj.reactionlessEngineSuper = false;
                    newModuleObj.reactionlessEngineHot = false;
                    newModuleObj.reactionlessEngineStandard = false;
                }
                break;
            case 'reactionlessEngineExtraCost':
                newModuleObj.reactionlessEngineExtraCost = !newModuleObj.reactionlessEngineExtraCost;
                break;
            default:
                console.log("Unexpected value in handleEngineCheckboxChange.");
                return;
        }
        setModules(prevModules => {
            const newModules = [...prevModules];
            newModules[rowIndex] = [...newModules[rowIndex]];
            newModules[rowIndex][colIndex] = newModuleObj;
            return newModules;
        });

        restoreScrollPosition();
    };

    function updateAssignedContents(selectedFuel, moduleLocation, moduleNumber) {
        saveScrollPosition();

        const unformattedFuel = unformatFuelType(selectedFuel);
        const [rowIndex, colIndex] = getModuleIndex(moduleLocation, moduleNumber)

        let newModules = [...shipModules];
        newModules[rowIndex] = [...newModules[rowIndex]];
        newModules[rowIndex][colIndex] = { ...newModules[rowIndex][colIndex] };
        newModules[rowIndex][colIndex].assignedContents = unformattedFuel;

        setModules(newModules);

        restoreScrollPosition();
    }

    // processShipModules(updatedShipModules, (shipModule) => {
    //     if (shipModule.moduleKey === 'Fuel Tank') {
    //         if (!newValidFuelTypes.includes(formatFuelType(shipModule.assignedContents))) {
    //             shipModule.assignedContents = 'Empty';
    //             assignedContentsChanged = true;
    //         }
    //     }
    // });

    function roundToTwoDecimals(value) {
        return Math.round(value * 100) / 100;
    }

    function updateAllAssignedContents(fuelType) {
        saveScrollPosition();

        const unformattedFuel = unformatFuelType(fuelType);

        let newModules = [...shipModules];

        processShipModules(newModules, (shipModule) => {
            if (shipModule.moduleKey === 'Fuel Tank') {
                shipModule.assignedContents = unformattedFuel;
            }
        });

        setModules(newModules);

        restoreScrollPosition();
    }

    function EngineCustomizationDisplay() {
        return (
            <div ref={containerRef} className={styles.engineCustomizationContainer}>
                <h2 className={isExpanded ? styles.statTitle5ColExpanded : styles.statTitleCollapsed}>Engine & Fuel Customization</h2>

                {shipEngineAccelDelta.length > 1 && shipEngineAccelDelta.map((engine, index) => {
                    if (engine.hasOwnProperty('title') && engine.hasOwnProperty('info')) {
                        return (
                            <div key={index} className={styles.engineCustomizationSubContainerInfo}>
                                <span className={styles.engineCustomizationTitle}>{engine.title}</span>
                                <span className={styles.engineCustomizationInfo}>{engine.info}</span>
                            </div>
                        );
                    } else {
                        return (
                            <div
                                key={index}
                                className={
                                    engine.hasOwnProperty('ramRocket') && engine.hasOwnProperty('highThrust')
                                        ? styles.engineCustomizationSubContainerEngineAccelDelta
                                        : styles.engineCustomizationSubContainerEngineAccelDeltaHighThrust
                                }>
                                <span className={styles.engineCustomizationLabel}>Engine Type:</span>
                                <span className={styles.engineCustomizationValue}>{engine.engineType}</span>
                                <span className={styles.engineCustomizationLabel}>Fuel Type:</span>
                                <span className={styles.engineCustomizationValue}>{formatFuelType(engine.fuelType)}</span>
                                <span className={styles.engineCustomizationLabel}>Acceleration:</span>
                                <span className={styles.engineCustomizationValue}>{engine.accel} G</span>
                                <span className={styles.engineCustomizationLabel}>Delta V:</span>
                                <span className={styles.engineCustomizationValue}>{roundToTwoDecimals(engine.deltaV)} mps</span>
                                {engine.hasOwnProperty('ramRocket') && (
                                    <>
                                        <span className={styles.engineCustomizationLabel}>Ram Rocket:</span>
                                        <span className={styles.engineCustomizationValue}>
                                            {engine.ramRocket ? <span>&#9989;</span> : '❌'}
                                        </span>
                                    </>
                                )}
                                {engine.hasOwnProperty('highThrust') && (
                                    <>
                                        <span className={styles.engineCustomizationLabel}>High Thrust:</span>
                                        <span className={styles.engineCustomizationValue}>
                                            {engine.highThrust ? <span>&#9989;</span> : '❌'}
                                        </span>
                                    </>
                                )}
                            </div>
                        );
                    }
                })}

                {enginesArr.length > 1 && enginesArr.map((engineModule, index) => {
                    if (engineModule.hasOwnProperty('title') && engineModule.hasOwnProperty('info')) {
                        return (
                            <div key={index} className={styles.engineCustomizationSubContainerInfo}>
                                <span className={styles.engineCustomizationTitle}>{engineModule.title}</span>
                                <span className={styles.engineCustomizationInfo}>{engineModule.info}</span>
                            </div>
                        );
                    } else {
                        return (
                            <div key={index} className={`${getEngineDisplayClass(engineModule.moduleKey)}`}>
                                <span className={styles.engineCustomizationLabel}>Module:</span>
                                <span className={styles.engineCustomizationValue}>{engineModule.moduleKey}</span>
                                <span className={styles.engineCustomizationLabel}>Hull Location:</span>
                                <span className={styles.engineCustomizationValue}>{formatModuleLocation(engineModule.moduleLocation1)}</span>
                                <span className={styles.engineCustomizationLabel}>Cost:</span>
                                <span className={styles.engineCustomizationValue}>${engineModule.moduleCost?.toLocaleString()}</span>
                                <span className={styles.engineCustomizationLabel}>Module Number:</span>
                                <span className={styles.engineCustomizationValue}>{engineModule.moduleNumber}</span>
                                <span className={styles.engineCustomizationLabel}>Workspaces:</span>
                                <span className={styles.engineCustomizationValue}>{engineModule.moduleWorkspaces?.toLocaleString()}</span>
                                {engineModule.moduleCategory === 'Reactionless Engine' ? (
                                    <>
                                        <span className={styles.engineCustomizationLabel}>Power Demand:</span>
                                        <span className={styles.engineCustomizationValue}>{engineModule.modulePowerDemand}</span>
                                    </>
                                ) : (
                                    <>
                                        <span className={styles.engineCustomizationLabel}>Fuel Types:</span>
                                        <span className={styles.engineCustomizationValue}>
                                            {(engineModule.fuelTypes ? engineModule.fuelTypes.map(formatFuelType).join(', ') : formatFuelType(undefined))}
                                        </span>
                                    </>
                                )}
                                <span className={styles.engineCustomizationLabel}>Acceleration:</span>
                                <span className={styles.engineCustomizationValue}>
                                    {engineModule.accel !== undefined ? (
                                        <>
                                            <span style={{ display: engineModule.accel < 1 ? 'inline' : 'none' }}>
                                                {engineModule.accel.toFixed(4)} G
                                            </span>
                                            <span style={{ display: engineModule.accel >= 1 ? 'inline' : 'none' }}>
                                                {engineModule.accel.toLocaleString()} G
                                            </span>
                                        </>
                                    ) : ''}
                                </span>
                                <span className={styles.engineCustomizationLabel}>mps/Tank:</span>
                                <span className={styles.engineCustomizationValue}>{engineModule.mpsTank?.toLocaleString()}</span>
                                {engineModule.hasOwnProperty('ramRocket') && (
                                    <label className={styles.engineCustomizationCheckLabel}>
                                        Ram Rocket:
                                        <input className={styles.inputCheckbox}
                                            type="checkbox"
                                            checked={engineModule.ramRocket}
                                            onChange={() => handleEngineCheckboxChange(engineModule.moduleLocation1, engineModule.moduleNumber, 'ramRocket')}
                                        />
                                    </label>
                                )}
                                {engineModule.hasOwnProperty('highThrust') && (
                                    <label className={styles.engineCustomizationCheckLabel}>
                                        High Thrust:
                                        <input className={styles.inputCheckbox}
                                            type="checkbox"
                                            checked={engineModule.highThrust}
                                            onChange={() => handleEngineCheckboxChange(engineModule.moduleLocation1, engineModule.moduleNumber, 'highThrust')}
                                        />
                                    </label>
                                )}

                                {engineModule.baseModuleWorkspaces >= 1 && (<label className={styles.engineCustomizationCheckLabel}>
                                    Total Automation:
                                    <input className={styles.inputCheckbox}
                                        type="checkbox"
                                        checked={engineModule.totalAutomation}
                                        onChange={(event) => handleEngineTotalAutomation(event, engineModule)}
                                    />
                                </label>)}

                                {engineModule.baseModuleWorkspaces >= 1 && shipSM >= 12 && (<label className={styles.engineCustomizationCheckLabel}>
                                    High Automation:
                                    <input className={styles.inputCheckbox}
                                        type="checkbox"
                                        checked={engineModule.highAutomation}
                                        onChange={(event) => handleEngineHighAutomation(event, engineModule)}
                                    />
                                </label>)}

                                {engineModule.hasOwnProperty('driveField') && (
                                    <label className={styles.engineCustomizationCheckLabel}>
                                        Drive Field:
                                        <input className={styles.inputCheckbox}
                                            type="checkbox"
                                            checked={engineModule.driveField}
                                            onChange={() => handleEngineCheckboxChange(engineModule.moduleLocation1, engineModule.moduleNumber, 'driveField')}
                                        />
                                    </label>
                                )}
                                {engineModule.hasOwnProperty('pseudoVelocity') && (
                                    <label className={styles.engineCustomizationCheckLabel}>
                                        Pseudo Velocity:
                                        <input className={styles.inputCheckbox}
                                            type="checkbox"
                                            checked={engineModule.pseudoVelocity}
                                            onChange={() => handleEngineCheckboxChange(engineModule.moduleLocation1, engineModule.moduleNumber, 'pseudoVelocity')}
                                        />
                                    </label>
                                )}
                                {engineModule.hasOwnProperty('singularityDrive') && shipSM >= 22 - shipTL && (
                                    <label className={styles.engineCustomizationCheckLabel}>
                                        Singularity Drive:
                                        <input className={styles.inputCheckbox}
                                            type="checkbox"
                                            checked={engineModule.singularityDrive}
                                            onChange={() => handleEngineCheckboxChange(engineModule.moduleLocation1, engineModule.moduleNumber, 'singularityDrive')}
                                        />
                                    </label>
                                )}
                                {engineModule.hasOwnProperty('stardriveFuel') && (
                                    <label className={styles.engineCustomizationCheckLabel}>
                                        Stardrive Fuel:
                                        <input className={styles.inputCheckbox}
                                            type="checkbox"
                                            checked={engineModule.stardriveFuel}
                                            onChange={() => handleEngineCheckboxChange(engineModule.moduleLocation1, engineModule.moduleNumber, 'stardriveFuel')}
                                        />
                                    </label>
                                )}
                                {engineModule.hasOwnProperty('reactionlessEngineSuper') && (
                                    <label className={styles.engineCustomizationCheckLabel}>
                                        Reactionless Engine Super:
                                        <input className={styles.inputCheckbox}
                                            type="checkbox"
                                            checked={engineModule.reactionlessEngineSuper}
                                            onChange={() => handleEngineCheckboxChange(engineModule.moduleLocation1, engineModule.moduleNumber, 'reactionlessEngineSuper')}
                                        />
                                    </label>
                                )}
                                {engineModule.hasOwnProperty('reactionlessEngineHot') && (
                                    <label className={styles.engineCustomizationCheckLabel}>
                                        Reactionless Engine Hot:
                                        <input className={styles.inputCheckbox}
                                            type="checkbox"
                                            checked={engineModule.reactionlessEngineHot}
                                            onChange={() => handleEngineCheckboxChange(engineModule.moduleLocation1, engineModule.moduleNumber, 'reactionlessEngineHot')}
                                        />
                                    </label>
                                )}
                                {engineModule.hasOwnProperty('reactionlessEngineStandard') && (
                                    <label className={styles.engineCustomizationCheckLabel}>
                                        Reactionless Engine Standard:
                                        <input className={styles.inputCheckbox}
                                            type="checkbox"
                                            checked={engineModule.reactionlessEngineStandard}
                                            onChange={() => handleEngineCheckboxChange(engineModule.moduleLocation1, engineModule.moduleNumber, 'reactionlessEngineStandard')}
                                        />
                                    </label>
                                )}
                                {engineModule.hasOwnProperty('reactionlessEngineRotary') && (
                                    <label className={styles.engineCustomizationCheckLabel}>
                                        Reactionless Engine Rotary:
                                        <input className={styles.inputCheckbox}
                                            type="checkbox"
                                            checked={engineModule.reactionlessEngineRotary}
                                            onChange={() => handleEngineCheckboxChange(engineModule.moduleLocation1, engineModule.moduleNumber, 'reactionlessEngineRotary')}
                                        />
                                    </label>
                                )}
                                {engineModule.hasOwnProperty('reactionlessEngineExtraCost') && (
                                    <label className={styles.engineCustomizationCheckLabel}>
                                        Reactionless Extra Cost:
                                        <input className={styles.inputCheckbox}
                                            type="checkbox"
                                            checked={engineModule.reactionlessEngineExtraCost}
                                            onChange={() => handleEngineCheckboxChange(engineModule.moduleLocation1, engineModule.moduleNumber, 'reactionlessEngineExtraCost')}
                                        />
                                    </label>
                                )}
                                {engineModule.hasOwnProperty('negativeMassPropulsionDrive') && (
                                    <label className={styles.engineCustomizationCheckLabel}>
                                        NMP Drive:
                                        <input className={styles.inputCheckbox}
                                            type="checkbox"
                                            checked={engineModule.negativeMassPropulsionDrive}
                                            onChange={() => handleEngineCheckboxChange(engineModule.moduleLocation1, engineModule.moduleNumber, 'negativeMassPropulsionDrive')}
                                        />
                                    </label>
                                )}
                            </div>
                        );
                    }
                })}

                {shipFuelTanksArr.length > 2 && shipFuelTanksArr.map((fuelTank, index) => {
                    if (fuelTank.hasOwnProperty('title') && fuelTank.hasOwnProperty('info')) {
                        return (
                            <div key={index} className={styles.engineCustomizationSubContainerInfo}>
                                <span className={styles.engineCustomizationTitle}>{fuelTank.title}</span>
                                <span className={styles.engineCustomizationInfo}>{fuelTank.info}</span>
                            </div>
                        );
                    } else if (fuelTank.hasOwnProperty('titleAssignAll')) {
                        return (
                            <div key={index} className={styles.engineCustomizationSubContainerEngineAccelDelta}>
                                <span className={styles.engineCustomizationTitle}>{fuelTank.titleAssignAll}</span>
                                {shipValidFuelTypes.map((fuelType, idx) => (
                                    <label key={idx} className={styles.engineCustomizationCheckLabelFuel}>
                                        <span className={styles.fuelCustomizationLabel}>{fuelType}:</span>
                                        <input
                                            className={styles.engineCustomizationCheckbox}
                                            type="checkbox"
                                            checked={shipFuelTanksArr[2].assignedContents === unformatFuelType(fuelType)}
                                            onChange={() => updateAllAssignedContents(fuelType)}
                                        />
                                    </label>
                                ))}
                            </div>
                        );
                    } else {
                        return (
                            <div key={index} className={getFuelDisplayClass()}>
                                <span className={styles.engineCustomizationLabel}>Module:</span>
                                <span className={styles.engineCustomizationValue}>{fuelTank.moduleKey}</span>
                                <span className={styles.engineCustomizationLabel}>Hull Location:</span>
                                <span className={styles.engineCustomizationValue}>{formatModuleLocation(fuelTank.moduleLocation1)}</span>
                                <span className={styles.engineCustomizationLabel}>Cost:</span>
                                <span className={styles.engineCustomizationValue}>${fuelTank.moduleCost?.toLocaleString()}</span>
                                <span className={styles.engineCustomizationLabel}>Module Number:</span>
                                <span className={styles.engineCustomizationValue}>{fuelTank.moduleNumber}</span>
                                <span className={styles.engineCustomizationLabel}>Workspaces:</span>
                                <span className={styles.engineCustomizationValue}>{fuelTank.moduleWorkspaces?.toLocaleString()}</span>
                                <span className={styles.engineCustomizationLabel}>Fuel Load:</span>
                                <span className={styles.engineCustomizationValue}>{fuelTank.fuelLoad}</span>
                                <span className={styles.engineCustomizationLabelFuel}>Assigned Contents:</span>
                                {shipValidFuelTypes.map((fuelType, idx) => (
                                    <label key={idx} className={styles.engineCustomizationCheckLabelFuel}>
                                        <span className={styles.fuelCustomizationLabel}>{fuelType}:</span>
                                        <input
                                            className={styles.engineCustomizationCheckbox}
                                            type="checkbox"
                                            checked={fuelTank.assignedContents === unformatFuelType(fuelType)}
                                            onChange={() => updateAssignedContents(fuelType, fuelTank.moduleLocation1, fuelTank.moduleNumber)}
                                        />
                                    </label>
                                ))}
                            </div>
                        );
                    }
                })}

                {stardriveReactionlessArr.length === 1 && Object.keys(stardriveReactionlessArr[0]).length === 0 ? null : (
                    stardriveReactionlessArr.map((engineModule, index) => {
                        if (engineModule.hasOwnProperty('title') && engineModule.hasOwnProperty('info')) {
                            return (
                                <div key={index} className={styles.engineCustomizationSubContainerInfo}>
                                    <span className={styles.engineCustomizationTitle}>{engineModule.title}</span>
                                    <span className={styles.engineCustomizationInfo}>{engineModule.info}</span>
                                </div>
                            );
                        } else {
                            return (
                                <div key={index} className={styles.engineCustomizationSubContainerNoOptions}>
                                    <span className={styles.engineCustomizationLabel}>Module Key:</span>
                                    <span className={styles.engineCustomizationValue}>{engineModule.moduleKey}</span>
                                    <span className={styles.engineCustomizationLabel}>Category:</span>
                                    <span className={styles.engineCustomizationValue}>{engineModule.moduleCategory}</span>
                                    <span className={styles.engineCustomizationLabel}>Hull Location:</span>
                                    <span className={styles.engineCustomizationValue}>{formatModuleLocation(engineModule.moduleLocation1)}</span>
                                    <span className={styles.engineCustomizationLabel}>Module Number:</span>
                                    <span className={styles.engineCustomizationValue}>{engineModule.moduleNumber}</span>
                                    <span className={styles.engineCustomizationLabel}>mps/tank:</span>
                                    <span className={styles.engineCustomizationValue}>{engineModule.mpsTank?.toLocaleString()}</span>
                                    <span className={styles.engineCustomizationLabel}>Acceleration:</span>
                                    <span className={styles.engineCustomizationValue}>
                                        {engineModule.accel !== undefined ? (
                                            <>
                                                <span style={{ display: engineModule.accel < 1 ? 'inline' : 'none' }}>
                                                    {engineModule.accel.toFixed(4)}
                                                </span>
                                                <span style={{ display: engineModule.accel >= 1 ? 'inline' : 'none' }}>
                                                    {engineModule.accel.toLocaleString()}
                                                </span>
                                            </>
                                        ) : ''}
                                    </span>
                                </div>
                            );
                        }
                    })
                )}
            </div>
        );
    }

    // const [selectedMount, setSelectedMount] = useState({});
    // const [shipWeaponMountsArr, setWeaponMountsArr] = useState([{}]);

    function handleMountChange(event) {
        const selectedMountKey = event.target.value;
        const selectedMount = shipWeaponMountsArr.find(module => module.moduleLocation1 + module.moduleNumber === selectedMountKey);
        setSelectedMount(selectedMount);
        // console.log(`selectedMount: ${JSON.stringify(selectedMount)}`);
    }

    useEffect(() => {
        let newWeaponMountsArr = [];
        processShipModules(shipModules, (shipModule) => {
            if (shipModule.moduleCategory === "Weapons") {
                newWeaponMountsArr.push(shipModule);
            }
        });
        setWeaponMountsArr(newWeaponMountsArr);
    }, [shipModules])

    // newModuleListObj.graviticFocus = false;
    // newModuleListObj.rapidFire = false;
    // newModuleListObj.veryRapidFire = false;
    // newModuleListObj.improved = false;
    // {
    //     moduleKey: moduleKey,
    //     moduleCategory: moduleCategory,
    //     moduleLocation1: moduleLocation1,
    //     moduleLocation2: moduleLocation2,
    //     moduleNumber: moduleNumber,
    //     baseModulePowerDemand: modulePowerDemand,
    //     modulePowerDemand: modulePowerDemand,
    //     baseModuleCost: moduleCost,
    //     moduleCost: moduleCost,
    //     baseModuleWorkspaces: moduleWorkspaces,
    //     moduleWorkspaces: moduleWorkspaces,
    //     alreadyCustomized: false,
    //     mountedWeapons: [],
    //     totalAutomation: false,
    //     highAutomation: false
    // }

    function WeaponCustomizationDisplay() {
        return (
            <div className={styles.habitatSubContainer}>
                <h2 className={isExpanded ? styles.statTitleExpanded : styles.statTitleCollapsed}>Weapon Customization</h2>
                <select className={styles.customizationSelect} value={selectedMount?.moduleLocation1 + selectedMount?.moduleNumber || ''} onChange={handleMountChange}>
                    <option value="">Unselected</option>
                    {shipWeaponMountsArr.map((module, index) => (
                        <option key={index} value={module.moduleLocation1 + module.moduleNumber}>
                            {module.moduleLocation1}, {module.moduleNumber}, {module.moduleKey}
                        </option>
                    ))}
                </select>
                {selectedMount && (
                    <>
                        {/* {shipTL >= 9 && (<label className={styles.lifeSuppLabel}>
                            Total Life<br />Support:
                            <input className={styles.inputCheckbox}
                                type="checkbox"
                                checked={selectedHabitat.totalLifeSupport}
                                onChange={handleSelectedHabTotalLifeSupport}
                            />
                        </label>)} */}
                    </>
                )}
            </div>
        )
    }

    function MiscCustomizationDisplay() {
        return (
            <div className={styles.habitatSubContainer}>
                <h2 className={isExpanded ? styles.statTitleExpanded : styles.statTitleCollapsed}>Misc. Customization</h2>
            </div>
        )
    }

    const handleCustomClick = (componentType) => {
        switch (componentType) {
            case 'Habitats':
                setCurrentCustomizationPanel('Habitats');
                break;
            case 'Engines':
                setCurrentCustomizationPanel('Engines');
                break;
            case 'Weapons':
                setCurrentCustomizationPanel('Weapons');
                break;
            case 'Misc':
                setCurrentCustomizationPanel('Misc');
                break;
            default:
                break;
        }
    };

    function CustomizationDisplay() {
        return (
            <div className={isExpanded ? styles.habitatPowerContainerExpanded : styles.habitatPowerContainerCollapsed}>
                <h2 className={isExpanded ? styles.customizationTitleExpanded : styles.customizationTitleCollapsed}>Module Customization</h2>
                <div className={isExpanded ? styles.customizationComponentButtonContainerExpanded : styles.customizationComponentButtonContainerCollapsed}>
                    <button className={styles.statComponentButton} onClick={() => handleCustomClick('Habitats')}>Habitats</button>
                    <button className={styles.statComponentButton} onClick={() => handleCustomClick('Engines')}>Engines & Fuel</button>
                    <button className={styles.statComponentButton} onClick={() => handleCustomClick('Weapons')}>Weapons</button>
                    <button className={styles.statComponentButton} onClick={() => handleCustomClick('Misc')}>Misc.</button>
                </div>
                {currentCustomizationPanel === "Habitats" && <HabitatCustomizationDisplay />}
                {currentCustomizationPanel === "Weapons" && <WeaponCustomizationDisplay />}
                {currentCustomizationPanel === "Engines" && <EngineCustomizationDisplay />}
                {currentCustomizationPanel === "Misc" && <MiscCustomizationDisplay />}
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
        <div className={`${styles.globalFont} ${isExpanded ? styles.containerStyleExpanded : styles.containerStyleCollapsed}`}>            <h2 className={isExpanded ? styles.titleExpanded : styles.titleCollapsed}>Create Ship Class</h2>
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

            <span className={isExpanded ? styles.topRowWarningExpanded : styles.topRowWarningCollapsed}>WARNING: Some actions and modules allowed in the rules are not allowed in this version.  Mouse over to see details.</span>

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
                CustomizationDisplay={CustomizationDisplay}
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