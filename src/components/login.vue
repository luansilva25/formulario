<template>
        <VCard width="650" class="pa-5 d-flex flex-column justify-space-between ga-2 align-center">
            <h1>login</h1>
            <div v-if="msg" class="bg-red-lighten-2 text-black w-75 d-flex justify-center pa-3 border-dotted" >{{ msg }}</div>
            <VForm class="w-100">
                <username @username="addname" :valid="namevalid" :msg="namemsg"/>
                <senha @senha="addsenha" :valid="senhavalid" :msg="msgsenha"/>
            <VCardActions >
                <VBtn class="bg-blue text-white" @click="login">login</VBtn>
                <VBtn class="text-blue" @click="emitir">não possuo conta</VBtn>
            </VCardActions>
            </VForm>
        </VCard>
</template>
<script setup>
import { ref, watch  } from 'vue';
import senha from './login-components/senha.vue';
import username from './login-components/username.vue';
import { Login } from '../api/login';
import axios from 'axios';

    const emit = defineEmits(['criar'])
    const name = ref(null)
    const namevalid = ref(true)
    const usersenha = ref(null)
    const senhavalid = ref(true)
    const finduser = ref(null)
    const msg = ref(null)
    const store = Login()
    
    function emitir(){
        emit('criar')
    }
    
    function addname(nome, valid){
        name.value = nome.toLowerCase()
        namevalid.value = valid
    }

    function addsenha(password, valid){
        usersenha.value = password
        senhavalid.value = valid
    }
    
    function login(){
        if(senhavalid.value && namevalid.value && finduser.value.senha === usersenha.value){
           store.Login(name.value)
        }
        else{
            msg.value = 'usuario ou senha invalidos'

            setTimeout(() =>{
                msg.value = null  
            }, 3000)
        }
    }

    watch(name, (nome) =>{
        const response = axios.get("https://backend-do-formulario.onrender.com/form/").then((response) =>{
            if(response.status === 200){
                const data = response.data
                finduser.value = data.find(user => user.nome === nome)
                console.log(finduser.value)
            }
        }).catch((err) =>{
            console.log(err)
        })
    })
    watch(usersenha, (senha) =>{
        console.log(senha === finduser.value.senha)
    })
</script>
