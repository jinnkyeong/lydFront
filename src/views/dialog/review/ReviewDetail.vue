<template>
  <!-- <v-dialog
    v-model="$store.state.just_state.open"
    class="dialog"
    width="1000px">
    <v-card> -->
  <Review :review="review" :alarmTargetCmtId="$route.query.parentCommentId" />
  <!-- {{ review }} -->
  <!-- </v-card>
  </v-dialog> -->
</template>

<script>
import Review from '@/components/Review.vue';
import reviewApi from '@/api/reviewApi';
export default {
  components: {
    Review,
  },
  created() {
    this.review = this.$store.state.item.review;
    console.log('reviewdetail로들어옴');
    // console.log('reviewdetail review : ', this.$route.query.review);
    // 여기서 통신해서 세팅하려고 하면 늦나봄.. 계속 null나옴
    // reviewApi
    //   .findReviewById(this.$store.state.item.reviewId)
    //   .then((res) => {
    //     console.log('findReviewById', res.data);
    //     this.review = res.data;
    //   })
    //   .catch((e) => console.log(e));
  },
  mounted() {
    reviewApi
      .findReviewById(this.$store.state.item.reviewId)
      .then((res) => {
        console.log('findReviewById', res.data);
        this.review = res.data;
        const dirName = this.review.dirName;
        const fileName = this.review.fileName;
        const extension = this.review.extension;
        if (dirName && fileName && extension) {
          const urlfront =
            'https://lyd-bucket1.s3.ap-northeast-2.amazonaws.com';
          const imgUrl = `${urlfront}/${dirName}/${fileName}.${extension}`;
          this.review.imgUrl = imgUrl;
        }
      })
      .catch((e) => console.log(e));
  },
  // updated() {
  //   reviewApi
  //     .findReviewById(this.$store.state.item.reviewId)
  //     .then((res) => {
  //       console.log('findReviewById', res.data);
  //       this.review = res.data;
  //     })
  //     .catch((e) => console.log(e));
  // },
  data() {
    return {
      review: null,
    };
  },
};
</script>

<style></style>
