<template>
  <Quiz />
</template>

<script setup>
import Quiz from './components/Quiz.vue';
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
* {
  font-family: 'Poppins', 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande',
    'Lucida Sans', Arial, sans-serif;
}
#app {
  height: 100vh;
  width: 100vw;
  background: #005c97;
  background: linear-gradient(to right, #363795, #005c97);
}
</style>
