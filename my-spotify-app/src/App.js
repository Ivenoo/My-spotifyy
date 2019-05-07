import React from 'react';
import AppHeader from './AppHeader'
import Content from './Content'
const activeToken = `BQB6aEWndZPQbBIo5B0UrH0DCktn9PlAuB-rkMYp_Ngfjgf_4Z0c1ZxkhKj0K64hNNLJTgheedQ9AvJvPTIzeTdQ-iS89fLLL9nqfoRPVjpG8bmrZBgHBzEO5cEZ4OpyO5aYaMzByeSPMBdIn6oXpae3myhl7BmLFN1jQZ4pR6QFinp9LGpsUzXp`
class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      action: "homePage",
     mytoken: activeToken
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
