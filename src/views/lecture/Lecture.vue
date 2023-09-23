<template>
  <v-container fluid>
    <!-- 제목 -->
    <v-row
      justify="center"
      no-gutters
      class="back-secondary-color"
      style="height: 200px">
      <v-spacer />
      <v-col cols="12" md="3" align-self="center">
        <h1 class="white">온라인 강의 수강</h1>
      </v-col>
      <v-spacer />
    </v-row>
    <v-spacer style="height: 200px" />
    <!-- 학습목표 -->
    <v-row>
      <v-spacer />
      <v-col cols="12" md="5">
        <div class="square-box pa-10">
          <v-container>
            <v-row>
              <div class="pb-5">
                <h3>학습목표</h3>
              </div>
            </v-row>
            <v-row>
              <div class="pb-3">
                반려견 바디랭귀지, 커뮤니케이션, 팩 매니지먼트, 세이프티
                프로토콜, 올바른 반려견 워킹, 툴키트, 고객 및 반려견 스크리닝
                기법 등 도그 워킹에 필요한 지식과 훈련법
              </div>
              <div>
                반려견 응급조치, CPR, 외상 관리, 계절별 관리 등 응급처치&CPR
              </div>
            </v-row>
          </v-container>
        </div>
      </v-col>
      <v-spacer />
    </v-row>
    <v-spacer style="height: 200px" />
    <!-- 강의 목록 -->
    <v-row class="pl-10 pt-10 mt-10 pb-16 mb-16" justify="center">
      <v-col>
        <!-- 제목 -->
        <v-row class="mb-16">
          <v-col cols="12" md="3" />
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
        <v-row>
          <v-container class="ma-10">
            <v-row justify="center">
              <v-col cols="12" md="3" />
              <v-col cols="12" md="8">
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
                  <v-spacer />
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
                  <v-col align-self="center" cols="12" md="4">
                    <div class="ma-3">
                      <v-btn
                        @click="watchLecture(lec)"
                        variant="tonal"
                        color="primary">
                        수강하기
                      </v-btn>
                    </div>
                  </v-col>
                </v-row>
              </v-col>
              <v-spacer />
            </v-row>
          </v-container>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
  <router-view name="dialog" />
</template>

<script>
import myInfoApi from '@/api/myInfoApi';
import format from '@/utillFunction/format';
export default {
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
        this.progress = this.getProgress(total, finish); // 달성도 갱신
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
      videoUrl: {
        skill: 'https://www.youtube.com/embed/EG5xtStkjyg?si=A7j6wwvx1A0gKPvQ',
        psycho: 'https://www.youtube.com/embed/S2-NvwCCFH0?si=qhfpdfHufc-h4IRP',
        train: 'https://www.youtube.com/embed/aFojR9xDl30?si=9EZhaSkqsf3gZVcc',
        walk: 'https://www.youtube.com/embed/4Kv1CmpmfV8?si=2JK46eWmtpFD--Q6,',
      },
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
    watchLecture(lec) {
      if (lec.id === 1) {
        //도그워킹 기술
        let video = {
          url: this.videoUrl.skill,
          title: lec.title,
          lectureTypeId: lec.id,
        };
        this.$store.commit('setVideo', video);
      } else if (lec.id === 2) {
        // 반려동물 행동 심리
        let video = {
          url: this.videoUrl.psycho,
          title: lec.title,
          lectureTypeId: lec.id,
        };
        this.$store.commit('setVideo', video);
      } else if (lec.id === 3) {
        // 기초 훈련방법
        let video = {
          url: this.videoUrl.train,
          title: lec.title,
          lectureTypeId: lec.id,
        };
        this.$store.commit('setVideo', video);
      } else if (lec.id === 4) {
        // 반려견 산책 유의사항
        let video = {
          url: this.videoUrl.walk,
          title: lec.title,
          lectureTypeId: lec.id,
        };
        this.$store.commit('setVideo', video);
      }
      this.$store.commit('setOpen', true);
      this.$router.push('/lectureView');
    },
  },
  watch: {
    progress() {
      if (this.progress >= 100) {
        this.$router.push('/lectureSuccess');
        console.log(this.progress);
      }
    },
  },
};
</script>

<style></style>
