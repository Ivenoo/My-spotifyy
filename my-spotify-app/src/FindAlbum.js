import React from 'react';
import axios from 'axios';
import SingleAlbum from './SingleAlbum';
import SingleTrack from './SingleTrack';


let timeouter;

class FindAlbum extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchValue: [],
      albumList:[],
      searchValueToExist: '',
      notFindAlbum: 'notexist',
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
    const LoaderAlbums = document.querySelector('.Loader-Albums');
    LoaderAlbums.style.display = 'block';
    const  ShadowAlbums = document.querySelector('.Loader-Shadow-Box-Albums');
    ShadowAlbums.className= "Loader-Shadow-Box-Albums";
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
        notFindAlbum: 'notexist',
        next: null,
        prev: null,
        backColor: '',
      })
      const LoaderAlbums = document.querySelector('.Loader-Albums');
      LoaderAlbums.style.display = 'none';
      const  ShadowAlbums = document.querySelector('.Loader-Shadow-Box-Albums');
      ShadowAlbums.className= "Loader-Shadow-Box-Albums";
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
    if(this.state.backColor != ''&& this.state.searchValue != []){
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
          myoffset: finishoff
        })
      }
      axios({
        url: url,
        headers:{
        'Authorization': 'Bearer ' + this.props.mytoken
        }
      }).then(resp =>{
       const results = document.querySelector('.Title-Box-Res')
       results.style.display='block'
        this.setState({
        albumList: resp.data.albums.items,
        prev: resp.data.albums.previous,
        next: resp.data.albums.next
      })
      
        const LoaderAlbums = document.querySelector('.Loader-Albums');
        LoaderAlbums.style.display = 'none';
        const  ShadowAlbums = document.querySelector('.Loader-Shadow-Box-Albums');
        ShadowAlbums.className= "Loader-Shadow-Box-Albums Shadow-Key-Albums"; 
      
      setTimeout(()=>{
        const  ShadowAlbums = document.querySelector('.Loader-Shadow-Box-Albums');
        ShadowAlbums.className= "Loader-Shadow-Box-Albums";
        ShadowAlbums.style.display= "none";
       },2000)

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
              // console.log(this.state.tracksList)
            }).catch(error => (new Error(console.log(error))))
          }
      
  
        //ZMIANA PRZYCISKU ROZWIJANIA LISTY//
  
        //ROZWIJANIE LISTY //
      openList = (id,index) =>{
        this.showSongs(id)
        if(this.state.backColor != ''){
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
      notFindAlbum: 'exist'
    })
    }else{
      this.setState({
        notFindAlbum: 'notexist'
      })
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
    return( 
      <div className="Find-Albums">
           <div className="Loader-Shadow-Box-Albums"></div>
           <div className="Loader-Albums">LOADING...</div>
      
        
        <div className="Title-Box">SEARCH</div>
        <div className="Searching-Bar"> 
          <input type="text" placeholder="Are you looking for an album? Type something here..." className="Searching-Field" onChange={this.search.bind(this)}/> 
          {prevButton}
          {nextButton}   
        </div>
        <div className="Find-Album-All-Resutls">
        <div className="Title-Box-Res">RESULTS</div>
       <span className={this.state.notFindAlbum}><strong className="title">{this.state.searchValueToExist} </strong> not exist</span>
       <div className="Find-Albums-Box">
       { this.state.albumList.map((element, index)=>
          <SingleAlbum  key={index} parentElement={element} parentIndex={index} mytoken={this.props.mytoken} tracksList={this.openList.bind(this,element.id,index)}/>
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
        })}
        </div>
        </div>
        </div>
      </div>
    )
  }
}

export default FindAlbum;
