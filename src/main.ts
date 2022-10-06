import { getPatient, postPatient } from './assets/API/apiPatient';
import { $, showAlert, validate } from './assets/functions'
import { typeForm } from './assets/interface';
import './assets/style/tailwind.min.css'

// Variables
const $Form = $<HTMLFormElement>('#form');

$Form.addEventListener('submit', validateForm)
document.addEventListener('DOMContentLoaded', showPatient)

function validateForm(e: Event){
  e.preventDefault();

  const inputForm: typeForm = {
    pet: $<HTMLInputElement>('#pet').value,
    owner: $<HTMLInputElement>('#owner').value,
    email: $<HTMLInputElement>('#email').value,
    date: $<HTMLInputElement>('#pet').value,
    symptom: $<HTMLInputElement>('#symptom').value,
  }

  if(validate(inputForm)){
    showAlert()
  }else{
    postPatient(inputForm)
    $Form.reset();
  }
}

async function showPatient(){

  const formJson = await getPatient()
  
  formJson.forEach((obj: typeForm) => {
    const {date, email, owner, pet, symptom, id} = obj

    const row = document.createElement('section');
    row.classList.add('card', 'm-3', 'bg-white', 'shadow-md', 'px-5', 'py-10', 'rounded-md')
    row.innerHTML += `
      <p class='font-bold mb-3 text-gray-700 uppercase'>Name: <span class="font-normal normal-case">${pet}</span></p>
      <p class='font-bold mb-3 text-gray-700 uppercase'>Owner: <span class="font-normal normal-case">${owner}</span>
      </p>
      <p class='font-bold mb-3 text-gray-700 uppercase'>Email: <span
          class="font-normal normal-case">${email}</span></p>
      <p class='font-bold mb-3 text-gray-700 uppercase'>Date: <span class="font-normal normal-case">${date}</span></p>
      <p class='font-bold mb-3 text-gray-700 uppercase'>Symptom: <span class="font-normal normal-case">${symptom}</span></p>
      <div>
        <button data-patient="${id}" id="btnDelete" class="delete uppercase hover:bg-red-600 bg-red-500 text-white font-bold rounded py-2 px-2">Delete</button>
        <button id="btnAdd" class="uppercase px-5 hover:bg-blue-600 bg-blue-500 text-white font-bold rounded py-2">Add</button>
      </div>
    `
    $<HTMLSelectElement>('#cardPatient').appendChild(row)
  });
}