
import { mount } from '@vue/test-utils'
import Alert from '@/components/alert.vue'
import { createRouterMock, injectRouterMock } from 'vue-router-mock'
import { RouteRecordRaw } from 'vue-router'

describe('alert.vue', () => {
  // ルーターモックのセットアップ
  const routes: RouteRecordRaw[] = [
    { path: '/', component: {} },
  ]
  const router = createRouterMock({ routes })
  beforeEach(() => {
    injectRouterMock(router)
  })

  it('renders props when passed check 1', () => {
    const wrapper = mount(Alert, {
      props: { color: 'success', title: 'テストタイトル1', text: 'テストテキスト1' }
    })
    expect(wrapper.props().color).toBe('success')
    expect(wrapper.props().title).toBe('テストタイトル1')
    expect(wrapper.props().text).toBe('テストテキスト1')
  })

  it('renders props when passed check 2', () => {
    const wrapper = mount(Alert, {
      props: { color: 'warning', title: 'テストタイトル2', text: 'テストテキスト2' }
    })
    expect(wrapper.props().color).toBe('warning')
    expect(wrapper.props().title).toBe('テストタイトル2')
    expect(wrapper.props().text).toBe('テストテキスト2')
  })

  it('renders props when passed check 3', () => {
    const wrapper = mount(Alert, {
      props: { color: 'error', title: 'テストタイトル3', text: 'テストテキスト3' }
    })
    expect(wrapper.props().color).toBe('error')
    expect(wrapper.props().title).toBe('テストタイトル3')
    expect(wrapper.props().text).toBe('テストテキスト3')
  })


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
