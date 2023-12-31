<template>
    <v-menu
        v-model="isMenuOpened"
        transition="slide-y-transition"
        :close-on-content-click="false"
        update:modelValue="(opened) => opened || closeMenu()"
    >
        <template v-slot:activator="{ props }">
            <v-col sm="3">
                <v-text-field
                    :model-value="`${Format.Date(startDate)}〜${Format.Date(endDate)}`"
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
                    {{ Format.Date(tmpStartDate) }}
                </span>
                    <span>&nbsp;-&nbsp;</span>
                <span class="tmpDate__item" :class="{'is-active': isTmpEndDateChanged}">
                    {{ Format.Date(tmpEndDate) }}
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
            <v-toolbar>
                <template v-slot:prepend>
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
                </template>
                    <v-btn
                        prepend-icon="mdi-close"
                        @click="clear"
                    >
                    クリア
                    </v-btn>
            </v-toolbar>
        </v-card-text>
        </v-card>
    </v-menu>
</template>
  
<script lang="ts" setup>
import { ref, computed, defineEmits, defineProps, onMounted } from 'vue'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import Format from '../common/format'

const emit = defineEmits()

const startDate = ref<string>()
const endDate = ref<string>()
const clearStartDate = ref<string>()
const clearEndDate = ref<string>()
// 入力したがまだ反映はされていない、仮状態の期間
const tmpStartDate = ref<string>()
const tmpEndDate = ref<string>()
// 仮状態の期間を変更した／していないのフラグ
const isMenuOpened = ref<boolean>(false)
const isTmpStartDateChanged = ref<boolean>(false)
const isTmpEndDateChanged = ref<boolean>(false)

// プロップを定義
// 親から受け取る
const propsDate = defineProps<{
    startDate: string
    endDate: string
}>();


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
    // AnnualIncomeManagement.vue側に日付検索結果を送信
    emit('startDateStrDrawer', Format.Date(startDate.value))
    emit('endDateStrDrawer', Format.Date(endDate.value))
    closeMenu()
}

// 仮状態の期間を反映可能な状態なら true
const isUpdatable = computed<boolean>(() => {
    // 期間が変更されていないなら false
    if (!isTmpStartDateChanged.value && !isTmpEndDateChanged.value) {
        return false
    }
    // end が start より過去の値になっているなら false (同日は可)
    if (tmpEndDate.value !== 'undefined' && tmpStartDate.value !== 'undefined') {
        const diffDays = Format.dateDiffInDays(tmpEndDate.value, tmpStartDate.value)
        if (diffDays < 0) {
            return false
        }
    }
    // 上記以外は true
    return true
})

const clear = (): void => {
    startDate.value = clearStartDate.value
    endDate.value = clearEndDate.value
    emit('startDateStrDrawer', clearStartDate.value)
    emit('endDateStrDrawer', clearEndDate.value)
    closeMenu()
}

// Vue Datepicker に渡すオプション
const datepickerOptions = {
    inline: true, // 入力フィールドを削除し、カレンダーを親コンポーネントに配置する
    format: Format.Date,
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

onMounted(() => {
    tmpStartDate.value = propsDate.startDate
    startDate.value = propsDate.startDate
    clearStartDate.value = propsDate.startDate
    tmpEndDate.value = propsDate.endDate
    endDate.value = propsDate.endDate
    clearEndDate.value = propsDate.endDate
})

</script>

<script lang="ts">
export default {}
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
  
  