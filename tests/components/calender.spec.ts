
import { mount } from '@vue/test-utils'
import Calender from '../../src/components/calender.vue'
import { vuetify } from '../../src/plugins/vuetify'
import '@vuepic/vue-datepicker/dist/main.css'


describe('calender.vue', () => {

  it('renders props when passed check 1', async () => {
    const wrapper = mount(Calender, {
      global: {
        plugins: [vuetify]
      },
      props: { 
        startDate: '2020-01-10', 
        endDate: '2021-01-10'
      }
    })
    const props = wrapper.vm.$props as { startDate: string, endDate: string }
    expect(props.startDate).toBe('2020-01-10')
    expect(props.endDate).toBe('2021-01-10')
  })

  it('displays the correct date range in the text field', async () => {
    const wrapper = mount(Calender, {
      global: {
        plugins: [vuetify]
      },
      props: { 
        startDate: '2020-01-10', 
        endDate: '2021-01-10'
      },
      // slots: {
      //   default: `
      //     <template #activator="{ props }">
      //       <v-col sm="3">
      //         <v-text-field
      //           :model-value="'2020-01-10〜2021-01-10'"
      //           v-bind="props"
      //           label="表示期間"
      //           density="comfortable"
      //           hide-details
      //         />
      //       </v-col>
      //     </template>`
      // }
    })
    // const wrapper = mount(tmp, {
    //   global: {
    //     plugins: [vuetify]
    //   },
    //   props: { 
    //     startDate: '2020-01-10', 
    //     endDate: '2021-01-10'
    //   },
    // })
    await wrapper.vm.$nextTick()

    const textField = wrapper.findComponent({ name: 'VTextField' })
    expect(textField.exists()).toBe(true)

    console.log(textField.html())
    // console.log(textField)
    const modelValue = textField.props('modelValue')
    expect(modelValue).toBe('2020-01-10〜2021-01-10')
  })

  xit('updates periods correctly', async () => {
    const wrapper = mount(Calender, {
      global: {
        plugins: [vuetify]
      },
      props: { 
        startDate: '2020-01-10', 
        endDate: '2021-01-10'
      }
    })
    // setup関数内の状態を取得
    const vm = wrapper.vm as any

    // 更新ボタンの有効化のために仮の日付を設定
    vm.tmpStartDate = '2021-01-01'
    vm.tmpEndDate = '2021-12-31'
    vm.isTmpStartDateChanged = true
    vm.isTmpEndDateChanged = true

    await wrapper.vm.$nextTick()

    // 更新ボタンをクリック
    const updateButton = wrapper.findAllComponents({ name: 'VBtn' }).find(btn => btn.text() === '検索')
    if (!updateButton) {
      throw new Error('Update button not found')
    }
    const prependIcon = updateButton.find('.v-btn__prepend .mdi-update')
    expect(prependIcon.exists()).toBe(true) // アイコンが存在することを確認
    await updateButton.trigger('click')

    // イベントの確認
    const emittedEvents = wrapper.emitted()
    expect(emittedEvents).toHaveProperty('startDateStrDrawer')
    expect(emittedEvents).toHaveProperty('endDateStrDrawer')

    // イベントのペイロードを確認
    expect(emittedEvents.startDateStrDrawer[0]).toEqual(['2021-01-01'])
    expect(emittedEvents.endDateStrDrawer[0]).toEqual(['2021-12-31'])
  })

  xit('closes menu on cancel', async () => {
    const wrapper = mount(Calender, {
      global: {
        plugins: [vuetify]
      },
      props: { 
        startDate: '2020-01-10', 
        endDate: '2021-01-10'
      }
    })
    // setup関数内の状態を取得
    const vm = wrapper.vm as any

    // メニューを開く
    vm.isMenuOpened = true

    await wrapper.vm.$nextTick()

    // キャンセルボタンをクリック
    const cancelButton = wrapper.findAllComponents({ name: 'VBtn' }).find(btn => btn.text() === 'キャンセル')
    if (!cancelButton) {
      throw new Error('cancel button not found')
    }
    const prependIcon = cancelButton.find('.v-btn__prepend .mdi-cancel')
    expect(prependIcon.exists()).toBe(true) // アイコンが存在することを確認
    await cancelButton.trigger('click')

    expect(vm.isMenuOpened).toBe(false)
  })

  xit('clears dates on clear button click', async () => {
    const wrapper = mount(Calender, {
      global: {
        plugins: [vuetify]
      },
      props: { 
        startDate: '2020-01-10', 
        endDate: '2021-01-10'
      }
    })
    // setup関数内の状態を取得
    const vm = wrapper.vm as any

    // 更新ボタンの有効化のために仮の日付を設定
    vm.tmpStartDate = '2021-01-01'
    vm.tmpEndDate = '2021-12-31'
    vm.isTmpStartDateChanged = true
    vm.isTmpEndDateChanged = true

    // クリアボタン押下時の日付を設定
    vm.clearStartDate = '2020-01-10'
    vm.clearEndDate = '2021-01-10'

    await wrapper.vm.$nextTick()

    // 日付をクリアボタンをクリック
    const clearButton = wrapper.findAllComponents({ name: 'VBtn' }).find(btn => btn.text() === 'クリア')
    if (!clearButton) {
      throw new Error('Clear button not found')
    }
    const prependIcon = clearButton.find('.v-btn__prepend .mdi-close')
    expect(prependIcon.exists()).toBe(true) // アイコンが存在することを確認
    await clearButton.trigger('click')

    const clearEmittedEvents = wrapper.emitted()
    expect(clearEmittedEvents).toHaveProperty('startDateStrDrawer')
    expect(clearEmittedEvents).toHaveProperty('endDateStrDrawer')

    // イベントのペイロードを確認
    expect(clearEmittedEvents.startDateStrDrawer[0]).toEqual(['2020-01-10'])
    expect(clearEmittedEvents.endDateStrDrawer[0]).toEqual(['2021-01-10'])
  })

  it('disables search button when dates are not changed', async () => {
    const wrapper = mount(Calender, {
      global: {
        plugins: [vuetify]
      },
      props: { 
        startDate: '2020-01-10', 
        endDate: '2021-01-10'
      }
    })
    // setup関数内の状態を取得
    const vm = wrapper.vm as any

    // 更新ボタンの有効化のために仮の日付を設定
    vm.tmpStartDate = '2020-01-10'
    vm.tmpEndDate = '2021-01-10'
    vm.isTmpStartDateChanged = false
    vm.isTmpEndDateChanged = true

    await wrapper.vm.$nextTick()

    // 日付をクリアボタンをクリック
    const updateButton = wrapper.findAllComponents({ name: 'VBtn' }).find(btn => btn.text() === '検索')
    if (!updateButton) {
      throw new Error('Update button not found')
    }
    const prependIcon = updateButton.find('.v-btn__prepend .mdi-update')
    expect(prependIcon.exists()).toBe(true) // アイコンが存在することを確認
    expect(updateButton.isVisible()).toBe(true)
  })
})

