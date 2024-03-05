import validation from './validation';
import { emptyError, incorrectError, errorClass, FixLater } from '../constants';

const addError = (el: HTMLInputElement, error: string) => {
  const errorElement: HTMLElement = document.getElementById(`error_${el.name}`) as HTMLElement;
  el.classList.add(errorClass);
  if (errorElement) {
    errorElement.classList.add('hide');
    errorElement.textContent = error;
  }
};

const removeError = (el: HTMLInputElement) => {
  const errorElement: HTMLElement = document.getElementById(`error_${el.name}`) as HTMLElement;
  el.classList.remove(errorClass);
  if (errorElement) {
    errorElement.classList.remove('hide');
    errorElement.textContent = '';
  }
};

export const validateField = (element: HTMLInputElement) => {
  const { value } = element;
  if (!value && !element.required) {
    return;
  }
  if (!value && element.required) {
    addError(element, emptyError);
    return;
  }
  const valid = validation(element.name, value);
  if (!valid) {
    addError(element, incorrectError);
  } else {
    removeError(element);
  }
};

export const submitForm = (form: HTMLElement) => {
  const inputs = form.querySelectorAll('input');

  const formData: FixLater = {};

  inputs.forEach((input) => {
    const element: HTMLInputElement = input;

    validateField(element);
    const isInvalid = element.classList.contains(errorClass);
    if (!isInvalid && element) {
      formData[element.name] = element.value;
    }
  });

  console.log(formData);
};
