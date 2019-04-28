import React from 'react';
import axios from 'axios';




class Favourite extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchValue: [],
      trackList:[],
      box:[],
      box2: [],
      favArray: []
    }
  }

search(e){
  const value = e.currentTarget.value
  this.setState({
    searchValue: value
  })
  if(value === ''){
  this.setState({
  trackList: []
})
}else{
  axios({
    url: `https://api.spotify.com/v1/search?q=${value}&type=track&limit=10`,
    headers:{
     'Authorization': 'Bearer ' + this.props.mytoken
    }
  }).then(resp =>{ this.setState({
    trackList: resp.data.tracks.items
   })
  }).catch(error => (new Error(console.log(error))))
}
}

myFavouriteSongs =() =>{
  JSON.parse(localStorage.getItem('fav')).map((element, index) =>{
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

  })
}
listen(url){
  if(url != null){
window.open(url)
}
}

render() {
  return(
    <div>
       <div>ITS YOUR FAVOURITE SONGS</div>
       <button onClick={this.myFavouriteSongs}>SHOW MY LISTS</button>
       <ol>
        {
          this.state.favArray.map((element,index) =>{
            if(element.preview_url != null){
            return(
              <li  key={index}>
              Author: {element.artists.map((element2, index) => { 
                 return(<span key={index}>{element2.name}, </span>)})}<br/>
              Title: <strong className="track-name">" {element.name} "</strong><br/>
              <img src={element.album.images[2].url}
              height="40px" width="40px" alt=" " /><br/>
              <img  alt=" "  className="plays" src="https://images.vexels.com/media/users/3/135176/isolated/preview/a6508e565d25ab01f79a35c4319e0083-play-button-flat-icon-by-vexels.png"  onClick={this.listen.bind(this, element.preview_url)}/><br/><br/>
              </li>
              )
            }else{
              return(
              <li  key={index}>
              Author: {element.artists.map((element2, index) => { 
                 return(<span key={index}>{element2.name}, </span>)})}<br/>
              Title: <strong className="track-name">" {element.name} "</strong><br/>
              <img src={element.album.images[2].url}
              height="40px" width="40px" alt=" " /><br/><br/>
              </li>
              )
            }
          })
        }
      </ol>
    </div>
    )
  }
}

export default Favourite;
