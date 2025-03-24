Vue.component("LswDateControl", {
  template: $template,
  props: {
    settings: {
      type: Object,
      default: () => ({})
    },
    mode: {
      type: String,
      default: () => "date" // can be: date, datetime, time
    }
  },
  data() {
    this.$trace("lsw-date-control.data");
    this.validateMode();
    this.validateSettings();
    const respectivePlaceholder = this.generatePlaceholder();
    return {
      uuid: LswRandomizer.getRandomString(5),
      value: this.settings?.initialValue || "",
      isEditable: true,
      isShowingCalendar: false,
      respectivePlaceholder,
      formMode: this.settings?.column.isFormSubtype || false,
    };
  },
  methods: {
    toggleCalendar() {
      this.$trace("LswDateControl.methods.toggleCalendar", arguments);
      this.isShowingCalendar = !this.isShowingCalendar;
    },
    generatePlaceholder() {
      return this.settings.column.isFormSubtype === "date" ? 'Ej: 2025/01/01' :
        this.settings.column.isFormSubtype === "datetime" ? 'Ej: 2025/01/01 00:00' :
        this.settings.column.isFormSubtype === "time" ? 'Ej: 00:00' : ''
    },
    async submit() {
      this.$trace("lsw-text-control.methods.submit");
      return LswFormtypes.utils.submitControl.call(this);
    },
    validate() {
      this.$trace("lsw-text-control.methods.validateSettings");
      return LswFormtypes.utils.validateControl.call(this);
    },
    validateSettings() {
      this.$trace("lsw-text-control.methods.validateSettings");
      return LswFormtypes.utils.validateSettings.call(this);
    },
    validateMode() {
      this.$trace("lsw-date-control.methods.validateSettings");
      $ensure({mode: this.mode}, 1).to.be.oneOf(["date", "time", "datetime"]);
    },
    setValueFromCalendar(v) {
      this.$trace("lsw-date-control.methods.setValueFromCalendar");
      console.log("Valor:", v);
      const value = LswTimer.utils.formatDatestringFromDate(v);
      if(this.mode === "datetime") {
        this.value = value;
      } else if(this.mode === "date") {
        this.value = value.split(" ")[0];
      } else if(this.mode === "time") {
        this.value = value.split(" ")[1];
      } else {
        this.value = value;
      }
    }
  },
  watch: {},
  mounted() {
    try {
      this.$trace("lsw-date-control.mounted");
    } catch (error) {
      console.log(error);
    }
  }
});