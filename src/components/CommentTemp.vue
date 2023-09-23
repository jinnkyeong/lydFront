<!-- 출력될 댓글 하나하나 -->
<template>
  <v-container>
    <!-- 작성자아바타 및 닉네임, 내용, 삭제버튼 -->
    <v-row no-gutters>
      <!-- 아바타 -->
      <v-col cols="12" md="1" class="mr-3">
        <v-avatar>
          <v-img src="https://cdn.vuetifyjs.com/images/john.jpg" cover />
        </v-avatar>
      </v-col>
      <v-col cols="12" md="9">
        <span>
          <!-- 닉네임 -->
          <div class="black semi-bold">{{ comment.writerNick }}</div>
          <!-- 부모댓글 닉네임 -->
          <div v-if="comment.parentWriterNick" class="secondary-color">
            @ {{ comment.parentWriterNick }}
          </div>
          <!-- 내용 -->
          <div>
            <p>{{ comment.context }}</p>
          </div>
        </span>
      </v-col>
      <!-- 삭제버튼 -->
      <v-col cols="12" md="1">
        <span class="grey-little-light ml-8 btns">
          <font-awesome-icon icon="fa-solid fa-trash-can" />
        </span>
      </v-col>
    </v-row>
    <!-- 답글보기, 답글작성 버튼 -->
    <v-row no-gutters>
      <div class="mt-2">
        <!-- 답글작성 버튼 -->
        <span @click="writeChild" class="semi-bold grey-little-light btns">
          답글
        </span>
        <!-- 답글보기 버튼 -->
        <span
          v-if="comment.depth === 1 && !comment.childVisible"
          @click="showChild"
          class="ml-4 btns">
          <span class="secondary-color">
            <!-- 답글 {{ comment.children.length ? comment.children.length : 0 }}개 -->
            답글 몇개
          </span>
          <!-- <span class="secondary-color ml-1" v-if="comment.children.length > 0">
            <font-awesome-icon class="mt-1" icon="chevron-down" size="xs" />
          </span> -->
        </span>
        <span
          v-if="comment.depth === 1 && comment.childVisible"
          @click="closeChild"
          class="ml-4 btns">
          <span class="secondary-color">
            <!-- 답글 {{ comment.children.length }}개 -->
            ㄷㅂ글몇개
          </span>
          <!-- <span class="secondary-color ml-1" v-if="comment.children.length > 0">
            <font-awesome-icon class="mt-1" icon="chevron-up" size="xs" />
          </span> -->
        </span>
      </div>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    comment: Object,
  },
  created() {
    // const toggle = {
    //   reviewId: this.comment.reviewId,
    //   parentId: this.comment.parentId,
    //   commentId: this.comment.id,
    //   bool: false,
    // };
    // console.log(toggle);
    // this.$store.commit('setToggles', toggle);
  },
  data() {
    return {
      toggles: [],
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
  },
};
</script>

<style>
.btns {
  cursor: pointer;
}
</style>
