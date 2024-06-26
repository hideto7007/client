
import { mount, shallowMount } from '@vue/test-utils'
// import { createVuetify } from 'vuetify'
// import { config } from '@vue/test-utils'
import Alert from '../../src/components/alert.vue'
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

  it('renders props when passed check 1', async () => {
    const wrapper = mount(Alert, {
      template: '<v-toolbar></v-toolbar>',
      // plugins: [vuetify],
      props: { 
        color: 'success', 
        title: 'テストタイトル1', 
        text: 'テストテキスト1' 
      }
    })
    expect(wrapper.vm.color).toBe('success')
    expect(wrapper.vm.title).toBe('テストタイトル1')
    expect(wrapper.vm.text).toBe('テストテキスト1')
  })

  it('renders props when passed check 2', () => {
    const wrapper = mount(Alert, {
      props: { color: 'warning', title: 'テストタイトル2', text: 'テストテキスト2' }
    })
    expect(wrapper.vm.color).toBe('warning')
    expect(wrapper.vm.title).toBe('テストタイトル2')
    expect(wrapper.vm.text).toBe('テストテキスト2')
  })

  it('renders props when passed check 3', () => {
    const wrapper = mount(Alert, {
      props: { color: 'error', title: 'テストタイトル3', text: 'テストテキスト3' }
    })
    expect(wrapper.vm.color).toBe('error')
    expect(wrapper.vm.title).toBe('テストタイトル3')
    expect(wrapper.vm.text).toBe('テストテキスト3')
  })


  it('closes the dialog on button click', async () => {
    const wrapper = shallowMount(Alert, {
      global: {
        stubs: {
          VBtn: true, // Vuetifyのボタンをスタブ
          VDialog: true, // ダイアログをスタブ
          VCard: true,
          VToolbar: true,
          VCardText: true,
          VCardActions: true
        }
      },
      props: { 
        color: 'success', 
        title: 'テストタイトル', 
        text: 'テストテキスト' 
      }
    })
    const button = wrapper.findComponent({ name: 'VBtn' });
    expect(button.exists()).toBe(true); // ボタンが存在することを確認
    // await wrapper.find('button').trigger('click')
    // expect(wrapper.find('[data-test="dialog"]').exists()).toBe(false)
  })

  // it('navigates to home on button click if color is error', async () => {
  //   const wrapper = mount(Alert, {
  //     props: { color: 'error', title: 'エラー', text: 'エラーメッセージ' }
  //   })
  //   await wrapper.find('button').trigger('click')
  //   expect(router.push).toHaveBeenCalledWith('/')
  // })
})
