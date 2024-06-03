import axios from 'axios'
import ApiEndpoint from '../../src/common/apiEndpoint'
import apiClient from '../../src/common/httpCommon'
import MockAdapter from 'axios-mock-adapter'

const success = 200
const notFound = 400
const InternalServerError = 500

const NotFoundMsg = 'Not Found'
const InternalServerErrorMsg = 'Internal Server Error'

describe('ApiEndpoint', () => {
  let mock: MockAdapter

  beforeEach(() => {
    mock = new MockAdapter(apiClient)
  })

  afterEach(() => {
    mock.restore()
  })

  it('getPriceManagement makes the correct HTTP request', async () => {
    const params = '?user_id=1'
    const responseData = {     
        "message": {
            "result": {
                "left_amount": 132000,
                "total_amount": 2584000
            }
        } 
    }
    mock.onGet(`/api/price/${params}`).reply(success, responseData)

    const result = await ApiEndpoint.getPriceManagement(params)

    expect(result.data).toEqual(responseData)
  })

  it('getPriceManagement handles 404 error', async () => {
    const params = '?user_id=1'
    mock.onGet(`/api/price/${params}`).reply(notFound, { message: NotFoundMsg })

    try {
        await ApiEndpoint.getPriceManagement(params)
      } catch (error) {
        if (axios.isAxiosError(error)) {
          expect(error.response?.status).toBe(notFound)
          expect(error.response?.data).toEqual({ message: NotFoundMsg })
        } else {
          throw error // 予期しないエラーの場合は再スローする
        }
      }
  })

  it('getPriceManagement handles 500 error', async () => {
    const params = '?user_id=1'
    mock.onGet(`/api/price/${params}`).reply(InternalServerError, { message: InternalServerErrorMsg })

    try {
      await ApiEndpoint.getPriceManagement(params)
    } catch (error) {
        if (axios.isAxiosError(error)) {
            expect(error.response?.status).toBe(InternalServerError)
            expect(error.response?.data).toEqual({ message: InternalServerErrorMsg })
        } else {
            throw error // 予期しないエラーの場合は再スローする
        }
    }
  })

  it('getIncomeData makes the correct HTTP request', async () => {
    const params = '?start_date=2022-01-25&end_date=2024-01-10&user_id=1"'
    const responseData = { 
        "result": [
            {
                "IncomeForecastID": "f70c1d6a-80eb-480a-aba9-d03fc7d2b004",
                "PaymentDate": "2024-01-10T00:00:00Z",
                "Age": "29",
                "Industry": "システム開発",
                "TotalAmount": 303000,
                "DeductionAmount": 91550,
                "TakeHomeAmount": 211450,
                "Classification": "給料",
                "UserID": 1
            },
            {
                "IncomeForecastID": "18fbb86b-b18a-43f1-9eb4-2522c176d900",
                "PaymentDate": "2023-12-08T00:00:00Z",
                "Age": "29",
                "Industry": "システム開発",
                "TotalAmount": 303000,
                "DeductionAmount": 104180,
                "TakeHomeAmount": 198820,
                "Classification": "給料",
                "UserID": 1
            },
            {
                "IncomeForecastID": "42abf540-840e-4ec4-36cd-86cea686ce0a",
                "PaymentDate": "2023-11-10T00:00:00Z",
                "Age": "29",
                "Industry": "システム開発",
                "TotalAmount": 316600,
                "DeductionAmount": 103000,
                "TakeHomeAmount": 213600,
                "Classification": "給料",
                "UserID": 1
            }
        ]
    }
    mock.onGet(`/api/income_data/${params}`).reply(success, responseData)

    const result = await ApiEndpoint.getIncomeData(params)

    expect(result.data).toEqual(responseData)
  })

  it('getIncomeData handles 404 error', async () => {
    const params = '?start_date=2022-01-25&end_date=2024-01-10&user_id=1"'
    mock.onGet(`/api/income_data/${params}`).reply(notFound, { message: NotFoundMsg })

    try {
        await ApiEndpoint.getIncomeData(params)
      } catch (error) {
        if (axios.isAxiosError(error)) {
          expect(error.response?.status).toBe(notFound)
          expect(error.response?.data).toEqual({ message: NotFoundMsg })
        } else {
          throw error // 予期しないエラーの場合は再スローする
        }
      }
  })

  it('getIncomeData handles 500 error', async () => {
    const params = '?start_date=2022-01-25&end_date=2024-01-10&user_id=1"'
    mock.onGet(`/api/income_data/${params}`).reply(InternalServerError, { message: InternalServerErrorMsg })

    try {
      await ApiEndpoint.getIncomeData(params)
    } catch (error) {
        if (axios.isAxiosError(error)) {
            expect(error.response?.status).toBe(InternalServerError)
            expect(error.response?.data).toEqual({ message: InternalServerErrorMsg })
        } else {
            throw error // 予期しないエラーの場合は再スローする
        }
    }
  })

  it('getRangeDate makes the correct HTTP request', async () => {
    const params = '?user_id=1'
    const responseData = {     
        "result": [
            {
                "UserID": 1,
                "StratPaymaentDate": "2018-04-27",
                "EndPaymaentDate": "2024-01-10"
            }
        ] 
    }
    mock.onGet(`/api/range_date/${params}`).reply(success, responseData)

    const result = await ApiEndpoint.getRangeDate(params)

    expect(result.data).toEqual(responseData)
  })

  it('getRangeDate handles 404 error', async () => {
    const params = '?user_id=1'
    mock.onGet(`/api/range_date/${params}`).reply(notFound, { message: NotFoundMsg })

    try {
        await ApiEndpoint.getRangeDate(params)
      } catch (error) {
        if (axios.isAxiosError(error)) {
          expect(error.response?.status).toBe(notFound)
          expect(error.response?.data).toEqual({ message: NotFoundMsg })
        } else {
          throw error // 予期しないエラーの場合は再スローする
        }
      }
  })

  it('getRangeDate handles 500 error', async () => {
    const params = '?user_id=1'
    mock.onGet(`/api/range_date/${params}`).reply(InternalServerError, { message: InternalServerErrorMsg })

    try {
      await ApiEndpoint.getRangeDate(params)
    } catch (error) {
        if (axios.isAxiosError(error)) {
            expect(error.response?.status).toBe(InternalServerError)
            expect(error.response?.data).toEqual({ message: InternalServerErrorMsg })
        } else {
            throw error // 予期しないエラーの場合は再スローする
        }
    }
  })

  it('getYearsIncomeDate makes the correct HTTP request', async () => {
    const params = '?user_id=1'
    const responseData = {     
        "result": [
            {
                "Years": "2018",
                "TotalAmount": 2904246,
                "DeductionAmount": 450036,
                "TakeHomeAmount": 2454210
            },
            {
                "Years": "2019",
                "TotalAmount": 3860427,
                "DeductionAmount": 1292915,
                "TakeHomeAmount": 2567512
            },
            {
                "Years": "2020",
                "TotalAmount": 3766809,
                "DeductionAmount": 1368465,
                "TakeHomeAmount": 2398344
            },
        ]
    }
    mock.onGet(`/api/years_income_date/${params}`).reply(success, responseData)

    const result = await ApiEndpoint.getYearsIncomeDate(params)

    expect(result.data).toEqual(responseData)
  })

  it('getYearsIncomeDate handles 404 error', async () => {
    const params = '?user_id=1'
    mock.onGet(`/api/years_income_date/${params}`).reply(notFound, { message: NotFoundMsg })

    try {
        await ApiEndpoint.getYearsIncomeDate(params)
      } catch (error) {
        if (axios.isAxiosError(error)) {
          expect(error.response?.status).toBe(notFound)
          expect(error.response?.data).toEqual({ message: NotFoundMsg })
        } else {
          throw error // 予期しないエラーの場合は再スローする
        }
      }
  })

  it('getYearsIncomeDate handles 500 error', async () => {
    const params = '?user_id=1'
    mock.onGet(`/api/years_income_date/${params}`).reply(InternalServerError, { message: InternalServerErrorMsg })

    try {
      await ApiEndpoint.getYearsIncomeDate(params)
    } catch (error) {
        if (axios.isAxiosError(error)) {
            expect(error.response?.status).toBe(InternalServerError)
            expect(error.response?.data).toEqual({ message: InternalServerErrorMsg })
        } else {
            throw error // 予期しないエラーの場合は再スローする
        }
    }
  })

  it('incomeCreate makes the correct HTTP POST request', async () => {
    const postData = {     
        "data": [
            {
                "payment_date": "2024-02-10",
                "age": "30",
                "industry": "test開発",
                "total_amount": "320524",
                "deduction_amount": "93480",
                "take_home_amount": "227044",
                "update_user": "tsuzuki",
                "classification": "給料",
                "user_id": "1"
            },
            {
                "payment_date": "2024-03-10",
                "age": "30",
                "industry": "test開発",
                "total_amount": "320524",
                "deduction_amount": "93480",
                "take_home_amount": "227044",
                "update_user": "tsuzuki",
                "classification": "給料",
                "user_id": "1"
            }
        ] 
    } 
    const responseData = {"message": "新規給料情報を登録致しました。"}
    mock.onPost('/api/income_create/', postData).reply(success, responseData)

    const result = await ApiEndpoint.incomeCreate(postData)

    expect(result.data).toEqual(responseData)
  })

  it('incomeCreate handles 500 error', async () => {
    const postData = {     
        "data": [
            {
                "payment_date": "2024-02-10",
                "age": "30",
                "industry": "test開発",
                "total_amount": "320524",
                "deduction_amount": "93480",
                "take_home_amount": "227044",
                "update_user": "tsuzuki",
                "classification": "給料",
                "user_id": "1"
            },
            {
                "payment_date": "2024-03-10",
                "age": "30",
                "industry": "test開発",
                "total_amount": "320524",
                "deduction_amount": "93480",
                "take_home_amount": "227044",
                "update_user": "tsuzuki",
                "classification": "給料",
                "user_id": "1"
            }
        ] 
    } 
    mock.onPost('/api/income_create/', postData).reply(InternalServerError, { message: InternalServerErrorMsg })

    try {
      await ApiEndpoint.incomeCreate(postData)
    } catch (error) {
        if (axios.isAxiosError(error)) {
            expect(error.response?.status).toBe(InternalServerError)
            expect(error.response?.data).toEqual({ message: InternalServerErrorMsg })
        } else {
            throw error // 予期しないエラーの場合は再スローする
        }
    }
  })

  it('incomeUpdate makes the correct HTTP POST request', async () => {
    const putData = {     
        "data": [
            {
                "income_forecast_id": "7b941edb-b7a2-e1e7-6466-ce53d1c8bcff",
                "payment_date": "2024-07-10",
                "age": "39",
                "industry": "test開発hoge",
                "total_amount": "350524",
                "deduction_amount": "93480",
                "take_home_amount": "257044",
                "classification": "給料",
                "user_update": "test_dev"
            },
            {
                "income_forecast_id": "af16418d-85d2-7945-bef8-bc50d3adbf82",
                "payment_date": "2024-08-10",
                "age": "38",
                "industry": "test開発",
                "total_amount": "330524",
                "deduction_amount": "94480",
                "take_home_amount": "227044",
                "classification": "給料fuga",
                "user_update": "test_dev"
            },
            {
                "income_forecast_id": "2c33ff50-d48a-094b-cc6a-bafa618dd96d",
                "payment_date": "2024-09-10",
                "age": "38",
                "industry": "test開発piyo",
                "total_amount": "380524",
                "deduction_amount": "93480",
                "take_home_amount": "287044",
                "classification": "給料test",
                "user_update": "test_dev"
            }
        ]
    } 
    const responseData = {"message": "給料情報の更新が問題なく成功しました。"}
    mock.onPut('/api/income_update/', putData).reply(success, responseData)

    const result = await ApiEndpoint.incomeUpdate(putData)

    expect(result.data).toEqual(responseData)
  })

  it('incomeUpdate handles 500 error', async () => {
    const putData = {     
        "data": [
            {
                "income_forecast_id": "7b941edb-b7a2-e1e7-6466-ce53d1c8bcff",
                "payment_date": "2024-07-10",
                "age": "39",
                "industry": "test開発hoge",
                "total_amount": "350524",
                "deduction_amount": "93480",
                "take_home_amount": "257044",
                "classification": "給料",
                "user_update": "test_dev"
            },
            {
                "income_forecast_id": "af16418d-85d2-7945-bef8-bc50d3adbf82",
                "payment_date": "2024-08-10",
                "age": "38",
                "industry": "test開発",
                "total_amount": "330524",
                "deduction_amount": "94480",
                "take_home_amount": "227044",
                "classification": "給料fuga",
                "user_update": "test_dev"
            },
        ] 
    } 
    mock.onPut('/api/income_update/', putData).reply(InternalServerError, { message: InternalServerErrorMsg })

    try {
      await ApiEndpoint.incomeUpdate(putData)
    } catch (error) {
        if (axios.isAxiosError(error)) {
            expect(error.response?.status).toBe(InternalServerError)
            expect(error.response?.data).toEqual({ message: InternalServerErrorMsg })
        } else {
            throw error // 予期しないエラーの場合は再スローする
        }
    }
  })

  it('incomeDelete makes the correct HTTP POST request', async () => {
    const id = {     
        "data": [
            {
                "income_forecast_id": "ecd2bc0c-ca5c-465e-ad6f-7fe33b89a672"
            },
            {
                "income_forecast_id": "f73548e8-c16f-45d7-b585-c940fb9b24c5"
            },
            {
                "income_forecast_id": "a547c1a1-6a5a-4505-80f8-5bbf87810b57"
            }
        ]
    } 
    const responseData = {"message": "給料情報の削除が問題なく成功しました。"}
    mock.onDelete(`/api/income_delete/?income_forecast_id=${id}`).reply(success, responseData)

    const result = await ApiEndpoint.incomeDelete(id)

    expect(result.data).toEqual(responseData)
  })

  it('incomeDelete handles 500 error', async () => {
    const id = {     
        "data": [
            {
                "income_forecast_id": "ecd2bc0c-ca5c-465e-ad6f-7fe33b89a672"
            }
        ]
    } 
    mock.onDelete(`/api/income_delete/?income_forecast_id=${id}`).reply(InternalServerError, { message: InternalServerErrorMsg })

    try {
        await ApiEndpoint.incomeDelete(id)
    } catch (error) {
        if (axios.isAxiosError(error)) {
            expect(error.response?.status).toBe(InternalServerError)
            expect(error.response?.data).toEqual({ message: InternalServerErrorMsg })
        } else {
            throw error // 予期しないエラーの場合は再スローする
        }
    }
  })
})
