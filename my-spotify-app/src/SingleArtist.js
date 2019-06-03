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
      let genresTable = []
    if(parentElement.genres.length != []){
       {parentElement.genres.map((element,index) =>{
         if(genresTable.length < parentElement.genres.length -1 ){
          genresTable.push(` ${element}, `);
         }else{
          genresTable.push `${element}`;
         }
      })}
    }else{
      genresTable = <span>not specified </span>
    }
    const parentIndex = `artist${this.props.parentIndex}`
    let artistName = '';
    if(parentElement.name.length > 100){
      artistName = <marquee className="artist-name">{parentElement.name}</marquee>
    }else{
      artistName = <span className="artist-name">{parentElement.name}</span>
    }

    let forTablet = window.matchMedia("(max-width: 900px)"),
         title = '';
    if(forTablet){
      if(genresTable.length >= 77){
        console.log(genresTable.length)
        title =  <marquee className="Find-Artists-Span-Marquee">{genresTable}</marquee>
      }else{
        console.log('else '+ genresTable.length)
        title =  <span className="Find-Artists-Span-Marquee">{genresTable}</span>
      }
    }

      return(   
        <div className="Find-Artists-Single-Artist">
        {artistPhoto}
        <div id={parentIndex} className='Find-Artist-Info-Box'>
         {artistName}
        <span className="Find-Artists-Genres-Title">genres of music:</span>
        <div className="Find-Artists-Genres-Value">
          <div className="marquee">
            <div className="Find-Artists-Marquee-Box">
                {title}
            </div>
        </div>
        </div>
        <br/>
        <span className="Find-Artists-Popularity">popiularity spotify :<span className="Find-Artists-Popularity-Value"> {parentElement.popularity}</span></span>
        <a onClick={this.fb.bind(this,parentElement.name)} ><img src='./img/fb-icon.png' className="Find-Artists-Comunity-Portal-fb btn btn-white btn-animation-1" alt=" " /></a>
        <a onClick={this.tw.bind(this, parentElement.name)} ><img src='./img/tw-icon.png' className="Find-Artists-Comunity-Portal-tw" alt=" " /></a>
        <a onClick={this.pinterest.bind(this,parentElement.name)} ><img src='./img/pinterest-icon.png' className="Find-Artists-Comunity-Portal-pinterest" alt=" " /></a>
        <span className="Find-Artists-Followers">total spotify followres:<span className="Find-Artists-Followers-Value"> {parentElement.followers.total}</span></span><br/><br/><br/>
      </div>
        </div>
        )

    }   
}

export default SingleArtist;


