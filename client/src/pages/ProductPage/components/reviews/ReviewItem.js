import React, {useState} from 'react';
import ReactStars from "react-rating-stars-component";
import ReviewReplay from "@pages/ProductPage/components/reviews/ReviewReplay";

const ReviewItem = ({review, isMyProduct, setReviews, className = '', product}) => {
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
					<img src={process.env.REACT_APP_API_URL + review.user.userInfo.avatarImg} alt="title"/>
				</div>
				<div className="comment_card flex-grow-1">
					<div className="comment_header">
						<p className="date mb-0">{new Date(review.createdAt).toLocaleString("en-US", dateOptions)}</p>
						<h5>{review.user.nickName}</h5>
						{review.ratingLevel > 0 && (
							<ReactStars
								classNames="mt-2"
								count={5}
								isHalf={true}
								value={+review.ratingLevel}
								size={30}
								edit={false}
							/>
						)}
					</div>
					<div className="comment_body mt-3">
						<p>{review.content}</p>
						{isMyProduct && (
							<>
								<a href="#" onClick={(event) => {
									event.preventDefault()
									setShowForm(!showForm)
								}} className="link-primary">Reply <i className="fa fa-edit"/></a>
								{showForm && (
									<ReviewReplay product={product} review={review} setReviews={setReviews}
												  setShowForm={setShowForm}/>
								)}
							</>
						)}
					</div>
				</div>
			</div>
			{review.children?.length > 0 && review.children.map(child => {
				return (
					<ReviewItem key={child.id} className="comment_child" review={child}/>
				)
			})}
		</>
	);
};

export default ReviewItem;
