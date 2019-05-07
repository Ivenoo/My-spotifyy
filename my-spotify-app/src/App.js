import React from 'react';
import AppHeader from './AppHeader'
import Content from './Content'

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      action: "homePage",
     mytoken: `BQAXttPX85hf8JCUiYkTYgSHwHH6vVVBI1pI_LKxrRLXi7Pj7MF7Oa9DZl86x_r_A_0IeM7EAkPRsOq5j8lUWaPx-B5i5OMSAwYK4wD1Bd9YMHSgwLyTfHLSKcEJUHpIZvfebwpE9W7FQ6ETWNL_UPGRNwXRwrYPZKtmBCZkInRVzSQ60FJfdUJH`
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
