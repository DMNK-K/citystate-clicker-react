import React, { ReactNode, useEffect, useState } from 'react';
import './component_styles/StyleMidView.css'

interface PropsMidView
{
    viewPantheon: ReactNode | null,
    viewCity: ReactNode | null,
    viewWorld: ReactNode | null,
    viewMilitary: ReactNode | null,
}

enum MidViews{Pantheon, Military, World, City};

const MidView: React.FC<PropsMidView> = ({viewPantheon, viewCity, viewMilitary, viewWorld}) =>
{

    const [currentView, setCurrentView] = useState<MidViews>(MidViews.City);
    const [debugOpen, toggleDebug] = useState<boolean>(false);

    // useEffect(() => {
    //     document.addEventListener("keypress", toggleDebug);
    //     return function cleanup(){

    //     }
    // });

    // const onkeypress(e)
    // {

    // }

    return(
        <div className="mid_view_space">
            <div className="mid_view_tab time_box">Day 200 of year 1</div>
            {viewPantheon && <button onClick={()=>setCurrentView(MidViews.Pantheon)} className="mid_view_tab pantheon_tab">Pantheon</button>}
            {viewCity && <button onClick={()=>setCurrentView(MidViews.City)} className="mid_view_tab city_view_tab">City View</button>}
            {viewWorld && <button onClick={()=>setCurrentView(MidViews.World)} className="mid_view_tab world_view_tab">World View</button>}
            {viewMilitary && <button onClick={()=>setCurrentView(MidViews.Military)} className="mid_view_tab military_tab">Military</button>}

            {currentView === MidViews.City && viewCity}
            {currentView === MidViews.Pantheon && viewPantheon}
            {currentView === MidViews.Military && viewMilitary}
            {currentView === MidViews.World && viewWorld}

            <div className="debug_window">

            </div>
        </div>
    );
}

export default MidView;