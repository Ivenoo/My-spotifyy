import React from 'react';
import axios from 'axios';
import SingleTrack from './SingleTrack';
import Limit from './Limit'

class Favourite extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      favArray: [],
      myoffset: 0,
      limit: 5,
    }
  }

  // FUNKCJA POBIERAJACA ULUBIONE PIOSENKI PO ID (KTORE JEST W LOCAL STORAGE)//
  myFavouriteSongs =(e) =>{
    const ShadowScroll = document.querySelector('html');
    ShadowScroll.style.overflowY = 'hidden';
    const Loader = document.querySelector('.Loader')
    Loader.style.display = 'block';
    const  Shadow = document.querySelector('.Loader-Shadow-Box')
    Shadow.className= "Loader-Shadow-Box"
    Shadow.style.display = 'block';
    Shadow.style.zIndex = '1998';
    setTimeout(() =>{ 
      JSON.parse(localStorage.getItem('favourite')).map(element =>
      axios({
        url: `https://api.spotify.com/v1/tracks/${element}`,
        headers:{
         'Authorization': 'Bearer ' + this.props.mytoken
        }
      }).then(resp =>{  
        this.state.favArray.push(resp.data)
          this.setState({
            favArray: this.state.favArray
          }) 
      }).then(resp =>{

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
         },2200)

      })
    )
    },10)
  }

  componentDidMount(){
    this.myFavouriteSongs()
  }

      //USTAWIENIE LIMITU WYSWIETLANYCH PIOSENEK//
  changeLimit = (e) =>{
    const ShadowScroll = document.querySelector('html');
    ShadowScroll.style.overflowY = 'visible';
    const newLimit = e.currentTarget.value
    this.setState({
      limit: newLimit,
      myoffset: 0
    })
  }

      //WYSWIETLANIE KOLEJNYCH PIOSENEK Z LISTY ULUBIONYCH (NEXT) //
  addOffset =() =>{
    this.setState({
      myoffset: parseInt(this.state.myoffset) + parseInt(this.state.limit)
    })
  }
  
      // WYSWIETLANEI POPRZEDNICH PIOSENEK (PREVIOUS) DZIALA PO UPRZEDNIM KLIKNIECIU NA NEXT//
  removeOffset =() =>{
    this.setState({
      myoffset: parseInt(this.state.myoffset) - parseInt(this.state.limit)
    })
  }



  render() {
    let prevButton = "", nextButton = "";
    if(this.state.myoffset  > 0){
      prevButton = <div className="Prev-Button" onClick={this.removeOffset}> PREV </div>
    }
    if(this.state.myoffset < this.state.favArray.length - this.state.limit){
      nextButton = <div className="Next-Button" onClick={this.addOffset}> NEXT </div>
    }
    return(
      <div className='Favourite-Song'>
        <div className='Favourite-Song-Options'>
          {prevButton}
          {nextButton}
          <div className="Favourite-Song-Options-Limit-Box">
            Limit: <Limit changeLimit={this.changeLimit.bind(this)}/>
          </div>
        </div>
        <div className="Favourite-Song-Box">
          {this.state.favArray.slice(this.state.myoffset,parseInt(this.state.myoffset) + parseInt(this.state.limit)).map((element,index) =>
            <SingleTrack  key={index} parentElement={element} parentIndex={index}/>
          )}
        </div>
      </div>
      )
    }
}

export default Favourite;
