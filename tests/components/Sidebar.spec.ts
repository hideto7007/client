import { mount } from '@vue/test-utils'
import Sidebar from '../../src/components/Sidebar.vue'
import { vuetify } from '../../src/plugins/vuetify'
import router from '../../src/router'


jest.mock('../../src/router', () => ({
  push: jest.fn(),
}))

describe('Sidebar.vue', () => {

  const factory = (options = {}) => {
    return mount(Sidebar, {
      global: {
        plugins: [vuetify],
      },
      ...options
    })
  }

  it('item list check', async () => {
    const listItemTexts = ['貯金額計算', '年収管理', '株価予測', 'hoge']
    const wrapper = factory()

    const listItem = wrapper.find('v-list')

    listItemTexts.forEach(text => {
      expect(listItem.text()).toContain(text)
    })
  })

  it('貯金額計算 button check', async () => {
    const wrapper = factory()

    // 次のレンダリングサイクルまで待ちます
    await wrapper.vm.$nextTick()

    const itemButton = wrapper.findAllComponents({ name: 'VBtn' }).find(btn => btn.text() === '貯金額計算')

    await itemButton?.trigger('click')

    // イベントの確認
    const emittedEvents = wrapper.emitted()

    // イベントのペイロードを確認
    expect(emittedEvents).toHaveProperty('pageDrawer')
    expect(emittedEvents.pageDrawer[0]).toEqual([false])

    // ルーターのプッシュが呼び出されたことを確認
    expect(router.push).toHaveBeenCalledWith('/pricemanagement')
  })

  it('年収管理 button check', async () => {
    const wrapper = factory()

    // 次のレンダリングサイクルまで待ちます
    await wrapper.vm.$nextTick()

    const itemButton = wrapper.findAllComponents({ name: 'VBtn' }).find(btn => btn.text() === '年収管理')

    await itemButton?.trigger('click')

    // イベントの確認
    const emittedEvents = wrapper.emitted()

    // イベントのペイロードを確認
    expect(emittedEvents).toHaveProperty('pageDrawer')
    expect(emittedEvents.pageDrawer[0]).toEqual([false])

    // ルーターのプッシュが呼び出されたことを確認
    expect(router.push).toHaveBeenCalledWith('/annualincomemanagement')
  })

  it('株価予測 button check', async () => {
    const wrapper = factory()

    // 次のレンダリングサイクルまで待ちます
    await wrapper.vm.$nextTick()

    const itemButton = wrapper.findAllComponents({ name: 'VBtn' }).find(btn => btn.text() === '株価予測')

    await itemButton?.trigger('click')

    // イベントの確認
    const emittedEvents = wrapper.emitted()

    // イベントのペイロードを確認
    expect(emittedEvents).toHaveProperty('pageDrawer')
    expect(emittedEvents.pageDrawer[0]).toEqual([false])

    // ルーターのプッシュが呼び出されたことを確認
    expect(router.push).toHaveBeenCalledWith('/stockpriceprediction')
  })
})
