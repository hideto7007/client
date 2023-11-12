<template>
  <div>
    <v-text-field
      v-model="moneyReceivedValue"
      label="手取の月収"
      type="number"
    ></v-text-field>

    <v-text-field
      v-model="bounsValue"
      label="ボーナス(1年の合計)"
      type="number"
    ></v-text-field>

    <v-text-field
      v-model="fixedCostValue"
      label="固定費(家賃、光熱費、通信費、サブスクリプションなどなど・・・)"
      type="number"
    ></v-text-field>

    <v-text-field
      v-model="loanValue"
      label="ローン(教育、車)"
      type="number"
    ></v-text-field>

    <v-text-field
      v-model="privateValue"
      label="プライベート(月に自信が自由に使える)"
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
  <v-card
    class="mx-auto"
    max-width="500"
  >
    <v-card-text>
      <p class="text-h4 text--primary">
        月の貯蓄額 {{ leftAmountValue }} 円
      </p><v-card-actions />
      <p class="text-h4 text--primary">
        年の貯蓄額 {{ totalAmountValue }} 円
      </p>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import ApiEndpoint from "../common/apiEndpoint";
import router from '../router'

const localStorageKeyNameSumitFpInfo = ref<string>('sumitFpInfo')
const localStorageKeyNameResult = ref<string>('result')

const moneyReceivedValue = ref<number>(0)
const bounsValue = ref<number>(0)
const fixedCostValue = ref<number>(0)
const loanValue = ref<number>(0)
const privateValue = ref<number>(0)
const leftAmountValue = ref<number>(0)
const totalAmountValue = ref<number>(0)

type priceData = {
  moneyReceived: number, 
  bouns: number,
  fixedCost: number,
  loan: number,
  privateValue: number
}

type amountData = {
  leftAmount: number,
  totalAmount: number
}


const loadFromLocalStorage = (): void => {
  const storedData = localStorage.getItem(localStorageKeyNameSumitFpInfo.value)

  if (storedData) {
    const parsedData: priceData = JSON.parse(storedData)
    moneyReceivedValue.value = parsedData.moneyReceived
    bounsValue.value = parsedData.bouns
    fixedCostValue.value = parsedData.fixedCost
    loanValue.value = parsedData.loan
    privateValue.value = parsedData.privateValue
  }
}

const getPriceManagementLocalStorage = (): void => {
  const storedData = localStorage.getItem(localStorageKeyNameResult.value)

  if (storedData) {
    const parsedData: amountData = JSON.parse(storedData)
    leftAmountValue.value = parsedData.leftAmount
    totalAmountValue.value = parsedData.totalAmount
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

  localStorage.setItem(localStorageKeyNameSumitFpInfo.value, JSON.stringify(dataToSave))

  getPriceManagementFetchData()
}


async function getPriceManagementFetchData(): Promise<void> {
    const queryList: string[] = []
    queryList.push("money_received=" + moneyReceivedValue.value)
    queryList.push("bouns=" + bounsValue.value)
    queryList.push("fixed_cost=" + fixedCostValue.value)
    queryList.push("loan=" + loanValue.value)
    queryList.push("private=" + privateValue.value)
    const fullPrames: string = "?" + queryList.join('&')
    try {
      const response = await ApiEndpoint.getPriceManagement(fullPrames)
      const data = response.data // レスポンスからデータを取得
      const amountDataResult: amountData = {
        leftAmount: data.message.result.left_amount,
        totalAmount: data.message.result.total_amount
      }
      localStorage.setItem(localStorageKeyNameResult.value, JSON.stringify(amountDataResult))

      console.log('Received data:', amountDataResult)
      router.go(0)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
}

const handleReset = (): void => {
  moneyReceivedValue.value = 0
  bounsValue.value = 0
  fixedCostValue.value = 0
  loanValue.value = 0
  privateValue.value = 0
  leftAmountValue.value = 0
  totalAmountValue.value = 0
  localStorage.clear()
}

// ページ読み込み時に localStorage からデータを読み込む
onMounted(() => {
  loadFromLocalStorage()
  getPriceManagementLocalStorage()
})
</script>
