import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Button, Form} from "react-bootstrap";
import {saveUserGlobalSettings} from "@services/userAPI";
import {toast} from "react-toastify";
import {setUserInfo} from "@/actions/user";

const SwitchersOptionsComponents = () => {
	const dispatch = useDispatch();
	const {currentUser} = useSelector(state => state.user);
	const [isPublic, setIsPublic] = useState(false)
	const [isNotification, setIsNotification] = useState(false)
	const [fetch, setFetch] = useState(true)
	const form = new FormData();

	useEffect(() => {
		const effect = async () => {
			setIsPublic(currentUser.isPublic)
			setIsNotification(currentUser.isNotification)
		}

		effect().then(() => setFetch(false))
	}, [])

	const onSubmit = () => {
		form.append('isPublic', isPublic)
		form.append('isNotification', isNotification)

		saveUserGlobalSettings(form).then(res => {
			dispatch(setUserInfo(res))
			toast.success("Saved")
		}).catch(e => {
			toast.error(e.response.data.message)
		});
	}

	return (
		<>
			{!fetch && (
				<div>
					<Form>
						<Form.Group className="mt-3">
							<Form.Check inline type="checkbox">
								<Form.Check.Input id="userPublic" className="me-2 flex-shrink-0" onChange={e => setIsPublic(!isPublic)} checked={isPublic}/>
								<Form.Check.Label htmlFor="userPublic">Make my profile public to un-registered users</Form.Check.Label>
							</Form.Check>
						</Form.Group>
						<Form.Group className="mt-3">
							<Form.Check inline type="switch">
								<Form.Check.Input id="userIsNotification" className="me-2 flex-shrink-0" onChange={e => setIsNotification(!isNotification)} checked={isNotification}/>
								<Form.Check.Label htmlFor="userIsNotification">Toggle to turn on/off all email notifications</Form.Check.Label>
							</Form.Check>
						</Form.Group>
						<Form.Group className="mt-3">
							<Button onClick={onSubmit} variant="success">Save</Button>
						</Form.Group>
					</Form>
				</div>
			) }
		</>
	);
};

export default SwitchersOptionsComponents;
