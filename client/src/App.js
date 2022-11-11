import React from 'react';
import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import { useQuery } from '@apollo/react-hooks'

const App = () => {
    const [ user, setUser ] = useState({});

    function handleCall(res) {
        console.log("Encoded token: " + res.credential);
        var userObj = jwt_decode(res.credential); // holds all the user info
        console.log(userObj);
        setUser(userObj);
        document.getElementById("signInDiv").hidden = true;
    }

    function signOut(event) {
        setUser({});
        document.getElementById("signInDiv").hidden = false;
    }

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: "32372470210-brjbikf0p0gq4ps68prkq41hcb9mp2u2.apps.googleusercontent.com",
            callback: handleCall
        });

        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            { theme: "outline" }
        );
    }, []);



    return (
        <div>

            <h1>Cobra Eats</h1>

            <div id="signInDiv"></div>
            {Object.keys(user).length != 0 &&
                <button onClick={(e) => signOut(e)}>Sign Out</button>
            }

            {user &&
                <div>
                    <img src={ user.picture }></img>
                    <h2>{ user.name }</h2>
                </div>
            }
            
        </div>
    );
}

export default App;