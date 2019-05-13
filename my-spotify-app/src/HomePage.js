import React from 'react';
import axios from 'axios';




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
componentDidMount(){
this.refresh()
}
componentWillReceiveProps(props,state){
  this.refresh()
}
 
listen(url){
  if(url != null){
window.open(url)
}
}

componentWillUnmount(){
}

 render() {
  return(
    <div>
     <ol>
     { this.state.randomSongs.map((element, index)=>{
          if(element.preview_url != null){
        
        return(
          
          <li  key={index}>
         Author: {element.artists.map((element2, index) => { 
           return(<span key={index} >{element2.name}, </span>)})}<br/>
          Title: <strong className="track-name">" {element.name} "</strong><br/>
          <img src={element.album.images[2].url}
          height="40px" width="40px" alt=" " /><br/>
          <img  alt=" "  src="https://images.vexels.com/media/users/3/135176/isolated/preview/a6508e565d25ab01f79a35c4319e0083-play-button-flat-icon-by-vexels.png" width="50px" height="50px" onClick={this.listen.bind(this, element.preview_url)}/><br/><br/>
          {/* <iframe src={element.preview_url} height="25px" className="frames"></iframe><br/><br/><br/> */}
          </li>
          )}else{
            return(
              <li  key={index}>
              Author: {element.artists.map((element2, index) => { 
                 return(<span key={index}>{element2.name}, </span>)})}<br/>
              Title: <strong className="track-name">" {element.name} "</strong><br/>
              <img src={element.album.images[2].url}
              height="40px" width="40px" alt=" " /><br/><br/><br/><br/>
              </li>
              )
          }
        }
      )}
     </ol>
    </div>
  )
}
}

export default HomePage;
