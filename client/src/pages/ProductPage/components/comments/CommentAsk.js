import React, {useState} from 'react';
import {Button, Form} from "react-bootstrap";
import {useForm} from "react-hook-form";
import {addComment} from "@services/productAPI";
import {toast} from "react-toastify";
import {socket} from "@services/socket";
import {useSelector} from "react-redux";

const CommentAsk = ({product, setComments}) => {
	const formData = new FormData
	const {currentUser} = useSelector(state => state.user)
	const [showForm, setShowForm] = useState(false)
	const {register, handleSubmit, formState: {errors}, reset} = useForm()

	const onSubmit = ({content}) => {
		formData.append('content', content)
		formData.append('userId', currentUser.id)
		formData.append('productId', product.id)
		formData.append('to', product.user.id)
		formData.append('productTitle', product.title)
		formData.append('replay', false)

		addComment(formData).then(res => {
			setComments(res)
			toast.success('You posted the comment')
			socket.emit('vendor_post_question', {nickName: product.user.nickName, title: product.title})
		}).catch(e => {
			toast.error(e.response?.data?.message)
		})
		reset({content: ""})
		setShowForm(false)
	}

	return (
		<div className="mb-5">
			{!showForm ? (
					<>
						<p className="mb-3">Don’t see the answer you’re looking for?</p>
						<Button variant="outline-success" onClick={() => setShowForm(true)}>Ask a question</Button>
					</>
			) : (
				<Form onSubmit={handleSubmit(onSubmit)}>
					<Form.Group>
						<Form.Control
							as="textarea"
							name="content"
							className={errors.content && 'is-invalid'}
							placeholder="Ask your question"
							{...register('content', {required: true})}
						/>
						{errors.content && <p className={'invalid-feedback'}>This field is required</p>}
					</Form.Group>
					<Form.Group className="text-end mt-3">
						<Button onClick={() => {
							setShowForm(false)
							reset({content: ""})
						}} variant="secondary">Cancel</Button>
						<Button type="submit" variant="success">Post question</Button>
					</Form.Group>
				</Form>
			)}
		</div>
	);
};

export default CommentAsk;
