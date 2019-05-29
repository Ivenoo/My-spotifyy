import React from 'react';
import axios from 'axios';
import SinglePlaylist from './SinglePlaylist';
import SingleTrack from './SingleTrack';
import Limit from './Limit';
import {hidePlayer} from './Service'


class FindGenres extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchValue: '',
      backColor: '',
      playList:[],
      tracksList: [],
      totals:'', 
      limit: 100,
      myoffset: 0,
      refresh: '',
      url: "",
    }
  }
    // POBIERA WARTOSC INPUTA I PRZYPISUJE DO ZMIENNEJ//
    selectGenre(value){
      this.setState({
        searchValue: value,
      });
      setTimeout(() => this.search(this.state.searchValue),10)
    }  

    //POBIERA PIOSENKI Z WYBRANEGO GATUNKU//
  search(value){
    if(value === ''){
      this.setState({
        playList: []
      })
    }else{
      axios({
        url: `https://api.spotify.com/v1/browse/categories/${value}/playlists`,
        headers:{
        'Authorization': 'Bearer ' + this.props.mytoken
        }
      }).then(resp =>
        { 
          this.setState({
            playList: resp.data.playlists.items
          })
      }).catch(error => (new Error(console.log(error))))
    }
  }

  changeLimit(e){
    const newLimit = parseInt(e.currentTarget.value)
    this.setState({
      limit: newLimit,
      myoffset: 0,
    })
    setTimeout(()=>{this.showSongs(this.state.url)}, 100);
  }

  tracksList(url, index, totalTracks){
    hidePlayer()
    this.showSongs(url)
    this.setState({
      myoffset: 0,
      tracksListLength: totalTracks,
    })
    // console.log("tototot"+ totalTracks )
    if(this.state.backColor != ''){
      const backingAlbumListColor = document.querySelector(`#${this.state.backColor}`)
      backingAlbumListColor.style.background="#2b2b2b";
    }
    const onShowAlbumList = document.querySelector(`#playlist${index}`)
    onShowAlbumList.style.background="#5f5f5f";
    this.setState({
      backColor: `playlist${index}`
    })
  }


  showSongs(url){  
    this.setState({
      url: url,
    })
    url = `${url}?&offset=${this.state.myoffset}&limit=${this.state.limit}`;
    axios({
    url: url,
    headers:{
      'Authorization': 'Bearer ' + this.props.mytoken
      }
    }).then(resp =>{ 
      this.setState({
        tracksList: resp.data.items
      }) 
    }).catch(error => (new Error(console.log(error))))
  }

    //OTWIERA NOWE OKNO Z PIOSENKA PO KLIKNIECIU NA   PRZYCISK PLAY//
  render() { 
    let display;
    if(this.state.searchValue === ''){
      display =        
      <div className="Choose-Genre">
        {this.props.typeTracks.map((element, index)=>{
          return(
            <div className="Single-Genre-Box element-icon"   onClick={this.selectGenre.bind(this, element.id)} key={index} >
              <div className="Single-Genre-Text">{element.name}</div>
              <img src={element.icons[0].url} className="Single-Genre-Image" alt=" "/>
              <div className="Shadow-Box"></div>
            </div> 
          )
        })}
      </div>
    }
    else{
      let back = "", prevButton = "", nextButton="";
      back = <div className="Back-Button" onClick={()=>this.setState({searchValue: '', tracksList: [], url: ''})}> All categories </div>
     
      if(this.state.tracksList.length !== 0){
        if(this.state.myoffset  > 0){
          prevButton = <div className="Prev-Button" 
          onClick={()=>{
            let newOffset = parseInt(this.state.myoffset) -  parseInt(this.state.limit)
            if(newOffset < 0) newOffset = 0;
            this.setState({myoffset: newOffset }); 
            this.showSongs(this.state.url); 
          }}> PREV </div>
        }

        console.log("off+lim " + parseInt(this.state.myoffset+this.state.limit))
        console.log("Długość " + this.state.tracksListLength)

        if(this.state.myoffset+this.state.limit < this.state.tracksListLength){
          nextButton = <div className="Next-Button" 
          onClick={()=>{
            const newOffset = parseInt(this.state.myoffset + this.state.limit)
            this.setState({myoffset: newOffset }); 
            this.showSongs(this.state.url); 
          }}> NEXT </div>
        }
      }

      display = 
      <div  className="Genres-Results-Box">
        <div className='Genres-Options'>
          <div className="Genres-Options-Select">
          {prevButton}
          {back}
          {nextButton}
          </div>
          <div className="Genres-Options-Limit-Box">
            Limit: <Limit changeLimit={this.changeLimit.bind(this)} limit={this.state.limit}/>
          </div>
        </div>
        <div  className="Results-List">

      
          <div className="Playlists-Box">
          { this.state.playList.map((element, index)=>{
            return(
              <SinglePlaylist  key={index} parentElement={element} parentTotals={element.tracks.total} parentIndex={index} mytoken={this.props.mytoken} tracksList={this.tracksList.bind(this, element.tracks.href, index, element.tracks.total)}/>
            )})}
          </div>

          <div className="Playlists-Tracks">
            {this.state.tracksList.map((element,index) =>{
              if(this.state.tracksList.length> 0){
                return(
                  <SingleTrack  key={index} parentElement={element.track} parentIndex={index}/>
                )
              }
            })}
          </div>
        </div>
      </div>
    }
    return(
      <div className="Genres">
        {display}
      </div>
    )
  }
}

export default FindGenres;