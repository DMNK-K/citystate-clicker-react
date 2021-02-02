import React from 'react';
import './component_styles/StyleFiniteButton.css'

interface PropsFiniteButton
{
    text: string;
}

const FiniteButton: React.FC<PropsFiniteButton> = ({text}) =>
{
    return(
        <button className="finite_button">
            {text}
            <div className="finite_button_amount"></div>
        </button>
    );
}

export default FiniteButton;