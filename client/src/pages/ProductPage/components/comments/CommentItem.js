import React, {useState} from 'react';
import CommentReplay from "@pages/ProductPage/components/comments/CommentReplay";

const CommentItem = ({comment, className = '', isMyProduct = false, setComments, product}) => {
	const [showForm, setShowForm] = useState(false)
	const dateOptions = {
		year: 'numeric',
		month: 'numeric',
		day: 'numeric',
	};

	return (
		<>
			<div className={"comment " + className}>
				<div className="comment_avatar">
					<img src={ process.env.REACT_APP_API_URL + comment.user.userInfo.avatarImg} alt="title"/>
				</div>
				<div className="comment_card flex-grow-1">
					<div className="comment_header">
						<p className="date mb-0">{new Date(comment.createdAt).toLocaleString("en-US", dateOptions)}</p>
						<h5>{comment.user.nickName}</h5>
					</div>
					<div className="comment_body mt-3">
						<p>{comment.content}</p>
						{isMyProduct && (
							<>
								<a href="#" onClick={(event) => {
									event.preventDefault()
									setShowForm(!showForm)
								}} className="link-primary">Reply <i className="fa fa-edit"/></a>
								{showForm && (
									<CommentReplay product={product} setComments={setComments} comment={comment} setShowForm={setShowForm} />
								)}
							</>
						)}
					</div>
				</div>
			</div>
			{comment.children?.length > 0 && comment.children.map(child => {
				return (
					<CommentItem key={child.id} className="comment_child" comment={child} />
				)
			})}
		</>
	);
};

export default CommentItem;
