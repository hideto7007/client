
import { mount } from '@vue/test-utils'
import Alert from '../../src/components/alert.vue'
import { createRouterMock, injectRouterMock } from 'vue-router-mock'
import { vuetify } from '../../src/plugins/vuetify'
import { RouteRecordRaw } from 'vue-router'


describe('alert.vue', () => {
  // ルーターモックのセットアップ
  const routes: RouteRecordRaw[] = [
    { path: '/', component: {} },
  ]
  const router = createRouterMock({ routes })

  beforeEach(() => {
    injectRouterMock(router)
    router.push = jest.fn() // router.push をモック
  })

  it('renders props when passed check 1', async () => {
    const wrapper = mount(Alert, {
      template: '<v-toolbar></v-toolbar>',
      global: {
        plugins: [vuetify]
      },
      props: { 
        color: 'success', 
        title: 'テストタイトル1', 
        text: 'テストテキスト1' 
      }
    })
    const props = wrapper.props() as { color: string, title: string, text: string }
    expect(props.color).toBe('success')
    expect(props.title).toBe('テストタイトル1')
    expect(props.text).toBe('テストテキスト1')

    // v-toolbarのcolorとtitleをチェック
    const toolbar = wrapper.findComponent({ name: 'VToolbar' })
    expect(toolbar.props().color).toBe('success')
    expect(toolbar.props().title).toBe('テストタイトル1')
  })

  it('renders props when passed check 2', () => {
    const wrapper = mount(Alert, {
      template: '<v-toolbar></v-toolbar>',
      global: {
        plugins: [vuetify]
      },
      props: { 
        color: 'warning',
        title: 'テストタイトル2',
        text: 'テストテキスト2'
      }
    })
    const props = wrapper.props() as { color: string, title: string, text: string }
    expect(props.color).toBe('warning')
    expect(props.title).toBe('テストタイトル2')
    expect(props.text).toBe('テストテキスト2')

    // v-toolbarのcolorとtitleをチェック
    const toolbar = wrapper.findComponent({ name: 'VToolbar' })
    expect(toolbar.props().color).toBe('warning')
    expect(toolbar.props().title).toBe('テストタイトル2')
  })

  it('renders props when passed check 3', () => {
    const wrapper = mount(Alert, {
      template: '<v-toolbar></v-toolbar>',
      global: {
        plugins: [vuetify]
      },
      props: { 
        color: 'error',
        title: 'テストタイトル3',
        text: 'テストテキスト3' 
      }
    })
    const props = wrapper.props() as { color: string, title: string, text: string }
    expect(props.color).toBe('error')
    expect(props.title).toBe('テストタイトル3')
    expect(props.text).toBe('テストテキスト3')

    // v-toolbarのcolorとtitleをチェック
    const toolbar = wrapper.findComponent({ name: 'VToolbar' })
    expect(toolbar.props().color).toBe('error')
    expect(toolbar.props().title).toBe('テストタイトル3')
  })


  it('closes the dialog on button click', async () => {
    const wrapper = mount(Alert, {
      global: {
        plugins: [vuetify]
      },
      props: { 
        color: 'success', 
        title: '成功タイトル', 
        text: '成功テキスト' 
      }
    })
    // ボタンを見つける
    const button = wrapper.findComponent({ name: 'VBtn' })
    expect(button.exists()).toBe(true); // ボタンが存在することを確認
    await button.trigger('click') // ボタンをクリック
  })
    
  it('navigates to home on button click if color is error', async () => {
    const wrapper = mount(Alert, {
      global: {
        plugins: [vuetify, router]
      },
      props: { 
        color: 'error',
        title: 'エラー',
        text: 'エラーメッセージ' 
      }
    })
    // ボタンを見つける
    const button = wrapper.findComponent({ name: 'VBtn' })
    expect(button.exists()).toBe(true) // ボタンが存在することを確認
    await button.trigger('click') // ボタンをクリック
    expect(router.push).toHaveBeenCalledWith('/') // ホームに遷移したことを確認
  })
})
