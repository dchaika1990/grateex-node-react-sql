import React, {useEffect, useMemo, useState} from 'react';
import {checkReview} from "@services/productAPI";
import {Button} from "react-bootstrap";
import {toast} from "react-toastify";
import Loading from "@components/Loading";
import ReviewItem from "@pages/ProductPage/components/reviews/ReviewItem";
import ReviewAdd from "@pages/ProductPage/components/reviews/ReviewAdd";
import {socket} from "@services/socket";
import ReviewCharts from "@pages/ProductPage/components/reviews/ReviewCharts";
import {useSelector} from "react-redux";


const Reviews = ({product, isMyProduct, inOmMyPurchases}) => {
	const {populations} = useSelector(state => state.product)
	const [reviews, setReviews] = useState([])
	const [showModal, setShowModal] = useState(false);
	const [hasReview, setHasReview] = useState(false)
	const [fetching, setFetching] = useState(false)

	const handleShow = () => setShowModal(true);

	const reviewMean = useMemo(() => {
		let allReviews = 0;
		reviews.forEach(rev => {
			allReviews += rev.ratingLevel
		})
		return allReviews / reviews.length
	}, [reviews])

	useEffect(async () => {
		try {
			const fetchReviews = async () => {
				setReviews(product.reviews)
			}
			const fetchData = async () => {
				const check = await checkReview(product.id)
				setHasReview(check)
			}
			await fetchReviews()
			await fetchData()
			socket.on("vendor_post_review_to_vendor", fetchReviews)
			socket.on("vendor_post_answer_on_review_to_vendor", fetchReviews)
		} catch (e) {
			toast.error(e.response?.data?.message)
		}
	}, [])

	return (
		<>
			<ReviewAdd reviewMean={reviewMean} setHasReview={setHasReview} setReviews={setReviews} product={product}
					   showModal={showModal} setShowModal={setShowModal} populations={populations}/>

			{fetching ? (
				<Loading/>
			) : (
				<>
					{reviews.length > 0 && (
						<>
							<hr className="my-4 d-block"/>
							<h4 className="mb-2">Reviews</h4>
						</>
					)}
					<ReviewCharts reviewMean={reviewMean} reviews={reviews}/>
					{(!isMyProduct && inOmMyPurchases && !hasReview) && (
						<div className="text-center">
							<hr className="my-4"/>
							<h4>Leave a review</h4>
							<p>Reviews help educators determine whether a resource will be a good fit for them and their
								students.</p>
							<Button onClick={handleShow} variant="success">Leave a review</Button>
						</div>
					)}
					{reviews.length > 0 && <h4 className="mb-2">Reviews</h4>}
					{reviews.map(review => {
						return (
							<ReviewItem product={product} isMyProduct={isMyProduct} setReviews={setReviews}
										key={review.id} review={review}/>
						)
					})}
				</>
			)}
		</>
	);
};

export default Reviews;
