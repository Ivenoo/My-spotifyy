import React from 'react';
import Favourite from './Favourite';


class SingleTrack extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            Favourite: this.props.parentObj
        }
    }


    render(){
        console.log(this.props.parentObj)
        console.log(this.state.Favourite.limit)
        return(
            <div>

                <div>ITS YOUR FAVOURITE SONGS</div>

                <select onChange={this.props.changeLimit.bind(this)} >
                    <option>5</option>
                    <option>10</option>
                    <option>15</option>
                    <option>20</option>
                    <option>25</option>
                    <option>30</option>
                </select> 
 {/* <ol>
        {
          this.props.parentObj.favArray.slice(this.props.parentObj.myoffset,parseInt(this.props.parentObj.myoffset) + parseInt(this.state.limit)).map((element,index) =>{
            if(element.preview_url != null){
            return(
              <li  key={index}>
              Author: {element.artists.map((element2, index) => { 
                 return(<span key={index}>{element2.name}, </span>)})}<br/>
              Title: <strong className="track-name">" {element.name} "</strong><br/>
              <img src={element.album.images[2].url}
              height="40px" width="40px" alt=" " /><br/>
              {this.heart(element.id)}
              <img  alt=" "  className="plays" src="https://images.vexels.com/media/users/3/135176/isolated/preview/a6508e565d25ab01f79a35c4319e0083-play-button-flat-icon-by-vexels.png"  onClick={this.listen.bind(this, element.preview_url)}/><br/><br/>
              
              </li>
              )
            }else{
              return(
              <li  key={index}>
              Author: {element.artists.map((element2, index) => { 
                 return(<span key={index}>{element2.name}, </span>)})}<br/>
              Title: <strong className="track-name">" {element.name} "</strong><br/>
              <img src={element.album.images[2].url}
              height="40px" width="40px" alt=" " /><br/>
              {this.heart(element.id)}<br/><br/>
              </li>
              )
            }
          })
        }
      </ol> */}
            </div>

        )
    }   
}

export default SingleTrack;


