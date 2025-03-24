Vue.component("LswControlLabel", {
  template: $template,
  props: {
    parentFormtype: {
      type: Object,
      required: false,
    },
    settings: {
      type: Object,
      default: () => ({})
    },
  },
  data() {
    this.$trace("lsw-control-label-control.data");
    this.validateSettings();
    return {
      uuid: LswRandomizer.getRandomString(5),
      isShowingDescription: false,
      name: this.settings?.name,
      label: (typeof (this.settings?.label) !== "undefined") ? this.settings.label : this.settings?.column?.hasLabel,
      description: this.settings?.column?.hasDescription
    };
  },
  methods: {
    toggleDescription() {
      this.isShowingDescription = !this.isShowingDescription;
    },
    validateSettings() {
      this.$trace("lsw-control-label-control.methods.validateSettings");
      LswXForm.validateSettings(this.settings);
      const ensureSettings = $ensure(this.settings);
      const checkSettings = $check(this.settings);
      // @OK
    },
    makeEditable() {
      this.$trace("lsw-control-label-control.methods.makeEditable");
      Behaviour_for_controls: {
        const immediateControl = LswVue2.getClosestParent(this, component => {
          return component.$el.classList.contains("lsw_form_control");
        });
        if (immediateControl) {
          immediateControl.isEditable = true;
          // immediateControl.$forceUpdate(true);
        }
      }
      Behaviour_for_schema_forms: {
        
      }
    },
    makeUneditable() {
      this.$trace("lsw-control-label-control.methods.makeUneditable");
      Behaviour_for_controls: {
        const immediateControl = LswVue2.getClosestParent(this, component => {
          return component.$el.classList.contains("lsw_form_control");
        });
        if (immediateControl) {
          immediateControl.isEditable = false;
          // immediateControl.$forceUpdate(true);
        }

      }
      Behaviour_for_schema_forms: {
        
      }
    }
  },
  watch: {},
  mounted() {
    try {
      this.$trace("lsw-control-label-control.mounted");
    } catch (error) {
      console.log(error);
    }
  }
});