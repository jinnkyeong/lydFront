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
    };
  },
  props: {
    comment: Object,
    children: Array,
  },
  methods: {
    closeChild(parentId) {
      this.childCommentList[parentId] = null;
      this.toggelList[parentId] = false;
    },
    // toggle열고 닫힘 -> 각 comment에 속성으로 넣어주기
    getToggle(toggle) {
      if (toggle.bool) {
        this.comment.childVisible = true;
      } else {
        this.comment.childVisible = false;
      }
    },
    getReplied(replied) {
      this.$emit('replied', replied);
    },
  },
};
</script>

<style></style>
