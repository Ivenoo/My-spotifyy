import React from 'react';
import axios from 'axios';
import SingleTrack from './SingleTrack';
import Limit from './Limit';
import {randomOffset} from './Service'


class FindGenres extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchValue: '',
      searchList:[],
      limit: 5,
      refresh: '',
      randOffset: 0
    }
  }

    // USTAWIA LIMIT WYSWIETLANYCH  PIOSENEK NA STRONE//
  limit(e){
    const limitValue = e.currentTarget.value
    this.setState({
      limit: limitValue,
    })
   setTimeout(() => this.search(this.state.searchValue),10)
  }

    // POBIERA WARTOSC INPUTA I PRZYPISUJE DO ZMIENNEJ//
  inputValue(e){
    const value = e.currentTarget.value
    this.setState({
      searchValue: value,
      randOffset: randomOffset()
    })
    setTimeout(() => this.search(this.state.searchValue),10)
  }

    //POBIERA PIOSENKI Z WYBRANEGO GATUNKU//
  search(value){
    this.setState({
      refresh: ''
    })
    if(value === ''){
    this.setState({
    searchList: []
  })
  }else{
    axios({
      url: `https://api.spotify.com/v1/search?q=genre:${value}&type=track&limit=${this.state.limit}&offset=${this.state.randOffset}`,
      headers:{
      'Authorization': 'Bearer ' + this.props.mytoken
      }
    }).then(resp =>
      { this.setState({
      searchList: resp.data.tracks.items
    })
    }).catch(error => (new Error(console.log(error))))
  }
    //OTWIERA NOWE OKNO Z PIOSENKA PO KLIKNIECIU NA   PRZYCISK PLAY//
  }
  listen(url){
    if(url != null){
      window.open(url)
    }
  }

  render() {
    return(
      <div>
       <div className="Title-Box">SEARCH</div>
        <div className="Searching-Bar"> 
          <select className="Searching-Field" defaultValue='' onChange={this.inputValue.bind(this)}>
            <option className="Searching-Options" value="" disabled>Choose Genre ...</option>
            {this.props.typeTracks.map((element, index)=>{
              return(
                <option className="Searching-Options" key={index}>{element}</option>
              )
            })}
          </select>
        <Limit changeLimit={this.limit.bind(this)}/>
        </div>
        <div className="Title-Box">RESULTS</div>
          <ol>
          {this.state.searchList.map((element, index)=>
            <SingleTrack  key={index} parentElement={element} parentIndex={index}/>
          )}
        </ol>
      </div>
    )
  }
}

export default FindGenres;
