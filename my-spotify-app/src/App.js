import React from 'react';
import AppHeader from './AppHeader';
import Content from './Content';
import axios from 'axios';
import {BrowserRouter as Router} from "react-router-dom";
 
class App extends React.Component {
  constructor(){
    super();
    this.state = {
      mytoken : "",
      typeTracks: []
    }
  }
 
  
                      // POBIERANIE LISTY  TYPÓW MUZYKI //
  getGenres = () =>{
    axios({
      url: `https://api.spotify.com/v1/browse/categories?limit=50`,
      headers: {
        'Authorization': 'Bearer ' + this.state.mytoken
    }}
    ).then( resp =>{
      this.setState({
        typeTracks: resp.data.categories.items
      })
    })
    .catch(error =>{
      console.log(new Error(`Wystąpił problem ${error}`))
      const test400 = String(error).indexOf(`Request failed with status code 400`)
      const test401 = String(error).indexOf(`Request failed with status code 401`)
      if ((test400 > -1) || (test401 > -1)){
        this.refreshToken()
      }
    })
  }
                              // ODSWIEZANIE TOKENA //
  refreshToken = () =>{
    const request = require("request");
     
    const options = { method: 'POST',
      url: 'https://accounts.spotify.com/api/token',
      qs: { grant_type: 'client_credentials' },
      headers:
       { 'cache-control': 'no-cache',
         Connection: 'keep-alive',
         'content-length': '',
         'accept-encoding': 'gzip, deflate',
         cookie: '_ga=GA1.2.729828902.1557929894; _gid=GA1.2.629422520.1557929894',
         Host: 'accounts.spotify.com',
         'Postman-Token': 'efd95536-22cb-4ef2-ae72-e723183d6cd6,4c56ad54-2d22-4dd2-8774-968820564f2f',
         'Cache-Control': 'no-cache',
         Accept: '*/*',
         'User-Agent': 'PostmanRuntime/7.13.0',
         Authorization: 'Basic MWYxYjk1ZmEyMzdjNDc4ZWE4ZmVkNjkzYzc3OTM3NTU6MmVlNjIwM2Q5NDU3NDVjNjgzNmExMzg0MWRhMDUzYTY=',
         'Content-Type': 'application/x-www-form-urlencoded' } };
     
    request(options,  (error, response, body) => {
      if (error) throw new Error(error);
      if (response){
        response = JSON.parse(response.body)
        this.setState({
          mytoken: response.access_token
        })
        this.getGenres()
        setTimeout(()=>{this.refreshToken()} , 3500000)
      }
    });  
  }



  check = () =>{
    if(this.state.mytoken === ''){
      this.refreshToken() 
    }
  } 

  setMenuPhoneClick = () => {
    let menuItems = document.querySelectorAll('.Menu-Buttons');
    let phoneMenuIcon = document.querySelector('.Phone-Menu');
 
    if(document.querySelectorAll(".Menu-Buttons-Open").length === 0){
      phoneMenuIcon.classList.add("Phone-Menu-Selected")
      menuItems.forEach(element=>
        element.classList.add("Menu-Buttons-Open")
      )
    }
    else{
      phoneMenuIcon.classList.remove("Phone-Menu-Selected")
      menuItems.forEach(element=>
        element.classList.remove("Menu-Buttons-Open")
      )
    }
  }

  
  setMenuPhoneClick = () => {
    let menuItems = document.querySelectorAll('.Menu-Buttons');
    let phoneMenuIcon = document.querySelector('.Phone-Menu');
 
    if(document.querySelectorAll(".Menu-Buttons-Open").length === 0){
      phoneMenuIcon.classList.add("Phone-Menu-Selected")
      menuItems.forEach(element=>
        element.classList.add("Menu-Buttons-Open")
      )
    }
    else{
      phoneMenuIcon.classList.remove("Phone-Menu-Selected")
      menuItems.forEach(element=>
        element.classList.remove("Menu-Buttons-Open")
      )
    }
  }

  render() {
    if(!localStorage.getItem("limit")){
      localStorage.setItem("limit" , 20)
    }
  
    this.check()
    if(this.state.mytoken === ''){
      return(
        <div></div>
      )
    }else{
      return(
      <Router>
      <div className="App">
      <div className="Loader-Shadow-Box"></div>
        <div className="Loader"><img  className="Loader-Icon" alt=" " src='./img/loader.gif'/></div>
      <div className="centralaxDD"></div>
      <img src="./img/scroll-up.png" className="Phone-Menu" alt=" " onClick={()=>this.setMenuPhoneClick()}></img>
        <AppHeader selectAction={this.selectAction} setMenuPhoneClick={this.setMenuPhoneClick.bind(this)} />
        <Content action={this.state.action} mytoken={this.state.mytoken} refreshToken={this.refreshToken} getGenres={this.getGenres} typeTracks={this.state.typeTracks}/> 
      </div>
      </Router>
      );
    }

  }
}
 
export default App;