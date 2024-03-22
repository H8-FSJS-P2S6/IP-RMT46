import Toastify from 'toastify-js'

export default function showToast(message) {
    Toastify({
        text: message,
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
            background: "linear-gradient(90deg, rgba(169,1,7,1) 0%, rgba(150,9,14,1) 40%, rgba(31,0,12,1) 90%)",
        },
        onClick: function () { }
    }).showToast();
}