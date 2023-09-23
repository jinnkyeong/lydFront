<template>
  <v-dialog class="dialog" v-model="$store.state.just_state.open" width="450">
    <!-- 너버 - 임의로 정함 -->
    <v-card>
      <v-card-title>
        <!-- 뒤로가기 버튼(이메일로 회원가입,로그인만) -->
        <!-- <button @click="goBack">뒤로가기</button> -->
        <!-- 나가기 버튼 -->
        <!-- <button @click="clickclose"></button> -->
      </v-card-title>

      <v-card-text>
        <v-form ref="form" lazy-validation @submit.prevent="doLogin">
          <v-container fluid>
            <v-row justify="center" no-gutters style="height: 40px" />
            <v-row justify="center" no-gutters style="height: 60px">
              <h3>이메일로 로그인</h3>
            </v-row>
            <v-spacer style="height: 30px" />

            <v-row justify="center" no-gutters>
              <v-spacer />
              <v-col cols="12" md="10">
                <v-text-field
                  label="이메일"
                  v-model="payload.email"
                  :rules="email_rule"
                  class="ma-0 pa-0"
                  variant="underlined"></v-text-field>
              </v-col>
              <v-spacer />
              <!-- <v-checkbox label="로그인 상태 유지"></v-checkbox> -->
            </v-row>
            <v-row justify="center" no-gutters>
              <v-spacer />
              <v-col cols="12" md="10">
                <v-text-field
                  label="비밀번호"
                  v-model="payload.pwd"
                  :rules="pwd_rule"
                  class="ma-0 pa-0"
                  variant="underlined"></v-text-field>
              </v-col>
              <v-spacer />
            </v-row>
            <v-row>
              {{ $store.state.login.failLogin }}
            </v-row>
            <v-row>
              <v-spacer />
              <v-col cols="12" md="8">
                <v-btn class="loginBtns" color="grey_light" block type="submit">
                  <span class="text-small">로그인하기</span>
                </v-btn>
              </v-col>
              <v-spacer />
            </v-row>
            <v-row justify="center">
              <!-- 회원가입,비밀번호찾기로 가기 -->
              <div class="text-center mt-16 mb-16">
                <div>
                  <button @click="clickSignUp">
                    <span class="link secondary-color text-small">
                      아직 회원이 아니신가요? 회원가입하기
                    </span>
                  </button>
                </div>
                <div>
                  <button @click="clickFindPwd">
                    <span class="link text-small">
                      비밀번호를 잊어버리셨나요? 비밀번호 찾기
                    </span>
                  </button>
                </div>
              </div>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      payload: {
        email: '',
        pwd: '',
      },
      email_rule: [
        (v) => !!v || '이메일은 필수 입력사항입니다.',
        //v => /^[A-Za-z0-9_\\.\\-]+@[A-Za-z0-9\\-]+\.[A-Za-z0-9\\-]+/.test(v) || '@를 포함한 이메일 형식으로 입력해주세요'
      ],
      pwd_rule: [
        (v) => !!v || '비밀번호는 필수 입력사항입니다.',
        // v => !(!v || v.length < 8 || v.length > 16) || '8~16 자리의 비밀번호를 입력해주세요',
      ],
    };
  },
  methods: {
    doLogin() {
      // 입력형식검사
      this.$refs.form.validate().then((res) => {
        if (res.valid) {
          console.log();
          this.$store.dispatch('doLogin', this.payload);
        }
      });
    },
    clickSignUp() {
      this.$router.push('signUp');
    },
    clickFindPwd() {
      this.$router.push('findPwd');
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
