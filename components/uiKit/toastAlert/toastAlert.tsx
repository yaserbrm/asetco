import { toast } from 'react-toastify'

export const ToastAlert = {
  success: (message: string) => {
    toast.success(message, {
      position: 'top-center',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  },
  error: (message: string) => {
    toast.error(message, {
      position: 'top-center',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      closeButton: false,
      icon: <span className="material-icons">close</span>,
    })
  },
  warning: (message: string) => {
    toast.warning(message, {
      position: 'top-center',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      icon: <span className="material-icons">priority_high</span>,
    })
  },
  info: (message: string) => {
    toast.info(message, {
      position: 'top-center',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      icon: <span className="material-icons">info_outline</span>,
    })
  },
}
