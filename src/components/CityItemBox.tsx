import React from 'react';
import './component_styles/StyleCityItem.css';

const CityItemBox: React.FC = () => 
{
    return (
        <div className="item_box">
            <div className="item_img_wrapper">
                <img alt="" src="" className="item_img"/>
                <div className="item_img_label">Lvl 1</div>
            </div>
            <div className="item_content">
                <h3 className="item_name">Name</h3>
                <div className="item_cost_bar">

                </div>
                <div className="item_progress_bar">
                    <div className="item_progress_percent"></div>
                    <div className="item_progress_indicator"></div>
                </div>
                <p className="item_desc">

                </p>
            </div>
        </div>
    );
}

export default CityItemBox;