<template>
  <transition name="post">
    <article v-if="post" class="post">
      <header class="post__header">
        <h2 class="post__title">{{ title }}</h2>

        <h3 class="post__meta">At <router-link class="post__author"
          :to="`/by/${kebabify(author)}`">{{ author }}</router-link>
          <time>
            &nbsp; by:
            <span class="post__detail">{{ presenter }} </span>
            &nbsp; from:
            <span class="post__detail">{{ company }} </span>
            &nbsp; time:
            <span class="post__detail">{{ duration }} </span>
          </time>         
        </h3>

        <blockquote class="post__subtitle">{{ description }}</blockquote>
      </header>

      <section class="post__body rte" v-html="content"></section>

      <footer class="post__footer">
        <div v-if="commentsReady" :key="post" >

          <div v-if="!booked">
            Seats left:
            <div class="post__seats">
              {{ avialable }}
            </div>
            
            <div class="post__book-button" v-if="!closed" @click="bookCourse()" v-show="!showForm" >
              Book now
            </div>

            <blog-modal v-if="showForm"  :post="post"/>
          </div>
          
          <div v-if="booked">
            <div class="post__seats">
              You Signed up succesfully
            </div>
          </div>

        </div>
        
      </footer>
    </article>
  </transition>
</template>

<script>
import { kebabify, prettyDate } from '../helpers'
import BlogModal from './BlogModal'

export default {
  name: 'blog-post',
  components: {
    BlogModal
  },
  resource: 'BlogPost',
  props: { post: String },

  data() {
    return {
      title: '',
      author: '',
      content: '',
      published: '',
      description: '',
      presenter: '',
      duration: '',
      company: '',
      seats: '',
      closed: false,
      commentsReady: false,
      booked: false,
      showForm: false
    }
  },

  computed: {
    avialable() {
      return this.seats - 1
    }
  },

  watch: {
    post(to, from) {
      if (to === from || !this.post) return;
      this.commentsReady = false
      this.$getResource('post', to)
        .then(this.showComments)
    }
  },

  methods: {
    kebabify,
    prettyDate,
    showComments() {
      setTimeout(() => {
        this.commentsReady = true
      }, 1000)
    },
    bookCourse() {
      this.showForm = true
    }
  },

  mounted () {
    this.showForm = false
  },

  beforeMount() {
    if (!this.post) return;
    this.$getResource('post', this.post)
      .then(this.showComments)
  }
}
</script>
