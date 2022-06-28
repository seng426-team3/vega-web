import {useState, useContext, useEffect} from 'react';
import SimplePageLayout from '../templates/SimplePageLayout.js';
import {Form, Button, Row, Col} from 'react-bootstrap';
import {fileUploader, fetchFiles, fetchData} from '../../service/FileUpload/FileUploader.js';
import {UserContext} from '../../auth/UserProvider.js';
import {Alert, Table} from 'react-bootstrap';

const Resources = (props) => {	
	
	const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);
	const {user} = useContext(UserContext);
	const [listOfFiles, setFiles] = useState([]);
	const [dataLoaded, setDataLoaded] = useState(false);
	const [content, setContent] = useState('');
	const [isFileUploadSuccessfulAlert, setIsFileUploadSuccessfulAert] = useState(false);
	const [isFileUploadFailedAlert, setIsFileUploadFailedAlert] = useState(false);

	var uploadHTML;
	useEffect(() => {
		console.log("JWT is",user.jwt, dataLoaded)
			console.log("Inside useEffect")
			fetchFiles(user.jwt)
				.then(resp => {
					setDataLoaded(true);
					setFiles(resp)});
		

	}, [user])

	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
	};

	const handleSubmission = () => {
		const formData = new FormData();
		console.log("SELECTED FILE");
		console.log(selectedFile);
		formData.append("file", selectedFile);
		fileUploader(formData, user.jwt)
			.then(res => {
				console.log("Response", res);

				if (res == "File uploaded Successfully") {
					setIsFileUploadSuccessfulAert(true);
					return;
				}
				setIsFileUploadFailedAlert(true);
			})

	}

	const fetchFileData = (name) => {
		console.log(user.jwt)
		fetchData(name,user.jwt)
			.then(res => {
				setContent(res);
			})
	}

	const tableOfFilesHTML = () => {
		if(listOfFiles.length) {
			return listOfFiles.map((file) => 
				<tr id={"file-entry" + file} key={"file-entry" + file}>
					<td id={"filename-" + file} key={"filename-" + file}>
						<a href="#" onClick={() => fetchFileData(file)}>{file}</a>
					</td>
				</tr>
			);
		}
	}

	if (user.role == "ROLE_ADMIN"){
		uploadHTML = (<Row>
				<Col className="mx-auto" xs={6}>
					<Form.Group controlId="formFile" className="mb-3">
    					<Form.Label>Resources Upload</Form.Label>
    					<Form.Control type="file" onChange={changeHandler} />
 					</Form.Group>
 					<Button variant="primary" type="submit" onClick={handleSubmission}>
    					Submit
  					</Button>
 				</Col>
			</Row>);
	}

	return (
		<SimplePageLayout>
			{ isFileUploadSuccessfulAlert &&
				<Alert id="file-upload-successful-alert" key="file-upload-successful-alert" variant="success">
					File has been uploaded successfully! Refresh the page to see the files.
					<hr/>
					<div className="d-flex justify-content-end">
						<Button onClick={() => setIsFileUploadSuccessfulAert(false)} variant="outline-success">
							Close
						</Button>
					</div>	
				</Alert>
			}
			{ isFileUploadFailedAlert &&
				<Alert id="file-upload-failed-alert" key="file-upload-failed-alert" variant="danger">
					An error occurred while trying to upload the file.
					<hr/>
					<div className="d-flex justify-content-end">
						<Button onClick={() => setIsFileUploadFailedAlert(false)} variant="outline-danger">
							Close
						</Button>
					</div>	
				</Alert>
			}
			{ user.role == "ROLE_ADMIN" ? (
				uploadHTML
			) : (
				<p id="cannot-upload-notice">You are not allowed to upload files as staff.</p>
			)
			}
			{ (user.role == "ROLE_ADMIN" || user.role == "ROLE_STAFF") && 
				<Row mt="5">
					<Table id="resources-file-table">
						<thead>
							<tr>
								<td>Filename</td>
							</tr>
						</thead>
						<tbody>
							{tableOfFilesHTML()}
						</tbody>
					</Table>
				</Row>
			}
			{ user.role == "ROLE_ADMIN" || user.role == "ROLE_STAFF" ? (
				<Row>
					<h3>Selected File Content</h3>
					<Col>
						{content}
					</Col>
				</Row>	
			) : ( 
				<Alert id="alert-not-authorized-resources-page" variant="danger">You do not have permission to view this page.<Alert.Link href="/">Go to Home</Alert.Link></Alert>
			)};

		</SimplePageLayout>
		);
}

export default Resources;