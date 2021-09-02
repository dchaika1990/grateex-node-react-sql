import React from 'react';
import {Link} from "react-router-dom";
import {VENDOR_PAGE} from "@/utils/consts";

const Author = ({product}) => {
	return (
		<div className="author">
			<div className="author-img">
				<Link className="fw-bold link-primary"
					  to={VENDOR_PAGE + '/' + product.user.nickName}>
					<img
						src={process.env.REACT_APP_API_URL + product.user.userInfo.avatarImg}
						alt="avatarImg"/>
				</Link>
			</div>
			<div className="author-name ms-3">
				<h6>By author <Link className="fw-bold link-primary"
									to={VENDOR_PAGE + '/' + product.user.nickName}>{product.user.nickName}</Link>
				</h6>
			</div>
		</div>
	);
};

export default Author;
