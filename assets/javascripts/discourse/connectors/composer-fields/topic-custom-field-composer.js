import Component from "@glimmer/component";
import { action } from "@ember/object";
import { service } from "@ember/service";
import { alias } from "@ember/object/computed";

export default class TopicCustomFieldComposer extends Component {
  @service siteSettings;
  @alias("siteSettings.topic_custom_field_name") fieldName;
  @alias("args.outletArgs.model") composerModel;
  @alias("composerModel.topic") topic;
  @alias("composerModel.replyingToTopic") reply;
  @alias("composerModel.canEditTitle") canEditTitle;

  constructor() {
    super(...arguments);
    if (
      !this.composerModel[this.fieldName] &&
      this.topic &&
      this.topic[this.fieldName] &&
      !this.reply &&
      this.canEditTitle == false
    ) {
      const processUrl = this.transformToUrl(this.topic[this.fieldName]);
      this.composerModel.set(this.fieldName, processUrl);
      this.fieldValue = processUrl;
    }
  }

  isValidProcessId(str) {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\/?$/i;
    return uuidRegex.test(str);
  }

  transformToUrl(value) {
    if (!value) return null;

    // Clean up the value
    value = value.trim();

    // If it's already a valid process ID
    if (this.isValidProcessId(value)) {
      return `https://www.fabublox.com/process-editor/${value}`;
    }

    // If it's a full URL, extract and validate the process ID
    const parts = value.split("/");
    const lastPart = parts[parts.length - 1];

    if (this.isValidProcessId(lastPart)) {
      return `https://www.fabublox.com/process-editor/${lastPart}`;
    }

    return null;
  }

  @action
  onChangeField(fieldValue) {
    const processUrl = this.transformToUrl(fieldValue);
    if (processUrl) {
      this.fieldValue = processUrl;
      this.composerModel.set(this.fieldName, processUrl);
      
    } else {
      // Handle invalid input - either clear the field or keep the original value
      this.composerModel.set(this.fieldName, null);
      this.fieldValue = null;
    }
  }
}