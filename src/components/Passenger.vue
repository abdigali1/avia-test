<template>
  <div class="passenger">
    <div class="passenger__content">
      <form class="passenger__form form" @submit.prevent="addPassenger()">
        <h2 class="form__title" v-text="title"></h2>
        <div class="form__row">
          <div class="form__input-block">
            <label class="form__input-label" for="surname" v-text="labelText.surname"></label>
            <input class="form__input text-input" :class="{ 'error' : error.surname }" id="surname" :placeholder="placeholder.surname" type="text" v-model="form.surname">
          </div>
          <div class="form__input-block">
            <label class="form__input-label" for="name" v-text="labelText.name"></label>
            <input class="form__input text-input" :class="{ 'error' : error.name }" id="name" :placeholder="placeholder.name" type="text" v-model="form.name">
          </div>
          <div class="form__input-block">
            <label class="form__input-label" for="sex" v-text="labelText.sex"></label>
            <select class="form__input select" :class="{ 'error' : error.sex }" id="sex" v-model="form.sex">
              <option class="form__selected-option" value="" disabled selected hidden v-text="choose"></option>
              <option class="form__select-option"  v-text="sexOptions.male"></option>
              <option class="form__select-option"  v-text="sexOptions.female"></option>
            </select>
          </div>
          <div class="form__input-block">
            <label class="form__input-label" for="birthDate" v-text="labelText.birthDate"></label>
            <input class="form__input date-input" :class="{ 'error' : error.birthDate }" id="birthDate" :placeholder="placeholder.birthDate" type="date" v-model="form.birthDate">
          </div>
        </div>
        <div class="form__row">
          <div class="form__input-block">
            <label class="form__input-label" for="nationality" v-text="labelText.nationality"></label>
            <select class="form__input select" :class="{ 'error' : error.nationality }" id="nationality" v-model="form.nationality">
              <option class="form__selected-option" value="" disabled selected hidden v-text="choose"></option>
              <option class="form__select-option" v-text="nationality.kz"></option>
              <option class="form__select-option" v-text="nationality.ru"></option>
            </select>
          </div>
          <div class="form__input-block">
            <label class="form__input-label" for="documentType" v-text="labelText.documentType"></label>
            <select class="form__input select" :class="{ 'error' : error.documentType }" id="documentType" v-model="form.documentType">
              <option class="form__selected-option" value="" disabled selected hidden v-text="choose"></option>
              <option class="form__select-option" v-text="documentType.id"></option>
              <option class="form__select-option" v-text="documentType.passport"></option>
            </select>
          </div>
          <div class="form__input-block">
            <label class="form__input-label" for="documentNumber" v-text="labelText.documentNumber"></label>
            <input class="form__input text-input" :class="{ 'error' : error.documentNumber }" id="documentNumber" :placeholder="placeholder.documentNumber" type="number" v-model="form.documentNumber">
          </div>
          <div class="form__input-block">
            <label class="form__input-label" for="expirationDate" v-text="labelText.expirationDate"></label>
            <input class="form__input date-input" :class="{ 'error' : error.expirationDate }" id="expirationDate" :placeholder="placeholder.expirationDate" type="date" v-model="form.expirationDate">
          </div>
        </div>
        <p class="form__warning-text">Что б избежать трудностей при посадке на борт, запишите имя и фамилию (-и) <span class="bold">в точности так, как они записаны в вашем<br> паспорте (удостоверении личности).</span></p>
        <hr class="form__line">
        <div class="form__row-sec">
          <div class="form__col">
            <img class="form__row-img" src="@/assets/airplane.png" alt="fly">
            <div class="form__text">
              <h3 class="form__row-title" v-text="rowTitle"></h3>
              <p class="form__row-subtitle" v-text="rowSubtitle"></p>
            </div>
          </div>
          <button class="form__button" v-text="buttonText"></button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex"

