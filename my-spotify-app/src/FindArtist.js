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
      myoffset: 'offset=0',
      timeout: 0,
      notFindArtist: 'notexist',
      searchValueToExist: ''
    }
  }
  limit(e){
    const value = e.currentTarget.value
    this.setState({
      limit: value
    })
    if(this.state.searchValue === []){
    this.setState({
    artistList: [],
    test: 'exist'
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
  const value = e.target.value; // this is the search text
  this.setState({
    searchValueToExist: value
  })
    if(this.state.timeout) clearTimeout(this.state.timeout);
    this.state.timeout = setTimeout(() => {
      this.setState({
        searchValue: value
      })
    }, 400);
  if(value === ''){
  this.setState({
  artistList: [],
  prev: null,
  next: null,
  notFindArtist: 'notexist'
})
}else{
  this.getList(value, 0)
}
}
getList = (value,link) =>{ 
  if(this.state.timeout) clearTimeout(this.state.timeout);
  this.state.timeout = setTimeout(() => {
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
    }).then(resp =>{
      this.setState({
      artistList: resp.data.artists.items,
      prev: resp.data.artists.previous
     })
     this.exist()
    }).catch(error => (new Error(console.log(error))))
  }, 400);
  
}

listen(url){
  if(url != null){
window.open(url)
}
}
exist =() =>{
  if(this.state.artistList.length <= 0 && this.state.searchValueToExist.length > 0){
  this.setState({
    notFindArtist: 'exist'
  })
  }else{
    this.setState({
      notFindArtist: 'notexist'
    })
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
        {/* <input type="text"  id= "searchArtist" placeholder="Search Artists..." onChange={this.looking.bind(this)}/> */}
        <select onChange={this.limit.bind(this)}>
          <option>5</option>
          <option>10</option>
          <option>15</option>
          <option>20</option>
          <option>25</option>
          <option>30</option>
        </select><br/>
       search:  <br/>
       </div>
       <ol className="list-Artist">
       <span className={this.state.notFindArtist}><strong className="title">{this.state.searchValueToExist} </strong> not exist</span>
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
