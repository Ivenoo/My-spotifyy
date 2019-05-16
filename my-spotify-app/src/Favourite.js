import React from 'react';
import axios from 'axios';
import SingleTrack from './SingleTrack';




class Favourite extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      box:[],
      box2: [],
      favArray: [],
      myoffset: 0,
      limit: 5,
    }
  }
  myFavouriteSongsFirst =(e) =>{
    JSON.parse(localStorage.getItem('fav')).map(element =>{
      axios({
        url: `https://api.spotify.com/v1/tracks/${element}`,
        headers:{
         'Authorization': 'Bearer ' + this.props.mytoken
        }
      }).then(resp =>{ 
        this.state.favArray.push(resp.data)
          this.setState({
            favArray: this.state.favArray
          }) 
       })
  
    })
  }
  componentDidMount(){
    this.myFavouriteSongsFirst()
  }



addmyoffset =() =>{
  this.setState({
    myoffset: parseInt(this.state.myoffset) + parseInt(this.state.limit)
  })
}
changeLimit = (e) =>{
  const newLimit = e.currentTarget.value
  this.setState({
    limit: newLimit
  })
}
removemyoffsets =() =>{
  this.setState({
    myoffset: parseInt(this.state.myoffset) - parseInt(this.state.limit)
  })
}
render() {
  let prevButton = "", nextButton = "";
  if(this.state.myoffset  > 0){
    prevButton = <button onClick={this.removemyoffsets}>Previous</button>
  }
  if(this.state.myoffset < this.state.favArray.length - this.state.limit){
    nextButton = <button onClick={this.addmyoffset}>Next</button>
  }
  return(
    <div>
       <div>ITS YOUR FAVOURITE SONGS</div>
       <select onChange={this.changeLimit.bind(this)} >
          <option>5</option>
          <option>10</option>
          <option>15</option>
          <option>20</option>
          <option>25</option>
          <option>30</option>
        </select>
       <ol>
        {
          this.state.favArray.slice(this.state.myoffset,parseInt(this.state.myoffset) + parseInt(this.state.limit)).map((element,index) =>
              <SingleTrack  key={index} parentElement={element} parentIndex={index}/>
          )
        }
      </ol>
            {prevButton}
            {nextButton}
    </div>
    )
  }
}

export default Favourite;
