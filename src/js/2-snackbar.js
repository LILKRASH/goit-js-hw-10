import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector("form");
const inputDelay = document.querySelector(".input-delay");
const inputState = document.querySelector(".input-radio");

form.addEventListener("submit", handlePromise);

function handlePromise(event) {
    event.preventDefault();

    const delay = parseInt(inputDelay.value, 10);
    
    const promise = new Promise((resolve, reject) => {

        setTimeout(() => {

            if (inputState.checked && inputState.value === "fulfilled") {
                resolve(delay);
            }
            else {
                reject(delay);
            }
        }, delay);
    });
    
promise
    .then((result) => {
        iziToast.success({
            title: 'OK',
            message:`✅ Fulfilled promise in ${result}ms`,
        });
    })
    
    .catch((error) => {
        iziToast.error({
            title: 'Error',
            message: `❌ Rejected promise in ${error}ms`,
        });
    });

}
