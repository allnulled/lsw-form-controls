(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['LswFormtypes'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['LswFormtypes'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  class LswFormtypesUtils {

    static class = this;

    static async submitControl() {
      if(this.settings.parentSchemaForm) {
        await this.validate();
      }

    }

    static validateControl() {
      return this.$refs.controller.$xform.validate();
    }

    static validateSettings() {
      LswXForm.validateSettings(this.settings);
      const ensureSettings = $ensure(this.settings);
      const checkSettings = $check(this.settings);
      ensureSettings.to.have.onlyPotentialKeys([
        "name",
        "input",
        "entity",
        "database",
        "table",
        "column",
        "initialValue",
        "label",
        "parentSchemaForm",
        "extraAttributes",
        "formtypeParameters",
        "formtypeSettings"
      ]);
      if(checkSettings.to.have.key("initialValue")) {
        const ensureInitialValue = ensureSettings.its("initialValue").type("string");
      }
      if(checkSettings.to.have.key("label")) {
        const ensureHasLabel = ensureSettings.its("label").type(["string", "undefined", "boolean"]);
      }
    }

  }

  class LswFormtypes {

    static class = this;

    constructor() {
      this.$formtypes = new Map();
    }

    static utils = LswFormtypesUtils;

  }

  window.commonFormtypes = new LswFormtypes();
  
  return LswFormtypes;

});