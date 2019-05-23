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
          <span className="Random-Artists-Genres-Titlee">Name :</span>
          <span className="artists-name">{parentElement.name}</span><br/>
          <span className="Random-Artists-Genres-Title">genres of music : </span>
          <marquee className="Random-Artists-Marquee">
          {parentElement.genres.map((element,index) =>{
            return(
              <span key={index} className="Random-Artist-One-Genre">{element}, </span>
            )
          })}
          </marquee><br/>
          <span className="Random-Artists-Genres-Titlee">total followres : </span>
          <span>
            {parentElement.followers.total}
          </span>
        </div>
        </div>
        )

    }   
}

export default SingleRandomArtist;


