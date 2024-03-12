<script lang="ts" setup>
definePageMeta({
  middleware: 'auth'
})

const {data, signOut} = useAuth()
async function handleLogout() {
  await signOut()
}
</script>

<template>
  <div>
    <button type="button" @click="handleLogout">Logout</button>

    {{ data }}
  </div>
</template>
