<template>
  <v-container>
    <v-row>
      <v-spacer />
      <v-col cols="12" md="8">
        <v-row style="height: 200px"></v-row>
        <v-row justify="center">
          <div class="red ma-16">
            테스트 결과 {{ testScore }}점을 받으셨습니다
          </div>
        </v-row>
        <v-row justify="center">
          <div>80점 미만의 점수를 받았으므로 불합격 처리 되었습니다.</div>
        </v-row>
        <v-row justify="center">
          <div>다시 온라인 교육을 듣고 재시험을 볼 수 있습니다.</div>
        </v-row>

        <v-row style="height: 100px"></v-row>
        <v-row>
          <v-spacer />
          <v-col cols="12" md="3">
            <v-btn block size="large" color="primary" @click="clickLecture">
              <span>재수강하기</span>
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
import myInfoApi from '@/api/myInfoApi';

export default {
  created() {
    myInfoApi
      .getProfileByDwId(this.$store.state.login.dwId)
      .then((res) => {
        this.testScore = res.data.testScore;
      })
      .catch((e) => {
        console.log(e);
      });
  },
  data() {
    return {
      testScore: null,
    };
  },
  methods: {
    clickLecture() {
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
