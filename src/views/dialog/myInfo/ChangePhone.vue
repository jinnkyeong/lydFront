<template>
  <v-dialog class="dialog" v-model="$store.state.just_state.open" width="700">
    <v-form ref="form" lazy-validation>
      <v-card>
        <v-row class="mt-16 mb-16">
          <v-spacer />
          <v-col cols="12" md="10">
            <v-container>
              <v-row>
                <h3 class="mt-3 mb-6">
                  전화번호 수정을 위해서 인증절차가 필요합니다
                </h3>
              </v-row>
              <v-row class="mt-16">
                <v-col cols="12" md="10">
                  <v-text-field
                    class="pa-0 mr-2"
                    v-model="newPhone"
                    variant="outlined"
                    :rules="phoneRules"
                    placeholder="변경할 휴대폰 번호 입력"
                    color="grey" />
                </v-col>
                <v-col cols="12" md="2">
                  <v-btn @click="getCode" color="primary" style="height: 55px">
                    확인
                  </v-btn>
                </v-col>
              </v-row>
              <v-row>
                <div v-if="postCnt" class="secondary-color ml-3">
                  인증번호가 발송되었습니다. 문자 확인 후 인증번호를
                  입력해주세요.
                </div>
              </v-row>
              <v-row>
                <v-col cols="12" md="10">
                  <v-text-field
                    class="pa-0 mr-2"
                    v-model="authCode"
                    variant="outlined"
                    :rules="authCodeRules"
                    placeholder="인증번호 입력"
                    color="grey" />
                </v-col>
                <!-- <v-spacer /> -->
                <v-col cols="12" md="2">
                  <div
                    v-if="createdCode && authCode && createdCode == authCode"
                    class="secondary-color mt-3 ml-4">
                    <font-awesome-icon
                      icon="fa-solid fa-circle-check"
                      size="lg" />
                  </div>
                  <div
                    v-if="createdCode && authCode && createdCode != authCode"
                    class="grey-little-light mt-3 ml-4">
                    <font-awesome-icon
                      icon="fa-solid fa-circle-check"
                      size="lg" />
                  </div>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" md="4">
                  <v-btn
                    @click="changePhone"
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
      newPhone: '', // 새로운 전화번호
      postCnt: 0, // 인증번호 발송 횟수
      authCode: '', // 인증번호
      // newPwd: '',
      // newPwd2: '',
      // checked: false,
      // checkCnt: 0,
      createdCode: '',
    };
  },
  computed: {
    phoneRules() {
      const rules = [];
      const rule1 = (v) => !!v || '변경할 전화번호는 필수 입력사항입니다';
      const rule2 = (v) => /^[0-9]{9,11}$/.test(v) || '숫자로만 입력해주세요';
      rules.push(rule1);
      rules.push(rule2);
      return rules;
    },
    authCodeRules() {
      const rules = [];
      const rule1 = (v) => !!v || '이전 비밀번호는 필수 입력사항입니다';
      const rule2 = (v) =>
        /^[0-9]+$/.test(v) || '인증번호는 숫자로만 입력해주세요';
      rules.push(rule1);
      rules.push(rule2);
      return rules;
    },
  },
  methods: {
    // 인증번호 받기
    getCode() {
      this.createdCode = Math.floor(Math.random() * (9999 - 1001)) + 1000; // 1000~9999 사이
      console.log(this.newPhone + ' ' + this.createdCode);
      let info = {
        content: this.createdCode,
        to: this.newPhone,
      };
      this.postCnt += 1;
      myInfoApi
        .getCode(info)
        .then((res) => {
          console.log(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    // 비밀번호 변경
    changePhone() {
      if (this.createdCode == this.authCode) {
        // 인증번호가 맞는 경우
        let info = {
          phone: this.newPhone,
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
                .changePhone(info)
                .then((res) => {
                  console.log('비밀번호 변경 성공', res.data);
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
      } else {
        // 인증번호가 틀린 경우
      }
    },

    close() {
      this.$store.commit('setOpen', false);
    },
  },
};
</script>

<style></style>
