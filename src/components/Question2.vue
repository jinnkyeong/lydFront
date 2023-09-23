<template>
  <v-container class="field">
    <v-row class="field-top">
      <div class="field-top-label">{{ q.questionSentence }}</div>
    </v-row>
    <v-row class="field-middle">
      <v-text-field
        variant="outlined"
        placeholder="문자열로 입력해주세요"></v-text-field>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    q: Object,
  },
};
</script>

<style>
.field {
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 80px;
  padding-bottom: 80px;
}
.field-top {
  border-top: 1px yellowgreen solid;
  display: block;
}
.field-top-label {
  padding: 10px;
}
.field-top-desc {
  padding: 5px;
}
.field-middle {
  border-top: 1px grey solid;
}
.v-text-field {
  padding: 20px;
}
</style>
