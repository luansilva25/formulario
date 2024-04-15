<template>
    <VSelect label="linguagens da programação" variant="outlined" 
    :items="linguagensprogramacao" v-model="linguagemselecionada" :rules="linguagensvalidation" multiple chips hide-selected closable-chips></VSelect>
</template>
<script setup>
import { Linguagens } from '@/api/linguagem';
import { computed, onMounted, ref, watch } from 'vue';


const store = Linguagens()

const linguagemselecionada = ref(null)


const emit = defineEmits(['linguagem'])


function emitirlinguagem(){
    emit('linguagem', linguagemselecionada.value )
}



const linguagensvalidation = [
    (value) => !!value || 'preencha o campo linguagens da programação'
]
 
const linguagensprogramacao = computed(() =>{
    return store.mostrarlinguagens
})

watch(linguagemselecionada , () =>{
    emitirlinguagem()
})

onMounted( async () =>{
    await store.pegarlinguagens()
    console.log(linguagensprogramacao.value)
})
</script>