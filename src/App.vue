<script setup lang="ts">
import { ref } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { SpringSpinner } from 'epic-spinners'
import { useToast } from '@/components/ui/toast/use-toast'

import { schema } from './lib/schema'
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Toaster from '@/components/ui/toast/Toaster.vue'
import DefinitionView from './components/layout/DefinitionView.vue'

import getWord from './lib/api'

const search: any = ref(null)
const isLoading = ref(false)
const formSchema = toTypedSchema(schema)
const { toast } = useToast()

const form = useForm({
  validationSchema: formSchema
})

const onSumbut = form.handleSubmit(async (data) => {
  try {
    isLoading.value = true
    const response = await getWord(data.search)

    search.value = response
  } catch (error: any) {
    toast({
      title: 'Uh oh! Something went wrong.',
      description: error.message,
      variant: 'destructive'
    })
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <Toaster />
  <main class="max-h-full w-full mx-6">
    <div class="container mx-auto h-full w-3/4">
      <h1 class="mb-5 mt-4 text-center text-4xl font-bold tracking-tight text-gray-700 lg:text-5xl">
        Dictionary App
      </h1>
      <p class="mb-7 text-center font-medium text-gray-700 lg:text-2xl">
        We can help you find the meaning of any word. Any word at all!
      </p>
    </div>

    <form @submit="onSumbut" class="flex justify-center content-center">
      <FormField v-slot="{ componentField }" name="search">
        <FormItem>
          <FormControl>
            <Input type="text" placeholder="Search a word..." v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <Button v-if="!isLoading" type="submit" class="ml-4">Search</Button>
      <div id="app" class="my-auto ml-3" v-else>
        <spring-spinner :animation-duration="1000" :size="30" :color="'#272E3F'" />
      </div>
    </form>

    <template v-if="search">
      <div class="mt-14 ">
        <h2 class="text-3xl font-bold text-gray-700">{{ search.wordName }}</h2>
        <h3 class="mt-2 pl-14 text-xl font-semibold text-yellow-600">{{ search.phonetic }}</h3>
      </div>

      <DefinitionView :data="search"
    /></template>
  </main>
</template>
