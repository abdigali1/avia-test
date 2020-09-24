<template>
  <div class="extra-charge">
    <div class="extra-charge__content">
      <form class="extra-charge__form form">
        <div class="form__row">
          <div class="form__col">
            <img class="form__row-img" src="@/assets/add.png" alt="plus">
            <div class="form__text">
              <h3 class="form__row-title" v-text="rowTitle"></h3>
              <p class="form__row-subtitle" v-text="rowSubtitle"></p>
            </div>
          </div>
          <button class="form__button" :class="changeStateClass" v-text="changeStateText" @click.prevent="changeStateClick(additional)"></button>
        </div>
        <transition name="fade">
          <div class="form__col-sec" v-if="additional === 2">
            <div class="form__row-sec">
              <div class="form__input-block name-input">
                <label class="form__input-label" for="name" v-text="labelText.name"></label>
                <input class="form__input" :class="{ 'error' : error.name }" id="name" :placeholder="placeholder.name" type="text" v-model="form.name">
              </div>
              <div class="form__input-block price-input">
                <label class="form__input-label" for="price" v-text="labelText.price"></label>
                <input class="form__input" :class="{ 'error' : error.price }" id="price" :placeholder="placeholder.price" type="number" v-model="form.price">
              </div>
            </div>

            <hr class="form__line">
            <div class="form__row">
              <div class="form__price-text">
                <p class="form__price-label" v-text="priceText"></p>
                <p class="form__price" v-text="form.price === '' ? '0 KZT' : form.price + ' KZT'"></p>
              </div>
              <button class="form__button" v-text="buttonTextAdd" @click.prevent="addExtraCharge()"></button>
            </div>
          </div>
        </transition>
        <transition name="fade">
          <div class="form__col-sec" v-if="additional === 3">
            <div class="form__row">
              <div class="form__text-block">
                <label class="form__text-label" v-text="labelText.name"></label>
                <p class="form__text-value" v-text="getExtraCharge().name"></p>
                
              </div>
              <div class="form__text-block">
                <label class="form__text-label" v-text="labelText.price"></label>
                <p class="form__text-value" v-text="getExtraCharge().price"></p>
              </div>
              <button class="form__button-delete" v-text="buttonTextDelete" @click.prevent="deleteExtraCharge()"></button>
            </div>
          </div>
        </transition>
        <transition name="fade">
          <div class="form__col-sec" v-if="additional === 4">
            <div class="form__row-sec">
              <div class="form__input-block name-input">
                <label class="form__input-label" for="name" v-text="labelText.name"></label>
                <input class="form__input" :class="{ 'error' : error.name }" id="name" :placeholder="placeholder.name" type="text" v-model="form.name">
              </div>
              <div class="form__input-block price-input">
                <label class="form__input-label" for="price" v-text="labelText.price"></label>
                <input class="form__input" :class="{ 'error' : error.price }" id="price" :placeholder="placeholder.price" type="number" v-model="form.price">
              </div>
            </div>

            <hr class="form__line">
            <div class="form__row">
              <div class="form__price-text">
                <p class="form__price-label" v-text="priceText"></p>
                <p class="form__price" v-text="form.price === '' ? '0 KZT' : form.price + ' KZT'"></p>
              </div>
              <div class="form__col">
                <button class="form__button-add" v-text="buttonTextSave" @click.prevent="addExtraCharge()"></button>
                <button class="form__button-delete" v-text="buttonTextDelete" @click.prevent="deleteExtraCharge()"></button>
              </div>
            </div>
          </div>
        </transition>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex"

