<template>
  <Menu />
  <Quiz />
</template>

<script setup>
import Menu from './components/Menu.vue';
import Quiz from './components/Quiz.vue';
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap');
* {
  font-family: 'Poppins', 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande',
    'Lucida Sans', Arial, sans-serif;
  font-size: 10px;
}
@media (min-width: 480px) {
  * {
    font-size: 11px;
  }
}
@media (min-width: 768px) {
  * {
    font-size: 12px;
  }
}
#app {
  height: 100vh;
  width: 100vw;
  background: url('./assets/background.png');
  background-attachment: fixed;
  background-size: cover;
}
</style>
