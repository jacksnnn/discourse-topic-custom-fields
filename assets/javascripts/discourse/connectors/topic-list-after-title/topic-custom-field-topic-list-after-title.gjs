import Component from "@glimmer/component";
import TopicListCustomField from "../../components/topic-list-custom-field";

export default class TopicCustomFieldTopicListAfterTitle extends Component {
  <template>
    <TopicListCustomField @topic={{@outletArgs.topic}} />
  </template>
} 