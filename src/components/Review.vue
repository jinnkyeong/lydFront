<template>
  <!-- 리뷰작성자 정보 -->

  <v-container>
    <div class="writer-box">
      <div class="ma-7 pa-3">
        <!-- 닉네임 -->
        <v-row justify-md="center">
          <v-col cols="12" md="1" />
          <v-col cols="12" md="6" align-self="center">
            <div class="text-regular">
              <span class="ml-2"> {{ review.customerNick }} </span>
              <span class="ml-2">고객님</span>
            </div>
          </v-col>
          <v-col cols="12" md="5" align-self="center" />
        </v-row>
        <!-- 산책 대상, 날짜 -->
        <v-row justify="center">
          <v-col cols="12" md="1" />
          <v-col align-self="center">
            <span class="pr-3 grey-little-light">
              <font-awesome-icon icon="fa-solid fa-dog" />
            </span>
            <span
              >{{ review.breed }} ({{ dogTypeConvert(review.dogType) }})</span
            >
          </v-col>
          <v-col align-self="center">
            <span class="pr-3 grey-little-light">
              <font-awesome-icon icon="fa-solid fa-calendar-days" />
            </span>
            <span v-if="review.hour > 0">
              {{ review.month }}월 {{ review.day }}일 {{ review.hour }}시간
              {{ review.min }}분 산책
            </span>
            <span v-if="review.hour <= 0">
              {{ review.month }}월 {{ review.day }}일 {{ review.min }}분 산책
            </span>
          </v-col>
        </v-row>
        <!-- 별점 -->
        <v-row justify="center">
          <v-col cols="12" md="1" />
          <v-col cols="12" md="4" align-self="center">
            <!-- 별점 -->
            <span>
              <v-rating
                :model-value="review.star / 2"
                color="amber"
                density="compact"
                half-increments
                readonly></v-rating>
            </span>
          </v-col>

          <v-spacer></v-spacer>
        </v-row>
      </div>
    </div>
  </v-container>
  <!-- 리뷰내용, 댓글 -->
  <v-container>
    <div class="back-grey-light">
      <!-- 리뷰 이미지 -->
      <v-row>
        <v-col cols="12" md="3">
          <v-img
            :src="review.imgUrl"
            max-height="200px"
            class="pa-5"
            aspect-ratio="4/3"
            cover></v-img>
        </v-col>
      </v-row>
      <!-- 내용 -->
      <v-row>
        <p>
          {{ review.context }}
        </p>
      </v-row>
      <!-- 댓글창 열기버튼 -->
      <v-row justify="end">
        <!-- 댓글창 닫힌 상태 -->
        <div
          v-if="!comment"
          @click="clickComment"
          class="link secondary-color mr-9">
          댓글 {{ review.commentCnt }}
        </div>
        <!-- 댓글창 열린 상태 -->
        <div
          v-if="comment"
          @click="comment = !comment"
          class="link secondary-color mr-9">
          댓글 닫기
        </div>
      </v-row>
      <!-- 댓글 -->
      <v-container v-if="comment">
        <v-row class="ma-1">
          <CommentForm :reviewId="review.reviewId" @replied="getReplied" />
        </v-row>
        <v-row v-for="comment in commentList" :key="comment">
          <CommentList :comment="comment" @replied="getReplied" />
        </v-row>
      </v-container>
    </div>
  </v-container>
</template>

<script>
import reviewApi from '@/api/reviewApi';
import CommentList from '@/components/CommentList.vue';
import CommentForm from './CommentForm.vue';

export default {
  components: {
    CommentList,
    CommentForm,
  },
  mounted() {
    // console.log('review로 들어옴');
    // console.log('this.alarmTargetCmtId', this.alarmTargetCmtId);
    // if (this.alarmTargetCmtId) {
    //   console.log('gogo');
    //   reviewApi
    //     .getCommentsByReviewId(this.review.reviewId)
    //     .then((res) => {
    //       this.commentList = res.data;
    //       this.comment = true; // 댓글창 열기
    //       console.log('this.comment', this.comment);
    //       this.$store.commit('setReviewId', this.review.reviewId);
    //       console.log('this.commentList', this.commentList);
    //       console.log('after : ', this.review);
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //     });
    // }
    // 댓글창 열어놓기 위함
    // reviewDetail에서 reviewid -> review 찾은 후에야 review에서 위의 통신을 해야 하는데, 이 통신이랑 동시에 가는 듯..
  },
  data() {
    return {
      comment: false,
      commentList: [],
    };
  },
  props: {
    review: Object,
    alarmTargetCmtId: String, // 댓글 알람온경우 댓글(부모)번호
  },
  methods: {
    dogTypeConvert(dogTypeCode) {
      if (dogTypeCode) {
        switch (dogTypeCode) {
          case 1:
            return '소형견';
          case 2:
            return '중형견';
          case 3:
            return '대형견';
          case 4:
            return '초대형견';
          default:
            break;
        }
      }
    },
    clickComment() {
      reviewApi
        .getCommentsByReviewId(this.review.reviewId)
        .then((res) => {
          this.commentList = res.data;
          this.comment = true; // 댓글창 열기
          this.$store.commit('setReviewId', this.review.reviewId);
          console.log('this.commentList', this.commentList);
          console.log('after : ', this.review);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getReplied(replied) {
      // 댓,답글 달리면 댓글 리스트 갱신
      if (replied) {
        reviewApi
          .getCommentsByReviewId(this.review.reviewId)
          .then((res) => {
            this.commentList = res.data;
            this.comment = true; // 댓글창 열기
            this.$store.commit('setReviewId', this.review.reviewId);
            console.log('this.commentList', this.commentList);
            console.log('after : ', this.review);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
  },
};
</script>

<style>
/* 리뷰작성자 정보 박스 */
.writer-box {
  border: solid 1px var(--color-light-grey);
}
</style>
