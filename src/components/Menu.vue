<template>
  <!-- Hamburger menu from brenden. Codepen - https://codepen.io/brenden/pen/VLjKMQ -->
  <div class="outer-menu">
    <input class="checkbox-toggle" type="checkbox" />
    <div class="hamburger">
      <div></div>
    </div>
    <div class="menu">
      <div>
        <div class="d-flex flex-column justify-content-center gap-3">
          <a
            href="https://raulshma.xyz"
            target="__blank"
            rel="noopener"
            class="fs-2"
            >created by raulshma</a
          >
          <a
            href="https://github.com/raulshma/devchallenges-frontend-quiz"
            target="__blank"
            rel="noopener"
          >
            <i class="bi bi-github fs-1" />
          </a>
          <a
            href="https://devchallenges.io/portfolio/raulshma"
            target="__blank"
            rel="noopener"
            class="fs-6"
          >
            devChallenges.io
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
* {
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
  font-weight: normal;
}
a,
a:visited,
a:hover,
a:active {
  color: inherit;
  text-decoration: none;
}
h1 {
  font-family: 'Poppins', cursive;
  font-weight: bold;
  font-size: 3em;
  text-align: center;
}
.outer-menu {
  position: fixed;
  top: 2.5vh;
  left: 2.5vh;
  z-index: 1;
}
.outer-menu .checkbox-toggle {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  cursor: pointer;
  width: 60px;
  height: 60px;
  opacity: 0;
}
.outer-menu .checkbox-toggle:checked + .hamburger > div {
  transform: rotate(135deg);
}
.outer-menu .checkbox-toggle:checked + .hamburger > div:before,
.outer-menu .checkbox-toggle:checked + .hamburger > div:after {
  top: 0;
  transform: rotate(90deg);
}
.outer-menu .checkbox-toggle:checked + .hamburger > div:after {
  opacity: 0;
}
.outer-menu .checkbox-toggle:checked ~ .menu {
  pointer-events: auto;
  visibility: visible;
}
.outer-menu .checkbox-toggle:checked ~ .menu > div {
  transform: scale(1);
  transition-duration: 0.75s;
}
.outer-menu .checkbox-toggle:checked ~ .menu > div > div {
  opacity: 1;
  transition: opacity 0.4s ease 0.4s;
}
.outer-menu .checkbox-toggle:hover + .hamburger {
  /* box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1); */
}
.outer-menu .checkbox-toggle:checked:hover + .hamburger > div {
  transform: rotate(225deg);
}
.outer-menu .hamburger {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 60px;
  height: 60px;
  padding: 0.5em 1em;
  border-radius: 0 0.12em 0.12em 0;
  cursor: pointer;
  /* transition: box-shadow 0.4s ease; */
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.outer-menu .hamburger > div {
  position: relative;
  flex: none;
  width: 100%;
  height: 2px;
  background: #fefefe;
  transition: all 0.4s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}
.outer-menu .hamburger > div:before,
.outer-menu .hamburger > div:after {
  content: '';
  position: absolute;
  z-index: 1;
  top: -10px;
  left: 0;
  width: 100%;
  height: 2px;
  background: inherit;
  transition: all 0.4s ease;
}
.outer-menu .hamburger > div:after {
  top: 10px;
}
.outer-menu .menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  visibility: hidden;
  overflow: hidden;
  backface-visibility: hidden;
  outline: 1px solid transparent;
  display: flex;
  align-items: center;
  justify-content: center;
}
.outer-menu .menu > div {
  width: 200vw;
  height: 200vw;
  color: #fefefe;
  background: #6c22c4;
  background: linear-gradient(to right, #6c22c4, #5e2ca3);
  border-radius: 50%;
  transition: all 0.4s ease;
  flex: none;
  transform: scale(0);
  backface-visibility: hidden;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.outer-menu .menu > div > div {
  text-align: center;
  max-width: 90vw;
  max-height: 100vh;
  opacity: 0;
  transition: opacity 0.4s ease;
  overflow-y: auto;
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
