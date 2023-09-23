<template>
  <v-container>
    <!-- 강의수강내역 -->
    <v-row>
      <v-col cols="12" md="11">
        <v-container>
          <v-row style="height: 50px"></v-row>
          <!-- 제목 -->
          <v-row>
            <div class="title mr-2">강의수강내역</div>
            <v-col cols="12" md="4" align-self="center">
              <span>
                <v-progress-linear
                  color="secondary"
                  v-model="progress"
                  rounded
                  :height="27" />
              </span>
            </v-col>
            <v-col cols="12" md="2" align-self="center">
              <span class="secondary-color"> 달성도 {{ progress }} % </span>
            </v-col>
            <v-spacer />
          </v-row>
          <!-- 내용 -->
          <v-spacer style="height: 70px" />
          <v-row>
            <v-container>
              <v-row>
                <v-col>
                  <!-- 아무것도 없는 경우 -->
                  <v-row
                    v-if="message"
                    justify="center"
                    class="list-box"
                    style="height: 300px">
                    <v-col align-self="center" cols="12" md="5">
                      <div>
                        {{ message }}
                      </div>
                    </v-col>
                  </v-row>
                  <!-- 내역이 있는 경우 -->
                  <v-row
                    justify="center"
                    v-for="lec in lectures"
                    :key="lec"
                    class="list-box">
                    <v-col cols="12" md="6" align-self="center">
                      <!-- 제목, 완강여부 -->
                      <div class="mr-4 mt-4 mb-4">
                        <span class="pr-5">
                          <span class="title-regular">{{ lec.title }}</span>
                        </span>
                        <span class="pr-1" v-if="lec.end">
                          <v-chip size="small">완강</v-chip>
                        </span>
                      </div>
                      <!-- 해당 강의를 100퍼센트 다 들은 일시 -->

                      <div v-if="lec.end">
                        <span class="pr-3 secondary-color">완강일자</span>
                        <span class="pr-1">{{ format(lec.endAt) }} </span>
                      </div>
                      <div v-if="!lec.end">
                        <span class="pr-3 grey">미수강 상태입니다</span>
                      </div>
                    </v-col>
                    <!-- 예약상태 -->
                    <v-spacer />
                    <v-col align-self="center" cols="12" md="2">
                      <div class="ma-3">
                        <v-btn
                          @click="goLecture(lec.id)"
                          variant="tonal"
                          color="primary">
                          다시 강의듣기
                        </v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-container>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
    <v-spacer style="height: 150px" />

    <!-- 테스트내역 -->
    <v-row>
      <v-col>
        <v-container>
          <v-row style="height: 50px"></v-row>
          <!-- 제목 -->
          <v-row>
            <div class="title mr-2">테스트</div>
            <div>
              <ConfirmTest @test="doTest" />
            </div>
            <v-spacer />
          </v-row>
        </v-container>
        <!-- 설명 -->
        <v-row>
          <v-col class="mt-4">
            <div class="desc">80점 이상인 경우 테스트를 통과합니다.</div>
            <div class="desc">
              80 미만으로 테스트를 통과하지 못한 경우 다시 테스트를 보기
              위해서는 온라인 교육을 다시 이수해야 합니다.
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <!-- 내용 -->
    <v-row class="pt-3 mt-3">
      <v-container>
        <v-row>
          <v-col cols="12" md="10">
            <!-- 내역이 없는 경우 -->
            <v-row v-if="message2">
              <v-spacer />
              <v-col cols="12" md="8">
                <v-row class="square-box" justify="center">
                  <v-spacer />
                  <v-col cols="12" md="6"> {{ message2 }} </v-col>
                  <v-spacer />
                </v-row>
              </v-col>
              <v-spacer />
            </v-row>
            <!-- 내역이 있는 경우 -->
            <v-row v-if="!message2" class="square-box pa-5" justify="center">
              <v-col cols="12" md="6">
                <v-row>
                  <v-col cols="12" md="3" class="pl-8">
                    <font-awesome-icon icon="fa-solid fa-calendar-days" />
                  </v-col>
                  <v-col cols="12" md="9">
                    {{ format2(test.testStartAt) }}
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="3" class="pl-8">
                    <font-awesome-icon icon="fa-solid fa-clock" />
                  </v-col>
                  <v-col cols="12" md="9">
                    {{ format3(test.testStartAt, test.testEndAt) }}
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="3" class="pl-8">
                    <font-awesome-icon icon="fa-solid fa-check" />
                  </v-col>
                  <v-col cols="12" md="9">
                    <div>{{ test.testScore }} 점</div>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" md="6" align-self="center">
                <div
                  v-if="test.testScore >= 80"
                  class="text-regular primary-color">
                  테스트를 통과하셨습니다
                </div>
                <div v-if="test.testScore < 80" class="text-regular red">
                  테스트를 통과하지 못 했습니다
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-row>
    <!-- 아래 공백 -->
    <v-row style="height: 200px" />
  </v-container>
  <router-view name="dialog" />
</template>

<script>
import myInfoApi from '@/api/myInfoApi';
import format from '@/utillFunction/format';

import ConfirmTest from '@/views/dialog/confirm/ConfirmTest.vue';

export default {
  components: {
    ConfirmTest,
  },
  created() {
    myInfoApi
      .getLectures(this.$store.state.login.dwId)
      .then((res) => {
        console.log('getLectures : ', res.data);
        this.lectures = res.data; // 강의내역

        if (this.lectures.length < 1) {
          // 아무것도 없는 경우
          this.message = '해당 내역이 존재하지 않습니다';
        } else {
          this.message = '';
        }

        let total = this.lectures.length;
        let finish = 0;
        for (let i = 0; i < this.lectures.length; i++) {
          if (this.lectures[i].endAt != null) {
            finish++;
            this.lectures[i].end = true;
          } else {
            this.lectures[i].end = false;
          }
        }
        this.progress = this.getProgress(total, finish); // 진행도
      })
      .catch((e) => {
        console.log(e);
      });

    myInfoApi
      .getTest(this.$store.state.login.dwId)
      .then((res) => {
        console.log('getTest : ', res.data);
        if (res.data.testStartAt && res.data.testEndAt && res.data.testScore) {
          this.test = res.data; // 테스트내역
          this.message2 = '';
        } else {
          this.message2 = '해당 내역이 존재하지 않습니다';
        }
      })
      .catch((e) => {
        console.log(e);
      });
  },
  data() {
    return {
      progress: null, // 달성도 %
      lectures: [],
      message: '',
      message2: '',
      test: {
        testStartAt: '2023-08-23T06:33:06', // 임시로(없으면 undefined...)
      },
      passMsg: '',
      colorMsg: '',
    };
  },
  methods: {
    // 달성도 반환
    getProgress(total, finish) {
      return Math.round((finish / total) * 100);
    },
    format(dt) {
      return format.formatDateTime(dt);
    },
    format2(dt) {
      return format.formatDate(dt);
    },
    format3(startDt, endDt) {
      return format.formatDuration(startDt, endDt);
    },

    // 강의들으러 가기
    goLecture(lecId) {
      this.$store.commit('setLecId', lecId);
      this.$router.push('/lecture');
    },
    doTest(test) {
      if (test) {
        this.$router.push('/test');
      }
    },
  },
};
</script>

<style></style>
