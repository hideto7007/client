import { mount, VueWrapper } from '@vue/test-utils'
import PriceManagment from '../../src/views/PriceManagment.vue'
import { vuetify } from '../../src/plugins/vuetify'
import { ComponentPublicInstance } from 'vue'
import ApiEndpoint from '../../src/common/apiEndpoint'


jest.mock('../../src/common/apiEndpoint', () => ({
  getPriceManagement: jest.fn(),
}))


describe('PriceManagment.vue', () => {
  let wrapper: VueWrapper<any, ComponentPublicInstance<{}, any>>

  const mockData = {
    left_amount: 100,
    total_amount: 300,
  }

  beforeEach(() => {
    wrapper = mount(PriceManagment, {
      // localVue,
      vuetify,
    })
    wrapper.vm.today = "2024-05-30"
    localStorage.clear()
  })

  it('date text field check', async () => {
    const dateInput = wrapper.find('input[type="date"]')
    await dateInput.setValue('2024-06-30')
    await wrapper.vm.$nextTick()

    // Verify that date.value is correctly set
    expect(wrapper.vm.date).toBe('2024-06-30')
  });

  it('priceList check', async () => {
    const moneyReceived = wrapper.findAll('input').at(1)
    const bouns = wrapper.findAll('input').at(2)
    const fixedCost = wrapper.findAll('input').at(3)
    const loan = wrapper.findAll('input').at(4)
    const privates = wrapper.findAll('input').at(5)
    const insurance = wrapper.findAll('input').at(6)

    await moneyReceived?.setValue(50000)
    await bouns?.setValue(10000)
    await fixedCost?.setValue(20000)
    await loan?.setValue(15000)
    await privates?.setValue(5000)
    await insurance?.setValue(3000)

    expect(Number(wrapper.vm.moneyReceived)).toBe(50000)
    expect(Number(wrapper.vm.bouns)).toBe(10000)
    expect(Number(wrapper.vm.fixedCost)).toBe(20000)
    expect(Number(wrapper.vm.loan)).toBe(15000)
    expect(Number(wrapper.vm.privates)).toBe(5000)
    expect(Number(wrapper.vm.insurance)).toBe(3000)
  });

  it('sets and retrieves values correctly from localStorage', async () => {
    wrapper.vm.moneyReceived = 50000
    wrapper.vm.bouns = 10000
    wrapper.vm.fixedCost = 20000
    wrapper.vm.loan = 15000
    wrapper.vm.privates = 5000
    wrapper.vm.insurance = 3000
    await wrapper.vm.$nextTick()

    wrapper.vm.handleSubmit()
    await wrapper.vm.$nextTick()

    const sumitFpInfo = localStorage.getItem('sumitFpInfo')
    if (sumitFpInfo) {
      expect(JSON.parse(sumitFpInfo)).toEqual({
        moneyReceived: 50000,
        bouns: 10000,
        fixedCost: 20000,
        loan: 15000,
        private: 5000,
        insurance: 3000,
      })
    } else {
      throw new Error('sumitFpInfo not found in localStorage')
    }

    wrapper.vm.moneyReceived = 0
    wrapper.vm.bouns = 0
    wrapper.vm.fixedCost = 0
    wrapper.vm.loan = 0
    wrapper.vm.privates = 0
    wrapper.vm.insurance = 0

    wrapper.vm.loadFromLocalStorage()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.moneyReceived).toBe(50000)
    expect(wrapper.vm.bouns).toBe(10000)
    expect(wrapper.vm.fixedCost).toBe(20000)
    expect(wrapper.vm.loan).toBe(15000)
    expect(wrapper.vm.privates).toBe(5000)
    expect(wrapper.vm.insurance).toBe(3000)
  })

  it('buttons are operable', async () => {

    (ApiEndpoint.getPriceManagement as jest.Mock).mockResolvedValue({
      data: { message: { result: mockData } }
    })
    await wrapper.vm.$nextTick()

    const dateInput = wrapper.find('input[type="date"]')
    await dateInput.setValue('2024-12-31')
    await wrapper.vm.$nextTick()

    // 計算結果のテスト
    const moneyReceived = wrapper.findAll('input').at(1)
    const bouns = wrapper.findAll('input').at(2)
    const fixedCost = wrapper.findAll('input').at(3)
    const loan = wrapper.findAll('input').at(4)
    const privates = wrapper.findAll('input').at(5)
    const insurance = wrapper.findAll('input').at(6)

    await moneyReceived?.setValue(50000)
    await bouns?.setValue(10000)
    await fixedCost?.setValue(20000)
    await loan?.setValue(15000)
    await privates?.setValue(5000)
    await insurance?.setValue(3000)

    const calculateButton = wrapper.find('button[type="submit"]')
    await calculateButton?.trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.leftAmount).toBe(100)
    expect(wrapper.vm.totalAmount).toBe(300)
    expect(wrapper.vm.totalRangeAmount).toBe(700)

    // クリアボタンのテスト
    const resetButton = wrapper.findAll('button').at(1)
    await resetButton?.trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.moneyReceived).toBe(0)
    expect(wrapper.vm.bouns).toBe(0)
    expect(wrapper.vm.fixedCost).toBe(0)
    expect(wrapper.vm.loan).toBe(0)
    expect(wrapper.vm.privates).toBe(0)
    expect(wrapper.vm.insurance).toBe(0)
    expect(wrapper.vm.leftAmount).toBe(0)
    expect(wrapper.vm.totalAmount).toBe(0)
    expect(wrapper.vm.totalRangeAmount).toBe(0)
  })

  it('handles API error correctly', async () => {
    (ApiEndpoint.getPriceManagement as jest.Mock).mockRejectedValue(new Error('API Error'))

    const moneyReceived = wrapper.findAll('input').at(0)
    const bouns = wrapper.findAll('input').at(1)
    const fixedCost = wrapper.findAll('input').at(2)
    const loan = wrapper.findAll('input').at(3)
    const privates = wrapper.findAll('input').at(4)
    const insurance = wrapper.findAll('input').at(5)

    await moneyReceived?.setValue(50000)
    await bouns?.setValue(10000)
    await fixedCost?.setValue(20000)
    await loan?.setValue(15000)
    await privates?.setValue(5000)
    await insurance?.setValue(3000)

    const calculateButton = wrapper.find('button[type="submit"]')
    await calculateButton.trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.serverErrorFlag).toBe(true)
    expect(wrapper.vm.leftAmount).toBe(0)
    expect(wrapper.vm.totalAmount).toBe(0)
    expect(wrapper.vm.totalRangeAmount).toBe(0)
  })
})
