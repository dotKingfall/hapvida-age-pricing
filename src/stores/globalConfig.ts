import { defineStore } from 'pinia'

export const useGlobalConfigStore = defineStore('globalConfig', {
  state: () => {
    const defaultConfig = {
      discountValue: 0,
      baseDiscount: 7,
      showRange: false,
      discountDuration: 3,
      customOutputTemplates: {
        ageFormatter: '{label}: {price}',
        totalsFormatter: {
          total: 'Total: {total}',
          discount: 'Total com desconto: {discountedTotal} (-{discount}%)',
          afterDiscount: 'Total após {duration} meses: {discountedTotal} (-{discount}%)',
          noDiscount: 'Após {duration} meses, os valores retornarão ao normal.'
        }
      }
    }

    const savedConfig = localStorage.getItem('globalConfig')
    let config = defaultConfig
    if (savedConfig) {
      try {
        const parsedConfig = JSON.parse(savedConfig)
        config = { ...defaultConfig, ...parsedConfig }
      } catch (error) {
        console.error('Failed to parse globalConfig from localStorage:', error)
      }
    }

    return config
  },
  actions: {
    setDiscountSettings({ value, base, duration }: { value: number; base: number; duration: number }) {
      this.discountValue = value
      this.baseDiscount = base
      this.discountDuration = duration
      this.saveToLocalStorage()
    },
    toggleShowRange() {
      this.showRange = !this.showRange
      this.saveToLocalStorage()
    },
    setCustomOutputTemplates(templates: { ageFormatter?: string; totalsFormatter?: any }) {
      this.customOutputTemplates = { ...this.customOutputTemplates, ...templates }
      this.saveToLocalStorage()
    },
    saveToLocalStorage() {
      try {
        localStorage.setItem('globalConfig', JSON.stringify(this.$state))
      } catch (error) {
        console.error('Failed to save globalConfig to localStorage:', error)
      }
    }
  }
})