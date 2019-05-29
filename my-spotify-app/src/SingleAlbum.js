import React from 'react';
import axios from 'axios';
import { get } from 'https';
import SingleTrack from './SingleTrack';
// import {listen} from './Service'


class SingleAlbum extends React.Component {
    constructor(props){
        super(props);
        this.state ={
          timeout: 0,
        }
    }

    testow = (index) =>{
      return(`playlist${index}`)
    }

    
    render(){
      const parentElement = this.props.parentElement;
      const parentIndex = this.props.parentIndex;
      return(
        <div  id={this.testow(parentIndex)} className="Find-Albums-One-Album">
        <span className="Single-Album-Title">Album:</span>
        <span className="Single-Album-Title-Value" >{parentElement.name}</span>  <br/>
        <span className="Single-Album-Author-Title">Author:</span> <br/>
        {parentElement.artists.map((element2, index) => { 
         return(<span key={index +1} className="Single-Album-Author-Value" >{element2.name}, </span>)})}<br/>
         <span><span className="Single-Album-Total">total tracks:</span> <br/>{parentElement.total_tracks}</span> 
        <img src={parentElement.images[2].url}
        className="Single-Album-Img" alt=" " /><br/>
        <button id={parentElement.id} key= {parentIndex +2} className="main-button" onClick={this.props.tracksList.bind(this,parentElement.id,parentIndex)}><span>Show Tracks</span></button><br/>
        <ol id={parentIndex} className="to-kill"></ol><br/><br/><br/>
        {/* <span className="Single-Album-Find-Spotify-Title">Find On Spotify</span> */}
        <img src='./img/spotify-icon.png' className="Single-Album-Find-Spotify" alt=" "   onClick={()=> window.open(parentElement.external_urls.spotify)}/>
        </div>
        )

    }   
}

export default SingleAlbum;


