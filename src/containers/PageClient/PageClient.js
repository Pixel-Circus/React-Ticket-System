import React from 'react';

//import axios from 'axios';
//import variables from "./../../variables";

const PageClient = (props) => {
    const {code} = props;
    
    return (
        <div className="Container">Client {code}</div>
    )
}

export default PageClient;