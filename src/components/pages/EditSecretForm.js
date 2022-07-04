import SimplePageLayout from "../templates/SimplePageLayout.js";
import {withRouter} from "react-router-dom";
import React from "react";
import {updatesecret} from "../../service/VegaVault/Vault";


const EditSecretForm = (props) => {

    const goToVault = () => {
        props.history.push("/vega-vault");
    };

    var page =
        <SimplePageLayout>
            <h1>Edit Secret</h1>
            <form action="">
                <div>Secret Name:</div>
                <input type="text" id="secretName" name="secretName"/><br/><br/>
                <input type="file" id="secretFile" name="filename" className="inputFile"/><br/><br/>
                <input type="submit" onClick={goToVault}/>
            </form>
        </SimplePageLayout>;

    updatesecret(document.getElementById("secretFile"), document.getElementById("secretName").value, user.jwt);

    return (page);
}

export default withRouter(EditSecretForm);