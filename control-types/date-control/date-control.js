Vue.component("DateControl", {
  template: $template,
  mixins: [LswFormControls.mixins.get("BasicControl")],
  props: {
    
  },
  data() {
    return {
      dia: "",
      hora: "",
    }
  },
  methods: {
    getValue() {
      const dateString = this.dia + " " + this.hora;
      const date = new Date(dateString);
      return { text: dateString, date };
    }
  },
  watch: {
    
  },
  mounted() {
    
  }
});