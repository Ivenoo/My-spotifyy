import React from 'react';
import axios from 'axios';




class FindArtist extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchValue: [],
      artistList:[]
    }
  }

search(e){
  const value = e.currentTarget.value
  this.setState({
    searchValue: value
  })
  if(value === ''){
  this.setState({
  artistList: []
})
}else{
  axios({
    url: `https://api.spotify.com/v1/search?q=${value}&type=artist&limit=10`,
    headers:{
     'Authorization': 'Bearer ' + this.props.mytoken
    }
  }).then(resp =>{ this.setState({
    artistList: resp.data.artists.items
   })
   console.log(this.state.artistList)
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
        <input type="text" placeholder="Search Artists..." onChange={this.search.bind(this)}/><br/>
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
            {element.genres.map(element =>{
              return(
                <span>{element} <br/></span>
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
      </div>
    )
  }
}
export default FindArtist;
