<!-- 출력될 댓글 하나하나 -->
<template>
  <v-container>
    <!-- 작성자아바타 및 닉네임, 내용, 삭제버튼 -->
    <v-row no-gutters>
      <!-- 아바타 -->
      <v-col cols="12" md="1" class="mr-3">
        <v-avatar v-if="comment.imgUrl">
          <v-img :src="comment.imgUrl" cover />
        </v-avatar>
        <v-avatar v-if="!comment.imgUrl">
          <v-img src="@/assets/images/profile/profileImage.jpg" cover />
        </v-avatar>
      </v-col>
      <v-spacer />
      <v-col cols="12" md="9">
        <!-- 닉네임 -->
        <v-row class="black semi-bold">{{ comment.writerNick }}</v-row>
        <v-row>
          <div style="word-break: break-all">
            <!-- 부모댓글 닉네임 -->
            <span v-if="comment.parentWriterNick" class="secondary-color mr-2">
              @ {{ comment.parentWriterNick }}
            </span>
            <!-- 내용 -->
            <span>
              {{ comment.context }}
            </span>
          </div>
        </v-row>
      </v-col>
      <!-- 삭제버튼 -->
      <v-col cols="12" md="1">
        <!-- <span class="grey-little-light ml-8 btns">
          <font-awesome-icon icon="fa-solid fa-trash-can" />
        </span> -->
      </v-col>
    </v-row>

    <!-- 답글보기, 답글작성 버튼 -->
    <v-row no-gutters>
      <div class="mt-2">
        <!-- 답글작성 버튼 -->
        <span style="width: 30px">
          <v-btn
            variant="plain"
            @click="writeToggle = !writeToggle"
            color="grey">
            <span> 답글 </span>
          </v-btn>
        </span>

        <!-- 답글보기 버튼 -->
        <v-btn
          v-if="!comment.childVisible && comment.depth === 1"
          @click="showChild"
          class="ml-4 btns"
          variant="plain">
          <span class="secondary-color">
            답글 {{ comment.children.length ? comment.children.length : 0 }}개
          </span>
          <span class="secondary-color ml-1" v-if="comment.children.length > 0">
            <font-awesome-icon class="mt-1" icon="chevron-down" size="xs" />
          </span>
        </v-btn>
        <v-btn
          v-if="comment.childVisible && comment.depth === 1"
          @click="closeChild"
          class="ml-4 btns"
          variant="plain">
          <span class="secondary-color">
            답글 {{ comment.children.length }}개
          </span>
          <span class="secondary-color ml-1" v-if="comment.children.length > 0">
            <font-awesome-icon class="mt-1" icon="chevron-up" size="xs" />
          </span>
        </v-btn>
      </div>
    </v-row>
    <v-row v-if="writeToggle" class="ma-1">
      <CommentForm
        :parent="comment"
        :reviewId="comment.reviewId"
        @replied="getReplied" />
    </v-row>
  </v-container>
</template>

<script>
import CommentForm from './CommentForm.vue';
export default {
  components: {
    CommentForm,
  },
  props: {
    comment: Object,
  },
  mounted() {
    // const toggle = {
    //   reviewId: this.comment.reviewId,
    //   parentId: this.comment.parentId,
    //   commentId: this.comment.id,
    //   bool: false,
    // };
    // console.log(toggle);
    // this.$store.commit('setToggles', toggle);
    // 이미지 출력
    const dirName = this.comment.dirName;
    const fileName = this.comment.fileName;
    const extension = this.comment.extension;
    if (dirName && fileName && extension) {
      const urlfront = 'https://lyd-bucket1.s3.ap-northeast-2.amazonaws.com';
      const imgUrl = `${urlfront}/${dirName}/${fileName}.${extension}`;
      this.comment.imgUrl = imgUrl;
    }
  },
  data() {
    return {
      // 답글작성 토글
      writeToggle: false,
    };
  },
  methods: {
    // 답글 보기
    showChild() {
      const toggle = {
        comment: this.comment,
        bool: true,
      };
      this.$emit('toggle', toggle);
    },
    //답글닫기
    closeChild() {
      const toggle = {
        comment: this.comment,
        bool: false,
      };
      this.$emit('toggle', toggle);
    },
    // 답글작성
    writeChild() {
      const reply = {
        comment: this.comment,
      };
      this.$emit('reply', reply);
      console.log('writeChild');
    },
    getReplied(replied) {
      this.$emit('replied', replied);
    },
  },
};
</script>

<style>
.btns {
  cursor: pointer;
}
</style>
