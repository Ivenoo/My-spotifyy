import React from 'react';
import AppHeader from './AppHeader'
import Content from './Content'




class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      action: "homePage",
     mytoken: `BQBZZfEBJWc7SHReZOZW8AmbWQh84Os0d8ux48Brz-SdhoWqT9UJbF24L9T87CbMCGe0raUdG2XxClZNTbNbAtWtsZnwrZogleQbB7LFe6e1RLDr2sJ1cyal1xRzZQegJWjuKM67gv_yS81kOSjpHjL5n2tEjZUeYu5UMYdmneCq8YOmMT0uAyCy`
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
