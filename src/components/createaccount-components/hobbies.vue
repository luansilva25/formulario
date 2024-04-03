<template>
    <VSelect label="hobbies" variant="outlined" 
    :items="hobbies" v-model="hobbyselecionado" 
    multiple chips :rules="hobbyvalidation" hide-selected closable-chips></VSelect>
</template>
<script setup>
import { Hobbies } from '../api/hobby';
import { computed, onMounted, ref, watch } from 'vue';
const hobbyselecionado = ref(null)
const store = Hobbies()
const emit = defineEmits(['hobby'])


function emitirhobby(){
    emit('hobby', hobbyselecionado.value)
}

watch(hobbyselecionado, () =>{
    emitirhobby()
})


const hobbyvalidation = [
    (value) => !!value || 'preencha o campo de hobbies'
]

const hobbies = computed(() =>{
    return store.mostrarhobbies
})



    onMounted( async () =>{
        await store.pegarhobbies()
        console.log(hobbies.value)
    })
</script>