Vue.component("ControlBox", {
  template: $template,
  mixins: [

  ],
  props: {
    validateButton: {
      type: String,
      required: false
    },
    submitButton: {
      type: String,
      required: false
    },
    onSubmit: {
      type: Function,
      default: () => { }
    },
    onValidate: {
      type: Function,
      default: () => undefined,
    },
    formId: {
      type: String,
      default: () => "default"
    },
    showValidatedMessage: {
      type: Boolean,
      default: () => true
    },
    showSubmittedMessage: {
      type: Boolean,
      default: () => true
    }
  },
  data() {
    return {
      validStates: ["pending", "validated", "erroneous", "submitted"],
      state: "unstarted", // also: "pending", "validated", "erroneous" or "submitted"
      error: false
    }
  },
  methods: {
    getControls() {
      return Array.from(this.$el.querySelectorAll(".FormControl")).filter(control => {
        return control.$lswFormControlComponent && (control.$lswFormControlComponent.formId === this.formId);
      });
    },
    getValue() {
      return this.getControls().reduce((output, control) => {
        const value = control.$lswFormControlComponent.getValue();
        output[control.$lswFormControlComponent.name] = value;
        return output;
      }, {});
    },
    getError() {
      return this.error;
    },
    setError(error) {
      this.error = error;
    },
    clearError() {
      this.error = false;
    },
    getState() {
      return this.state;
    },
    setState(state) {
      if (this.validStates.indexOf(state) === -1) {
        throw new Error("Required argument «state» to be a valid state on «ControlBox.methods.setState»");
      }
      this.state = state;
    },
    async validate() {
      // Block repeated validation for asynchronous tasks respect:
      if(this.getState() === "pending") {
        return "Wait for the previous validation to finish";
      }
      const allControls = this.getControls();
      this.clearError();
      this.setState("pending");
      try {
        const errors = [];
        const unknownObjects = [];
        for (let index = 0; index < allControls.length; index++) {
          const control = allControls[index];
          const result = await control.$lswFormControlComponent.validate();
          if (result instanceof Error) {
            errors.push(result);
          } else if (typeof result !== "undefined") {
            // Descarta errores no concretados:
            const isFireWatering = this.isFireWatering(result);
            if(!isFireWatering) {
              unknownObjects.push(result);
            }
          }
        }
        if (errors.length) {
          const errorsSummary = errors.map((err, index) => `${index + 1}. ${err.name}: ${err.message}`).join("\n");
          throw new Error(`Cannot validate form due to ${errors.length} error(s) arised on validation:\n${errorsSummary}`);
        }
        if (unknownObjects.length) {
          const unknownzSummary = unknownObjects.map((err, index) => `${index + 1}. ${this.jsonify(err)}`).join("\n");
          throw new Error(`Cannot validate form due to ${unknownObjects.length} unknown object(s) returned on validation:\n${unknownzSummary}`);
        }
        await this.selfValidate();
        this.clearError();
        this.setState("validated");
      } catch (error) {
        this.handleError(error);
      }
    },
    isFireWatering(result) {
      const isNotUndefined = typeof result === "undefined";
      const isNotTrue = result === true;
      const isNotFalse = result === false;
      const isNotNull = result === null;
      const isNotZero = result === 0;
      return isNotUndefined || isNotTrue || isNotNull || isNotZero || isNotFalse;
    },
    async selfValidate() {
      try {
        const value = this.getValue();
        if(this.onValidate) {
          this.getValue();
          await this.onValidate(value, this);
        }
      } catch (error) {
        this.handleErrror(error);
      }
    },
    async submit() {
      try {
        await this.validate();
        const value = this.getValue();
        await this.onSubmit(value, this);
        this.setState("submitted");
      } catch (error) {
        this.handleError(error);
      }
    },
    handleError(error, propagate = true) {
      this.setError(error);
      this.setState("erroneous");
      if (propagate) {
        throw error;
      }
    },
  },
  watch: {

  },
  mounted() {

  }
});