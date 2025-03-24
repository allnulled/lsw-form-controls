Vue.component("LswNumberControl", {
  template: $template,
  props: {
    configurations: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    this.$trace("lsw-number-control.data");
    return {};
  },
  methods: {},
  watch: {},
  mounted() {
    try {
      this.$trace("lsw-number-control.mounted");
    } catch(error) {
      console.log(error);
    }
  }
});