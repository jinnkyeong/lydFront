<template>
  <div style="background-color: antiquewhite">
    <dropdown-menu
      :comment="comment"
      :children="comment.children"></dropdown-menu>
  </div>
</template>

<script>
import DropdownMenu from '@/components/DropdownMenu';
import reviewApi from '@/api/reviewApi';

export default {
  components: { DropdownMenu },
  created() {},

  // setup() {
  // const data = {
  // item: '책갈피',
  // subItems: [
  //   { item: '시작 페이지 보기' },
  //   { item: '읽기 목록에 추가' },
  //   {
  //     item: '즐겨찾기',
  //     subItems: [
  //       { item: '개발 관련' },
  //       { item: 'LEESTRUMENT' },
  //       { item: '자주 가는 곳들' },
  //       { item: '관심 제품' },
  //       { item: 'Tool' },
  //     ],
  //   },
  // ],
  // };

  // return { data };
  // },
  props: {
    comment: Object,
  },
};
</script>
