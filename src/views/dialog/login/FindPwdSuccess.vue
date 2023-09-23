<template>
  <v-dialog class="dialog" v-model="$store.state.just_state.open" width="450">
    <!-- 너버 - 임의로 정함 -->
    <v-card>
      <v-card-title> </v-card-title>

      <v-card-text>
        <v-container>
          <v-spacer style="height: 150px" />
          <v-row justify="center">
            <h3>임시 비밀번호 발송이 완료되었습니다</h3>
          </v-row>
          <v-spacer style="height: 70px" />
          <v-row>
            <div class="grey pr-3 pl-3">
              발송된 이메일 확인 후 임시 비밀번호로 로그인 해주세요.
            </div>
            <div class="grey pr-3 pl-3">
              로그인 후 비밀번호를 변경해 주시길 바랍니다.
            </div>
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
          <v-spacer style="height: 60px" />
        </v-container>
      </v-card-text>

      <v-card-actions> </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      email: '',
    };
  },
  methods: {
    clickLogin() {
      this.$router.push('/loginPage');
    },
  },
};
</script>

<style></style>
