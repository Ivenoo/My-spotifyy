import React from 'react';
import axios from 'axios';




class Favourite extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      box:[],
      box2: [],
      favArray: [],
      myoffset: 0,
      limit: 5,
    }
  }
  myFavouriteSongsFirst =(e) =>{
    JSON.parse(localStorage.getItem('fav')).map(element =>{
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
  componentDidMount(){
    this.myFavouriteSongsFirst()
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
      
      for(let i=0; i< fav.length; i++){
        if(fav[i] === id){
          favouriteTrue = 1;
          favouriteIndex = i;
          break;
        }
      } 
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
addmyoffset =() =>{
  this.setState({
    myoffset: parseInt(this.state.myoffset) + parseInt(this.state.limit)
  })
}
changeLimit = (e) =>{
  const newLimit = e.currentTarget.value
  this.setState({
    limit: newLimit
  })
}
removemyoffsets =() =>{
  this.setState({
    myoffset: parseInt(this.state.myoffset) - parseInt(this.state.limit)
  })
}
render() {
  let prevButton = "", nextButton = "";
  if(this.state.myoffset  > 0){
    prevButton = <button onClick={this.removemyoffsets}>Previous</button>
  }
  if(this.state.myoffset < this.state.favArray.length - this.state.limit){
    nextButton = <button onClick={this.addmyoffset}>Next</button>
  }
  return(
    <div>
       <div>ITS YOUR FAVOURITE SONGS</div>
       <select onChange={this.changeLimit.bind(this)} >
          <option>5</option>
          <option>10</option>
          <option>15</option>
          <option>20</option>
          <option>25</option>
          <option>30</option>
        </select>
       <ol>
        {
          this.state.favArray.slice(this.state.myoffset,parseInt(this.state.myoffset) + parseInt(this.state.limit)).map((element,index) =>{
            if(element.preview_url != null){
            return(
              <li  key={index}>
              Author: {element.artists.map((element2, index) => { 
                 return(<span key={index}>{element2.name}, </span>)})}<br/>
              Title: <strong className="track-name">" {element.name} "</strong><br/>
              <img src={element.album.images[2].url}
              height="40px" width="40px" alt=" " /><br/>
              {this.heart(element.id)}
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
              height="40px" width="40px" alt=" " /><br/>
              {this.heart(element.id)}<br/><br/>
              </li>
              )
            }
          })
        }
      </ol>
            {prevButton}
            {nextButton}
    </div>
    )
  }
}

export default Favourite;
