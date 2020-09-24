<template>
  <div class="main">
    <h1 class="main__title" v-text="title"></h1>
    <Passenger />
    <ExtraCharge />
  </div>
</template>

<script>
import Passenger from '@/components/Passenger.vue'
import ExtraCharge from '@/components/ExtraCharge.vue'

export default {
  name: 'Main',
  components: {
    Passenger,
    ExtraCharge
  },
  data () {
    return {
      title: 'Тестовое задание'
    }
  }
}
</script>
<style lang="scss" scoped>
.main {
  widows: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  &__title {
    font-size: 2em;
    color: #555555;
    line-height: 2.2em;
  }
}
</style>
