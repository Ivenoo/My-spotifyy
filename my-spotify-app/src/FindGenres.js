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
        searchList: []
      })
    }else{
      axios({
        url: `https://api.spotify.com/v1/search?q=genre:${value}&type=track&limit=${this.state.limit}&offset=${randomOffset()}`,
        headers:{
        'Authorization': 'Bearer ' + this.props.mytoken
        }
      }).then(resp =>
        { this.setState({
        searchList: resp.data.tracks.items
      })
      }).catch(error => (new Error(console.log(error))))
    }
  }

  changeLimit = (e) =>{
    const newLimit = e.currentTarget.value
    this.setState({
      limit: newLimit
    })
    setTimeout(()=>{this.search(this.state.searchValue)}, 10);
  }
    //OTWIERA NOWE OKNO Z PIOSENKA PO KLIKNIECIU NA   PRZYCISK PLAY//

  render() { 
    let display;
    if(this.state.searchValue === ''){
      display =        
      <div className="Choose-Genre">
        {this.props.typeTracks.map((element, index)=>{
          return(
            <div className="Single-Genre-Box"  onClick={this.selectGenre.bind(this, element)} key={index} >
              <div className="Single-Genre-Text">{element}</div>
            </div> 
          )
        })}
      </div>
    }
    else{
      let back = "", rerandom = "";
      back = <div className="Back-Button" onClick={()=>this.setState({searchValue: ''})}> Back to genres list </div>
      rerandom = <div className="Refresh-Button" onClick={this.search.bind(this, this.state.searchValue)}> Refresh </div>


      display = 
      <div className="Genres-Results-Box">
        <div className='Genres-Options'>
          <div className="Genres-Options-Select">
          {back}
          {rerandom}
          </div>
          <div className="Genres-Options-Limit-Box">
            Limit: <Limit changeLimit={this.changeLimit.bind(this)}/>
          </div>
        </div>
        <div className="Results-List">
          {this.state.searchList.map((element, index)=>
            <SingleTrack  key={index} parentElement={element} parentIndex={index}/>
          )}
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