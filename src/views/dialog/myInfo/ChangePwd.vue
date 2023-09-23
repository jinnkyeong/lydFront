<template>
  <v-dialog class="dialog" v-model="$store.state.just_state.open" width="700">
    <v-form ref="form" lazy-validation>
      <v-card>
        <v-row class="mt-16 mb-16">
          <v-spacer />
          <v-col cols="12" md="10">
            <v-container>
              <v-row>
                <h3 class="mt-3 mb-6">비밀번호 변경</h3>
              </v-row>
              <v-row>
                <div>
                  <div class="desc">
                    비밀번호 변경 전 현재 비밀번호를 인증해주세요
                  </div>
                  <div class="desc">
                    8~16자의 영문 대/소문자, 숫자, 특수문자 O
                  </div>
                </div>
              </v-row>
              <v-row class="mt-16">
                <v-col cols="12" md="10">
                  <v-text-field
                    class="pa-0 mr-2"
                    v-model="pastPwd"
                    variant="outlined"
                    :rules="pastPwdRules"
                    placeholder="현재 비밀번호 입력"
                    color="grey" />
                </v-col>
                <v-col cols="12" md="2">
                  <v-btn @click="checkPwd" color="primary" style="height: 55px">
                    확인
                  </v-btn>
                </v-col>
              </v-row>
              <v-row>
                <div v-if="checked" class="secondary-color ml-3">
                  비밀번호가 확인되었습니다. 변경할 비밀번호를 입력해주세요.
                </div>
                <div v-if="!checked && checkCnt > 0" class="red ml-3">
                  입력하신 비밀번호가 회원정보와 불일치합니다.
                </div>
              </v-row>
              <v-row>
                <v-col cols="12" md="10">
                  <v-text-field
                    class="pa-0 mr-2"
                    v-model="newPwd"
                    variant="outlined"
                    :rules="newPwdRules"
                    :disabled="disableField()"
                    placeholder="변경할 비밀번호 입력"
                    color="grey" />
                </v-col>
                <v-spacer />
              </v-row>
              <v-row>
                <v-col cols="12" md="10">
                  <v-text-field
                    class="pa-0 mr-2"
                    v-model="newPwd2"
                    variant="outlined"
                    :rules="newPwd2Rules"
                    :disabled="disableField()"
                    placeholder="변경할 비밀번호 재입력"
                    color="grey" />
                </v-col>
                <v-spacer />
              </v-row>
              <v-row>
                <v-col cols="12" md="4">
                  <v-btn
                    @click="changePwd"
                    size="large"
                    block
                    style="height: 60px"
                    color="primary">
                    변경
                  </v-btn>
                </v-col>
                <v-spacer />
                <v-col cols="12" md="4">
                  <v-btn
                    @click="close"
                    size="large"
                    block
                    style="height: 60px"
                    color="grey">
                    취소
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-col>
          <v-spacer />
        </v-row>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
import myInfoApi from '@/api/myInfoApi';
export default {
  data() {
    return {
      pastPwd: '',
      newPwd: '',
      newPwd2: '',
      checked: false,
      checkCnt: 0,
    };
  },
  computed: {
    pastPwdRules() {
      const rules = [];
      const rule1 = (v) => !!v || '이전 비밀번호는 필수 입력사항입니다';
      const rule2 = (v) =>
        !(!v || v.length < 8 || v.length > 16) ||
        '8~16 자리의 비밀번호를 입력해주세요';
      rules.push(rule1);
      // rules.push(rule2);
      return rules;
    },
    newPwdRules() {
      const rules = [];
      const rule1 = (v) => !!v || '새로운 비밀번호는 필수 입력사항입니다';
      const rule2 = (v) =>
        !(!v || v.length < 8 || v.length > 16) ||
        '8~16 자리의 비밀번호를 입력해주세요';
      rules.push(rule1);
      // rules.push(rule2);
      return rules;
    },
    newPwd2Rules() {
      const rules = [];
      const rule1 = (v) => !!v || '새로운 비밀번호는 필수 입력사항입니다';
      const rule2 = (v) =>
        !(!v || v.length < 8 || v.length > 16) ||
        '8~16 자리의 비밀번호를 입력해주세요';
      const rule3 = (v) => this.checkSame(v) || '비밀번호가 일치하지 않습니다';
      rules.push(rule1);
      // rules.push(rule2);
      rules.push(rule3);
      return rules;
    },
  },
  methods: {
    // 비밀번호 확인
    checkPwd() {
      let info = {
        pwd: this.pastPwd,
      };
      if (this.$store.state.login.dwId) {
        info.userType = 'dogwalker';
        info.userId = this.$store.state.login.dwId;
      } else if (this.$store.state.login.cusId) {
        info.userType = 'customer';
        info.userId = this.$store.state.login.cusId;
      }
      this.checkCnt += 1;
      myInfoApi
        .checkPwd(info)
        .then((res) => {
          // true : 비밀번호 일치
          // false : 비밀번호 불일치
          this.checked = res.data;
          console.log('this.checked', this.checked);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    disableField() {
      if (this.checked) {
        return false;
      } else {
        return true;
      }
    },
    // 비밀번호 변경
    changePwd() {
      let info = {
        pwd: this.newPwd,
      };
      if (this.$store.state.login.dwId) {
        info.userType = 'dogwalker';
        info.userId = this.$store.state.login.dwId;
      } else if (this.$store.state.login.cusId) {
        info.userType = 'customer';
        info.userId = this.$store.state.login.cusId;
      }

      this.$refs.form
        .validate()
        .then((res) => {
          if (res.valid) {
            myInfoApi
              .changePwd(info)
              .then((res) => {
                console.log(res.data);
                this.$store.commit('setOpen', false);
              })
              .catch((e) => {
                console.log(e);
              });
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    checkSame() {
      if (this.newPwd == this.newPwd2) {
        return true;
      } else {
        return false;
      }
    },
    close() {
      this.$store.commit('setOpen', false);
    },
  },
};
</script>

<style></style>
