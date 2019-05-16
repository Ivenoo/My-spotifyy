import React from 'react';
import axios from 'axios';
import Favourite from './Favourite';


class SingleAlbum extends React.Component {
    constructor(props){
        super(props);
        this.state ={
          timeout: 0
        }
    }


    showSongs(index, id){
      const div= document.getElementById(index);
      
      if(this.state.timeout) clearTimeout(this.state.timeout);
        this.state.timeout = setTimeout(() => {
      if(div.innerHTML === ""){
        axios({
          url: `https://api.spotify.com/v1/albums/${id}/tracks`,
          headers:{
           'Authorization': 'Bearer ' + this.props.mytoken
          }
        }).then(resp =>{ 
         resp.data.items.map(element => {
           if(element.preview_url != null){
          return(div.innerHTML = div.innerHTML + `<li>  <a  class="name-songs-linked" style="color:blue" href=${element.preview_url} target="_blank"> ${element.name} </a>  </li><br/>`)
        }else{
          return(div.innerHTML = div.innerHTML + `<li> ${element.name} </li><br/>`)
        }})
      
        }).catch(error => (new Error(console.log(error))))
      }
      }, 400);
      }
      changeButton = (id) =>{
        document.getElementById(id).style.display = "none";
        document.getElementById(id +'a').style.display = "block";
      }
      
    openList = (index, id) =>{
      this.showSongs(index, id)
      setTimeout(() =>{this.changeButton(id)},500);
    }
    closeList = (index, id) =>{
      document.getElementById(index).innerHTML = "";
      document.getElementById(id).style.display = "block";
      document.getElementById(id +'a').style.display = "none";
    }
    
    render(){
      const parentElement = this.props.parentElement;
      const parentIndex = this.props.parentIndex;
      return(
        <li  key={parentIndex}>
       Author: {parentElement.artists.map((element2, index) => { 
         return(<span key={index +1} >{element2.name}, </span>)})}<br/>
        Album: <strong className="album-name">" {parentElement.name} "</strong><br/>
        <img src={parentElement.images[2].url}
        height="40px" width="40px" alt=" " /><br/>
        <button id={parentElement.id} key= {parentIndex +2} className="main-button" onClick={this.openList.bind(this, parentIndex, parentElement.id)}>tracks from this album</button>
        <button id={parentElement.id +'a'} key= {parentIndex +3} className="main-buttonc" onClick={this.closeList.bind(this, parentIndex , parentElement.id) }>close tracks list</button><br/>
        <ol id={parentIndex} className="to-kill"></ol><br/><br/><br/>
        </li>
        )

    }   
}

export default SingleAlbum;


