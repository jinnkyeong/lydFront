<template>
  <v-container>
    <v-row>
      <v-spacer />
      <v-col cols="12" md="8">
        <v-row style="height: 200px"></v-row>
        <v-row justify="center">
          <div class="title-regular ma-16">
            <span> 도그워커 </span>
            <span v-if="$route.query.passed" class="secondary-color">합격</span>
            <span v-if="!$route.query.passed" class="red">불합격</span>
          </div>
        </v-row>
        <v-row justify="center" v-if="$route.query.passed">
          <div class="text-center">
            <div>도그워커에 지원해 주셔서 감사합니다.</div>
            <div>지원서류 심사, 온라인 테스트, 전화 인터뷰 결과</div>
            <div>도그워커로 합격하셨습니다.</div>
            <div>‘내 정보 - 받은 의뢰 내역’에서 의뢰를 받거나,</div>
            <div>
              ‘찾기 - 의뢰 찾기’에서 직접 의뢰를 찾아서 의뢰 제안을 할 수
              있습니다.
            </div>
          </div>
        </v-row>
        <v-row justify="center" v-if="!$route.query.passed">
          <div class="text-center">
            <div>도그워커에 지원해 주셔서 감사합니다.</div>
            <div>안타깝지만 지원서류 심사, 온라인 테스트, 전화 인터뷰 결과</div>
            <div>도그워커로 불합격하셨습니다.</div>
            <div>추후에 다시 ‘도그워커 지원’을 하실 수 있습니다.</div>
          </div>
        </v-row>
        <v-row style="height: 100px"></v-row>
        <v-row>
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
