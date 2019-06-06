import React from 'react';
import axios from 'axios';
import SingleAlbum from './SingleAlbum';
import SingleTrack from './SingleTrack';
import {hidePlayer} from './Service';


let timeouter;

class FindAlbum extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchValue: [],
      albumList:[],
      searchValueToExist: '',
      notFindAlbum: 'exist',
      timeout: 0,
      valuee: 's',
      tracksList: [],
      backColor: '',
      prev: null,
      next: null,
      myoffset: 'offset=0'
    }
  }

              //POBIERANIE LISTY  ALBUMOW  Z API // 
  search(e){
    const ShadowScroll = document.querySelector('html');
    ShadowScroll.style.overflowY = 'hidden';
    const LoaderAlbums = document.querySelector('.Loader-Finders');
    LoaderAlbums.style.display = 'block';
    const  ShadowAlbums = document.querySelector('.Loader-Shadow-Box-Finders');
    ShadowAlbums.className= "Loader-Shadow-Box-Finders";
    ShadowAlbums.style.display = 'block';
    ShadowAlbums.style.zIndex = '1998';

    const value = e.currentTarget.value
    this.setState({
      searchValueToExist: value
    })
  
    this.setState({
      searchValue: value,
      tracksList: []
    })

    
    if(value === ''){
      this.setState({
        albumList: [],
        notFindAlbum: 'exist',
        next: null,
        prev: null,
        backColor: '',
      })
      const LoaderAlbums = document.querySelector('.Loader-Finders');
      LoaderAlbums.style.display = 'none';
      const  ShadowAlbums = document.querySelector('.Loader-Shadow-Box-Finders');
      ShadowAlbums.className= "Loader-Shadow-Box-Finders";
      ShadowAlbums.style.display= "none";

      const results = document.querySelector('.Title-Box-Res');
      results.style.display='none';
      const albumTracks = document.querySelector('.Find-Albums-Tracks-Box');
      albumTracks.style.display= 'none';
    }else{
      if(timeouter) clearTimeout(timeouter);
        timeouter = setTimeout(() => { 
        this.getList(this.state.searchValue,0)
      }, 1000);
    }

  }
    //POBIERANIE INFORMACJI O ALBUMACH Z API// 
  getList = (value,link) =>{ 
    this.setState({
      refresh: '',
      tracksList: [],
    })
    if(this.state.backColor !==''&& this.state.searchValue !== []){
      const backingAlbumListColor = document.querySelector(`#${this.state.backColor}`)
      backingAlbumListColor.style.background="#2b2b2b";
    }
      let url = `https://api.spotify.com/v1/search?q=${value}&type=album&limit=10`
      if(link !== 0){
        url = link;
        const start = link.indexOf('offset=')
        const stop = link.indexOf('&limit')
        const finishoff = link.slice(start,stop)
        this.setState({
          myoffset: finishoff,
          refresh: ''
        })
      }
      axios({
        url: url,
        headers:{
        'Authorization': 'Bearer ' + this.props.mytoken
        }
      }).then(resp =>{

        this.setState({
        albumList: resp.data.albums.items,
        prev: resp.data.albums.previous,
        next: resp.data.albums.next
      })
        if(window.location.pathname === "/findalbum"){
          const results = document.querySelector('.Title-Box-Res')
          results.style.display='block'
        }
        const LoaderAlbums = document.querySelector('.Loader-Finders');
        LoaderAlbums.className = 'Loader-Finders Shadow-Loader-Finders'
        const  ShadowAlbums = document.querySelector('.Loader-Shadow-Box-Finders');
        ShadowAlbums.className= "Loader-Shadow-Box-Finders Shadow-Key-Finders"; 
      
        setTimeout(()=>{
          if(this.state.exist !== 'notexist' && document.querySelector('#album4') ){
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
        if(window.location.pathname === "/findalbum"){
          const  ShadowAlbums = document.querySelector('.Loader-Shadow-Box-Finders');
          ShadowAlbums.className= "Loader-Shadow-Box-Finders";
          ShadowAlbums.style.display= "none";
        }
       },1200)

      const albumListTracks  = document.querySelector('.Find-Albums-Tracks-Box')  
      albumListTracks.style.display = "block";
      this.exist()
      }).catch(error => (new Error(console.log(error))))  
  }

      //POBIERA  INFORMACJE O ALBUMIE I ZWRACA  JAKO ELEMENT LISTY//
      showSongs(id){
        
            axios({
              url: `https://api.spotify.com/v1/albums/${id}/tracks`,
              headers:{
              'Authorization': 'Bearer ' + this.props.mytoken
              }
            }).then(resp =>{ 
              this.setState({
                tracksList: resp.data.items
              }) 
            }).catch(error => (new Error(console.log(error))))
          }
      
  
        //ZMIANA PRZYCISKU ROZWIJANIA LISTY//
  
        //ROZWIJANIE LISTY //
      trackList = (id,index) =>{
        let forPhone = window.matchMedia("(max-width: 799px)")
        if(forPhone.matches){
          const changeAlbumOnTrack = document.querySelector('.Find-Albums-Box')
          changeAlbumOnTrack.style.display = 'none';

          const changeAlbumOnTrackBox = document.querySelector('.Find-Albums-Tracks-Box')
          changeAlbumOnTrackBox.style.display = 'block';

          const  buttonBackToAlbums = document.querySelector('.Back-To-Album-List')
          buttonBackToAlbums.style.display="block";

          
          const changeAlbumOnTrackNext = document.querySelector('.Find-Sounds-Button-Next')
          if(changeAlbumOnTrackNext){
          changeAlbumOnTrackNext.style.display = 'none';
          }
          const  changeAlbumOnTrackPrev = document.querySelector('.Find-Sounds-Button-Prev')
          if(changeAlbumOnTrackPrev){
            changeAlbumOnTrackPrev.style.display="none";
          }
        }
        hidePlayer()
        this.showSongs(id)
        if(this.state.backColor !== ''){
          const backingAlbumListColor = document.querySelector(`#${this.state.backColor}`)
          backingAlbumListColor.style.background="#2b2b2b";
        }
        const onShowAlbumList = document.querySelector(`#album${index}`)
        onShowAlbumList.style.background="#5f5f5f";

        this.setState({
          backColor: `album${index}`
        })
      }
      


    //WYSWIETLANIE INFORMACJI O BRAKU  ZNALEZIONYCH ELEMENTÓW//
  exist =() =>{
    if(this.state.albumList.length <= 0 && this.state.searchValue.length > 0){
    this.setState({
      notFindAlbum: 'notexist'
    })
    }else{
      this.setState({
        notFindAlbum: 'exist'
      })
    }
  }
  FindAlbumsFromTrack =() =>{
    const changeAlbumOnTrack = document.querySelector('.Find-Albums-Box')
    changeAlbumOnTrack.style.display = 'block';
  
    const changeAlbumOnTrackBox = document.querySelector('.Find-Albums-Tracks-Box')
    changeAlbumOnTrackBox.style.display = 'none';

    const  buttonBackToAlbums = document.querySelector('.Back-To-Album-List')
    buttonBackToAlbums.style.display="none";

    const changeAlbumOnTrackNext = document.querySelector('.Find-Sounds-Button-Next')
    if(changeAlbumOnTrackNext){
    changeAlbumOnTrackNext.style.display = 'block';
    }
    const  changeAlbumOnTrackPrev = document.querySelector('.Find-Sounds-Button-Prev')
    if(changeAlbumOnTrackPrev){
      changeAlbumOnTrackPrev.style.display="block";
    }
  }


  render() {
    let prevButton = "";
    let nextButton = "";
    if(this.state.prev !==null){
      prevButton = <button onClick={this.getList.bind(this,0,this.state.prev)} className="Find-Sounds-Button-Prev">PREV</button>
    }
    if(this.state.next !==null){
      nextButton = <button onClick={this.getList.bind(this,0,this.state.next)}className="Find-Sounds-Button-Next">NEXT</button>
    }
    let inputSearch= '';
    let forTablet = window.matchMedia("(max-width: 900px)")
    if(forTablet.matches){
        inputSearch = <input type="text" placeholder="looking for an album?" className="Searching-Field" onChange={this.search.bind(this)}/> 
      }else{
        inputSearch = <input type="text" placeholder="Are you looking for an album? Type something here..." className="Searching-Field" onChange={this.search.bind(this)}/> 
      }
    return( 
      <div className="Find-Albums">
           <div className="Loader-Shadow-Box-Finders"></div>
           <div className="Loader-Finders"><img alt="i can't read that img" className="Loader-Icon" src='./img/loader.gif'/></div>
      

        <div className="Title-Box">SEARCH</div>
        <div className="Searching-Bar"> 
          {inputSearch}
          {prevButton}
          <button className="Back-To-Album-List" onClick={this.FindAlbumsFromTrack.bind(this)}>ALBUM LIST</button>
          {nextButton}   
        </div>
        <div className="Find-Album-All-Resutls">
        <div className="Title-Box-Res">RESULTS</div>
       <span className={this.state.notFindAlbum}> NOT FOUND :<span className="title">{this.state.searchValueToExist} </span></span>
       <div className="Find-Albums-Box">
       { this.state.albumList.map((element, index)=>
          <SingleAlbum  key={index} parentElement={element} parentIndex={index} mytoken={this.props.mytoken} tracksList={this.trackList.bind(this,element.id,index)}/>
        )}
        </div>
        <div className= "Find-Albums-Tracks-Box">
        <div className="Find-Albums-Album-Tracks">
        {this.state.tracksList.map((element,index) =>{
          if(this.state.tracksList.length> 0){
            return(
              <SingleTrack  key={index} parentElement={element} parentIndex={index}/>
              )
          }
          return(0);
        })}
        </div>
        </div>
        </div>
      </div>
    )
  }
}

export default FindAlbum;
