<template>
  <v-container class="field">
    <!-- 질문 -->
    <v-row class="field-top">
      <div class="field-top-label">{{ q.questionSentence }}</div>
    </v-row>
    <!-- 객관식 보기 -->
    <v-row class="field-middle" v-for="(a, i) in answers" :key="i">
      <v-radio-group column v-model="picked">
        <v-radio :label="a" :value="a" @change="change(a)" />
      </v-radio-group>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    q: Object,
  },
  mounted() {
    if (this.q.answers) {
      let shuffledAnswers = [...this.q.answers].sort(() => Math.random() - 0.5); // 보기 배열 섞기(원본 유지)
      this.answers = shuffledAnswers;
    }
  },

  data() {
    return {
      answers: [],
      picked: null,
    };
  },
  methods: {
    change(answer) {
      const aObj = {
        questionTypeId: this.q.questionTypeId,
        input: answer,
      };
      this.$store.commit('addTestInput', aObj);
    },
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
