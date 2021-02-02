import React, { Fragment } from 'react';
import CityItemMenu from './CityItemMenu';
import './component_styles/StyleGame.css';
import MessageLog from './MessageLog';
import ResourceBar from './ResourceBar';
import Resources from '../scripts/Resources';
import MidView from './MidView';
import FiniteButton from './FiniteButton';
import ManageButton from './ManageButton';

const Game: React.FC = () => 
{
    return (
        <Fragment>
        <div className="row">
            <div className="panel_top panel_side panel_l">
                <CityItemMenu/>
            </div>
            <div className="panel_top panel_central">
                <MidView viewCity={null} viewPantheon={null} viewMilitary={null} viewWorld={null}/>
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
                <ResourceBar res={Resources.zero} happ={0} pop={0}/>
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