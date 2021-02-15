/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Util from '../scripts/Util';
import './component_styles/StyleFiniteButton.css'

interface PropsFiniteButton
{
    text: string,
    disabled: boolean;
    onSuccess: () => void,
    onLucky: () => void,
    luckChance: number,
    availableMax: number,
    replenishTimeMs: number,
    minSuccessChance: number
}

interface StateFiniteButton
{
    available: number,
    replenishInterval: undefined | number
}

class FiniteButton extends React.Component<PropsFiniteButton, StateFiniteButton>
{
    state: StateFiniteButton = {available: this.props.availableMax, replenishInterval: undefined};

    constructor(props: PropsFiniteButton)
    {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.replenish = this.replenish.bind(this);
        
    }

    componentDidMount()
    {
        const interval = window.setInterval(this.replenish, this.props.replenishTimeMs);
        this.setState({replenishInterval: interval});
    }

    componentWillUnmount()
    {
        window.clearInterval(this.state.replenishInterval);
    }

    replenish(): void
    {
        this.setState(prevState => ({available: Util.clamp(prevState.available + 1, 0, this.props.availableMax)}));
    }

    handleClick(): void
    {
        let availablePercent = Math.round(100 * this.state.available / this.props.availableMax);
        const chance = (availablePercent > this.props.minSuccessChance) ? availablePercent : this.props.minSuccessChance;
        if (Util.rChance(chance) && this.state.available > 0)
        {
            if (Util.rChance(this.props.luckChance))
            {
                this.props.onLucky();
            }
            else
            {
                this.props.onSuccess();
            }
            this.setState(prevState => ({available: prevState.available - 1}));
        }
    }

    render()
    {
        return(
            <button disabled={this.props.disabled && this.state.available <= 0} onClick={this.handleClick} className="finite_button">
                {this.props.text}
                <div className="finite_button_amount" style={{width: (60 * this.state.available / this.props.availableMax) + "%"}}></div>
            </button>
        );
    }
}

export default FiniteButton;