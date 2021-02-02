import React from 'react';
import './component_styles/StyleManageButton.css'

interface PropsManageButton
{
    text: string;
}

const ManageButton: React.FC<PropsManageButton> = ({text}) =>
{
    return(
        <button className="manage_button button_standard">
            <div className="manage_button_progress"></div>
            <p className="manage_button_label">{text}</p>
            <div className="manage_button_details">

            </div>
        </button>
    );
}

export default ManageButton;