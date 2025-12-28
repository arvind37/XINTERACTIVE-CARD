// ===== SELECT INPUTS =====
const form = document.querySelector('.form-body');

const nameInput = document.getElementById('cardName');
const numberInput = document.getElementById('cardNumber');
const monthInput = document.querySelector('.month-input');
const yearInput = document.querySelector('.year-input');
const cvcInput = document.querySelector('.cvc-input');

// ===== OUTPUT TEXT ON CARD =====
const nameOutput = document.querySelector('.name-output');
const numberOutput = document.querySelector('.number-output');
const monthOutput = document.querySelector('.month-output');
const yearOutput = document.querySelector('.year-output');
const cvcOutput = document.querySelector('.cvc-output');

// ===== ERROR HELPERS =====
function show(el) {
  el.classList.remove('dn');
}
function hide(el) {
  el.classList.add('dn');
}

// ===== NAME VALIDATION =====
nameInput.addEventListener('input', () => {
  const emptyErr = nameInput.nextElementSibling;
  const invalidErr = emptyErr.nextElementSibling;

  nameOutput.textContent = nameInput.value || 'John Doe';

  if (/\d/.test(nameInput.value)) {
    show(invalidErr);
  } else {
    hide(invalidErr);
  }

  hide(emptyErr);
});

// ===== CARD NUMBER =====
numberInput.addEventListener('input', () => {
  const emptyErr = numberInput.nextElementSibling;
  const invalidErr = emptyErr.nextElementSibling;

  // allow typing anything, just format numbers
  let value = numberInput.value.replace(/\s/g, '');
  let formatted = value.match(/.{1,4}/g)?.join(' ') || '';

  numberInput.value = formatted;
  numberOutput.textContent = formatted || '1234 5678 9012 3456';

  if (/[^0-9\s]/.test(numberInput.value)) {
    show(invalidErr);
  } else {
    hide(invalidErr);
  }

  hide(emptyErr);
});

// ===== MONTH =====
monthInput.addEventListener('input', () => {
  const emptyErr = monthInput.parentElement.querySelector('.empty');
  const invalidErr = monthInput.parentElement.querySelector('.invalid');

  monthOutput.textContent = monthInput.value || '00';

  if (/[^0-9]/.test(monthInput.value)) {
    show(invalidErr);
  } else {
    hide(invalidErr);
  }

  hide(emptyErr);
});

// ===== YEAR =====
yearInput.addEventListener('input', () => {
  const emptyErr = yearInput.parentElement.querySelector('.empty');
  const invalidErr = yearInput.parentElement.querySelector('.invalid');

  yearOutput.textContent = yearInput.value || '00';

  if (/[^0-9]/.test(yearInput.value)) {
    show(invalidErr);
  } else {
    hide(invalidErr);
  }

  hide(emptyErr);
});

// ===== CVC =====
cvcInput.addEventListener('input', () => {
  const emptyErr = cvcInput.nextElementSibling;
  const invalidErr = emptyErr.nextElementSibling;

  cvcOutput.textContent = cvcInput.value || '000';

  if (/[^0-9]/.test(cvcInput.value)) {
    show(invalidErr);
  } else {
    hide(invalidErr);
  }

  hide(emptyErr);
});

// ===== FORM SUBMIT =====
form.addEventListener('submit', (e) => {
  e.preventDefault();

  let valid = true;

  const fields = [
    { input: nameInput, test: /[^a-zA-Z\s]/ },
    { input: numberInput, test: /[^0-9\s]/ },
    { input: monthInput, test: /[^0-9]/ },
    { input: yearInput, test: /[^0-9]/ },
    { input: cvcInput, test: /[^0-9]/ }
  ];

  fields.forEach(({ input, test }) => {
    const emptyErr = input.parentElement.querySelector('.empty') || input.nextElementSibling;
    const invalidErr = input.parentElement.querySelector('.invalid') || emptyErr.nextElementSibling;

    if (!input.value.trim()) {
      show(emptyErr);
      valid = false;
    } else if (test.test(input.value)) {
      show(invalidErr);
      valid = false;
    }
  });

  if (valid) {
    document.querySelector('.main-confirm').classList.remove('hide');
    form.classList.add('hide');
  }
});
