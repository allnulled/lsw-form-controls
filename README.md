# lsw-form-controls

Form controls UI toolkit for LSW.

## Install

```sh
npm i -s @allnulled/lsw-form-controls
```

## Import

```html
<script src="node_modules/@allnulled/lsw-form-controls/lsw-form-controls.js"></script>
<link rel="stylesheet" type="text/css" href="node_modules/@allnulled/lsw-form-controls/lsw-form-controls.css" />
```

## Use

En este ejemplo, conseguimos:

  - Un formulario de 4 campos
  - Cada uno con su nombre, valor inicial, texto de relleno, validador, y referencia de formulario padre.
  - El formulario tiene botón de validar y de enviar.
  - El formulario tiene un evento de enviar donde solo imprime el valor del formulario actual.
  - Explotamos validación síncrona y asíncrona
  - Nos mostrará automáticamente un mensaje de error en cada campo, y al final del formulario un resumen de los anteriores.
  - Nos mostrará automáticamente un mensaje de cuando está pendiente de validación (por operaciones asíncronas que pudieran sucederse, como en name=delay del ejemplo).
  - Nos mostrará automáticamente un mensaje de cuando está enviado.

Todo esto, con escasas especificaciones paramétricas:

```html
<control-box :on-submit="$console.log"
    validate-button="Validate"
    submit-button="Submit"
    form-id="user">
    <string-control name="name"
        label="User name:"
        initial-value="Carl"
        placeholder="Your name here"
        :on-validate="v => { if(v !== 'Carl') return new Error('Name must be Carl') }"
        form-id="user" />
    <string-control name="age"
        label="User age:"
        initial-value="34"
        placeholder="Your age here"
        :on-validate="v => { if(parseInt(v) < 30) return new Error('Age must be over 30') }"
        form-id="user" />
    <string-control name="city"
        label="User city:"
        initial-value="Los Angeles"
        placeholder="Your city here"
        :on-validate="v => { if(!v.startsWith('Los')) return new Error('City must start with Los') }"
        form-id="user" />
    <string-control name="delay"
        label="User delay:"
        initial-value="Validation requires time here"
        placeholder="Your delay here"
        :on-validate="() => new Promise((_,ok) => setTimeout(() => ok(new Error('No parameter provided')), 1000))"
        form-id="user" />
</control-box>
```

Y el `string-control` es el ejemplo más básico, donde solo le estamos inyectando la interfaz base `LswFormControls.mixins.BasicControl`, el componente `string-control` apenas aporta el placeholder específico de su caso, lo demás es común en todos.

Por lo cual, aseguramos un comportamiento base muy bueno para escalar formularios.

## API

El mixin en `LswFormControls.mixins.BasicControl` es la clave principal del asunto.

```js
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
```

Luego tienes `ControlBox` que imita parte de la API, pero no usa el mixin, y no funciona igual:

```js
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
            unknownObjects.push(result);
          }
        }
        if (errors.length) {
          const errorsSummary = errors.map((err, index) => `${index + 1}. ${err.name}: ${err.message}`).join("\n");
          throw new Error(`Cannot validate form due to ${errors.length} error(s) arised on validation:\n${errorsSummary}`);
        }
        if (unknownObjects.length) {
          const unknownzSummary = unknownz.map((err, index) => `${index + 1}. ${this.jsonify(err)}`).join("\n");
          throw new Error(`Cannot validate form due to ${unknownz.length} unknown object(s) returned on validation:\n${unknownzSummary}`);
        }
        this.clearError();
        this.setState("validated");
      } catch (error) {
        this.handleError(error);
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
    cyclicReducer() {
      return (arg) => {
        if (typeof arg === 'object') {
          if (arg instanceof Error) {
            return this.formatError(arg);
          } else {
            const seen = new WeakSet();
            return JSON.stringify(arg, function (key, value) {
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
        } else {
          return arg;
        }
      };
    },
    jsonify(arg) {
      return JSON.stringify(arg, this.cyclicReducer, 2);
    }
  },
  watch: {

  },
  mounted() {

  }
});
```


## Validation 

La validación está pensada para que le pases una función, y él ya cuando llames al `validate` del Box, él llame a todos los `validate` internos, con sus `await`s y sus `getValue` intermedios.

