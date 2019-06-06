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
    hidePlayer();
    this.setState({ state: this.state });
  }

  updateHeader = () =>{
    setTimeout(()=>{
      this.setState({ refresh: this.refresh })
    }, 2000)
  }




  render() {
    return(
      <div className='App-Menu'>
        <Link className={this.targetButton('/')}  onClick={() => {this.refresh(); this.props.setMenuPhoneClick()}} to="/" >Homepage</Link>
        <Link className={this.targetButton('/findsound')}  onClick={() => {this.refresh(); this.props.setMenuPhoneClick()}} to="/findsound">Sounds</Link>
        <Link className={this.targetButton('/findartist')} onClick={() => {this.refresh(); this.props.setMenuPhoneClick()}} to="/findartist">Artists</Link>
        <Link className={this.targetButton('/findalbum')}  onClick={() => {this.refresh(); this.props.setMenuPhoneClick()}} to="/findalbum">Albums</Link>
        <Link className={this.targetButton('/findgenres')} onClick={() => {this.refresh(); this.props.setMenuPhoneClick()}} to="/findgenres">Category</Link>
        <Link className={this.targetButton('/favourite')}  onClick={() => {this.refresh(); this.props.setMenuPhoneClick()}} to="/favourite">Favourite</Link>
          {this.updateHeader()}
        </div>  
    )
  }
}

export default AppHeader;
