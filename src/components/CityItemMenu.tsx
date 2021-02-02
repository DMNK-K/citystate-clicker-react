import React from 'react';
import './component_styles/StyleCityItemMenu.css';
import CityItemBox from './CityItemBox';

const CityItemMenu: React.FC = () => 
{

    return (
        <div className="menu_wrapper">
            <div className="menu">
                <CityItemBox/>
                <CityItemBox/>
            </div>
        </div>
    );
}

export default CityItemMenu;