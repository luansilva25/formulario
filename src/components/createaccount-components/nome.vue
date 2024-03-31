<template>
    <VTextField label="nome" variant="outlined" v-model.trim="nome" :rules="nomevalidation"
    @input="$emit('username', nome, valid)" required></VTextField>
</template>
<script setup>
import axios from 'axios';
import { ref, watch } from 'vue';

    const nome = ref(null)
    const valid = ref(false)
    const finduser = ref(null)
    
    const nomevalidation = [
        (value) => !!value || 'preencha o campo nome',
        (value) => value.length >= 3 || 'seu nome precisa de ter no minimo 3 caracteres',
        () => !finduser.value || 'este usuario já existe'
   ]    

   watch(nome, async (nome) =>{
        try{
        const response = await axios.get("https://backend-do-formulario.onrender.com/form/")
        
        if(response.status === 200){
            const data = response.data
            finduser.value = data.find(user => user.nome === nome)
            console.log(finduser.value)
        } 
    }
    catch(err){
        console.log(err)
    }       

        if(nome && nome.length >= 3 && !finduser.value){
            valid.value = true
        }
        else{
            valid.value = false
        }
   })

   


</script>