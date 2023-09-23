<template>
  <v-dialog class="dialog" v-model="$store.state.just_state.open" width="450">
    <!-- 너버 - 임의로 정함 -->
    <v-card>
      <v-card-title> </v-card-title>

      <v-card-text>
        <v-container>
          <v-spacer style="height: 150px" />
          <v-row justify="center">
            <h3>회원가입이 완료되었습니다</h3>
          </v-row>
          <v-spacer style="height: 100px" />

          <v-row>
            <v-spacer />
            <v-col cols="12" md="8">
              <v-btn
                class="loginBtns"
                color="grey_light"
                block
                @click="clickLogin">
                <span>로그인하기</span>
              </v-btn>
            </v-col>
            <v-spacer />
          </v-row>
          <v-spacer style="height: 100px" />
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  methods: {
    clickLogin() {
      //this.$emit('login', true)
      this.$router.push('/loginPage');
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
