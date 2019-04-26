import React from 'react';
import axios from 'axios';
import FindSound from './FindSound';
import FindArtist from './FindArtist';
import HomePage from './HomePage';
import FindGenres from './FindGenres';
import FindAlbum from './FindAlbum';
import Favourite from './Favourite';

class Content extends React.Component {
  constructor(props){
    super(props);
    this.state = ({
      typeTracks:[],
    })
  }
  
  componentDidMount(){
    axios({
      url: `https://api.spotify.com/v1/recommendations/available-genre-seeds`,
      headers:{
       'Authorization': 'Bearer ' + this.props.mytoken
      }
    }).then(resp =>
      { this.setState({
        typeTracks: resp.data.genres
     })
    }).catch(error => (new Error(console.log(error))))
  }
 
  render(props) {
    if(this.props.action === "findSound"){
    return(
      <FindSound  mytoken={this.props.mytoken}/>
    )
  }else if(this.props.action === "findArtist"){
    return(
      <FindArtist  mytoken={this.props.mytoken} />
    )
  }else if(this.props.action === "homePage"){
    return(
      <HomePage  mytoken={this.props.mytoken}/>
    )
  }else if(this.props.action === "findGenres"){
    return(
      <FindGenres  mytoken={this.props.mytoken} typeTracks={this.state.typeTracks}/>
    )
  }else if(this.props.action === "findAlbum"){
    return(
      <FindAlbum  mytoken={this.props.mytoken} />
    )
  }else if(this.props.action === "favourite"){
    return(
      <Favourite  mytoken={this.props.mytoken} />
    )
  }
  }
}

export default Content;
