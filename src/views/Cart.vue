<template>
  <div class="min-h-screen">
    <div class="container mx-auto">
      <h1 class="text-3xl text-primary my-4">Оформление заказа</h1>
      <div class="flex flex-col-reverse md:flex-row justify-between">
        <div class="space-y-3 mb-6">
          <div class="flex flex-col gap-1">
            <label for="adress "><span class="text-primaryBlue">Адрес доставки</span></label>
            <textarea class="w-80 p-2 border rounded bg-transparent placeholder:text-[#4f86d3ae] border-primaryBlue text-primary outline-none" placeholder="г. Ташкент, Юнусабадский район, Улица Чарос, дом 30, квартира 7" maxlength="1000" cols="30" rows="3" name="adress" id="adress"></textarea>
          </div>
          <textarea class="w-80 p-2 border rounded bg-transparent placeholder:text-[#4f86d3ae] border-primaryBlue text-primary outline-none" placeholder="Комментарий к доставке" maxlength="1000" cols="30" rows="3" id="comment"></textarea>
          <div class="fio space-y-1">
            <label for="fio" class="block text-primaryBlue">ФИО</label>
            <input type="text" id="fio" placeholder="Тимур Зафаров" maxlength="255" minlength="0" class="w-56 p-1 border rounded bg-transparent placeholder:text-[#4f86d3ae] border-primaryBlue text-primary outline-none" />
          </div>
          <div class="tel">
            <label for="tel" class="block text-primaryBlue">ФИО</label>
            <input type="number" id="tel" placeholder="(90) 123 45 67" maxlength="255" minlength="0" class="w-56 p-1 border rounded bg-transparent placeholder:text-[#4f86d3ae] border-primaryBlue text-primary outline-none" />
          </div>
          <div class="flex flex-col items-start gap-3 pt-3">
            <button @click="isOpenModal = true">
              <ButtonFillVue><span class="py-2">Выбрать способ оплаты</span></ButtonFillVue>
            </button>
            <ButtonFillVue color="#B51136"><span class="py-2">Оплатить и заказать</span> </ButtonFillVue>
          </div>
        </div>

        <div class="mb-6">
          <div class="bg-[#4F87D30D] ml-0 md:ml-28 mr-28 md:mr-0 rounded pt-6">
            <div class="cards px-6 flex flex-col gap-3 max-h-[30rem] min-h-[20rem] overflow-auto">
              <div class="card bg-white rounded-xl grid grid-cols-2 max-h-52 text-sm shadow-[0_0_5px_rgba(0,0,0,0.3)]">
                <div class="img">
                  <img class="object-contain object-center" src="/src/assets/img/magazin/card/Rectangle64.png" alt="cardImg" />
                </div>
                <div class="rounded-xl bg-[#F4F6F9] flex flex-col gap-3 p-2">
                  <div class="flex justify-between">
                    <div class="flex items-center">
                      <svg aria-hidden="true" class="w-5 h-5 text-primaryBlue" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <title>Rating star</title>
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <p class="ml-2 text-primaryBlue">4.95</p>
                      <span class="w-1 h-1 mx-3 bg-[#769acd] rounded-full"></span>
                      <p class="text-primaryBlue underline">50 отзывов</p>
                    </div>
                  </div>
                  <h3 class="">Intel CORE i3 10100 CPU Socket LGA 1200 3.60G...</h3>
                  <div class="text-primaryBlue">В наличии</div>
                  <div class="flex justify-between items-center">
                    <p class="font-semibold">999 000 сум</p>
                    <form>
                      <span class="flex gap-2">
                        <button @click.prevent="countFunc(false)" class="text-primary">
                          <svg width="11" height="3" viewBox="0 0 11 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.12 2.104H10.136V0.296H0.12V2.104Z" fill="#002E69" />
                          </svg>
                        </button>
                        <input :value="count" maxlength="5" minlength="0" class="border w-10 my-1 py-[2px] text-sm border-whiteBlue rounded-lg text-primary text-center" type="number" id="countProd" />
                        <button @click.prevent="countFunc(true)">
                          <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.0400001 5.768H8.456V3.768H0.0400001V5.768ZM3.176 0.552V8.984H5.32V0.552H3.176Z" fill="#002E69" />
                          </svg>
                        </button>
                      </span>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div class="menu w-full text-primaryBlue rounded-t-xl px-8 py-8 space-y-6 h-[1/3] shadow-lg">
              <div class="flex justify-between items-center gap-3">
                <ButtonStrokeVue><span class="py-2">Введите промокод</span> </ButtonStrokeVue>
                <ButtonStrokeVue><span class="py-2">Применить</span> </ButtonStrokeVue>
              </div>
              <div class="space-y-1">
                <div class="flex justify-between items-center">
                  <p>Товар (2)</p>
                  <p>1 998 000 сум</p>
                </div>
                <div class="flex justify-between items-center">
                  <p>Сумма скидки</p>
                  <p class="text-red-500">-200 000 сум</p>
                </div>
              </div>
              <div class="flex justify-between items-center font-bold">
                <p>Итого</p>
                <p>1 798 000 сум</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Teleport to="body">
    <div v-if="isOpenModal" @click="isOpenModal = false" class="fixed z-[99999] inset-0 bg-[#0006] backdrop-blur"></div>
    <div v-if="isOpenModal" class="PayModal fixed z-[999999] w-[40rem] top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-white rounded-md px-6 py-8 space-y-10 shadow-lg">
      <div class="flex justify-between gap-2 h-12">
        <p class="text-2xl text-primary self-end">Выбор способа оплаты</p>
        <span @click="isOpenModal = false" class="p-2">
          <i class="fa-solid fa-xmark text-xl text-primary"></i>
        </span>
      </div>
      <form action="pay">
        <ul class="space-y-4 text-lg pb-8">
          <li class="space-x-4 flex items-center">
            <input type="radio" name="pay" id="card" />
            <label for="card">
              <div class="flex items-center gap-2">
                <p>Онлайн оплата с помощью Humocard / UzCard</p>
                <img class="w-7 h-7" src="/src/assets/images/cart/modal/toshkent.png" alt="humo" />
                <img class="w-7 h-7" src="/src/assets/images/cart/modal/Frame323.png" alt="uzcard" />
              </div>
              <p class="text-sm">Комиссия - 0%, быстрая оплата.</p>
            </label>
          </li>
          <li>
            <ul class="flex gap-6">
              <li class="flex items-center">
                <input type="radio" name="pay" id="clickCard" />
                <label for="clickCard">
                  <img class="h-16" src="/src/assets/images/cart/modal/Frame27.png" alt="" />
                </label>
              </li>
              <li class="space-x-4 flex items-center">
                <input type="radio" name="pay" id="PaymeCard" />
                <label for="PaymeCard">
                  <img class="h-8" src="/src/assets/images/cart/modal/payme.png" alt="" />
                </label>
              </li>
              <li class="space-x-4 flex items-center">
                <input type="radio" name="pay" id="apelsinCard" />
                <label for="apelsinCard">
                  <img class="h-8" src="/src/assets/images/cart/modal/apelsin.png" alt="" />
                </label>
              </li>
            </ul>
          </li>
          <li class="space-x-4 flex items-center">
            <input class="" type="radio" name="pay" id="order" />
            <label for="order">
              <h3 class="">Оплата наличными после доставке</h3>
              <p class="text-xs">Оплата полную стоимость товара при получении</p>
            </label>
          </li>
        </ul>
        <ButtonFillVue><span class="py-2">Продолжить</span></ButtonFillVue>
      </form>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from "vue"
import ButtonFillVue from "../components/buttons/ButtonFill.vue"
import ButtonStrokeVue from "../components/buttons/ButtonStroke.vue"

const count = ref(1)
const countFunc = (val: boolean) => {
  if (count.value > 0) {
    val ? count.value++ : count.value--
  }
}

const isOpenModal = ref(false)
</script>

<style>
.PayModal input:checked + label {
  color: #4f87d3;
  /* width: 10rem; */
}
</style>
