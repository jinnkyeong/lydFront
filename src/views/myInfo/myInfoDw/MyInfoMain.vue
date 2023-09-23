<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="11">
        <v-container>
          <v-row style="height: 50px"></v-row>
          <!-- title -->
          <v-row>
            <div class="title">기본정보 / 보안</div>
          </v-row>
          <!-- avartar -->
          <v-row justify="center" class="ma-10">
            <v-avatar class="profileImage" size="200px" @click="modProfile">
              <v-img v-if="imgUrl" :src="imgUrl" cover></v-img>
              <span v-if="!imgUrl" class="text-h5">LYD</span>
            </v-avatar>
          </v-row>
          <!-- nick -->
          <v-row>
            <v-container>
              <v-row class="mt-16" no-gutters>
                <v-col cols="12" md="11">
                  <v-field-label ref_for="info.nick">닉네임</v-field-label>
                  <v-text-field
                    :model-value="info.nick"
                    variant="underlined"
                    readonly></v-text-field>
                </v-col>
                <v-col align-self="center" cols="12" md="1">
                  <font-awesome-icon
                    @click="modProfile"
                    icon="fa-solid fa-chevron-right"
                    size="2xl"
                    class="mb-5 left-modify" />
                </v-col>
              </v-row>
            </v-container>
          </v-row>
          <!-- email -->
          <v-row>
            <v-container>
              <v-row class="mt-16" no-gutters>
                <v-col cols="12" md="11">
                  <v-field-label ref_for="info.email">이메일</v-field-label>
                  <v-text-field
                    :model-value="info.email"
                    variant="underlined"
                    readonly></v-text-field>
                </v-col>
                <v-col align-self="center" cols="12" md="1"> </v-col>
              </v-row>
            </v-container>
          </v-row>
          <!-- phone -->
          <v-row>
            <v-container>
              <v-row class="mt-16" no-gutters>
                <v-col cols="12" md="11">
                  <v-field-label ref_for="info.phone"
                    >휴대폰 번호</v-field-label
                  >
                  <v-text-field
                    :model-value="info.phone"
                    variant="underlined"
                    readonly></v-text-field>
                </v-col>
                <v-col align-self="center" cols="12" md="1">
                  <font-awesome-icon
                    @click="modPhone"
                    icon="fa-solid fa-chevron-right"
                    size="2xl"
                    class="mb-5 left-modify" />
                </v-col>
              </v-row>
            </v-container>
          </v-row>
          <v-row>
            <div @click="checkPassed" class="secondary-color link ml-4">
              도그워커 합격여부 확인
            </div>
          </v-row>
          <!-- title -->
          <v-row class="mt-16 pt-16">
            <div class="title">보안</div>
          </v-row>
          <!-- pwd -->
          <v-row class="mt-16">
            <v-col cols="12" md="4">
              <span class="ma-3">비밀번호 변경</span>
            </v-col>
            <v-spacer />
            <v-col cols="12" md="1">
              <span class="link grey" @click="modPwd">
                <font-awesome-icon icon="fa-solid fa-key" size="xl" />
              </span>
            </v-col>
          </v-row>
          <v-row style="height: 120px"></v-row>
        </v-container>
      </v-col>
      <v-spacer />
    </v-row>
  </v-container>
  <router-view name="dialog" />
</template>

<script>
import myInfoApi from '@/api/myInfoApi';
export default {
  created() {
    myInfoApi
      .getProfileByDwId(this.$store.state.login.dwId)
      .then((res) => {
        console.log(res.data);
        this.info = res.data;
        // 이미지 출력
        const urlfront = 'https://lyd-bucket1.s3.ap-northeast-2.amazonaws.com';
        this.imgUrl = `${urlfront}/${this.info.dirName}/${this.info.fileName}.${this.info.extension}`;
      })
      .catch((e) => {
        console.log(e);
      });
  },
  data() {
    return {
      info: {
        nick: '',
        email: '',
        phone: '',
      },
      imgUrl: '',
    };
  },
  methods: {
    modProfile() {
      this.$router.push('/dwInfo/dwInfoMod');
    },
    modPhone() {
      this.$store.commit('setOpen', true);
      this.$router.push('/dwInfo/changePhone');
    },
    modPwd() {
      this.$store.commit('setOpen', true);
      this.$router.push('/dwInfo/changePwd');
    },
    checkPassed() {
      this.$router.push({
        path: '/dwInfo/passed',
        query: { passed: this.info.passed },
      });
    },
  },
};
</script>

<style>
.profileImage {
  cursor: pointer;
}
</style>
