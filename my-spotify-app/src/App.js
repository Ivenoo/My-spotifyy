import React from 'react';
import AppHeader from './AppHeader'
import Content from './Content'




class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      action: "homePage",
     mytoken: `BQA6pFXsIFgU4IPgAwepNN8DvyoLxvrreQuaUEWYY2V2hr9fAHls9fod-zRyBEYcdq0XSAJZxsJrj24ynCvyL90e815tFy7XqXElzvm8PxZzw74bfd3VHsenxN_c6XAJwxbLSHlxo2aYU9fGvaC_SuAynLYo3bFBAtYONZKRw4LmSJqSs2oH0TNK`
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
