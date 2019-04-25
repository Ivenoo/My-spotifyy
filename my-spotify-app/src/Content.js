import React from 'react';
import FindSound from './FindSound';
import FindArtist from './FindArtist';
import HomePage from './HomePage';


class Content extends React.Component {
  

 
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
  }
  }
}

export default Content;
