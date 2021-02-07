import React, { Fragment, useEffect } from 'react';
import './component_styles/StyleApp.css';
import Game from './Game';
import Logo from '../images/misc_images/page_icon.png';
import Loader from '../scripts/Loader';
import Saver from '../scripts/Saver';

class App extends React.Component
{
  loader: Loader | null = null;

  componentDidMount()
  {
    this.loader = new Loader();
    Saver.unlockSaving();
  }



  render()
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
            <button className="header_button" onClick={() => {Saver.lockSaving(); Saver.clearSave();  window.location.reload();}}>New Game</button>
            <button className="header_button">Info</button>
            <button className="header_button">Settings</button>
            <button className="header_button"></button>
            <button className="header_button"></button>
          </div>
        </header>
        <Game loader={new Loader()}/>
      </Fragment>
    );
  }
  
}

export default App;
