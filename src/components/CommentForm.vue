<!-- 답글 작성 텍스트필드 -->
<template>
  <v-row no-gutters>
    <v-col cols="12" md="10" align-self="center">
      <v-text-field
        class="pa-0 mr-2"
        v-model="context"
        variant="solo"
        density="compact"
        color="grey"
        :placeholder="placeholder" />
    </v-col>
    <v-col cols="12" md="2" align-self="start">
      <v-btn
        @click="writeComment()"
        color="primary"
        style="height: 42px"
        :disabled="disableBtn()">
        <span> 작성 </span>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import reviewApi from '@/api/reviewApi';

export default {
  props: {
    parent: Object, // 부모 댓글
    reviewId: Number,
  },
  data() {
    return {
      context: '',
      placeholder: '',
    };
  },
  mounted() {
    if (!this.parent) {
      // 최상위 댓글 작성
      this.placeholder = '댓글 작성';
    } else {
      // 답글작성
      this.placeholder = '답글 작성';
    }
  },
  methods: {
    writeComment() {
      const info = {
        context: this.context,
        reviewId: this.reviewId,
      };
      if (!this.parent) {
        info.parentId = null;
      } else {
        info.parentId = this.parent.id;
      }
      if (this.$store.state.login.dwId && !this.$store.state.login.cusId) {
        info.dogwalkerId = this.$store.state.login.dwId;
      } else {
        info.customerId = this.$store.state.login.cusId;
      }
      reviewApi
        .postComment(info)
        .then((res) => {
          console.log(res.data);
          // this.$store.commit('setReply', true);
          // this.forceUpdate();
          this.$emit('replied', true);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    disableBtn() {
      if (!this.context) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style></style>
