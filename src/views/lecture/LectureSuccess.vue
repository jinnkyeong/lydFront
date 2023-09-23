<template>
  <v-container>
    <v-row>
      <v-spacer />
      <v-col cols="12" md="8">
        <v-row style="height: 200px"></v-row>
        <v-row justify="center">
          <h3 class="ma-16">강의를 모두 수강하셨습니다</h3>
        </v-row>
        <v-row justify="center">
          <div>바로 테스트를 시작하시겠습니까?</div>
        </v-row>
        <v-row style="height: 100px"></v-row>
        <v-row>
          <v-spacer />
          <v-col cols="12" md="3">
            <v-btn block size="large" color="primary" @click="clickTest">
              <span>테스트 시작하기</span>
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
        <v-spacer style="height: 150px" />
      </v-col>
      <v-spacer />
    </v-row>
  </v-container>
</template>

<script>
export default {
  methods: {
    clickTest() {
      this.$router.push('test');
    },
    clickMain() {
      this.$router.push('/');
    },
  },
};
</script>

<style></style>
