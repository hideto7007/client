import Vaildation from '../../src/common/vaildation'

describe('Vaildation.dateValid method', () => {

  it('return true check 1', () => {
    const date1: Date = new Date("2024-01-05")

    expect(Vaildation.dateValid(date1)).toBe(true)
  })

  it('return true check 2', () => {
    const date2: Date = new Date("2024/1/5")

    expect(Vaildation.dateValid(date2)).toBe(true)
  })

  it('return true check 3', () => {
    const date3: Date = new Date(1705579166)

    expect(Vaildation.dateValid(date3)).toBe(true)
  })

  it('return "必須入力項目です" check 1', () => {
    const date1: Date = new Date("")

    expect(Vaildation.dateValid(date1)).toBe('必須入力項目です')
  })

  it('return "必須入力項目です" check 2', () => {
    const date2: Date = new Date("hoge")

    expect(Vaildation.dateValid(date2)).toBe('必須入力項目です')
  })

  it('return "必須入力項目です" check 3', () => {
    const date3: Date = new Date("fuga")

    expect(Vaildation.dateValid(date3)).toBe('必須入力項目です')
  })
  it('return "必須入力項目です" check 4', () => {
    const date4: Date = new Date("2024年1月5日")

    expect(Vaildation.dateValid(date4)).toBe('必須入力項目です')
  })
})

describe('Vaildation.ageValid method', () => {
  it('return true check 1', () => {
    const data1: string = "16"

    expect(Vaildation.ageValid(data1)).toBe(true)
  })

  it('return true check 2', () => {
    const data2: string = "17"

    expect(Vaildation.ageValid(data2)).toBe(true)
  })

  it('return true check 3', () => {
    const data3: string = "200"

    expect(Vaildation.ageValid(data3)).toBe(true)
  })

  it('return 必須入力項目です check 1', () => {
    const data1: string = ""

    expect(Vaildation.ageValid(data1)).toBe('必須入力項目です')
  })

  it('return 整数の値のみで入力して下さい check 1', () => {
    const data1: string = "hoge"

    expect(Vaildation.ageValid(data1)).toBe('整数の値のみで入力して下さい')
  })

  it('return 整数の値のみで入力して下さい check 2', () => {
    const data2: string = "fuga"

    expect(Vaildation.ageValid(data2)).toBe('整数の値のみで入力して下さい')
  })

  it('return 整数の値のみで入力して下さい check 3', () => {
    const data3: string = "1.23"

    expect(Vaildation.ageValid(data3)).toBe('整数の値のみで入力して下さい')
  })

  it('return 整数の値のみで入力して下さい check 5', () => {
    const data5: string = "hoge123fuga"

    expect(Vaildation.ageValid(data5)).toBe('整数の値のみで入力して下さい')
  })

  it('return 整数の値のみで入力して下さい check 6', () => {
    const data6: string = "12."

    expect(Vaildation.ageValid(data6)).toBe('整数の値のみで入力して下さい')
  })

  it('return 整数の値のみで入力して下さい check 7', () => {
    const data7: string = "12.0"

    expect(Vaildation.ageValid(data7)).toBe('整数の値のみで入力して下さい')
  })

  it('return 整数の値のみで入力して下さい check 8', () => {
    const data8: string = "-10"

    expect(Vaildation.ageValid(data8)).toBe('整数の値のみで入力して下さい')
  })

  it('return 15歳未満は入力出来ません check 1', () => {
    const data1: string = "0"

    expect(Vaildation.ageValid(data1)).toBe('15歳未満は入力出来ません')
  })

  it('return 15歳未満は入力出来ません check 3', () => {
    const data3: string = "15"

    expect(Vaildation.ageValid(data3)).toBe('15歳未満は入力出来ません')
  })

})

describe('Vaildation.industryValid method', () => {
  it('return 必須入力項目です check 1', () => {
    const data1: string = ""

    expect(Vaildation.industryValid(data1)).toBe('必須入力項目です')
  })

  it('return 文字数が100文字オーバーです check 1', () => {
    const data1: string = "a".repeat(100);

    expect(Vaildation.industryValid(data1)).toBe('文字数が100文字オーバーです')
  })

  it('return true check 1', () => {
    const data1: string = "a".repeat(99);

    expect(Vaildation.industryValid(data1)).toBe(true)
  })
})

describe('Vaildation.incomeAmountValid method', () => {
  it('return 必須入力項目です check 1', () => {
    const data1: string = ""

    expect(Vaildation.incomeAmountValid(data1)).toBe('必須入力項目です')
  })

  it('return 整数の値のみで入力して下さい check 1', () => {
    const data1: string = "100."

    expect(Vaildation.incomeAmountValid(data1)).toBe('整数の値のみで入力して下さい')
  })

  it('return 整数の値のみで入力して下さい check 2', () => {
    const data2: string = "100.0"

    expect(Vaildation.incomeAmountValid(data2)).toBe('整数の値のみで入力して下さい')
  })

  it('return 整数の値のみで入力して下さい check 3', () => {
    const data3: string = "fuga"

    expect(Vaildation.incomeAmountValid(data3)).toBe('整数の値のみで入力して下さい')
  })

  it('return 整数の値のみで入力して下さい check 4', () => {
    const data4: string = "1.23"

    expect(Vaildation.incomeAmountValid(data4)).toBe('整数の値のみで入力して下さい')
  })

  it('return 整数の値のみで入力して下さい check 5', () => {
    const data5: string = "hoge123fuga"

    expect(Vaildation.incomeAmountValid(data5)).toBe('整数の値のみで入力して下さい')
  })

  it('return true check 1', () => {
    const data1: string = "100"

    expect(Vaildation.incomeAmountValid(data1)).toBe(true)
  })
})

describe('Vaildation.classificationValid method', () => {
  it('return 必須入力項目です check 1', () => {
    const data1: string = ""

    expect(Vaildation.classificationValid(data1)).toBe('必須入力項目です')
  })

  it('return リストの中からお選びください check" 1', () => {
    const data1: string = "fuga"

    expect(Vaildation.classificationValid(data1)).toBe('リストの中からお選びください')
  })

  it('return true check 1', () => {
    const data2: string = "給料"

    expect(Vaildation.classificationValid(data2)).toBe(true)
  })
})

describe('Vaildation.takeHomeAmountValid method', () => {
  it('return 総支給と差引額が逆転してます。 check" 1', () => {
    const data1: string = "-1"

    expect(Vaildation.takeHomeAmountValid(data1)).toBe('総支給と差引額が逆転してます。')
  })

  it('return true check 1', () => {
    const data2: string = "1"

    expect(Vaildation.takeHomeAmountValid(data2)).toBe(true)
  })
})