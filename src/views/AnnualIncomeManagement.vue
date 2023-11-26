<template>
    <div v-if="screenFlag && startDate !== undefined && endDate !== undefined && tmpStartDate !== undefined && tmpEndDate !== undefined">
      <v-menu
        v-model="isMenuOpened"
        transition="slide-y-transition"
        :close-on-content-click="false"
        update:modelValue="(opened) => opened || closeMenu()"
      >
        <template v-slot:activator="{ props }">
         <v-col sm="3">
          <v-text-field
            :model-value="`${formatDate(startDate)}〜${formatDate(endDate)}`"
            v-bind="props"
            label="表示期間"
            density="comfortable"
            hide-details
          />
         </v-col>
        </template>
  
        <v-card class="pa-3">
          <v-card-title class="mb-3">
            <v-icon icon="mdi-calendar-check" class="mt-n1 mr-2" size="md" />検索期間
          </v-card-title>
  
          <v-card-text>
            <p class="tmpDate mb-3">
              <span class="tmpDate__item" :class="{'is-active': isTmpStartDateChanged}">
                {{ formatDate(tmpStartDate) }}
              </span>
              <span>&nbsp;-&nbsp;</span>
              <span class="tmpDate__item" :class="{'is-active': isTmpEndDateChanged}">
                {{ formatDate(tmpEndDate) }}
              </span>
            </p>
  
            <v-row class="mb-5">
              <v-col cols="auto">
                <p class="text-overline font-weight-bold">FROM</p>
                <Datepicker
                  v-model="tmpStartDate"
                  v-bind="startDatepickerOptions"
                  @update:modelValue="handleUpdateStartDatepicker"
                />
              </v-col>
  
              <v-col cols="auto">
                <p class="text-overline font-weight-bold">TO</p>
                <Datepicker
                  v-model="tmpEndDate"
                  v-bind="endDatepickerOptions"
                  @update:modelValue="handleUpdateEndDatepicker"
                />
              </v-col>
            </v-row>
  
            <v-btn
              color="primary"
              prepend-icon="mdi-update"
              :disabled="!isUpdatable"
              class="px-8 mr-4"
              @click="updatePeriods"
            >
              検索
            </v-btn>
            <v-btn
              prepend-icon="mdi-cancel"
              @click="closeMenu"
            >
              キャンセル
            </v-btn>
          </v-card-text>
        </v-card>
      </v-menu>
    </div>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :sort-by="[
      { key: keyList[0], order: sort },
      { key: keyList[1], order: sort },
      { key: keyList[2], order: sort },
      { key: keyList[3], order: sort },
      { key: keyList[4], order: sort },
      { key: keyList[5], order: sort }]"
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
                          v-model="editedItem.take_home_amount"
                          :label="labelList[5]"
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
                  color="blue-darken-1"
                  variant="text"
                >
                  登録
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
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
</template>

<script lang="ts" setup>
import { ref, onMounted, computed, watch, nextTick } from 'vue'
import ApiEndpoint from "../common/apiEndpoint"
import Validation from "../common/vaildation"
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'


const startDate = ref<Date>()
const endDate = ref<Date>()
// 入力したがまだ反映はされていない、仮状態の期間
const tmpStartDate = ref<Date>()
const tmpEndDate = ref<Date>()
const screenFlag = ref<boolean>(false)
// 仮状態の期間を変更した／していないのフラグ
const isMenuOpened = ref<boolean>(false)
const isTmpStartDateChanged = ref<boolean>(false)
const isTmpEndDateChanged = ref<boolean>(false)
// メニューが表示されているなら true
const classificationList = ref<string[]>(['給料', '賞与', '一時金', '寸志', 'その他'])
const dialog = ref<boolean>(false)
const dialogDelete = ref<boolean>(false)
const ageList = ref<number[]>([...Array(86).keys()].map(i => i + 15))
const labelList = ref<string[]>(['支給日', '年齢', '業種', '総支給', '差引額', '手取り', '分類'])
const keyList = ref<string[]>(['payment_date', 'age', 'industry', 'total_amount', 'deduction_amount', 'take_home_amount', 'classification'])
const desserts = ref<Item[]>([])
const editedIndex = ref<number>(-1)
const sort = ref<boolean>(false)
const form = ref<boolean>(false)
// T.B.D
// 現状は1にしておいて、後々ログイン画面作成時にパラメータでuser_idを取得出来るようにする
const userId = ref<string>("1")

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
    'classification': string,
    'user_id': number

}

const headers = ref<Headers[]>([
    {
        title: labelList.value[0],
        key: keyList.value[0]
    },
    {
        title: labelList.value[1],
        key: keyList.value[1]
    },
    {
        title: labelList.value[2],
        key: keyList.value[2]
    },
    {
        title: labelList.value[3],
        key: keyList.value[3]
    },
    {
        title: labelList.value[4],
        key: keyList.value[4]
    },
    {
        title: labelList.value[5],
        key: keyList.value[5]
    },
    {
        title: '編集',
        key: 'edit'
    }
])

const editedItem = ref<Item>({
    income_forecast_id: '',
    payment_date: '',
    age: 0,
    industry: '',
    total_amount: 0,
    deduction_amount: 0,
    take_home_amount: 0,
    classification: '',
    user_id: 0
})

