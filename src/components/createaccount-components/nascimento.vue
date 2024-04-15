<template>
  <VTextField
    type="date"
    variant="outlined"
    v-model="nascimento"
    label="data de nascimento"
    :rules="nascimentovalidation"
    @input="$emit('data', nascimento, valid)"
  ></VTextField>
</template>
<script setup>
import { ref, watch } from "vue";
const nascimento = ref(null);
const valid = ref(false)

let data = new Date()
let ano = data.getFullYear()

const nascimentovalidation = [
  (value) => !!value || 'preencha esse campo',
  (value) => new Date(value) < data  || 'data invalida',
  (value) => (ano - new Date(value).getFullYear() >= 1 && ano - new Date(value).getFullYear() <= 110) || 'para preencher esse formulario voce deve estar vivo (obrigatório)'
]

watch(nascimento, (nascimento) =>{
  if(nascimento && new Date(nascimento) < data && (ano - new Date(nascimento).getFullYear() >= 1 && ano - new Date(nascimento).getFullYear <= 110)){
      valid.value = true
  }
  else{
    valid.value = false
  }
})
</script>