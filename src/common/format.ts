
class Format {
    Date(date: Date | undefined | string): string  {
        if (!date) {
            return ''
        }
        else if (typeof date === "string") {
            return date
        } else {
            const yearNum = date.getFullYear()
            const monthNum = date.getMonth() + 1
            const dateNum = date.getDate()
            if (monthNum + 1 < 10 && dateNum < 10) {
                return `${yearNum}-0${monthNum}-0${dateNum}`
            } else if (monthNum < 10) {
                return `${yearNum}-0${monthNum}-${dateNum}`
            } else if (dateNum < 10) {
                return `${yearNum}-${monthNum}-0${dateNum}`
            }
            return `${yearNum}-${monthNum}-${dateNum}`
        }
    }
    dateDiffInDays(dateStr1: string | undefined, dateStr2: string | undefined): number {

        if (!dateStr1 || !dateStr2) {
            // 親コンポーネントでundefined を事前にチェックしてるからここでは0を返すようにしている
            return 0
        }

        const date1 = new Date(dateStr1)
        const date2 = new Date(dateStr2)

        // 差をミリ秒で取得し、日数に変換
        const timeDiff = Math.abs(date2.getTime() - date1.getTime())
        const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24))
    
        return diffDays

    }
}
  
export default new Format()
  