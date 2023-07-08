<template>
  <div>
    <h2>测试axios二次封装</h2>
    <svg-icon width="32px" height="32px" color="red" name="home"></svg-icon>
  </div>
</template>

<script setup lang="ts">
import request from '@/utils/request'
import { onMounted } from 'vue'

onMounted(() => {
  request({
    url: '/user/login',
    method: 'POST',
    data: {
      username: 'admin',
      password: '111111',
    },
  }).then((res) => {
    console.log(res)
  })
})
</script>
<style scoped lang="scss">
h2 {
  color: $color;
}
</style>
