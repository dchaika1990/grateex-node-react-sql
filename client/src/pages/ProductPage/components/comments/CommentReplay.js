import React from 'react';
import {Button, Form} from "react-bootstrap";
import {useForm} from "react-hook-form";
import {addComment} from "@services/productAPI";
import {toast} from "react-toastify";
import {socket} from "@services/socket";
import {useSelector} from "react-redux";

const CommentReplay = ({comment, setComments, setShowForm, product}) => {
	const formData = new FormData
	const {currentUser} = useSelector(state => state.user)
	const {register, handleSubmit, formState: {errors}, reset} = useForm()

	const onSubmit = ({content}) => {
		formData.append('content', content)
		formData.append('userId', currentUser.id)
		formData.append('productId', comment.productId)
		formData.append('parent_id', comment.id)
		formData.append('to', comment.userId)
		formData.append('productTitle', product.title)
		formData.append('replay', true)

		addComment(formData).then(res => {
			setComments(res)
			toast.success('You posted the answer')
			socket.emit('vendor_post_answer', {nickName: comment.user.nickName, title: product.title})
		}).catch(e => {
			toast.error(e.response?.data?.message)
		})
		reset({content: ""})
		setShowForm(false)
	}

	return (
		<Form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
			<Form.Group>
				<Form.Control
					as="textarea"
					name="content"
					className={errors.content && 'is-invalid'}
					placeholder="Add answer"
					{...register('content', {required: true})}
				/>
				{errors.content && <p className={'invalid-feedback'}>This field is required</p>}
			</Form.Group>
			<Form.Group className="text-end mt-3">
				<Button onClick={() => {
					setShowForm(false)
					reset({content: ""})
				}} variant="secondary">Cancel</Button>
				<Button type="submit" variant="success">Post answer</Button>
			</Form.Group>
		</Form>
	);
};

export default CommentReplay;
