import React from 'react';
import ReactStars from "react-rating-stars-component";

const ReviewCharts = ({reviews, reviewMean}) => {

	return (
		<>
			{!isNaN(reviewMean) && (
				<div className="mb-5">
					<div className="d-flex align-items-center">
						<ReactStars
							count={5}
							isHalf={true}
							value={reviewMean}
							size={30}
							edit={false}
						/>
						<span className="ms-3 fs-3">{reviewMean}</span>
					</div>
					{reviews.length > 0 ? (
						<p>Based on {reviews.length} reviews</p>
					) : (
						<p>No reviews</p>
					) }
				</div>
			)}
		</>
	);
};

export default ReviewCharts;
