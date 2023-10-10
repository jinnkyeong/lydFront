<template>
  <v-spacer style="height: 200px" />
  <v-divider :thickness="5" color="success" />
  <v-row justify="center">
    <div class="mt-16">
      <h1>테스트</h1>
    </div>
  </v-row>
  <v-row justify="center">
    <div class="mt-10 mb-16"></div>
  </v-row>
  <v-divider :thickness="5" color="success" />
  <v-row justify="end">
    <div class="grey mt-9 mr-10">80점 이상 : 통과O 80점 미만 : 통과X</div>
  </v-row>
  <v-row>
    <v-spacer />
    <v-col cols="12" md="6">
      <!-- 질문리스트(객관식,주관식) -->
      <div v-for="q in qs" :key="q">
        <div v-if="q.type === 1">
          <!-- 객관식 -->
          <Question1 :q="q" />
          <!-- <v-container class="field">
            <v-row class="field-top">
              <div class="field-top-label">{{ q.questionSentence }}</div>
            </v-row>
            <v-row class="field-middle" v-for="(a, i) in q.answers" :key="i">
              <v-radio-group column v-model="picked">
                <v-radio
                  :label="a"
                  :value="a"
                  @change="change(q.questionTypeId, a)" />
              </v-radio-group>
            </v-row>
          </v-container> -->
        </div>

        <div v-if="q.type === 2">
          <!-- 주관식 -->
          <Question2 :q="q" />
          <!-- <v-container class="field">
            <v-row class="field-top">
              <div class="field-top-label">{{ q.questionSentence }}</div>
            </v-row>
            <v-row class="field-middle">
              <v-text-field
                variant="outlined"
                placeholder="문자열로 입력해주세요"
                @input="write(q.questionTypeId)"
                v-model="writen[q.questionTypeId]"></v-text-field>
            </v-row>
          </v-container> -->
        </div>
      </div>
    </v-col>
    <v-spacer />
  </v-row>
  <v-row>
    <v-spacer />

    <v-col cols="12" md="3">
      <v-btn
        @click="submit"
        block
        variant="tonal"
        color="primary"
        size="x-large">
        제출하기
      </v-btn>
    </v-col>
    <v-spacer />
  </v-row>
  <v-spacer style="height: 100px" />
</template>

<script>
import Question1 from '@/components/test/Question1.vue';
import Question2 from '@/components/test/Question2.vue';
import myInfoApi from '@/api/myInfoApi';
import format from '@/utillFunction/format';
export default {
  components: {
    Question1,
    Question2,
  },
  created() {
    myInfoApi
      .getQuestionTypes()
      .then((res) => {
        this.qs = res.data;
        this.startDt = new Date(); // 시작 시간 세팅
      })
      .catch((e) => {
        console.log(e);
      });
  },
  data() {
    return {
      qs: [],
      startDt: '', // new Date
      endDt: '', // new Date
    };
  },
  methods: {
    // new Date -> string
    formatDt(dt) {
      return format.formatDateTimeForReq(dt);
    },
    submit() {
      this.endDt = new Date(); // 종료시간 세팅
      const startStr = this.formatDt(this.startDt);
      const endStr = this.formatDt(this.endDt);

      myInfoApi
        .postTest(
          this.$store.state.login.dwId,
          startStr,
          endStr,
          this.$store.state.just_state.testInputs
        )
        .then((res) => {
          if (res.data) {
            // true 통과
            this.$router.push('/testSuccess');
          } else {
            // false 불통
            this.$router.push('/testFail');
          }
        })
        .catch((e) => {
          console.log(e);
        });
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
  font-size: var(--font-regular);
  font-weight: var(--weight-regular);
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
