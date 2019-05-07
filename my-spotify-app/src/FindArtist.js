import React from 'react';
import axios from 'axios';




class FindArtist extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchValue: [],
      artistList:[],
      limit: 5,
      prev: null,
      next: null,
      myoffset: 'offset=0'
    }
  }
  limit(e){
    const value = e.currentTarget.value
    this.setState({
      limit: value
    })
    if(this.state.searchValue === []){
    this.setState({
    artistList: []
  })
  }else{
    axios({
      url: `https://api.spotify.com/v1/search?q=${this.state.searchValue}&type=artist&limit=${value}&${this.state.myoffset}`,
      headers:{
       'Authorization': 'Bearer ' + this.props.mytoken
      }
    }).then(resp =>{ this.setState({
      artistList: resp.data.artists.items,
      prev: resp.data.artists.previous,
      next: resp.data.artists.next
     })
    }).catch(error => (new Error(console.log(error))))
  }
  
  }
search(e){
  const value = e.currentTarget.value
  this.setState({
    searchValue: value
  })
  if(value === ''){
  this.setState({
  artistList: [],
  prev: null,
  next: null
})
}else{
  this.getList(value, 0)
}
}
getList = (value,link) =>{
  let url = `https://api.spotify.com/v1/search?q=${value}&type=artist&limit=${this.state.limit}`

  if(link !== 0){
    url = link;
    const start = link.indexOf('offset=')
    const stop = link.indexOf('&limit')
    const finishoff = link.slice(start,stop)
    console.log(finishoff)
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
    artistList: resp.data.artists.items,
    prev: resp.data.artists.previous,
    next: resp.data.artists.next
   })
  }).catch(error => (new Error(console.log(error))))
}
listen(url){
  if(url != null){
window.open(url)
}
}
prevNext = () =>{
  if(this.state.artistList.length == 0){
    return(
    <p>WRITE NAME ARTIST TO SEARCH</p>
    )
  }else{
    return(
      <div>
      <button>prev</button>
      <button>next</button>
      </div>
    )
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
        <input type="text" placeholder="Search Artists..." onChange={this.search.bind(this)}/>
        <select onChange={this.limit.bind(this)}>
          <option>5</option>
          <option>10</option>
          <option>15</option>
          <option>20</option>
          <option>25</option>
          <option>30</option>
        </select><br/>
       search: {this.state.searchValue}<br/>
       </div>
       <ol>
       {
         this.state.artistList.map((element, index)=>{
            if(element.images.length > 0){
          
          return(
            
            <li  key={index}>
            
            Name: <strong className="artist-name">{element.name}</strong><br/>
            <img src={element.images[2].url}
            height="40px" width="40px" alt=" " /><br/>
            <b>genres of music:</b><br/>
            {element.genres.map((element,index) =>{
              return(
                <span key={index}>{element} <br/></span>
              )
            } )}<br/>
            total followres: {element.followers.total}<br/><br/><br/>
            </li>
            )}else{
              return(
                <li  key={index}>
                Name: <strong className="artist-name">{element.name}</strong><br/><br/><br/><br/>

                <b>genres of music:</b><br/>
            {element.genres.map(element =>{
              return(
                <span>{element}</span>
              )
            } )}<br/>
                total followres: {element.followers.total}<br/><br/><br/>
                </li>
                )
            }
          }
        )}
       </ol>
       {prevButton}
      {nextButton}
      </div>
    )
  }
}
export default FindArtist;
