import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import {useForm} from "react-hook-form";
import {addReview} from "@services/productAPI";
import {toast} from "react-toastify";
import {socket} from "@services/socket";

const ReviewAdd = ({product, showModal, setShowModal, populations = [], setReviews, setHasReview}) => {
	const formData = new FormData
	const [rating, setRating] = useState()
	const [ratingError, setRatingError] = useState(false)
	const {register, handleSubmit, formState: {errors}, reset} = useForm()

	const handleClose = () => setShowModal(false);

	const onSubmit = (data) => {
		setRatingError(false)
		if (rating === undefined) {
			setRatingError(true)
			return true
		}
		Object.keys(data).map(key => {
			formData.append(key, data[key])
		})
		formData.append('ratingLevel', rating)
		formData.append('productId', product.id)
		formData.append('productTitle', product.title)
		formData.append('to', product.user.id)
		formData.append('replay', false)

		addReview(formData).then(res => {
			setHasReview(true)
			setReviews(res)
			handleClose()
			toast.success('You submitted the review')
			socket.emit('vendor_post_review', {nickName: product.user.nickName, title: product.title})
		}).catch(e => {
			toast.error(e.response?.data?.message)
		})
	}

	return (
		<Modal show={showModal} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Add a review on product {product.title}</Modal.Title>
			</Modal.Header>

			<Form onSubmit={handleSubmit(onSubmit)} className="p-0">
				<Modal.Body>
					<Form.Group >
						<h6 className="mb-3 fw-bold">If you used this primarily with students with specific needs,
							please select
							which group(s) best reflect your students. (Optional)</h6>
						{populations.map(item => {
							return (
								<Form.Check type="checkbox" key={item.id}>
									<label className={'d-flex align-items-center' + errors.populations && 'is-invalid'}>
										<input type="checkbox" className="me-2 mt-0" value={item.id}
											   {...register("populations")}
										/>
										{item.title}
									</label>
								</Form.Check>
							)
						})}
					</Form.Group>
					<Form.Group className="mt-4">
						<h6 className="fw-bold">How satisfied were you with this resource?</h6>
						<div className={'' + ratingError && 'is-invalid'}>
							<ReactStars
								classNames="mt-2"
								count={5}
								isHalf={true}
								size={30}
								onChange={setRating}
							/>
						</div>
						{ratingError && <p className={'invalid-feedback'}>Choose your answer</p>}
					</Form.Group>
					<Form.Group className="mt-4">
						<h6 className="fw-bold">Write about your experience</h6>
						<p>Let other educators know how you used this resource, and what you or your students liked or
							disliked.</p>
						<Form.Control
							as="textarea"
							placeholder="My students loved using this resource for their morning work! They were engaged in the resource and had no trouble getting started. It didn't take much time to prepare this resource, so it was easy for me to use in a time crunch. I adapted it a little bit for my emerging bilingual students and had them skip some of the more challenging questions."
							className={errors.content && 'is-invalid'}
							{...register("content", {required: true})}
						/>
						{errors.content &&
						<p className={'invalid-feedback'}>Require field</p>}
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<div className="text-end">
						<Button onClick={handleClose} variant="secondary">Cancel</Button>
						<Button type="submit" variant="success">Submit</Button>
					</div>
				</Modal.Footer>
			</Form>

		</Modal>
	);
};

export default ReviewAdd;
