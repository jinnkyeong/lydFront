<template>
  <!-- 댓글 text field (최상위) -->
  <comment-form />
  <!-- 최상위 댓글(depth 1) -->
  <v-row v-for="(comment, i) in commentList" :key="i">
    <v-col>
      <v-row v-if="comment.depth === 1" justify="end">
        <Comment :comment="comment" @toggle="getToggle" @reply="getReply" />
      </v-row>

      <!-- {{ comment.children }} -->
      <!-- 대댓글  -->
      <v-row v-for="(child, i) in comment.children" :key="i">
        <v-spacer v-if="comment.childVisible" />
        <v-col cols="12" md="11" v-if="comment.childVisible">
          <Comment
            v-if="child.children.length === 0"
            :comment="child"
            @toggle="getToggle"
            @reply="getReply" />
          <CommentList
            v-if="child.children.length > 0"
            :commentList="child.children" />
        </v-col>
        <!-- 답글 text field -->
        <v-container class="ma-0">
          <v-row>
            <v-spacer />
            <!-- v-if="child.id === replyComment.id" -->
            <v-col cols="12" md="10">
              <!-- v-if="child && child.id === replyCommentId" -->
              <comment-form :parent="comment" />
            </v-col>
          </v-row>
        </v-container>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import reviewApi from '@/api/reviewApi';
import Comment from '@/components/CommentTemp.vue';
import CommentForm from './CommentFormTemp.vue';
import CommentList from './CommentListTemp.vue';

export default {
  components: {
    Comment,
    CommentForm,
    CommentList,
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
    commentList: Array,
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
    // writeComment() {
    //   let info = {
    //     parentId: 0,
    //     context: this.newComment,
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
      if (toggle.comment.depth === 1) {
        for (let i = 0; i < this.commentList.length; i++) {
          if (this.commentList[i].id === toggle.comment.id) {
            if (toggle.bool) {
              this.commentList[i].childVisible = true;
            } else {
              this.commentList[i].childVisible = false;
            }
          }
        }
      }
      // console.log('getToggle결과 ', this.commentList);
    },
    getReply(reply) {
      this.replyCommentId = reply.comment.id;
      console.log('this.replyComment,', this.replyCommentId);
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
    },
  },
};
</script>

<style></style>
