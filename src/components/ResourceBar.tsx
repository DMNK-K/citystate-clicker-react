import React from 'react';
import './component_styles/StyleResourceBar.css';

import IconFood from '../images/resource_icons/icon_food.png';
import IconWood from '../images/resource_icons/icon_wood.png';
import IconStone from '../images/resource_icons/icon_stone.png';
import IconMetal from '../images/resource_icons/icon_metal.png';
import IconMoney from '../images/resource_icons/icon_money.png';
import IconKnowl from '../images/resource_icons/icon_knowl.png';
import IconPop from '../images/resource_icons/icon_pop.png';
import IconHapp1 from '../images/resource_icons/icon_happl.png';
import IconHapp2 from '../images/resource_icons/icon_happ2.png';
import IconHapp3 from '../images/resource_icons/icon_happ3.png';
import IconHapp4 from '../images/resource_icons/icon_happ4.png';

const ResourceBar: React.FC = () => 
{
    return (
        <div className="resource_bar">
            <div className="resource_bar_box">
                <img alt="food icon" src={IconFood}/>
                <span>0</span>
            </div>
            
            <div className="resource_bar_box">
                <img alt="wood icon" src={IconWood}/>
                <span>0</span>
            </div>

            <div className="resource_bar_box">
                <img alt="stone icon" src={IconStone}/>
                <span>0</span>
            </div>

            <div className="resource_bar_box">
                <img alt="metal icon" src={IconMetal}/>
                <span>0</span>
            </div>

            <div className="resource_bar_box">
                <img alt="currency icon" src={IconMoney}/>
                <span>0</span>
            </div>

            <div className="resource_bar_box">
                <img alt="knowledge icon" src={IconKnowl}/>
                <span>0</span>
            </div>

            <div className="resource_bar_box">
                <img alt="happiness icon" src={IconHapp3}/>
                <span>0</span>
            </div>

            <div className="resource_bar_box">
                <img alt="population icon" src={IconPop}/>
                <span>0</span>
            </div>

        </div>
    );
}
export default ResourceBar;