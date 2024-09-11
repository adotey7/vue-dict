import axios from 'axios'


axios.defaults.baseURL = 'https://api.dictionaryapi.dev/api/v2/entries/en/'

const getWord = async (word: String) => {
  try {
    const response = await axios.get(`${word}`)

    const data = response.data[0]
    const wordName = data.word
    const phonetic = data.phonetic ?? ''
    const meanings = data.meanings.map((meaning: any) => {
      return {
        partOfSpeech: meaning.partOfSpeech,
        definitions: meaning.definitions.map((definition: any) => {
          return {
            definition: definition.definition,
            example: definition.example ?? ''
          }
        }),
        synonyms: meaning.synonyms,
        antonyms: meaning.antonyms
      }
    })

    return { wordName, phonetic, meanings }
  } catch (error: any) {
    
    if (error.response) {
      const { message } = error.response.data
      throw new Error(message)
    } else if (error.request) {
      throw new Error('No response received from the API')
    } else {
      throw new Error('An unexpected error occurred')
    }
  }
}

export default getWord
