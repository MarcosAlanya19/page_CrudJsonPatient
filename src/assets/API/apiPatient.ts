import { typeForm } from "../interface";

const url = 'http://localhost:4000/patient';

export const postPatient = async (obj: typeForm) =>{
  try {
    await fetch(url, {
      method: 'POST',
      body: JSON.stringify(obj),
      headers:{
        'Content-Type': 'application/json',
      }
    })
  } catch (err) {
    console.error(err);  
  }
}

export const getPatient = async () =>{
  try {
    const result = await fetch(url)
    const patient = await result.json();
    return patient;
  } catch (err) {
    console.error(err);
  }
}

export const deletePatient = async (id: number) => {
  try {
    await fetch(`${url}/${id}`,{
      method: 'DELETE',
    })
  } catch (err) {
    console.error(err);
  }
}