import React from 'react';
import FindSound from './FindSound';
import FindArtist from './FindArtist';
import HomePage from './HomePage';
import FindGenres from './FindGenres';
import FindAlbum from './FindAlbum';
import Favourite from './Favourite';
import {Route, Switch} from 'react-router-dom';
import Error from './Error';
import {hidePlayer} from "./Service"

        // KOMPONENT WYSWIETLAJACY POSZCZEGÓLNY KOMPONENT  WYBRANY Z MENU //
class Content extends React.Component {
  render() {
    return(
      <div className="App-Content">
        <Switch>
          <Route exact path="/" render={()=> <HomePage   mytoken={this.props.mytoken}/> }/>
          <Route exact path="/findsound" render={()=> <FindSound  mytoken={this.props.mytoken}/> }/>
          <Route exact path="/findartist" render={()=> <FindArtist mytoken={this.props.mytoken} /> }/>
          <Route exact path="/findgenres" render={()=> <FindGenres searchGenres={this.props.genres} mytoken={this.props.mytoken} typeTracks={this.props.typeTracks}/> }/>
          <Route exact path="/findalbum" render={()=> <FindAlbum   mytoken={this.props.mytoken} /> }/>
          <Route exact path="/favourite" render={()=> <Favourite  mytoken={this.props.mytoken} />}/>
          <Route component={()=> <Error/>}/>
        </Switch>
        <img src='./img/scroll-up.png' className="Scroll-Up" alt=" " />
        <div className='Player-Box'>
          <div className="Track-Name-Audio"></div>
          <div className="Player-Box-Close" onClick={()=>{hidePlayer()}}>close</div>
        <audio controls autoPlay className="Player"/>
        </div>
      </div>
    )   
}
}

export default Content;
