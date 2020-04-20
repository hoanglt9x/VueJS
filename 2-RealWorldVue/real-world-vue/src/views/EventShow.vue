<template>
<div>
<h1>Chi tiết sự kiện</h1>
  <p>Hiển thị sự kiện thứ {{id}}</p>
</div>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
    },
  },
}
</script>

<style>

</style>