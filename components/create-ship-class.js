import styles from "../styles/create-ship-class.module.scss"
import shipData from "../data/ship-data.json"
import SMData from "../data/shipSM-data.json"
import weaponData from "../data/weapon-data.json"
import weaponTables from "../data/weapon-tables.json"
import React, { useState, useEffect } from 'react';
import ShipModuleSelector from "./ship-module-selector.js";
import ShipClassStatBlock from "./ship-class-statblock.js";
import ShipClassHabitatPower from "./ship-class-habitatpower.js";
import ShipClassWeaponStats from "./ship-class-weaponstats.js";


const CreateShipClass = () => {
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
    const [shipComplexity, setComplexity] = useState(0);
    const [shipModules, setModules] = useState([]);
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
    const [shipMajorMountLocation, setMajorMountLocation] = useState([0, 0, 0]);
    const [shipUnusedMajorMounts, setUnusedMajorMounts] = useState(0);
    const [shipMajorMountLocationCount, setMajorMountLocationCount] = useState([[0], [0], [0]]);
    const [shipMediumMountLocation, setMediumMountLocation] = useState([0, 0, 0]);
    const [shipUnusedMediumMounts, setUnusedMediumMounts] = useState(0);
    const [shipMediumMountLocationCount, setMediumMountLocationCount] = useState([[0], [0], [0]]);
    const [shipSecondaryMountLocation, setSecondaryMountLocation] = useState([0, 0, 0]);
    const [shipUnusedSecondaryMounts, setUnusedSecondaryMounts] = useState(0);
    const [shipSecondaryMountLocationCount, setSecondaryMountLocationCount] = useState([[0], [0], [0]]);
    const [shipTertiaryMountLocation, setTertiaryMountLocation] = useState([0, 0, 0]);
    const [shipUnusedTertiaryMounts, setUnusedTertiaryMounts] = useState(0);
    const [shipTertiaryMountLocationCount, setTertiaryMountLocationCount] = useState([[0], [0], [0]]);
    const [shipWeaponsCost, setWeaponsCost] = useState(0);
    const [unusedWeaponMountList, setUnusedWeaponMountList] = useState([])
    const [unusedWeaponMountListDisplay, setUnusedWeaponMountListDisplay] = useState([])
    const [shipWeaponMountCargo, setWeaponMountCargo] = useState(0);
    const [selectedUninstalledCargo, setSelectedUninstalledCargo] = useState(0);
    const [selectedMountCostChange, setSelectedMountCostChange] = useState(0);
    const [selectedMountType, setSelectedMountType] = useState('');
    const [selectedWeaponType, setSelectedWeaponType] = useState('');
    const [weaponSubType, setWeaponSubType] = useState('');
    const [shipValidWeaponTypesList, setValidWeaponTypeList] = useState([]);


    // Weapon Stat State Variables
    const [weaponList, setWeaponList] = useState([{ weaponType: "Null" }]);
    const [selectedWeaponCount, setSelectedWeaponCount] = useState(0);
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
    const [shipShortOccupancyCrew, setShortOccupancyCrew] = useState(0); // This value also works as the total crew compliment including non-essential personelle like stewards, waiters, etc.
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
    const [shipTeleportProjectorsSendReceive, setTeleportProjectorsSendReceive] = useState(0);
    const [shipWorkspaces, setWorkspaces] = useState(0);
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

        const selectedHndLocale = selectedHnd.toLocaleString();
        const selectedSRLocale = selectedSR.toLocaleString();

        setdSTHP(selecteddSTHP);
        setLength(selectedLength)
        setMass(selectedMass)
        setHnd(selectedHnd);
        setSR(selectedSR);

        setDisplayHndSR(selectedHndLocale + '/' + selectedSRLocale);

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

    // This useEffect calculates the default Comm/Sensor array level based on the SM and TL.
    useEffect(() => {
        let commSensor = 0
        let TL = shipTL

        switch (shipSM) {
            case 5:
                commSensor = TL - 6
                break;
            case 6:
                commSensor = TL - 5
                break;
            case 7:
                commSensor = TL - 4
                break;
            case 8:
                commSensor = TL - 3
                break;
            case 9:
                commSensor = TL - 2
                break;
            case 10:
                commSensor = TL - 1
                break;
            case 11:
                commSensor = TL
                break;
            case 12:
                commSensor = TL + 1
                break;
            case 13:
                commSensor = TL + 2
                break;
            case 14:
                commSensor = TL + 3
                break;
            case 15:
                commSensor = TL + 4
                break;

            default:
                commSensor = 'Error'
                break;
        }
        setCommSensorLvl(commSensor)
    }, [shipSM, shipTL]);

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

    // This useEffect handles changes to the cost state variables to update the total cost.
    useEffect(() => {
        let totalCost = 0
        totalCost = shipTotalModulesCost + shipHabitatPowerCost + shipWeaponsCost
        setDisplayCost(totalCost.toLocaleString())
        setTotalCost(totalCost)
    }, [shipTotalModulesCost, shipHabitatPowerCost, shipWeaponsCost])

    // This function handles changes to the habitatPowerCost value and updates the state variable.
    function handleHabitatPowerCost(cost) {
        setHabitatPowerCost(cost)
    }

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

    // This function calculates the default reactor life based on the module key and ship TL.
    function defaultReactorLife(moduleKey, shipTL) {
        let reactorLifeHours = 0;
        let reactorLifeYears = 0;
        switch (moduleKey) {

            case 'Chemical, Fuel Cell':
                switch (shipTL) {
                    case 7:
                        reactorLifeHours = 3;
                        break;
                    case 8:
                        reactorLifeHours = 6;
                        break;
                    case 9:
                        reactorLifeHours = 12;
                        break;
                    case 10:
                    case 11:
                    case 12:
                    case 13:
                    case 14:
                    case 15:
                        reactorLifeHours = 24;
                        break;
                    default:
                        reactorLifeHours = 'Error';
                        break;
                }
                break;

            case 'Chemical, MHD Turbine':
                switch (shipTL) {
                    case 9:
                        reactorLifeHours = 6;
                        break;
                    case 10:
                    case 11:
                    case 12:
                    case 13:
                    case 14:
                    case 15:
                        reactorLifeHours = 12;
                        break;
                    default:
                        reactorLifeHours = 'Error';
                        break;
                }
                break;

            case 'Reactor, Fission':
                switch (shipTL) {
                    case 8:
                        reactorLifeYears = 25;
                        break;
                    case 9:
                        reactorLifeYears = 50;
                        break;
                    case 10:
                    case 11:
                    case 12:
                    case 13:
                    case 14:
                    case 15:
                        reactorLifeYears = 75;
                        break;
                    default:
                        reactorLifeYears = 'Error';
                        break;
                }
                break;

            case 'Reactor, Fusion':
                switch (shipTL) {
                    case 9:
                        reactorLifeYears = 50;
                        break;
                    case 10:
                        reactorLifeYears = 200
                        break;
                    case 11:
                        reactorLifeYears = 600
                        break;
                    case 12:
                    case 13:
                    case 14:
                    case 15:
                        reactorLifeYears = 1500
                        break;
                    default:
                        reactorLifeYears = 'Error';
                        break;
                }
                break;

            case 'Reactor, Antimatter':
                switch (shipTL) {
                    case 10:
                        reactorLifeYears = 2;
                        break;
                    case 11:
                        reactorLifeYears = 20;
                        break;
                    case 12:
                    case 13:
                    case 14:
                    case 15:
                        reactorLifeYears = 200;
                        break;
                    default:
                        reactorLifeYears = 'Error';
                        break;
                }
                break;

            case 'Reactor, Super Fusion':
                switch (shipTL) {
                    case 11:
                        reactorLifeYears = 400;
                        break;
                    case 12:
                    case 13:
                    case 14:
                    case 15:
                        reactorLifeYears = 1000;
                        break;
                    default:
                        reactorLifeYears = 'Error';
                        break;
                }
                break;

            case 'Reactor, Total Conversion':
                switch (shipTL) {
                    case 12:
                    case 13:
                    case 14:
                    case 15:
                        reactorLifeYears = Infinity;
                        break;
                    default:
                        reactorLifeYears = 'Error';
                        break;
                }
                break;

            case 'Solar Panel Array':

                reactorLifeYears = Infinity;
                break;

            default:
                break;
        }

        if (reactorLifeYears > 0) {
            return reactorLifeYears;
        } else if (reactorLifeHours > 0) {
            return reactorLifeHours;
        } else {
            return 'Error';
        }
    }

    // This function handles the deRate click event and updates the effected power plant in the shipPowerPlants array.
    function handleDeRatedChange(module) {
        const moduleKey = module.powerPlantKey;
        const defaultCost = module.defaultCost;
        const defaultReactorLifeYears = module.defaultReactorLifeYears;
        const moduleNumber = module.moduleNumber;
        const maxPowerGen = module.maxPowerGeneration;
        let finalPowerGen = maxPowerGen
        let deRated = module.deRated;
        let finalCost = 0
        let finalReactorLifeYears = 0
        const costDivisor = 1 / maxPowerGen;

        function updateDeRatePower(moduleKey, moduleNumber, deRated, finalPowerGen, finalCost, finalReactorLifeYears) {
            setShipPowerPlants(prevPowerPlants => prevPowerPlants.map((module, index) => {
                if (module.powerPlantKey === moduleKey && module.moduleNumber === moduleNumber) {
                    return {
                        ...module,
                        deRated: deRated,
                        powerGeneration: finalPowerGen,
                        finalCost: finalCost,
                        reactorLifeYears: finalReactorLifeYears,
                    };
                } else {
                    return module;
                }
            }));
        }

        switch (moduleKey) {
            case "Reactor, Fusion":
                if (deRated === 0) {
                    deRated = 1;
                    finalPowerGen = 1
                    finalCost = defaultCost / 2
                    finalReactorLifeYears = defaultReactorLifeYears * 2
                    updateDeRatePower(moduleKey, moduleNumber, deRated, finalPowerGen, finalCost, finalReactorLifeYears)
                    habitatPowerUpdateTotalCost(defaultCost, finalCost)
                }
                break;

            case "Reactor, Antimatter":
                if (deRated < 3) {
                    deRated += 1;
                    finalPowerGen = finalPowerGen - deRated
                    finalCost = defaultCost * (1 - (costDivisor * deRated))
                    finalReactorLifeYears = defaultReactorLifeYears * (1 + (deRated * .25))
                    updateDeRatePower(moduleKey, moduleNumber, deRated, finalPowerGen, finalCost, finalReactorLifeYears)
                    habitatPowerUpdateTotalCost(defaultCost, finalCost)
                }
                break;
            case "Reactor, Super Fusion":
                if (deRated < 3) {
                    deRated += 1;
                    finalPowerGen = finalPowerGen - deRated
                    finalCost = defaultCost * (1 - (costDivisor * deRated))
                    finalReactorLifeYears = defaultReactorLifeYears * (1 + (deRated * .25))
                    updateDeRatePower(moduleKey, moduleNumber, deRated, finalPowerGen, finalCost, finalReactorLifeYears)
                    habitatPowerUpdateTotalCost(defaultCost, finalCost)
                }
            default:
                break;
        }
    }

    // This function handles the upRate click event and updates the effected power plant in the shipPowerPlants array.
    function handleUpRatedChange(module) {
        const moduleKey = module.powerPlantKey;
        const defaultCost = module.defaultCost;
        const defaultReactorLifeYears = module.defaultReactorLifeYears;
        const moduleNumber = module.moduleNumber;
        const maxPowerGen = module.maxPowerGeneration;
        let finalPowerGen = maxPowerGen
        let deRated = module.deRated;
        let finalCost = 0
        let finalReactorLifeYears = 0
        const costDivisor = 1 / maxPowerGen;

        function updateUpRatePower(moduleKey, moduleNumber, deRated, finalPowerGen, finalCost, finalReactorLifeYears) {
            setShipPowerPlants(prevPowerPlants => prevPowerPlants.map((module, index) => {
                if (module.powerPlantKey === moduleKey && module.moduleNumber === moduleNumber) {
                    return {
                        ...module,
                        deRated: deRated,
                        powerGeneration: finalPowerGen,
                        finalCost: finalCost,
                        reactorLifeYears: finalReactorLifeYears,
                    };
                } else {
                    return module;
                }
            }));
        }

        switch (moduleKey) {
            case "Reactor, Fusion":
                if (deRated === 1) {
                    deRated = 0;
                    finalPowerGen = 2
                    finalCost = defaultCost
                    finalReactorLifeYears = defaultReactorLifeYears
                    updateUpRatePower(moduleKey, moduleNumber, deRated, finalPowerGen, finalCost, finalReactorLifeYears)
                    habitatPowerUpdateTotalCost(defaultCost, finalCost)
                }
                break;

            case "Reactor, Antimatter":
                if (deRated > 0) {
                    deRated -= 1;
                    finalPowerGen = finalPowerGen - deRated
                    finalCost = defaultCost * (1 - (costDivisor * deRated))
                    finalReactorLifeYears = defaultReactorLifeYears * (1 + (deRated * .25))
                    updateUpRatePower(moduleKey, moduleNumber, deRated, finalPowerGen, finalCost, finalReactorLifeYears)
                    habitatPowerUpdateTotalCost(defaultCost, finalCost)
                }
                break;
            case "Reactor, Super Fusion":
                if (deRated > 0) {
                    deRated -= 1;
                    finalPowerGen = finalPowerGen - deRated
                    finalCost = defaultCost * (1 - (costDivisor * deRated))
                    finalReactorLifeYears = defaultReactorLifeYears * (1 + (deRated * .25))
                    updateUpRatePower(moduleKey, moduleNumber, deRated, finalPowerGen, finalCost, finalReactorLifeYears)
                    habitatPowerUpdateTotalCost(defaultCost, finalCost)
                }
            default:
                break;
        }
    }

    // This function is passed into the ShipClassHabitatPower component to display the power plant information.
    function powerPlantsDisplay(shipPowerPlants) {
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

    // This useEffect resets the various habitat state variables when a module is changed.
    useEffect(() => {
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

    // This useEffect resets the ship cargo and selected weapon state variables when the shipModules state variable changes.
    useEffect(() => {
        setRefrigeratedCargo(0)
        setShieldedCargo(0)
        setPressCargo(0)
        setWeaponSubType('')
        setSelectedWeaponType('')
        setSelectedMountType('')
        setSelectedUninstalledCargo(0)
        resetCounts()
        setWeaponList([])
        resetWeaponStats()
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
        let newTeleportSendReceive = shipTeleportProjectorsSendReceive
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

            case 'Teleport Send/Receive':
                newTeleportSendReceive += value;
                newCabins = shipCabins - value;
                newCost = value * 10000000
                newLongOccupancy = (newCabins * 2) + (newLuxury * 2) + (newBunkrooms * 4) + (newCells * 4)
                if (newTeleport >= 0 && value <= shipCabins) {
                    setTeleportProjectorsSendReceive(newTeleportSendReceive);
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

    function habitatsDisplay() {
        return (
            <div className={styles.habitatSubContainer}>
                <span className={styles.habitatInfoLabelCol1}>
                    Workspaces:
                </span>
                <span className={styles.habitatInfoValueCol1}>
                    {shipWorkspaces.toLocaleString()}
                </span>
                <span className={styles.habitatInfoLabelCol2Crew}>
                    Short Occ. (Crew):
                </span>
                <span className={styles.habitatInfoValueCol2}>
                    {shipShortOccupancyCrew.toLocaleString()}
                </span>
                <span className={styles.habitatInfoLabelCol3Crew}>
                    Short Occ. (Passengers):
                </span>
                <span className={styles.habitatInfoValueCol3Crew}>
                    {shipShortOccupancyPassengers.toLocaleString()}
                </span>
                <span className={styles.habitatInfoLabelCol1}>
                    Ship Seats:
                </span>
                <span className={styles.habitatInfoValueCol1}>
                    {shipSeats.toLocaleString()}
                </span>
                {shipTL >= 9 && <span className={styles.habitatInfoLabelCol2TotalLife}>
                    Total Life Support:
                </span>}
                {shipTL >= 9 && <label className={styles.totalLifeSupportLabel}>
                    <input className={styles.inputCheckbox}
                        type="checkbox"
                        checked={shipTotalLifeSupport}
                        onChange={handleTotalLifeSupportChange}
                    />
                </label>}
                <span className={styles.habitatInfoLabelCol3Occupancy}>
                    Short Term Occupancy:
                </span>
                <span className={styles.habitatInfoValueCol3Occupancy}>
                    {shipShortOccupancy.toLocaleString()}
                </span>
                <span className={styles.habitatInfoLabelCol1}>
                    Cabins Capacity:
                </span>
                <span className={styles.habitatInfoValueCol1}>
                    {shipCabinsCapacity.toLocaleString()}
                </span>
                <span className={styles.habitatInfoLabelCol2Cabins}>
                    Cabins:
                </span>
                <span className={styles.habitatInfoValueCol2Cabins}>
                    {shipCabins.toLocaleString()}
                </span>
                <span className={styles.habitatInfoLabelCol3Occupancy}>
                    Long Term Occupancy:
                </span>
                <span className={styles.habitatInfoValueCol3Occupancy}>
                    {shipLongOccupancy.toLocaleString()}
                </span>
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
                    Tele. Proj. (Send/Recieve):
                </span>}
                {shipTeleportProjectorsSendReceive >= 100 && shipTL >= 12 && superScienceChecked === true && <button
                    onClick={() => habitatIncrementDecrement('Teleport Send/Receive', -100)}
                    className={styles.habitatMinus100}>
                    -100
                </button>}
                {shipTeleportProjectorsSendReceive >= 10 && shipTL >= 12 && superScienceChecked === true && <button
                    onClick={() => habitatIncrementDecrement('Teleport Send/Receive', -10)}
                    className={styles.habitatMinus10}>
                    -10
                </button>}
                {shipTeleportProjectorsSendReceive >= 1 && shipTL >= 12 && superScienceChecked === true && <button
                    onClick={() => habitatIncrementDecrement('Teleport Send/Receive', -1)}
                    className={styles.habitatMinus1}>
                    -1
                </button>}
                {shipTL >= 12 && superScienceChecked === true && <span className={styles.habitatButton}>
                    {shipTeleportProjectorsSendReceive}
                </span>}
                {shipCabins >= 1 && shipTL >= 12 && superScienceChecked === true && <button
                    onClick={() => habitatIncrementDecrement('Teleport Send/Receive', 1)}
                    className={styles.habitatPlus1}>
                    +1
                </button>}
                {shipCabins >= 10 && shipTL >= 12 && superScienceChecked === true && <button
                    onClick={() => habitatIncrementDecrement('Teleport Send/Receive', 10)}
                    className={styles.habitatPlus10}>
                    +10
                </button>}
                {shipCabins >= 100 && shipTL >= 12 && superScienceChecked === true && <button
                    onClick={() => habitatIncrementDecrement('Teleport Send/Receive', 100)}
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
            </div >
        )
    }

    // This function is a callback passed into the module selector to handle changes to the selected engine.
    function handleSelectedEngine(engineString) {
        setSelectedEngine(engineString)
    }

    // This use effect updates selectedEngine to an empty string when shipModules doesn't contain any engine.
    useEffect(() => {
        let shipModuleKeys = []
        let hasEngine = false

        shipModules.forEach(module => {
            shipModuleKeys.push(module.moduleKey)
        });

        hasEngine = shipModuleKeys.some(key => engineKeys.includes(key));

        if (hasEngine === false) {
            setSelectedEngine('')
        }

    }, [shipModules])

    // This function calculates the deltaV multiplier based on the mpsTank and tankCount.
    function deltaVMultiplier(mpsTank, tankCount) {
        let finalDeltaV = 0
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
                finalDeltaV = (mpsTank * tankCount) * 1.2
                break;
            case 9:
            case 10:
            case 11:
            case 12:
                finalDeltaV = (mpsTank * tankCount) * 1.4
                break;
            case 13:
            case 14:
                finalDeltaV = (mpsTank * tankCount) * 1.6
                break;
            case 15:
                finalDeltaV = (mpsTank * tankCount) * 1.8
                break;
            case 16:
                finalDeltaV = (mpsTank * tankCount) * 2
                break;
            case 17:
                finalDeltaV = (mpsTank * tankCount) * 2.2
                break;
            case 18:
                finalDeltaV = (mpsTank * tankCount) * 2.5
                break;
            case 19:
                finalDeltaV = (mpsTank * tankCount) * 3
                break;
            default:
                break;
        }
        finalDeltaV = parseFloat(finalDeltaV.toFixed(2))

        return finalDeltaV
    }

    // This useEffect handles changes to the selected module array to update overall ship statistics.
    useEffect(() => {
        const modulesUseEffect = shipModules;
        const modulesUseEffectData = shipData
        let tankCount = shipModules.filter(module => module.moduleKey === 'Fuel Tank').length;
        let frontdDR = 0
        let middDR = 0
        let reardDR = 0
        let cost = 0
        let workspaces = 0
        let defensiveECMTL = 0
        let defensiveECMBonus = 0
        let powerDemand = 0
        let powerGeneration = 0
        let cabinsCapacity = 0
        let shortOccupancyCrew = 0
        let shortOccupancyPassengers = 0
        let longOccupancy = 0
        let areas = 0
        let seats = 0
        let controlStations = 0
        let engineRoomCount = 0
        let fuelLoad = 0
        let jumpGate = 0
        let maxFTL = 0
        let uPressCargo = 0
        let arrayLevel = 0
        let facValueHour = 0
        let facWeightHour = 0
        let launchRate = 0
        let hangarCapacity = 0
        let miningCapacity = 0
        let refineryCapacity = 0
        let spinalMounts = 0
        let majorMounts = 0
        let majorMountLocation = [0, 0, 0]
        let unusedMajorMounts = 0
        let mediumMounts = 0
        let mediumMountLocation = [0, 0, 0]
        let unusedMediumMounts = 0
        let secondaryMounts = 0
        let secondaryMountLocation = [0, 0, 0]
        let unusedSecondaryMounts = 0
        let tertiaryMounts = 0
        let tertiaryMountLocation = [0, 0, 0]
        let unusedTertiaryMounts = 0
        let frontSpinal = false
        let midSpinal = false
        let rearSpinal = false
        let accel = 0
        let deltaV = 0

        if (modulesUseEffect.length === 0) {
            frontdDR = 0
            middDR = 0
            reardDR = 0
            cost = 0
            workspaces = 0
            defensiveECMTL = 0
            defensiveECMBonus = 0
            powerDemand = 0
            powerGeneration = 0
            cabinsCapacity = 0
            shortOccupancyCrew = 0
            shortOccupancyPassengers = 0
            longOccupancy = 0
            areas = 0
            seats = 0
            controlStations = 0
            engineRoomCount = 0
            fuelLoad = 0
            jumpGate = 0
            maxFTL = 0
            uPressCargo = 0
            arrayLevel = 0
            facValueHour = 0
            facWeightHour = 0
            launchRate = 0
            hangarCapacity = 0
            miningCapacity = 0
            refineryCapacity = 0
            spinalMounts = 0
            majorMounts = 0
            majorMountLocation = [0, 0, 0]
            unusedMajorMounts = 0
            mediumMounts = 0
            mediumMountLocation = [0, 0, 0]
            unusedMediumMounts = 0
            secondaryMounts = 0
            secondaryMountLocation = [0, 0, 0]
            unusedSecondaryMounts = 0
            tertiaryMounts = 0
            tertiaryMountLocation = [0, 0, 0]
            unusedTertiaryMounts = 0
            frontSpinal = false
            midSpinal = false
            rearSpinal = false
            accel = 0
            deltaV = 0
            tankCount = 0
        }
        for (let i = 0; i < modulesUseEffect.length; i++) {
            let currentModuleKey = modulesUseEffect[i].moduleKey;
            let currentModuleLocation = modulesUseEffect[i].moduleLocation1;
            let currentModuleLocation2 = modulesUseEffect[i].moduleLocation2;
            let moduleKeyObj = modulesUseEffectData[currentModuleKey];
            let moduleCategory = moduleKeyObj[0].Category;
            let moduleRepairSkill = moduleKeyObj[0].RepairSkill;
            let modulePowerGeneration = moduleKeyObj[0].PowerGeneration;
            let modulePowerDemand = moduleKeyObj[0].PowerDemand;
            let moduleLocation = moduleKeyObj[0].Location;
            let moduleTL = moduleKeyObj[0].TL;
            let SMData = moduleKeyObj.find(module => module.SM === shipSM);
            let moduleCost = SMData.cost;
            let moduleWorkspaces = SMData.Workspaces;


            cost += moduleCost;
            workspaces += moduleWorkspaces;
            powerDemand += modulePowerDemand;
            powerGeneration += modulePowerGeneration;
            shortOccupancyCrew += SMData.Workspaces
            switch (moduleCategory) {
                case 'Armor and Survivability':
                    if (currentModuleKey.includes('Armor')) {
                        let unStreamlineddDR = SMData.USdDR
                        let streamlineddDR = SMData.SdDR
                        switch (shipStreamlinedUn) {
                            case 'streamlined':
                                if (currentModuleLocation === 'front') {
                                    frontdDR += streamlineddDR
                                } else if (currentModuleLocation === 'middle') {
                                    middDR += streamlineddDR
                                } else if (currentModuleLocation === 'rear') {
                                    reardDR += streamlineddDR
                                }
                                break;
                            case 'unstreamlined':
                                if (currentModuleLocation === 'front') {
                                    frontdDR += unStreamlineddDR
                                } else if (currentModuleLocation === 'middle') {
                                    middDR += unStreamlineddDR
                                } else if (currentModuleLocation === 'rear') {
                                    reardDR += unStreamlineddDR
                                }
                                break;
                            default:
                                frontdDR = 'System Error'
                                middDR = 'System Error'
                                reardDR = 'System Error'
                                break;
                        }
                        break;
                    }

                    if (currentModuleKey === 'Defensive ECM') {
                        defensiveECMTL = shipTL
                        if (defensiveECMBonus >= 6) {
                            defensiveECMBonus = 'Invalid.'
                        } else {
                            defensiveECMBonus += 2
                        }
                    }

                    if (currentModuleKey.includes('Force Screen')) {
                        let forcedDR = SMData.dDr
                        frontdDR += forcedDR
                        middDR += forcedDR
                        reardDR += forcedDR
                    }
                    break;

                case 'Crew':
                    if (currentModuleKey === 'Habitat') {
                        cabinsCapacity += SMData.Cabins
                        longOccupancy += SMData.Cabins * 2
                    }

                    if (currentModuleKey === 'Open Space') {
                        areas += SMData.Areas
                        shortOccupancyPassengers += 100
                    }

                    if (currentModuleKey === 'Passenger Seating') {
                        seats += SMData.Seats
                        shortOccupancyPassengers += SMData.Seats
                    }
                    break;

                case 'Engineering':
                    if (currentModuleKey === 'Control Room') {
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
                        let TL = shipTL
                        switch (shipSM) {
                            case 5:
                                arrayLevel = TL - 4
                                break;
                            case 6:
                                arrayLevel = TL - 3
                                break;
                            case 7:
                                arrayLevel = TL - 2
                                break;
                            case 8:
                                arrayLevel = TL - 1
                                break;
                            case 9:
                                arrayLevel = TL
                                break;
                            case 10:
                                arrayLevel = TL + 1
                                break;
                            case 11:
                                arrayLevel = TL + 2
                                break;
                            case 12:
                                arrayLevel = TL + 3
                                break;
                            case 13:
                                arrayLevel = TL + 4
                                break;
                            case 14:
                                arrayLevel = TL + 5
                                break;
                            case 15:
                                arrayLevel = TL + 6
                                break;

                            default:
                                arrayLevel = 'Error'
                                break;
                        }
                        setCommSensorLvl(arrayLevel)
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
                    if (currentModuleKey === 'Mining and Refinery') {
                        miningCapacity += SMData.TonsHrMining
                        refineryCapacity += SMData.TonsHrRefinery
                    }
                    break;

                case 'Weapons':
                    if (currentModuleKey === 'Major Battery') {
                        majorMounts += 1
                        unusedMajorMounts += 1
                        switch (currentModuleLocation) {
                            case 'front':
                                majorMountLocation[0] += 1
                                break;
                            case 'middle':
                                majorMountLocation[1] += 1
                                break;
                            case 'rear':
                                majorMountLocation[2] += 1
                                break;

                            default:
                                break;
                        }
                    }
                    if (currentModuleKey === 'Medium Battery') {
                        mediumMounts += 3
                        unusedMediumMounts += 3
                        switch (currentModuleLocation) {
                            case 'front':
                                mediumMountLocation[0] += 3
                                break;
                            case 'middle':
                                mediumMountLocation[1] += 3
                                break;
                            case 'rear':
                                mediumMountLocation[2] += 3
                                break;

                            default:
                                break;
                        }
                    }
                    if (currentModuleKey === 'Secondary Battery') {
                        secondaryMounts += 10
                        unusedSecondaryMounts += 10
                        switch (currentModuleLocation) {
                            case 'front':
                                secondaryMountLocation[0] += 10
                                break;
                            case 'middle':
                                secondaryMountLocation[1] += 10
                                break;
                            case 'rear':
                                secondaryMountLocation[2] += 10
                                break;

                            default:
                                break;
                        }
                    }
                    if (currentModuleKey === 'Tertiary Battery') {
                        tertiaryMounts += 30
                        unusedTertiaryMounts += 30
                        switch (currentModuleLocation) {
                            case 'front':
                                tertiaryMountLocation[0] += 30
                                break;
                            case 'middle':
                                tertiaryMountLocation[1] += 30
                                break;
                            case 'rear':
                                tertiaryMountLocation[2] += 30
                                break;

                            default:
                                break;
                        }
                    }
                    if (currentModuleKey === 'Spinal Battery') {
                        if (currentModuleLocation === 'front') {
                            frontSpinal = true
                        } else if (currentModuleLocation === 'middle') {
                            midSpinal = true
                        } else if (currentModuleLocation === 'rear') {
                            rearSpinal = true
                        }

                        if (frontSpinal && midSpinal && rearSpinal) {
                            spinalMounts = 1
                        } else if (frontSpinal) {
                            spinalMounts += 0.33
                        } else if (midSpinal) {
                            spinalMounts += 0.33
                        } else if (rearSpinal) {
                            spinalMounts += 0.33
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
                    break;
                default:
                    break;
            }

        }
        setFrontdDR(frontdDR)
        setMiddDR(middDR)
        setReardDR(reardDR)
        setShipDefensiveECMBonus(defensiveECMBonus)
        setShipDefensiveECMTL(defensiveECMTL)
        setTotalModulesCost(cost)
        setWorkspaces(workspaces)
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
        setMajorMounts(majorMounts)
        setMediumMounts(mediumMounts)
        setSecondaryMounts(secondaryMounts)
        setTertiaryMounts(tertiaryMounts)
        setMajorMountLocation(majorMountLocation)
        setMediumMountLocation(mediumMountLocation)
        setSecondaryMountLocation(secondaryMountLocation)
        setTertiaryMountLocation(tertiaryMountLocation)
        setUnusedMajorMounts(unusedMajorMounts)
        setUnusedMediumMounts(unusedMediumMounts)
        setUnusedSecondaryMounts(unusedSecondaryMounts)
        setUnusedTertiaryMounts(unusedTertiaryMounts)
        setAccel(accel)
        setDeltaV(deltaV)
    }, [shipModules, shipStreamlinedUn, shipTL, shipSM, superScienceChecked, shipTotalModulesCost]);

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
    const handleSetModules = (moduleKey, moduleCategory, moduleLocation1, moduleLocation2, moduleNumber) => {
        let newModuleList = [...shipModules];
        let newModuleListObj = {
            moduleKey: moduleKey,
            moduleCategory: moduleCategory,
            moduleLocation1: moduleLocation1,
            moduleLocation2: moduleLocation2,
            moduleNumber: moduleNumber
        }
        let existingModuleIndex = newModuleList.findIndex(module => module.moduleLocation1 === moduleLocation1 && module.moduleNumber === moduleNumber);
        if (moduleKey === '') {
            newModuleList.splice(existingModuleIndex, 1);
        } else {
            if (existingModuleIndex !== -1) {
                newModuleList.splice(existingModuleIndex, 1, newModuleListObj);
            } else {
                newModuleList.push(newModuleListObj);
            }
        }
        setModules(newModuleList);
    }

    const handleResetModules = () => {
        setModules([]);
    }

    // These three functions handle changes to the currentStatComponent state variable to display the correct component.
    const handleBasicStatsClick = () => {
        setStatCurrentComponent('shipClassStatBlock');
    }
    const handleHabitatPowerClick = () => {
        setStatCurrentComponent('shipHabitatPowerStats');
    }
    const handleWeaponClick = () => {
        setStatCurrentComponent('shipWeaponStats');
    }

    function resetWeaponStats() {
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
        setMajorMountLocationCount([0], [0], [0])
        setMediumMountLocationCount([0], [0], [0])
        setSecondaryMountLocationCount([0], [0], [0])
        setTertiaryMountLocationCount([0], [0], [0])
    }

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

    // This useEffect updates the unusedWeaponMountList based on the ship's spinal, major, medium, 
    // secondary, and tertiary mounts.  The first[0] value in the array is the spinal mount count.
    // The next three values in the array are the number of major mounts in the front, middle, and 
    // rear, then the number of medium mounts in the front, middle, and rear, and so on.
    useEffect(() => {
        let spinalMounts = 0
        if (shipSpinalMounts === 1) {
            spinalMounts = 1
        }
        let newMountList = [spinalMounts,
            ...shipMajorMountLocation,
            ...shipMediumMountLocation,
            ...shipSecondaryMountLocation,
            ...shipTertiaryMountLocation]
        setUnusedWeaponMountList(newMountList)
    }, [shipSpinalMounts, shipMajorMountLocation, shipMediumMountLocation, shipSecondaryMountLocation, shipTertiaryMountLocation])

    function resetCounts() {
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

    useEffect(() => {
        const mountNames = [
            'Spinal Mount',
            'Major (Front)',
            'Major (Middle)',
            'Major (Rear)',
            'Medium (Front)',
            'Medium (Middle)',
            'Medium (Rear)',
            'Secondary (Front)',
            'Secondary (Middle)',
            'Secondary (Rear)',
            'Tertiary (Front)',
            'Tertiary (Middle)',
            'Tertiary (Rear)'
        ];

        let displayMountList = unusedWeaponMountList
            .map((value, index) => value > 0 ? mountNames[index] : null)
            .filter(item => item !== null);

        setUnusedWeaponMountListDisplay(displayMountList);
        // resetWeaponStats();
    }, [unusedWeaponMountList])

    // This useEffect determines the valid weapon sub types based on ship TL, selectedWeaponType, and superScience.
    useEffect(() => {
        let validWeaponTypeList = []
        let TL = shipTL
        let superScience = superScienceChecked

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
    }, [selectedWeaponType, shipTL, shipSM, superScienceChecked])

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

    function getWeaponSubTypeStats(weaponName, rapidFire, veryRapidFire, improved) {
        let shipDataSMIndex = shipSM - 4
        let moduleKey = ''
        let damageTypesArray = []
        let weaponType = ''

        switch (selectedMountType) {
            case 'Spinal Mount':
                moduleKey = 'Spinal Battery'
                break;

            case 'Major (Front)':
            case 'Major (Middle)':
            case 'Major (Rear)':
                moduleKey = 'Major Battery'
                break;

            case 'Medium (Front)':
            case 'Medium (Middle)':
            case 'Medium (Rear)':
                moduleKey = 'Medium Battery'
                break;

            case 'Secondary (Front)':
            case 'Secondary (Middle)':
            case 'Secondary (Rear)':
                moduleKey = 'Secondary Battery'
                break;

            case 'Tertiary (Front)':
            case 'Tertiary (Middle)':
            case 'Tertiary (Rear)':
                moduleKey = 'Tertiary Battery'
                break;

            default:
                break;
        }

        let damageDice = 0
        let damageModifier = 0
        let damageMultiplier = 0

        let beamPower = shipData[moduleKey][shipDataSMIndex]['Beam/kj']
        let tenMileRangeArray = []
        let hundredMileRangeArray = []
        let thousandMileRangeArray = []
        let tenThousandMileRangeArray = []
        let rangeValuesArray = []

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

        function getGunStats(selectedWeapon) {
            const weaponStats = weaponTables['ConventionalWarheadDmgTable'][gunCaliber.toString()];

            const selectedWeaponData = weaponData[selectedWeapon]
            tenMileImpulse = selectedWeaponData[1]['10MileImpulse']
            hundredMileImpulse = selectedWeaponData[1]['100MileImpulse']
            thousandMileImpulse = selectedWeaponData[1]['1000MileImpulse']
            tenThousandMileImpulse = selectedWeaponData[1]['10000MileImpulse']
            gunImpulse = [tenMileImpulse, hundredMileImpulse, thousandMileImpulse, tenThousandMileImpulse]
            damageDice = weaponStats.DamageDice;
            damageModifier = weaponStats.DamageModifier;
            damageMultiplier = weaponStats.DamageMultiplier;
        }

        function getMissileStats(selectedWeapon) {
            const weaponStats = weaponTables['ConventionalWarheadDmgTable'][launcherCaliber.toString()];
            const selectedWeaponData = weaponData[selectedWeapon]
            damageDice = weaponStats.DamageDice;
            damageModifier = weaponStats.DamageModifier;
            damageMultiplier = weaponStats.DamageMultiplier;

            if (selectedWeapon === "WarpMissile") {
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

        function getRcLsAccStats() {
            let rcLResult = 0
            let sAccResult = 0

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
                    getMissileRcLsAcc()
                    break;

                case 'Missile TL 9-12':
                    getMissileRcLsAcc()
                    break;

                case 'Super Missile':
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

                default:
                    break;
            }
            setSelectedWeaponRcl(rcLResult)
            setSelectedWeaponSAcc(sAccResult)
        }

        Object.values(weaponData).forEach(weaponArray => {
            weaponArray.forEach(weapon => {
                if (weapon.Name === weaponName) {
                    weaponType = weapon.Type
                }
            });
        });

        switch (weaponType) {
            case "Beam":
                Object.values(weaponData).forEach(weaponArray => {
                    weaponArray.forEach(weapon => {
                        if (weapon.Name === weaponName) {
                            setSelectedWeaponRcl(weapon.Rcl)
                            setSelectedWeaponSAcc(weapon.sAcc)
                            if (weapon.ArmorDivisor === 'Infinity') {
                                setSelectedWeaponArmorDiv(Infinity)
                            } else {
                                setSelectedWeaponArmorDiv(weapon.ArmorDivisor)
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
                        getBeamStats('ConversionDisintegratorHeatLaserTable')
                        break;
                    case 'Graser Beam':
                    case 'X-Ray Laser':
                    case 'UV Laser':
                        getBeamStats('GraserUvXrayLaserTable')
                        break;
                    case 'Ghost Particle Beam':
                    case 'Particle Beam':
                        getBeamStats('GhostParticleParticleTable')
                        break;
                    case 'Antiparticle Beam':
                        getBeamStats('AntiParticleTable')
                        break;
                    case 'Tractor Beam':
                    case 'Graviton Beam':
                        getBeamStats('TractorGravitonTable')
                        break;

                    case 'Plasma Beam':
                        getBeamStats('PlasmaTable')
                        break;
                    default:
                        damageDice = 'Error'
                        damageModifier = 'Error'
                        damageMultiplier = 'Error'
                        rangeValuesArray = 'Error'
                        damageTypesArray = 'Error'
                        break;
                }

                setSelectedWeaponSize(beamPower)
                setSelectedWeaponDmgDice(damageDice)
                setSelectedWeaponDmgMod(damageModifier)
                setSelectedWeaponDmgMulti(damageMultiplier)
                setSelectedWeaponRangeArray(rangeValuesArray)
                setSelectedWeaponDamageTypes(damageTypesArray)

                break;

            case "Gun":
                getRcLsAccStats()
                switch (weaponName) {
                    case 'Conventional Gun':
                        getGunStats('ConventionalGun')

                        break;
                    case 'Electromagnetic Gun':
                        getGunStats('ElectromagneticGun')
                        break;
                    case 'Grav Gun':
                        getGunStats('GravGun')
                        break;

                    default:
                        break;
                }
                setSelectedWeaponImpulse(gunImpulse)
                setSelectedWeaponDmgDice(damageDice)
                setSelectedWeaponDmgMod(damageModifier)
                setSelectedWeaponDmgMulti(damageMultiplier)
                setSelectedWeaponSize(gunCaliber)
                setSelectedWeaponShots(gunShots)
                setSelectedWeaponDamageTypes(['Default'])
                break;

            case "Missile":
                getRcLsAccStats()

                switch (weaponName) {
                    case 'Missile TL 7-8':
                        getMissileStats('Missile7-8')
                        setSelectedWeaponThrust(missileThrust)
                        setSelectedWeaponBurn(missileBurn)
                        break;

                    case 'Missile TL 9-12':
                        getMissileStats('Missile9-12')
                        setSelectedWeaponThrust(missileThrust)
                        setSelectedWeaponBurn(missileBurn)
                        break;

                    case 'Super Missile':
                        getMissileStats('SuperMissile')
                        setSelectedWeaponThrust(missileThrust)
                        setSelectedWeaponBurn(missileBurn)
                        break;

                    case 'Warp Missile':
                        getMissileStats('WarpMissile')
                        setWarpMissileRange(warpMissileRange)
                        break;

                    default:

                        break;

                }

                setSelectedWeaponSize(launcherCaliber)
                setSelectedWeaponShots(launcherShots)
                setSelectedWeaponDmgDice(damageDice)
                setSelectedWeaponDmgMod(damageModifier)
                setSelectedWeaponDmgMulti(damageMultiplier)
                setSelectedWeaponDamageTypes(['Default'])

            default:
                break;
        }

        function getLargestWarhead() {
            let largestWarhead = []
            switch (weaponType) {
                case "Gun":
                    if (shipTL >= 10) {
                        if (gunCaliber >= 40) {
                            // The first value indicates if the warhead is antimatter or nuclear, 1 means nuclear and 2 means antimatter.
                            // The second value indicates the size of the warhead, the string matches the keys in the weapon-tables.json file.
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

        setSelectedWeaponLargestWarhead(getLargestWarhead())

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

        setSelectedWeaponRoF(getRoFStats());

    }

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

    function handleRapidFireChange() {
        setSelectedWeaponRapidFire(!selectedWeaponRapidFire)
        getWeaponSubTypeStats(weaponSubType, !selectedWeaponRapidFire, false, selectedWeaponImproved)
    }

    function handleVeryRapidFireChange() {
        setSelectedWeaponVeryRapidFire(!selectedWeaponVeryRapidFire)
        getWeaponSubTypeStats(weaponSubType, false, !selectedWeaponVeryRapidFire, selectedWeaponImproved)
    }

    function handleImprovedChange() {
        setSelectedWeaponImproved(!selectedWeaponImproved)
        getWeaponSubTypeStats(weaponSubType, selectedWeaponRapidFire, selectedWeaponVeryRapidFire, !selectedWeaponImproved)
    }

    function handleWeaponMountChange(event) {
        setSelectedMountType(event.target.value)
        setWeaponSubType('')
        setSelectedWeaponType('')
        setSelectedUninstalledCargo(0)
        setSelectedWeaponCount(0)
    }

    function handleWeaponTypeChange(event) {
        setSelectedWeaponType(event.target.value)
        setWeaponSubType('')
        setSelectedWeaponCount(0)
        setSelectedWeaponFixed(handleSelectedWeaponFixed(event.target.value))
    }

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
                break;

            default:
                return false
                break;
        }
    }

    function handleSpecificTypeChange(event) {
        setWeaponSubType(event.target.value)
        setSelectedWeaponCount(0)
        handleImprovedValid(event.target.value)
        getWeaponSubTypeStats(event.target.value, false, false, false)

    }

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

    // Needs to update the unusedWeaponMountList based on the selectedMountType and the current count of each mount type, 
    // update unusedMounts, and reset all 'selectedWeapon...' state variables.
    function handleAddWeapon() {
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
                        locationCount: 0
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
                        locationCount: 0
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
                    locationCount: 0
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
                    locationCount: 0
                }
            }

            function handleWeaponUninstalled() {
                let finalCargo = selectedUninstalledCargo * selectedWeaponCount
                let finalCost = (selectedMountCostChange * selectedWeaponCount) * -1
                let newShipWeaponsCost = shipWeaponsCost + selectedCostChange

                weapon = {
                    mountType: selectedMountType,
                    weaponType: selectedWeaponType,
                    cargo: finalCargo,
                    cost: finalCost,
                    count: selectedWeaponCount,
                    locationCount: 0
                }

                setWeaponsCost(newShipWeaponsCost)
                setWeaponMountCargo(finalCargo)
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

            function resetWeaponSelection() {
                setSelectedMountType('')
                setSelectedWeaponType('')
                setWeaponSubType('')
            }

            // Update update currentCount, selectedWeaponCount, unusedWeaponMountList, and reset all 'selectedWeapon...' state variables.
            let newUnusedMountList = unusedWeaponMountList.slice();
            let newCount = 0;

            function updateMounts(locationIndex, setUnusedMountType, unusedMountType) {
                newUnusedMountList[locationIndex] = newUnusedMountList[locationIndex] - selectedWeaponCount;
                setUnusedWeaponMountList(newUnusedMountList);
                setUnusedMountType(unusedMountType - selectedWeaponCount);
                resetWeaponSelection()
                setSelectedWeaponCount(0)
            }

            // Each locationCountArray is [[0],[0],[0]] where each array is one section of the ship.  
            // The first array is the front, the second is the middle, and the third is the rear.
            // As weapon mounts are filled in values will be added to each sub array.
            // A zero value means the mount is empty or is in the process of being filled.
            // A value of 1 means the mount is filled.
            // For example, if the ship has 2 full major front mounts and 1 full major rear mount 
            // shipMajorMountLocationCount would be [[1, 1], [0], [1]].
            // The locationCount value of each weapon object will be incremented based on the index of the locationCountArray.
            // The end result is that the locationCount value of each weapon object will be its index value plus 1.
            function updateLocationCount(locationCountArrayIndex, locationCountArray, setLocationCountArray) {

                let newLocationCountArray = locationCountArray.slice()

                newLocationCountArray[locationCountArrayIndex] = 1
                newLocationCountArray.push(0)

                setLocationCountArray(newLocationCountArray)
            }

            switch (selectedMountType) {
                case 'Spinal Mount':
                    updateMounts(0, setUnusedSpinalMounts, shipUnusedSpinalMounts)
                    break;
                case 'Major (Front)':
                    updateMounts(1, setUnusedMajorMounts, shipUnusedMajorMounts)
                    weapon.locationCount = shipMajorMountLocationCount[0]
                    updateLocationCount(0, shipMajorMountLocationCount, setMajorMountLocationCount)
                    break;
                case 'Major (Middle)':
                    updateMounts(2, setUnusedMajorMounts, shipUnusedMajorMounts)
                    weapon.locationCount = shipMajorMountLocationCount[1]
                    updateLocationCount(1, shipMajorMountLocationCount, setMajorMountLocationCount)
                    break;
                case 'Major (Rear)':
                    updateMounts(3, setUnusedMajorMounts, shipUnusedMajorMounts)
                    weapon.locationCount = shipMajorMountLocationCount[2]
                    updateLocationCount(2, shipMajorMountLocationCount, setMajorMountLocationCount)
                    break;
                case 'Medium (Front)':
                    newCount = currentMediumCountFront + selectedWeaponCount

                    if (newCount === 3) {
                        updateMounts(4, setUnusedMediumMounts, shipUnusedMediumMounts)
                        setCurrentMediumCountFront(0)
                        weapon.locationCount = shipMediumMountLocationCount[0]
                        updateLocationCount(0, shipMediumMountLocationCount, setMediumMountLocationCount)
                    } else {
                        setCurrentMediumCountFront(newCount)
                        weapon.locationCount = shipMediumMountLocationCount[0]
                        updateMounts(4, setUnusedMediumMounts, shipUnusedMediumMounts)
                    }

                    break;
                case 'Medium (Middle)':
                    newCount = currentMediumCountMid + selectedWeaponCount

                    if (newCount === 3) {
                        updateMounts(5, setUnusedMediumMounts, shipUnusedMediumMounts)
                        setCurrentMediumCountMid(0)
                        weapon.locationCount = shipMediumMountLocationCount[1]
                        updateLocationCount(1, shipMediumMountLocationCount, setMediumMountLocationCount)
                    } else {
                        setCurrentMediumCountMid(newCount)
                        weapon.locationCount = shipMediumMountLocationCount[1]
                        updateMounts(5, setUnusedMediumMounts, shipUnusedMediumMounts)
                    }
                    break;
                case 'Medium (Rear)':
                    newCount = currentMediumCountRear + selectedWeaponCount

                    if (newCount === 3) {
                        updateMounts(6, setUnusedMediumMounts, shipUnusedMediumMounts)
                        setCurrentMediumCountRear(0)
                        weapon.locationCount = shipMediumMountLocationCount[2]
                        updateLocationCount(2, shipMediumMountLocationCount, setMediumMountLocationCount)
                    } else {
                        setCurrentMediumCountRear(newCount)
                        weapon.locationCount = shipMediumMountLocationCount[2]
                        updateMounts(6, setUnusedMediumMounts, shipUnusedMediumMounts)
                    }
                    break;
                case 'Secondary (Front)':
                    newCount = currentSecondaryCountFront + selectedWeaponCount

                    if (newCount === 10) {
                        updateMounts(7, setUnusedSecondaryMounts, shipUnusedSecondaryMounts)
                        setCurrentSecondaryCountFront(0)
                        weapon.locationCount = shipSecondaryMountLocationCount[0]
                        updateLocationCount(0, shipSecondaryMountLocationCount, setSecondaryMountLocationCount)
                    } else {
                        setCurrentSecondaryCountFront(newCount)
                        weapon.locationCount = shipSecondaryMountLocationCount[0]
                        updateMounts(7, setUnusedSecondaryMounts, shipUnusedSecondaryMounts)
                    }
                    break;
                case 'Secondary (Middle)':
                    newCount = currentSecondaryCountMid + selectedWeaponCount

                    if (newCount === 10) {
                        updateMounts(8, setUnusedSecondaryMounts, shipUnusedSecondaryMounts)
                        setCurrentSecondaryCountMid(0)
                        weapon.locationCount = shipSecondaryMountLocationCount[1]
                        updateLocationCount(1, shipSecondaryMountLocationCount, setSecondaryMountLocationCount)
                    } else {
                        setCurrentSecondaryCountMid(newCount)
                        weapon.locationCount = shipSecondaryMountLocationCount[1]
                        updateMounts(8, setUnusedSecondaryMounts, shipUnusedSecondaryMounts)
                    }
                    break;
                case 'Secondary (Rear)':
                    newCount = currentSecondaryCountRear + selectedWeaponCount

                    if (newCount === 10) {
                        updateMounts(9, setUnusedSecondaryMounts, shipUnusedSecondaryMounts)
                        setCurrentSecondaryCountRear(0)
                        weapon.locationCount = shipSecondaryMountLocationCount[2]
                        updateLocationCount(2, shipSecondaryMountLocationCount, setSecondaryMountLocationCount)
                    } else {
                        setCurrentSecondaryCountRear(newCount)
                        weapon.locationCount = shipSecondaryMountLocationCount[2]
                        updateMounts(9, setUnusedSecondaryMounts, shipUnusedSecondaryMounts)
                    }
                    break;
                case 'Tertiary (Front)':
                    newCount = currentTertiaryCountFront + selectedWeaponCount

                    if (newCount === 30) {
                        updateMounts(10, setUnusedTertiaryMounts, shipUnusedTertiaryMounts)
                        setCurrentTertiaryCountFront(0)
                        weapon.locationCount = shipTertiaryMountLocationCount[0]
                        updateLocationCount(0, shipTertiaryMountLocationCount, setTertiaryMountLocationCount)
                    } else {
                        setCurrentTertiaryCountFront(newCount)
                        weapon.locationCount = shipTertiaryMountLocationCount[0]
                        updateMounts(10, setUnusedTertiaryMounts, shipUnusedTertiaryMounts)
                    }
                    break;
                case 'Tertiary (Middle)':
                    newCount = currentTertiaryCountMid + selectedWeaponCount

                    if (newCount === 30) {
                        updateMounts(11, setUnusedTertiaryMounts, shipUnusedTertiaryMounts)
                        setCurrentTertiaryCountMid(0)
                        weapon.locationCount = shipTertiaryMountLocationCount[1]
                        updateLocationCount(1, shipTertiaryMountLocationCount, setTertiaryMountLocationCount)
                    } else {
                        setCurrentTertiaryCountMid(newCount)
                        weapon.locationCount = shipTertiaryMountLocationCount[1]
                        updateMounts(11, setUnusedTertiaryMounts, shipUnusedTertiaryMounts)
                    }
                    break;
                case 'Tertiary (Rear)':
                    newCount = currentTertiaryCountRear + selectedWeaponCount

                    if (newCount === 30) {
                        updateMounts(12, setUnusedTertiaryMounts, shipUnusedTertiaryMounts)
                        setCurrentTertiaryCountRear(0)
                        weapon.locationCount = shipTertiaryMountLocationCount[2]
                        updateLocationCount(2, shipTertiaryMountLocationCount, setTertiaryMountLocationCount)
                    } else {
                        setCurrentTertiaryCountRear(newCount)
                        weapon.locationCount = shipTertiaryMountLocationCount[2]
                        updateMounts(12, setUnusedTertiaryMounts, shipUnusedTertiaryMounts)
                    }
                    break;

                default:
                    break;
            }

            if (selectedWeaponType === "GunSpinalFront" || selectedWeaponType === "GunSpinalRear"
                || selectedWeaponType === "GunTurret" || selectedWeaponType === "GunFixed") {
                console.log(`Mount Type: ${weapon.mountType}, Weapon Type: ${weapon.weaponType}, Weapon: ${weapon.weapon}, Fixed: ${weapon.fixed}, Size: ${weapon.size}, Shots: ${weapon.shots}, Damage Dice: ${weapon.dmgDice}, Damage Modifier: ${weapon.dmgMod}, Damage Multiplier: ${weapon.dmgMulti}, SAcc: ${weapon.sAcc}, RC L: ${weapon.rcL}, ROF: ${weapon.roF}, Impulse: ${weapon.impulse}, Damage Types: ${weapon.dmgTypes}, Rapid Fire: ${weapon.rapidFire}, Very Rapid Fire: ${weapon.veryRapidFire}, Improved: ${weapon.improved}, Count: ${weapon.count}, Location Count: ${weapon.locationCount}`);
            }
            setWeaponList(weaponList => weaponList.concat(weapon));
        } else {
            // Add a message saying selectedWeaponCount must be at least 1 here later.
        }
    }

    useEffect(() => {
        if (weaponList.length > 0) {
            console.log(weaponList[0].weaponType);
        }
    }, [weaponList]);

    // This function displays the Weapon Stats component.
    function weaponStatsDisplay() {
        return (
            <div className={styles.weaponStatsContainer}>
                <h2 className={styles.statTitle}>Weapon Stat Block</h2>
                <p className={styles.weaponExplanation}>Unconventional warheads can be added and missile types changed when deploying
                    your ship to the battle map (with TL and Super Science restrictions). Selections at this stage represent the
                    default shell and missile type.</p>
                <span className={styles.weaponLabelCol1}>Spinal Mounts:</span>
                <span className={styles.weaponValueCol1}>{shipUnusedSpinalMounts}</span>
                <span className={styles.weaponLabelCol2}>Unused Major Mounts:</span>
                <span className={styles.weaponValueCol2}>{shipUnusedMajorMounts}</span>
                <span className={styles.weaponLabelCol1}>Unused Medium Mounts:</span>
                <span className={styles.weaponValueCol1}>{shipUnusedMediumMounts}</span>
                <span className={styles.weaponLabelCol2}>Unused Secondary Mounts:</span>
                <span className={styles.weaponValueCol2}>{shipUnusedSecondaryMounts}</span>
                <span className={styles.weaponLabelCol1}>Unused Tertiary Mounts:</span>
                <span className={styles.weaponValueCol1}>{shipUnusedTertiaryMounts}</span>
                <span className={styles.weaponLabelCol2}>Weapon Mount Cargo:</span>
                <span className={styles.weaponValueCol2}>{shipWeaponMountCargo}</span>

                <span className={styles.weaponSelectLabel} >Mount: </span>
                <select className={styles.weaponSelect} value={selectedMountType} onChange={handleWeaponMountChange}>
                    <option value="">Select Weapon Mount</option>
                    {unusedWeaponMountListDisplay.map((mountType) => (
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
                        <span className={styles.freeFillWeaponValue}>{`${weaponSizeDisplayConverter(selectedWeaponSize).toLocaleString()}`}</span>

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

                        <span className={styles.freeFillWeaponLabel}>Rate of Fire (20s /1m /3m /10m): </span>
                        <span className={styles.freeFillWeaponValue}>{`${selectedWeaponRoF[0]}/${selectedWeaponRoF[1]}/${selectedWeaponRoF[2]}/${selectedWeaponRoF[3]}`}</span>

                        <span className={styles.freeFillWeaponLabel}>Recoil: </span>
                        <span className={styles.freeFillWeaponValue}>{selectedWeaponRcl}</span>

                        <span className={styles.freeFillWeaponLabel}>Damage Type: </span>
                        <span className={styles.freeFillWeaponValue}>{selectedWeaponDamageTypes.join(', ')}</span>

                        <span className={styles.freeFillWeaponLabel}>
                            Base Damage: </span>
                        <span className={styles.freeFillWeaponValue}>
                            {`${selectedWeaponDmgDice + 'd'}${selectedWeaponDmgMod !== 0 || selectedWeaponDmgMulti !== 0 ? (selectedWeaponDmgMod !== 0 ? selectedWeaponDmgMod : 'x' + selectedWeaponDmgMulti) : '+0'} / ${selectedWeaponArmorDiv}`}</span>

                        <span className={styles.freeFillWeaponLabel}>Space Accuracy: </span>
                        <span className={styles.freeFillWeaponValue}>{selectedWeaponSAcc}</span>

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

                        <button className={styles.addWeaponButton} onClick={handleAddWeapon}>Add Weapon(s)</button>
                    </>
                )}
            </div>
        )
    }

    return (
        <div className={styles.containerStyle}>
            <h2 className={styles.title}>Create Ship Class</h2>
            <div className={styles.topRow3}>
                <span className={styles.label}>Ship Class Name:&nbsp;</span>
                <textarea value={shipClassName} onChange={handleClassNameChange} />
            </div>
            <div className={styles.topRow3}>
                <span className={styles.label}>Classification:&nbsp;</span>
                <textarea className={styles.topRowTextArea} value={shipClassClassification} onChange={handleClassificationChange} />
            </div>
            <div className={styles.topRow3}>
                <span className={styles.label}>Ship Class Designer:&nbsp;</span>
                <textarea value={shipClassDesigner} onChange={handleDesignerChange} />
            </div>
            <div className={styles.topRow3}>
                <span className={styles.label}>Ship Manufacturer:&nbsp;</span>
                <textarea value={shipClassManufacturer} onChange={handleManufacturerChange} />
            </div>
            <div className={styles.topRow2}>
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
            <div className={styles.topRow2}>
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
            <div className={styles.topRow2}>
                <label className={styles.label}>
                    Super Science:&nbsp;
                    <input className={styles.inputCheckbox}
                        type="checkbox"
                        checked={superScienceChecked}
                        onChange={handleSuperScienceCheckboxChange}
                    />
                </label>
            </div>
            <div className={styles.topRow2}>
                <span className={styles.label}>Un/ Streamlined:</span>
                <select onChange={handleStreamlinedUnChange}>
                    <option value="unstreamlined" selected>Unstreamlined</option>
                    <option value="streamlined">Streamlined</option>
                </select>
            </div>

            <span className={styles.topRowWarning}>WARNING: Changing the TL, SM, Super Science, or Un/Streamlined will reset all modules. &nbsp;WARNING: Some actions and modules allowed in the rules are not allowed in this version.  Mouse over to see details.</span>

            <button className={styles.statComponentButton1} onClick={handleBasicStatsClick}>Basic Stats</button>
            <button className={styles.statComponentButton2} onClick={handleHabitatPowerClick}>Habitat and Power Stats</button>
            <button className={styles.statComponentButton3} onClick={handleWeaponClick}>Weapon Stats</button>

            <span className={`${styles.buildLabel} ${styles.buildCol1} ${styles.buildRow1}`}>Front</span>
            <span className={`${styles.buildLabel} ${styles.buildCol2} ${styles.buildRow1}`}>Middle</span>
            <span className={`${styles.buildLabel} ${styles.buildCol3} ${styles.buildRow1}`}>Rear</span>

            <ShipModuleSelector handleSetModules={handleSetModules} handleSelectedEngine={handleSelectedEngine} selectedEngine={selectedEngine} engineKeys={engineKeys} handleResetModules={handleResetModules} styles={styles} buildCol={styles.buildCol1} buildRow={styles.buildRow2} shipModules={shipModules} shipStreamlinedUn={shipStreamlinedUn} moduleLocation1={'front'} moduleLocation2={'hull'} moduleNumber={1} shipSM={shipSM} shipTL={shipTL} superScience={superScienceChecked} />
            <ShipModuleSelector handleSetModules={handleSetModules} handleSelectedEngine={handleSelectedEngine} selectedEngine={selectedEngine} engineKeys={engineKeys} handleResetModules={handleResetModules} styles={styles} buildCol={styles.buildCol1} buildRow={styles.buildRow3} shipModules={shipModules} shipStreamlinedUn={shipStreamlinedUn} moduleLocation1={'front'} moduleLocation2={'hull'} moduleNumber={2} shipSM={shipSM} shipTL={shipTL} superScience={superScienceChecked} />
            <ShipModuleSelector handleSetModules={handleSetModules} handleSelectedEngine={handleSelectedEngine} selectedEngine={selectedEngine} engineKeys={engineKeys} handleResetModules={handleResetModules} styles={styles} buildCol={styles.buildCol1} buildRow={styles.buildRow4} shipModules={shipModules} shipStreamlinedUn={shipStreamlinedUn} moduleLocation1={'front'} moduleLocation2={'hull'} moduleNumber={3} shipSM={shipSM} shipTL={shipTL} superScience={superScienceChecked} />
            <ShipModuleSelector handleSetModules={handleSetModules} handleSelectedEngine={handleSelectedEngine} selectedEngine={selectedEngine} engineKeys={engineKeys} handleResetModules={handleResetModules} styles={styles} buildCol={styles.buildCol1} buildRow={styles.buildRow5} shipModules={shipModules} shipStreamlinedUn={shipStreamlinedUn} moduleLocation1={'front'} moduleLocation2={'hull'} moduleNumber={4} shipSM={shipSM} shipTL={shipTL} superScience={superScienceChecked} />
            <ShipModuleSelector handleSetModules={handleSetModules} handleSelectedEngine={handleSelectedEngine} selectedEngine={selectedEngine} engineKeys={engineKeys} handleResetModules={handleResetModules} styles={styles} buildCol={styles.buildCol1} buildRow={styles.buildRow6} shipModules={shipModules} shipStreamlinedUn={shipStreamlinedUn} moduleLocation1={'front'} moduleLocation2={'hull'} moduleNumber={5} shipSM={shipSM} shipTL={shipTL} superScience={superScienceChecked} />
            <ShipModuleSelector handleSetModules={handleSetModules} handleSelectedEngine={handleSelectedEngine} selectedEngine={selectedEngine} engineKeys={engineKeys} handleResetModules={handleResetModules} styles={styles} buildCol={styles.buildCol1} buildRow={styles.buildRow7} shipModules={shipModules} shipStreamlinedUn={shipStreamlinedUn} moduleLocation1={'front'} moduleLocation2={'hull'} moduleNumber={6} shipSM={shipSM} shipTL={shipTL} superScience={superScienceChecked} />
            <ShipModuleSelector handleSetModules={handleSetModules} handleSelectedEngine={handleSelectedEngine} selectedEngine={selectedEngine} engineKeys={engineKeys} handleResetModules={handleResetModules} styles={styles} buildCol={styles.buildCol1} buildRow={styles.buildRow8} shipModules={shipModules} shipStreamlinedUn={shipStreamlinedUn} moduleLocation1={'front'} moduleLocation2={'core'} moduleNumber={'CoreFront'} shipSM={shipSM} shipTL={shipTL} superScience={superScienceChecked} />

            <ShipModuleSelector handleSetModules={handleSetModules} handleSelectedEngine={handleSelectedEngine} selectedEngine={selectedEngine} engineKeys={engineKeys} handleResetModules={handleResetModules} styles={styles} buildCol={styles.buildCol2} buildRow={styles.buildRow2} shipModules={shipModules} shipStreamlinedUn={shipStreamlinedUn} moduleLocation1={'middle'} moduleLocation2={'hull'} moduleNumber={1} shipSM={shipSM} shipTL={shipTL} superScience={superScienceChecked} />
            <ShipModuleSelector handleSetModules={handleSetModules} handleSelectedEngine={handleSelectedEngine} selectedEngine={selectedEngine} engineKeys={engineKeys} handleResetModules={handleResetModules} styles={styles} buildCol={styles.buildCol2} buildRow={styles.buildRow3} shipModules={shipModules} shipStreamlinedUn={shipStreamlinedUn} moduleLocation1={'middle'} moduleLocation2={'hull'} moduleNumber={2} shipSM={shipSM} shipTL={shipTL} superScience={superScienceChecked} />
            <ShipModuleSelector handleSetModules={handleSetModules} handleSelectedEngine={handleSelectedEngine} selectedEngine={selectedEngine} engineKeys={engineKeys} handleResetModules={handleResetModules} styles={styles} buildCol={styles.buildCol2} buildRow={styles.buildRow4} shipModules={shipModules} shipStreamlinedUn={shipStreamlinedUn} moduleLocation1={'middle'} moduleLocation2={'hull'} moduleNumber={3} shipSM={shipSM} shipTL={shipTL} superScience={superScienceChecked} />
            <ShipModuleSelector handleSetModules={handleSetModules} handleSelectedEngine={handleSelectedEngine} selectedEngine={selectedEngine} engineKeys={engineKeys} handleResetModules={handleResetModules} styles={styles} buildCol={styles.buildCol2} buildRow={styles.buildRow5} shipModules={shipModules} shipStreamlinedUn={shipStreamlinedUn} moduleLocation1={'middle'} moduleLocation2={'hull'} moduleNumber={4} shipSM={shipSM} shipTL={shipTL} superScience={superScienceChecked} />
            <ShipModuleSelector handleSetModules={handleSetModules} handleSelectedEngine={handleSelectedEngine} selectedEngine={selectedEngine} engineKeys={engineKeys} handleResetModules={handleResetModules} styles={styles} buildCol={styles.buildCol2} buildRow={styles.buildRow6} shipModules={shipModules} shipStreamlinedUn={shipStreamlinedUn} moduleLocation1={'middle'} moduleLocation2={'hull'} moduleNumber={5} shipSM={shipSM} shipTL={shipTL} superScience={superScienceChecked} />
            <ShipModuleSelector handleSetModules={handleSetModules} handleSelectedEngine={handleSelectedEngine} selectedEngine={selectedEngine} engineKeys={engineKeys} handleResetModules={handleResetModules} styles={styles} buildCol={styles.buildCol2} buildRow={styles.buildRow7} shipModules={shipModules} shipStreamlinedUn={shipStreamlinedUn} moduleLocation1={'middle'} moduleLocation2={'hull'} moduleNumber={6} shipSM={shipSM} shipTL={shipTL} superScience={superScienceChecked} />
            <ShipModuleSelector handleSetModules={handleSetModules} handleSelectedEngine={handleSelectedEngine} selectedEngine={selectedEngine} engineKeys={engineKeys} handleResetModules={handleResetModules} styles={styles} buildCol={styles.buildCol2} buildRow={styles.buildRow8} shipModules={shipModules} shipStreamlinedUn={shipStreamlinedUn} moduleLocation1={'middle'} moduleLocation2={'core'} moduleNumber={'CoreMid'} shipSM={shipSM} shipTL={shipTL} superScience={superScienceChecked} />

            <ShipModuleSelector handleSetModules={handleSetModules} handleSelectedEngine={handleSelectedEngine} selectedEngine={selectedEngine} engineKeys={engineKeys} handleResetModules={handleResetModules} styles={styles} buildCol={styles.buildCol3} buildRow={styles.buildRow2} shipModules={shipModules} shipStreamlinedUn={shipStreamlinedUn} moduleLocation1={'rear'} moduleLocation2={'hull'} moduleNumber={1} shipSM={shipSM} shipTL={shipTL} superScience={superScienceChecked} />
            <ShipModuleSelector handleSetModules={handleSetModules} handleSelectedEngine={handleSelectedEngine} selectedEngine={selectedEngine} engineKeys={engineKeys} handleResetModules={handleResetModules} styles={styles} buildCol={styles.buildCol3} buildRow={styles.buildRow3} shipModules={shipModules} shipStreamlinedUn={shipStreamlinedUn} moduleLocation1={'rear'} moduleLocation2={'hull'} moduleNumber={2} shipSM={shipSM} shipTL={shipTL} superScience={superScienceChecked} />
            <ShipModuleSelector handleSetModules={handleSetModules} handleSelectedEngine={handleSelectedEngine} selectedEngine={selectedEngine} engineKeys={engineKeys} handleResetModules={handleResetModules} styles={styles} buildCol={styles.buildCol3} buildRow={styles.buildRow4} shipModules={shipModules} shipStreamlinedUn={shipStreamlinedUn} moduleLocation1={'rear'} moduleLocation2={'hull'} moduleNumber={3} shipSM={shipSM} shipTL={shipTL} superScience={superScienceChecked} />
            <ShipModuleSelector handleSetModules={handleSetModules} handleSelectedEngine={handleSelectedEngine} selectedEngine={selectedEngine} engineKeys={engineKeys} handleResetModules={handleResetModules} styles={styles} buildCol={styles.buildCol3} buildRow={styles.buildRow5} shipModules={shipModules} shipStreamlinedUn={shipStreamlinedUn} moduleLocation1={'rear'} moduleLocation2={'hull'} moduleNumber={4} shipSM={shipSM} shipTL={shipTL} superScience={superScienceChecked} />
            <ShipModuleSelector handleSetModules={handleSetModules} handleSelectedEngine={handleSelectedEngine} selectedEngine={selectedEngine} engineKeys={engineKeys} handleResetModules={handleResetModules} styles={styles} buildCol={styles.buildCol3} buildRow={styles.buildRow6} shipModules={shipModules} shipStreamlinedUn={shipStreamlinedUn} moduleLocation1={'rear'} moduleLocation2={'hull'} moduleNumber={5} shipSM={shipSM} shipTL={shipTL} superScience={superScienceChecked} />
            <ShipModuleSelector handleSetModules={handleSetModules} handleSelectedEngine={handleSelectedEngine} selectedEngine={selectedEngine} engineKeys={engineKeys} handleResetModules={handleResetModules} styles={styles} buildCol={styles.buildCol3} buildRow={styles.buildRow7} shipModules={shipModules} shipStreamlinedUn={shipStreamlinedUn} moduleLocation1={'rear'} moduleLocation2={'hull'} moduleNumber={6} shipSM={shipSM} shipTL={shipTL} superScience={superScienceChecked} />
            <ShipModuleSelector handleSetModules={handleSetModules} handleSelectedEngine={handleSelectedEngine} selectedEngine={selectedEngine} engineKeys={engineKeys} handleResetModules={handleResetModules} styles={styles} buildCol={styles.buildCol3} buildRow={styles.buildRow8} shipModules={shipModules} shipStreamlinedUn={shipStreamlinedUn} moduleLocation1={'rear'} moduleLocation2={'core'} moduleNumber={'CoreRear'} shipSM={shipSM} shipTL={shipTL} superScience={superScienceChecked} />

            {currentStatComponent === 'shipHabitatPowerStats' && <ShipClassHabitatPower
                styles={styles}
                shipModules={shipModules}
                handleHabitatPowerCost={handleHabitatPowerCost}
                shipClassName={shipClassName}
                shipClassDesigner={shipClassDesigner}
                shipClassManufacturer={shipClassManufacturer}
                shipTL={shipTL}
                shipSM={shipSM}
                shipPowerGen={shipPowerGen}
                shipPowerDemand={shipPowerDemand}
                shipPowerPlants={shipPowerPlants}
                setShipPowerPlants={setShipPowerPlants}
                powerPlantsDisplay={powerPlantsDisplay}
                habitatsDisplay={habitatsDisplay}
            />}
            {currentStatComponent === 'shipWeaponStats' && <ShipClassWeaponStats
                styles={styles}
                shipClassName={shipClassName}
                shipClassDesigner={shipClassDesigner}
                shipClassManufacturer={shipClassManufacturer}
                shipTL={shipTL}
                shipSM={shipSM}
                weaponStatsDisplay={weaponStatsDisplay}

            />}
            {currentStatComponent === 'shipClassStatBlock' && <ShipClassStatBlock
                styles={styles}
                shipClassName={shipClassName}
                shipClassClassification={shipClassClassification}
                shipClassDesigner={shipClassDesigner}
                shipClassManufacturer={shipClassManufacturer}
                shipTL={shipTL}
                shipSM={shipSM}
                shipStreamlinedUnDisplay={shipStreamlinedUnDisplay}
                shipDisplayCost={shipDisplayCost}
                shipMove={shipMove}
                shipPowerGen={shipPowerGen}
                shipPowerDemand={shipPowerDemand}
                shipWorkspaces={shipWorkspaces.toLocaleString()}
                shipCabins={shipCabinsCapacity.toLocaleString()}
                shipFuelLoad={shipFuelLoad}
                displaydSTHP={shipdSTHP.toLocaleString()}
                shipHT={shipHT}
                shipDisplaydDR={shipDisplaydDR}
                shipDefensiveECMBonus={shipDefensiveECMBonus}
                shipSpinalMounts={shipSpinalMounts}
                shipMajorMounts={shipMajorMounts}
                shipMediumMounts={shipMediumMounts.toLocaleString()}
                shipSecondaryMounts={shipSecondaryMounts.toLocaleString()}
                shipTertiaryMounts={shipTertiaryMounts.toLocaleString()}
                shipDisplayHndSR={shipDisplayHndSR}
                shipDisplayMass={shipMass.toLocaleString()}
                shipDisplayLength={shipLength.toLocaleString()}
                shipComplexity={shipComplexity}
                shipOccupancy={shipOccupancy.toLocaleString()}
                shipTotalCargoAllTypes={shipTotalCargoAllTypes.toLocaleString()}
                shipHangarCapacity={shipHangarCapacity.toLocaleString()}
                shipLaunchRateDisplay={shipLaunchRate.toLocaleString()}
            />}

            <div className={styles.classNotes}>
                <p className={styles.label}>Class Notes:</p>
                <textarea className={styles.notesArea} value={classNotes} onChange={(e) => setClassNotes(e.target.value)} />
            </div>

            <div className={styles.cargoContainer}>
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