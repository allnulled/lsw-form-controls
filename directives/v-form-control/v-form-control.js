Vue.directive("form-control", {
  bind(el, binding) {
    Export_vue_instance_to_html_element: {
      el._formComponent = binding.instance;
    }
  },
  unbind(el) {
    Clean_vue_instance_from_html_element: {
      if(el._formComponent) {
        el._formComponent.$off("validate-form");
        el._formComponent = null;
      }
    }
  }
});