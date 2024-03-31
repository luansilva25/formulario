<template>
    <div>
      <VCard v-for="data in userform" :key="data.id" width="600" class="pa-5">
        <h1 class="text-center">formulario de edição</h1>
        <VTextField label="nome" v-model="data.nome" disabled></VTextField>
        <VTextField label="email" v-model="data.email" @input="emailverification(data.email)" :rules="emailvalidation"></VTextField>
      <div class="d-flex justify-center align-center ga-5">
        <VTextField label="senha" v-model="data.senha" @input="senhaverification(data.senha)" :rules="senhavalidation"></VTextField>
        <VTextField label="confirmação de senha" v-model="confirm" @input="confirmverification(data.senha)" :rules="confirmvalidation"></VTextField>
      </div>
      <VTextField label="nascimento" type="data" v-model="data.nascimento" disabled></VTextField>
      <div class="d-flex justify-center align-center ga-5">
        <VTextField label="endereco" v-model="data.endereco" @input="enderecoverification(data.endereco)" :rules="enderecovalidation"></VTextField>
        <VTextField label="cidade" v-model="data.cidade" @input="cidadeverification(data.cidade)" :rules="cidadevalidation"></VTextField>
        <VSelect label="estados" v-model="data.estado" :items="estado"></VSelect>
      </div>
      <VSelect label="hobbies" :items="hobby" @click="hobbyverification(data.hobby)" v-model="data.hobby" chips multiple hide-selected closable-chips :rules="hobbyvalidation"></VSelect>
      <VSelect label="linguagens da programação" :items="linguagens" v-model="data.linguagem" chips multiple hide-selected closable-chips :rules="linguagemvalidation"></VSelect>
      <VTextarea label="biografia" v-model="data.biografia" @input="biografiaverification(data.biografia)" :rules="biografiavalidation"></VTextarea>
        <VCardActions class="d-flex justify-center align-center ga-5">
          <VBtn class="bg-blue text-white" @click="salvar(data.id, data.email, data.senha, data.endereco, data.cidade, data.estado, data.hobby, data.linguagem, data.biografia )">salvar</VBtn>
          <VBtn class="bg-red text-white" @click="voltar">voltar</VBtn>
        </VCardActions>
      </VCard>
    </div>
</template>
<script setup>
import { atualizar } from '@/api/atualizar';
import { Estados } from '@/api/estados';
import { Hobbies } from '@/api/hobby';
import { Linguagens } from '@/api/linguagem';
import { Login } from '@/api/login'
import { computed, onMounted, ref,} from 'vue';

const store = Login();
const estados = Estados()
const hobbies = Hobbies()
const linguagem = Linguagens()
const atualizarform = atualizar()
const emit = defineEmits(['voltar'])

function voltar(){
  emit('voltar')
}

const userform = computed(() => {
  return store.userform;
});

const estado = computed(() =>{
  return estados.mostrarestados
})

const hobby = computed(() =>{
  return hobbies.mostrarhobbies
})

const linguagens = computed(() =>{
  return linguagem.mostrarlinguagens
})

const confirm = ref(null)
const emailvalid = ref(true)
const senhavalid = ref(true)
const confirmvalid = ref(false)
const enderecovalid = ref(true)
const cidadevalid = ref(true)
const biografiavalid = ref(true)
const emailvalidation = [
   (value) => !!value || 'preencha o campo email',
   (value) => value.includes('@') || 'email invalido'
]
const senhavalidation = [
  (value) => !!value || 'preencha o campo senha',
  (value) => (value.length >= 8 && value.length <= 25) || 'a senha deve conter dentre 8 a 25 caracteres',
  (value) => value.match(/\d/) || 'a senha deve conter numeros',
  (value) => confirm.value === value || 'as senhas não são equivalentes'
]
const confirmvalidation = [
  (value) => !!value || 'preencha o campo de confirmação'
]
const enderecovalidation = [
  (value) => !!value || 'preencha o campo de endereco'
]
const cidadevalidation = [
  (value) => !!value || 'preencha o campo de endereco'
]
const hobbyvalidation = [
  (value) => value.length > 0 || 'preenhca o campo de hobbies'
]
const linguagemvalidation = [
  (value) => value.length > 0 || 'preenhca o campo de linguagens'
]
const biografiavalidation = [
  (value) => !!value || 'preencha o campo de biografia',
  (value) => (value.length >= 250 && value.length <= 1000) || 'o campo precisa de no minimo 250 caracteres e no maximo 1000 caracteres'
]

function emailverification(email){
  if(email && email.includes('@')){
    emailvalid.value = true
  }
  else{
    emailvalid.value = false
  }
}
function senhaverification(senha){
  if(senha && (senha.length >= 8 && senha.length <= 25) && senha.match(/\d/) && senha === confirm.value){
    senhavalid.value = true
  }
  else{
    senhavalid.value = false
  }
}
function confirmverification(senha){
  if(confirm.value && confirm.value === senha){
      confirmvalid.value = true
  }
  else{
    confirmvalid.value = false
  }
}
function enderecoverification(endereco){
  if(endereco){
    enderecovalid.value = true
  }
  else{
    enderecovalid.value = false
  }
}
function cidadeverification(cidade){
  if(cidade){
    cidadevalid.value = true
  }
  else{
    cidadevalid.value = false
  }
}
function biografiaverification(biografia){
  if(biografia && (biografia.length >= 250 && biografia.length <= 1000)){
      biografiavalid.value = true
  }
  else{ 
    biografiavalid.value = false
  }
}

function salvar(id, email, senha, endereco, cidade, estado, hobby, linguagem, biografia){
  if(emailvalid.value && senhavalid.value && enderecovalid.value && cidadevalid.value && biografiavalid.value && confirmvalid.value && hobby.length > 0 && linguagem.length > 0){
    const user = {
      id: id,
      email: email,
      senha: senha,
      endereco: endereco,
      cidade: cidade,
      estado: estado,
      hobby: hobby,
      linguagem: linguagem,
      biografia: biografia
    }
    atualizarform.atualizarform(user)
    emit('voltar')
    console.log(user)
  }
  console.log(emailvalid.value, senhavalid.value, enderecovalid.value, cidadevalid.value, biografiavalid.value, confirmvalid.value)
}


onMounted(() =>{
    estados.pegarestados()
    hobbies.pegarhobbies()
    linguagem.pegarlinguagens()
})
</script>