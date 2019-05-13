import React from 'react';
import AppHeader from './AppHeader';
import Content from './Content';
import axios from 'axios'
 
class App extends React.Component {
  constructor(){
    super();
    this.state = {
      action: "homePage",
      mytoken : "",
      typeTracks: []
    }
  }
 
  selectAction = (action, event) =>{
    this.setState({
      action
    })
  }
 
  getGenres = () =>{
    axios({
      url: `https://api.spotify.com/v1/recommendations/available-genre-seeds`,
      headers: {
        'Authorization': 'Bearer ' + this.state.mytoken
    }}
    ).then( resp =>{
      this.setState({
        typeTracks: resp.data.genres
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
 
 
  refreshToken = () =>{
    
    axios({
      method: "GET",
      url: 'https://accounts.spotify.com/authorize?client_id=1f1b95fa237c478ea8fed693c7793755&response_type=token&scope=user-read-private%20user-read-email&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F'
    }).then(resp =>{
      if(window.location.href.indexOf("access_token=") < 0 ){
        const adress = window.open(resp.request.responseURL)
        adress.addEventListener('load', (event) => {
          const url = String(adress.location)
          adress.close()
          const start = url.indexOf('access_token=') + 13;
          const stop = url.indexOf('&token_type=')
          const token = url.slice(start,stop)
          console.log(this.state.mytoken)
          this.setState({
            mytoken: token
          })
         this.getGenres()
        });
      }
       
    })
    .catch(error =>console.log(new Error(`Wystąpił problem ${error}`)))
  }
 
 
 
  // // ++++++++++++++++  Client Credentials Flow ++++++++++++++++++++++++++
  // token = () =>{
  //   const CLIENT_ID = 'f9d33397eb674ca789d6fb448a2e7377';
  //   const CLIENT_SECRET = '8634936da44d49d88f040f28ddc40247';
  //   const auth = "Basic " + new Buffer(CLIENT_ID + ":" + CLIENT_SECRET).toString('base64')
   
  //   console.log(auth)
 
  //   axios({
  //     method: "POST",
  //     url: "https://accounts.spotify.com/api/token",
  //     headers:{
  //       "Content-Type": "application/x-www-form-urlencoded",
  //       "Authorization" : "Basic ZjlkMzMzOTdlYjY3NGNhNzg5ZDZmYjQ0OGEyZTczNzc6ODYzNDkzNmRhNDRkNDlkODhmMDQwZjI4ZGRjNDAyNDc=",
  //     },
  //     data: {
  //       "grant_type": "authorization_code",
  //     },
  //     // json: true,
  //     })
  //     .then(resp => {
  //       console.log(resp)
  //     })
  //     .catch(error => console.log(new Error(`Wystąpił problem ${error}`)))
  // }
 
  render() {
    if(!localStorage.getItem("limit")){
      localStorage.setItem("limit" , 20)
    }
 
    return (
      <div className="App">
        <AppHeader selectAction={this.selectAction} />
        <hr className='menu-line'/>
        <div className="App-Content">
          <Content action={this.state.action} mytoken={this.state.mytoken} refreshToken={this.refreshToken} getGenres={this.getGenres} typeTracks={this.state.typeTracks}/>
        </div>
      </div>
    );
  }
}
 
export default App;