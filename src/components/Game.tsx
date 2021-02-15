import React, { Fragment, useEffect, useState } from 'react';
import CityItemMenu from './CityItemMenu';
import './component_styles/StyleGame.css';
import MessageLog from './MessageLog';
import ResourceBar from './ResourceBar';
import Resources from '../scripts/Resources';
import MidView from './MidView';
import FiniteButton from './FiniteButton';
import ManageButton from './ManageButton';
import GodTab from './GodTab';
import CityItem from '../scripts/CityItem';
import TimeConfig from '../config/TimeConfig';
import Loader from '../scripts/Loader';
import Saver from '../scripts/Saver';
import GatheringStats from '../scripts/GatheringStats';
import Feature from '../scripts/Feature';

const Game: React.FC<{loader: Loader}> = ({loader}) => 
{
    //this one on every rerender
    useEffect(() => {
        window.addEventListener("beforeunload", handleExit);
        const intervalSlow = setInterval(clockSlow, TimeConfig.slowClockInterval);
        const intervalFast = setInterval(clockFast, TimeConfig.fastClockInterval);
        return () => {
            clearInterval(intervalSlow);
            clearInterval(intervalFast);
            window.removeEventListener("beforeunload", handleExit);
        }
    });

    const [tick, setTick] = useState<number>(loader.loadTicks());
    const [day, setDay] = useState<number>(loader.loadDay());
    const [year, setYear] = useState<number>(loader.loadYear());

    const [resources, setResources] = useState<Resources>(loader.loadResources());
    const [storage, setStorage] = useState<Resources>(loader.loadStorage());
    const [pop, setPop] = useState<number>(loader.loadPop());
    const [happ, setHapp] = useState<number>(loader.loadHapp());
    const [researchedTech, setResearchedTech] = useState<CityItem[]>(loader.loadResearchedTech());
    const [availableTech, setAvailableTech] = useState<CityItem[]>(loader.loadAvailableTech());
    const [unavailableTech, setUnavailableTech] = useState<CityItem[]>(loader.loadUnavailableTech());
    const [builtBld, setBuiltBld]= useState<CityItem[]>(loader.loadBuiltBuildings());
    const [availableBld, setAvailableBld]= useState<CityItem[]>(loader.loadAvailableBuildings());
    const [unavailableBld, setUnavailableBld]= useState<CityItem[]>(loader.loadUnavailableBuildings());

    //a lot of these variables could be inferred into local variables based on other state variables
    //but they are kept as a separate state to avoid looping through and
    //inferring all the time, eg constrSlotsInUse could be determined by looping through
    //availableBld and checking how many of them have inProgress = true, but it can also be set
    //every time construction starts and stops
    const [constrSlotsInUse, setConstrSlotsInUse] = useState<number>(0);
    const [constrSlots, setConstrSlots] = useState<number>(1);
    const [constrForce, setConstrForce] = useState<number>(4);
    const [researchForce, setResearchForce] = useState<number>(1);
    const [researching, setResearching] = useState<boolean>(false);

    const [gatheringStats, setGatheringStats] = useState<GatheringStats[]>([
        new GatheringStats("Food", Resources.f, Resources.f.mult(3), 0.025, 2000, 10),
        new GatheringStats("Wood", Resources.w, Resources.w.mult(2), 0.025, 3000, 8),
        new GatheringStats("Stone", Resources.s, new Resources(0, 0, 2, 1, 0, 0), 0.025, 5000, 5),
        new GatheringStats("Metal", Resources.m, new Resources(0, 0, 0, 4, 3, 0), 0.025, 5000, 4),
    ]);

    const [features, setFeatures] = useState<Feature[]>([]);

    function handleExit(): void
    {
        Saver.saveGame(resources, happ, pop, [...builtBld, ...researchedTech], tick, day, year)
    }

    //main clocks of the game
    function clockSlow(): void
    {

    }

    function clockFast(): void
    {
        keepTime();
        profit();
        progressConstruction();
    }

    function keepTime(): void
    {
        if (tick % TimeConfig.dayEveryNTicks === 0)
        {
            if (day === TimeConfig.daysInYear)
            {
                setYear(year + 1);
                setDay(1);
                Saver.saveGame(resources, happ, pop, [...builtBld, ...researchedTech], tick, day, year);
            }
            else
            {
                setDay(day + TimeConfig.dayIncrement);
            }
        }
        setTick(tick + 1);
    }

    function profit(): void
    {
        const profit: Resources = Resources.zero;
        for (let i: number = 0; i < builtBld.length; i++)
        {
            profit.add(builtBld[i].profit);
        }
        setResources(resources.add(profit).clamp(Resources.zero, storage));
    }

    function gather(res: Resources): void
    {
        setResources(resources.add(res).clamp(Resources.zero, storage));
    }

    function progressConstruction(): void
    {
        for (let i: number = 0; i < availableBld.length; i++)
        {
            
        }
        for (let i: number = 0; i < builtBld.length; i++)
        {
            
        }
    }

    function progressTech(): void
    {
        
    }

    function tryStartResearch(tech: CityItem)
    {
        if (tech.isTech && tech.canLvlUp && resources.biggerEqThan(tech.cost) && !researching)
        {

        }
    }

    function tryStartConstruction(bld: CityItem)
    {
        if (!bld.isTech && bld.canLvlUp && resources.biggerEqThan(bld.cost) && constrSlotsInUse < constrSlots)
        {
            
        }
    }
    const dayIsDivBy5: boolean = day % 5 === 0;
    console.log(dayIsDivBy5);

    const viewCity: React.ReactNode = <div></div>;
    const viewPantheon: React.ReactNode = <div className="mid_view">
        <GodTab/>
        <GodTab/>
        <GodTab/>
        <GodTab/>
        <GodTab/>
    </div>;

    const gatheringButtons = gatheringStats.map((stat) => 
        <FiniteButton key={stat.name} text={stat.name} disabled={false} onSuccess={() => gather(stat.base)} onLucky={() => gather(stat.lucky)} luckChance={stat.luckChance} availableMax={stat.availableMax} replenishTimeMs={stat.replenishTime} minSuccessChance={35}/>
    );

    return (
        <Fragment>
        <div className="row">
            <div className="panel_top panel_side panel_l">
                <CityItemMenu items={builtBld}/>
            </div>
            <div className="panel_top panel_central">
                <MidView day={day} year={year} viewCity={null} viewPantheon={null} viewMilitary={null} viewWorld={null}/>
            </div>
            <div className="panel_top panel_side panel_r">
                <h2 className="mng_title">Gathering Resources</h2>
                <div className="mng_wrapper mng_wrapper_gathering">
                    {gatheringButtons}
                </div>
                <h2 className="mng_title">Management</h2>
<               div className="mng_wrapper mng_wrapper_management">
                    <ManageButton text="Food Rations: Standard"/>
                    <ManageButton text="Collect Taxes"/>
                    <ManageButton text="Conduct Experiment"/>
                    <ManageButton text="Announce Holiday"/>
                </div>
                <h2 className="mng_title">Trade</h2>

            </div>
        </div>
        <div className="row">
            <div className="panel_side panel_l">
                <CityItemMenu items={availableBld}/>
            </div>
            <div className="panel_central">
                <ResourceBar res={resources} happ={happ} pop={pop}/>
                <MessageLog/>
            </div>
            <div className="panel_side panel_r">
                <CityItemMenu items={availableTech}/>
            </div>
        </div>
        </Fragment>
    );
}

export default Game;