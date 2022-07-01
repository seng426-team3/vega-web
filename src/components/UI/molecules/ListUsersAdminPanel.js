import  {Table} from 'react-bootstrap';

const ListUsersAdminPanel = (props) => {
    return (
        <Table id="admin-panel-table">
            <thead>
                <tr>
                    <td>First Name</td>
                    <td>Last Name</td>
                    <td>Username</td>
                    <td>Enable/Disable</td>
                    <td>Current Role</td>
                    <td>Change Role</td>
                </tr>               
            </thead>
            <tbody>
                {props.users}
            </tbody>
        </Table>
    )
}

export default ListUsersAdminPanel;