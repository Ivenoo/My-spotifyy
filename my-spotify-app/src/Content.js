import React from 'react';
import FindSound from './FindSound';
import FindArtist from './FindArtist';
import HomePage from './HomePage';
import FindGenres from './FindGenres';
import FindAlbum from './FindAlbum';
import Favourite from './Favourite';

class Content extends React.Component {
  
  
  componentDidMount(){
    this.props.getGenres()
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
      <FindGenres  mytoken={this.props.mytoken} typeTracks={this.props.typeTracks}/>
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
