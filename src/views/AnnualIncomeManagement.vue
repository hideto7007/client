<template>
  <div v-if="startDate !== undefined && endDate !== undefined">
    <Calender
      @startDateStrDrawer="toggleStartDateStrDrawer" 
      @endDateStrDrawer="toggleEndDateStrDrawer"
      :startDate="startDate" 
      :endDate="endDate" 
    />
      <v-data-table
        :headers="headersList"
        :items="desserts"
        :sort-by="[
          { key: keyList[0], order: sort },
          { key: keyList[1], order: sort },
          { key: keyList[2], order: sort },
          { key: keyList[3], order: sort },
          { key: keyList[4], order: sort },
          { key: keyList[5], order: sort }
        ]"
      >
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>年収管理表</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-dialog
            v-model="dialog"
            max-width="500px"
          >
            <template v-slot:activator="{ props }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="props"
              >
                新規登録
              </v-btn>
              <v-col md="1" style="height: 89px;">
                <v-checkbox 
                  v-model="modeFlag"
                  :label="modeTitle">
                </v-checkbox>
            </v-col>
            </template>
            <v-card>
              <v-form
                v-model="form"
                @submit.prevent="save"
              >
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                    <v-row>
                      <v-col 
                        cols="4" md="8">
                          <v-text-field 
                            v-model="editedItem.payment_date"
                            :label="labelList[0]"
                            :rules="[Validation.dateValid]"
                            type="Date"
                            clearable
                          ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col 
                        cols="4" md="8">
                          <v-combobox
                            v-model="editedItem.age"
                            :label="labelList[1]"
                            :rules="[Validation.ageValid]"
                            :items="ageList"
                            type="number"
                            clearable
                          ></v-combobox>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col 
                        cols="4" md="8">
                          <v-text-field 
                            v-model="editedItem.industry"
                            :label="labelList[2]"
                            :rules="[Validation.industryValid]"
                            type="string"
                            clearable
                          ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col 
                        cols="4" md="8">
                          <v-text-field 
                            v-model="editedItem.total_amount"
                            :label="labelList[3]"
                            :rules="[Validation.incomeAmountValid]"
                            type="number"
                            clearable
                          ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col 
                        cols="4" md="8">
                          <v-text-field 
                            v-model="editedItem.deduction_amount"
                            :label="labelList[4]"
                            :rules="[Validation.incomeAmountValid]"
                            type="number"
                            clearable
                          ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col 
                        cols="4" md="8">
                          <v-text-field 
                            v-model="takeHomeAmountRsult"
                            :label="labelList[5]"
                            :rules="[Validation.takeHomeAmountValid]"
                            type="number"
                            readonly
                          ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col 
                        cols="4" md="8">
                          <v-combobox
                            v-model="editedItem.classification"
                            :label="labelList[6]"
                            :items="classificationList"
                            item-text="label"
                            :rules="[Validation.classificationValid]"
                            clearable
                          ></v-combobox>
                      </v-col>
                    </v-row>
                </v-container>
              </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue-darken-1"
                    variant="text"
                    @click="close"
                  >
                    キャンセル
                  </v-btn>
                  <v-btn
                    :disabled="!form"
                    :loading="loading"
                    color="blue-darken-1"
                    variant="text"
                    @click="save"
                  >
                    登録
                  </v-btn>
                </v-card-actions>
              </v-form>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="200px">
            <v-card>
              <v-card-title class="text-h5">削除しますか？</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                  <v-btn color="blue-darken-1" variant="text" @click="closeDelete">キャンセル</v-btn>
                  <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">削除</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.edit="{ item }">
        <v-icon
          size="small"
          class="me-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          size="small"
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
    <Chart
      :userId="userId">
    </Chart>
  </div>
    <Alert
      v-if="serverErrorFlag"
      :color="alertColor"
      :title="alertTitle"
      :text="alertText"
    />
</template>

<script lang="ts" setup>
import { ref, onMounted, computed, watch, nextTick } from 'vue'
import ApiEndpoint from "../common/apiEndpoint"
import Validation from "../common/vaildation"
import Alert from "../components/alert.vue"
import Calender from "../components/calender.vue"
import Chart from "../components/chart.vue"
import Format from "../common/format"
import { ErrorConst, Type, classificationListConst, KeyConst, labelListConst, keyListConst }from "../common/const"
import { v4 as uuidv4 } from 'uuid'


