<template>
  <transition appear name="v--mask">
    <div v-once class="modal">
        
      <div class="modal__container">
          <form action="" class="modal__form">
              <label for="familyName">Family Name</label>
              <input type="text" id="familyName" required placeholder="Family name" >

              <label for="givenName">Given Name</label>
              <input type="text" id="givenName" required placeholder="Given name" >

              <label for="email">Email</label>
              <input type="text" id="email" placeholder="yourname@spark44.com" required>

              <input type="button" value="submit"/>
          </form>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'blog-modal',
  props: {
    post: String
  },
  methods: {
    updateSets() {
    }
  }
}
</script>
