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
            <v-avatar
              v-if="imgUrl && !fileArray[0]"
              size="200px"
              @click="modProfile">
              <v-img :src="preview" cover></v-img>
            </v-avatar>

            <v-avatar
              v-if="imgUrl && fileArray[0]"
              size="200px"
              @click="modProfile">
              <v-img :src="preview" cover></v-img>
            </v-avatar>

            <v-avatar v-if="!imgUrl && !fileArray[0]" size="200px">
              <v-img src="@/assets/images/profile/profileImage.jpg" cover />
            </v-avatar>

            <v-avatar
              v-if="!imgUrl && fileArray[0]"
              size="200px"
              @click="modProfile">
              <v-img :src="preview" cover></v-img>
            </v-avatar>
          </v-row>
          <v-row>
            <v-file-input
              v-model="fileArray"
              @change="previewFile(fileArray[0])"
              chips
              label="인증사진 업로드"></v-file-input>
          </v-row>
          <!-- nick -->
          <v-row>
            <v-container>
              <v-row class="mt-16" no-gutters>
                <v-field-label ref_for="info.nick">닉네임</v-field-label>
                <v-text-field
                  v-model="info.nick"
                  variant="underlined"></v-text-field>
              </v-row>
            </v-container>
          </v-row>
          <!-- 프로필 메세지 -->
          <v-row>
            <v-container>
              <v-row class="mt-16" no-gutters>
                <v-col cols="12" md="11">
                  <v-field-label ref_for="info.email">
                    <span> 프로필 메세지 </span>
                  </v-field-label>
                  <v-textarea
                    class="ma-0 pa-0"
                    no-resize
                    rows="3"
                    v-model="info.profileMessage" />
                </v-col>
              </v-row>
            </v-container>
          </v-row>
          <!-- 수정버튼 -->
          <v-row>
            <v-spacer />
            <v-col cols="12" md="3">
              <ConfirmMod @mod="doModify" />
            </v-col>
            <v-spacer />
          </v-row>
        </v-container>
      </v-col>
      <v-spacer />
    </v-row>
  </v-container>
</template>

<script>
import myInfoApi from '@/api/myInfoApi';
import ConfirmMod from '@/views/dialog/confirm/ConfirmMod.vue';
export default {
  components: {
    ConfirmMod,
  },
  created() {
    myInfoApi
      .getProfileByDwId(this.$store.state.login.dwId)
      .then((res) => {
        console.log(res.data);
        this.info = res.data;
        // 이미지 출력
        const urlfront = 'https://lyd-bucket1.s3.ap-northeast-2.amazonaws.com';
        if (this.info.dirName && this.info.fileName && this.info.extension) {
          this.imgUrl = `${urlfront}/${this.info.dirName}/${this.info.fileName}.${this.info.extension}`;
        }
        if (this.imgUrl != null) {
          this.preview = this.imgUrl;
        }
      })
      .catch((e) => {
        console.log(e);
      });
  },
  data() {
    return {
      info: {},

      fileArray: [],
      preview: '',
      imgUrl: '',
    };
  },
  methods: {
    // 이미지 미리보기
    previewFile(file) {
      console.log(file);
      // 이미지 업로드 전 미리보기
      const fileData = (data) => {
        this.preview = data;
      };

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.addEventListener(
        'load',
        function () {
          fileData(reader.result);
        },
        false
      );
    },
    // 수정하기
    doModify(mod) {
      this.info.id = this.$store.state.login.dwId;
      this.info.dirName = 'dwProfile';
      console.log('수정 전 :', this.info);
      if (mod) {
        myInfoApi
          .postModifyProfile(this.fileArray, this.info)
          .then((res) => {
            console.log(res.data);
            this.info = res.data;
            this.$router.push('/dwInfo');
            this.$store.commit('setUserImgUrl', res.data);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
  },
  watch: {
    fileArray() {
      if (this.fileArray[0]) {
        this.preview = this.fileArray[0];
      } else {
        console.log('this.filearrya : ', this.fileArray);
        this.fileArray = [];
        this.imgUrl = '';
      }
    },
  },
};
</script>

<style></style>
