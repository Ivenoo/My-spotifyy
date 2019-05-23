import React from 'react';
import axios from 'axios';
import { randomOffset, randomLetter} from './Service'


class RandomAlbums extends React.Component {
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
      })
    }
  }

    //POBIERANIE INFORMACJI O ALBUMACH Z API//
  getList = () =>{
    axios({
      url: `https://api.spotify.com/v1/search?q=${randomLetter()}&type=album&limit=10&offset=${randomOffset()}`,
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
      <div>
        { this.state.albumList.map((element, index)=>
          <span key={index} className="Single-Album" onClick={()=> window.open(element.external_urls.spotify)}>
            <span className="Single-Album-Details">
            <div className="Pusty"></div>
              <span className="Single-Album-Details-Text">
                <span className="Single-Album-Title">
                  {(element.artists.length > 1 )? 'AUTHORS' : 'AUTHOR'}<br/>
                </span>
                {element.artists.map((element2, index) => {
                  return(<span key={index +1}  className="e"> {element2.name}<br/> </span>)}
                )}
                <br/>
                <span className="Single-Album-Title">ALBUM: </span> <br/>
                {element.name}
                </span>
            </span>
            <img src={element.images[1].url} className='Single-Album-Image' alt=" " />
          </span>
        )}
      </div>
    )
  }
}

export default RandomAlbums;
