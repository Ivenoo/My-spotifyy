import React from 'react';
import axios from 'axios';
import SingleTrack from './SingleTrack';



class FindSound extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchValue: [],
      trackList:[],
      limit: 5,
      prev: null,
      next: null,
      myoffset: 'offset=0',
      notFindTracks: 'notexist',
      searchValueToExist: '',
       timeout: 0
      
    }
  }
limit(e){
  const valueLimit = e.currentTarget.value
  if(this.state.searchValue === []){
    console.log('please write name of tracks')
    this.setState({
    trackList: []
  })
  }else{
    this.setState({
      limit: valueLimit
    })
    axios({
      url: `https://api.spotify.com/v1/search?q=${this.state.searchValue}&type=track&${this.state.myoffset}&limit=${valueLimit}`,
      headers:{
       'Authorization': 'Bearer ' + this.props.mytoken
      }
    }).then(resp =>{ this.setState({
      trackList: resp.data.tracks.items,
      prev: resp.data.tracks.previous,
      next: resp.data.tracks.next
     })
     this.createfav()
    }).catch(error => (new Error(console.log(error))))
  }
}

search(e){
  const value = e.currentTarget.value
  this.setState({
    searchValueToExist: value
  })
  let timeouter = this.state.timeout
  if(timeouter) clearTimeout(timeouter);
  timeouter = setTimeout(() => {
  this.setState({
    searchValue: value
  })
  if(value === ''){
  this.setState({
  trackList: [],
  prev: null,
      next: null
})
}else{
  this.getList(value, 0)
}
}, 400);
}
getList = (value,link) =>{
  let timeouter = this.state.timeout
  if(timeouter) clearTimeout(timeouter);
  timeouter= setTimeout(() => {
  let url = `https://api.spotify.com/v1/search?q=${value}&type=track&limit=${this.state.limit}`

  if(link !== 0){
    url = link;
    const start = link.indexOf('offset=')
    const stop = link.indexOf('&limit')
    const finishoff = link.slice(start,stop)
    this.setState({
      myoffset: finishoff
    })
  }
  axios({
    url: url,
    headers:{
     'Authorization': 'Bearer ' + this.props.mytoken
    }
  }).then(resp =>{ this.setState({
    trackList: resp.data.tracks.items,
    prev: resp.data.tracks.previous,
    next: resp.data.tracks.next
   })
   this.exist()
   this.createfav()
  }).catch(error => (new Error(console.log(error))))
  }, 400);
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

exist =() =>{
  if(this.state.trackList.length <= 0 && this.state.searchValueToExist.length > 0){
  this.setState({
    notFindTracks: 'exist'
  })
  }else{
    this.setState({
      notFindTracks: 'notexist'
    })
}
}

  render() {
    let prevButton = "", nextButton = "";
    if(this.state.prev !==null){
      prevButton = <button onClick={this.getList.bind(this,0,this.state.prev)}>Previous</button>
    }
    if(this.state.next !==null){
      nextButton = <button onClick={this.getList.bind(this,0,this.state.next)}>Next</button>
    }
    return(
      <div>
        <div className="szukajka">
        <input type="text" placeholder="Search Tracks..." onChange={this.search.bind(this)}/>
        <select onChange={this.limit.bind(this)}>
          <option>5</option>
          <option>10</option>
          <option>15</option>
          <option>20</option>
          <option>25</option>
          <option>30</option>
        </select>
        <br/>
       search:<br/>

       </div>
       <span className={this.state.notFindTracks}><strong className="title">{this.state.searchValue} </strong> not exist</span>
       <ol>
       {
         this.state.trackList.map((element, index)=>
         <SingleTrack  key={index} parentElement={element} parentIndex={index}/>
        )}
       </ol>
      {prevButton}
      {nextButton}
    </div>
    )
  }
}

export default FindSound;
