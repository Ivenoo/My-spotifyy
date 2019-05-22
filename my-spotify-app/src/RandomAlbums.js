import React from 'react';
import axios from 'axios';
import { randomOffset, randomLetter} from './Service'


class FindAlbum extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      albumList:[],
      check: 0,
    }
  }
componentDidMount(){
  if(this.props.mytoken !== ''){
    this.getList()
    this.setState({
      check: 1
    })
  }
}

  componentWillReceiveProps(){
    if(this.props.mytoken !== "" && this.state.check === 0){
      this.getList()
      this.setState({
        check: 1,
        style: ''
      })
    }
  }
    //POBIERANIE INFORMACJI O ALBUMACH Z API//
  getList = () =>{
    const letter= randomLetter()
    const offset = randomOffset()
    axios({
      url: `https://api.spotify.com/v1/search?q=${letter}&type=album&limit=10&offset=${offset}`,
      headers:{
      'Authorization': 'Bearer ' + this.props.mytoken
      }
    }).then(resp =>{ 
      this.setState({
        albumList: resp.data.albums.items
      })
    }).catch(error => (new Error(console.log(error))))
  }




  render() {
    return( 
       <span>
       { this.state.albumList.map((element, index)=>
            <span  key={index} className="Home-Single-Album" >
            {/* {element.artists.map((element2, index) => {  */}
            {/* return(<span key={index +1}  className="Single-Album-Details">Author: {element2.name}, </span>)})} */}
            <span className="Single-Album-Details">DURA</span>
             <img src={element.images[1].url} className='Img-Rand-Album' alt=" " /><br/>
             
            {/* Album: <strong className="album-name">" {element.name} "</strong><br/>
             */}
            <br/><br/><br/>
            </span>
        )}
        </span>
    )
  }
}

export default FindAlbum;
