<template>
  <v-container>
    <v-row>
      <v-spacer />
      <v-col cols="12" md="10">
        <v-container>
          <v-row style="border-bottom: solid black 1px">
            <v-col>도그워커 ID</v-col>
            <v-col>도그워커 닉네임</v-col>
            <v-col>지원서 통과여부</v-col>
            <v-col>강의 완강여부</v-col>
            <v-col>테스트 통과여부(점수)</v-col>
            <v-col>인터뷰 통과여부</v-col>
            <v-col>최종 합격</v-col>
          </v-row>
          <v-row v-for="dw in dogwalkers" :key="dw">
            <v-col>{{ dw.dogwalkerId }}</v-col>
            <v-col>{{ dw.nick }}</v-col>
            <v-col>
              <div>
                {{ dw.appicationPassed }}
              </div>
              <div>
                <v-btn @click="clickApplPass(dw)">합격 처리하기</v-btn>
              </div>
            </v-col>
            <v-col>{{ dw.lecturePassed }}</v-col>
            <v-col>{{ dw.testPassed }}</v-col>
            <v-col>
              <div>
                {{ dw.interviewPassed }}
              </div>
              <div>
                <v-btn @click="clickItvPass(dw)">합격 처리하기</v-btn>
              </div>
            </v-col>
            <v-col>
              <div
                class="highlight"
                v-if="
                  !dw.passed &&
                  dw.appicationPassed &&
                  dw.testPassed &&
                  dw.interviewPassed
                ">
                조건을 충족하여 합격처리가 가능합니다
                <v-btn @click="clickPass(dw)">합격 처리하기</v-btn>
              </div>
              <div
                v-if="
                  !dw.passed &&
                  (!dw.appicationPassed ||
                    // !dw.lecturePassed ||
                    !dw.testPassed ||
                    !dw.interviewPassed)
                ">
                조건을 불충족하여 합격처리가 불가능합니다.
              </div>
              <div class="highlight" v-if="dw.passed">최종합격</div>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
      <v-spacer />
    </v-row>
  </v-container>
</template>

<script>
import adminApi from '@/api/adminApi';
export default {
  created() {
    adminApi
      .getDogwalkers()
      .then((res) => {
        this.dogwalkers = res.data;
        console.log(this.dogwalkers);
      })
      .catch((e) => {
        console.log(e);
      });
  },
  data() {
    return {
      dogwalkers: [],
    };
  },
  methods: {
    //합격처리
    clickPass(dw) {
      adminApi
        .passDogwalker(dw.dogwalkerId, 1) // 합격처리
        .then((res) => {
          //this.dogwalkers = res.data;
          //console.log('this.dogwalkers', this.dogwalkers);
          console.log(res.data);
          this.$router.go(0);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    clickApplPass(dw) {
      adminApi
        .passApplDogwalker(dw.dogwalkerId, 1) // 지원서 합격처리
        .then((res) => {
          console.log(res.data);
          this.$router.go(0);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    clickItvPass(dw) {
      adminApi
        .passItvDogwalker(dw.dogwalkerId, 1) // 인터뷰 합격처리
        .then((res) => {
          console.log(res.data);
          this.$router.go(0);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>

<style></style>
