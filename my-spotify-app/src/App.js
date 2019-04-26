import React from 'react';
import AppHeader from './AppHeader'
import Content from './Content'




class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      action: "homePage",
     mytoken: `BQDZfksv3LqjunjX22JMq1K8hzfLfKnkek51XheVbeNqNuYEvSatiZ5quO_-rnViokJjB48uNIgbbgQu_w6ICUwwpKrpLDCm0lQBHiwz527K4Q4voWGfTfttAol6w8X_eb9sgLMZfwFY75gjIRIB0DRBGYHQR45UGX8qvAR9GLPbzgSjB5VsChp-`
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
