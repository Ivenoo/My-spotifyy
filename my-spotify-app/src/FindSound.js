import React from 'react';
import axios from 'axios';
import SingleTrack from './SingleTrack';
import Limit from './Limit'
import {hidePlayer} from './Service'

let timeouter;

class FindSound extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchValue: '',
      trackList:[],
      limit: 5,
      prev: null,
      next: null,
      myoffset: 'offset=0',
      notFindTracks: 'exist',
      timeout: 0,
      refresh: ''
    }
  }
    //  USTAWIANIE ILOSCI WYSWIETLANYCH PIOSENEK //
  limit(e){
  const limitValue = e.currentTarget.value
  this.setState({
    limit: limitValue,
  })
  setTimeout(() => this.search(this.state.searchValue),10)
}
    //POBIERANIE WARTOSCI INPUTA I PRZYPISYWANIE DO STANU//
  inputValue(e){
    const value = e.currentTarget.value
    this.setState({
      searchValue: value
    })
    setTimeout(() => this.search(this.state.searchValue),10)
  }
    //FUNKCJA  PRZYPISUJACA CZYSZCZACA LISTE JESLI INPUT JEST PUSTY W PRZECIWNYM WYPADKU URUCHAMIA FUNKCJE  POBIERZ PIOSENKI//
  search(value){
    hidePlayer()
    const ShadowScroll = document.querySelector('html');
    ShadowScroll.style.overflowY = 'hidden';
    const LoaderAlbums = document.querySelector('.Loader-Finders');
    LoaderAlbums.style.display = 'block';
    const  ShadowAlbums = document.querySelector('.Loader-Shadow-Box-Finders');
    ShadowAlbums.className= "Loader-Shadow-Box-Finders";
    ShadowAlbums.style.display = 'block';
    ShadowAlbums.style.zIndex = '1998';
      if(value === ''){
        this.setState({
          trackList: [],
          prev: null,
          next: null,
          notFindTracks: 'exist',
        })

        const LoaderAlbums = document.querySelector('.Loader-Finders');
        LoaderAlbums.style.display = 'none';
        const  ShadowAlbums = document.querySelector('.Loader-Shadow-Box-Finders');
        ShadowAlbums.className= "Loader-Shadow-Box-Finders";
        ShadowAlbums.style.display= "none";

        const results = document.querySelector('.Title-Box-Res')
        results.style.display='none';
        
      }else{
        if(this.state.trackList.length<1){
         
          if(timeouter) clearTimeout(timeouter);
          timeouter = setTimeout(() => {
            this.getList(this.state.searchValue, 0)
          }, 400);
        }else{ 
          this.getList(this.state.searchValue, 0)}
      }
  }
    //POBIERA INFORMACJE  O PIOSENKACH Z API//
  getList = (value,link) =>{

    this.setState({
      refresh: ''
    })
    let url = `https://api.spotify.com/v1/search?q=${value}&type=track&limit=${this.state.limit}`

    if(link !== 0){
      url = link;
      const start = link.indexOf('offset=')
      const stop = link.indexOf('&limit')
      const finishoff = link.slice(start,stop)
      this.setState({
        myoffset: finishoff
      })
    }
    axios({
      url: url,
      headers:{
      'Authorization': 'Bearer ' + this.props.mytoken
      }
    }).then(resp =>{
      this.setState({
      trackList: resp.data.tracks.items,
      prev: resp.data.tracks.previous,
      next: resp.data.tracks.next
    })
    if(this.state.limit > 5){
      const ShadowScroll = document.querySelector('html');
      ShadowScroll.style.overflowY = 'visible';
    }
      if(window.location.pathname === "/findsound"){
        const results = document.querySelector('.Title-Box-Res')
        results.style.display='block';
      }
        const LoaderAlbums = document.querySelector('.Loader-Finders');
        LoaderAlbums.className = 'Loader-Finders Shadow-Loader-Finders'
        const  ShadowAlbums = document.querySelector('.Loader-Shadow-Box-Finders');
        ShadowAlbums.className= "Loader-Shadow-Box-Finders Shadow-Key-Finders";
         
        setTimeout(()=>{
          const LoaderAlbums = document.querySelector('.Loader-Finders');
          LoaderAlbums.className = 'Loader-Finders'
          LoaderAlbums.style.display = 'none';
        },300)

        setTimeout(()=>{
          if(window.location.pathname === "/findsound"){
          const  ShadowAlbums = document.querySelector('.Loader-Shadow-Box-Finders');
          ShadowAlbums.className= "Loader-Shadow-Box-Finders";
          ShadowAlbums.style.display= "none";
        }
        },1200)
     


      this.exist()
    }).catch(error => (new Error(console.log(error))))
  }



  exist =() =>{
    if(this.state.trackList.length <= 0 && this.state.searchValue.length > 0){
    this.setState({
      notFindTracks: 'notexist'
    })
    }else{
      this.setState({
        notFindTracks: 'exist'
      })
  }
  }

  
  render() {
    let prevButton = "", nextButton = "";
    if(this.state.prev !== null){
    prevButton = <button onClick={this.getList.bind(this,0,this.state.prev)} className="Find-Sounds-Button-Prev">PREV</button>
    }
    if(this.state.next !== null){
      nextButton = <button onClick={this.getList.bind(this,0,this.state.next)}className="Find-Sounds-Button-Next">NEXT</button>
    }
    let inputSearch= '';
    let forTablet = window.matchMedia("(max-width: 900px)")
    if(forTablet.matches){
        inputSearch = <input type="text" placeholder="Do you want to find a song?" className="Searching-Field" onChange={this.inputValue.bind(this)}/>
      }else{
        inputSearch = <input type="text" placeholder="Do you want to find a song? Enter its title here..." className="Searching-Field" onChange={this.inputValue.bind(this)}/>
      }
        

    return(
      <div className="Find-Sounds">
           {this.props.check}       
           <div className="Loader-Shadow-Box-Finders"></div>
           <div className="Loader-Finders"><img alt="sorry i can't read that img"  className="Loader-Icon" src='./img/loader.gif'/></div>

        <div className="Title-Box">SEARCH</div>
        <div className="Searching-Bar"> 
          {inputSearch}
          <Limit changeLimit={this.limit.bind(this)} />  
          {prevButton}
          {nextButton}
          
        </div>
        <div className="Title-Box-Res">RESULTS</div>
      <span className={this.state.notFindTracks}> NOT FOUND : <span className="title">{this.state.searchValue} </span></span>
      <div className="Find-Soungs-Single-Sound">
        {this.state.trackList.map((element, index)=>
          <SingleTrack  key={index} parentElement={element} parentIndex={index}/>
        )}
      </div>
        
      </div>
    )
  }
}

export default FindSound;
