import logoimage from "../../../assets/images/logo.png";
const LogoImage = (props) => {
	return (
		<embed 
			alt=""
			style={{width:300, height: 85}}
			src={logoimage}
			/>
		);
}
export default LogoImage;