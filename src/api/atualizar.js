import axios from "axios";
import { defineStore } from "pinia";

export const atualizar = defineStore('atualizar', () =>{
    async function atualizarform(payload){
        const response = axios.patch(`https://backend-do-formulario.onrender.com/form/${payload.id}/`, payload).then((response) =>{
            if(response.status === 200){
                console.log('usuario atualizado com sucesso')
            }
        }).catch((err) =>{
            console.log(err)
        })
    }

    return { atualizarform }
})