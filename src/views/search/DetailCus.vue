<template>
  <v-container>
    <!-- 상단부(제목,카드) -->
    <!-- 카드 -->
    <v-spacer style="height: 150px" />
    <v-row no-gutters>
      <v-spacer />
      <v-col cols="12" md="9">
        <v-row class="pa-3 round-box" justify="center">
          <!-- 사진 -->
          <v-col cols="12" md="2">
            <!-- 고객 정보 요약 -->
            <span>
              <v-img
                v-if="imgUrl"
                :src="imgUrl"
                width="147"
                aspect-ratio="1"
                style="border-radius: 15px"
                cover></v-img>
              <v-img
                v-if="!imgUrl"
                src="@/assets/images/profile/profileImage.jpg"
                width="147"
                aspect-ratio="1"
                style="border-radius: 15px"
                cover></v-img>
            </span>
          </v-col>
          <!-- 정보 -->
          <v-col cols="12" md="4" align-self="center">
            <div class="mb-4">
              <span class="title-grey"> 의뢰인 </span>
              <span class="title">
                {{ info.nick }}
              </span>
            </div>
            <div>
              <span class="mr-4 mt-2 mb-1">
                <span>{{ info.gen === 'f' ? '여성' : '남성' }}</span>
                <span>/</span>
                <span>{{ info.age }}</span>
              </span>
              <span class="ml-4 mr-2 mb-1">
                <span>{{ info.breed }} ({{ info.dogType }})</span>
              </span>
            </div>
          </v-col>
          <v-spacer />

          <!-- 가격, 매너온도 -->
          <v-col cols="12" md="2" align-self="center">
            <div class="mb-3">
              <span class="black">시간당 </span>
              <span class="secondary-color">
                {{ info.price }}
              </span>
              <span class="black">원</span>
            </div>
            <div class="mt-3">
              <span class="black"> 매너온도 </span>
              <span class="black">
                <font-awesome-icon
                  icon="fa-solid fa-temperature-three-quarters" />
              </span>
              <span class="primary-color ml-2">{{ info.temperture }} 1°C</span>
            </div>
          </v-col>
        </v-row>
      </v-col>
      <v-spacer />

      <!-- </div> -->
    </v-row>
    <v-row no-gutters style="height: 40px"> </v-row>
    <!-- 정보 -->
    <v-row>
      <v-spacer />
      <v-col cols="12" md="10">
        <DetailCus :info="info" />
      </v-col>
      <v-spacer />
    </v-row>
    <!-- 제안하기 버튼 -->
    <v-spacer style="height: 100px" />
    <v-row>
      <v-spacer />
      <v-col cols="12" md="3">
        <v-btn
          v-if="info.customerId != $store.state.login.cusId"
          @click="offer"
          block
          color="primary"
          size="x-large">
          <span class="white text-regular"> 제안하기 </span>
        </v-btn>
      </v-col>
      <v-spacer />
    </v-row>
    <v-spacer style="height: 200px" />
  </v-container>
  <router-view name="dialog" />
</template>

<script>
import searchApi from '@/api/searchApi';
import DetailCus from '@/components/DetailCus.vue';
import commitApi from '@/api/commitApi';
export default {
  components: {
    DetailCus,
  },
  created() {
    //상세보기 데이터 가져오기

    commitApi
      .getCmById(this.$store.state.item.comId)
      .then((res) => {
        console.log('result : ', res.data);
        this.info = res.data;
        this.$store.commit('setItems', res.data);
        // 상세보기에서 DetailDw컴포넌트로 접근하는 경우에만 수정하기 버튼 노출
        this.$store.commit('setExposeMB', true);

        // 이미지 출력
        if (this.info.dirName && this.info.fileName && this.info.extension) {
          const urlfront =
            'https://lyd-bucket1.s3.ap-northeast-2.amazonaws.com';
          this.imgUrl = `${urlfront}/${this.info.dirName}/${this.info.fileName}.${this.info.extension}`;
        }
      })
      .catch((e) => {
        console.log(e);
      });
  },
  data() {
    return {
      info: {},
      imgUrl: '',
    };
  },
  methods: {
    offer() {
      this.$router.push('offer'); // 제안 확인 창으로
      this.$store.commit('setOpen', true);
    },
  },
};
</script>

<style></style>
