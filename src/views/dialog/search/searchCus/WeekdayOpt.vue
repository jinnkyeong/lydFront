<template>
  <v-dialog
    class="dialog"
    width="450"
    height="600"
    v-model="$store.state.just_state.open">
    <!-- 너버 - 임의로 정함 -->
    <v-card>
      <v-spacer style="height: 30px" />

      <v-card-text>
        <!-- 제목 -->
        <v-row no-gutters style="height: 60px">
          <v-spacer />
          <v-col cols="12" md="11">
            <div class="title-medium">근무 가능 요일</div>
          </v-col>
        </v-row>
        <!-- 선택 -->

        <v-row justify="center" no-gutters style="height: 100px">
          <v-select
            v-model="selected"
            :items="weekdays"
            label="요일을 선택하세요(중복가능)"></v-select>
        </v-row>
        <v-row class="text-center">
          <Chip :selectedList="selectedList" @cancelChip="cancelChip" />
        </v-row>

        <!-- 버튼 -->
        <v-row justify="center" no-gutters style="height: 40px"></v-row>
        <v-row justify="center" no-gutters style="height: 40px">
          <v-col class="ml-7 text-center" cols="12" md="4">
            <v-btn block size="large" @click="clickSubmit" color="primary">
              <span class="white text-regular"> 확인 </span>
            </v-btn>
          </v-col>
          <v-spacer />
          <v-col class="mr-7 text-center" cols="12" md="4">
            <v-btn block size="large" @click="clickCancel" color="grey">
              <span class="white text-regular"> 취소 </span>
            </v-btn>
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
      weekdays: [
        '월요일',
        '화요일',
        '수요일',
        '목요일',
        '금요일',
        '토요일',
        '일요일',
      ],
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
        formatList.push(format.formatWeekdayToKey(this.selectedList[i]));
      }
      this.$store.commit('setWeekdays', formatList);
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
