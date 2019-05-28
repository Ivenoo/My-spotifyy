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
      backColor: ''
    }
  }

              //POBIERANIE LISTY  ALBUMOW  Z API // 
  search(e){
    const value = e.currentTarget.value
    this.setState({
      searchValueToExist: value
    })
  
    this.setState({
      searchValue: value
    })
    
    if(value === ''){
      this.setState({
        albumList: [],
        tracksList: []
      })
      const albumTracks = document.querySelector('.Find-Albums-Tracks-Box')
      albumTracks.style.display= 'none'
    }else{
      if(timeouter) clearTimeout(timeouter);
        timeouter = setTimeout(() => { 
        this.getList(this.state.searchValue)
      }, 1000);
    }

  }
    //POBIERANIE INFORMACJI O ALBUMACH Z API//
  getList = (value) =>{
    axios({
      url: `https://api.spotify.com/v1/search?q=${value}&type=album&limit=10`,
      headers:{
      'Authorization': 'Bearer ' + this.props.mytoken
      }
    }).then(resp =>{ 
      this.setState({
        albumList: resp.data.albums.items
      })
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
        console.log(this.state.albumList)
        if(this.state.backColor != ''){
          const backingAlbumListColor = document.querySelector(`#${this.state.backColor}`)
          backingAlbumListColor.style.background="#2b2b2b";
          // backingAlbumListColor.style.border="none";
          // backingAlbumListColor.style.borderBottom="solid 1px #c86400";
        }
        const onShowAlbumList = document.querySelector(`#album${index}`)
        onShowAlbumList.style.background="#5f5f5f";
        // onShowAlbumList.style.border="solid 1px red";
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
    return( 
      <div className="Find-Albums">
        <div className="Title-Box">SEARCH</div>
        <div className="Searching-Bar"> 
          <input type="text" placeholder="Are you looking for an album? Type something here..." className="Searching-Field" onChange={this.search.bind(this)}/>   
        </div>
        <div className="Title-Box">RESULTS</div>
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
    )
  }
}

export default FindAlbum;