describe('calender.vue - isUpdatable', () => {

  const mountCalender = (props: { startDate: string; endDate: string }) => {
    return mount(Calender, {
      global: {
        plugins: [vuetify]
      },
      props
    })
  }

  it('returns false if dates are not changed', async () => {
    const wrapper = mountCalender({
      startDate: '2020-01-10', 
      endDate: '2021-01-10'
    })
    const vm = wrapper.vm as any

    // 状態を変更
    vm.isTmpStartDateChanged = false
    vm.isTmpEndDateChanged = false

    await wrapper.vm.$nextTick()

    expect(vm.isUpdatable).toBe(false)
  })

  it('returns true if start date is changed', async () => {
    const wrapper = mountCalender({
      startDate: '2020-01-10', 
      endDate: '2021-01-10'
    })
    const vm = wrapper.vm as any

    // 状態を変更
    vm.tmpStartDate = '2021-01-01'
    vm.isTmpStartDateChanged = true
    vm.isTmpEndDateChanged = false

    await wrapper.vm.$nextTick()

    expect(vm.isUpdatable).toBe(true)
  })

  it('returns true if end date is changed', async () => {
    const wrapper = mountCalender({
      startDate: '2020-01-10', 
      endDate: '2021-01-10'
    })
    const vm = wrapper.vm as any

    // 状態を変更
    vm.tmpEndDate = '2021-12-31'
    vm.isTmpStartDateChanged = false
    vm.isTmpEndDateChanged = true

    await wrapper.vm.$nextTick()

    expect(vm.isUpdatable).toBe(true)
  })

  it('returns false if end date is before start date', async () => {
    const wrapper = mountCalender({
      startDate: '2022-01-10', 
      endDate: '2021-01-10'
    })
    const vm = wrapper.vm as any

    // 状態を変更
    vm.tmpStartDate = '2022-01-10'
    vm.tmpEndDate = '2021-01-01'
    vm.isTmpStartDateChanged = true
    vm.isTmpEndDateChanged = true

    await wrapper.vm.$nextTick()

    expect(vm.isUpdatable).toBe(false)
  })

  it('returns true if end date is the same as start date', async () => {
    const wrapper = mountCalender({
      startDate: '2020-01-10', 
      endDate: '2021-01-10'
    })
    const vm = wrapper.vm as any

    // 状態を変更
    vm.tmpStartDate = '2021-01-01'
    vm.tmpEndDate = '2021-01-01'
    vm.isTmpStartDateChanged = true
    vm.isTmpEndDateChanged = true

    await wrapper.vm.$nextTick()

    expect(vm.isUpdatable).toBe(true)
  })
})
