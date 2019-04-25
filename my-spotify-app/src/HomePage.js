import React from 'react';
import axios from 'axios';




class HomePage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      randomSongs:[]
    }
  }


getList = () => {
axios({
  url: 'https://api.spotify.com/v1/tracks/7Cl9ujEtCpCbcmynjjL2m5',
  headers:{
   'Authorization': 'Bearer ' + this.props.mytoken
  }
}).then(resp => console.log(resp.data.preview_url))

 }


  render() {

    return(
      <div>
        homepage
        {this.getList()}
      </div>
    )
  }
}

export default HomePage;
