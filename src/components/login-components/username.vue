<template>
    <VTextField label="username"  variant="outlined" v-model.trim="nome" 
    :rules="nomevalidation" @input="$emit('username', nome, nomevalid)"></VTextField>
</template>
<script setup>
import {ref, watch } from 'vue'
    
const nome = ref(null)
const nomevalid = ref(false)
    
    const nomevalidation = [
        (value) => !!value || 'por favor preencha o campo', 
    ]

    watch(nome, (nome) =>{
        if(nome){
            nomevalid.value = true

        }
        else{
            nomevalid.value = false
        }
    })

</script>