import { mount, flushPromises } from '@vue/test-utils'
import chart from '../../src/components/chart.vue'
import ApiEndpoint from '../../src/common/apiEndpoint'
import Chart from 'chart.js/auto'


// Chart.jsのグローバルインスタンスをモック
jest.mock('chart.js/auto', () => ({
    __esModule: true,
    default: jest.fn().mockImplementation(() => ({
      destroy: jest.fn(),
      update: jest.fn(),
    })),
  }))

jest.mock('../../src/common/apiEndpoint', () => ({
  getYearsIncomeDate: jest.fn(),
}))

const mockData = [
  {
    Years: '2021',
    TotalAmount: 500000,
    DeductionAmount: 50000,
    TakeHomeAmount: 450000,
  },
  {
    Years: '2022',
    TotalAmount: 600000,
    DeductionAmount: 60000,
    TakeHomeAmount: 540000,
  },
]

describe('chart.vue', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('defineProps data check', async () => {
    const wrapper = mount(chart, {
        props: { userId: 1 },
      })
      const props = wrapper.vm.$props as { userId: number }
      expect(props.userId).toBe(1)
  })

  it('fetches data and renders the chart', async () => {
    // モックAPIのレスポンスを設定
    (ApiEndpoint.getYearsIncomeDate as jest.Mock).mockResolvedValue({
      data: { result: mockData },
    })

    const wrapper = mount(chart, {
      props: { userId: 1 },
    })

    // APIの呼び出しを待つ
    await flushPromises()

    // チャートの生成を確認
    expect(Chart).toHaveBeenCalled()

    // コンポーネント内のデータを検証
    expect(wrapper.vm.chartData).toEqual([
      {
        years: '2021',
        total_amount: 500000,
        deduction_amount: 50000,
        take_home_amount: 450000,
      },
      {
        years: '2022',
        total_amount: 600000,
        deduction_amount: 60000,
        take_home_amount: 540000,
      },
    ])
  })

  it('handles API error gracefully', async () => {
    // モックAPIがエラーをスローするように設定
    (ApiEndpoint.getYearsIncomeDate as jest.Mock).mockRejectedValue(new Error('API Error'))

    const wrapper = mount(chart, {
      props: { userId: 1 },
    })
    
    try {
        // APIの呼び出しを待つ
        await flushPromises()
        // コンポーネント内のデータが空であることを検証
        expect(wrapper.vm.chartData).toEqual([])
    } catch (error) {
        // エラーメッセージがコンソールに出力されたことを確認
        expect(console.error).toHaveBeenCalledWith('Error fetching data:', expect.any(Error))
    }
  })

  it('calls createChart and renders a chart', async () => {
    // モックAPIのレスポンスを設定
    (ApiEndpoint.getYearsIncomeDate as jest.Mock).mockResolvedValue({
      data: { result: mockData },
    })

    const wrapper = mount(chart, {
      props: { userId: 1 },
    })

    // APIの呼び出しを待つ
    await flushPromises()

    // createChartメソッドが正しく呼び出されたか確認
    const ctx = wrapper.vm.chartRef.getContext('2d')
    expect(Chart).toHaveBeenCalledWith(ctx, expect.objectContaining({
      type: 'line',
      data: expect.objectContaining({
        labels: ['2021', '2022'],
        datasets: [
          { label: '総支給', data: [500000, 600000], borderColor: 'blue' },
          { label: '差引額', data: [50000, 60000], borderColor: 'green' },
          { label: '手取り額', data: [450000, 540000], borderColor: 'red' },
        ],
      }),
    }))
  })

  it('executes onMounted lifecycle hook', async () => {
    // モックAPIのレスポンスを設定
    (ApiEndpoint.getYearsIncomeDate as jest.Mock).mockResolvedValue({
      data: { result: mockData },
    })

    const wrapper = mount(chart, {
      props: { userId: 1 },
    })

    // APIの呼び出しを待つ
    await flushPromises()

    // onMounted内でgetYearsIncomeDataFetchDataが呼ばれていることを確認
    expect(ApiEndpoint.getYearsIncomeDate).toHaveBeenCalledWith('?user_id=1')

    // チャートの生成を確認
    const ctx = wrapper.vm.chartRef.getContext('2d')
    expect(Chart).toHaveBeenCalledWith(ctx, expect.objectContaining({
      type: 'line',
      data: expect.objectContaining({
        labels: ['2021', '2022'],
        datasets: [
          { label: '総支給', data: [500000, 600000], borderColor: 'blue' },
          { label: '差引額', data: [50000, 60000], borderColor: 'green' },
          { label: '手取り額', data: [450000, 540000], borderColor: 'red' },
        ],
      }),
    }))
  })
})
