import React from 'react';
import { listen } from './Service'


class SingleTrack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refresh: ""
    }
  }

  // USTAWIANIE SERCA ORAZ PODMIENIANIE KOLORU  W ZALEZNOSCI CZY DODANA ZOSTALA PIOSENKA CZY NIE//
  heart = ((id) => {
    let favourite = [];
    let heartTrue = 0;
    if (localStorage.getItem('favourite')) {
      favourite = JSON.parse(localStorage.getItem('favourite'));
      favourite.forEach(element => {
        if (element === id) {
          heartTrue = 1;
        }
      })
    }
    if (heartTrue) {
      return (<img alt=" " className="Single-Track-Button-Favourite" src="./img/red.png" onClick={this.changeFavourite.bind(this, id)} />)
    } else {
      return (<img alt=" " className="Single-Track-Button-Favourite" src="./img/white.png" onClick={this.changeFavourite.bind(this, id)} />)
    }
  })

  // DODAWANIE PIOSENKI DO ULUBIONYCH//
  changeFavourite = (id) => {
    if (!localStorage.getItem('favourite')) {
      const favourite = [id]
      localStorage.setItem("favourite", JSON.stringify(favourite));
    } else {
      const favourite = JSON.parse(localStorage.getItem('favourite'));
      let favouriteTrue = 0;
      let favouriteIndex;

      for (let i = 0; i < favourite.length; i++  ) {
        if (favourite[i] === id) {
          favouriteTrue = 1;
          favouriteIndex = i;
          break;
        }
      }
      if (!favouriteTrue) {
        favourite.push(id)
        localStorage.setItem("favourite", JSON.stringify(favourite))
      }
      else {
        favourite.splice(favouriteIndex, 1)
        localStorage.setItem("favourite", JSON.stringify(favourite));
      }
    }
    this.setState({
      refresh: ''
    })
  }

  //OTWIERANIE FRAGMENTU UTWORU W NOWYM OKNIE//
  yt = (url) => {
    window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(url)}`)
  }
  spotify = (url) => {
    window.open(url)
  }
  soundcloud = (url) => {
    window.open(`https://soundcloud.com/search/sounds?q=${encodeURIComponent(url)}`)
  }

  render() {
    const parentElement = this.props.parentElement;
    const parentIndex = this.props.parentIndex;
    let trackLink = "";
    if (parentElement.preview_url !== null)
      trackLink = <img className="Single-Track-Play-Icon" onClick={() => { listen(parentElement.preview_url, parentElement.name) }} src="http://www.freepngclipart.com/download/logo/44070-play-computer-youtube-button-icons-download-free-image.png" width="30px" heigth="30px" alt=" " />

    let tableArtists = [], title = '';

    parentElement.artists.map(element2 => {
      if (tableArtists.length < parentElement.artists.length - 1) {
        tableArtists.push(`${element2.name},\u2002`)
      } else {
        tableArtists.push(`${element2.name}`)
      }
      return(0);
    })

    let finishArtists = <span className='Single-Track-Author'>{tableArtists}</span>

    if (tableArtists.length > 3 && window.location.pathname !== '/favourite') {
      finishArtists = <marquee><span className='Single-Track-Author'>{tableArtists}</span></marquee>
    }

    if (tableArtists.length > 3 && window.location.pathname === "/findgenres") {
      finishArtists = <span className='Single-Track-Author'><marquee>{tableArtists}</marquee></span>
    }
    const forPhone = window.matchMedia("(max-width: 799px)")
    if(forPhone.matches){
      if (tableArtists.length > 2 && window.location.pathname === "/findgenres") {
      finishArtists = <span className='Single-Track-Author'><marquee>{tableArtists}</marquee></span>
      }
    }
  

    let imges = ''
    if (parentElement.album !== undefined) {
      imges = <img src={parentElement.album.images[0].url} className="Single-Track-Img" alt=" " />
    } else {
      imges = ''
    }

    if (parentElement.name.length >= 40 && window.location.pathname === '/findgenres') {
      title = <marquee><span className="Single-Track-Name">" {parentElement.name} "</span></marquee>
    } else {
      title = <span className="Single-Track-Name">" {parentElement.name} "</span>
    }

    let forTablet = window.matchMedia("(max-width: 900px)")
    if (forTablet.matches) {   
      if (parentElement.name.length >= 77) {
        title = <marquee><span className="Single-Track-Name">" {parentElement.name} "</span></marquee>
      } else if (parentElement.name.length < 77) {
        title = <span className="Single-Track-Name">" {parentElement.name} "</span>
      }
    }

    if(forTablet.matches){
      if(parentElement.name.length >= 25 && window.location.pathname === "/findgenres"){
        title = <marquee><span className="Single-Track-Name">" {parentElement.name} "</span></marquee>
      }else if(parentElement.name.length < 25 && window.location.pathname === "/findgenres"){
        title =  <span className="Single-Track-Name">" {parentElement.name} "</span>
      }
    }

    if (parentElement.name.length >= 40 && window.location.pathname === '/findalbum') {
      title = <marquee><span className="Single-Track-Name">" {parentElement.name} "</span></marquee>
    } else if(parentElement.name.length < 40 && window.location.pathname === '/findalbum') {
      title = <span className="Single-Track-Name">" {parentElement.name} "</span>
    }
    
    return (
      <div key={parentIndex} className="Single-Track" >
        {/* <div className="Single-Track-Img-Play"> */}
        {imges}
        {trackLink}
        {/* </div> */}
        <div className="Shadow-Box"> </div>
        <div className="Single-Track-Info-Box">
          <span className="Single-Track-Author-Title">Author : </span>
          <div className="Single-Track-Author-Box">{finishArtists}</div>
          <span className="Single-Track-Name-Title">Title : </span>
          <div className="Single-Track-Marquee">
            <div className="Find-Artists-Marquee-Box">
              {title}<br />
            </div>
          </div>
          <div className="Single-Track-Icon-Box">
            {this.heart(parentElement.id)}
            <a onClick={this.soundcloud.bind(this, parentElement.name)} ><img src='./img/soundcloud-icon.png' className="Single-Track-Comunity-Portal-soundcloud" alt=" " /></a>
            <a onClick={this.spotify.bind(this, parentElement.external_urls.spotify)} ><img src='./img/spotify-icon.png' className="Single-Track-Comunity-Portal-spotify" alt=" " /></a>
            <a onClick={this.yt.bind(this, parentElement.name)} ><img src='./img/yt-icon.png' className="Single-Track-Comunity-Portal-yt" alt=" " /></a>
          </div>
        </div>
      </div>
    )

  }
}

export default SingleTrack;