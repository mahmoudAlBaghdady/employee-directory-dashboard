import React from "react";

const Footer = () => {
	var d = new Date();
	return (
		<div className="footer out-footer">
			<div className="copyright">
				<p>Copyright © Developed by <a href="https://www.employeedirectory.site/" target="_blank"  rel="noreferrer">ED</a>{d.getFullYear()}</p>
			</div>
		</div>
	);
};

export default Footer;