export default {
  name: 'ExtraCharge',
  data() {
    return {
      rowTitle: 'Дополнительные сборы агенства',
      rowSubtitle: 'Вы можете добавить допольнительные сборы/услуги для вашего агенства',
      buttonTextAdd: 'Добавить',
      buttonTextEdit: 'Изменить',
      buttonTextHide: 'Скрыть',
      buttonTextDelete: 'Удалить',
      buttonTextSave: 'Сохранить',
      priceText: 'К оплате дополнительных сборов: ',
      form: {
        name: '',
        price: '',
      },
      errorCheck: false,
      error: {
        name: false,
        price: false,
      },
      placeholder: {
        name: 'Введите название',
        price: '0',
      },
      labelText: {
        name: 'Названия сбора',
        price: 'Стоимость',
      },
      additional: 1,
    }
  },
  computed: {
    changeStateClass() {
      if(this.additional === 1) return 'form__button'
      if(this.additional === 2) return 'form__button-additional'
      if(this.additional === 3) return 'form__button'
      else return 'form__button-none'
    },
    changeStateText() {
      if(this.additional === 1) return this.buttonTextAdd
      if(this.additional === 2) return this.buttonTextHide
      if(this.additional === 3) return this.buttonTextEdit
      else return this.buttonTextHide
    }
  },
  methods: {
    ...mapActions({
      addExtraChargeAction: 'addExtraCharge',
      deleteExtraChargeAction: 'deleteExtraCharge'
    }),
    ...mapGetters({
      getExtraCharge: 'getExtraCharge',
    }),
    changeStateClick(n) {
      if(n === 1) { 
        this.additional = 2 
        return
      }
      if(n === 2) {
        this.additional = 1
        return
      }
      if(n === 3) {
        this.additional = 4
        return
      }
    },
    deleteExtraCharge() {
      this.deleteExtraChargeAction().then(() => {
        this.additional = 1
        this.form.name = ''
        this.form.price= ''
      })
    },
    addExtraCharge() {
      for(var key in this.form) {
        if(this.form[key] === '') this.error[key] = true
        else this.error[key] = false
      }
      for(var i in this.error) {
        if(this.error[i] === true) {
          this.errorCheck = true
          return false
        } else {
          this.errorCheck = false
        }
      }
      if(this.errorCheck === false) {
        this.addExtraChargeAction({
          name: this.form.name,
          price: this.form.price,
        }).then(() => {
          this.additional = 3
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.extra-charge {
  // box-shadow: 0px -2px 12px -8px rgba(0,0,0,0.75);
  display: flex;
  width: 996px;
  padding: 25px 30px;
  background-color: white;
  border-radius: 8px;
  color: #555555;
  box-sizing: border-box;

  &__content {
    width: 100%;
    height: 100%;
  }
}
.form {
  &__row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: .9em;

    &:last-child {
      margin-bottom: 0;
    }
  }
  &__row {
    justify-content: space-between;
    display: flex;
    margin-bottom: 2em;
    align-items: center;
  }
  &__line {
    width: 100%;
    height: 2px;
    background-color: #F5F7FA;
    border: none;
    margin: 1.5em 0;
    padding: 0 35px;
    transform: translateX(-30px);
    box-sizing: content-box;
  }
  &__col {
    display: flex;
    align-items: center;
  }
  &__col-sec {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  &__row-img {
    width: 40px;
    height: 40px;
    margin-right: 1.5em;
  } 
  &__price-text {
    display: flex;
    align-items: flex-end;
  }
  &__price-label {
    font-size: .9em;
    font-weight: 500;
    line-height: 1em;
    margin-right: .5em;
  }
  &__price {
    font-size: 1.4em;
    font-weight: 600;
    line-height: .9em;
  }
  &__text {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  &__row-title {
    font-size: .85em;
    font-weight: 600;
    line-height: 1.4em;
    margin-bottom: .3em;
  }
  &__row-subtitle {
    font-size: .78em;
    font-weight: 500;
    line-height: 1.4em;
    color: #B0BCCF;
  }
  &__button-delete {
    width: 160px;
    height: 40px;
    border-color: #F0959E !important;
    outline: none;
    background-color: transparent !important;
    color: #F0959E !important;
    border-radius: 4px;
    cursor: pointer;
  }
  &__button-additional {
    width: 160px;
    height: 40px;
    border-color: #4B77BE !important;
    outline: none;
    background-color: transparent !important;
    color: #4B77BE !important;
    border-radius: 4px;
    cursor: pointer;
  }
  &__button {
    width: 160px;
    height: 40px;
    border: 1px solid transparent;
    outline: none;
    background-color: #4B77BE;
    color: white;
    border-radius: 4px;
    cursor: pointer;
  }
  &__button-none {
    opacity: 0;
  }
  &__button-add {
    margin-right: 1em;
    width: 160px;
    height: 40px;
    border: 1px solid transparent;
    outline: none;
    background-color: #4B77BE;
    color: white;
    border-radius: 4px;
    cursor: pointer;
  }
  &__row-sec {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__input-block {
    display: flex;
    flex-direction: column;
    margin-right: 1em;

    &:last-child {
      margin-right: 0;
    }
  }
  &__text-block {
    display: flex;
    flex-direction: column;
    margin-right: 1em;

    // &:last-child {
    //   margin-right: 0;
    // }
  }
  &__text-label {
    font-size: .78em;
    font-weight: 500;
    line-height: 1.4em;
    color: #B0BCCF;
  }
  &__text-value {
    font-size: 1.1em;
    font-weight: 600;
    line-height: 1em;
    margin-top: .5em;
  }
  &__input-label {
    font-size: .9em;
    font-weight: 500;
    line-height: 1em;
    margin-bottom: .5em;
  }
  &__input {
    width: 100%;
    height: 40px;
    background-color: transparent;
    border: 1px solid #DDE3EB;
    border-radius: 4px;
    outline: none;
    padding: 0 10px;
    box-sizing: border-box;
  } 
  & .name-input {
    width: 64%;
  }
  & .price-input {
    width: 30%;
  }
  ::placeholder {
    color: #DEE3EB;
    opacity: 1;
  }
  :-ms-input-placeholder {
    color: #DEE3EB;
  }
  ::-ms-input-placeholder {
    color: #DEE3EB;
  }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.error {
  border-color: red !important;
  animation: shake 0.15s;
  animation-iteration-count: 1.5;
}
@keyframes shake {
  0% { transform: translateY(1px); }
  50% { transform: translateY(-1px); }
  100% { transform: translateY(0px); }  
}
</style>