const startDate = ref<string>()
const endDate = ref<string>()
const screenFlag = ref<boolean>(false)
// メニューが表示されているなら true
const startDateStr = ref<string>('')
const endDateStr = ref<string>('')
const classificationList = classificationListConst
const dialog = ref<boolean>(false)
const dialogDelete = ref<boolean>(false)
const ageList = ref<number[]>([...Array(86).keys()].map(i => i + 15))
const labelList = labelListConst
const keyList = keyListConst
const desserts = ref<Item[]>([])
const editedIndex = ref<number>(-1)
const sort = ref<boolean>(false)
const form = ref<boolean>(false)
const loading = ref<boolean>(false)
const modeFlag = ref<boolean>(false)
const alertColor= ref<string>(Type.Error)
const serverErrorFlag = ref<boolean>(false)
const alertTitle = ref<string>(ErrorConst.InterServerError)
const alertText = ref<string>(ErrorConst.ErrorMessage)
// T.B.D
// 現状は1にしておいて、後々ログイン画面作成時にパラメータでuser_idを取得出来るようにする
const userId = ref<number>(1)

const toggleStartDateStrDrawer = (startDate: string): void => {
  startDateStr.value = startDate
}

const toggleEndDateStrDrawer = (endDate: string): void => {
  endDateStr.value = endDate
}

interface Headers {
  title: string, 
  key: string, 
}

interface Item {
  'income_forecast_id': string,
  'payment_date': string,
  'age': number,
  'industry': string,
  'total_amount': number,
  'deduction_amount': number,
  'take_home_amount': number,
  'update_user': string,
  'classification': string,
  'user_id': number
}

interface updateItem {
  'income_forecast_id': string,
  'payment_date': string,
  'age': number,
  'industry': string,
  'total_amount': number,
  'deduction_amount': number,
  'take_home_amount': number,
  'classification': string,
}

interface IncomeData {
  income_forecast_id: string;
}

interface ApiResponse {
  data: IncomeData[] | Item[] | updateItem[];
}

const headers = ref<Headers[]>([
  {
      title: labelList[0],
      key: keyList[0]
  },
  {
      title: labelList[1],
      key: keyList[1]
  },
  {
      title: labelList[2],
      key: keyList[2]
  },
  {
      title: labelList[3],
      key: keyList[3]
  },
  {
      title: labelList[4],
      key: keyList[4]
  },
  {
      title: labelList[5],
      key: keyList[5]
  },
  {
      title: Type.EditJp,
      key: Type.Edit
  }
])

const headersList = computed(() => modeFlag.value === true ? headers.value : headers.value.slice(0, 6)) 

const editedItem = ref<Item>({
  income_forecast_id: '',
  payment_date: '',
  age: 18,
  industry: '',
  total_amount: 0,
  deduction_amount: 0,
  take_home_amount: 0,
  update_user: '',
  classification: '',
  user_id: 0
})

const defaultItem = ref<Item>({
  income_forecast_id: '',
  payment_date: '',
  age: 18,
  industry: '',
  total_amount: 0,
  deduction_amount: 0,
  take_home_amount: 0,
  update_user: '',
  classification: '',
  user_id: 0
})

const formTitle = computed(() => editedIndex.value === -1 ? Type.CreateJp: Type.EditJp)

const modeTitle = computed(() => modeFlag.value === true ? Type.On : Type.Off)

const editItem = (item: Item): void => {
  editedIndex.value = desserts.value.indexOf(item)
  editedItem.value = Object.assign({}, item)
  dialog.value = true
}

const deleteItem = (item: Item): void => {
  editedIndex.value = desserts.value.indexOf(item)
  dialogDelete.value = true
}

const deleteItemConfirm = async(): Promise<void> => {
  const deleteId = desserts.value[editedIndex.value].income_forecast_id
  try {
      const response = await ApiEndpoint.incomeDelete(deleteId)
      responseRsult(response.statusText, Type.DeleteJp, response.data.message)
      serverErrorFlag.value = true
    } catch (error) {
      serverErrorFlag.value = true
      console.log(error)
    }
  closeDelete()
}

const close = (): void  => {
  dialog.value = false
  nextTick(() => {
    editedItem.value = Object.assign({}, defaultItem.value)
    editedIndex.value = -1
  })
}

const closeDelete = (): void  => {
  dialogDelete.value = false
  nextTick(() => {
    editedItem.value = Object.assign({}, defaultItem.value)
    editedIndex.value = -1
  })
}

const responseRsult = (responseStatus: string, title: string, message: string): void => {
  if (responseStatus === Type.OK) {
      alertColor.value = Type.Success
      alertTitle.value = `${title}成功`
      alertText.value = message
    } else {
      alertColor.value = Type.Warning
      alertTitle.value = `${title}エラー`
      alertText.value = message
    }
}

