Vue.component("LswFormBuilder", {
  template: $template,
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