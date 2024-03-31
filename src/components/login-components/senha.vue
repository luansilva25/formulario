<template>
    <VTextField label="senha" v-model="senha" :rules="senhavalidation"
    :type="openeye ? 'text' : 'password'" :append-icon="openeye ? 'mdi-eye' : 'mdi-eye-off'" 
    @click:append="openeye = !openeye" @input="$emit('senha', senha, senhavalid)"  variant="outlined"></VTextField>
</template>
<script setup>
import { ref, watch } from 'vue';

    const senha = ref(null)
    const openeye = ref(false)
    const senhavalid = ref(false)

    const senhavalidation = [
        (value) => !!value || 'insira sua senha',
    ]

    watch(senha, (senha) =>{
        if(senha){
            senhavalid.value = true
        }
        else{
            senhavalid.value = false
        }
    })

</script>