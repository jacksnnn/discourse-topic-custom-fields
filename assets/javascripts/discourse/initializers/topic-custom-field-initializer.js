import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "topic-custom-field-intializer",
  initialize(container) {
    // Takes the site settings from the container 
    const siteSettings = container.lookup("site-settings:main");
    const fieldName = siteSettings.topic_custom_field_name;

    withPluginApi("1.37.3", (api) => {
      /* For step 5 see connectors/composer-fields/topic-custom-field-composer.js */
      /* For step 6 see connectors/edit-topic/topic-custom-field-edit-topic.js */

      /*
       * type:        step
       * number:      7
       * title:       Serialize your field to the server
       * description: Send your field along with the post and topic data saved
       *              by the user when creating a new topic, saving a draft, or
       *              editing the first post of an existing topic.
       * references:  discourse/app/lib/plugin-api.js,
       *              discourse/app/models/composer.js
       */
      api.serializeOnCreate(fieldName); 
      api.serializeToDraft(fieldName); 
      api.serializeToTopic(fieldName, `topic.${fieldName}`); 

      /* For step 8 see connectors/topic-title/topic-custom-field-topic-title.js */

      /*
       * type:        step
       * number:      9 & 10
       * title:       Display in topic list
       * description: The topic list customization is now handled by the Glimmer component
       *              in connectors/topic-list-after-title/topic-custom-field-topic-list-after-title.gjs
       *              and components/topic-list-custom-field.gjs
       */
    });
  },
};
