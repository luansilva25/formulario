import axios from "axios";
import { defineStore } from "pinia";
import { computed, ref }  from "vue";

export const Estados = defineStore('estados', () =>{
    const estados = ref(null)

    const mostrarestados = computed(() => { 
        if(estados.value !== null){
            return estados.value.map((estado) => estado.estado)
        }
    })

    async function pegarestados(){
        const response = await axios.get("https://backend-do-formulario.onrender.com/estado/")

        if(response.status === 200){
            estados.value = response.data
            console.log('estados pego')
            console.log(mostrarestados.value)
        }
    }

    return { pegarestados, mostrarestados }
})