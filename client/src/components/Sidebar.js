import React, {useState} from 'react';

const Sidebar = ({children}) => {
	const [hide, setHide] = useState(false)

	const toggleSidebar = () => {
		setHide(!hide)
	}

	return (
		<>
			<div className={`sidebar ${hide ? 'close' : ''}`}>
				<div onClick={toggleSidebar} className="sidebar-hide-btn">
					<i className="fa fa-bars" />
				</div>
				<div className="sidebar-content">
					{children}
				</div>
			</div>
		</>
	);
};

export default Sidebar;
