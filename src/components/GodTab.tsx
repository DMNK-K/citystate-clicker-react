import React from 'react';
import './component_styles/StyleGodTab.css'

const GodTab: React.FC = () =>
{
    return(
        <div className="god_tab">
            <div className="god_left"></div>
            <div className="god_circle"></div>
            <div className="god_right"></div>
            <div className="god_name">Eola</div>
            <div className="god_desc">Bla bla bla. Thfughu uuf fb hbsgv gv.</div>
            <button className="god_accept">Accept</button>
        </div>
    );
}

export default GodTab;