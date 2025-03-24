(function(factory) {
  const mod = factory();
  if(typeof window !== 'undefined') {
    window["Lsw_formtypes_components"] = mod;
  }
  if(typeof global !== 'undefined') {
    global["Lsw_formtypes_components"] = mod;
  }
  if(typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function() {
Vue.component("LswFormtype", {
  template: `<div class="lsw-formtype">
    <component
        v-if="definition.name in Vue.options.components"
        :is="definition.name"
        v-on="definition.events"
        v-bind="definition.props"></component>
    <div v-else>No se encontró tipo {{ definition.name || "-" }}</div>
</div>`,
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
Vue.component("LswControlError", {
  template: `<div class="lsw_control_error">
    <div class="box_error_container position_relative"
        ref="errorBox"
        v-xform.error="{}">
        <div class="position_absolute top_0" style="right: 20px;">
            <div class="pad_1">
                <button v-on:click="removeError">❎</button>
            </div>
        </div>
        <div class="box_error_content">
            <div class="errorMessage"></div>
        </div>
    </div>
</div>`,
  props: {
    
  },
  data() {
    this.$trace("lsw-control-error-control.data");
    return {
      
    };
  },
  methods: {
    removeError() {
      this.$trace("lsw-control-error-control.methods.removeError");
      this.$refs.errorBox.$xform.$clearError();
    }
  },
  watch: {},
  mounted() {
    try {
      this.$trace("lsw-control-error-control.mounted");
    } catch (error) {
      console.log(error);
    }
  }
});
Vue.component("LswControlLabel", {
  template: `<div class="lsw_control_label">
    <div class="flex_row centered"
        style="margin-bottom:2px;">
        <div class="formtype_enunciate_block flex_100">
            <div class="formtype_label">
                <template v-if="typeof label === 'string'">
                    {{ label }}
                </template>
                <template v-else-if="label !== false">
                    Campo {{ name }}:
                </template>
            </div>
        </div>
        <div class="flex_1 pad_left_1 flex_row">
            <template v-if="parentFormtype && (parentFormtype.isEditable === true)">
                <button class="margin_left_1" v-on:click="() => parentFormtype.validate()" v-if="settings.column?.hasValidator || true">
                    ✅
                </button>
            </template>
            <button class="margin_left_1" :class="{activated: isShowingDescription}" v-on:click="() => toggleDescription()">ℹ️</button>
            <template v-if="parentFormtype && (parentFormtype.isEditable === true)">
                <button class="margin_left_1 button_to_uneditable activated" v-on:click="makeUneditable">🔓</button>
            </template>
            <template v-else>
                <button class="margin_left_1 button_to_editable" v-on:click="makeEditable">🔒</button>
            </template>
        </div>
    </div>
    <div class="formtype_enunciate_extra_info" v-if="isShowingDescription">
        ℹ️: {{ description }}
    </div>
</div>`,
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
Vue.component("LswBooleanControl", {
  template: `<div class="lsw_boolean_control">
    boolean control
</div>`,
  props: {
    configurations: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    this.$trace("lsw-boolean-control.data");
    return {};
  },
  methods: {},
  watch: {},
  mounted() {
    try {
      this.$trace("lsw-boolean-control.mounted");
    } catch(error) {
      console.log(error);
    }
  }
});
Vue.component("LswDateControl", {
  template: `<div class="lsw_date_control lsw_formtype lsw_form_control">
    <lsw-control-label :settings="settings"
        :parent-formtype="this" />
    <div v-show="isEditable">
        <div ref="controller" v-xform.control="{
            name: settings.name,
            onValidate: settings.column.hasValidator || \$noop,
            onSetError: () => {
                isEditable = true;
            }
        }">
            <div class="">
                <div class="flex_row">
                    <div class="flex_1 pad_right_1">
                        <button v-on:click="toggleCalendar" :class="{activated: isShowingCalendar}">📆</button>
                    </div>
                    <div class="flex_100">
                        <input class="width_100" type="text" v-model="value" :placeholder="respectivePlaceholder" v-xform.input="{name:'*'}"/>
                    </div>
                </div>
                <!--pre>{{ \$lsw.utils.stringify(settings) }}</pre-->
            </div>
            <div class="pad_top_1" v-if="isShowingCalendar">
                <lsw-calendario :modo="settings.column.isFormSubtype" :al-cambiar-valor="setValueFromCalendar" :valor-inicial="value" />
            </div>
            <lsw-control-error />
        </div>
    </div>
</div>`,
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
Vue.component("LswDurationControl", {
  template: `<div class="lsw_duration_control lsw_formtype lsw_form_control">
    <lsw-control-label :settings="settings"
        :parent-formtype="this" />
    <div v-show="isEditable">
        <div ref="controller"
            v-xform.control="{
            name: settings.name,
            onValidate: settings.column.hasValidator || \$noop,
            onSetError: () => {
                isEditable = true;
            }
        }">
            <div class="flex_row">
                <div class="pad_right_1">
                    <button v-on:click="toggleDetails"
                        disabled>⌛️</button>
                </div>
                <input class="flex_100"
                    type="text"
                    v-model="value"
                    v-on="settings?.input?.events || {}"
                    v-bind="settings?.input?.props || {}"
                    v-xform.input="{name: '*'}"
                    ref="textInput" />
            </div>
            <lsw-control-error />
        </div>
    </div>
</div>`,
  props: {
    settings: {
      type: Object,
      default: () => ({})
    },
  },
  data() {
    this.$trace("lsw-duration-control.data");
    this.validateSettings();
    return {
      uuid: LswRandomizer.getRandomString(5),
      value: this.settings?.initialValue || "",
      isEditable: true,
      isShowingDetails: false,
    };
  },
  methods: {
    async submit() {
      this.$trace("lsw-duration-control.methods.submit");
      return LswFormtypes.utils.submitControl.call(this);
      
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
    toggleDetails() {
      this.$trace("lsw-duration-control.methods.toggleDetails");
      this.isShowingDetails = !this.isShowingDetails;
    },
    increasePosition(pos) {
      this.$trace("lsw-duration-control.methods.increasePosition");

    },
    decreasePosition(pos) {
      this.$trace("lsw-duration-control.methods.decreasePosition");

    }
  },
  watch: {},
  mounted() {
    try {
      this.$trace("lsw-duration-control.mounted");
    } catch (error) {
      console.log(error);
    }
  }
});
Vue.component("LswTextControl", {
  template: `<div class="lsw_text_control lsw_formtype lsw_form_control">
    <lsw-control-label :settings="settings" :parent-formtype="this" />
    <div v-show="isEditable">
        <div ref="controller" v-xform.control="{
            name: settings.name,
            onValidate: settings.column.hasValidator || \$noop,
            onSetError: () => {
                isEditable = true;
            }
        }">
            <div class="flex_row">
                <input class="flex_100"
                    type="text"
                    v-model="value"
                    v-on="settings.input?.events || {}"
                    v-bind="settings.input?.props || {}"
                    v-xform.input="{name: '*',onValidate: settings.input?.onValidate || \$noop}"
                    ref="textInput" />
            </div>
            <lsw-control-error />
        </div>
    </div>
</div>`,
  props: {
    settings: {
      type: Object,
      default: () => ({})
    },
  },
  data() {
    this.$trace("lsw-text-control.data");
    this.validateSettings();
    return {
      uuid: LswRandomizer.getRandomString(5),
      value: this.settings?.initialValue || "",
      isEditable: true,
    };
  },
  methods: {
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
    }
  },
  watch: {},
  mounted() {
    try {
      this.$trace("lsw-text-control.mounted");
    } catch (error) {
      console.log(error);
    }
  }
});
Vue.component("LswLongTextControl", {
  template: `<div class="lsw_long_text_control lsw_formtype lsw_form_control">
    <lsw-control-label :settings="settings"
        :parent-formtype="this" />
    <div v-show="isEditable">
        <div ref="controller" v-xform.control="{
            name: settings.name,
            onValidate: settings.column.hasValidator || \$noop,
            onSetError: () => {
                isEditable = true;
            }
        }">
            <div class="flex_row">
                <textarea class="flex_100"
                    type="text"
                    v-model="value"
                    v-on="settings?.input?.events || {}"
                    v-bind="settings?.input?.props || {}"
                    v-xform.input="{name: '*'}"
                    ref="textInput" />
            </div>
            <lsw-control-error />
        </div>
    </div>
</div>`,
  props: {
    settings: {
      type: Object,
      default: () => ({})
    },
  },
  data() {
    this.$trace("lsw-long-text-control.data");
    this.validateSettings();
    return {
      uuid: LswRandomizer.getRandomString(5),
      value: this.settings?.initialValue || "",
      isEditable: true,
    };
  },
  methods: {
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
    }
  },
  watch: {},
  mounted() {
    try {
      this.$trace("lsw-long-text-control.mounted");
    } catch (error) {
      console.log(error);
    }
  }
});
Vue.component("LswNumberControl", {
  template: `<div class="lsw_number_control">
    number control
</div>`,
  props: {
    configurations: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    this.$trace("lsw-number-control.data");
    return {};
  },
  methods: {},
  watch: {},
  mounted() {
    try {
      this.$trace("lsw-number-control.mounted");
    } catch(error) {
      console.log(error);
    }
  }
});
Vue.component("LswOptionsControl", {
  template: `<div class="lsw_options_control lsw_formtype lsw_form_control" keep-alive="true">
    <lsw-control-label :settings="settings"
        :parent-formtype="this" />
    <div v-show="isEditable">
        <div
            v-show="settings.column.hasFormtypeParameters.type === 'selector'"
            ref="controller"
            v-xform.control="{
                name: settings.name,
                onValidate: settings.column.hasValidator || \$noop,
                onSetError: () => {
                    isEditable = true;
                }
            }">
            <select class="width_100" ref="inputter" v-xform.input="{name:'*'}" v-model="value">
                <option :value="opt"
                    v-for="opt, optIndex in settings.column.hasFormtypeParameters.available"
                    v-bind:key="'option-' + optIndex">
                    {{ opt }}
                </option>
            </select>
            <lsw-control-error />
        </div>
    </div>
</div>`,
  props: {
    settings: {
      type: Object,
      default: () => ({})
    },
  },
  data() {
    this.$trace("lsw-options-control.data");
    this.validateSettings();
    return {
      uuid: LswRandomizer.getRandomString(5),
      value: this.settings?.initialValue || "",
      isEditable: true,
      parameters: this.settings?.hasFormtypeParameters || {}
    };
  },
  methods: {
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
    }
  },
  watch: {},
  mounted() {
    try {
      this.$trace("lsw-options-control.mounted");
    } catch (error) {
      console.log(error);
    }
  }
});
Vue.component("LswRefListControl", {
  template: `<div class="lsw_ref_list_control lsw_formtype lsw_form_control">
    <lsw-control-label :settings="settings"
        :parent-formtype="this" />
    <div v-show="isEditable">
        <div ref="controller"
            v-zzzform.control="{
                name: settings.name,
                onValidate: settings.column.hasValidator || \$noop,
                onSetError: () => {
                    isEditable = true;
                }
            }">
            <div class="flex_row">
                <div class="flex_1 pad_right_1">
                    <button :class="{activated: isShownSelector}"
                        v-on:click="toggleSelector">🔎</button>
                </div>
                <input class="flex_100"
                    type="text"
                    v-model="value"
                    v-zzzform.input="{name: '*',onValidate: settings.input?.onValidate || \$noop}"
                    disabled="true"
                    ref="textInput" />
                <div class="flex_1 pad_left_1" v-if="\$window.process.env.NODE_ENV === 'test' && false">
                    <button :class="{activated: isShownInfo}"
                        v-on:click="toggleInfo">ℹ️</button>
                </div>
            </div>
            <div class="pad_top_1" v-if="isShownInfo">
                <div class="" style="white-space: pre; font-size:12px; border: 1px solid white; background-color: white; color: black;">{{ \$lsw.utils.stringify(settings) }}</div>
            </div>
            <div class=""
                v-if="isShownSelector">
                <lsw-table
                    :initial-input="rows"
                    :initial-settings="{title: \`Un ítem de «\${settings.column.refersTo.table}.\${settings.column.refersTo.property}»:\`, itemsPerPage: 50 }"
                    selectable="many"
                    :on-choose-row="v => value = \$window.console.log('valueee', v) || v"
                    :initial-choosen-value="value"
                    :columns-order="['id']"
                    choosable-id="id"></lsw-table>
            </div>
            <lsw-control-error />
        </div>
    </div>
</div>`,
  props: {
    settings: {
      type: Object,
      default: () => ({})
    },
  },
  data() {
    this.$trace("lsw-ref-list-control.data");
    this.validateSettings();
    return {
      uuid: LswRandomizer.getRandomString(5),
      value: this.settings.initialValue || [],
      isValueLoaded: false,
      isEditable: true,
      isShownSelector: false,
      isShownInfo: false,
      rows: []
    };
  },
  methods: {
    toggleSelector() {
      this.$trace("lsw-ref-list-control.methods.toggleSelector");
      this.isShownSelector = !this.isShownSelector;
    },
    toggleInfo() {
      this.$trace("lsw-ref-list-control.methods.toggleInfo");
      this.isShownInfo = !this.isShownInfo;
    },
    async submit() {
      this.$trace("lsw-ref-list-control.methods.submit");
      return LswFormtypes.utils.submitControl.call(this);
      
    },
    validate() {
      this.$trace("lsw-ref-list-control.methods.validateSettings");
      return LswFormtypes.utils.validateControl.call(this);
    },
    validateSettings() {
      this.$trace("lsw-ref-list-control.methods.validateSettings");
      return LswFormtypes.utils.validateSettings.call(this);
    },
    async loadRows() {
      this.$trace("lsw-page-rows.methods.loadRows", arguments);
      const selection = await this.$lsw.database.select(this.settings.column.refersTo.table, it => true);
      this.rows = selection;
      return selection;
    },
    async loadValue() {
      this.$trace("lsw-ref-list-control.methods.loadValue");
      const selection = await this.$lsw.database.select(this.settings.tableId, it => true);
    },
  },
  watch: {},
  async mounted() {
    try {
      this.$trace("lsw-ref-list-control.mounted");
      await this.loadRows();
    } catch (error) {
      console.log(error);
    }
  }
});
Vue.component("LswRefObjectControl", {
  template: `<div class="lsw_ref_object_control lsw_formtype lsw_form_control">
    <lsw-control-label :settings="settings"
        :parent-formtype="this" />
    <div v-show="isEditable">
        <div ref="controller"
            v-xform.control="{
                name: settings.name,
                onValidate: settings.column.hasValidator || \$noop,
                onSetError: () => {
                    isEditable = true;
                }
            }">
            <div class="flex_row">
                <div class="flex_1 pad_right_1">
                    <button :class="{activated: isShownSelector}"
                        v-on:click="toggleSelector">🔎</button>
                </div>
                <input class="flex_100"
                    type="text"
                    v-model="value"
                    v-xform.input="{name: '*',onValidate: settings.input?.onValidate || \$noop}"
                    :disabled="settings.column.refersTo.constraint"
                    ref="textInput" />
                <div class="flex_1 pad_left_1" v-if="\$window.process.env.NODE_ENV === 'test' && false">
                    <button :class="{activated: isShownInfo}"
                        v-on:click="toggleInfo">ℹ️</button>
                </div>
            </div>
            <div class="pad_top_1" v-if="isShownInfo">
                <div class="" style="white-space: pre; font-size:12px; border: 1px solid white; background-color: white; color: black;">{{ \$lsw.utils.stringify(settings) }}</div>
            </div>
            <div class=""
                v-if="isShownSelector">
                <lsw-table
                    :initial-input="rows"
                    :initial-settings="{title: \`Un ítem de «\${settings.column.refersTo.table}.\${settings.column.refersTo.property}»:\`, itemsPerPage: 50 }"
                    selectable="one"
                    :on-choose-row="v => value = \$window.console.log('valueee', v) || v"
                    :initial-choosen-value="value"
                    choosable-id="tiene_nombre"></lsw-table>
            </div>
            <lsw-control-error />
        </div>
    </div>
</div>`,
  props: {
    settings: {
      type: Object,
      default: () => ({})
    },
  },
  data() {
    this.$trace("lsw-ref-object-control.data");
    this.validateSettings();
    return {
      uuid: LswRandomizer.getRandomString(5),
      value: this.settings.initialValue || [],
      isValueLoaded: false,
      isEditable: true,
      isShownSelector: false,
      isShownInfo: false,
      rows: []
    };
  },
  methods: {
    toggleSelector() {
      this.$trace("lsw-ref-object-control.methods.toggleSelector");
      this.isShownSelector = !this.isShownSelector;
    },
    toggleInfo() {
      this.$trace("lsw-ref-object-control.methods.toggleInfo");
      this.isShownInfo = !this.isShownInfo;
    },
    async submit() {
      this.$trace("lsw-ref-object-control.methods.submit");
      return LswFormtypes.utils.submitControl.call(this);
      
    },
    validate() {
      this.$trace("lsw-ref-object-control.methods.validateSettings");
      return LswFormtypes.utils.validateControl.call(this);
    },
    validateSettings() {
      this.$trace("lsw-ref-object-control.methods.validateSettings");
      return LswFormtypes.utils.validateSettings.call(this);
    },
    async loadRows() {
      this.$trace("lsw-page-rows.methods.loadRows", arguments);
      const selection = await this.$lsw.database.select(this.settings.column.refersTo.table, it => true);
      this.rows = selection;
      return selection;
    },
    async loadValue() {
      this.$trace("lsw-ref-object-control.methods.loadValue");
      const selection = await this.$lsw.database.select(this.settings.tableId, it => true);
    },
  },
  watch: {},
  async mounted() {
    try {
      this.$trace("lsw-ref-object-control.mounted");
      await this.loadRows();
    } catch (error) {
      console.log(error);
    }
  }
});
Vue.component("LswRefRelationControl", {
  template: `<div class="lsw_ref_relation_control">
    Ref relation control
</div>`,
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
Vue.component("LswFormBuilder", {
  template: `<div class="lsw-form-builder">
    <div v-if="formMetadata">
        <div v-form.form="formMetadata.form.vForm"
            ref="currentFormElement"></div>
        <button v-if="validate?.text"
            v-on:click="() => \$refs.currentFormElement.\$lswFormMetadata.methods.validate()">{{ validate.text }}</button>
        <button v-if="submit?.text"
            v-on:click="() => \$refs.currentFormElement.\$lswFormMetadata.methods.submit()">{{ submit.text }}</button>
        <div v-form.error="{
            parentScope: formMetadata.form.scope,
            parentId: formMetadata.form.id + '.error'
        }"></div>
        <div :class="field?.css?.classes?.group || {}"
            v-for="field, fieldIndex in formMetadata.fields"
            v-bind:key="'list_of_fields_index_' + fieldIndex">
            <div class="form_field_label"
                v-if="field.label">
                {{ field.label }}
            </div>
            <div v-if="field.component">
                <component :is="field.component.id"
                    v-bind="field.component.props || {}"
                    v-on="field.component.events || {}"></component>
            </div>
            <template v-else-if="field.type">
                <lsw-formtype v-if="Vue.options.components.LswFormtype" :of="field" />
                <div v-if="field.type === 'text'">
                    <input type="text"
                        v-bind="field.input?.props || {}"
                        v-on="field.input?.events || {}"
                        v-form.input="field.vForm" />
                </div>
                <div v-else-if="field.type === 'longtext'">
                    <textarea v-bind="field.input?.props || {}"
                        v-on="field.input?.events || {}"
                        v-form.input="field.vForm"></textarea>
                </div>
                <div v-else-if="field.type === 'point'">
                    <div class="control_upper" v-form.control="field.vForm">
                        <div class="control_lower" v-form.control="field.vFormForPoint">
                            <div v-for="dimension, dimensionIndex in field.dimensions" v-bind:key="'list_' + fieldIndex + '_dimensions_index_' + dimensionIndex">
                                <div class="form_field_label" v-if="dimension.label">{{ dimension.label }}</div>
                                <input type="number"
                                    v-bind="dimension.input?.props || {}"
                                    v-on="dimension.input?.events || {}"
                                    v-form.input="dimension.vForm" />
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </div>
</div>`,
  props: {
    validate: {
      type: Object,
      default: () => ({})
    },
    submit: {
      type: Object,
      default: () => ({})
    },
    fields: {
      type: Array,
      required: true,
    }
  },
  data() {
    this.$trace("lsw-form-builder.data");
    this.formatFields();
    return {
      formMetadata: false,
    };
  },
  methods: {
    setError(error) {
      this.$trace("lsw-form-builder.setError");
      this.error = error;
    },
    formatFields(value = this.fields) {
      this.$trace("lsw-form-builder.formatFields");
      try {
        const $outterScope = {};
        if (value.length === 0) {
          throw new Error("Required property «prop.fields» to be an array on «LswFormBuilder.props.fields.validator»");
        }
        const fields = [];
        const form = {
          scope: $outterScope,
          id: "form.default"
        };
        const metadata = { fields, form, scope: $outterScope };
        form.vForm = {
          selfScope: $outterScope,
          selfId: form.id,
          onValidate: typeof this.validate.onClick === 'function' ? this.validate.onClick : this.$noop,
          onSubmit: typeof this.submit.onClick === 'function' ? this.submit.onClick : this.$noop,
        }
        for (let index = 0; index < value.length; index++) {
          const row = value[index];
          if (typeof row !== "object") {
            throw new Error(`Required all rows on «prop.fields» to be an object but row «${index}» does not on «LswFormBuilder.props.fields.validator»`)
          }
          if (!("type" in row)) {
            throw new Error(`Required all rows on «prop.fields» to have property «type» but row «${index}» does not on «LswFormBuilder.props.fields.validator»`)
          }
          if (typeof row.type !== "string") {
            throw new Error(`Required all rows on «prop.fields» to have property «type» as a string but row «${index}» does not on «LswFormBuilder.props.fields.validator»`)
          }
          if (!("name" in row)) {
            throw new Error(`Required all rows on «prop.fields» to have property «name» but row «${index}» does not on «LswFormBuilder.props.fields.validator»`)
          }
          if (typeof row.name !== "string") {
            throw new Error(`Required all rows on «prop.fields» to have property «name» as a string but row «${index}» does not on «LswFormBuilder.props.fields.validator»`)
          }
          const $innerScope = {};
          row.vForm = {
            parentScope: $outterScope,
            parentId: metadata.form.id,
            selfScope: $innerScope,
            selfId: row.name,
            name: row.name,
          };
          if (row.type === "point") {
            row.dimensions = [];
            row.vFormForPoint = {
              parentScope: $innerScope,
              parentId: row.name,
              selfScope: $innerScope,
              selfId: "point.control",
              name: null,
            };
            row.dimensions = [{
              label: "Axis 1:",
              vForm: {
                parentScope: $innerScope,
                parentId: "point.control",
                name: "axis_1"
              }
            }, {
              label: "Axis 2:",
              vForm: {
                parentScope: $innerScope,
                parentId: "point.control",
                name: "axis_2"
              }
            }];
            if (row.dimensions.length < 2) {
              throw new Error(`Required property «row.dimensions» to have more than 1 item on row «${index}» on «adaptRowToVForm»`);
            }
            for (let indexDimension = 0; indexDimension < row.dimensions.length; indexDimension++) {

            }
          }
          fields.push(row);
        }
        this.formMetadata = Object.freeze(metadata);
      } catch (error) {
        console.log(error);
        this.setError(error);
      }
    },
    adaptRowToVForm(row, metadata, indexRow) {
      this.$trace("lsw-form-builder.adaptRowToVForm");

    }
  },
  watch: {},
  mount() {
    try {
      this.$trace("lsw-form-builder.mount");
    } catch (error) {
      console.log(error);
    }
  },
  mounted() {
    try {
      this.$trace("lsw-form-builder.mounted");
      this.formatFields();
    } catch (error) {
      console.log(error);
    }
  }
});
});
