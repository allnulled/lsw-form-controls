Vue.component("StringControl", {
  template: $template,
  mixins: [LswFormControls.mixins.get("BasicControl")],
  props: {
    placeholder: {
      type: String,
      default: () => {}
    },
    multiline: {
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    return {}
  },
  methods: {
    
  },
  watch: {
    
  },
  mounted() {
    
  }
});