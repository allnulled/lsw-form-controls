(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['LswFormControls'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['LswFormControls'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  class LswFormControlsClass {

    static class = this;

    constructor() {
      this.mixins = new Map();
    }

    registerMixin(name, mixin) {
      if(this.mixins.has(name)) {
        throw new Error(`Cannot register mixin because it is already registered «${name}» on «LswFormControls.registerMixin»`);
      }
      this.mixins.set(name, mixin);
    }

    unregisterMixin(name) {
      if(this.mixins.has(name)) {
        throw new Error(`Cannot unregister mixin because it is not registered «${name}» on «LswFormControls.unregisterMixin»`);
      }
      this.mixins.delete(name);
    }

  }

  const LswFormControls = new LswFormControlsClass();

  LswFormControls.registerMixin("BasicControl", {
    props: {
      initialValue: {
        type: [String,Object,Array,Boolean,Number,undefined],
        default: () => undefined
      },
      onValidate: {
        type: Function,
        default: () => true
      },
      onChange: {
        type: Function,
        default: () => undefined
      },
      onDelayedChange: {
        type: Function,
        default: () => undefined
      },
      delayedTimeout: {
        type: Number,
        default: () => 3000
      },
      label: {
        type: String,
        default: () => ""
      },
      formId: {
        type: String,
        default: () => "default"
      },
      name: {
        type: String,
        default: () => undefined
      },
      cssStyles: {
        type: Object,
        default: () => ({})
      },
      cssClasses: {
        type: Object,
        default: () => ({})
      }
    },
    data() {
      return {
        _delayedChangeTimeoutId: undefined,
        error: false,
        value: this.initialValue,
      }
    },
    methods: {
      setValue(newValue) {
        this.value = newValue;
      },
      getValue() {
        return this.value;
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
      async validate() {
        if(typeof this.onValidate !== "function") {
          throw new Error("Required «onValidate» to be a function on «BasicControl.validate»");
        }
        try {
          const value = this.getValue();
          const result = await this.onValidate(value, this);
          if(typeof result === "undefined") {
            this.clearError();
          } else if(result instanceof Error) {
            this.setError(result);
          } else {
            // @OK
            this.clearError();
          }
          return result;
        } catch (error) {
          this.setError(error);
          return error;
        }
      }
    },
    watch: {
      value(newValue) {
        if(this.onChange === "function") {
          this.onChange(newValue, this);
        }
        if(this.onDelayedChange === "function") {
          clearTimeout(this._delayedChangeTimeoutId);
          this._delayedChangeTimeoutId = setTimeout(() => {
            this.onDelayedChange(newValue, this);
          }, this.delayedTimeout);
        }
      }
    },
    mounted() {
      this.$el.$lswFormControlComponent = this;
    }
  })
  
  return LswFormControls;

});