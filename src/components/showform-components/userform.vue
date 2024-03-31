<template>
<div>
    <VCard v-for="data in userform" :key="data.id" width="600" class="pa-5">
        <h1 class="text-center">seu formulario</h1>
        <VCardTitle>seu nome: {{ data.nome }}</VCardTitle>
        <VCardTitle>email: {{ data.email }}</VCardTitle>
        <VCardTitle>seu nascimento: {{ data.nascimento }}</VCardTitle>
        <div class="d-flex">
          <VCardTitle>seu endereco: {{ data.endereco }}</VCardTitle>
          <VCardTitle>cidade: {{ data.cidade }}</VCardTitle>
          <VCardTitle>estado: {{ data.estado }}</VCardTitle>
        </div>
        <VCardTitle>Hobbies: <div class="d-flex"><VCardSubtitle v-for="hobby in data.hobby" :key="hobby"> {{ hobby }}</VCardSubtitle></div></VCardTitle>
        <VCardTitle>Linguagens da programação: <div class="d-flex"><VCardSubtitle v-for="linguagem in data.linguagem" :key="linguagem"> {{ linguagem }} </VCardSubtitle></div></VCardTitle>
        <VCardText><VCardTitle>Sua biografia: </VCardTitle>{{ data.biografia }}</VCardText>
        <VCardActions class="d-flex justify-center align-center ga-5">
          <VBtn class="bg-blue text-white" @click="emitir">editar</VBtn
          >
          <VBtn class="bg-red text-white" @click="deletar(data.id)">deletar</VBtn>
        </VCardActions>
      </VCard>
</div>
</template>
<script setup>
    import { computed } from "vue";
    import { Login } from "@/api/login";


const store = Login();

  function deletar(id){
    store.Logout(id)

    setTimeout(() => {
      location.reload()
    }, 2000);
  }

    const emit = defineEmits(['editar'])

    function emitir(){
        emit('editar')
    }

const userform = computed(() => {
  return store.userform;
});

</script>