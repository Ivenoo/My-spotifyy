import React from 'react';
import axios from 'axios';




class FindGenres extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchValue: [],
      searchList:[],
      limit: 5
    }
  }
  limit(e){
    const limitValue = e.currentTarget.value
    this.setState({
      limit: limitValue
    })
    if(this.state.searchValue === ''){
    this.setState({
    searchList: []
  })
  }else{
    axios({
      url: `https://api.spotify.com/v1/search?q=genre:${this.state.searchValue}&type=track&limit=${limitValue}`,
      headers:{
       'Authorization': 'Bearer ' + this.props.mytoken
      }
    }).then(resp =>
      { this.setState({
      searchList: resp.data.tracks.items
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
  searchList: []
})
}else{
  axios({
    url: `https://api.spotify.com/v1/search?q=genre:${value}&type=track&limit=${this.state.limit}`,
    headers:{
     'Authorization': 'Bearer ' + this.props.mytoken
    }
  }).then(resp =>
    { this.setState({
    searchList: resp.data.tracks.items
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
       <select onChange={this.search.bind(this)}>
         {this.props.typeTracks.map((element, index)=>{
           return(
             <option key={index}>{element}</option>
           )
         })}
       </select>
       <select onChange={this.limit.bind(this)}>
          <option>5</option>
          <option>10</option>
          <option>15</option>
          <option>20</option>
          <option>25</option>
          <option>30</option>
        </select><br/>
       </div>
       <ol>
       {this.state.searchList.map((element, index)=>{
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

export default FindGenres;
