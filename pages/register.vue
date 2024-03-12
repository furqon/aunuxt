<script lang="ts" setup>
const form = ref({
  email: '',
  password: '',
  name: ''
})

const isLoading = ref(false)

async function handleSubmit() {
  try {
    isLoading.value = true
    await useFetch('/api/auth/register', {
      method: 'POST',
      body: form.value
    })

    useRouter().push({
      name: 'login'
    })
  } catch (error: any) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div>
    register

    <form @submit.prevent="handleSubmit">
      <input v-model="form.email" type="text" name="email" placeholder="email">
      <input v-model="form.password" type="password" name="password" placeholder="password">
      <input v-model="form.name" type="text" name="name" placeholder="name">
      <button type="submit" :disabled="isLoading">Register</button>
    </form>
  </div>
</template>


<style>

</style>