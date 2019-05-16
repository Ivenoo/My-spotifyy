import React from 'react';
import axios from 'axios';
import SingleAlbum from './SingleAlbum';




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
       { this.state.albumList.map((element, index)=>
          <SingleAlbum  key={index} parentElement={element} parentIndex={index} mytoken={this.props.mytoken}/>
        )}
        </ol>
      </div>
    )
  }
}

export default FindAlbum;
