import React from 'react';


class Limit extends React.Component {


    render(){
        let genres = ''
        if(window.location.pathname === "/findgenres"){
            genres = <option >100</option>
        }

        return(
            <select className="Searching-Limit" defaultValue={this.props.limit} onChange={this.props.changeLimit.bind(this)} >
                <option>5</option>
                <option>10</option>
                <option>15</option>
                <option>20</option>
                <option>25</option>
                <option>30</option>
                <option>35</option>
                <option>40</option>
                <option>45</option>
                <option>50</option>
                {genres}
            </select>
        )
    }
}

export default Limit;
