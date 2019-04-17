import React from 'react';
//import axios from 'axios';




class HomePage extends React.Component {
  constructor(){
    super()
    this.state = {
      randomSongs:[],
      quert: ''
    }
  }
getList = () => {
const BASE_URL= 'https://api.spotify.com/v1/search?';
//const ALBUM_URL = 'https://api.spotify.com/v1/artists';
let FETCH_URL = BASE_URL+ 'q=' + this.state.query
const auth_token = 'Bearer BQC6llf2x4CxyHvVeL6BY8GgTU0JKppBnnStRdgl1haYOPiLq-chGaWnR3fc0oZb8SCLQOG0FSuoVWP2dVmer7Cs8QYuIoOPJZQJdl9Zwx584moVndk_8X_g3ohFpFMj4cxarT2QXcW3aWmN2yq-qoaCwwHk8HBLc-ga'

fetch(FETCH_URL,{
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': auth_token,
  },
  mode: 'cors',
  cache: 'default'
}).then(resp => resp.json()).then(resp => console.log(resp))
}  
  // getList = () =>{
  //   axios.get(`https://accounts.spotify.com/authorize?client_id=117d27b1289d42db9486c20b03fb57a3&scopes=playlist-read-private&response_type=code&redirect_uri=https%3A%2F%2Flocalhost%3A3000%2F`)
    
  //   .then(resp => alert("bla"))
  // }



 
  render() {

    return(
      <div>
        homepage
        {this.getList()}
      </div>
    )
  }
}

export default HomePage;