const save = async (): Promise<void> => {
  loading.value = true
  const res: ApiResponse = { data: [] }
  // 値を直接入力すると文字列型になるので、その際は整数値に変換する
  editedItem.value[KeyConst.Age] = Number(editedItem.value[KeyConst.Age])
  editedItem.value[KeyConst.TotalAmount] = Number(editedItem.value[KeyConst.TotalAmount])
  editedItem.value[KeyConst.DeductionAmount] = Number(editedItem.value[KeyConst.DeductionAmount])
  if (editedIndex.value > -1) {
    // TODO: ログイン画面できたら、ログイン後からユーザー情報取得する
    editedItem.value[KeyConst.UpdateUser] = 'dev_user'
    res.data.push(editedItem.value)
    try {
      const response = await ApiEndpoint.incomeUpdate(res)
      responseRsult(response.statusText, Type.UpdateJp, response.data.message)
      serverErrorFlag.value = true
    } catch (error) {
      serverErrorFlag.value = true
      console.log(error)
    }
  } else {
    editedItem.value[KeyConst.IncomeForecastID] = uuidv4()
    editedItem.value[KeyConst.UserId] = userId.value
    res.data.push(editedItem.value)
    try {
      const response = await ApiEndpoint.incomeCreate(res)
      responseRsult(response.statusText, Type.CreateJp, response.data.message)
      serverErrorFlag.value = true
    } catch (error) {
      serverErrorFlag.value = true
      console.log(error)
    }
  }
  loading.value = false
  close();
}

const computedItem = computed(() => editedItem.value)
// 総支給額 - 差引額の結果
const takeHomeAmountRsult = computed(() => editedItem.value.take_home_amount = computedItem.value.total_amount - computedItem.value.deduction_amount)

const getRangeDateFetchData = async(): Promise<void> => {
  const queryList: string[] = []
  queryList.push("user_id=" + userId.value)
  const fullPrames: string = "?" + queryList.join('&')
  try {
    const response = await ApiEndpoint.getRangeDate(fullPrames)
    const data = response.data // レスポンスからデータを取得

    startDate.value = data.result[0].StratPaymaentDate
    endDate.value = data.result[0].EndPaymaentDate

    screenFlag.value = true

  } catch (error) {
    serverErrorFlag.value = true
    console.error('Error fetching data:', error)
  }
}

const getIncomeDataFetchData = async(startDate: string, endDate: string): Promise<void> => {
  const queryList: string[] = []
  // 表示データの初期化
  desserts.value.splice(0)
  queryList.push("start_date=" + startDate)
  queryList.push("end_date=" + endDate)
  queryList.push("user_id=" + userId.value)
  const fullPrames: string = "?" + queryList.join('&')
  try {
    const response = await ApiEndpoint.getIncomeData(fullPrames)
    const dataList = response.data.result // レスポンスからデータを取得

    for (const data of dataList) {
      desserts.value.push({
          income_forecast_id: data.IncomeForecastID,
          payment_date: data.PaymentDate.slice(0, 10),
          age: data.Age,
          industry: data.Industry,
          total_amount: data.TotalAmount,
          deduction_amount: data.DeductionAmount,
          take_home_amount: data.TakeHomeAmount,
          update_user: '',
          classification: data.Classification,
          user_id: data.UserID
      })
    }

  } catch (error) {
    serverErrorFlag.value = true
    console.error('Error fetching data:', error)
  }
}

// ページ読み込み
onMounted(async () => {
  await getRangeDateFetchData()
  getIncomeDataFetchData(Format.Date(startDate.value), Format.Date(endDate.value))
})

watch(dialog, (val: boolean): void => {
  val || close()
})

watch(dialogDelete, (val: boolean): void => {
  val || closeDelete()
})

watch([startDateStr, endDateStr], (newValues: any, oldValues: any) : void => {
  if (newValues[0] !== oldValues[0] || newValues[1] !== oldValues[1]) {
    getIncomeDataFetchData(newValues[0], newValues[1])
  }
})

</script>

<style scoped lang="scss">
::v-deep(.v-field__input) {
    font-size: 14px;
  }
  
  .tmpDate {
    margin: -6px -8px;
  
    &__item {
      transition: 0.3s;
      padding: 6px 8px;
      border-radius: 4px;
  
      &.is-active {
        background-color: rgba(var(--v-theme-primary), 0.15)
      }
    }
  }
</style>

