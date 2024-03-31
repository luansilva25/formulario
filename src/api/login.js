import axios from "axios";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const Login = defineStore('login', () =>{
    const form = ref(null)
    const log = ref(false)

    const userform = computed(() =>{
        return form.value
    })

    const loginuser = computed(() =>{
        return log.value
    })

    async function Login(payload){
        try{
        const response = await axios.get(`https://backend-do-formulario.onrender.com/user-form/`, {params: {nome: payload}})

        if(response.status === 200){
            console.log('usuario encontrado')
            form.value = response.data
            log.value = true
        }
    }
    catch(err){
        console.log(err)
    }
    }

    async function Logout(id){
        const response = await axios.delete(`https://backend-do-formulario.onrender.com/form/${id}/`).then((response) =>{
            if(response.status === 200){
                console.log('formulario deletado')
                log.value = false
            }
        })
    }

    return { Login, Logout, userform, loginuser }
})