const defaultItem = ref<Item>({
    income_forecast_id: '',
    payment_date: '',
    age: 0,
    industry: '',
    total_amount: 0,
    deduction_amount: 0,
    take_home_amount: 0,
    classification: '',
    user_id: 0
})

// メニューを閉じる。合わせて各状態を初期値に戻す
const closeMenu = (): void => {
  isMenuOpened.value = false
  // メニューが閉じられてから (ユーザの目に見えないときに) 初期値に戻す
  setTimeout(() => {
    isTmpStartDateChanged.value = false
    isTmpEndDateChanged.value = false
  }, 300)
}

// 仮状態の期間を反映する
const updatePeriods = (): void => {
  startDate.value = tmpStartDate.value
  endDate.value = tmpEndDate.value
  closeMenu()
}

// 仮状態の期間を反映可能な状態なら true
const isUpdatable = computed<boolean>(() => {
  // 期間が変更されていないなら false
  if (!isTmpStartDateChanged.value && !isTmpEndDateChanged.value) {
    return false
  }
  // end が start より過去の値になっているなら false (同日は可)
  if (tmpEndDate.value !== undefined && tmpStartDate.value !== undefined) {
    const diffDays = tmpEndDate.value.valueOf() - tmpStartDate.value.valueOf()
    if (diffDays < 0) {
        return false
    }
  }
  // 上記以外は true
  return true
})

const formatDate = (date: Date | undefined | string): string => {
  if (!date) {
    return ''
  }
  else if (typeof date === "string") {
    return date
  } else {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  }
}

// Vue Datepicker に渡すオプション
const datepickerOptions = {
  inline: true, // 入力フィールドを削除し、カレンダーを親コンポーネントに配置する
  format: formatDate,
  locale: 'jp',
  monthChangeOnScroll: false, // マウスホイールで月を切り替えない
  autoApply: true, // 日付をクリックした際、自動的にその値を選択する
  noToday: true, // カレンダーから今日のマークを隠す
  hideOffsetDates: true, // カレンダーの前月／翌月の日付を非表示にする
  preventMinMaxNavigation: true, // minDate または maxDate の後または前のナビゲーションを防止する
  enableTimePicker: false // タイムピッカーを無効化
}

const startDatepickerOptions = {
  ...datepickerOptions
}

const endDatepickerOptions = computed(() => ({
  ...datepickerOptions,
  minDate: tmpStartDate.value // 選択できる最小の日付は start と同日まで
}))

const handleUpdateStartDatepicker = (): void => {
  // 仮状態の期間を変更した／していないのフラグを更新
  isTmpStartDateChanged.value = true
  isTmpEndDateChanged.value = false
}

const handleUpdateEndDatepicker = (): void => {
  // 仮状態の期間を変更した／していないのフラグを更新
  isTmpEndDateChanged.value = true
  isTmpStartDateChanged.value = false
}

const formTitle = computed(() => editedIndex.value === -1 ? '新規登録' : '編集')

const editItem = (item: Item): void => {
    editedIndex.value = desserts.value.indexOf(item)
    editedItem.value = Object.assign({}, item)
    console.log(editedItem.value)
    dialog.value = true
}

const deleteItem = (item: Item): void => {
    editedIndex.value = desserts.value.indexOf(item)
    editedItem.value = Object.assign({}, item)
    dialogDelete.value = true
}

const deleteItemConfirm = (): void => {
    desserts.value.splice(editedIndex.value, 1)
    closeDelete()
}

const close = () => {
  dialog.value = false
  nextTick(() => {
    editedItem.value = Object.assign({}, defaultItem.value)
    editedIndex.value = -1
  })
}


const closeDelete = () => {
  dialog.value = false
  nextTick(() => {
    editedItem.value = Object.assign({}, defaultItem.value)
    editedIndex.value = -1
  })
}

const save = () => {
  console.log(form.value)
  if (editedIndex.value > -1) {
    Object.assign(desserts.value[editedIndex.value], editedItem.value);
    console.log("edit", desserts.value)
  } else {
    desserts.value.push(editedItem.value);
    console.log("new", desserts.value)
  }
  close();
}


const getRangeDateFetchData = async(): Promise<void> => {
    const queryList: string[] = []
    queryList.push("user_id=" + userId.value)
    const fullPrames: string = "?" + queryList.join('&')
    try {
      const response = await ApiEndpoint.getRangeDate(fullPrames)
      const data = response.data // レスポンスからデータを取得

      startDate.value = data.result[0].StratPaymaentDate
      endDate.value = data.result[0].EndPaymaentDate

      tmpStartDate.value = startDate.value
      tmpEndDate.value = endDate.value

      screenFlag.value = true

    } catch (error) {
      console.error('Error fetching data:', error)
    }
}


const getIncomeDataFetchData = async(): Promise<void> => {
    const queryList: string[] = []
    queryList.push("start_date=" + startDate.value)
    queryList.push("end_date=" + endDate.value)
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
            classification: data.Classification,
            user_id: data.UserID
        })
      }

    } catch (error) {
      console.error('Error fetching data:', error)
    }
}

// ページ読み込み
onMounted(async () => {
    await getRangeDateFetchData()
    getIncomeDataFetchData()
})

watch(dialog, (val: boolean): void => {
    val || close()
})

watch(dialogDelete, (val: boolean) : void => {
    val || closeDelete()
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

