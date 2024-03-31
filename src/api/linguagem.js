import axios from "axios";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const Linguagens = defineStore('linguagens', () =>{
    
    const linguagens = ref(null)

    const mostrarlinguagens = computed(() =>{
        if(linguagens.value !== null){
            return linguagens.value.map((linguagens) => linguagens.linguagens)
        }
    })

    async function pegarlinguagens(){
        const response = await axios.get("https://backend-do-formulario.onrender.com/linguagens/")

        if(response.status === 200){
            const data = response.data

            linguagens.value = data

            console.log(mostrarlinguagens.value)
        }
    }

    return { pegarlinguagens, mostrarlinguagens }
})