import React from 'react';
import axios from 'axios';
import SingleTrack from './SingleTrack';
import { randomOffset, randomLetter} from './Service'


class HomePage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      randomSongs:[]
    }
  }

  
    //CZYSZCZENIE TABLLICY Z LOSOWYMI PIOSENKAMI I POBIERANIE LOSOWEJ LISTY 20 PIOSENEK//
  refresh(){
    this.setState({
      randomSongs: []
    })

    if(this.props.mytoken.length > 0){
    axios({
      url: `https://api.spotify.com/v1/search?q=*${randomLetter()}*&type=track&limit=20&offset=${randomOffset()}`,
      headers:{
      'Authorization': 'Bearer ' + this.props.mytoken
      }
    }).then(resp =>  this.setState({
      randomSongs:  resp.data.tracks.items
    }))}
  }

    //  WCZYTYWANIE LOSOWEJ LISTY PRZY KAZDYM WEJSCIU NA HOMEPAGE//
  componentDidMount(){
    this.refresh()
  }

  componentWillReceiveProps(props,state){
    if(this.props.myToken !== "")
    this.refresh()
  }

    //OTWIERANIE OKNA Z URYWKIEM PIOSENKI PO KLIKNIECIU NA IKONE PLAY//
  listen(url){
    if(url != null){
      window.open(url)
    }
  }


 render() {
  return(
    <div>
     <ol>
     { this.state.randomSongs.map((element, index)=>
      <SingleTrack  key={index} parentElement={element} parentIndex={index} />
      )}
     </ol>
    </div>
  )
}
}

export default HomePage;
