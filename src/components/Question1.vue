<template>
  <v-container class="field">
    <v-row class="field-top">
      <div class="field-top-label">{{ q.questionSentence }}</div>
    </v-row>
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
    console.log('mounted - this.q.answers : ', this.q.answers);
    if (this.q.answers) {
      let shuffledAnswers = [...this.q.answers].sort(() => Math.random() - 0.5); // 보기 배열 섞기(원본 유지)
      // console.log('after - this.q.answers : ', this.q.answers);
      // console.log('after - shuffledAnswers : ', shuffledAnswers);
      this.answers = shuffledAnswers;
    }
  },

  data() {
    return {
      answers: [],
      picked: null,

      // post
      inputs1: [],
    };
  },
  methods: {
    change(answer) {
      this.$emit('input', answer);
      // console.log('emit input ', answer);
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
