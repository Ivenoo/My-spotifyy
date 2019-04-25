import React from 'react';
import AppHeader from './AppHeader'
import Content from './Content'




class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      action: "findSound",
     mytoken: `BQD4M-ZxjBeFR0LkKkmvc7oUx49NsJokFM8Na968BZZsHVj_EIeCvTRaBiCr8e8_48uZruwbHb3LSm9ATtCGV48c3EaUmZfZ0WCbp7uCafRRQYz4ySMgyTffQqxnJs7X2DJkrpX2lqHn0RjpZJBHv7C0y_l1VFK05RLo8YIE8iUIO2wQq3JzDj47`
    }
  }
selectAction = (action) =>{
  this.setState({
    action
  })
}
 
  render() {
    return(
        <div className="App">
        <div className="App-Menu">
        <AppHeader selectAction = {this.selectAction}/>
        </div>
       <div className="App-Contener">
       <Content action={this.state.action} mytoken={this.state.mytoken}/>
       </div>
        </div>
      )
  }
}

export default App;
