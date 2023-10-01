<template>
  <v-container>
    <!-- 댓글 -->
    <v-row>
      <Comment
        :comment="comment"
        @toggle="getToggle"
        @reply="getReply"
        @replied="getReplied" />
    </v-row>
    <!-- <v-divider /> -->
    <!-- 대댓글 -->
    <v-row v-if="comment.childVisible">
      <v-spacer v-if="comment.depth === 1" />
      <v-col cols="12" md="11">
        <Comment
          v-for="desc in comment.descendants"
          :key="desc"
          :comment="desc"
          @replied="getReplied">
        </Comment>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import reviewApi from '@/api/reviewApi';
import Comment from '@/components/Comment.vue';

export default {
  components: {
    Comment,
  },
  created() {
    this.reviewId = this.$store.state.item.reviewId;
  },

  data() {
    return {
      reviewId: null,
      // 이차원배열 childCommentList[parentId,i]
      childCommentList: [],
      // 답글열기 닫기 용도 toggelList[parentId] = true false
      toggelList: [],
      newComment: '',
      newChildComments: [], // index = parentid, value =  childcomment

      replyCommentId: 0,
    };
  },
  props: {
    comment: Object,
    children: Array,
  },
  methods: {
    // showChild(reviewId, parentId) {
    // reviewApi
    //   .getCommentsByReviewIdAndParentId(reviewId, parentId)
    //   .then((res) => {
    //     this.childCommentList[parentId] = res.data;
    //     this.toggelList[parentId] = true;
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
    // },
    closeChild(parentId) {
      this.childCommentList[parentId] = null;
      this.toggelList[parentId] = false;
    },

    // writeChildComment(parentId) {
    //   let info = {
    //     parentId: parentId,
    //     context: this.newChildComments[parentId],
    //     reviewId: this.reviewId,
    //   };
    //   if (this.$store.state.login.dwId && !this.$store.state.login.cusId) {
    //     info.dogwalkerId = this.$store.state.login.dwId;
    //   } else {
    //     info.customerId = this.$store.state.login.cusId;
    //   }
    //   reviewApi
    //     .postComment(info)
    //     .then((res) => {
    //       console.log(res.data);
    //       // this.$router.go(0);
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //     });
    // },
    // toggle열고 닫힘 -> 각 comment에 속성으로 넣어주기
    getToggle(toggle) {
      if (toggle.bool) {
        this.comment.childVisible = true;
      } else {
        this.comment.childVisible = false;
      }

      // console.log('getToggle결과 ', this.commentList);
    },
    // getReplied(replied) {
    // state.reply = replied;
    // this.replyCommentId = reply.comment.id;
    // console.log('this.replyComment,', this.replyCommentId);
    // for (let i = 0; i < this.commentList.length; i++) {
    //   for (let j = 0; j < this.commentList[i].length; j++) {
    //     if (this.commentList[i][j].id === reply.comment.id) {
    //       if (this.commentList[i][j].reply != null) {
    //         this.commentList[i][j].reply = !this.commentList[i][j].reply;
    //         break;
    //       } else {
    //         this.commentList[i][j].reply = true;
    //         break;
    //       }
    //     }
    //   }
    // }
    // console.log('getReply ', this.commentList);
    // },
    getReplied(replied) {
      this.$emit('replied', replied);
    },
  },
};
</script>

<style></style>
