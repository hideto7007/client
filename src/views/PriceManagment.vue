<template>
  <div v-if="!serverErrorFlag">
    <div class="price-title">
      <h1>月と年間の貯金額算出</h1>
    </div>
    <div>
      <v-text-field 
        v-for="(item) in priceList" :key="item.label"
        v-model="item.vModel"
        :label="item.label"
        type="number"
      ></v-text-field>

      <v-btn
        class="me-4"
        type="submit"
        color="success"
        @click="handleSubmit"
      >
        計算
      </v-btn>

      <v-btn 
        @click="handleReset"
        color="blue-grey">
        クリア
      </v-btn>
    </div>
    <v-card
      class="mx-auto"
      max-width="370"
    >
      <v-card-text class="card-style">
        <p class="text-h5 text--primary">
          月の貯蓄額 {{ leftAmountValue }} 円
        </p><v-card-actions />
        <p class="text-h5 text--primary">
          年の貯蓄額 {{ totalAmountValue }} 円
        </p>
      </v-card-text>
    </v-card>
  </div>
  <div v-else>
    <Alert
      color="error"
      :title="serverErrorTitle"
      :text="serverErrorText"/>
  </div>
</template>

<script lang="ts" setup>
import { ref, Ref, onMounted } from 'vue'
import ApiEndpoint from "@/common/apiEndpoint"
import Alert from "@/components/alert.vue"

const localStorageKeyNameSumitFpInfo = ref<string>('sumitFpInfo')
const localStorageKeyNameResult = ref<string>('result')

const moneyReceivedValue = ref<number>(0)
const bounsValue = ref<number>(0)
const fixedCostValue = ref<number>(0)
const loanValue = ref<number>(0)
const privateValue = ref<number>(0)
const insuranceValue = ref<number>(0)
const leftAmountValue = ref<number>(0)
const totalAmountValue = ref<number>(0)
const serverErrorFlag = ref<boolean>(false)
const serverErrorTitle = ref<string>('サーバーエラー 500エラー')
const serverErrorText = ref<string>('サーバーダウン。もしくは、サーバー側で何か不具合が発生しました。')

type priceData = {
  moneyReceived: number, 
  bouns: number,
  fixedCost: number,
  loan: number,
  private: number,
  insurance: number
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
    label: '手取の月収',
    vModel: moneyReceivedValue,
  },
  {
    label: 'ボーナス(1年の合計)',
    vModel: bounsValue,
  },
  {
    label: '固定費(家賃、光熱費、通信費、サブスクリプション、積み立て投資などなど・・・)',
    vModel: fixedCostValue,
  },
  {
    label: 'ローン(教育、車)',
    vModel: loanValue,
  },
  {
    label: 'プライベート(月に自身が自由に使える)',
    vModel: privateValue,
  },
  {
    label: '保険(生命保険、任意保険など)',
    vModel: insuranceValue,
  },
])


const loadFromLocalStorage = (): void => {
  const storedData = localStorage.getItem(localStorageKeyNameSumitFpInfo.value)

  if (storedData) {
    const parsedData: priceData = JSON.parse(storedData)
    moneyReceivedValue.value = parsedData.moneyReceived
    bounsValue.value = parsedData.bouns
    fixedCostValue.value = parsedData.fixedCost
    loanValue.value = parsedData.loan
    privateValue.value = parsedData.private
    insuranceValue.value = parsedData.insurance
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
    private: privateValue.value,
    insurance: insuranceValue.value,
  }

  localStorage.setItem(localStorageKeyNameSumitFpInfo.value, JSON.stringify(dataToSave))

  getPriceManagementFetchData()
}


const getPriceManagementFetchData = async (): Promise<void> => {
    const queryList: string[] = []
    queryList.push("money_received=" + moneyReceivedValue.value)
    queryList.push("bouns=" + bounsValue.value)
    queryList.push("fixed_cost=" + fixedCostValue.value)
    queryList.push("loan=" + loanValue.value)
    queryList.push("private=" + privateValue.value)
    queryList.push("insurance=" + insuranceValue.value)
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

      leftAmountValue.value = amountDataResult.leftAmount
      totalAmountValue.value = amountDataResult.totalAmount
    } catch (error) {
      serverErrorFlag.value = true
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
  insuranceValue.value = 0
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