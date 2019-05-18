import React from 'react';
import axios from 'axios';
import SingleTrack from './SingleTrack';
import Limit from './Limit'



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
       <Limit changeLimit={this.limit.bind(this)}/>
       </div>
       <ol>
       {this.state.searchList.map((element, index)=>
        <SingleTrack  key={index} parentElement={element} parentIndex={index}/>
        )}
       </ol>
      </div>
    )
  }
}

export default FindGenres;
