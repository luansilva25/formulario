<template>
<div class="d-flex ga-2">
    
    <VTextField label="senha" v-model="senha" :rules="senhavalidation"
    :type="openeye ? 'text' : 'password'" :append-icon="openeye ? 'mdi-eye' : 'mdi-eye-off'" 
    @click:append="openeye = !openeye" @input="$emit('senha', senha, senhavalid)"  variant="outlined"></VTextField>
    
    <VTextField label="confirme sua senha" v-model="senhaconfirm" :rules="confirmsenhavalidation"
    :type="openeye ? 'text' : 'password'" @input="$emit('confirmsenha', senhaconfirm, confirmvalid)"  variant="outlined" ></VTextField>

</div>
</template>
<script setup>
import { ref, watch, } from 'vue';

    const senha = ref(null)
    const openeye = ref(false)
    const senhaconfirm = ref(null)
    const senhavalid = ref(false)
    const confirmvalid = ref(false)  

    const senhavalidation = ref([
        (value) => !!value || 'preencha o campo senha',
        (value) => (value.length >= 8  && value.length <= 25) || 'a senha precisa conter dentre 8 a 25 caracteres',
        (value) => value.match(/\d/) || 'a senha precisa conter numeros' ,
    ])

    const confirmsenhavalidation = [
        (value) => !!value || 'preecha o campo de confirmação',
        (value) => value === senha.value || 'as credencias estão incorretas'
    ]

    watch(senha, (senha) =>{
        if(senha && (senha.length >= 8 && senha.length <= 25 ) && senha.match(/\d/)){
            senhavalid.value = true
        }
        else{
            senhavalid.value = false
        }
    })

    watch(senhaconfirm, (confirm) =>{
        if(confirm && confirm === senha.value){
            confirmvalid.value = true
        }
        else{
            confirmvalid.value = false
        }
    })

</script>