<template>
  <!-- 더보기 버튼 -->
  <div class="link" @click="clickMore">
    <span> 작성된 리뷰 {{ reviewCnt }} 개 </span>
    <span>
      <font-awesome-icon icon="fa-solid fa-chevron-right " />
    </span>
  </div>
  <!-- 지원서 모달 -->
  <v-dialog v-model="wantMore" class="dialog">
    <v-card class="pa-16">
      <div class="title">
        <span class="secondary-color">{{ dogwalkerNick }}</span>
        <span> 님에게 작성된 리뷰 </span>
      </div>
      <div class="mt-5 desc">리뷰 {{ reviewCnt }}</div>
      <v-divider class="mb-10" />
      <v-row>
        <v-row justify="center">
          <v-col cols="12" md="6" v-for="r in reviewList" :key="r">
            <div @click="selectReview(r)">
              <ReviewPreview :review="r" />
            </div>
          </v-col>
        </v-row>
      </v-row>
      <v-spacer style="height: 50px" />
    </v-card>
  </v-dialog>
</template>

<script>
import reviewApi from '@/api/reviewApi';
import ReviewPreview from '@/components/ReviewPreview.vue';

export default {
  props: {
    dogwalkerNick: String,
  },
  components: {
    ReviewPreview,
  },
  created() {
    reviewApi
      .getReviewsByDwId(this.$store.state.item.userInfo.userId) // dogwalker id
      .then((res) => {
        this.reviewList = res.data;
        this.reviewCnt = this.reviewList.length;
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
      wantMore: false,
      reviewList: [],
      reviewCnt: 0,
    };
  },
  methods: {
    clickMore() {
      this.wantMore = true;
    },
    selectReview(review) {
      this.$store.commit('setReview', review);
      this.$router.push('/reviewDetail');
    },
  },
};
</script>

<style></style>
