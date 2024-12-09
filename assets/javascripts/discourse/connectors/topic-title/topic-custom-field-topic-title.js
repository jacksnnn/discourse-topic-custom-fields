import Component from "@glimmer/component";
import { inject as controller } from "@ember/controller";
import { alias } from "@ember/object/computed";
import { service } from "@ember/service";

/*
 * type:        step
 * number:      8
 * title:       Display your field value in the topic
 * description: Display the value of your custom topic field below the
 *              title in the topic
 *              list.
 */

export default class TopicCustomFieldTopicTitle extends Component {
  @service siteSettings;
  @controller topic;
  @alias("siteSettings.topic_custom_field_name") fieldName;

  get fieldValue() {
    return this.args.outletArgs.model.get(this.fieldName); 
  }

  isValidProcessId(str) {
    // UUID format validation regex
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\/?$/i;
    return uuidRegex.test(str);
  }

  get fieldUrl() {
    console.log(this.fieldValue);
    if (!this.fieldValue) return null;

    // If it's already a valid process ID, use it directly
    if (this.isValidProcessId(this.fieldValue)) {
      return `https://www.fabublox.com/process-editor/${this.fieldValue}`;
      
    }

    // If it's a full URL, extract and validate the process ID
    const parts = this.fieldValue.split("/");
    const lastPart = parts[parts.length - 1];

    if (this.isValidProcessId(lastPart)) {
      return `https://www.fabublox.com/process-editor/${lastPart}`;
    }

    // Invalid input - return null or handle as needed
    return null;
  }
}