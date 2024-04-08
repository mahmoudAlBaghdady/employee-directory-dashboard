import React,{useState, useEffect} from "react";
import { Dropdown } from "react-bootstrap";
import { IMAGES } from "../../constant/theme";

const Header = () => {
	const [headerFix, setheaderFix] = useState(false);
	useEffect(() => {
		window.addEventListener("scroll", () => {
			setheaderFix(window.scrollY > 50);
		});
	}, []); 
	
  return ( 
    <div className={`header ${headerFix ? "is-fixed" : ""}`}>
      <div className="header-content">
        <nav className="navbar navbar-expand">
          	<div className="collapse navbar-collapse justify-content-between">
				<div className="header-left">		
					<div className="dashboard_bar" style={{ textTransform: "capitalize" }}>Dashboard</div>				
				</div>
				<div className="header-right d-flex align-items-center">
					<ul className="navbar-nav ">	
						<li className="nav-item ps-3">
							<Dropdown className="header-profile2">
									<div className="header-info2 d-flex align-items-center">
										<div className="header-media"><img src={IMAGES.User} alt="" /></div>										
									</div>
							</Dropdown>
						</li>						
					</ul>
				</div>
          	</div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
