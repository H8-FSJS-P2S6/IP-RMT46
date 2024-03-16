import Toastify from 'toastify-js';

export default function showToast(message) {
  Toastify({
    text: message,
    duration: 3000,
    close: true,
    gravity: 'top',
    position: 'right',
    stopOnFocus: true,
    style: {
      background:
        'linear-gradient(90deg, rgba(237,113,148,1) 0%, rgba(217,8,73,1) 35%, rgba(93,4,6,1) 100%)',
      position: 'absolute',
      top: '10px',
      right: '10px',
      zIndex: '9999',
    },
    onClick: function () {},
  }).showToast();
}
