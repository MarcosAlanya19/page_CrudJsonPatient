import { typeForm } from "./interface";

export const $ = < T = HTMLElement>(id: string) => {
  const element = document.querySelector(id);
  if(element) return element as T;
  throw new Error('Element not found')
}

export const showAlert = (  ) =>{
  const err = document.querySelector('.border-red-400')

  if (!err) {
    const alert = document.createElement('div')
    alert.classList.add('text-red-600', 'text-center', 'border-2', 'border-red-400', 'rounded', 'mt-4', 'py-2')
    alert.innerHTML = `
      <p><span class="font-bold">Error</span> All fields are required</p>
    `
    
    $<HTMLFormElement>('#form').appendChild(alert)
  
    setTimeout(() => {
      alert.remove();
    }, 3000);
  }
}

export const validate = (obj: typeForm) => {
  return !Object.values(obj).every(value => value !== '')
}