import React from 'react';




// Error = ()  =>{
//     return(
//             <h1>THIS SUBPAGE IS NOT EXIST</h1>
//         )
// }
class Error extends React.Component {
    render(){
        return(
            <div className="error">
                THIS SUBPAGE IS EXIST
            </div>
        )
    }
}

export default Error;
