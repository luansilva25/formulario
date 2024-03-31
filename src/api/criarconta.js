import axios from "axios";
import { defineStore } from "pinia";

export const CreateUser = defineStore("criarusuario", () => {
  async function addform(payload) {
    const response = await axios.post("https://backend-do-formulario.onrender.com/form/", payload).then((response) => {
        if (response.status === 200) {
          console.log("usuario enviado" + payload);
        }
      }).catch((err) =>{
        console.log(err)
      })
  }
  return { addform };
});
