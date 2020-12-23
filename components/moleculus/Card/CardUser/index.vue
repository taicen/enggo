<template>
  <div class="b-card b-card--user">
    <div class="b-card__media">
      <img v-if="urlPhoto" :src="urlPhoto" alt="...">
      <img v-else src="@/assets/images/profile.png" alt="...">
      <button class="btn b-card__remove" @click="handleRemove(id)">
        <svg-icon name="close" class="icon-close"/>
      </button>
    </div>
    <div class="b-card__body">
      <UiTitle 
          type="h3"
          :classes="[
            'b-card__title'
        ]">
        {{title}}
      </UiTitle>

      <UiText :classes="[
        'text--bold',
        'text--small',
        'text--second-color'
      ]">
        <div class="b-card__subhead">{{email}}</div>
      </UiText>

      <div class="form-group--btn">
        <button class="btn btn--ghost" @click="handleEdit(id)">Edit</button>
      </div>
        
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
    id: {
      type: Number
    },
    title: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    urlPhoto: {
      type: String
    }
  },
  methods:{
    handleEdit(id){
      console.log("%c 🎳: handleEdit -> id ", "font-size:16px;background-color:#d4fcec;color:black;", id)
    },
    handleRemove(id){
      console.log("%c 🐟: handleRemove -> id ", "font-size:16px;background-color:#de71c2;color:white;", id)
    }
  }
}
</script>