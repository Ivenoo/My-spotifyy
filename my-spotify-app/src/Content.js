import React from 'react';
import FindSound from './FindSound';
import FindArtist from './FindArtist';
import HomePage from './HomePage';
import FindGenres from './FindGenres';
import FindAlbum from './FindAlbum';
import Favourite from './Favourite';
import {Route, Switch} from 'react-router-dom';
import Error from './Error';

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
        <audio controls autoPlay className="Player"/>
      </div>
    )   
}
}

export default Content;