export default {
  name: 'Passenger',
  data () {
    return {
      title: '1. Взрослый пассажир',
      rowTitle: 'Выбрать место на борту',
      rowSubtitle: 'Выберите комфортное место заранее и путешествуйте с удовольствием.',
      buttonText: 'Выбрать',
      form: {
        surname: '',
        name: '',
        sex: '',
        birthDate: '',
        nationality: '',
        documentType: '',
        documentNumber: '',
        expirationDate: ''
      },
      errorCheck: false,
      error: {
        surname: false,
        name: false,
        sex: false,
        birthDate: false,
        nationality: false,
        documentType: false,
        documentNumber: false,
        expirationDate: false
      },
      placeholder: {
        surname: 'Сабуров',
        name: 'Нурлан',
        sex: 'Выбрать',
        birthDate: 'Выбрать',
        nationality: 'Выбрать',
        documentType: 'Выбрать',
        documentNumber: '034123321',
        expirationDate: 'Выбрать'
      },
      choose: 'Выберите',
      nationality: {
        kz: 'Казахстан',
        kzValue: '',
        ru: 'Россия',
        ruValue: ''
      },
      documentType: {
        id: 'Уд. личности',
        idValue: '',
        passport: 'Паспорт',
        passportValue: '',
      },
      sexOptions: {
        male: 'Мужчина',
        maleValue: '',
        female: 'Женщина',
        femaleValue: ''
      },
      labelText: {
        surname: 'Фамилия',
        name: 'Имя',
        sex: 'Пол',
        birthDate: 'Дата рождения',
        nationality: 'Гражданство',
        documentType: 'Тип документа',
        documentNumber: 'Номер документа',
        expirationDate: 'Годен до'
      },
    }
  },
  methods: {
    ...mapActions({
      addPassengerAction: 'addPassenger',
    }),
    ...mapGetters({
      getPassengers: 'getPassengers',
    }),
    addPassenger() {
      for(var key in this.form) {
        if(this.form[key] === '') this.error[key] = true
        else this.error[key] = false
      }
      console.log('leave for');
      for(var i in this.error) {
        if(this.error[i] === true) {
          this.errorCheck = true
          return false
        } else {
          this.errorCheck = false
        }
      }
      if(this.errorCheck === false) {
        this.addPassengerAction({
          surname: this.form.surname,
          name: this.form.name,
          sex: this.form.sex,
          birthDate: this.form.birthDate,
          nationality: this.form.nationality,
          documentType: this.form.documentType,
          documentNumber: this.form.documentNumber,
          expirationDate: this.form.expirationDate
        }).then(() => {
          this.form = {
            surname: '',
            name: '',
            sex: '',
            birthDate: '',
            nationality: '',
            documentType: '',
            documentNumber: '',
            expirationDate: ''
          }
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.passenger {
  // box-shadow: 0px -2px 12px -8px rgba(0,0,0,0.75);
  display: flex;
  // width: 1012px;
  padding: 25px 30px;
  background-color: white;
  border-radius: 8px;
  color: #555555;
  margin-bottom: 1.5em;

  &__form {

  }
}
.form {

  &__title {
    font-size: 1em;
    font-weight: 600;
    line-height: 1.2em;
    margin-bottom: 1em;

  }
  &__row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: .9em;

    &:last-child {
      margin-bottom: 0;
    }
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
  &__row-sec {
    justify-content: space-between;
    display: flex;
  }
  &__col {
    display: flex;
    align-items: center;
  }
  &__row-img {
    width: 40px;
    height: 40px;
    margin-right: 1.5em;
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
  &__button {
    width: 160px;
    height: 40px;
    border: none;
    outline: none;
    background-color: #4B77BE;
    color: white;
    border-radius: 4px;
    cursor: pointer;
  }
  &__input-block {
    display: flex;
    flex-direction: column;
    margin-right: 1em;

    &:last-child {
      margin-right: 0;
    }
  }
  &__input-label {
    font-size: .9em;
    font-weight: 500;
    line-height: 1em;
    margin-bottom: .5em;

  }
  &__input {
    width: 200px;
    height: 40px;
    background-color: transparent;
    max-width: 300px;
    border: 1px solid #DDE3EB;
    border-radius: 4px;
    outline: none;
    padding: 0 10px;
  }
  .input {

  }
  .select {

  }
  .date {

  }
  &__select-option {

  }
  &__selected-option {
    color: #DEE3EB;
  }
  &__warning-text {
    font-size: .8em;
    font-weight: 500;
    line-height: 1.4em;
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
.bold {
  font-weight: 600;
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
