<template>
  <div class="home">
    <div id="hero-container">
      <h1>
        Welcome to Plaudit!
      </h1>
      <p>Read, create, and upvote posts!</p>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">

.home {
  font-size: 150%;
}

h1 {
  text-align: center;
  font-size: 200%;
}

#hero-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 40vh;
  flex-direction: column;
  // background: coral;
}
</style>
