import React from 'react';
import axios from 'axios';
import SingleAlbum from './SingleAlbum';


let timeouter;

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

              //POBIERANIE LISTY  ALBUMOW  Z API // 
  search(e){
    const value = e.currentTarget.value
    this.setState({
      searchValueToExist: value
    })
  
    this.setState({
      searchValue: value
    })
    
    if(value === ''){
      this.setState({
        albumList: []
      })
    }else{
      if(timeouter) clearTimeout(timeouter);
        timeouter = setTimeout(() => { 
        this.getList(this.state.searchValue)
      }, 1000);
    }

  }
    //POBIERANIE INFORMACJI O ALBUMACH Z API//
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




    //WYSWIETLANIE INFORMACJI O BRAKU  ZNALEZIONYCH ELEMENTÓW//
  exist =() =>{
    if(this.state.albumList.length <= 0 && this.state.searchValue.length > 0){
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
      <div className="Find-Albums">
        <div className="Title-Box">SEARCH</div>
        <div className="Searching-Bar"> 
          <input type="text" placeholder="Are you looking for an album? Type something here..." className="Searching-Field" onChange={this.search.bind(this)}/>   
        </div>
        <div className="Title-Box">RESULTS</div>
       <span className={this.state.notFindAlbum}><strong className="title">{this.state.searchValueToExist} </strong> not exist</span>
       <div className="Find-Albums-Box">
       { this.state.albumList.map((element, index)=>
          <SingleAlbum  key={index} parentElement={element} parentIndex={index} mytoken={this.props.mytoken}/>
        )}
        </div>
        <div className= "test">
        <div className="Find-Albums-Tracks-Box"></div>
        </div>
      </div>
    )
  }
}

export default FindAlbum;
