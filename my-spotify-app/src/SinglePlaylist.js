import React from 'react';

class SingleAlbum extends React.Component {
    constructor(props){
        super(props);
        this.state ={
          timeout: 0,
        }
    }

    testow = (index) =>{
      return(`playlist${index}`)
    }


    
    render(){
      const parentElement = this.props.parentElement;
      const parentIndex = this.props.parentIndex;
      const totalTracks = parentElement.tracks.total;


      return(
        <div  id={this.testow(parentIndex)} className="Single-Playlist">

          <img src={parentElement.images[0].url} className="Single-Playlist-Img" alt=" " />
          <div className="Single-Playlist-Title-Value" >{parentElement.name}</div>
          <div className="Single-Playlist-Total-Info">
            <div className="Single-Playlist-Total">Total Tracks:</div>
            <div className="Single-Playlist-Total-Amount"> {totalTracks}</div>
          </div>
          <button id={parentElement.id} key= {parentIndex +2} className="main-button" onClick={this.props.tracksList.bind(this, parentElement.href, parentIndex, this.props.parentTotals)}><span>Show Tracks</span></button>
          <img src='./img/spotify-icon.png' className="Single-Playlist-Find-Spotify" alt=" "   onClick={()=> window.open(parentElement.external_urls.spotify)}/>
        </div>
        )

    }   
}

export default SingleAlbum;


