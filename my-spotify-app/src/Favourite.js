import React from 'react';
import axios from 'axios';
import SingleTrack from './SingleTrack';
import Limit from './Limit'




class Favourite extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      box:[],
      box2: [],
      favArray: [],
      myoffset: 0,
      limit: 5,
    }
  }

        // FUNKCJA POBIERAJACA ULUBIONE PIOSENKI PO ID (KTORE JEST W LOCAL STORAGE)//
  myFavouriteSongs =(e) =>{

    setTimeout(() =>{ 
      JSON.parse(localStorage.getItem('favourite')).map(element =>
      axios({
        url: `https://api.spotify.com/v1/tracks/${element}`,
        headers:{
         'Authorization': 'Bearer ' + this.props.mytoken
        }
      }).then(resp =>{ 
        this.state.favArray.push(resp.data)
          this.setState({
            favArray: this.state.favArray
          }) 
      })
    )
    },10)
  }

  componentDidMount(){
    this.myFavouriteSongs()
  }

      //USTAWIENIE LIMITU WYSWIETLANYCH PIOSENEK//
  changeLimit = (e) =>{
    const newLimit = e.currentTarget.value
    this.setState({
      limit: newLimit
    })
  }

      //WYSWIETLANIE KOLEJNYCH PIOSENEK Z LISTY ULUBIONYCH (NEXT) //
  addOffset =() =>{
    this.setState({
      myoffset: parseInt(this.state.myoffset) + parseInt(this.state.limit)
    })
  }
  
      // WYSWIETLANEI POPRZEDNICH PIOSENEK (PREVIOUS) DZIALA PO UPRZEDNIM KLIKNIECIU NA NEXT//
  removeOffset =() =>{
    this.setState({
      myoffset: parseInt(this.state.myoffset) - parseInt(this.state.limit)
    })
  }



  render() {
    let prevButton = "", nextButton = "";
    if(this.state.myoffset  > 0){
      prevButton = <button onClick={this.removeOffset}>Previous</button>
    }
    if(this.state.myoffset < this.state.favArray.length - this.state.limit){
      nextButton = <button onClick={this.addOffset}>Next</button>
    }
    return(
      <div className='Favourite-Song'>
        <div className='Favourite-Song-Limit'>
          Limit: <Limit changeLimit={this.changeLimit.bind(this)}/>
        </div>
        <ol>
          {
            this.state.favArray.slice(this.state.myoffset,parseInt(this.state.myoffset) + parseInt(this.state.limit)).map((element,index) =>
                <SingleTrack  key={index} parentElement={element} parentIndex={index}/>
            )
          }
        </ol>
              {prevButton}
              {nextButton}
      </div>
      )
    }
}

export default Favourite;
