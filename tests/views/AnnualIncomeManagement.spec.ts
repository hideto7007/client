import { mount, VueWrapper } from '@vue/test-utils'
import AnnualIncomeManagement from '../../src/views/AnnualIncomeManagement.vue'
import { vuetify } from '../../src/plugins/vuetify'
import { ComponentPublicInstance } from 'vue'
import ApiEndpoint from '../../src/common/apiEndpoint'
import { Type, ErrorConst } from '../../src/common/const'


jest.mock('../../src/common/apiEndpoint', () => ({
  incomeDelete: jest.fn(),
  incomeUpdate: jest.fn(),
  incomeCreate: jest.fn(),
  getRangeDate: jest.fn(),
  getIncomeData: jest.fn(),
}))


describe('AnnualIncomeManagement.vue', () => {
  let wrapper: VueWrapper<any, ComponentPublicInstance<{}, any>>

  const mockGetRangeDateResponse = {
    data: {
      result: [
        {
          StratPaymaentDate: '2024-01-01',
          EndPaymaentDate: '2024-12-31'
        }
      ]
    }
  }

  const mockGetIncomeDataResponse = {
    data: {
      result: [
        {
          IncomeForecastID: '1',
          PaymentDate: '2024-06-01',
          Age: 30,
          Industry: 'Tech',
          TotalAmount: 100000,
          DeductionAmount: 30000,
          TakeHomeAmount: 70000,
          Classification: 'Full-time',
          UserID: 1
        }
      ]
    }
  }

  const mockCreateResponse = { 
    statusText: Type.OK,
    data: {
      message: Type.CreateJp
    }
  }

  const mockUpdateResponse = {
    statusText: Type.OK,
    data: {
      message: Type.UpdateJp
    }
  }

  const mockDeleteResponse = {
    statusText: Type.OK,
    data: {
      message: Type.DeleteJp
    }
  }

  beforeEach(() => {
    wrapper = mount(AnnualIncomeManagement, {
      global: {
        plugins: [vuetify]
      }
    })
    localStorage.clear()
  })


  it('sets calendar component values correctly', async () => {
    (ApiEndpoint.getRangeDate as jest.Mock).mockResolvedValue(mockGetRangeDateResponse)
    await wrapper.vm.getRangeDateFetchData()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.startDate).toBe('2024-01-01')
    expect(wrapper.vm.endDate).toBe('2024-12-31')
  })

  it('fetches income data and sets it correctly', async () => {
    (ApiEndpoint.getIncomeData as jest.Mock).mockResolvedValue(mockGetIncomeDataResponse)
    await wrapper.vm.getIncomeDataFetchData('2024-01-01', '2024-12-31')
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.desserts).toHaveLength(1)
    expect(wrapper.vm.desserts[0].income_forecast_id).toBe('1')
    expect(wrapper.vm.desserts[0].payment_date).toBe('2024-06-01')
    expect(wrapper.vm.desserts[0].age).toBe(30)
    expect(wrapper.vm.desserts[0].industry).toBe('Tech')
    expect(wrapper.vm.desserts[0].total_amount).toBe(100000)
    expect(wrapper.vm.desserts[0].deduction_amount).toBe(30000)
    expect(wrapper.vm.desserts[0].take_home_amount).toBe(70000)
    expect(wrapper.vm.desserts[0].classification).toBe('Full-time')
    expect(wrapper.vm.desserts[0].user_id).toBe(1)
  })

  it('creates a new record successfully', async () => {
    (ApiEndpoint.incomeCreate as jest.Mock).mockResolvedValue(mockCreateResponse)

    wrapper.vm.editedItem = {
      payment_date: '2024-06-01',
      age: 30,
      industry: 'Tech',
      total_amount: 100000,
      deduction_amount: 30000,
      classification: 'Full-time',
      user_id: 1
    }
    await wrapper.vm.save()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.alertTitle).toBe(`${Type.CreateJp}成功`)
    expect(wrapper.vm.alertText).toBe(Type.CreateJp)
  })

  xit('toggles edit mode correctly', async () => {
    // チェックボックスのDOMが取得できないので一旦保留
    wrapper.vm.modeFlag = false
    await wrapper.vm.$nextTick()

    // Adjust the selector based on the actual structure
    const modeFlagCheckbox = wrapper.find('input[type="checkbox"]')

    if (modeFlagCheckbox.exists()) {
      await modeFlagCheckbox.setValue(true)
      expect(wrapper.vm.modeFlag).toBe(true)
    } else {
      console.log('Checkbox not found')
    }

    // await modeFlagCheckbox.setChecked(true)
  })

  it('updates an existing record successfully', async () => {
    (ApiEndpoint.incomeUpdate as jest.Mock).mockResolvedValue(mockUpdateResponse)

    wrapper.vm.editedIndex = 0
    wrapper.vm.editedItem = {
      income_forecast_id: '1',
      payment_date: '2024-06-01',
      age: 30,
      industry: 'Tech',
      total_amount: 100000,
      deduction_amount: 30000,
      classification: 'Full-time',
      user_id: 1
    }
    await wrapper.vm.save()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.alertTitle).toBe(`${Type.UpdateJp}成功`)
    expect(wrapper.vm.alertText).toBe(Type.UpdateJp)
  })

  it('deletes an existing record successfully', async () => {
    (ApiEndpoint.incomeDelete as jest.Mock).mockResolvedValue(mockDeleteResponse)

    wrapper.vm.editedIndex = 0
    wrapper.vm.desserts = [{
      income_forecast_id: '1',
      payment_date: '2024-06-01',
      age: 30,
      industry: 'Tech',
      total_amount: 100000,
      deduction_amount: 30000,
      classification: 'Full-time',
      user_id: 1
    }]
    await wrapper.vm.deleteItemConfirm()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.alertTitle).toBe(`${Type.DeleteJp}成功`)
    expect(wrapper.vm.alertText).toBe(Type.DeleteJp)
  })

  it('fetches income data API error correctly', async () => {
    (ApiEndpoint.getIncomeData as jest.Mock).mockRejectedValue(new Error('API Error'))
    await wrapper.vm.getIncomeDataFetchData('2024-01-01', '2024-12-31')
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.alertTitle).toBe(ErrorConst.InterServerError)
    expect(wrapper.vm.alertText).toBe(ErrorConst.ErrorMessage)
  })

  it('creates API error correctly', async () => {
    (ApiEndpoint.incomeCreate as jest.Mock).mockRejectedValue(new Error('API Error'))

    wrapper.vm.editedItem = {
      payment_date: '2024-06-01',
      age: 30,
      industry: 'Tech',
      total_amount: 100000,
      deduction_amount: 30000,
      classification: 'Full-time',
      user_id: 1
    }
    await wrapper.vm.save()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.alertTitle).toBe(ErrorConst.InterServerError)
    expect(wrapper.vm.alertText).toBe(ErrorConst.ErrorMessage)
  })

  it('updates API error correctly', async () => {
    (ApiEndpoint.incomeUpdate as jest.Mock).mockRejectedValue(new Error('API Error'))

    wrapper.vm.editedIndex = 0
    wrapper.vm.editedItem = {
      income_forecast_id: '1',
      payment_date: '2024-06-01',
      age: 30,
      industry: 'Tech',
      total_amount: 100000,
      deduction_amount: 30000,
      classification: 'Full-time',
      user_id: 1
    }
    await wrapper.vm.save()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.alertTitle).toBe(ErrorConst.InterServerError)
    expect(wrapper.vm.alertText).toBe(ErrorConst.ErrorMessage)
  })

  it('deletes API error correctly', async () => {
    (ApiEndpoint.incomeDelete as jest.Mock).mockRejectedValue(new Error('API Error'))

    wrapper.vm.editedIndex = 0
    wrapper.vm.desserts = [{
      income_forecast_id: '1',
      payment_date: '2024-06-01',
      age: 30,
      industry: 'Tech',
      total_amount: 100000,
      deduction_amount: 30000,
      classification: 'Full-time',
      user_id: 1
    }]
    await wrapper.vm.deleteItemConfirm()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.alertTitle).toBe(ErrorConst.InterServerError)
    expect(wrapper.vm.alertText).toBe(ErrorConst.ErrorMessage)
  })
})
