(function(factory) {
  const mod = factory();
  if(typeof window !== 'undefined') {
    window["Lsw_form_controls_components"] = mod;
  }
  if(typeof global !== 'undefined') {
    global["Lsw_form_controls_components"] = mod;
  }
  if(typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function() {
Vue.component("ControlBox", {
  template: `<div class="ControlBox FormControl">
  <!--Content of the form-->
  <slot></slot>
  <!--Buttons of the form-->
  <div class="ControlBoxButtons" v-if="validateButton || submitButton">
    <span v-if="validateButton">
        <button v-on:click="validate">Validate</button>
    </span>
    <span v-if="submitButton">
        <button v-on:click="submit">Submit</button>
    </span>
  </div>
  <!--Error of the form-->
  <ControlError class="unsized" v-if="error" :error="error" :control="this" style="margin-bottom: 4px;" />
  <div class="ControlSuccess" v-else-if="showValidatedMessage && (state === 'validated')">
    ☑️ All fields are valid.
  </div>
  <div class="ControlSuccess" v-else-if="showSubmittedMessage && (state === 'submitted')">
    ☑️ Data was successfully submitted.
  </div>
  <div class="ControlPending" v-else-if="state === 'pending'">
    🕒 One moment, please... 🕒
  </div>
  <!--End of the form-->
</div>`,
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
    jsonify(argInput) {
      const seen = new WeakSet();
      return JSON.stringify(argInput, function (key, value) {
        if (typeof value === "object") {
          if (seen.has(value)) {
            return "[Circular]";
          }
          if (value !== null) {
            seen.add(value);
          }
        }
        return value;
      }, 2);
    }
  },
  watch: {

  },
  mounted() {

  }
});
Vue.component("ControlError", {
  template: `<div class="ControlError">
    <pre><span class="errorName">{{ error.name }}:</span> <span class="errorMessage">{{ error.message }}</span> <span class="errorStack">[{{ error.stack }}]</span></pre>
    <span v-on:click="clearError" class="clearErrorButton">❎</span>
</div>`,
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
Vue.component("ArrayControl", {
  template: `<div class="ArrayControl FormControl ControlType">
  
</div>`,
  props: {
    
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
Vue.component("BooleanControl", {
  template: `<div class="BooleanControl FormControl ControlType">
  
</div>`,
  props: {
    
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
Vue.component("NumberControl", {
  template: `<div class="NumberControl FormControl ControlType">
  
</div>`,
  props: {
    
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
Vue.component("StringControl", {
  template: `<div class="StringControl FormControl ControlType">
    <div class="FormLabel" v-if="label">{{ label }}</div>
    <input v-if="!multiline" class="FormInput" type="text" v-model="value" :placeholder="placeholder" />
    <textarea v-else class="FormInput" :class="cssClasses.textarea || {}" :style="cssStyles.textarea || {}" v-model="value" :placeholder="placeholder" />
    <ControlError v-if="error" :error="error" :control="this" />
</div>`,
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
});
