<script setup lang="ts">
const props = defineProps(['data'])
</script>

<template>
  <template v-for="meaning in props.data.meanings" :key="meaning">
    <div class="mt-8">
      <h2>{{ meaning.partOfSpeech }}</h2>
      <div class="mt-2 inline">
        <h4 class="inline font-normal text-yellow-600">Definitions(s):</h4>
        <template v-for="(definition, index) in meaning.definitions" :key="index">
          <p :class="index === 0 ? 'inline-block' : 'block'">{{ definition.definition }}</p>
          <p class="mt-1 pl-10 italic text-yellow-600">{{ definition.example }}</p>
        </template>
      </div>
      <template v-if="meaning.synonyms.length > 0">
        <div class="mt-2 flex flex-wrap">
          <span class="mr-1"> <h4 class="font-normal text-yellow-600">Synonyms:</h4> </span>
          <template v-for="synonym in meaning.synonyms" :key="synonym">
            <p class="mr-2">{{ synonym }}</p>
          </template>
        </div>
      </template>
      <template v-if="meaning.antonyms.length > 0">
        <div class="mt-2 flex flex-wrap">
          <span class="mr-1"> <h4 class="font-normal text-yellow-600">Antonyms:</h4> </span>
          <template v-for="antonym in meaning.antonyms" :key="antonym">
            <p class="mr-2">{{ antonym }}</p>
          </template>
        </div>
      </template>
    </div>
  </template>
</template>
