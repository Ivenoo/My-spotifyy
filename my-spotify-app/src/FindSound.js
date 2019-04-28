import React from 'react';
import axios from 'axios';




class FindSound extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchValue: [],
      trackList:[],
      
    }
  }

search(e){
  const value = e.currentTarget.value
  this.setState({
    searchValue: value,
    elo: ''
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
   this.createfav()
  }).catch(error => (new Error(console.log(error))))
}

}
listen(url){
  if(url != null){
window.open(url)
}
}
heart = ((id) => {
  const fav =JSON.parse(localStorage.getItem('fav'));
  let heartTrue = 0;
  
  fav.forEach(element=>{
    if(element === id){
      heartTrue = 1;
    }
  })
  if(heartTrue){
    return(<img  alt=" "  className="button-favourite" src="./img/red.png" width="40px" height="40px" onClick={this.changeFavourite.bind(this, id)}/>)
  }else{
    return(<img  alt=" " className="button-favourite" src="./img/white.png" width="40px" height="40px" onClick={this.changeFavourite.bind(this, id)}/>)
  }
})

changeFavourite = (id) =>{

    if(!localStorage.getItem('fav')){
      const favourite= [id]
      localStorage.setItem("fav", JSON.stringify(favourite));
    }else{
      const fav = JSON.parse(localStorage.getItem('fav'));
      let favouriteTrue = 0;
      let favouriteIndex;
      
      fav.forEach((element,index)=>{
        if(element === id){
          favouriteTrue = 1;
          favouriteIndex = index;
        }
      })
      if(!favouriteTrue){
        fav.push(id)
        localStorage.setItem("fav", JSON.stringify(fav))
        this.setState({
          elo: ''
        })
      }
      else{
        fav.splice(favouriteIndex, 1)
        localStorage.setItem("fav", JSON.stringify(fav))
        this.setState({
          elo: ''
        })
      }
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
             return(<span key={index} >{element2.name}, </span>)})}<br/>
            Title: <strong className="track-name">" {element.name} "</strong><br/>
            <img src={element.album.images[2].url}
            height="40px" width="40px" alt=" " /><br/>
            <img  alt=" "  className="plays" src="https://images.vexels.com/media/users/3/135176/isolated/preview/a6508e565d25ab01f79a35c4319e0083-play-button-flat-icon-by-vexels.png"  onClick={this.listen.bind(this, element.preview_url)}/>
            {this.heart(element.id)}
            {/* <iframe src={element.preview_url} height="25px" className="frames"></iframe><br/><br/><br/> */}
            </li>
            )}else{
              return(
                <li  key={index}>
                Author: {element.artists.map((element2, index) => { 
                   return(<span key={index}>{element2.name}, </span>)})}<br/>
                Title: <strong className="track-name">" {element.name} "</strong><br/>
                <img src={element.album.images[2].url}
                height="40px" width="40px" alt=" " /><br/><br/>
               {this.heart(element.id)}<br/><br/><br/>
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
