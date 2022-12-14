import { deletePatient, getIdPatient, getPatient, postPatient } from './assets/API/apiPatient';
import { $, showAlert, validate } from './assets/functions'
import { typeForm } from './assets/interface';
import './assets/style/tailwind.min.css'

// Variables
const $Form = $<HTMLFormElement>('#form');

$Form.addEventListener('submit', validateForm)
document.addEventListener('DOMContentLoaded', showPatient)
document.addEventListener('DOMContentLoaded', showPatient)
$<HTMLSelectElement>('#cardPatient').addEventListener('click', deleteCard)
$<HTMLSelectElement>('#cardPatient').addEventListener('click', changeCard)

type EventElement = Event & HTMLElement & {
  target: HTMLElement
};

// POST PATIENT
async function validateForm(e: Event) {
  e.preventDefault();
    const inputForm: typeForm = {
      pet: $<HTMLInputElement>('#pet').value,
      owner: $<HTMLInputElement>('#owner').value,
      email: $<HTMLInputElement>('#email').value,
      date: $<HTMLInputElement>('#date').value,
      symptom: $<HTMLInputElement>('#symptom').value,
    }
  
    if (validate(inputForm)) {
      showAlert()
    } else {
      await postPatient(inputForm)
      $Form.reset();
      await showPatient();
    }
}


// GET PATIENT
async function showPatient() {

  const formJson = await getPatient()
  console.log(formJson);

  $<HTMLSelectElement>('#cardPatient').innerHTML = "";
  formJson.forEach((obj: typeForm) => {

    const { date, email, owner, pet, symptom, id } = obj

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
        <button data-patient="${id}" id="btnChange" class="change uppercase px-5 hover:bg-blue-600 bg-blue-500 text-white font-bold rounded py-2">Change</button>
      </div>
    `
    $<HTMLSelectElement>('#cardPatient').appendChild(row)
  });
}

// DELETE PATIENT
async function deleteCard(e: Event) {
  const event = e as EventElement;
  
  if(event.target.classList.contains('delete')){
    const dataId = parseInt(event.target.dataset.patient!)
    const confirmed = confirm(`Are you sure you want to delete this patient?`);
    if (confirmed) {
      await deletePatient(dataId)
      await showPatient()
    }
  }
}

// PUT PATIENT
async function changeCard (e: Event){
  const event = e as EventElement;

  const petInput = $<HTMLInputElement>('#pet')
  const ownerInput = $<HTMLInputElement>('#owner')
  const emailInput = $<HTMLInputElement>('#email')
  const dateInput = $<HTMLInputElement>('#date')
  const symptomInput = $<HTMLInputElement>('#symptom')
  
  if(event.target.classList.contains('change')){
    const dataId = parseInt(event.target.dataset.patient!)
    const cardValue: typeForm = await getIdPatient(dataId)
    changeObj(cardValue)
  }

  
  function changeObj(obj: typeForm){
    const {date, email, owner, pet, symptom} = obj
    petInput.value = pet
    ownerInput.value = owner
    emailInput.value = email
    dateInput.value = date
    symptomInput.value = symptom

    $<HTMLButtonElement>('#btnForm').value = 'Change patient'
  }
}



