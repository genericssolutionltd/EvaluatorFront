<<template>
  <div class="d-flex w-100  justify-content-between">
    <div class="text">{{ message.title }}</div>
    <i class="fa fa-pencil-square-o fa-2x" aria-hidden="true" v-on:click="editMessage(message._id)"></i>
  </div>
</template>

<script>
import router from '../../router'
export default {
  name: 'message-item',
  props: ['message'],
  methods: {
    editMessage: (id) => {
      router.push({ path: '/message/' + id })
    }
  }
}
</script>

<style>
i {
  color: #00576D;
}

i:hover {
  color: #FFFFFF;
}

.text {
  display: block;
  width: 300px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
