import React from 'react';



class SingleAlbum extends React.Component {
    constructor(props){
        super(props);
        this.state ={
          timeout: 0,
        }
    }

    testow = (index) =>{
      return(`album${index}`)
    }

    
    render(){
      const parentElement = this.props.parentElement;
      const parentIndex = this.props.parentIndex;
      let SingleAlbumTitle = ''
      if(parentElement.name.length < 75){
        SingleAlbumTitle = <span className="Single-Album-Title-Value" >{parentElement.name}</span>  
      }else{
        SingleAlbumTitle = <marquee className="Single-Album-Title-Value" >{parentElement.name}</marquee>  
      }
      let ArtistsTable = []
      if(parentElement.artists.length !== []){
        if(parentElement.artists.length > 1){
          parentElement.artists.map(element => {
            if(ArtistsTable.length < parentElement.artists.length-1){
             ArtistsTable.push(`${element.name}, `);
            }else{
             ArtistsTable.push(`${element.name}`);
            }
            return(0);
         })
        }else{
          parentElement.artists.map(element =>
           ArtistsTable += `${element.name}`
          )
        }
      }else{
        ArtistsTable = <span>not specified </span>
      }
      let longArtists = ''
      if(parentElement.artists.length >= 5){
        longArtists = <marquee  className="Single-Album-Author-Value" >{ArtistsTable}</marquee>
      }else{
        longArtists = <span  className="Single-Album-Author-Value" >{ArtistsTable}</span>
      }

      return(
        <div  id={this.testow(parentIndex)} className="Find-Albums-One-Album">
        <span className="Single-Album-Title">Album:</span>
        {SingleAlbumTitle}
        <span className="Single-Album-Author-Title">Author:</span> 
        <div className="Single-Album-Artists-Box">
         {longArtists}
         </div>
         <div className="Total-Box"><span className="Single-Album-Total">total tracks:</span><span className="Single-Album-Total-Value">{parentElement.total_tracks}</span></div> 
        <img src={parentElement.images[2].url}
        className="Single-Album-Img" alt=" " />
        <button id={parentElement.id} key= {parentIndex +2} className="main-button" onClick={this.props.tracksList.bind(this,parentElement.id,parentIndex)}><span>Show Tracks</span></button>
        <img src='./img/spotify-icon.png' className="Single-Album-Find-Spotify" alt=" "   onClick={()=> window.open(parentElement.external_urls.spotify)}/>
        </div>
        )

    }   
}

export default SingleAlbum;


