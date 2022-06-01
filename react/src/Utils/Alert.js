/** @format */

import Swal from "sweetalert2";
const Alert = {
  success: (message = "", time = 1200) => {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: message,
      showConfirmButton: false,
      timer: time,
      backdrop: false,
    });
  },
  error: (message = "", time = 1500) => {
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: message,
      showConfirmButton: false,
      timer: time,
      backdrop: false,
    });
  },
  warning: (message = "", time = 1500) => {
    Swal.fire({
      position: "top-end",
      icon: "warning",
      title: message,
      showConfirmButton: false,
      timer: time,
      backdrop: false,
    });
  },
  info: (message = "", time = 1500) => {
    Swal.fire({
      position: "top-end",
      icon: "info",
      title: message,
      showConfirmButton: false,
      timer: time,
      backdrop: false,
    });
  },
  question: (message = "", time = 1500) => {
    Swal.fire({
      position: "top-end",
      icon: "question",
      title: message,
      showConfirmButton: false,
      timer: time,
      backdrop: false,
    });
  },
};

export default Alert;
