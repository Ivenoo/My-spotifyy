import React from 'react';
import axios from 'axios';




class FindSound extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchValue: [],
      trackList:[]
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
listen(url){
  if(url != null){
window.open(url)
}
}

  render() {
    return(
      <div>
        <div className="szukajka">
        <input type="text" placeholder="Search Tracks..." onChange={this.search.bind(this)}/><br/>
       search: {this.state.searchValue}<br/>
       </div>
       <ol>
       {
         this.state.trackList.map((element, index)=>{
            if(element.preview_url != null){
          
          return(
            
            <li  key={index}>
           Author: {element.artists.map((element2, index) => { 
             return(<span key='index' >{element2.name}, </span>)})}<br/>
            Title: <strong className="track-name">" {element.name} "</strong><br/>
            <img src={element.album.images[2].url}
            height="40px" width="40px" alt=" " /><br/>
            <img  alt=" "  src="https://images.vexels.com/media/users/3/135176/isolated/preview/a6508e565d25ab01f79a35c4319e0083-play-button-flat-icon-by-vexels.png" width="50px" height="50px" margin-right="80px" onClick={this.listen.bind(this, element.preview_url)}/>
            <img  alt=" "  src="C:\Users\Iveno\Desktop\Gicior_Z_Bolqiem\My-spotify\my-spotify-app\img\white.png" width="40px" height="40px" onClick={this.listen.bind(this, element.preview_url)}/><br/><br/>
            {/* <iframe src={element.preview_url} height="25px" className="frames"></iframe><br/><br/><br/> */}
            </li>
            )}else{
              return(
                <li  key={index}>
                Author: {element.artists.map((element2, index) => { 
                   return(<span key='index'>{element2.name}, </span>)})}<br/>
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

export default FindSound;
