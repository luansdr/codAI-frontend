import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const showToast = (message, type, time = 5000) => {
  toast(message, {
    position: "bottom-left",
    autoClose: time,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    pauseOnFocusLoss: false,
    draggable: false,
    progress: undefined,
    type: type,
    theme: "dark",
  });
};

export default showToast;
