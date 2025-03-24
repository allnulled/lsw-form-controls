Vue.component("LswRefRelationControl", {
  template: $template,
  props: {
    settings: {
      type: Object,
      default: () => ({})
    },
  },
  data() {
    this.$trace("lsw-ref-relation-control.data");
    this.validateSettings();
    return {
      uuid: LswRandomizer.getRandomString(5),
      value: this.settings?.initialValue || "",
      isEditable: true,
    };
  },
  methods: {
    async submit() {
      this.$trace("lsw-ref-relation-control.methods.submit");
      return LswFormtypes.utils.submitControl.call(this);
      
    },
    validate() {
      this.$trace("lsw-ref-relation-control.methods.validateSettings");
      return LswFormtypes.utils.validateControl.call(this);
    },
    validateSettings() {
      this.$trace("lsw-ref-relation-control.methods.validateSettings");
      return LswFormtypes.utils.validateSettings.call(this);
    }
  },
  watch: {},
  mounted() {
    try {
      this.$trace("lsw-ref-relation-control.mounted");
    } catch (error) {
      console.log(error);
    }
  }
});