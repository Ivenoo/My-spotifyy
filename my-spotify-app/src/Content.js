import React from 'react';
import FindSound from './FindSound';
import FindArtist from './FindArtist';
import HomePage from './HomePage';


class Content extends React.Component {
  

 
  render() {
    if(this.props.action === "findSound"){
    return(
      <FindSound />
    )
  }else if(this.props.action === "findArtist"){
    return(
      <FindArtist />
    )
  }else if(this.props.action === "homePage"){
    return(
      <HomePage />
    )
  }
  }
}

export default Content;
