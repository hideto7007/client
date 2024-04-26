<template>
  <div v-if="!serverErrorFlag">
    <div class="price-title">
      <h1>貯金額算出</h1>
    </div>
    <div v-if="!dateFlag">
      <v-col cols="4" md="4">
        <v-text-field v-model="date" :label="PriceManagementConst.SavingsPeriod" :type="Type.Date"
          clearable></v-text-field>
      </v-col>
    </div>
    <div>
      <v-text-field v-for="(item) in priceList" :key="item.label" v-model="item.vModel" :label="item.label"
        :type="Type.Number"></v-text-field>

      <v-btn class="me-4" :type="Type.Submit" :color="Type.Success" @click="handleSubmit">
        計算
      </v-btn>

      <v-btn @click="handleReset" color="blue-grey">
        クリア
      </v-btn>
    </div>
    <v-card class="mx-auto" max-width="370">
      <v-card-text class="card-style">
        <p class="text-h5 text--primary">
          月の貯蓄額 {{ leftAmount }} 円
        </p><v-card-actions />
        <p class="text-h5 text--primary">
          年の貯蓄額 {{ totalAmount }} 円
        </p><v-card-actions />
        <div class="text-h5 text--primary">
          <p v-if="date !== null && date !== undefined">
            現在～{{ date.slice(0, 4) + "/" + date.slice(5, 7) + "/" + date.slice(-2) }}までの貯蓄額
            {{ totalRangeAmount }} 円
          </p>
          <p v-else>
            現在～までの貯蓄額 0 円
          </p>
        </div>
      </v-card-text>
    </v-card>
  </div>
  <div v-else>
    <Alert :color="Type.Error" :title="serverErrorTitle" :text="serverErrorText" />
  </div>
</template>

<script lang="ts" setup>
import { ref, Ref, onMounted } from 'vue'
import ApiEndpoint from "../common/apiEndpoint"
import Alert from "../components/alert.vue"
import { PriceManagementConst, ErrorConst, Type } from "../common/const"

const localStorageKeyNameSumitFpInfo = ref<string>('sumitFpInfo')
const localStorageKeyNameResult = ref<string>('result')
const localStorageKeyNameDate = ref<string>('date')

const today = new Date()
const range = ref<number>(1)
const date = ref<string>()
const dateFlag = ref<boolean>(false)
const moneyReceived = ref<number>(0)
const bouns = ref<number>(0)
const fixedCost = ref<number>(0)
const loan = ref<number>(0)
const privates = ref<number>(0)
const insurance = ref<number>(0)
const leftAmount = ref<number>(0)
const totalAmount = ref<number>(0)
const totalRangeAmount = ref<number>(0)
const serverErrorFlag = ref<boolean>(false)
const serverErrorTitle = ref<string>(ErrorConst.InterServerError)
const serverErrorText = ref<string>(ErrorConst.ErrorMessage)

type priceData = {
  moneyReceived: number, 
  bouns: number,
  fixedCost: number,
  loan: number,
  private: number,
  insurance: number
}

type Date = {
  date: string
}

type amountData = {
  leftAmount: number,
  totalAmount: number
}

interface Item {
  label: string
  vModel: Ref<number>
}

const priceList = ref<Item[]>([
  {
    label: PriceManagementConst.MoneyReceived,
    vModel: moneyReceived,
  },
  {
    label: PriceManagementConst.Bouns,
    vModel: bouns,
  },
  {
    label: PriceManagementConst.FixedCost,
    vModel: fixedCost,
  },
  {
    label: PriceManagementConst.Loan,
    vModel: loan,
  },
  {
    label: PriceManagementConst.Privates,
    vModel: privates,
  },
  {
    label: PriceManagementConst.Insurance,
    vModel: insurance,
  },
])


const loadFromLocalStorage = (): void => {
  const storedData = localStorage.getItem(localStorageKeyNameSumitFpInfo.value)
  const StoredDate = localStorage.getItem(localStorageKeyNameDate.value)

  if (StoredDate) {
    const parseDate: Date = JSON.parse(StoredDate)
    date.value = parseDate.date
  }

  if (storedData) {
    const parsedData: priceData = JSON.parse(storedData)
    moneyReceived.value = parsedData.moneyReceived
    bouns.value = parsedData.bouns
    fixedCost.value = parsedData.fixedCost
    loan.value = parsedData.loan
    privates.value = parsedData.private
    insurance.value = parsedData.insurance
  }
}

const getPriceManagementLocalStorage = (): void => {
  const storedData = localStorage.getItem(localStorageKeyNameResult.value)

  if (storedData) {
    const parsedData: amountData = JSON.parse(storedData)
    leftAmount.value = parsedData.leftAmount
    totalAmount.value = parsedData.totalAmount
  }
}

const handleSubmit = (): void => {
  // 各項目の値を priceArr にセット
  const dataToSave: priceData = {
    moneyReceived: moneyReceived.value,
    bouns: bouns.value,
    fixedCost: fixedCost.value,
    loan: loan.value,
    private: privates.value,
    insurance: insurance.value,
  }

  const dateToSave: Date = {
    date: date.value ?? ''
  }

  localStorage.setItem(localStorageKeyNameDate.value, JSON.stringify(dateToSave))

  localStorage.setItem(localStorageKeyNameSumitFpInfo.value, JSON.stringify(dataToSave))

  getPriceManagementFetchData()
}


const getPriceManagementFetchData = async (): Promise<void> => {
    const queryList: string[] = []
    queryList.push("money_received=" + moneyReceived.value)
    queryList.push("bouns=" + bouns.value)
    queryList.push("fixed_cost=" + fixedCost.value)
    queryList.push("loan=" + loan.value)
    queryList.push("private=" + privates.value)
    queryList.push("insurance=" + insurance.value)
    const fullPrames: string = "?" + queryList.join('&')
    console.log(fullPrames)
    try {
      const response = await ApiEndpoint.getPriceManagement(fullPrames)
      const data = response.data // レスポンスからデータを取得
      const amountDataResult: amountData = {
        leftAmount: data.message.result.left_amount,
        totalAmount: data.message.result.total_amount
      }
      localStorage.setItem(localStorageKeyNameResult.value, JSON.stringify(amountDataResult))

      console.log(today, date.value)

      leftAmount.value = amountDataResult.leftAmount
      totalAmount.value = amountDataResult.totalAmount
      totalRangeAmount.value = amountDataResult.leftAmount * range.value
    } catch (error) {
      serverErrorFlag.value = true
      console.error('Error fetching data:', error)
    }
}

const handleReset = (): void => {
  moneyReceived.value = 0
  bouns.value = 0
  fixedCost.value = 0
  loan.value = 0
  privates.value = 0
  leftAmount.value = 0
  totalAmount.value = 0
  totalRangeAmount.value = 0
  insurance.value = 0
  date.value = ""
  localStorage.clear()
}

// ページ読み込み時に localStorage からデータを読み込む
onMounted(() => {
  loadFromLocalStorage()
  getPriceManagementLocalStorage()
})
</script>


<style scoped>

.price-title {
  padding: 1em;
  color: #0000FF;
}

.card-style{
  padding: 3em;
  color: aliceblue;
  background-color: #0606f8;
}

</style>