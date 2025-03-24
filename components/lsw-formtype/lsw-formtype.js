Vue.component("LswFormtype", {
  template: $template,
  props: {
    definition: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    this.$trace("lsw-formtype.data");
    this._validateDefinition(this.definition);
    return {

    };
  },
  methods: {
    _validateDefinition(definitionObject) {
      const ensureDefinition = $ensure(definitionObject);
      ensureDefinition.type("object");
      ensureDefinition.to.have.uniquelyKeys(["name", "props", "events"]);
      ensureDefinition.to.have.key("name");
      ensureDefinition.its("name").type("string");
      if ("props" in definitionObject) {
        ensureDefinition.its("props").type("object");
      }
      if ("events" in definitionObject) {
        ensureDefinition.its("events").type("object");
      }
    }
  },
  watch: {},
  mounted() {
    try {
      this.$trace("lsw-formtype.mounted");
    } catch (error) {
      console.log(error);
    }
  }
});