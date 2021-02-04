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
const Game: React.FC = () => 
{
    useEffect(() => {
        const intervalSlow = setInterval(clockSlow, TimeConfig.slowClockInterval);
        const intervalFast = setInterval(clockFast, TimeConfig.fastClockInterval);
        return () => {
            clearInterval(intervalSlow);
            clearInterval(intervalFast);
        }
    });

    const [tick, setTick] = useState<number>(0);
    const [day, setDay] = useState<number>(0);
    const [year, setYear] = useState<number>(1);

    const [resources, setResources] = useState<Resources>(Resources.zero);
    const [storage, setStorage] = useState<Resources>(Resources.zero);
    const [pop, setPop] = useState<number>(20);
    const [happ, setHapp] = useState<number>(70);
    const [researchedTech, setResearchedTech] = useState<CityItem[]>([]);
    const [availableTech, setAvailableTech] = useState<CityItem[]>([]);
    const [builtBld, setBuiltBld]= useState<CityItem[]>([]);
    const [availableBld, setAvailableBld]= useState<CityItem[]>([]);
    const [constrSlotsInUse, setConstrSlotsInUse] = useState<number>(0);
    const [constrSlots, setConstrSlots] = useState<number>(1);
    const [constrForce, setConstrForce] = useState<number>(4);
    const [researchForce, setResearchForce] = useState<number>(1);
    const [researching, setResearching] = useState<boolean>(false);

    //main clocks of the game
    function clockSlow(): void
    {

    }

    function clockFast(): void
    {
        keepTime();
        profit();
    }

    function keepTime(): void
    {
        if (tick % TimeConfig.dayEveryNTicks === 0)
        {
            if (day === TimeConfig.daysInYear)
            {
                setYear(year + 1);
                setDay(1);
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

    const viewCity: React.ReactNode = <div></div>;
    const viewPantheon: React.ReactNode = <div className="mid_view">
        <GodTab/>
        <GodTab/>
        <GodTab/>
        <GodTab/>
        <GodTab/>
    </div>;

    return (
        <Fragment>
        <div className="row">
            <div className="panel_top panel_side panel_l">
                <CityItemMenu/>
            </div>
            <div className="panel_top panel_central">
                <MidView day={day} year={year} viewCity={null} viewPantheon={null} viewMilitary={null} viewWorld={null}/>
            </div>
            <div className="panel_top panel_side panel_r">
                <h2 className="mng_title">Gathering Resources</h2>
                <div className="mng_wrapper mng_wrapper_gathering">
                    <FiniteButton text="Food"/>
                    <FiniteButton text="Wood"/>
                    <FiniteButton text="Stone"/>
                    <FiniteButton text="Metal"/>
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
                <CityItemMenu/>
            </div>
            <div className="panel_central">
                <ResourceBar res={resources} happ={happ} pop={pop}/>
                <MessageLog/>
            </div>
            <div className="panel_side panel_r">
                <CityItemMenu/>
            </div>
        </div>
        </Fragment>
    );
}

export default Game;