<template>
  <div class="posts-page">
    <div class="posts-title-container">
      <h1>Posts</h1>
      <button>
        <font-awesome-icon
          @click="fetchPosts"
          icon="sync"
          size="2x"
          class="fa-spin-hover"
        ></font-awesome-icon>
        <p class="fetch-post-container">{{ fetchStatus }}</p>
      </button>
      <button @click="showNewPostFormCheck" class="new-post-button">
        New Post
      </button>
    </div>
    <div v-if="showNewPostForm" class="create-post-container">
      <CreatePostForm
        v-on:post-created="fetchPosts"
        v-on:closeCreateForm="showNewPostForm = false"
      ></CreatePostForm>
    </div>
    <div class="posts-container">
      <ul v-for="post in posts" :key="post._id">
        <Post
          v-on:upvote-post="upvotePost($event, post._id)"
          v-on:delete-post="deletePost($event, post._id)"
          :id="post.id"
          :summary="post.summary"
          :body="post.body"
          :createdOn="post.createdOn"
          :upvotes="post.upvotes.length"
          :user="post.username"
          :isLikedByCurrentUser="post.upvotes.includes(currentUser)"
          :postByCurrentUser="post.username === currentUser"
        />
      </ul>
    </div>
  </div>
</template>

<script>
import Post from "@/components/Post"
import http from "@/utils/http-common"
import CreatePostForm from "@/components/CreatePostForm.vue"

export default {
  components: {
    Post,
    CreatePostForm,
  },
  data() {
    return {
      posts: [],
      showNewPostForm: false,
      currentUser: localStorage.getItem("currentPlauditUser"),
      fetchStatus: "",
    }
  },
  computed: {},
  methods: {
    fetchPosts() {
      this.fetchStatus = ""
      http
        .get("/posts")
        .then((res) => {
          this.posts = res.data
          this.fetchStatus = "Done"
          setTimeout(() => (this.fetchStatus = ""), 2000)
        })
        .catch((error) => {
          this.fetchStatus = error.response.data.message
          setTimeout(() => (this.fetchStatus = ""), 5000)
        })
    },
    initFetchPosts() {
      http
        .get("/posts")
        .then((res) => {
          this.posts = res.data
          this.fetchPostDone = false
        })
        .catch((error) => {
          this.fetchStatus = error.response.data.message
          setTimeout(() => (this.fetchStatus = ""), 5000)
        })
    },
    upvotePost(event, id) {
      if (!this.$store.state.currentUser) {
        this.$router.push("/login")
      } else {
        http
          .patch(`/posts/upvote/${id}`, {
            username: this.$store.state.currentUser,
          })
          .then((response) => {
            if (response.data == "user already upvoted this post") {
              http
                .patch(`/posts/downvote/${id}`, {
                  username: this.$store.state.currentUser,
                })
                .then(() => {
                  console.log("post downvoted")
                })
                .catch((err) => console.log(err))
            }
            setTimeout(() => this.initFetchPosts(), 100)
          })
          .catch((error) => {
            console.log(error)
          })
      }
    },
    deletePost(event, id) {
      http
        .delete(`/posts/${id}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("plauditAuthToken"),
          },
        })
        .then(() => {
          console.log(`post deleted with id ${id}`)
          this.fetchPosts()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    showNewPostFormCheck() {
      if (!this.$store.state.currentUser) {
        this.$router.push("/login")
      } else {
        this.showNewPostForm = true
      }
    },
  },
  mounted() {
    this.initFetchPosts()
  },
}
</script>

<style lang="scss">
@import "../styles/colors";
@import "../styles/utils";

.posts-page {
  button {
    background: transparent;
    border: none;
    outline: none;
  }

  button:hover {
    cursor: pointer;
  }

  .posts-title-container {
    display: inline-flex;
    align-items: center;
    justify-items: center;
    justify-content: space-between;
    min-height: 56px;
    width: 100%;

    button:hover {
      opacity: 0.9;
      transition: opacity 0.1s;
    }
  }

  .fetch-post-container {
    color: $slate;
    font-weight: 700;
    margin-top: $rem-1;
  }

  .fa-spin-hover {
    color: $slate;
  }

  .fa-spin-hover:hover {
    animation: fa-spin 2s infinite linear;
  }
  // The animation bellow is taken from font-awesome.css
  @-webkit-keyframes fa-spin {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(359deg);
      transform: rotate(359deg);
    }
  }
  @keyframes fa-spin {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(359deg);
      transform: rotate(359deg);
    }
  }

  .new-post-button {
    font-weight: 700;
    border: solid $slate 1px;
    border-radius: $rem-2;
    padding: $rem-3;
    color: $slate;
  }

  .posts-container {
    margin-bottom: $rem-4;
  }

  .create-post-container {
    margin: $rem-2 0;
  }

  .liked-post {
    color: $forest;
  }
}
</style>
