import React from 'react';
import axios from 'axios';
import SingleRandomArtist from './SingleRandomArtist';
import { randomOffset, randomLetter} from './Service'


class RandomArtist extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      artistList:[],
      check: 0
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
      })
    }
  }
    //WCZYTYWANIE PIOSENEK Z API//
  getList = () =>{ 
      axios({
        url: `https://api.spotify.com/v1/search?q=*${randomLetter()}*&type=artist&limit=10&offset=${randomOffset()}`,
        headers:{
        'Authorization': 'Bearer ' + this.props.mytoken
        }
      }).then(resp =>{
        this.setState({
        artistList: resp.data.artists.items
      })
      }).catch(error => (new Error(console.log(error))))
  }

  render() {
    return(
      <div className="Random-Artists-Box">
       
       {
         this.state.artistList.map((element, index)=>
         <SingleRandomArtist  key={index} parentElement={element} parentIndex={index} />
        )}
      </div>
    )
  }
}
export default RandomArtist;
