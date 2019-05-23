import React from 'react';


class SingleRandomArtist extends React.Component {
    constructor(props){
        super(props);
        this.state ={
          refresh: ""
        }
    }

           //WYSWIETLANIE POJEDYNCZEGO ARTYSTY //
    render(){
      const parentElement = this.props.parentElement;
      let artistPhoto = ""
      if(parentElement.images.length > 0) 
      artistPhoto =<img src={parentElement.images[1].url}  className="Random-Artists-IMG"alt=""/>
      return(   
        <div className="Random-Artists">
        {artistPhoto}
        <div className="Random-Artists-Info-Box">
        Name: <strong className="artists-name">{parentElement.name}</strong><br/>
        <span className="Random-Artists-Genres-Title">genres of music: </span>
        <marquee className="Random-Artists-Marquee">
        {parentElement.genres.map((element,index) =>{
          return(
            <span key={index}>{element},</span>
          )
        } )}
        </marquee><br/>
        total followres: {parentElement.followers.total}
        </div>
        </div>
        )

    }   
}

export default SingleRandomArtist;


