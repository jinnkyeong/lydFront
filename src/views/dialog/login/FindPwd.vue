<template>
  <v-dialog class="dialog" v-model="$store.state.just_state.open" width="450">
    <!-- 너버 - 임의로 정함 -->
    <v-card>
      <v-card-title> </v-card-title>

      <v-card-text>
        <v-form ref="form" lazy-validation>
          <v-container fluid>
            <v-row justify="center" no-gutters style="height: 40px"> </v-row>
            <v-row justify="center" no-gutters style="height: 60px">
              <h3>비밀번호 찾기</h3>
            </v-row>
            <v-row justify="center" no-gutters>
              <v-spacer />
              <v-col cols="12" md="10">
                <v-text-field
                  label="이메일"
                  v-model="email"
                  :rules="email_rule"
                  variant="underlined"></v-text-field>
              </v-col>
              <v-spacer />
            </v-row>
            <v-row>
              <v-spacer />
              <v-col cols="12" md="8">
                <v-btn
                  class="loginBtns"
                  color="grey_light"
                  block
                  @click="clickSendNewPwd">
                  <span class="text-small">임시 비밀번호 발송</span>
                </v-btn>
              </v-col>
              <v-spacer />
            </v-row>
            <v-row justify="center">
              <div class="text-center mt-16 mb-16">
                <button @click="clickLogin">
                  <span class="link secondary-color text-small">
                    비밀번호를 알고있나요? 로그인하기
                  </span>
                </button>
              </div>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import loginApi from '@/api/loginApi';

export default {
  components: {},
  data() {
    return {
      email: '',
      dispMsg: '',
      email_rule: [
        (v) => !!v || '이메일은 필수 입력사항입니다.',
        (v) =>
          /^[A-Za-z0-9_\\.\\-]+@[A-Za-z0-9\\-]+\.[A-Za-z0-9\\-]+/.test(v) ||
          '@를 포함한 이메일 형식으로 입력해주세요',
      ],
    };
  },
  methods: {
    clickLogin() {
      this.$router.push('/loginPage');
    },
    clickSendNewPwd() {
      // this.$router.push('findPwdSuccess');

      // 입력형식검사
      this.$refs.form
        .validate()
        .then((res) => {
          if (res.valid) {
            // 1. 동일한 이메일 있나 확인 2. (있다면) 임시 비번 발송
            loginApi
              .postFindPwd(this.email, this.$store.state.login.userType)
              .then(() => {
                console.log('비번발송 성공');
                this.$router.push('findPwdSuccess');
              })
              .catch((e) => {
                this.dispMsg = '일치하는 회원 이메일이 없습니다';
                console.log(e);
              });
          }
        })
        .catch((e) => {
          console.log(e);
        });
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
