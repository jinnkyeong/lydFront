<template>
  <v-card class="my-12">
    <div class="card ma-3">
      <v-row justify="center">
        <!-- 이미지 -->
        <v-col cols="12" md="4" align-self="center">
          <v-container>
            <v-row justify="center">
              <v-spacer />
              <v-col>
                <v-img
                  v-if="imgUrl"
                  :src="imgUrl"
                  width="200"
                  aspect-ratio="1"
                  max-height="200"
                  style="border-radius: 15px"
                  cover />
                <v-img
                  v-if="!imgUrl"
                  src="@/assets/images/profile/profileImage.jpg"
                  width="200"
                  aspect-ratio="1"
                  max-height="200"
                  style="border-radius: 15px"
                  cover />
              </v-col>
              <v-spacer />
            </v-row>
          </v-container>
        </v-col>
        <!-- 간단한 정보 -->
        <v-col cols="12" md="5" align-self="center">
          <v-container>
            <v-row>
              <span class="pa-1 grey">
                <h3>도그워커</h3>
              </span>
              <span class="pa-1">
                <h3>{{ info.nick }}</h3>
              </span>
            </v-row>
            <v-row class="pt-3 text-regular">
              <span class="pl-2">{{ info.gen === 'm' ? '남성' : '여성' }}</span>
              <span class="pl-2 pr-2"> / </span>
              <span>{{ info.age }} 세</span>
            </v-row>
            <v-row class="text-regular">
              <div
                v-for="(cert, index) in info.certificateKeywords"
                :key="index">
                <div v-if="index == 0 && cert == null">없음</div>
              </div>
              <div class="mt-3 ml-2">
                <span
                  v-for="(cert, index) in info.certificateKeywords"
                  :key="index">
                  <v-chip
                    v-if="cert !== null"
                    class="pr-5 pl-5"
                    color="secondary"
                    variant="outlined"
                    rounded="0"
                    text-color="white">
                    {{ certificateConvert(cert) }}
                  </v-chip>
                </span>
              </div>
            </v-row>
            <v-row no-gutters class="mt-4">
              <v-col cols="12" md="3" align-self="center">
                <span class="text-regular">평균평점</span>
              </v-col>
              <v-col cols="12" md="6" align-self="center">
                <!-- 별점 -->
                <v-rating
                  class="mt-2"
                  :model-value="info.star / 2"
                  color="amber"
                  density="compact"
                  half-increments
                  readonly
                  size="large" />
              </v-col>
              <v-col cols="12" md="2" align-self="center">
                <!-- 별점 수치 -->
                <div>
                  <span class="ml-2 grey">( {{ info.star / 2 }} )</span>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
        <!-- 문의하기 버튼 -->
        <v-col cols="12" md="3" align-self="center">
          <v-container>
            <v-btn
              v-if="info.dogwalkerId != $store.state.login.dwId"
              color="primary"
              size="x-large"
              @click="clickInquiry">
              <span class="white text-regular"> 문의하기 </span>
            </v-btn>
          </v-container>
        </v-col>
      </v-row>
    </div>
  </v-card>
</template>

<script>
export default {
  updated() {
    // 이미지 출력
    const urlfront = 'https://lyd-bucket1.s3.ap-northeast-2.amazonaws.com';
    if (this.info.dirName && this.info.fileName && this.info.extension) {
      this.imgUrl = `${urlfront}/${this.info.dirName}/${this.info.fileName}.${this.info.extension}`;
      console.log('this.imgUrl : ', this.imgUrl);
    }
  },
  props: {
    info: Object,
  },
  data() {
    return {
      imgUrl: null,
    };
  },
  methods: {
    clickInquiry() {
      // 문의하기
      this.$emit('didInquired', true);
    },
    // key -> full name
    certificateConvert(certKey) {
      if (certKey) {
        switch (certKey) {
          case 'dw':
            return '도그워커';
          case 'trn':
            return '훈련사';
          case 'act':
            return '반려동물행동교정사';
          case 'lea':
            return '반려견지도사';
          case 'fun':
            return '반려동물장례지도사';
          case 'bre':
            return '애견브리더';
          case 'lec':
            return '펫시터강사';
          case 'sit':
            return '펫시터';
          case 'mut':
            return '동물매개활동관리사';
          case 'sty':
            return '애견미용사';
          case 'foo':
            return '반려동물식품관리사';

          default:
            break;
        }
      }
    },
  },
};
</script>

<style>
.card {
  display: inline;
}
</style>
