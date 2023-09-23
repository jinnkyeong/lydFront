<template>
  <v-container>
    <v-row>
      <v-spacer />
      <v-col cols="12" md="8">
        <v-row style="height: 200px"></v-row>
        <v-row justify="center">
          <div class="title-regular ma-16">의뢰서 제출이 완료 되었습니다</div>
        </v-row>
        <v-row justify="center">
          <div>바로 도그워커를 찾으러 가시겠습니까?</div>
        </v-row>
        <v-row style="height: 100px"></v-row>
        <v-row>
          <v-spacer />
          <v-col cols="12" md="3">
            <v-btn block size="large" color="primary" @click="clickSeachDw">
              <span>도그워커 찾기</span>
            </v-btn>
          </v-col>
          <v-spacer />
          <v-col cols="12" md="3">
            <v-btn block size="large" color="grey" @click="clickMain">
              <span>메인으로 돌아가기</span>
            </v-btn>
          </v-col>
          <v-spacer />
        </v-row>
      </v-col>
      <v-spacer />
    </v-row>
    <v-spacer style="height: 150px" />
  </v-container>
</template>

<script>
export default {
  methods: {
    clickSeachDw() {
      this.$router.push('/searchDw');
    },
    clickMain() {
      this.$router.push('/');
    },
  },
};
</script>

<style></style>
