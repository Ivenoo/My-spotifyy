import React from 'react';


class SingleTrack extends React.Component {
    constructor(props){
        super(props);
        this.state ={
          refresh: ""
        }
    }

      // USTAWIANIE SERCA ORAZ PODMIENIANIE KOLORU  W ZALEZNOSCI CZY DODANA ZOSTALA PIOSENKA CZY NIE//
    heart = ((id) => {
      const fav =JSON.parse(localStorage.getItem('fav'));
      let heartTrue = 0;
      
      fav.forEach(element=>{
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
        if(!localStorage.getItem('fav')){
          const favourite= [id]
          localStorage.setItem("fav", JSON.stringify(favourite));
        }else{
          const fav = JSON.parse(localStorage.getItem('fav'));
          let favouriteTrue = 0;
          let favouriteIndex;
          
          for(let i=0; i< fav.length; i++){
            if(fav[i] === id){
              favouriteTrue = 1;
              favouriteIndex = i;
              break;
            }
          } 
          if(!favouriteTrue){
            fav.push(id)
            localStorage.setItem("fav", JSON.stringify(fav))
            this.setState({
              fav: ''
            })
          }
          else{
            fav.splice(favouriteIndex, 1)
            localStorage.setItem("fav", JSON.stringify(fav))
            this.setState({
              fav: ''
            })
          }
        }
    }

      //OTWIERANIE FRAGMENTU UTWORU W NOWYM OKNIE//
    listen(url){
      if(url != null){
        window.open(url)
      }
    }

    render(){
      const parentElement = this.props.parentElement;
      const parentIndex = this.props.parentIndex;
      let trackLink = ""
      if(parentElement.preview_url !== null) 
      trackLink = <img  className="button-favourite" onClick={this.listen.bind(this, parentElement.preview_url)} src="http://www.freepngclipart.com/download/logo/44070-play-computer-youtube-button-icons-download-free-image.png" width="30px" heigth="30px" alt =" "/>
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


