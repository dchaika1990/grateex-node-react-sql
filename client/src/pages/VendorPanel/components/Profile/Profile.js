import React from 'react';
import {useSelector} from "react-redux";
import ProfileInfo from "./ProfileInfo";
import ProfileEdit from "./ProfileEdit";

const Profile = () => {
    let user = useSelector(state => state.user.currentUser)
	const {isEditing} = useSelector(state => state.user)

    return (
		<>
			{isEditing ? (
				<ProfileEdit user={user}/>
			) : (
				<ProfileInfo user={user}/>
			)}
		</>
    );
};

export default Profile;
