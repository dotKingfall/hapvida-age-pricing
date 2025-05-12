import { useGlobalConfigStore } from '@/stores/globalConfig'
import { useAppStore } from '@/stores/app'
import { useAgeOperationsStore } from '@/stores/ageOperations'

export const brlFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

export const ageFormatter = (
  value: number | null,
  age: number,
  range: string
): string => {
  const globalConfig = useGlobalConfigStore()
  const price = value === null ? 'N/A' : brlFormatter.format(value)

  let label: string
  if (globalConfig.showRange) {
    label = age >= 59 ? `${range}` : `De ${range}`
  } else {
    label = age === 1 ? `${age} ano` : `${age} anos`
  }

  const template = globalConfig.customOutputTemplates.ageFormatter
  return template
    .replace('{label}', label)
    .replace('{price}', price)
}

// Format totals for a given field (enf, amb, apt) across all ages
export const totalsFormatter = (
  data: { age: number; range: string; tier: { enf: number | null; amb: number | null; apt: number | null } }[],
  field: 'enf' | 'amb' | 'apt'
): string => {
  const globalConfig = useGlobalConfigStore()
  const appStore = useAppStore()
  const ageOperation = useAgeOperationsStore()

  const spi = appStore.selectedPlanIndex
  const bd = globalConfig.baseDiscount
  const dv = globalConfig.discountValue
  const dd = globalConfig.discountDuration
  const ai = ageOperation.ageInput
  const templates = globalConfig.customOutputTemplates.totalsFormatter

  if (ai.length < 2 && dv === 0) {
    return ''
  }

  const fullValues = data
    .map((item) => item.tier[field])
    .filter((value): value is number => value !== null)
  const fullTotal = fullValues.reduce((sum, value) => sum + value, 0)
  const totals1 = templates.total
    .replace('{total}', brlFormatter.format(fullTotal))
  const results: string[] = [totals1]

  if (dv === 0) {
    if ([1, 2, 3].includes(spi)) {
      const discountFactor = 1 - bd / 100
      const discountedTotal = fullValues
        .map((value) => value * discountFactor)
        .reduce((sum, value) => sum + value, 0)
      const totals2 = templates.discount
        .replace('{discountedTotal}', brlFormatter.format(discountedTotal))
        .replace('{discount}', bd.toString())
      results.push(totals2)
    }
  } else {
    const discountFactor = 1 - dv / 100
    const discountedTotal = fullValues
      .map((value) => value * discountFactor)
      .reduce((sum, value) => sum + value, 0)
    const totals2 = templates.discount
      .replace('{discountedTotal}', brlFormatter.format(discountedTotal))
      .replace('{discount}', dv.toString())
    results.push(totals2)

    if ([1, 2, 3].includes(spi)) {
      const bdDiscountFactor = 1 - bd / 100
      const bdDiscountedTotal = fullValues
        .map((value) => value * bdDiscountFactor)
        .reduce((sum, value) => sum + value, 0)
      const totals3 = templates.afterDiscount
        .replace('{discountedTotal}', brlFormatter.format(bdDiscountedTotal))
        .replace('{discount}', bd.toString())
        .replace('{duration}', dd.toString())
      if (ai.length >= 2) {
        results.push(totals3)
      }
    } else {
      const noDiscountMessage = templates.noDiscount
        .replace('{duration}', dd.toString())
      results.push(noDiscountMessage)
    }
  }

  return results.join('\n')
}