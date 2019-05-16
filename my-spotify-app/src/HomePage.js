import React from 'react';
import axios from 'axios';
import SingleTrack from './SingleTrack';



class HomePage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      randomSongs:[]
    }
  }

refresh(){
  this.setState({
    randomSongs: []
  })
const alphabet = "abcdefghijklmnopqrstuvwxyz";
const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];



   const randomTrack = Math.floor(Math.random()*10);
   if(this.props.mytoken.length > 0){
  axios({
    url: `https://api.spotify.com/v1/search?q=*${randomLetter}*&type=track&limit=20&offset=${randomTrack}`,
    headers:{
     'Authorization': 'Bearer ' + this.props.mytoken
    }
  }).then(resp =>  this.setState({
    randomSongs:  resp.data.tracks.items
  }))}
}



componentWillReceiveProps(props,state){
  if(this.props.myToken !== "")
  this.refresh()
}

 
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
