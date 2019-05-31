import React from 'react';
import axios from 'axios';
import RandomSingleTrack from './RandomSingleTrack';
import RandomArtist from './RandomArtist';
import RandomAlbums from './RandomAlbums';
import { randomOffset, randomLetter} from './Service'


class HomePage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      randomSongs:[]
    }
  }

  
    //CZYSZCZENIE TABLLICY Z LOSOWYMI PIOSENKAMI I POBIERANIE LOSOWEJ LISTY 20 PIOSENEK//
  refresh(){
    if(this.props.mytoken.length > 0){
    axios({
      url: `https://api.spotify.com/v1/search?q=*${randomLetter()}*&type=track&limit=10&offset=${randomOffset()}`,
      headers:{
      'Authorization': 'Bearer ' + this.props.mytoken
      }
    }).then(resp =>  this.setState({
      randomSongs:  resp.data.tracks.items
    })).then(resp =>{
      setTimeout(()=>{
        const Loader = document.querySelector('.Loader');
        Loader.className = 'Loader Shadow-Loader';
        const  Shadow = document.querySelector('.Loader-Shadow-Box');
        Shadow.className= "Loader-Shadow-Box Shadow-Key";
      },1000)
        setTimeout(()=>{
          const Loader = document.querySelector('.Loader');
          Loader.className = 'Loader';
          Loader.style.display = 'none';
        },1400)
        setTimeout(()=>{
          const  Shadow = document.querySelector('.Loader-Shadow-Box');
          Shadow.className= "Loader-Shadow-Box";
          Shadow.style.display= "none";
          const ShadowScroll = document.querySelector('html');
          ShadowScroll.style.overflowY = 'visible';
        },2200)

    })}
  }

    //  WCZYTYWANIE LOSOWEJ LISTY PRZY KAZDYM WEJSCIU NA HOMEPAGE//
  componentDidMount(){
    const Loader = document.querySelector('.Loader')
    Loader.style.display = 'block';
    const  Shadow = document.querySelector('.Loader-Shadow-Box')
    Shadow.className= "Loader-Shadow-Box"
    Shadow.style.display = 'block';
    Shadow.style.zIndex = '1998';
    const ShadowScroll = document.querySelector('html');
    ShadowScroll.style.overflowY = 'hidden';
    this.refresh()
  }

  componentWillReceiveProps(props,state){
    if(this.props.myToken !== "")
    this.refresh()
  }

 render() {
   
  return(
    <div className='Homepage-Box'>
      <div className="Left-Clear"></div>
      <div className="Right-Clear"></div>
      <div className='Title-Boxx' > RANDOM ALBUMS</div>
      <div className="Homepage-Albums-Box">
        <div className="Album-Box-Left-Smooth"></div> 
        <div className="Homepage-Albums-Animation-Handler">
          <div className="Homepage-Albums-Box1">
            <RandomAlbums mytoken={this.props.mytoken}/>
          </div>
          <div className="Homepage-Albums-Box2">
            <RandomAlbums mytoken={this.props.mytoken}/>
          </div>
          <div className="Homepage-Albums-Box3">
            <RandomAlbums mytoken={this.props.mytoken}/>
          </div>
        </div>
        <div className="Album-Box-Right-Smooth"></div> 
      </div>
      <div className='Homepage-Track-Box '>
        <div className='Title-Box' >RANDOM TRACKS</div>
     { this.state.randomSongs.map((element, index)=>
      <RandomSingleTrack  key={index} parentElement={element} parentIndex={index} />
      )}
     </div>
     <div className='Homepage-Artist-Box'>
     <div className="Title-Box">RANDOM ARTISTS</div>
     <RandomArtist mytoken={this.props.mytoken}/>
     </div>
    </div>
  )
}
}

export default HomePage;
