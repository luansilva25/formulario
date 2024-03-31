import axios from "axios";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const Hobbies = defineStore('hobbies', () =>{
    
    const hobbies = ref(null)

    const mostrarhobbies = computed(() =>{ 
        if(hobbies.value !== null){
            return hobbies.value.map((hobby) => hobby.hobbies) 
        } 
    })

    async function pegarhobbies(){
        const response = await axios.get("https://backend-do-formulario.onrender.com/hobby/")

        if(response.status === 200){
            const data = response.data
            hobbies.value = data

            console.log(mostrarhobbies.value)
        }
    }

    return { pegarhobbies, mostrarhobbies }
    

})