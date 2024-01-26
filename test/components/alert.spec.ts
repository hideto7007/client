
import { mount } from '@vue/test-utils'
import Alert from '../../src/components/alert.vue'
import { createRouterMock, injectRouterMock } from 'vue-router-mock'
import { RouteRecordRaw } from 'vue-router'
// import { AlertProps } from '../../src/type/types'

describe('alert.vue', () => {
  // ルーターモックのセットアップ
  const routes: RouteRecordRaw[] = [
    { path: '/', component: {} },
  ]
  const router = createRouterMock({ routes })
  beforeEach(() => {
    injectRouterMock(router)
  })
  const wrapper = mount(Alert, {
    props: { color: 'success', title: 'テストタイトル1', text: 'テストテキスト1' }
  })
  it('renders props when passed check 1', () => {

    expect(wrapper.vm.color).toBe('success')
    expect(wrapper.vm.title).toBe('テストタイトル1')
    expect(wrapper.vm.text).toBe('テストテキスト1')
  })

  // it('renders props when passed check 2', () => {
  //   const wrapper = mount<AlertProps>(Alert, {
  //     props: { color: 'warning', title: 'テストタイトル2', text: 'テストテキスト2' }
  //   })
  //   expect(wrapper.props().color).toBe('warning')
  //   expect(wrapper.props().title).toBe('テストタイトル2')
  //   expect(wrapper.props().text).toBe('テストテキスト2')
  // })

  // it('renders props when passed check 3', () => {
  //   const wrapper = mount<AlertProps>(Alert, {
  //     props: { color: 'error', title: 'テストタイトル3', text: 'テストテキスト3' }
  //   })
  //   expect(wrapper.props().color).toBe('error')
  //   expect(wrapper.props().title).toBe('テストタイトル3')
  //   expect(wrapper.props().text).toBe('テストテキスト3')
  // })


  // it('closes the dialog on button click', async () => {
  //   const wrapper = mount(Alert, {
  //     props: { color: 'info', title: 'テストタイトル', text: 'テストテキスト' }
  //   })
  //   await wrapper.find('button').trigger('click')
  //   expect(wrapper.vm.dialog).toBe(false)
  // })

  // it('navigates to home on button click if color is error', async () => {
  //   const wrapper = mount(Alert, {
  //     props: { color: 'error', title: 'エラー', text: 'エラーメッセージ' }
  //   })
  //   await wrapper.find('button').trigger('click')
  //   expect(router.push).toHaveBeenCalledWith('/')
  // })
})
