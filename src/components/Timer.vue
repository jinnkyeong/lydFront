<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6" align-self="center">
        <v-text-field
          label="인증번호"
          v-model="inputCode"
          variant="underlined"
          class="pa-0 ma-0" />
      </v-col>
      <v-col cols="12" md="3" align-self="center">
        <v-btn
          v-if="complete == false"
          @click="getCode"
          size="small"
          color="grey_light">
          <span class="pa-1">번호 받기</span>
        </v-btn>
      </v-col>
      <v-col cols="12" md="3" align-self="center">
        <v-btn
          v-if="complete == false"
          @click="sendCode"
          size="small"
          color="grey_light">
          인증
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="pa-0 ma-0">
      <div class="mr-3 secondary-color">{{ dispTime }}</div>
      <div class="text-micro red">{{ dispMsg }}</div>
    </v-row>
  </v-container>
</template>

<script>
import loginApi from '@/api/loginApi';
export default {
  props: {
    email: String,
  },
  data() {
    return {
      restSec: 0,
      timerObject: null,

      timerProhibit: 60 * 2, // 제한시간(2분)

      prohibitCount: 0,
      clickCnt: 0,
      message: {
        correctMsg: '인증번호가 일치하여 인증에 성공했습니다.',
        wrongMsg: '인증번호가 틀렸습니다. 다시 인증 해 주세요.',
        timeOutMsg: '제한시간이 만료되었습니다. 다시 인증 해 주세요.',
      },
      dispMsg: '',
      inputCode: '',
      createdCode: '',
      isSame: false,
      dispTime: '',
      complete: false,
    };
  },
  methods: {
    getCode() {
      if (this.email.length === 0) {
        // 이메일을 입력하지 않은 경우
        //this.dispMsg = "인증할 이메일을 입력 해 주세요"
      } else {
        // 이메일을 입력한 경우
        this.clickCnt++; // 인증번호 받기 버튼 클릭 횟수 + 1 (setInterval이 계속 호출되는 문제)
        this.startTimer(); // 1. 타이머 시작

        loginApi
          .postEmail(this.email) //  2. 인증코드 받기
          .then((res) => {
            this.createdCode = res.data.code; // 생성된 인증코드를 저장
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },

    // 00:00:00 형태로 포맷
    timeFormat(restTime) {
      let hour = 0;
      let min = 0;
      let sec = 0;
      if (restTime > 0) {
        min = parseInt(restTime / 60);
        sec = restTime % 60;
        if (min > 60) {
          hour = parseInt(min / 60);
          min = min % 60;
        }
      }
      if (sec < 10) sec = '0' + sec;
      if (min < 10) min = '0' + min;

      return hour + ':' + min + ':' + sec;
    },

    startTimer() {
      if (this.clickCnt > 0) {
        clearInterval(this.timerObject); // 인터벌 클리어(인터벌 중복 방지)
      }

      this.restSec = this.timerProhibit; // 남은 시간 초기화(2분)
      this.timerObject = setInterval(() => {
        // 1초마다 restSec-1
        this.restSec--;
        this.dispTime = this.timeFormat(this.restSec); // 화면에 남은 시간 출력
      }, 1000);
    },
    sendCode() {
      // 인증하기 버튼 클릭 -> 인증코드 일치 여부 확인
      if (this.isSame) {
        clearInterval(this.timerObject); // 인터벌 클리어
        this.dispTime = ''; // 남은 시간 안보이게 하기
        this.dispMsg = this.message.correctMsg; // 인증코드 일치 메세지
        this.complete = true; // 성공-> 버튼 가리기
        this.$emit('isSame', true); // 이메일 인증 성공여부를 부모컴포넌트에 보내기
      } else {
        this.dispMsg = this.message.wrongMsg; // 인증코드 불일치 메세지
      }
    },
  },

  watch: {
    // 남은 초를 감시한다.
    restSec() {
      if (this.restSec <= 0) {
        // 제한시간 만료하면
        this.dispMsg = this.message.timeOutMsg; // 제한시간 만료 메세지
        clearInterval(this.timerObject);
      } else {
        if (this.inputCode === this.createdCode) {
          this.isSame = true;
        } else {
          this.isSame = false;
        }
      }
    },
  },
};
</script>

<style></style>
