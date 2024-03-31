<template>
    <VTextarea label="biografia" variant="outlined" 
    hint="escreva um breve biografia sobre voce min 250 caracteres" 
    v-model="biografia" :rules="biografiavalidation" @input="$emit('biografia', biografia, valid)"></VTextarea>
</template>
<script setup>
import { ref, watch } from 'vue';


    const biografia = ref(null)
    const valid = ref(false)
    
    const biografiavalidation = [
        (value) => !!value || 'preencha o campo de biografia',
        (value) => (value.length >= 250 && value.length <= 1000) || 'sua biografia deve conter entre 250 a 1000 caracteres'
    ]

    watch(biografia, (biografia) =>{
        if(biografia && (biografia.length >= 250 && biografia.length <= 1000)){
            valid.value = true
        }
        else{
            valid.value = false
        }
    })

</script>