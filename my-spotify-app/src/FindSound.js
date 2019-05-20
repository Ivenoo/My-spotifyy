import React from 'react';
import axios from 'axios';
import SingleTrack from './SingleTrack';
import Limit from './Limit'


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
      notFindTracks: 'notexist',
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
  console.log(this.state.trackList.length)
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
      if(value === ''){
        this.setState({
          trackList: [],
          prev: null,
          next: null,
        })
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
    }).then(resp =>{ this.setState({
      trackList: resp.data.tracks.items,
      prev: resp.data.tracks.previous,
      next: resp.data.tracks.next
    })
    this.exist()
    }).catch(error => (new Error(console.log(error))))
  }


  listen(url){
    if(url != null){
  window.open(url)
  }
  }

  exist =() =>{
    if(this.state.trackList.length <= 0 && this.state.searchValue.length > 0){
    this.setState({
      notFindTracks: 'exist'
    })
    }else{
      this.setState({
        notFindTracks: 'notexist'
      })
  }
  }

  render() {
    let prevButton = "", nextButton = "";
    if(this.state.prev !==null){
      prevButton = <button onClick={this.getList.bind(this,0,this.state.prev)}>Previous</button>
    }
    if(this.state.next !==null){
      nextButton = <button onClick={this.getList.bind(this,0,this.state.next)}>Next</button>
    }
    return(
      <div>
        <div className="szukajka">
        <input type="text" placeholder="Search Tracks..." onChange={this.inputValue.bind(this)}/>
        <Limit changeLimit={this.limit.bind(this)}/>
        <br/>
       search:{this.state.searchValue}<br/>
          
       </div>
       <span className={this.state.notFindTracks}><strong className="title">{this.state.searchValue} </strong> not exist</span>
       <ol>
       {
         this.state.trackList.map((element, index)=>
         <SingleTrack  key={index} parentElement={element} parentIndex={index}/>
        )}
       </ol>
      {prevButton}
      {nextButton}
    </div>
    )
  }
}

export default FindSound;
