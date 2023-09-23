<template>
  <router-view />
  <AlarmList />
</template>

<script>
import AlarmList from '@/views/dialog/alarm/AlarmList.vue';

export default {
  name: 'App',
  components: {
    AlarmList,
  },
};
</script>
<style>
/* 전역 css */
@import './assets/css/global.css';

/* 폰트 */
.v-application {
  font-family: 'omu_daippum';
  font-size: 18px;
}

@font-face {
  font-family: 'omu_daippum';
  src: url('assets/fonts/omu_daippum.ttf') format('truetype');
  font-weight: 400;
}
</style>
