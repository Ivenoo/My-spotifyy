import React from 'react';
import AppHeader from './AppHeader'
import Content from './Content'




class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      action: "homePage",
     mytoken: `BQACzeLGfkKU6YDQbDqafow6AC1aRw2u40dLLZbTowWHcs0QYWV_RyZv6BzE9r6qyU6t96eGrrvB1350yfJSKg82NwWGhf7Lg3dTa7Ny59pmn4_p2PxKKfDmqQ0SQ2-nqHUdwOf6C_CkY8kd37oUtjeSBWA_SqmEUhij7o_RQAD7gEbi2nSHAZq4`
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
