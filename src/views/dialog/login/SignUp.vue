<template>
  <v-dialog class="dialog" v-model="$store.state.just_state.open" width="450">
    <!-- 너버 - 임의로 정함 -->
    <v-card>
      <v-card-title>
        <v-row no-gutters style="height: 20px">
          <v-col align-self="start" cols="12" md="1" sm="1">
            <!-- 뒤로가기 버튼(이메일로 회원가입,로그인만) -->
            <!-- <button @click="goBack">
              <font-awesome-icon icon="fa-solid fa-chevron-left" />
            </button> -->
          </v-col>
          <v-col align-self="center" cols="12" md="10" sm="10"> </v-col>
          <v-col align-self="end" cols="12" md="1" sm="1">
            <!-- 나가기 버튼 -->
            <button @click="clickClose">
              <font-awesome-icon icon="fa-solid fa-xmark" />
            </button>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text>
        <v-row justify="center" no-gutters style="height: 40px"> </v-row>
        <v-row justify="center" no-gutters style="height: 60px">
          <h3>회원가입</h3>
        </v-row>
        <v-row justify="center" no-gutters style="height: 400px">
          <!-- 로그인 -->
          <div class="text-center">
            <!-- 카카오로그인 -->
            <v-btn class="loginBtns" color="yellow_kakao" block>
              <span class="mr-2">
                <font-awesome-icon icon="fa-solid fa-message" size="lg" />
              </span>
              <span class="text-small">카카오로 로그인</span>
            </v-btn>
            <!-- 네이버로그인 -->
            <v-btn class="loginBtns" color="green_naver" block>
              <span class="mr-2">
                <font-awesome-icon
                  icon="fa-solid fa-n"
                  size="lg"
                  style="color: #fff" />
              </span>
              <span class="text-small">네이버로 로그인</span>
            </v-btn>
            <!-- 구글로그인 -->
            <v-btn class="loginBtns" block>
              <span class="mr-2">
                <font-awesome-icon
                  icon="fa-solid fa-g"
                  size="lg"
                  style="color: #511f3a" />
              </span>
              <span class="text-small">구글로 로그인</span>
            </v-btn>
            <!-- <v-checkbox label="로그인 상태 유지"></v-checkbox> -->
            <v-btn
              class="loginBtns"
              color="grey_light"
              block
              @click="clickSignUpByEmail">
              <span class="mr-2">
                <font-awesome-icon icon="fa-solid fa-envelope" size="lg" />
              </span>
              <span class="text-small">이메일로 회원가입</span>
            </v-btn>
          </div>
          <!-- 회원가입,비밀번호찾기로 가기 -->
          <div class="text-center mt-16 mb-16">
            <div>
              <button @click="clickLogin">
                <span class="link secondary-color text-small">
                  이미 회원이신가요? 로그인 하기
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
        <v-spacer style="height: 80px" />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      signUpByEmail: false,
    };
  },
  methods: {
    clickSignUpByEmail() {
      //this.$emit('signUpByEmail', true)
      this.$router.push('signUpForm');
    },
    clickLogin() {
      //this.$emit('login', true)
      this.$router.push('/loginPage');
    },
    clickFindPwd() {
      //this.$emit('findPwd', true)
      this.$router.push('findPwd');
    },
  },
};
</script>

<style></style>
