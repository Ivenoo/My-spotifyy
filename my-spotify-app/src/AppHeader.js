import React from 'react';
import {Link} from 'react-router-dom'


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
 
  render() {
    return(
      <div className='App-Menu'>
        <Link className={this.targetButton('/')}  onClick={() => {this.setState({ refresh: ''})}} to="/" >Homepage</Link>
        <Link className={this.targetButton('/findsound')}  onClick={() => {this.setState({ refresh: ''})}}  to="/findsound">Find Sound</Link>
        <Link className={this.targetButton('/findartist')} onClick={() => {this.setState({ refresh: ''})}} to="/findartist">Find Artist</Link>
        <Link className={this.targetButton('/findgenres')} onClick={() => {this.setState({ refresh: ''})}} to="/findgenres">Find Genres</Link>
        <Link className={this.targetButton('/findalbum')}  onClick={() => {this.setState({ refresh: ''})}} to="/findalbum">Find Album</Link>
        <Link className={this.targetButton('/favourite')}  onClick={() => {this.setState({ refresh: ''})}} to="/favourite">Favourite</Link>
        </div>  
    )
  }
}

export default AppHeader;
