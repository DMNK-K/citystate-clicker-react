import React, { Fragment } from 'react';
import CityItemMenu from './CityItemMenu';
import './component_styles/StyleGame.css';
import MessageLog from './MessageLog';
import ResourceBar from './ResourceBar';

const Game: React.FC = () => 
{
    return (
        <Fragment>
        <div className="row">
            <div className="panel_top panel_side panel_l">
                <CityItemMenu/>
            </div>
            <div className="panel_top panel_central">

            </div>
            <div className="panel_top panel_side panel_r">

            </div>
        </div>
        <div className="row">
            <div className="panel_side panel_l">
                <CityItemMenu/>
            </div>
            <div className="panel_central">
                <ResourceBar/>
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