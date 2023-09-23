<template>
  <ul>
    <li>zzzzzzzzzzzzz{{ comment.id }} {{ comment.writerNick }}</li>

    <dropdown-menu
      v-for="each in children"
      :key="each"
      :comment="each"
      :children="each.children" />
  </ul>
</template>

<script>
export default {
  name: 'DropdownMenu', // 필수로 있어야함! 이렇게 적고,
  //template 에서는 drop-down-menu 로 사용해야함!
  props: ['comment', 'children'],
};
</script>
