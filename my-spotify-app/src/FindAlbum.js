import React from 'react';
import axios from 'axios';




class FindAlbum extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchValue: [],
      albumList:[]
    }
  }

search(e){
  const value = e.currentTarget.value
  const toClear = document.querySelectorAll('.to-kill')
  toClear.forEach(element =>{
    element.innerHTML = ""
  })
  this.setState({
    searchValue: value
  })
  if(value === ''){
  this.setState({
  albumList: []
})
}else{
  axios({
    url: `https://api.spotify.com/v1/search?q=${value}&type=album&limit=10`,
    headers:{
     'Authorization': 'Bearer ' + this.props.mytoken
    }
  }).then(resp =>{ 
    this.setState({
      albumList: resp.data.albums.items
     })
  }).catch(error => (new Error(console.log(error))))
}

}

listen(url){
  if(url != null){
window.open(url)
}
}

showSongs(index, id){
const div= document.getElementById(index);
if(div.innerHTML === ""){
  axios({
    url: `https://api.spotify.com/v1/albums/${id}/tracks`,
    headers:{
     'Authorization': 'Bearer ' + this.props.mytoken
    }
  }).then(resp =>{ 
   resp.data.items.map(element => {
     if(element.preview_url != null){
    return(div.innerHTML = div.innerHTML + `<li>  <a  class="name-songs-linked" style="color:blue" href=${element.preview_url} target="_blank"> ${element.name} </a>  </li><br/>`)
  }else{
    return(div.innerHTML = div.innerHTML + `<li> ${element.name} </li><br/>`)
  }})
  }).catch(error => (new Error(console.log(error))))
}

}
changeButton = (id) =>{
  document.getElementById(id).style.display = "none";
  document.getElementById(id +'a').style.display = "block";
}
openList = (index, id) =>{
  this.showSongs(index, id)
 // changeButton()
 this.changeButton(id)
}
closeList = (index, id) =>{
  // const div= document.getElementById(index);
  document.getElementById(index).innerHTML = "";
  document.getElementById(id).style.display = "block";
  document.getElementById(id +'a').style.display = "none";
}




  render() {
    return(
      <div>
         <div className="szukajka">
        <input type="text" placeholder="Search Albums..." onChange={this.search.bind(this)}/><br/>
       search: {this.state.searchValue}<br/>
       </div>
       <ol>
       { this.state.albumList.map((element, index)=>{
          return(
            <li  key={index}>
           Author: {element.artists.map((element2, index) => { 
             return(<span key={index} >{element2.name}, </span>)})}<br/>
            Album: <strong className="album-name">" {element.name} "</strong><br/>
            <img src={element.images[2].url}
            height="40px" width="40px" alt=" " /><br/>
            <button id={element.id} key= {index} className="main-button" onClick={this.openList.bind(this, index, element.id)}>tracks from this album</button>
            <button id={element.id +'a'} key= {index} className="main-buttonc" onClick={this.closeList.bind(this, index , element.id) }>close tracks list</button><br/>
            <ol id={index} className="to-kill"></ol><br/><br/><br/>
            </li>
            )
          }
        )}
        </ol>
      </div>
    )
  }
}

export default FindAlbum;
