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
          <div class="text-regular">자격증</div>
        </v-row>
        <v-row justify="center" no-gutters style="height: 100px">
          <v-select
            v-model="selected"
            :items="certificates"
            label="자격증을 선택하세요(중복가능)"></v-select>
        </v-row>
        <v-row class="text-center">
          <Chip :selectedList="selectedList" @cancelChip="cancelChip" />
        </v-row>
        <v-row justify="center" no-gutters style="height: 40px"></v-row>
        <v-row justify="center" no-gutters style="height: 40px">
          <v-col class="ml-7 text-center" cols="12" md="4">
            <v-btn block @click="clickSubmit" color="primary">확인</v-btn>
          </v-col>
          <v-spacer />
          <v-col class="mr-7 text-center" cols="12" md="4">
            <v-btn block @click="clickCancel" color="grey">취소</v-btn>
          </v-col>
        </v-row>
        <v-row justify="center" no-gutters style="height: 40px"> </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import Chip from '@/components/Chip';

export default {
  components: {
    Chip,
  },
  data() {
    return {
      selectedList: [],
      selected: null,
      certificates: [
        '훈련사',
        '도그워커',
        '반려동물행동교정사',
        '반려견지도사',
        '반려동물장례지도사',
        '애견브리더',
        '펫시터강사',
        '펫시터',
        '동물매개활동관리사',
        '애견미용사',
        '반려동물식품관리사',
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
      this.$store.commit('setCertificates', this.selectedList);
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
