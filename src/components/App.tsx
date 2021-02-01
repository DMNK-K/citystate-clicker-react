import React, { Fragment } from 'react';
import './component_styles/StyleApp.css';
import Game from './Game';
import Logo from '../images/misc_images/page_icon.png';

const App: React.FC = () =>
{
  return (
    <Fragment>
      <header>
        <div className="header_side_wrapper">
          
        </div>
        <div className="header_central_wrapper">
          <img alt="logo" src={Logo} className="title_img img_pf"/>
          <h1>CityState Clicker</h1>
          <img alt="logo" src={Logo} className="title_img img_pf"/>
        </div>
        <div className="header_side_wrapper">
          <button className="header_button">New Game</button>
          <button className="header_button">Info</button>
          <button className="header_button">Settings</button>
          <button className="header_button"></button>
          <button className="header_button"></button>
        </div>
      </header>
      <Game/>
    </Fragment>
  );
}

export default App;
