<template>
  <div id="nav">
    <div class="navbar-container">
      <div class="logo_container">
        <router-link class="nav-logo" to="/">Plaudit</router-link>
      </div>
      <font-awesome-icon
          @click="showHamburgerMenu = true"
          v-if="!showHamburgerMenu"
          icon="bars"
          size="2x"
          class="hamburger-menu-btn"
        />
        <font-awesome-icon
          @click="showHamburgerMenu = false"
          v-if="showHamburgerMenu"
          icon="times"
          size="2x"
          class="hamburger-menu-btn"
        />
      <div class="nav-items">
      <router-link to="/">Home</router-link>
      <router-link v-if="!currentUser" to="/register">Register</router-link>
      <router-link to="/posts">Posts</router-link>
      <router-link v-if="currentUser" to="/my-posts">My Posts</router-link>
      <button v-if="currentUser" @click="logout">Logout</button>
      <button v-if="!currentUser"><router-link to="/login">Login</router-link></button>
      </div>
    </div>
    <div v-if="showHamburgerMenu" class="hamburger-menu">
      <router-link to="/">Home</router-link>
      <router-link v-if="!currentUser" to="/register">Register</router-link>
      <router-link to="/posts">Posts</router-link>
      <router-link v-if="currentUser" to="/my-posts">My Posts</router-link>
      <a v-if="currentUser" @click="logout">Logout</a>
      <router-link v-if="!currentUser" to="/login">Login</router-link>
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Navbar extends Vue {
  private showHamburgerMenu = false

  get currentUser() {
    return this.$store.state.currentUser
  }

  private logout() {
    this.$store.commit('logout')
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/colors';
@import '../styles/utils';

#nav {
  width: 100%;
  
  // background-color: coral;
  a {
    font-weight: 700;
  }

  p {
    color: $forest;
    font-weight: 700;
  }

  button {
    padding: $rem-1 $rem-4;
    background: $slate;
    color: $white;
    border-radius: $rem-2;
    font-weight: 600;
    font-size: 90%;
    border: none;
  }

  a:hover{
    cursor: pointer
  }
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 16px 0;
}

.hamburger-menu-btn:hover {
  cursor: pointer;
  opacity: .9;
  transition: opacity .4s;
}

.nav-logo {
  font-weight: 700;
}

.router-link-exact-active {
  text-decoration: underline;
}

.nav-logo {
  text-decoration: none;
  color: $forest;
  font-size: 125%;
}

.nav-items {
  display: none;
}

.hamburger-menu {
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  // background: coral;
  button {
    width: 20%;
  }

  a {
    margin: 4px 0;
  }
}

// Desktop styling
@media only screen and (min-width: 800px) {
  .navbar-container {
    margin: 16px 32px;
  }

  .hamburger-menu {
    display:none;
  }

  .hamburger-menu-btn {
    display: none;
  }

  .nav-items {
  width: 90%;
  display: inline-flex;
  justify-content: space-evenly;
  }
}
</style>
