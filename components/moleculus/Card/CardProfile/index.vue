<template>
  <div class="b-card b-card--profile">
    <div class="b-card__media">
      <img v-if="urlPhoto" :src="urlPhoto" alt="...">
      <img v-else src="@/assets/images/profile.png" alt="...">
    </div>
    <div class="b-card__body">
        <UiText :classes="[
          'text--bold',
          'text--small',
          'text--second-color'
        ]">
          <div class="b-card__subhead">{{description}}</div>
        </UiText>

        <UiTitle 
          type="h3"
          :classes="[
            'b-card__title'
        ]">
          {{title}}
        </UiTitle>
    </div>
  </div>
</template>

<script>
import UiText from '~/components/atoms/Text';
import UiTitle from '~/components/atoms/Title';

export default {
  components: {
    UiText,
    UiTitle
  },
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    urlPhoto: {
      type: String
    }
  },
}
</script>