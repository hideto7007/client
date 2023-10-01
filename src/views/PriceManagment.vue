<template>
  <div>
    <v-text-field
      v-model="moneyReceivedValue"
      label="月収"
      type="number"
    ></v-text-field>

    <v-text-field
      v-model="bounsValue"
      label="ボーナス"
      type="number"
    ></v-text-field>

    <v-text-field
      v-model="fixedCostValue"
      label="固定費"
      type="number"
    ></v-text-field>

    <v-text-field
      v-model="loanValue"
      label="ローン"
      type="number"
    ></v-text-field>

    <v-text-field
      v-model="privateValue"
      label="プライベート"
      type="number"
    ></v-text-field>

    <v-btn
      class="me-4"
      type="submit"
      @click="handleSubmit"
    >
      submit
    </v-btn>

    <v-btn @click="handleReset">
      clear
    </v-btn>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import axios, { AxiosResponse } from 'axios';

const localStorageKeyName = ref<string>('sumitFpInfo')

const moneyReceivedValue = ref<number>(0)
const bounsValue = ref<number>(0)
const fixedCostValue = ref<number>(0)
const loanValue = ref<number>(0)
const privateValue = ref<number>(0)

const test = ref<string>('')

const api: string = "http://localhost:8080/api/price/"
// const api: string = "http://localhost:8080/delftstack/"

type priceData = {
  moneyReceived: number, 
  bouns: number,
  fixedCost: number,
  loan: number,
  privateValue: number
}

const loadFromLocalStorage = () => {
  const storedData = localStorage.getItem(localStorageKeyName.value)

  if (storedData) {
    const parsedData: priceData = JSON.parse(storedData)
    moneyReceivedValue.value = parsedData.moneyReceived
    bounsValue.value = parsedData.bouns
    fixedCostValue.value = parsedData.fixedCost
    loanValue.value = parsedData.loan
    privateValue.value = parsedData.privateValue
  }
}

const handleSubmit = (): void => {
  // 各項目の値を priceArr にセット
  const dataToSave: priceData = {
    moneyReceived: moneyReceivedValue.value,
    bouns: bounsValue.value,
    fixedCost: fixedCostValue.value,
    loan: loanValue.value,
    privateValue: privateValue.value,
  }

  localStorage.setItem(localStorageKeyName.value, JSON.stringify(dataToSave))

  fetchData()
}


async function fetchData(): Promise<void> {
    const queryList: string[] = []
    queryList.push("money_received=" + moneyReceivedValue.value)
    queryList.push("bouns=" + bounsValue.value)
    queryList.push("fixed_cost=" + fixedCostValue.value)
    queryList.push("loan=" + loanValue.value)
    queryList.push("private=" + privateValue.value)
    const fullApi: string = api + "?" + queryList.join('&')
    console.log(fullApi)
    try {
      axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:5173';
      axios.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
      axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Content-Type';
      const response: AxiosResponse = await axios.get(fullApi); // 任意のAPIエンドポイントを指定
      const data = response.data; // レスポンスからデータを取得
      test.value = data
      console.log('Received data:', data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
}

const handleReset = (): void => {
  localStorage.clear()
}

// ページ読み込み時に localStorage からデータを読み込む
onMounted(() => {
  loadFromLocalStorage()
})
</script>