import React from 'react';


class Limit extends React.Component {
     constructor(props){
        super(props);
    }

    render(){
        return(
            <select onChange={this.props.changeLimit.bind(this)} >
            <option>5</option>
            <option>10</option>
            <option>15</option>
            <option>20</option>
            <option>25</option>
            <option>30</option>
            </select>
        )
    }


}

export default Limit;
