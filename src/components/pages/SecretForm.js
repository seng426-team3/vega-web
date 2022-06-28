import SimplePageLayout from "../templates/SimplePageLayout.js";
import {withRouter} from "react-router-dom";
import React from "react";


const SecretForm = (props) => {

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

    return (page);
}

export default withRouter(SecretForm);