import React, {useEffect, useState} from 'react';
import {toast} from "react-toastify";
import Loading from "@components/Loading";
import CommentItem from "@pages/ProductPage/components/comments/CommentItem";
import CommentAsk from "@pages/ProductPage/components/comments/CommentAsk";
import {socket} from "@services/socket";

const Comments = ({product, isMyProduct}) => {
	const [comments, setComments] = useState([])
	const [fetching, setFetching] = useState(true)

	useEffect(() => {
		try {
			const fetchComments = async () => {
				setComments(product.comments)
			}
			fetchComments()
			socket.on("vendor_post_question_to_vendor", fetchComments)
			socket.on("vendor_post_answer_to_vendor", fetchComments)
		} catch (e) {
			toast.error(e.response?.data?.message)
		}
		setFetching(false)
	}, [])

	return (
		<>
			{fetching ? (
				<Loading/>
			) : (
				<>
					{comments.length > 0 && (
						<h4 className="mb-4">Questions & Answers</h4>
					)}
					{!isMyProduct && (
						<CommentAsk product={product} setComments={setComments} />
					)}
					{comments.map(comment => {
						return (
							<CommentItem product={product} isMyProduct={isMyProduct} setComments={setComments} key={comment.id} comment={comment} />
						)
					})}
				</>
			)}
		</>
	);
};

export default Comments;
