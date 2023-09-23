<template>
  <v-dialog class="dialog" v-model="$store.state.just_state.open" width="450">
    <!-- 너버 - 임의로 정함 -->
    <v-card>
      <v-card-title> </v-card-title>

      <v-card-text>
        <v-form ref="form" lazy-validation @submit.prevent="clickSignUpSuccess">
          <v-container fluid>
            <v-row justify="center" no-gutters style="height: 40px" />
            <v-row justify="center" no-gutters style="height: 60px">
              <h3>이메일로 회원가입</h3>
            </v-row>
            <v-spacer style="height: 30px" />

            <!-- 이메일 입력 -->
            <v-row justify="center" no-gutters>
              <v-spacer />
              <v-col cols="12" md="12">
                <v-text-field
                  label="이메일"
                  :rules="emailRules"
                  v-model="email"
                  class="mt-0 pt-0 mb-0 pb-0"
                  variant="underlined" />
              </v-col>
              <v-spacer />
            </v-row>
            <!-- 인증 -->
            <v-row no-gutters>
              <timer v-bind:email="email" @isSame="setIsSame" />
            </v-row>
            <!-- 비밀번호 입력 -->
            <v-row justify="center" no-gutters>
              <v-text-field
                label="비밀번호"
                :rules="pwd_rule"
                v-model="pwd"
                type="password"
                class="mt-0 pt-0 mb-0 pb-0"
                variant="underlined" />
            </v-row>
            <!-- 버튼 -->
            <v-row>
              <v-spacer />
              <v-col cols="12" md="8">
                <v-btn class="loginBtns" color="grey_light" block type="submit">
                  <span>회원가입하기</span>
                </v-btn>
              </v-col>
              <v-spacer />
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>

      <v-card-actions> </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import loginApi from '@/api/loginApi';
import Timer from '@/components/Timer';

export default {
  components: {
    Timer,
  },
  data() {
    return {
      dialog: false,
      email: '',
      pwd: '',
      pwd_rule: [
        (v) => !!v || '비밀번호는 필수 입력사항입니다.',
        (v) =>
          !(!v || v.length < 8 || v.length > 16) ||
          '8~16 자리의 비밀번호를 입력해주세요',
      ],
      isSame: false,
      duplPassed: false,
    };
  },
  computed: {
    emailRules() {
      const rules = [];
      const rule1 = (v) => !!v || '이메일은 필수 입력사항입니다.';
      const rule2 = (v) =>
        /^[A-Za-z0-9_\\.\\-]+@[A-Za-z0-9\\-]+\.[A-Za-z0-9\\-]+/.test(v) ||
        '@를 포함한 이메일 형식으로 입력해주세요';
      const rule3 = (v) => this.checkEmail(v) || '동일한 ID가 존재합니다';
      rules.push(rule1);
      rules.push(rule2);
      rules.push(rule3);
      return rules;
    },
  },
  methods: {
    clickSignUpSuccess() {
      // this.$router.push('signUpSuccess');

      // 1. 입력형식 검사(+이메일 중복검사)
      this.$refs.form
        .validate()
        .then((res) => {
          if (res.valid) {
            // 2. 이메일 인증 성공
            if (this.isSame) {
              loginApi
                .postRegister(
                  this.email,
                  this.pwd,
                  this.$store.state.login.userType
                )
                .then((res) => {
                  console.log('회원가입 완료 res.data : ', res.data);
                  this.$router.push('signUpSuccess');
                })
                .catch((e) => {
                  console.log('회원가입 - ', e);
                });
            } else {
              console.log('이메일 인증 실패'); // 앞단에서확인 메세지
            }
          } else {
            console.log('입력형식검사 불통');
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    // 메일 인증코드로 인증 성공
    setIsSame(isSame) {
      this.isSame = isSame;
    },
    // 이메일 중복 검사
    checkEmail(email) {
      loginApi
        .checkDuplEmail(email, this.$store.state.login.userType)
        .then((res) => {
          // true : 중복X
          // false : 중복O
          this.duplPassed = res.data;
        })
        .catch((e) => {
          console.log('이메일 중복확인 실패 - ', e);
          return false;
        });
      return this.duplPassed;
    },
  },
};
</script>

<style>
.loginBtns {
  margin-top: 16px;
  width: 250px;
  height: 150px;
  border-radius: 30px;
  padding: 5px;
}
</style>
