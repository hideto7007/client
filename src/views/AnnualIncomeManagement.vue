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
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import ApiEndpoint from "../common/apiEndpoint"
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'


const startDate = ref<Date>()
const endDate = ref<Date>()
// 入力したがまだ反映はされていない、仮状態の期間
const tmpStartDate = ref<Date>()
const tmpEndDate = ref<Date>()
const screenFlag = ref<boolean>(false)
// T.B.D
// 現状は1にしておいて、後々ログイン画面作成時にパラメータでuser_idを取得出来るようにする
const userId = ref<string>("1")

// 仮状態の期間を変更した／していないのフラグ
const isTmpStartDateChanged = ref<boolean>(false)
const isTmpEndDateChanged = ref<boolean>(false)

// メニューが表示されているなら true
const isMenuOpened = ref<boolean>(false)

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
    console.log(diffDays)
    if (diffDays < 0) {
        return false
    }
  }
  // 上記以外は true
  return true
})

const formatDate = (date: Date | undefined | string): string => {
  if (!date) {
    return ''; // もし日付が undefined の場合、空文字列を返すなど、適切な処理を行う
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

const  getRangeDateFetchData = async(): Promise<void> => {
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


// ページ読み込み
onMounted(() => {
    getRangeDateFetchData()
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

