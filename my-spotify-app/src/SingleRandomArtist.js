import React from 'react';


class SingleRandomArtist extends React.Component {
    constructor(props){
        super(props);
        this.state ={
          refresh: ""
        }
    }


    fb = (url) =>{
      console.log(url.trim())
      window.open(`https://www.facebook.com/search/top/?q=${encodeURIComponent(url)}&epa=SEARCH_BOX`)
    }
    tw = (url) =>{
      window.open(`https://twitter.com/search?q=${encodeURIComponent(url)}&src=typd`)
    }
    pinterest = (url) =>{
      window.open(`https://pl.pinterest.com/search/pins/?q=${encodeURIComponent(url)}`)
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
          <span className="Random-Artists-Genres-Title">genres : </span>
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
        <div className="Single-Track-Icon-Box">
          {/* ZMIENIC A NA BUTTONY I POPRAWIC STYLE WTEDY  */}
                <a href='#' onClick={this.fb.bind(this,parentElement.name)} ><img src='./img/fb-icon.png' className="Single-Track-Comunity-Portal-fb btn btn-white btn-animation-1" alt=" " /></a>
                <a href='#' onClick={this.tw.bind(this, parentElement.name)} ><img src='./img/tw-icon.png' className="Single-Track-Comunity-Portal-tw" alt=" " /></a>
                <a href='#' onClick={this.pinterest.bind(this,parentElement.name)} ><img src='./img/pinterest-icon.png' className="Single-Track-Comunity-Portal-pinterest" alt=" " /></a>
              </div>
        </div>
        )

    }   
}

export default SingleRandomArtist;


