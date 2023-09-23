<template>
  <v-container>
    <v-row>
      <v-spacer />
      <v-col cols="12" md="8">
        <v-row style="height: 200px"></v-row>
        <v-row justify="center">
          <div class="secondary-color ma-16">
            테스트 결과 {{ testScore }}점을 받으셨습니다
          </div>
        </v-row>
        <v-row justify="center">
          <div>서류 심사, 1:1 전화 인터뷰 이후 3일 이내에</div>
        </v-row>
        <v-row justify="center">
          <div>이메일 및 문자메세지로 합격발표 알림이 있습니다.</div>
        </v-row>
        <v-row justify="center">
          <div>‘내 정보 - 개인정보/보안 ’에서 합격여부를 확인하세요.</div>
        </v-row>
        <v-row style="height: 100px"></v-row>
        <v-row>
          <v-spacer />
          <v-col cols="12" md="4">
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
    clickMain() {
      this.$router.push('/');
    },
  },
};
</script>

<style></style>
