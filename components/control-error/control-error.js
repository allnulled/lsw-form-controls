Vue.component("ControlError", {
  template: $template,
  props: {
    error: {
      type: Object,
      required: true
    },
    control: {
      type: Object,
      required: false
    }
  },
  data() {
    return {}
  },
  methods: {
    clearError() {
      return this.control && this.control.clearError();
    }
  },
  watch: {
    
  },
  mounted() {
    
  }
});