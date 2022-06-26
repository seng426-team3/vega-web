import SimplePageLayout from "../templates/SimplePageLayout.js";
import {withRouter} from "react-router-dom";


const SecretForm = (props) => {

    var page =
        <SimplePageLayout>
            <h1>Add a New Secret</h1>
            <form action="">
                <label for="secretName">Secret Name:</label>
                <input type="text" id="secretName" name="secretName"/><br/><br/>
                <input type="file" id="secretFile" name="filename"/><br/><br/>
                <input type="submit"/>
            </form>
        </SimplePageLayout>;

    return (page);
}

export default withRouter(SecretForm);