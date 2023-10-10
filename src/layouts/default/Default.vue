<template>
  <v-app>
    <!-- v-app-bar -->
    <default-bar />
    <!-- v-main -->
    <default-view />
    <!-- footer -->
    <v-footer class="bg-grey-lighten-1">
      <v-row justify="center" no-gutters>
        <div class="pt-10">
          cursus iaculis dui sollicitudin. Vestibulum eu ipsum vel diam
          elementum tempor vel ut orci. Orci varius natoque penatibus et magnis
          dis parturient montes, nascetur ridiculus mus.
        </div>
        <v-btn
          v-for="link in links"
          :key="link"
          color="white"
          variant="text"
          class="mx-2"
          rounded="xl">
          {{ link }}
        </v-btn>
        <v-col class="text-center mt-4" cols="12">
          {{ new Date().getFullYear() }} — <strong>LoveYourDog</strong>
        </v-col>
      </v-row>
    </v-footer>
    <!-- dialog -->
    <router-view name="dialog"></router-view>
    <!-- alert -->
    <!-- <v-row justify="center">
      <Alert />
    </v-row> -->
  </v-app>
</template>

<script setup>
import Alert from '@/components/Alert';
import DefaultBar from './AppBar.vue';
import DefaultView from './View.vue';
</script>
