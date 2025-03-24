Vue.component("LswSourceCodeControl", {
  template: $template,
  props: {
    configurations: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    this.$trace("lsw-source-code.data");
    return {};
  },
  methods: {},
  watch: {},
  mounted() {
    try {
      this.$trace("lsw-source-code.mounted");
    } catch(error) {
      console.log(error);
    }
  }
});