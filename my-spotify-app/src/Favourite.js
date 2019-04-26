import React from 'react';
import axios from 'axios';




class Favourite extends React.Component {
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

  render() {
    return(
     <div>
       HELLO YOUR FAVOURITE SONGS
     </div>
    )
  }
}

export default Favourite;
