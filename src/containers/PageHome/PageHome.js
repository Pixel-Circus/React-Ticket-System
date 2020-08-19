import React, {useState} from 'react';

//import Input from './../../components/UI/Input/Input'

import "./PageHome.scss";

const PageHome = () => {
    const [clientcode, setClientCode] = useState("");
    var hasError = (window.location.href.indexOf('codenotfound') !== -1);
    const redirectToClient = (event) => {
        console.log('redirect');
        //var clientcode = document.getElementById('clientcode').val();
        if(clientcode){
            window.location = '/client/'+clientcode;
        }
        event.preventDefault();
        return false;
    }
    const inputChangedHandler = (event) => {
       //console.log(event.target.value);
       setClientCode(event.target.value);
    };
    const ErrorMessage = () => {
        if(hasError){
            return (
                <div className="notice is-error">
                    Ce code client n'existe pas
                </div>
            );
        }else{
            return (<div></div>);
        }
    }
    //if(window.location.href.indexOf('codenotfound') != -1);

    return (
        <div className="Container PageHome">
            <h1>Système de Tickets Pixel&nbsp;Circus</h1>
            <ErrorMessage />
            <form onSubmit={redirectToClient}>
                <input type="text" id="clientcode" onChange={inputChangedHandler} placeholder="Votre Code Client"/>
                <input type="submit" value="Soumettre"/>
            </form>
        </div>
    )
}

export default PageHome;