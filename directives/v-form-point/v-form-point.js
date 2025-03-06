Vue.directive("form-point", {
  bind(el, binding) {
    Inject_metadata: {
      console.log(binding);
      el.$lswFormMetadata = {
        component: binding.instance,
        element: el,
        methods: {
          submit: function() {
            
          },
          validate: function() {

          }
        }
      };
    }
  },
  unbind(el) {
    Clean_metadata: {
      if(el.$lswFormMetadata) {
        el.$lswFormMetadata.component.$off("validate-form");
        el.$lswFormMetadata.component = null;
      }
    }
  }
});