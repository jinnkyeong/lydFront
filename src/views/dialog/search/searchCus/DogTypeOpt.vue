<template>
  <v-dialog
    class="dialog"
    width="450"
    height="600"
    v-model="$store.state.just_state.open">
    <!-- 너버 - 임의로 정함 -->
    <v-card>
      <v-card-title>
        <v-row no-gutters style="height: 20px">
          <v-col align-self="center" cols="12" md="11" sm="11"></v-col>
          <v-col align-self="end" cols="12" md="1" sm="1">
            <!-- 나가기 버튼 -->
            <button @click="clickClose">
              <font-awesome-icon icon="fa-solid fa-xmark" />
            </button>
          </v-col>
        </v-row>
      </v-card-title>

      <v-card-text>
        <v-row justify="center" no-gutters style="height: 40px"> </v-row>
        <v-row justify="center" no-gutters style="height: 60px">
          강아지 유형(소/중/대형)
        </v-row>
        <v-row justify="center" no-gutters style="height: 100px">
          <v-select
            v-model="selected"
            :items="dogTypes"
            label="수용 가능한 유형을 선택하세요(중복가능)"></v-select>
        </v-row>
        <v-row class="text-center">
          <Chip :selectedList="selectedList" @cancelChip="cancelChip" />
        </v-row>
        <v-row justify="center" no-gutters style="height: 40px"> </v-row>
        <v-row justify="center" no-gutters style="height: 40px">
          <v-col class="ml-7 text-center" cols="12" md="4">
            <v-btn block @click="clickSubmit">확인</v-btn>
          </v-col>
          <v-spacer />
          <v-col class="mr-7 text-center" cols="12" md="4">
            <v-btn block @click="clickCancel">취소</v-btn>
          </v-col>
        </v-row>
        <v-row justify="center" no-gutters style="height: 40px"> </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import Chip from '@/components/Chip';
import format from '@/utillFunction/format';

export default {
  components: {
    Chip,
  },
  data() {
    return {
      selectedList: [],
      selected: null,
      dogTypes: ['소형견', '중형견', '대형견', '초대형견'],
    };
  },
  methods: {
    clickClose() {
      this.$store.commit('setOpen', false); // 창 닫기
    },
    cancelChip(one) {
      for (let i = 0; i < this.selectedList.length; i++) {
        if (this.selectedList[i] === one) {
          this.selectedList.splice(i, 1);
        }
      }
    },
    clickSubmit() {
      this.$store.commit('setOpen', false); // 창 닫기
      let formatList = [];
      for (let i = 0; i < this.selectedList.length; i++) {
        formatList.push(format.convertDogType(this.selectedList[i]));
      }
      this.$store.commit('setDogTypes', formatList);
    },
    clickCancel() {
      this.$store.commit('setOpen', false); // 창 닫기
    },
  },
  watch: {
    selected() {
      this.selectedList.push(this.selected);
      const set = new Set(this.selectedList);
      const uniqueArr = [...set];
      this.selectedList = uniqueArr; // 중복제거
    },
  },
};
</script>

<style></style>
