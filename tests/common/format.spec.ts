import Format from '../../src/common/format'

describe('Format.Date method', () => {

  it('return date to string replace 1', () => {
    const date1: Date = new Date("2024-01-05")

    expect(Format.Date(date1)).toMatch("2024-01-05")
  })

  it('return date to string replace 2', () => {
    const date2: Date = new Date("2024-01-10")

    expect(Format.Date(date2)).toMatch("2024-01-10")
  })

  it('return date to string replace 3', () => {
    const date3: Date = new Date("2024-10-01")

    expect(Format.Date(date3)).toMatch("2024-10-01")
  })

  it('return date to string replace 4', () => {
    const date4: Date = new Date("2024-10-10")

    expect(Format.Date(date4)).toMatch("2024-10-10")
  })

  it('return date to string replace 5', () => {
    const date5: string = "2024-01-05"

    expect(Format.Date(date5)).toMatch("2024-01-05")
  })

  it('return date to empty string replace 1', () => {
    const date1: string = ""

    expect(Format.Date(date1)).toMatch("")
  })

  it('return date to empty string replace 2', () => {
    const date2: string = "hoge"

    expect(Format.Date(date2)).toMatch("")
  })

  it('return date to empty string replace 3', () => {
    const date3: string = "fb210300-b334-ed35-d62e-d4e3bd899f80"

    expect(Format.Date(date3)).toMatch("")
  })

  it('return date to empty string replace 4', () => {
    const date4: string = "()*{}??)"

    expect(Format.Date(date4)).toMatch("")
  })

  it('return date to empty string replace 5', () => {
    const date5: string = "8989896879789"

    expect(Format.Date(date5)).toMatch("")
  })
})

describe('Format.dateDiffInDays method', () => {
  it('return date diff days 1', () => {
    const date1: string = "2024-01-05"
    const date2: string = "2024-01-10"

    expect(Format.dateDiffInDays(date1, date2)).toBe(5)
  })
  
  it('return date diff days 2', () => {
    const date1: string = "2024-01-05"
    const date2: string = "2024-01-10"

    expect(Format.dateDiffInDays(date2, date1)).toBe(5)
  })

  it('return date diff days 3', () => {
    const date1: string = "2024-01-05"

    expect(Format.dateDiffInDays(date1, date1)).toBe(0)
  })
 
  it('throw check 1', () => {
    const date1: string = "hyhy-gt-jj"
    const date2: string = "hyhy-jj-jj"

    expect(() => {
        Format.dateDiffInDays(date1, date2)
    }).toThrow("Invalid date string provided")
  })
 
  it('throw check 2', () => {
    const date3: string = "2jiy-3l-09"
    const date4: string = "3huy-4l-10"

    expect(() => {
        Format.dateDiffInDays(date3, date4)
    }).toThrow("Invalid date string provided")
  })
 
  it('throw check 3', () => {
    const date5: string = "2024-01-r9"
    const date6: string = "2024-01-10"

    expect(() => {
        Format.dateDiffInDays(date5, date6)
    }).toThrow("Invalid date string provided")
  })
})
