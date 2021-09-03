<template>
  <template v-if="entry">
    <div class="entry-title d-flex justify-content-between p-2">
      <div>
        <span class="text-success fs-3 fw-bold">15</span>
        <span class="mx-1 fs-3">July</span>
        <span class="mx-2 fs-4 fw-light">2021, thursday</span>
      </div>

      <div>
        <button class="btn btn-danger mx-2">
          Delete <i class="fa fa-trash-alt"></i>
        </button>
        <button class="btn btn-primary">
          Upload photo <i class="fa fa-upload"></i>
        </button>
      </div>
    </div>

    <hr />
    <div class="d-flex flex-column px-3 h-75">
      <textarea
        v-model="entry.text"
        placeholder="What happened today?"
      ></textarea>
    </div>
    <img
      src="https://hipertextual.com/wp-content/uploads/2021/05/darth-vader.jpeg"
      alt="entryPicture"
      class="img-thumbnail"
    />
  </template>
  <Fab icon="fa-save" />
</template>

<script>
import { defineAsyncComponent } from 'vue';
import { mapGetters } from 'vuex';
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  components: {
    Fab: defineAsyncComponent(() => import('../components/Fab')),
  },
  data() {
    return {
      entry: null,
    };
  },
  computed: {
    ...mapGetters('journal', ['getEntryById']),
  },
  methods: {
    loadEntry() {
      const entry = this.getEntryById(this.id);
      if (!entry) {
        return this.$router.push({ name: 'noEntry' });
      }
      this.entry = entry;
      console.log(entry);
    },
  },
  created() {
    this.loadEntry();
  },
  watch: {
    id() {
      this.loadEntry();
    },
  },
};
</script>

<style lang="scss" scoped>
textarea {
  font-size: 20px;
  border: none;
  height: 100%;

  &:focus {
    outline: none;
  }
}
img {
  width: 200px;
  position: fixed;
  bottom: 150px;
  right: 20px;
  box-shadow: 0px 5px 10px rgba($color: #000000, $alpha: 0.2);
}
</style>
