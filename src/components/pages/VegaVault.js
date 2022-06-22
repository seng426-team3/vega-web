import SimplePageLayout from '../templates/SimplePageLayout.js';
import {Table} from 'react-bootstrap';

const VegaVault = (props) => {
	return (
		<SimplePageLayout>
			<Table>
				<thead>
					<tr>
						<td>Name</td>
						<td>Creation Date</td>
						<td>Data</td>
					</tr>
				</thead>
				<tbody>
				</tbody>
			</Table>
		</SimplePageLayout>
		);
}
export default VegaVault;