<template>
    <div class="d-flex ga-2">
        <VTextField label="endereço"  variant="outlined" v-model="endereco" :rules="enderecovalidation" @input="$emit('endereco', endereco, enderecovalid)"></VTextField>
        
        <VTextField label="cidade"  variant="outlined" v-model="cidade" :rules="cidadevalidation" @input="$emit('cidade', cidade, cidadevalid)"></VTextField>
        
        <VSelect label="estado" variant="outlined" @click="estadovalid = !estadovalid" :items="estados" v-model="estadoselecionado" :rules="estadovalidation"></VSelect>
    </div>
</template>
<script setup>
import { computed, onMounted, ref, watch} from 'vue';
import { Estados } from '@/api/estados';

const store = Estados()

const estadoselecionado = ref(null)
const estadovalid = ref(false)

const endereco = ref(null)
const enderecovalid = ref(false)

const cidade = ref(null)
const cidadevalid = ref(false)

const emit = defineEmits(['estado'])


const estados = computed(() =>{
    return store.mostrarestados
})

function emitirestado(){
    emit('estado', estadoselecionado.value, estadovalid.value)
}

    const estadovalidation = [
        (value) => !!value || 'preencha o campo de estado',
    ]
    const cidadevalidation = [
        (value) => !!value || 'preencha o campo de cidade'
    ]
    const enderecovalidation = [
        (value) => !!value || 'preencha o campo de endereco'
    ]

    watch(estadoselecionado , (estado) =>{
        emitirestado()

        if(estado){
            estadovalid.value = true
        }
        else{
            estadovalid.value = false
        }
    })

    watch(endereco, (endereco) =>{
        if(endereco){
            enderecovalid.value = true
        }
        else{
            enderecovalid.value = false
        }
    })
    watch(cidade, (cidade) =>{
        if(cidade){
            cidadevalid.value = true
        }
        else{
            cidadevalid.value = false
        }
    })


    onMounted(() =>{
       store.pegarestados()
       console.log(estados.value)
    })
</script>