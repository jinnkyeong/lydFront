<template>
  <v-container>
    <!-- 상단부(제목,카드) -->

    <!-- 카드 -->
    <v-row>
      <v-spacer />
      <v-col cols="12" md="10">
        <CardDw :info="info" @didInquired="inquire" />
      </v-col>
      <v-spacer />
    </v-row>

    <v-row no-gutters style="height: 40px" />

    <!-- 정보 -->
    <v-row>
      <v-spacer />
      <v-col cols="12" md="10">
        <DetailDw :info="info" :reviewList="reviewList" />
      </v-col>
      <v-spacer />
    </v-row>
    <v-row no-gutters style="height: 40px" />
    <!--공백 용도-->
    <v-row justify="center" />
  </v-container>
  <router-view name="dialog" />
</template>

<script>
import searchApi from '@/api/searchApi';
import reviewApi from '@/api/reviewApi';
import CardDw from '@/components/CardDw';
import DetailDw from '@/components/DetailDw.vue';
export default {
  components: {
    CardDw,
    DetailDw,
  },
  created() {
    //도그워커 상세보기
    // applicaiton id -> application
    searchApi
      .getApp(this.$store.state.item.appId)
      .then((res) => {
        this.info = res.data;
        this.$store.commit('setItems', res.data); // 도그워커 정보 올려놓음
        this.$store.commit('setTempId', res.data.dogwalkerId); // 리뷰용
        console.log('getApp 결과 ', res.data);

        // 상세보기에서 DetailDw컴포넌트로 접근하는 경우에만 수정하기 버튼 노출
        this.$store.commit('setExposeMB', true);
      })
      .catch((e) => {
        console.log(e);
      });
    // dogwalker id -> review list
    console.log('tempid : ', this.$store.state.item.tempId);
    reviewApi
      .getReviewsByDwId(this.$store.state.item.tempId) // dogwalker id
      .then((res) => {
        this.reviewList = res.data;
        console.log('getReviewsByDwId 결과 ', res.data);
        for (let i = 0; i < this.reviewList.length; i++) {
          const dirName = this.reviewList[i].dirName;
          const fileName = this.reviewList[i].fileName;
          const extension = this.reviewList[i].extension;
          if (dirName && fileName && extension) {
            const urlfront =
              'https://lyd-bucket1.s3.ap-northeast-2.amazonaws.com';
            const imgUrl = `${urlfront}/${dirName}/${fileName}.${extension}`;
            this.reviewList[i].imgUrl = imgUrl;
          }
        }
      })
      .catch((e) => {
        console.log(e);
      });
  },

  data() {
    return {
      info: {
        locations: [
          {
            state: '',
            town: '',
          },
        ],
        name: '',
        nick: '',
        sentence: '',
        gen: '',
        age: null,
        addrState: '',
        addrTown: '',
        certificatesNames: [],
        weekdayNames: [],
        adopted: true,
        adoptedWhich: null,
        adoptedMonth: null,
        petType: null,
        price: null,
      },
      reviewList: [],
    };
  },
  methods: {
    // 문의하기
    inquire(didInquired) {
      if (didInquired) {
        // 문의하기 click
        // 문의 창으로
        this.$router.push('inquiry');
        this.$store.commit('setOpen', true);
      }
    },
  },
};
</script>

<style></style>
