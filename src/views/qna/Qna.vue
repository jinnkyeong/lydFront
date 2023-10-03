<template>
  <!-- 제목 -->
  <v-row
    justify="center"
    no-gutters
    class="back-primary-color"
    style="height: 400px">
    <v-spacer />
    <v-col cols="12" md="4" align-self="center" class="text-center">
      <h1 class="white">자주묻는질문</h1>
      <p class="white">운영시간 : 평일 오전 11시 ~ 오후 4시 30분</p>
    </v-col>
    <v-spacer />
  </v-row>
  <!-- 카테고리 -->
  <v-spacer style="height: 180px" />
  <v-row>
    <!-- <v-spacer /> -->
    <!-- <v-col cols="12" md="6"> -->
    <v-container>
      <v-row>
        <v-spacer />
        <v-col cols="12" md="10">
          <v-row no-gutters class="text-center" justify="center">
            <v-col
              align-self="center"
              v-for="(cat, i) in cates"
              :key="i"
              cols="12"
              md="4">
              <v-card
                :color="active === cat ? 'primary' : undefined"
                class="cate-box text-regular"
                @click="selectCate(cat)">
                <div>
                  {{ formatCate(cat) }}
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
        <v-spacer />
      </v-row>
    </v-container>
    <!-- </v-col> -->
    <!-- <v-col cols="12" md="2" /> -->
  </v-row>
  <!-- qna -->
  <v-row>
    <v-container>
      <v-row>
        <v-spacer />
        <v-col cols="12" md="10">
          <v-expansion-panels variant="accordion" class="mt-16 mb-16">
            <v-expansion-panel
              v-for="q in qnaList"
              :key="q"
              :title="q.question"
              :text="q.answer" />
          </v-expansion-panels>
        </v-col>
        <v-spacer />
      </v-row>
    </v-container>
  </v-row>
  <v-spacer style="height: 200px" />
</template>

<script>
import faqApi from '@/api/faqApi';
export default {
  created() {
    faqApi
      .getCates()
      .then((res) => {
        console.log(res.data);
        this.cates = res.data;
      })
      .catch((e) => {
        console.log(e);
      });
    this.cate = 1;
    faqApi
      .getFaqsByCate(this.cate)
      .then((res) => {
        console.log(res.data);
        this.qnaList = res.data;
      })
      .catch((e) => {
        console.log(e);
      });
  },
  data() {
    return {
      cates: [],
      cate: null,
      qnaList: [],

      hide: false,
      dd: false,
      active: null,
    };
  },
  methods: {
    formatCate(cateNo) {
      // 1 : 기타
      // 2 : 산책 서비스
      // 3 : 이용요금
      // 4 : 예약 취소 및 변경
      // 5 : 도그워커 지원
      // 6 : 커뮤니티
      switch (cateNo) {
        case 1:
          return '기타';
        case 2:
          return '산책 서비스';
        case 3:
          return '이용요금';
        case 4:
          return '예약 취소 및 변경';
        case 5:
          return '도그워커 지원';
        case 6:
          return '커뮤니티';
        default:
          break;
      }
    },
    selectCate(cateNo) {
      this.active = cateNo; // 색 칠하기 위한
      this.cate = cateNo;
      faqApi
        .getFaqsByCate(this.cate)
        .then((res) => {
          console.log(res.data);
          this.qnaList = res.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>

<style>
.cate-box {
  cursor: pointer;
  width: 180;
  height: 120px;
  padding: 10px;
  padding-top: 40px;
  border: var(--color-light-grey) solid 1px;
}
</style>
