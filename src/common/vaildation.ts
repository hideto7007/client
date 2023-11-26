
class Validation {
    dateValid(value: Date): string | boolean {
        if (!value) {
            return '必須入力項目です'
        } else {
            return true
        }
            
    }
    ageValid(value: string): string | boolean {
        const num = Number(value)
        if (!num) {
            return '必須入力項目です'
        } else if (!Number.isInteger(num)) {
            return '整数の値のみで入力して下さい'
        } else if (num < 15) {
            return '15歳未満は入力出来ません'
        } else {
            return true
        }
    }
    industryValid(value: string): string | boolean {
        if (!value) {
            return '必須入力項目です'
        } else if (value.length > 100) {
            return '文字数が100文字オーバーです'
        } else {
            return true
        }
    }
    incomeAmountValid(value: string): string | boolean {
        const num = Number(value)
        if (!num) {
            return '必須入力項目です'
        } else if (!Number.isInteger(num)) {
            return '整数の値のみで入力して下さい'
        } else {
            return true
        } 
    }
    classificationValid(value: string): string | boolean {
        if (!value) {
            return '必須入力項目です'
        } else if (value !== '給料' && value !== '賞与' && value !== '一時金' && value !== '寸志' && value !== 'その他') {
            return 'リストの中からお選びください'
        } else {
            return true
        }
            
    }

}
// value.search(/[.*]/g)
  
  export default new Validation();
  