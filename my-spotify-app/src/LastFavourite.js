import React from 'react';
import axios from 'axios';
import SingleTrack from './SingleTrack';
import Limit from './Limit'




class LastFavourite extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      box:[],
      box2: [],
      favArray: [],
      limit: 20,
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



  render() {

    return(
      <div>
        <div className='Title-Box'>ITS YOUR 20 LAST ADDED FAVOURITE SONGS</div>
        <ol>
          {
            this.state.favArray.slice(this.state.myoffset,parseInt(this.state.limit)).map((element,index) =>
                <SingleTrack  key={index} parentElement={element} parentIndex={index}/>
            )
          }
        </ol>
      </div>
      )
    }
}

export default LastFavourite;
