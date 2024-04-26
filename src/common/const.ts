// 貯金額計算固定値
enum PriceManagementConst {
  SavingsPeriod = '貯蓄期間',
  MoneyReceived = '手取の月収',
  Bouns = 'ボーナス(1年の合計)',
  FixedCost = '固定費(家賃、光熱費、通信費、サブスクリプション、積み立て投資などなど・・・)',
  Loan = 'ローン(教育、車)',
  Privates = 'プライベート(月に自身が自由に使える)',
  Insurance = '保険(生命保険、任意保険など)'
}


// エラー定数
enum ErrorConst {
  InterServerError = 'サーバーエラー',
  ErrorMessage = 'サーバーダウン。もしくは、サーバー側で何か不具合が発生しました。'
}

// Type定数
enum Type {
  Date = 'Date',
  Number = 'number',
  Submit = 'submit',
  Success = 'success',
  Error = 'error'
}

export { PriceManagementConst, ErrorConst, Type};