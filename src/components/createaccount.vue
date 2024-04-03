<template>
  <VCard
    width="750"
    class="d-flex justify-space-between align-center flex-column ga-2 pa-5"
  >
    <h1>criar conta</h1>
    <VForm class="w-100">
      <nome @username="nomeuser" />
      <email @emailuser="useremail" />
      <senha @senha="senhauser" @confirmsenha="userconfirmsenha" />
      <nascimento @data="nascimentousuario" />
      <endereco
        @estado="estadoselecionado"
        @endereco="addendereco"
        @cidade="addcidade"
      />
      <hobbies @hobby="hobbyselecionado" />
      <linguagens @linguagem="addlinguagem" />
      <biografia @biografia="addbiografia" />
    </VForm>
    <VCardActions>
      <VBtn class="bg-blue text-white" @click="criarconta">criar conta</VBtn>
      <VBtn class="text-blue" @click="emitir">ja possuo uma conta</VBtn>
    </VCardActions>
  </VCard>
</template>
<script setup>
import nome from "./createaccount-components/nome.vue";
import email from "./createaccount-components/email.vue";
import senha from "./createaccount-components/senha.vue";
import nascimento from "./createaccount-components/nascimento.vue";
import endereco from "./createaccount-components/endereco.vue";
import hobbies from "./createaccount-components/hobbies.vue";
import linguagens from "./createaccount-components/linguagens.vue";
import biografia from "./createaccount-components/biografia.vue";
import { ref } from "vue";
import { CreateUser } from "../api/criarconta";
const emit = defineEmits(["login"]);
const createuser = CreateUser()
const emaildousuario = ref(null);
const emailvalid = ref(false);
const nomedousuario = ref(null);
const nomevalid = ref(false);
const usersenha = ref(null);
const usersenhavalid = ref(false);
const confirmusersenha = ref(null);
const confirmsenhavalid = ref(false);
const datanascimento = ref(null);
const datavalid = ref(false);
const estadouser = ref(null);
const estadovalid = ref(false);
const enderecouser = ref(null);
const enderecovalid = ref(false);
const usercidade = ref(null);
const cidadevalid = ref(false);
const userhobby = ref(null);
const userhobbyvalid = ref(false);
const userlinguagem = ref(null);
const linguagemvalid = ref(false);
const userbiografia = ref(null);
const biografiavalid = ref(false);
function emitir() {
  emit("login");
}
function useremail(email, valid) {
  emaildousuario.value = email;
  emailvalid.value = valid;
}
function nomeuser(nome, valid) {
  nomedousuario.value = nome;
  nomevalid.value = valid;
}
function senhauser(senha, valid) {
  usersenha.value = senha;
  usersenhavalid.value = valid;
}
function userconfirmsenha(confirmsenha, valid) {
  confirmusersenha.value = confirmsenha;
  confirmsenhavalid.value = valid;
}
function nascimentousuario(data, valid) {
  datanascimento.value = data;
  datavalid.value = valid;
}
function estadoselecionado(estadoselected, valid) {
  estadouser.value = estadoselected;
  if (estadouser.value) {
    estadovalid.value = valid;
  }
}
function addendereco(endereco, valid) {
  enderecouser.value = endereco;
  enderecovalid.value = valid;
}
function addcidade(cidade, valid) {
  usercidade.value = cidade;
  cidadevalid.value = valid;
}
function hobbyselecionado(hobby, valid) {
  userhobby.value = hobby;
  if (userhobby.value.length > 0) {
    userhobbyvalid.value = true;
  } else {
    userhobbyvalid.value = false;
  }
}
function addlinguagem(linguagem) {
  userlinguagem.value = linguagem;
  if (userlinguagem.value.length > 0) {
    linguagemvalid.value = true;
  } else {
    linguagemvalid.value = false;
  }
}
function addbiografia(biografia, valid) {
  userbiografia.value = biografia;
  biografiavalid.value = valid;
}
async function criarconta() {
  if (emailvalid.value && nomevalid.value && usersenhavalid.value && confirmsenhavalid.value && datavalid.value &&  userhobbyvalid.value && enderecovalid.value && cidadevalid.value && biografiavalid.value && linguagemvalid.value) {
    const formuser = {
      nome: nomedousuario.value.toLowerCase(),
      email: emaildousuario.value,
      senha: usersenha.value,
      nascimento: datanascimento.value,
      endereco: enderecouser.value,
      cidade: usercidade.value,
      estado: estadouser.value,
      hobby: userhobby.value,
      linguagem: userlinguagem.value,
      biografia: userbiografia.value,
    };
    const create = createuser.addform(formuser)
    emit('login')
    console.log(formuser)
    console.log(create)
    
  }
}
</script>
