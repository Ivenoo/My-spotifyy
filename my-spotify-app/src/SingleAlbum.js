import React from 'react';
import axios from 'axios';
import { get } from 'https';
// import {listen} from './Service'


class SingleAlbum extends React.Component {
    constructor(props){
        super(props);
        this.state ={
          timeout: 0
        }
    }

      //POBIERA  INFORMACJE O ALBUMIE I ZWRACA  JAKO ELEMENT LISTY//
    showSongs(index, id){
      const div= document.getElementById(index);
      let timeouter = this.state.timeout
      if(timeouter) clearTimeout(timeouter);
      timeouter = setTimeout(() => {
        if(div.innerHTML === ""){
          axios({
            url: `https://api.spotify.com/v1/albums/${id}/tracks`,
            headers:{
            'Authorization': 'Bearer ' + this.props.mytoken
            }
          }).then(resp =>{ 
            const infoBox = document.querySelector('.Find-Albums-Tracks-Box')
            infoBox.innerHTML = '';
            console.log(resp)
          resp.data.items.map(element => {
            if(element.preview_url != null){
            return(infoBox.innerHTML = infoBox.innerHTML + `<div>  <a  class="name-songs-linked" style="color:blue" href=${element.preview_url} target="_blank"> ${element.name} </a>  </div><br/>`)
          }else{
            return(infoBox.innerHTML = infoBox.innerHTML + `<div> ${element.name} </div><br/>`)
          }})
          }).catch(error => (new Error(console.log(error))))
        }
      }, 400);
    }

      //ZMIANA PRZYCISKU ROZWIJANIA LISTY//
      changeButton = (id) =>{
        document.getElementById(id).style.display = "none";
        document.getElementById(id +'a').style.display = "block";
      }

      //ROZWIJANIE LISTY //
    openList = (index, id) =>{
      this.showSongs(index, id)
    }
    

    
    render(){
      const parentElement = this.props.parentElement;
      const parentIndex = this.props.parentIndex;
      return(
        <div  key={parentIndex} className="Find-Albums-One-Album">
       Author: {parentElement.artists.map((element2, index) => { 
         return(<span key={index +1} >{element2.name}, </span>)})}<br/>
        Album: <strong className="album-name">" {parentElement.name} "</strong><br/>
        <img src={parentElement.images[2].url}
        height="40px" width="40px" alt=" " /><br/>
        <button id={parentElement.id} key= {parentIndex +2} className="main-button" onClick={this.openList.bind(this, parentIndex, parentElement.id)}>tracks from this album</button><br/>
        <ol id={parentIndex} className="to-kill"></ol><br/><br/><br/>
        </div>
        )

    }   
}

export default SingleAlbum;


