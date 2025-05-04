import { defineStore } from 'pinia'

export const useGlobalConfigStore = defineStore('globalConfig', {
  state: () => {
    // Define default configuration
    const defaultConfig = {
      discountValue: 0,
      baseDiscount: 7,
      showRange: false,
    }

    // Load initial state from localStorage, or use defaults
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
    // Update discount settings
    setDiscountSettings({ value, base }: { value: number; base: number }) {
      this.discountValue = value
      this.baseDiscount = base
      this.saveToLocalStorage()
    },
    // Toggle showRange
    toggleShowRange() {
      this.showRange = !this.showRange
      this.saveToLocalStorage()
    },
    
    // Save state to localStorage
    saveToLocalStorage() {
      try {
        localStorage.setItem('globalConfig', JSON.stringify(this.$state))
      } catch (error) {
        console.error('Failed to save globalConfig to localStorage:', error)
      }
    },
  },
})