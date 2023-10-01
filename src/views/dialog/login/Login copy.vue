<template>
  <v-dialog class="dialog" width="450" v-model="$store.state.just_state.open">
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
          <h3>로그인</h3>
        </v-row>
        <v-row justify="center" no-gutters style="height: 300px">
          <!-- 로그인 -->
          <div class="text-center">
            <!-- 카카오로그인 -->
            <v-btn
              class="loginBtns"
              color="yellow_kakao"
              block
              @click="kakaoLogin()">
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
              @click="clickLoginByEmail">
              <span class="mr-2">
                <font-awesome-icon icon="fa-solid fa-envelope" size="lg" />
              </span>
              <span class="text-small">이메일로 로그인</span>
            </v-btn>
          </div>
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
        <v-row>
          <button @click="kakaoLogout()">
            <span class="link text-small"> 카카오로그아웃 </span>
          </button>
        </v-row>
        <v-spacer style="height: 200px" />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import loginApi from '@/api/loginApi';
import login from '@/store/modules/login';
export default {
  components: {},
  data() {
    return {};
  },
  methods: {
    clickClose() {
      this.$store.commit('setOpen', false); // 창 닫기
      this.$router.push('/'); // 리다이렉트
    },
    clickLoginByEmail() {
      this.$store.commit('failLogin', '');

      this.$router.push('loginForm');
    },
    clickSignUp() {
      this.$router.push('signUp');
    },
    clickFindPwd() {
      this.$router.push('findPwd');
    },
    // 자바스크립트로 하기
    // kakaoLogin() {
    //   console.log('kakaoLogin');
    //   window.Kakao.Auth.login({
    //     scope: 'profile_image, account_email',
    //     success: this.getKakaoAccount,
    //   });
    // },
    // getKakaoAccount() {
    //   console.log('getKakaoAccount');
    //   window.Kakao.API.request({
    //     url: '/v2/user/me',
    //     success: (res) => {
    //       const kakao_account = res.kakao_account;
    //       console.log('kakao_account', kakao_account);

    //       //로그인처리구현

    //       alert('로그인 성공!');
    //     },
    //     fail: (error) => {
    //       console.log(error);
    //     },
    //   });
    // },
    // kakaoLogout() {
    //   window.Kakao.Auth.logout((res) => {
    //     console.log('kakao logout : ', res);
    //   });
    // },
    kakaoLogin() {
      loginApi
        .kakaologin()
        .then((res) => {
          console.log('kakaologin : ', res.data);
          console.log(res);
          window.location.href = res.data;
          console.log('zzz ', res.data);
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
