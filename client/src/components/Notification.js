import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NotificationProvider = ({children}) => {
	return (
		<>
			{children}

			<ToastContainer
				position="bottom-right"
				autoClose={3000}
				hideProgressBar
				newestOnTop
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
		</>
	);
}

export default NotificationProvider;
