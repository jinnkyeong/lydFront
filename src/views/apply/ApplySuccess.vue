<template>
  <v-container>
    <v-row>
      <v-spacer />
      <v-col cols="12" md="8">
        <v-row style="height: 200px"></v-row>
        <v-row justify="center">
          <div class="title-regular ma-16">
            도그워커 지원서가 접수가 완료 되었습니다
          </div>
        </v-row>
        <v-row justify="center">
          <div>
            도그워커가 되기 위해서는 지원서 심사, 교육 이수, 테스트 통과의
            절차를 거쳐야 합니다.
          </div>
          <div>
            지원서 심사가 진행 중인 동안 온라인 교육을 이수할 수 있습니다.
          </div>
        </v-row>
        <v-row style="height: 100px"></v-row>
        <v-row>
          <v-spacer />
          <v-col cols="12" md="3">
            <v-btn block size="large" color="primary" @click="clickSeachDw">
              <span>온라인 교육 시작하기</span>
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
      this.$router.push('lecture');
    },
    clickMain() {
      this.$router.push('/');
    },
  },
};
</script>

<style>
.main-sentence {
  color: brown;
}
</style>
