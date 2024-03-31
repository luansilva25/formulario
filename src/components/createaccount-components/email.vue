<template>
    <VTextField label="email"  variant="outlined" 
    v-model="email" :rules="emailvalidation"
    @input="$emit('emailuser', email, valid)"></VTextField>
</template>
<script setup>
import { ref, watch } from 'vue';

    const email = ref(null)
    const valid = ref(false)
    
    const emailvalidation = [
        (value) => !!value || 'preencha o campo de email',
        (value) => value.includes('@') || 'email invalido'
    ]

    watch(email, (email) =>{
        if(email && email.includes('@')){
            valid.value = true
        }
        else{
            valid.value = false
        }
    })
</script>