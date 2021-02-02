import React, { Fragment } from 'react';
import CityItemMenu from './CityItemMenu';
import './component_styles/StyleGame.css';
import MessageLog from './MessageLog';
import ResourceBar from './ResourceBar';
import Resources from '../scripts/Resources';
import MidView from './MidView';

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