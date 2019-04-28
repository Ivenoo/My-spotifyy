import React from 'react';
import AppHeader from './AppHeader'
import Content from './Content'




class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      action: "homePage",
     mytoken: `BQDpO69RXzqY1BAt0bjVpLrNv73l2-TaiK6HpRgWjQE36M2zh-9eRcxL3Vvui7FzQHVqpr0zcjiFrIh5Pn3p8cf-gH7Jx3-GoHapUvNnBzZcWh-rKdaBT2rcRSq_vTXBtXTOkA6S9JUUMcdrZCrdxsl0To2-B_mJo1b4u6ZiYJA-Zc7wYZaFnMec`
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
