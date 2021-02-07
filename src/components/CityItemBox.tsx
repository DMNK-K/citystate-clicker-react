import React from 'react';
import './component_styles/StyleCityItemBox.css';
import CityItem from '../scripts/CityItem';

const CityItemBox: React.FC<{item: CityItem}> = ({item}) => 
{
    return (
        <div className="item_box">
            <div className="item_img_wrapper">
                <img alt={item.uiName + " icon"} src={item.iconPath} className="item_img img_pf"/>
                {item.lvl > 0 && <div className="item_img_label">{"Lvl " + item.lvl}</div>}
            </div>
            <div className="item_content">
                <div className="item_content_bar">
                    <h3 className="item_name">{item.uiName}</h3>
                    <div className="item_cost">

                    </div>
                </div>
                <div className="item_progress_bar">
                    <div className="item_progress_percent">{Math.trunc(item.progress) + "%"}</div>
                    <div className="item_progress_indicator"></div>
                </div>
                <p className="item_desc">
                    {item.desc}
                </p>
            </div>
        </div>
    );
}

export default CityItemBox;