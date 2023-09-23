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
      <v-btn @click="writeComment" color="grey" style="height: 42px">
        <span> 작성 </span>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    parent: Object, // 부모 댓글
  },
  data() {
    return {
      context: '',
      placeholder: '',
    };
  },
  methods: {
    writeComment() {
      if (!this.parent) {
        // 최상위 댓글 작성
        this.placeholder = '댓글 작성';
      } else {
        // 답글작성
        this.placeholder = '답글 작성';
      }
    },
  },
};
</script>

<style></style>
