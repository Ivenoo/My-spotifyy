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
      notFindArtist: 'notexist',
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
      clearTimeout(timeouter);
     
        this.setState({
          searchValue: value
        })
     
    if(value === ''){
    this.setState({
    artistList: [],
    prev: null,
    next: null,
    notFindArtist: 'notexist'
  })
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
        const results = document.querySelector('.Title-Box-Res')
        results.style.display='block'
        this.setState({
        artistList: resp.data.artists.items,
        prev: resp.data.artists.previous,
        next: resp.data.artists.next
      })
      this.exist()
      }).catch(error => (new Error(console.log(error))))
  
    
  }
  // WYSWIETLA  NAPIS JESLI NIE ZNALEZIONO DANEGO ARTYSTY//
  exist =() =>{
    if(this.state.artistList.length <= 0 && this.state.searchValueToExist.length > 0){
      this.setState({
        notFindArtist: 'exist'
      })
    }else{
      this.setState({
        notFindArtist: 'notexist'
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
      <div>
        <div className="Title-Box">SEARCH</div>
        <div className="Searching-Bar"> 
          <input type="text" placeholder="Are you looking for an artist? Type nickname here..." className="Searching-Field" onChange={this.inputValue.bind(this)}/>
          <Limit changeLimit={this.limit.bind(this)} />   
          {prevButton}
          {nextButton} 
        </div>
        <div className="Title-Box-Res">RESULTS</div>
      <div className="list-Artist">
      <span className={this.state.notFindArtist}><strong className="title">{this.state.searchValueToExist} </strong> not exist</span>
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
