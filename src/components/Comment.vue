<!-- 출력될 댓글 하나하나 -->
<template>
  <v-container class="ma-1">
    <!-- 작성자아바타 및 닉네임, 내용, 삭제버튼 -->
    <v-row no-gutters>
      <!-- 아바타 -->
      <v-col cols="12" md="1" class="ml-3 mt-1">
        <v-avatar v-if="comment.imgUrl" @click="clickWriter">
          <v-img :src="comment.imgUrl" cover />
        </v-avatar>
        <v-avatar v-if="!comment.imgUrl" @click="clickWriter">
          <v-img src="@/assets/images/profile/profileImage.jpg" cover />
        </v-avatar>
      </v-col>
      <v-spacer />
      <v-col cols="12" md="9">
        <!-- 닉네임 -->
        <v-row @click="clickWriter" class="black semi-bold mt-1">{{
          comment.writerNick
        }}</v-row>
        <v-row>
          <div style="word-break: break-all">
            <!-- 부모댓글 닉네임 -->
            <span
              @click="clickParentWriter"
              v-if="comment.depth > 2 && comment.parentWriterNick"
              class="secondary-color mr-2">
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
    <!-- 대댓글 작성( + 대대댓글...) -->
    <v-row v-if="writeToggle" class="ma-1">
      <CommentForm
        :parent="comment"
        :reviewId="comment.reviewId"
        @replied="getReplied" />
    </v-row>
    <v-divider />
  </v-container>
</template>

<script>
import CommentForm from './CommentForm.vue';
import reviewApi from '@/api/reviewApi';
export default {
  components: {
    CommentForm,
  },
  props: {
    comment: Object,
  },
  mounted() {
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
      // 임시
      reviewApi
        .getCommentsByAncestorIdAndReviewId(
          this.comment.id, // ancestorId
          this.comment.reviewId
        )
        .then((res) => {
          console.log('getCommentsByAncestorIdAndReviewId결과! : ', res.data);
          this.comment.descendants = res.data;
        })
        .catch((e) => {
          console.log(e);
        });

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
    // 작성자 정보로 가기
    clickParentWriter() {
      // @부모댓글작성자
      const userInfo = {
        userId: this.comment.parentWriterId,
        userType: this.comment.parentWriterType,
      };
      this.$store.commit('setUserInfo', userInfo);
      if (this.comment.parentWriterType == 'dogwalker') {
        this.$router.push('dwProfile');
      } else if (this.comment.parentWriterType == 'customer') {
        this.$router.push('cusProfile');
      } else {
        console.log('writertype이 도그워커나 고객이 아닙니다');
      }
    },
    clickWriter() {
      // 해당댓글작성자
      const userInfo = {
        userId: this.comment.writerId,
        userType: this.comment.writerType,
      };
      this.$store.commit('setUserInfo', userInfo);
      if (this.comment.writerType == 'dogwalker') {
        this.$router.push('dwProfile');
      } else if (this.comment.writerType == 'customer') {
        this.$router.push('cusProfile');
      } else {
        console.log('writertype이 도그워커나 고객이 아닙니다');
      }
    },
  },
};
</script>

<style>
.btns {
  cursor: pointer;
}
</style>
