import React from 'react';


class SingleArtist extends React.Component {
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
      artistPhoto =<img src={parentElement.images[0].url} width="64px" heigth="64px" alt=""/>
      return(   
        <li>
        Name: <strong className="artist-name">{parentElement.name}</strong><br/>
        {artistPhoto}<br/>
        <b>genres of music:</b><br/>
        {parentElement.genres.map((element,index) =>{
          return(
            <span key={index}>{element} <br/></span>
          )
        } )}<br/>
        total followres: {parentElement.followers.total}<br/><br/><br/>
        </li>
        )

    }   
}

export default SingleArtist;


