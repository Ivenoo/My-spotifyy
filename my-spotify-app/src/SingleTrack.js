import React from 'react';
import {listen} from './Service'


class SingleTrack extends React.Component {
    constructor(props){
        super(props);
        this.state ={
          refresh: ""
        }
    }

      // USTAWIANIE SERCA ORAZ PODMIENIANIE KOLORU  W ZALEZNOSCI CZY DODANA ZOSTALA PIOSENKA CZY NIE//
    heart = ((id) => {
      const favourite =JSON.parse(localStorage.getItem('favourite'));
      let heartTrue = 0;
      
      favourite.forEach(element=>{
        if(element === id){
          heartTrue = 1;
        }
      })
      if(heartTrue){
        return(<img  alt=" "  className="button-favourite" src="./img/red.png" width="40px" height="40px" onClick={this.changeFavourite.bind(this, id)}/>)
      }else{
        return(<img  alt=" " className="button-favourite" src="./img/white.png" width="40px" height="40px" onClick={this.changeFavourite.bind(this, id)}/>)
      }
    })
    
      // DODAWANIE PIOSENKI DO ULUBIONYCH//
    changeFavourite = (id) =>{
        if(!localStorage.getItem('favourite')){
          const favourite= [id]
          localStorage.setItem("favourite", JSON.stringify(favourite));
        }else{
          const favourite = JSON.parse(localStorage.getItem('favourite'));
          let favouriteTrue = 0;
          let favouriteIndex;
          
          for(let i=0; i< favourite.length; i++){
            if(favourite[i] === id){
              favouriteTrue = 1;
              favouriteIndex = i;
              break;
            }
          } 
          if(!favouriteTrue){
            favourite.push(id)
            localStorage.setItem("favourite", JSON.stringify(favourite))
            this.setState({
              favourite: ''
            })
          }
          else{
            favourite.splice(favouriteIndex, 1)
            localStorage.setItem("favourite", JSON.stringify(favourite));
            this.setState({
              favourite: ''
            })
          }
        }
    }

      //OTWIERANIE FRAGMENTU UTWORU W NOWYM OKNIE//


    render(){
      const parentElement = this.props.parentElement;
      const parentIndex = this.props.parentIndex;
      let trackLink = ""
      if(parentElement.preview_url !== null) 
      trackLink = <img  className="button-favourite" onClick={() =>{listen(parentElement.preview_url)}} src="http://www.freepngclipart.com/download/logo/44070-play-computer-youtube-button-icons-download-free-image.png" width="30px" heigth="30px" alt =" "/>
          return(
            <li  key={parentIndex}>
            Author: {parentElement.artists.map((element2, index) => { 
               return(<span key={index}>{element2.name}, </span>)})}<br/>
            Title: <strong className="track-name">" {parentElement.name} "</strong><br/>
            <img src={parentElement.album.images[2].url} height="40px" width="40px" alt=" " /><br/>
            {trackLink}
            {this.heart(parentElement.id)}
            </li>
            )

    }   
}

export default SingleTrack;


