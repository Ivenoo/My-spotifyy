import React from 'react';


class SingleArtist extends React.Component {
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
      if(parentElement.images.length > 0) {
      artistPhoto =<img src={parentElement.images[1].url}  className="Find-Artists-Img" alt=""/>
    }else{
      artistPhoto =<img src='img/default-avatar.png' className="Find-Artists-Img" alt=""/>
    }
      let dura = ""
    if(parentElement.genres.length != []){
      console.log('są genresy')
       {parentElement.genres.map((element,index) =>{
          dura = <span key={index}>{element}, </span>
      })}
    }else{
      dura = <span>nie podano </span>
    }
    
      return(   
        <div className="Find-Artists-Single-Artist">
        {artistPhoto}
        <div className='Find-Artist-Info-Box'>
         <span className="artist-name">{parentElement.name}</span><br/>
        <span className="Find-Artists-Genres-Title">genres of music:</span>
        <div className="Find-Artists-Genres-Value">
          <marquee>
        {dura}
        </marquee></div>
        <br/>
        <span className="Find-Artists-Popularity">popiularity spotify : {parentElement.popularity}</span>
        <a onClick={this.fb.bind(this,parentElement.name)} ><img src='./img/fb-icon.png' className="Find-Artists-Comunity-Portal-fb btn btn-white btn-animation-1" alt=" " /></a>
        <a onClick={this.tw.bind(this, parentElement.name)} ><img src='./img/tw-icon.png' className="Find-Artists-Comunity-Portal-tw" alt=" " /></a>
        <a onClick={this.pinterest.bind(this,parentElement.name)} ><img src='./img/pinterest-icon.png' className="Find-Artists-Comunity-Portal-pinterest" alt=" " /></a>
        <span className="Find-Artists-Followers">total spotify followres: {parentElement.followers.total}</span><br/><br/><br/>
      </div>
        </div>
        )

    }   
}

export default SingleArtist;


