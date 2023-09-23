<template>
  <v-container>
    <v-row>
      <v-spacer />
      <v-col cols="12" md="8">
        <v-container>
          <v-row style="height: 120px"></v-row>
          <!-- title -->
          <v-row>
            <div class="title">기본정보</div>
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
                <v-col align-self="center" cols="12" md="1">
                  <font-awesome-icon
                    @click="modEmail"
                    icon="fa-solid fa-chevron-right"
                    size="2xl"
                    class="mb-5 left-modify" />
                </v-col>
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
          <!-- passed
          <v-row>
            <div class="highlight">도그워커 합격여부 확인</div>
          </v-row> -->
          <!-- title -->
          <v-row class="mt-16 pt-16">
            <div class="title">보안</div>
          </v-row>
          <!-- pwd -->
          <v-row class="mt-16">
            <v-col cols="12" md="4">
              <span class="ma-3">비밀번호 변경</span>
              <span>
                <font-awesome-icon icon="fa-solid fa-key" size="lg" />
              </span>
            </v-col>
            <v-spacer />
            <v-col cols="12" md="2">
              <v-btn @click="modPwd">변경</v-btn>
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
      .getProfileByCusId(this.$store.state.login.cusId)
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
      this.$router.push('/cusInfo/cusInfoMod');
    },
    modEmail() {},
    modPhone() {},
    modPwd() {},
  },
};
</script>

<style>
.profileImage {
  cursor: pointer;
}
</style>
