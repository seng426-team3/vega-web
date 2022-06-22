import  {Table} from 'react-bootstrap';

const ListUsersAdminPanel = (props) => {
    return (
        <Table>
            <thead>
                <tr>
                    <td>First Name</td>
                    <td>Last Name</td>
                    <td>Username</td>
                    <td></td>
                    <td></td>
                </tr>               
            </thead>
            <tbody>
                {props.users}
            </tbody>
        </Table>
    )
}

export default ListUsersAdminPanel;