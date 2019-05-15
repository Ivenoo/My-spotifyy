import React from 'react';
import axios from 'axios';
import {BrowserRouter, Route} from "react-router-dom";
import {test} from './Service.js'




class FindAlbum extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchValue: [],
      albumList:[],
      searchValueToExist: '',
      notFindAlbum: 'notexist',
      timeout: 0,
      valuee: 's'
    }
  }


//   search(e){
//     const value = e.currentTarget.value
//     test(this.state.valuee,value)
//     if(this.state.valuee.length > 3){
// console.log('aaaaaaaaa')
//     }
//   }
  
search(e){
  const value = e.currentTarget.value
  this.setState({
    searchValueToExist: value
  })
  if(this.state.timeout) clearTimeout(this.state.timeout);
  this.state.timeout = setTimeout(() => {
  this.setState({
    searchValue: value
  })
  if(value === ''){
  this.setState({
  albumList: []
})
}else{
  this.getList(value)
}
}, 400);
}
getList = (value) =>{
  axios({
    url: `https://api.spotify.com/v1/search?q=${value}&type=album&limit=10`,
    headers:{
     'Authorization': 'Bearer ' + this.props.mytoken
    }
  }).then(resp =>{ 
    this.setState({
      albumList: resp.data.albums.items
     })
     this.exist()
  }).catch(error => (new Error(console.log(error))))
}
listen(url){
  if(url != null){
window.open(url)
}
}

showSongs(index, id){
const div= document.getElementById(index);

if(this.state.timeout) clearTimeout(this.state.timeout);
  this.state.timeout = setTimeout(() => {
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
}, 400);
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


exist =() =>{
  if(this.state.albumList.length <= 0 && this.state.searchValueToExist.length > 0){
  this.setState({
    notFindAlbum: 'exist'
  })
  }else{
    this.setState({
      notFindAlbum: 'notexist'
    })
}
}


  render() {
    return( 
      <div>
         <div className="szukajka">
        <input type="text" placeholder="Search Albums..." onChange={this.search.bind(this)}/><br/>
       search: <br/>
       </div>
       <span className={this.state.notFindAlbum}><strong className="title">{this.state.searchValueToExist} </strong> not exist</span>
       <ol>
       { this.state.albumList.map((element, index)=>{
          return(
            <li  key={index}>
           Author: {element.artists.map((element2, index) => { 
             return(<span key={index +1} >{element2.name}, </span>)})}<br/>
            Album: <strong className="album-name">" {element.name} "</strong><br/>
            <img src={element.images[2].url}
            height="40px" width="40px" alt=" " /><br/>
            <button id={element.id} key= {index +2} className="main-button" onClick={this.openList.bind(this, index, element.id)}>tracks from this album</button>
            <button id={element.id +'a'} key= {index +3} className="main-buttonc" onClick={this.closeList.bind(this, index , element.id) }>close tracks list</button><br/>
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
