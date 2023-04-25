import { Notify } from 'notiflix/build/notiflix-notify-aio';
const refs = {
  btnCreatePromices: document.querySelector('form>button'),
  delay: document.querySelector('input[name="delay"]'),
  step: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]'),
}

let count = 0;
let countId = null;

// console.log(refs);
refs.btnCreatePromices.addEventListener('click', onClick)

function onClick(event) {
  event.preventDefault();
  const stepValue = refs.step.value;
  const delayValue = refs.delay.value;
  count = Number(refs.amount.value);
  // console.log("onClick body",count,delayValue,stepValue);

  countId = setInterval(() => {
    // console.log("Interval body");
    createPromise(count, delayValue)
      .then(({ position, delay }) => {
        Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
        // console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`Rejected promise ${position} in ${delay}ms`);
        // console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });

    count -= 1;
    if (count < 0){
      clearInterval(countId);
      // console.log(countId);
    }
  }, stepValue)
  event.currentTarget.closest('form').reset();
}

function createPromise(position, delay) {
  // const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    // console.log(`Fetching data for ${username}`);
    // isBusy = true;
    setTimeout(() => {
      // Change value of isSuccess variable to simulate request status
      const shouldResolve = Math.random() > 0.3;

      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
