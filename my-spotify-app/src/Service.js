// import axios from 'axios';


export const test = (valuee,value) =>{
    console.log('z funkcji' + ' ' +valuee)
    valuee = value 
    console.log('czy to dziala ' + valuee )
}

// export const test = (value) =>{
//  searche = (e) =>{
//   const value = e.currentTarget.value
//   this.setState({
//     searchValueToExist: value
//   })
//   if(timeout) clearTimeout(timeout);
//   timeout = setTimeout(() => {
//   this.setState({
//     return(value)
//   })
//   if(value === ''){
//   this.setState({
//   return( [])
// })
// }else{
// // this.getList(value)
// console.log('musze zrobic getLIst')
// }
// }, 400);
// }
// }






// export const getList = (value) =>{
//   axios({
//     url: `https://api.spotify.com/v1/search?q=${value}&type=album&limit=10`,
//     headers:{
//      'Authorization': 'Bearer ' + this.props.mytoken
//     }
//   }).then(resp =>{ 
//     this.setState({
//       albumList: resp.data.albums.items
//      })
//      this.exist()
//   }).catch(error => (new Error(console.log(error))))
// }
// listen(url){
//   if(url != null){
// window.open(url)
// }
// }

// showSongs(index, id){
// const div= document.getElementById(index);

// if(this.state.timeout) clearTimeout(this.state.timeout);
//   this.state.timeout = setTimeout(() => {
// if(div.innerHTML === ""){
//   axios({
//     url: `https://api.spotify.com/v1/albums/${id}/tracks`,
//     headers:{
//      'Authorization': 'Bearer ' + this.props.mytoken
//     }
//   }).then(resp =>{ 
//    resp.data.items.map(element => {
//      if(element.preview_url != null){
//     return(div.innerHTML = div.innerHTML + `<li>  <a  class="name-songs-linked" style="color:blue" href=${element.preview_url} target="_blank"> ${element.name} </a>  </li><br/>`)
//   }else{
//     return(div.innerHTML = div.innerHTML + `<li> ${element.name} </li><br/>`)
//   }})

//   }).catch(error => (new Error(console.log(error))))
// }
// }, 400);
// }
// changeButton = (id) =>{
//   document.getElementById(id).style.display = "none";
//   document.getElementById(id +'a').style.display = "block";
// }
// openList = (index, id) =>{
//   this.showSongs(index, id)
//  // changeButton()
//  this.changeButton(id)
// }
// closeList = (index, id) =>{
//   // const div= document.getElementById(index);
//   document.getElementById(index).innerHTML = "";
//   document.getElementById(id).style.display = "block";
//   document.getElementById(id +'a').style.display = "none";
// }


// exist =() =>{
//   if(this.state.albumList.length <= 0 && this.state.searchValueToExist.length > 0){
//   this.setState({
//     notFindAlbum: 'exist'
//   })
//   }else{
//     this.setState({
//       notFindAlbum: 'notexist'
//     })
// }
// }
// }
// test2000 = ()=>{
//    console.log('dziala')
//   }



