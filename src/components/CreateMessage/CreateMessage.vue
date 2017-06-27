<template>
  <div class="p-2">
    <form>
      <div class="row">
        <div class="col-8">
          <div class="form-group">
            <h5>Message</h5>
          </div>
          <div class="form-group">
            <label for="messageName">Title</label>
            <div class="row">
              <div class="col-11">
                <input type="text" class="form-control" aria-describedby="messageName" v-model="currentMessage.title" placeholder="Enter Message Title" />
              </div>
              <div class="col-0.5">
                <i v-tooltip.right="'TBC'" class="fa fa-question" aria-hidden="true"></i>
              </div>
            </div>
          </div>
          <div class="form-group">
            <label for="messageTag">Tags</label>
            <div class="row">
              <div class="col-11">
                <input type="text" class="form-control" disabled="disabled" aria-describedby="messageTag" v-model="currentMessage.tags" />
              </div>
              <div class="col-0.5">
                <i v-tooltip.right="'TBC'" class="fa fa-question" aria-hidden="true"></i>
              </div>
            </div>
          </div>
          <div class="form-group">
            <label for="messageDescription">Description</label>
            <div class="row">
              <div class="col-11">
                <textarea class="form-control" aria-describedby="messageDescription" v-model="currentMessage.description" rows="5"></textarea>
              </div>
              <div class="col-0.5">
                <i v-tooltip.right="'TBC'" class="fa fa-question" aria-hidden="true"></i>
              </div>
            </div>
          </div>
          <div class="form-group">
            <label for="messageStatus">Status</label>
            <div class="row">
              <div class="col-11">
                <select class="form-control" id="messageStatus" v-model="currentMessage.status">
                  <option value="draft" selected>Draft</option>
                  <option value="archived" selected>Archived</option>
                  <option value="published" selected>Published</option>
                </select>
              </div>
              <div class="col-0.5">
                <i v-tooltip.right="'TBC'" class="fa fa-question" aria-hidden="true"></i>
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="row">
              <div class="col-10 float-left">
                <button type="button" v-on:click="cancelMessage" class="btn btn-secondary">Cancel</button>
              </div>
              <div class="float-right">
                <button type="button" v-on:click="createMessage(currentMessage)" class="btn btn-primary">Save</button>
              </div>
            </div>
          </div>
        </div>
      </div>
  
    </form>
  </div>
</template>

<script>
import store from '../../store'
import router from '../../router'
import Vuex from 'vuex'
export default {
  name: 'create-message',
  props: ['messageId'],

  computed: Vuex.mapState([
    'currentMessage'
  ]),
  methods: {
    createMessage (message) {
      message.author = store.state.user.name
      store.dispatch('createMessage', message)
    },
    cancelMessage () {
      router.push({ path: '/' })
    },
    getMessage (id) {
      store.dispatch('getMessage', id)
    }
  },
  watch: {
    messageId: 'getMessage'
  },
  mounted () {
    this.getMessage(this.messageId)
  }
}
</script>

<style>
h5 {
  text-decoration: underline;
}
</style>
