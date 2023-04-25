import { Notify } from 'notiflix/build/notiflix-notify-aio';
const refs = {
  btnCreatePromices: document.querySelector('form>button'),
  delay: document.querySelector('input[name="delay"]'),
  step: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]'),
}
Notify.init({
  fontSize: '13px',
  clickToClose: true,
});


// console.log(refs);
refs.btnCreatePromices.addEventListener('click', onClick)

function onClick(event) {
  event.preventDefault();
  const stepValue = Number(refs.step.value);
  const delayValue = Number(refs.delay.value);
  const count = Number(refs.amount.value);
  // console.log("onClick body",count,delayValue,stepValue);
  if (stepValue < 0 || delayValue < 0 || count < 1) {
    Notify.warning('Please enter valid value');
    return;
  }
  runPromises(delayValue, stepValue, count)
  // event.currentTarget.closest('form').reset();
  // console.log(event.currentTarget.disabled);
  refs.btnCreatePromices.disabled = true;
  // console.log("Кнопка вимкнена на ", delayValue + stepValue*(count - 1));
  setTimeout(() => {
    refs.btnCreatePromices.disabled = false;
  }, delayValue + stepValue*(count - 1))
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

function runPromises(firstDeelay, delay, count){
  if (count > 0) {
    runPromises(firstDeelay, delay, count - 1)
    // console.log(count);
    createPromise(count, firstDeelay + delay*(count - 1))
      .then(({ position, delay }) => {
        Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
        // console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`Rejected promise ${position} in ${delay}ms`);
        // console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}