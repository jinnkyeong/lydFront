<template>
  <!-- 리뷰 리스트에서 한 리뷰 미리보기 모양 -->
  <v-container
    class="pt-10 pb-10 pl-10 back-white mb-10"
    style="outline: solid 2px var(--color-light-grey); width: 750px">
    <v-row>
      <!-- 나머지 -->
      <v-col cols="12" md="8">
        <!-- 작성자정보 -->
        <v-row>
          <!-- 주소 -->
          <v-col cols="12" md="4" align-self="center">
            <div class="title">
              {{ review.addrState }} {{ review.addrTown }}
            </div>
          </v-col>
          <!-- 별점 -->
          <v-col cols="12" md="7" align-self="center">
            <span>
              <v-rating
                :model-value="review.star / 2"
                color="amber"
                density="compact"
                half-increments
                readonly></v-rating>
            </span>
          </v-col>
        </v-row>
        <v-divider class="mt-2 mb-4" />
        <!-- 내용 -->
        <v-row>
          <v-spacer />
          <v-col cols="12" md="12" class="text-regular">
            {{ review.context }}
          </v-col>
          <v-spacer />
        </v-row>
      </v-col>
      <!-- 이미지 -->
      <v-col cols="12" md="3">
        <v-img
          :src="review.imgUrl"
          class="pa-5"
          cover
          aspect-ratio="1"
          height="150px"></v-img>
      </v-col>
      <v-col cols="12" md="1" align-self="center" class="pl-5">
        <!-- <div>
          <font-awesome-icon
            icon="fa-solid fa-chevron-right "
            size="xl"
            class="left-modify" />
        </div> -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    review: Object,
  },
  methods: {},
};
</script>

<style></style>
