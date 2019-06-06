import React from 'react';
import axios from 'axios';
import SingleArtist from './SingleArtist';
import Limit from './Limit';


let timeouter;

class FindArtist extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchValue: [],
      artistList:[],
      limit: 5,
      prev: null,
      next: null,
      myoffset: 'offset=0',
      timeout: 0,
      notFindArtist: 'exist',
      searchValueToExist: ''
    }
  }


    
    //WYZNACZANIE LIMITU WYSWIETLNYCH PIOSENEK NA STRONE//
  limit(e){
    const limitValue = e.currentTarget.value
    this.setState({
      limit: limitValue,
    })
    // console.log(this.state.artistList.length)
    setTimeout(() => this.search(this.state.searchValue),10)
  }

    //POBIERANIE WARTOSCI INPUTA I PRZYPISYWANIE DO STANU//
  inputValue(e){
    const value = e.currentTarget.value
    this.setState({
      searchValue: value,
      searchValueToExist: value
    })
    setTimeout(() => this.search(this.state.searchValue),10)
  }

    //PRZYPISANIE DO STANU WARTOSCI  Z INPUTA I WYWOLANIE POBIERANIA  LISTY//
  search(value){
    const ShadowScroll = document.querySelector('html');
    ShadowScroll.style.overflowY = 'hidden';
    const LoaderAlbums = document.querySelector('.Loader-Finders');
    LoaderAlbums.style.display = 'block';
    const  ShadowAlbums = document.querySelector('.Loader-Shadow-Box-Finders');
    ShadowAlbums.className= "Loader-Shadow-Box-Finders";
    ShadowAlbums.style.display = 'block';
    ShadowAlbums.style.zIndex = '1998';
      clearTimeout(timeouter);
        this.setState({
          searchValue: value
        })
     
    if(value === ''){
    this.setState({
    artistList: [],
    prev: null,
    next: null,
    notFindArtist: 'exist'
  })

  const LoaderAlbums = document.querySelector('.Loader-Finders');
  LoaderAlbums.style.display = 'none';
  const  ShadowAlbums = document.querySelector('.Loader-Shadow-Box-Finders');
  ShadowAlbums.className= "Loader-Shadow-Box-Finders";
  ShadowAlbums.style.display= "none";

  const results = document.querySelector('.Title-Box-Res')
  results.style.display='none'
  }else{
    timeouter = setTimeout(() => {
    this.getList(value, 0)
  }, 400);
  }
  }

    //WCZYTYWANIE PIOSENEK Z API//
  getList = (value,link) =>{ 
    this.setState({
      refresh: ''
    })
      let url = `https://api.spotify.com/v1/search?q=${value}&type=artist&limit=${this.state.limit}`
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
          artistList: resp.data.artists.items,
          prev: resp.data.artists.previous,
          next: resp.data.artists.next
        })

        if(window.location.pathname === "/findartist"){
          const results = document.querySelector('.Title-Box-Res')
          results.style.display='block'
        }
        const LoaderAlbums = document.querySelector('.Loader-Finders');
        LoaderAlbums.className = 'Loader-Finders Shadow-Loader-Finders'
          const  ShadowAlbums = document.querySelector('.Loader-Shadow-Box-Finders');
          ShadowAlbums.className= "Loader-Shadow-Box-Finders Shadow-Key-Finders"; 
        
                
        setTimeout(()=>{
          if(this.state.exist !== 'notexist' && document.querySelector('#artist4') ){
            const ShadowScroll = document.querySelector('html');
            ShadowScroll.style.overflowY = 'visible';
          }
        },100)

        setTimeout(()=>{
          const LoaderAlbums = document.querySelector('.Loader-Finders');
          LoaderAlbums.className = 'Loader-Finders'
          LoaderAlbums.style.display = 'none';
        },300)

        setTimeout(()=>{
          if(window.location.pathname === "/findartist"){
          const  ShadowAlbums = document.querySelector('.Loader-Shadow-Box-Finders');
          ShadowAlbums.className= "Loader-Shadow-Box-Finders";
          ShadowAlbums.style.display= "none";
          }
        },1200)

        this.exist()
      }).catch(error => (new Error(console.log(error))))
  
    
  }
  // WYSWIETLA  NAPIS JESLI NIE ZNALEZIONO DANEGO ARTYSTY//
  exist =() =>{
    if(this.state.artistList.length <= 0 && this.state.searchValueToExist.length > 0){
      this.setState({
        notFindArtist: 'notexist'
      })
    }else{
      this.setState({
        notFindArtist: 'exist'
      })
    }
  }

  render() {
    let prevButton = "", nextButton = "";

    if(this.state.prev !==null){
      prevButton = <button onClick={this.getList.bind(this,0,this.state.prev)} className="Find-Sounds-Button-Prev">PREV</button>
    }
    if(this.state.next !==null){
      nextButton = <button onClick={this.getList.bind(this,0,this.state.next)}className="Find-Sounds-Button-Next">NEXT</button>
    }


    return(
      <div className="Find-Artist">
        
        <div className="Loader-Shadow-Box-Finders"></div>
           <div className="Loader-Finders"><img alt='sorry i cant read img' className="Loader-Icon" src='./img/loader.gif'/></div>

        <div className="Title-Box">SEARCH</div>
        <div className="Searching-Bar"> 
          <input type="text" placeholder="Looking for artist? ..." className="Searching-Field" onChange={this.inputValue.bind(this)}/>
          <Limit changeLimit={this.limit.bind(this)} />   
          {prevButton}
          {nextButton} 
        </div>
      
      <div className="Title-Box-Res">RESULTS</div>
      

      <div className="List-Artist">
      <span className={this.state.notFindArtist}>NOT FOUND : <span className="title">{this.state.searchValueToExist} </span> </span>
      {
        this.state.artistList.map((element, index)=>
        <SingleArtist  key={index} parentElement={element} parentIndex={index} /> 
      )}
      </div>


      </div>
    )
  }
}
export default FindArtist;
