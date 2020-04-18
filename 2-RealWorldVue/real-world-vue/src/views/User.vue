<template>
  <div class="user">
      <h1>Đây là trang cho người dùng {{$route.params.username}}</h1>

      <!-- Sử dụng Props để lấy params từ route -->
      <h2>{{username}}</h2>
  </div>
</template>

<script>
export default {
  props: {
    username: {
      type: String,
    
    },
  },
}
</script>

<style>

</style>