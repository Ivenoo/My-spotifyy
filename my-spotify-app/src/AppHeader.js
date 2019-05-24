import React from 'react';
import {Link} from 'react-router-dom'
import {hidePlayer} from "./Service"


// KOMPONENT  WYSWIETLAJACY MENU //

class AppHeader extends React.Component {
  constructor(){
    super()
    this.state= {
      refresh: ''
    }
  }

  targetButton =(value) =>{
    if(window.location.pathname === value){
      return('Menu-Buttons Default-Location')
    }else{
      return('Menu-Buttons')
    }
  }

  refresh(){
    this.setState({
       refresh: ''
    }); 
    hidePlayer()
  }
 
  render() {
    return(
      <div className='App-Menu'>
        <Link className={this.targetButton('/')}  onClick={() => {this.refresh()}} to="/" >Homepage</Link>
        <Link className={this.targetButton('/findsound')}  onClick={() => {this.refresh()}} to="/findsound">Sounds</Link>
        <Link className={this.targetButton('/findartist')} onClick={() => {this.refresh()}} to="/findartist">Artists</Link>
        <Link className={this.targetButton('/findgenres')} onClick={() => {this.refresh()}} to="/findgenres">Genres</Link>
        <Link className={this.targetButton('/findalbum')}  onClick={() => {this.refresh()}} to="/findalbum">Albums</Link>
        <Link className={this.targetButton('/favourite')}  onClick={() => {this.refresh()}} to="/favourite">Favourite</Link>
        </div>  
    )
  }
}

export default AppHeader;
