import React from 'react';
import {listen} from './Service'


class RandomSingleTrack extends React.Component {
    constructor(props){
        super(props);
        this.state ={
          refresh: ""
        }
    }

      // USTAWIANIE SERCA ORAZ PODMIENIANIE KOLORU  W ZALEZNOSCI CZY DODANA ZOSTALA PIOSENKA CZY NIE//
    heart = ((id) => {
      let favourite = [];
      let heartTrue = 0;
      if(localStorage.getItem('favourite')){
        favourite = JSON.parse(localStorage.getItem('favourite'));
        favourite.forEach(element=>{
          if(element === id){
            heartTrue = 1;
          }
        })
      }
      if(heartTrue){
        return(<img  alt=" "  className="Single-Track-Button-Favourite" src="./img/red.png"  onClick={this.changeFavourite.bind(this, id)}/>)
      }else{
        return(<img  alt=" " className="Single-Track-Button-Favourite" src="./img/white.png" onClick={this.changeFavourite.bind(this, id)}/>)
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
          }
          else{
            favourite.splice(favouriteIndex, 1)
            localStorage.setItem("favourite", JSON.stringify(favourite));
          }
        }
      this.setState({
        refresh: ''
      })
    }

      //OTWIERANIE FRAGMENTU UTWORU W NOWYM OKNIE//
      yt = (url) =>{
        window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(url)}`)
      }
      spotify = (url) =>{
        window.open(url)
      }
      soundcloud = (url,author) =>{
        window.open(`https://soundcloud.com/search/sounds?q=${encodeURIComponent(url)}%20${encodeURIComponent(author)}`)
      }

    render(){
      const parentElement = this.props.parentElement;
      const parentIndex = this.props.parentIndex;
      let trackLink = ""
      if(parentElement.preview_url !== null) 
      trackLink = <img  className="Single-Track-Play-Icon" onClick={() =>{listen(parentElement.preview_url,parentElement.name)}} src="http://www.freepngclipart.com/download/logo/44070-play-computer-youtube-button-icons-download-free-image.png" width="30px" heigth="30px" alt =" "/>
          return(
            <div  key={parentIndex} className="Single-Track" >
              <img src={parentElement.album.images[1].url}  className="Single-Track-Img" alt=" " />
              {trackLink}
            <div className="Single-Track-Info-Box">
              <span className="Single-Track-Author-Title">Author : </span>
                <div >
                  <span  className="Single-Track-Author "> {parentElement.artists[0].name}</span><br/>
                </div>
              <span className="Single-Track-Name-Title">Title : </span>
              <marquee className="Single-Track-Marquee-Author"  >
              <span className="Single-Track-Name">" {parentElement.name} "</span><br/>
              </marquee>
              <div className="Single-Track-Icon-Box">
                {this.heart(parentElement.id)}
                <a onClick={this.yt.bind(this,parentElement.name)} ><img src='./img/yt-icon.png' className="Single-Track-Comunity-Portal-yt" alt=" " /></a>
                <a onClick={this.spotify.bind(this, parentElement.external_urls.spotify)} ><img src='./img/spotify-icon.png' className="Single-Track-Comunity-Portal-spotify" alt=" " /></a>
                <a onClick={this.soundcloud.bind(this,parentElement.name,parentElement.artists[0].name)} ><img src='./img/soundcloud-icon.png' className="Single-Track-Comunity-Portal-soundcloud" alt=" " /></a>
              </div>
            </div>
            
            </div>
            )

    }   
}

export default RandomSingleTrack;


