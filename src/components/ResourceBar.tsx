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
import Resources from '../scripts/Resources';

const ResourceBar: React.FC<{res: Resources, happ: number, pop: number}> = ({res, happ, pop}) => 
{
    return (
        <div className="resource_bar">
            <div className="resource_bar_box">
                <img alt="food icon" src={IconFood}/>
                <span>{Math.trunc(res.food)}</span>
            </div>
            
            <div className="resource_bar_box">
                <img alt="wood icon" src={IconWood}/>
                <span>{Math.trunc(res.wood)}</span>
            </div>

            <div className="resource_bar_box">
                <img alt="stone icon" src={IconStone}/>
                <span>{Math.trunc(res.stone)}</span>
            </div>

            <div className="resource_bar_box">
                <img alt="metal icon" src={IconMetal}/>
                <span>{Math.trunc(res.metal)}</span>
            </div>

            <div className="resource_bar_box">
                <img alt="currency icon" src={IconMoney}/>
                <span>{Math.trunc(res.currency)}</span>
            </div>

            <div className="resource_bar_box">
                <img alt="knowledge icon" src={IconKnowl}/>
                <span>{Math.trunc(res.knowledge)}</span>
            </div>

            <div className="resource_bar_box">
                <img alt="happiness icon" src={IconHapp3}/>
                <span>{Math.trunc(happ) + "%"}</span>
            </div>

            <div className="resource_bar_box">
                <img alt="population icon" src={IconPop}/>
                <span>{pop}</span>
            </div>

        </div>
    );
}
export default ResourceBar;