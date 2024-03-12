<script lang="ts" setup>
definePageMeta({
  middleware: 'guest'
})

const form = ref({
  email: '',
  password: ''
})

const {signIn, data} = useAuth()

async function handleForm() {
  try {
    console.log('xxx')
    const res = await signIn('credentials', form.value)
    console.log(res, data)
    // useRouter().push({
    //   name: 'index'
    // })
  } catch (error) {
    console.log(error)
  }
}

</script>

<template>
  <div>
    login

    <form @submit.prevent="handleForm">
      <input v-model="form.email" type="text" name="username" placeholder="username">
      <input v-model="form.password" type="password" name="password" placeholder="password">
      <button type="submit">Login</button>
    </form>
  </div>
</template>
<style>

</style>