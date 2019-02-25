import { toast } from 'react-toastify';

const notifyError = message => {
	toast.error(message);
}

const notifySuccess = message => {
	toast.success(`${message}`);
}

export {
	notifyError, notifySuccess
}