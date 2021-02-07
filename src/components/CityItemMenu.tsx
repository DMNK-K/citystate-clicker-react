import React, { ReactNode } from 'react';
import './component_styles/StyleCityItemMenu.css';
import CityItemBox from './CityItemBox';
import CityItem from '../scripts/CityItem';

const CityItemMenu: React.FC<{items: CityItem[]}> = ({items}) => 
{

    const itemBoxes: ReactNode[] = items.map((item) => <CityItemBox item={item} key={item.name}/>);

    return (
        <div className="menu_wrapper">
            <div className="menu">
                {itemBoxes}
            </div>
        </div>
    );
}

export default CityItemMenu;