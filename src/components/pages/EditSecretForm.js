import SimplePageLayout from "../templates/SimplePageLayout.js";
import {withRouter} from "react-router-dom";
import React, {useContext} from "react";
import {fetchsecrets, updatesecret} from "../../service/VegaVault/Vault";
import {UserContext} from "../../auth/UserProvider";

import './VegaVault.css';


const EditSecretForm = (props) => {

    const {user} = useContext(UserContext);

    const goToVault = () => {
        props.history.push("/vega-vault");
    };

    const testUpload = () => {
        console.log(document.getElementById('secretFile').files[0]);
        console.log(document.getElementById('secretName').value);
        // console.log(secretId);

        // updatesecret(secretId, document.getElementById('secretFile').files[0], document.getElementById('secretName').value, user.jwt);

        // goToVault();
    }

    const secretIds = fetchsecrets(user.jwt);

    var page =
        <SimplePageLayout>
            <h1>Edit Secret</h1>

            <form action="" method="get">
                <div>Secret Name:</div>
                <input type="text" id="secretName" name="secretName"/><br/><br/>
                <input type="file" id="secretFile" name="filename" className="inputFile"/><br/><br/>
            </form>
            <button className="blueButton" onClick={testUpload}>testUpload</button>
        </SimplePageLayout>;

    return (page);
}

export default withRouter(EditSecretForm);