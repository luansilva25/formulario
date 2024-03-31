<template>
  <div>
    <userform v-if="!edit" @editar="edit = !edit" />
    <editform v-else @voltar="edit = !edit"/>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import editform from './showform-components/editform.vue'
import userform from './showform-components/userform.vue'

const edit = ref(false)
</script>