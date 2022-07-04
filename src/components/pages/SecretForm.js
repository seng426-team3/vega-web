import SimplePageLayout from "../templates/SimplePageLayout.js";
import {withRouter} from "react-router-dom";
import React, {useContext} from "react";
import {createsecret} from '../../service/VegaVault/Vault.js'
import {UserContext} from "../../auth/UserProvider";


const SecretForm = (props) => {

    const {user} = useContext(UserContext);

    const goToVault = () => {
        props.history.push("/vega-vault");
    };

    var page =
        <SimplePageLayout>
            <h1>Add a New Secret</h1>
            <form action="">
                <div>Secret Name:</div>
                <input type="text" id="secretName" name="secretName"/><br/><br/>
                <input type="file" id="secretFile" name="filename" className="inputFile"/><br/><br/>
                <input type="submit" onClick={goToVault}/>
            </form>
        </SimplePageLayout>;

    createsecret(document.getElementById("secretFile"), document.getElementById("secretName").value, user.jwt);

    return (page);
}

export default withRouter(SecretForm);