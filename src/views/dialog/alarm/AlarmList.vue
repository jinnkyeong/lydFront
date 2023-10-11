<template>
  <v-dialog
    class="dialog"
    width="auto"
    v-model="$store.state.login.alarmOpen"
    scrollable>
    <v-card width="600" height="600">
      <v-row class="ma-5">
        <v-spacer />
        <v-col cols="12" md="11">
          <v-row no-gutters style="min-height: 30px">
            <div class="mb-5">
              <div class="title">알림</div>
              <div class="desc">생성 이후 7일 이내의 알림들만 표시됩니다</div>
            </div>
          </v-row>
          <v-row
            v-for="item in alarmList"
            :key="item"
            style="min-height: 80px"
            @click="clickAlarm(item)">
            <!-- 배지는 안읽은 상태에서만 노출 -->
            <v-col cols="12" md="1">
              <v-badge dot color="success" v-if="item.checked === 1" />
            </v-col>
            <v-col cols="12" md="1" align-self="center" class="mr-2">
              <v-avatar>
                <v-img :src="item.imgUrl" cover />
              </v-avatar>
            </v-col>
            <v-col>
              <v-container>
                <!-- 메세지타입 -->
                <v-row>
                  <div class="primary-color">
                    {{ item.msgTypeStr }}
                  </div>
                </v-row>
                <!-- 메세지 -->
                <v-row>
                  <div class="text-regular">{{ item.text }}</div>
                </v-row>
                <v-row v-if="item.msgType === 4">
                  {{ showComments(item.commentContext) }}
                </v-row>
              </v-container>
            </v-col>
            <v-divider />
          </v-row>
          <v-row v-if="alarmList.length == 0" justify="center">
            <div style="height: 150px" class="grey mt-16">알림이 없습니다</div>
          </v-row>
          <v-spacer style="height: 30px" />
        </v-col>
        <v-spacer />
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
import searchApi from '@/api/searchApi';
import reviewApi from '@/api/reviewApi';
export default {
  mounted() {
    this.alarmList = this.$store.state.login.alarmList; // 전체 알람 리스트
    console.log('this.alarmList', this.alarmList);
    //
    for (let i = 0; i < this.alarmList.length; i++) {
      if (this.alarmList[i].msgType === 1) {
        // 1 : 청약자가 지원서or의뢰서 변경 -> 미수락자
        this.alarmList[i].msgTypeStr = '문의 및 제안 변경';
      } else if (this.alarmList[i].msgType === 2) {
        // 2 : 예약 완료 -> 청약자
        this.alarmList[i].msgTypeStr = '예약 완료';
      } else if (this.alarmList[i].msgType === 3) {
        // 3 : 합격 결정 완료 -> 합격자
        this.alarmList[i].msgTypeStr = '도그워커 합격 결정 완료';
      } else if (this.alarmList[i].msgType === 4) {
        // 4 : 대댓글 작성 -> 부모댓글러  2->1   3->2   4->3 ...
        this.alarmList[i].msgTypeStr = '답글 작성 알림';
      } else if (this.alarmList[i].msgType === 5) {
        // 5 : 댓글,대댓글 작성 -> 원글러 1,2,3,4 -> 0
        this.alarmList[i].msgTypeStr = '댓글 작성 알림';
      } else {
        console.log('msgtype이 이상합니다');
      }
    }
  },
  updated() {
    this.alarmList = this.$store.state.login.alarmList; // 전체 알람 리스트
    console.log('this.alarmList', this.alarmList);
    // msgTypeStr
    for (let i = 0; i < this.alarmList.length; i++) {
      if (this.alarmList[i].msgType === 1) {
        // 1 : 청약자가 지원서or의뢰서 변경 -> 미수락자
        this.alarmList[i].msgTypeStr = '문의 및 제안 변경';
      } else if (this.alarmList[i].msgType === 2) {
        // 2 : 예약 완료 -> 청약자
        this.alarmList[i].msgTypeStr = '예약 완료';
      } else if (this.alarmList[i].msgType === 3) {
        // 3 : 합격 결정 완료 -> 합격자
        this.alarmList[i].msgTypeStr = '도그워커 합격 결정 완료';
      } else if (this.alarmList[i].msgType === 4) {
        // 4 : 대댓글 작성 -> 부모댓글러  2->1   3->2   4->3 ...
        this.alarmList[i].msgTypeStr = '답글 작성 알림';
      } else if (this.alarmList[i].msgType === 5) {
        // 5 : 댓글,대댓글 작성 -> 원글러 1,2,3,4 -> 0
        this.alarmList[i].msgTypeStr = '댓글 작성 알림';
      } else {
        console.log('msgtype이 이상합니다');
      }
    }
  },
  data() {
    return {
      alarmList: [],
    };
  },
  methods: {
    clickAlarm(alarm) {
      // 안읽음 배지 없애기
      alarm.checked = 2;

      // 해당 페이지로 이동하기
      if (alarm.msgType === 1) {
        console.log('2 : paperId ', alarm.paperId);
        // 1 : 청약자가 지원서or의뢰서 변경 -> 미수락자
        if (alarm.userType === 'dogwalker') {
          this.$store.commit('setComId', alarm.paperId);
          this.$router.push('detailCus'); // 의뢰서 상세보기
        } else if (alarm.userType === 'customer') {
          this.$store.commit('setAppId', alarm.paperId);
          this.$router.push('detailDw'); // 지원서 상세보기
        } else {
          console.log('userType이 이상합니다');
        }
      } else if (alarm.msgType === 2) {
        // 2 : 예약 완료 -> 청약자
        console.log('2 : reservId ', alarm.reservId);
        this.$store.commit('setReservId', alarm.reservId);
        if (alarm.userType === 'dogwalker') {
          this.$router.push('/dwInfo/reservDetail'); // 예약 상세보기
        } else if (alarm.userType === 'customer') {
          this.$router.push('/cusInfo/reservDetail'); // 예약 상세보기
        } else {
          console.log('userType이 이상합니다');
        }
      } else if (alarm.msgType === 3) {
        // 3 : 합격 결정 완료 -> 합격자
        console.log('3  ');
        this.$router.push('/dwInfo'); // 내 정보 보기
      } else if (alarm.msgType === 4) {
        // 4 : 대댓글 작성 -> 부모댓글러  2->1   3->2   4->3 ...
        reviewApi
          .findReviewById(alarm.reviewId)
          .then((res) => {
            console.log(res.data);
            this.$store.commit('setReview', res.data);
            this.$router.push({
              path: '/reviewDetail',
              query: { parentCommentId: alarm.parentCommentId },
            });
          })
          .catch((e) => {
            console.log(e);
          });
      } else if (alarm.msgType === 5) {
        // 5 : 댓글,대댓글 작성 -> 원글러 1,2,3,4 -> 0
        reviewApi
          .findReviewById(alarm.reviewId)
          .then((res) => {
            console.log(res.data);
            this.$store.commit('setReview', res.data);
            this.$router.push({
              path: '/reviewDetail',
              query: { parentCommentId: alarm.parentCommentId },
            });
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        console.log('msgtype이 이상합니다');
      }
      this.$store.commit('setAlarmOpen'); // 알림 모달창 닫기

      // checked 2 상태로 갱신
      searchApi
        .setAlarmCheck(alarm.id) // 알람 읽음 처리
        .then((res) => {
          console.log(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    // 댓글 내용 미리보기
    showComments(comment) {
      if (comment) {
        if (comment.length >= 60) {
          // 60자 이상은 자르기
          return comment.substring(0, 60) + '...';
        } else {
          return comment;
        }
      }
    },
  },
};
</script>

<style></style>
