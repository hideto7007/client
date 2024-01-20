<template>
  <div>
    <canvas ref="chartRef"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue'
import Chart from 'chart.js/auto'
import ApiEndpoint from '@/common/apiEndpoint'


const chartRef = ref<any>(null)
const chartData = ref<YearsIncomeData[]>([])

interface YearsIncomeData {
    "years": string,
    "total_amount": number,
    "deduction_amount": number,
    "take_home_amount": number
}

const props = defineProps<{
  userId: number,
}>()

const createChart = () => {
  const ctx = chartRef.value.getContext('2d')
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: chartData.value.map((item: any) => item.years),
      datasets: [
        {
          label: '総支給',
          borderColor: 'blue',
          data: chartData.value.map((item: any) => item.total_amount),
        },
        {
          label: '差引額',
          borderColor: 'green',
          data: chartData.value.map((item: any) => item.deduction_amount),
        },
        {
          label: '手取り額',
          borderColor: 'red',
          data: chartData.value.map((item: any) => item.take_home_amount),
        },
      ],
    },
    options: {
      scales: {
        x: {
          type: 'category',
          labels: chartData.value.map((item: any) => item.years),
        },
        y: {
          beginAtZero: true,
        },
      },
      plugins: {
        title: {
          display: true,
          text: '各年ごとの給料',
        }
      },
    },
  })
}


const getYearsIncomeDataFetchData = async(): Promise<void> => {
  const queryList: string[] = []
  // 表示データの初期化
  chartData.value.splice(0)
  queryList.push("user_id=" + props.userId)
  const fullPrames: string = "?" + queryList.join('&')
  try {
    const response = await ApiEndpoint.getYearsIncomeDate(fullPrames)
    const dataList = response.data.result // レスポンスからデータを取得

    for (const dataItem of dataList) {
      chartData.value.push({
        years: dataItem.Years,
        total_amount: dataItem.TotalAmount,
        deduction_amount: dataItem.DeductionAmount,
        take_home_amount: dataItem.TakeHomeAmount,
      })
    }

  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

// ページ読み込み
onMounted(async() => {
  await getYearsIncomeDataFetchData()
  createChart()
})
  
</script>

<script lang="ts">
export default {}
</script>