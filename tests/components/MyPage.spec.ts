import { mount } from '@vue/test-utils'
import MyPage from '../../src/components/MyPage.vue'
import { vuetify } from '../../src/plugins/vuetify'
import router from '../../src/router'


jest.mock('../../src/router', () => ({
  push: jest.fn(),
}))

describe('MyPage.vue', () => {

  const myPageMount = (options = {}) => {
    return mount(MyPage, {
      global: {
        plugins: [vuetify],
      },
      ...options,
      props: {
        dialog: true, // propsにdialogを設定
      },
      // attachTo: document.body, // テレポートを無効にするためにアタッチ
    })
  }

  it('item list check', async () => {
    const listItemTexts = ['ホーム', 'ダッシュボード', '設定', 'アカウント', 'バージョン']
    const wrapper = myPageMount()

    await wrapper.vm.$nextTick()

    const listItems = wrapper.findAllComponents({name: 'VListItem'})
    const listItemTitlesArray  = listItems.map(item => item.text())
    

    listItemTexts.forEach(text => {
      expect(listItemTitlesArray).toContain(text)
    })
  })

  it('ホーム button check', async () => {
    const wrapper = myPageMount()

    // 次のレンダリングサイクルまで待ちます
    await wrapper.vm.$nextTick()

    const itemButton = wrapper.findAllComponents({ name: 'VBtn' }).find(btn => btn.text() === 'ホーム')

    await itemButton?.trigger('click')

    // イベントの確認
    const emittedEvents = wrapper.emitted()

    // イベントのペイロードを確認
    expect(emittedEvents).toHaveProperty('myPageDialog')
    expect(emittedEvents.myPageDialog[0]).toEqual([false])

    // ルーターのプッシュが呼び出されたことを確認
    expect(router.push).toHaveBeenCalledWith('no path')
  })

  it('ダッシュボード button check', async () => {
    const wrapper = myPageMount()

    // 次のレンダリングサイクルまで待ちます
    await wrapper.vm.$nextTick()

    const itemButton = wrapper.findAllComponents({ name: 'VBtn' }).find(btn => btn.text() === 'ダッシュボード')

    await itemButton?.trigger('click')

    // イベントの確認
    const emittedEvents = wrapper.emitted()

    // イベントのペイロードを確認
    expect(emittedEvents).toHaveProperty('myPageDialog')
    expect(emittedEvents.myPageDialog[0]).toEqual([false])

    // ルーターのプッシュが呼び出されたことを確認
    expect(router.push).toHaveBeenCalledWith('no path')
  })

  it('設定 button check', async () => {
    const wrapper = myPageMount()

    // 次のレンダリングサイクルまで待ちます
    await wrapper.vm.$nextTick()

    const itemButton = wrapper.findAllComponents({ name: 'VBtn' }).find(btn => btn.text() === '設定')

    await itemButton?.trigger('click')

    // イベントの確認
    const emittedEvents = wrapper.emitted()

    // イベントのペイロードを確認
    expect(emittedEvents).toHaveProperty('myPageDialog')
    expect(emittedEvents.myPageDialog[0]).toEqual([false])

    // ルーターのプッシュが呼び出されたことを確認
    expect(router.push).toHaveBeenCalledWith('no path')
  })

  it('アカウント button check', async () => {
    const wrapper = myPageMount()

    // 次のレンダリングサイクルまで待ちます
    await wrapper.vm.$nextTick()

    const itemButton = wrapper.findAllComponents({ name: 'VBtn' }).find(btn => btn.text() === 'アカウント')

    await itemButton?.trigger('click')

    // イベントの確認
    const emittedEvents = wrapper.emitted()

    // イベントのペイロードを確認
    expect(emittedEvents).toHaveProperty('myPageDialog')
    expect(emittedEvents.myPageDialog[0]).toEqual([false])

    // ルーターのプッシュが呼び出されたことを確認
    expect(router.push).toHaveBeenCalledWith('no path')
  })

  it('バージョン button check', async () => {
    const wrapper = myPageMount()

    // 次のレンダリングサイクルまで待ちます
    await wrapper.vm.$nextTick()

    const itemButton = wrapper.findAllComponents({ name: 'VBtn' }).find(btn => btn.text() === 'バージョン')

    await itemButton?.trigger('click')

    // イベントの確認
    const emittedEvents = wrapper.emitted()

    // イベントのペイロードを確認
    expect(emittedEvents).toHaveProperty('myPageDialog')
    expect(emittedEvents.myPageDialog[0]).toEqual([false])

    // ルーターのプッシュが呼び出されたことを確認
    expect(router.push).toHaveBeenCalledWith('/mypage/version')
  })

  it('Back button check', async () => {
    const wrapper = myPageMount()

    // 次のレンダリングサイクルまで待ちます
    await wrapper.vm.$nextTick()

    const itemButton = wrapper.findAllComponents({ name: 'VBtn' }).find(btn => btn.text() === 'Back')

    await itemButton?.trigger('click')

    // イベントの確認
    const emittedEvents = wrapper.emitted()

    // イベントのペイロードを確認
    expect(emittedEvents).toHaveProperty('myPageDialog')
    expect(emittedEvents.myPageDialog[0]).toEqual([false])
  })
})
