<template>
  <!-- 더보기 버튼 -->
  <span class="link grey-little-light" @click="clickMore">
    <span> 더 보기 </span>
    <span>
      <font-awesome-icon icon="fa-solid fa-chevron-right " />
    </span>
  </span>
  <!-- 지원서 모달 -->
  <v-dialog v-model="wantMore" class="dialog">
    <v-card class="pa-16">
      <div class="title">
        <span class="secondary-color">{{ coms[0].nick }}</span>
        <span>님의 지원서 목록</span>
      </div>
      <div class="mt-5 desc">지원서 {{ coms.length }} 개</div>
      <v-divider class="mb-10" />
      <v-row>
        <v-row>
          <v-col v-for="(com, i) in coms" :key="i" cols="12" md="3">
            <div @click="selectcom(com.commisionId, com.customerId)">
              <FigureCus :comm="com"></FigureCus>
            </div>
          </v-col>
        </v-row>
      </v-row>
      <v-spacer style="height: 50px" />
    </v-card>
  </v-dialog>
</template>

<script>
import FigureCus from '@/components/FigureCus.vue';

export default {
  components: {
    FigureCus,
  },
  created() {},

  props: {
    coms: Array,
  },
  data() {
    return {
      wantMore: false,
    };
  },
  methods: {
    clickMore() {
      this.wantMore = true;
    },
  },
};
</script>

<style></style>
