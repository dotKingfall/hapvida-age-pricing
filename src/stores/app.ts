import { defineStore } from 'pinia'
import Papa from 'papaparse'
import { loadFileData } from '@/utils/fileLoader'
import * as labels from '@/labels'
import { Plan, Tier } from '@/types/planTypes'

export const useAppStore = defineStore('app', {
  state: () => ({
    isLoading: false,
    notreParData: null as Plan | null,
    notreTotData: null as Plan | null,
    notre50ParData: null as Plan | null,
    notre50TotData: null as Plan | null,
    nossoMedIndData: null as Plan | null,
    nossoMedColData: null as Plan | null,
    smartIndData: null as Plan | null,
    smartColData: null as Plan | null,
    smartUpIndData: null as Plan | null,
    smartUpColData: null as Plan | null,
    selectedPlans: [] as (Plan | null)[],
    selectedPlanIndex: 1 as number,
  }),

  actions: {
    async parseCsvFile(fileContent: string) {
      try {
        const results = Papa.parse(fileContent, {
          header: true,
          skipEmptyLines: true,
          dynamicTyping: true,
          transform: (value) => value.trim(),
        })
        return results.data
      } catch (error) {
        console.error('Error parsing CSV:', error)
        throw error
      }
    },

    createPlanFromData(data: any[], planId: number, planName: string): Plan {
      const tiers = data.map(row => {
        const enf = [
          row.enf_p !== undefined ? row.enf_p : null,
          row.enf_t !== undefined ? row.enf_t : null,
        ]
        const amb = [
          row.amb_p !== undefined ? row.amb_p : null,
          row.amb_t !== undefined ? row.amb_t : null,
        ]
        const apt = [
          row.apt_p !== undefined ? row.apt_p : null,
          row.apt_t !== undefined ? row.apt_t : null,
        ]
        return new Tier(row.range, enf, amb, apt)
      })
      return new Plan(planId, planName, tiers)
    },

    async loadAllPriceTables() {
      this.isLoading = true
      try {
        const files = [
          { name: 'notre_par.csv', stateKey: 'notreParData', planName: labels.plan_names[0], planId: 1 },
          { name: 'notre_tot.csv', stateKey: 'notreTotData', planName: labels.plan_names[0], planId: 2 },
          { name: 'notre50_par.csv', stateKey: 'notre50ParData', planName: labels.plan_names[1], planId: 3 },
          { name: 'notre50_tot.csv', stateKey: 'notre50TotData', planName: labels.plan_names[1], planId: 4 },
          { name: 'nosso_med_ind.csv', stateKey: 'nossoMedIndData', planName: labels.plan_names[2], planId: 5 },
          { name: 'nosso_med_col.csv', stateKey: 'nossoMedColData', planName: labels.plan_names[3], planId: 6 },
          { name: 'smart_col.csv', stateKey: 'smartColData', planName: labels.plan_names[4], planId: 8 },
          { name: 'smart_ind.csv', stateKey: 'smartIndData', planName: labels.plan_names[4], planId: 9 },
          { name: 'smart_up_ind.csv', stateKey: 'smartUpIndData', planName: labels.plan_names[5], planId: 10 },
          { name: 'smart_up_col.csv', stateKey: 'smartUpColData', planName: labels.plan_names[5], planId: 11 },
        ]

        for (const file of files) {
          const content = await loadFileData(file.name)
          const data = await this.parseCsvFile(content)
          const plan = this.createPlanFromData(data, file.planId, file.planName)
          switch (file.stateKey) {
            case 'notre50ParData':
              this.notre50ParData = plan
              break
            case 'smartColData':
              this.smartColData = plan
              break
            case 'smartUpIndData':
              this.smartUpIndData = plan
              break
            case 'notreParData':
              this.notreParData = plan
              break
            case 'smartIndData':
              this.smartIndData = plan
              break
            case 'smartUpColData':
              this.smartUpColData = plan
              break
            case 'notre50TotData':
              this.notre50TotData = plan
              break
            case 'nossoMedIndData':
              this.nossoMedIndData = plan
              break
            case 'nossoMedColData':
              this.nossoMedColData = plan
              break
            case 'notreTotData':
              this.notreTotData = plan
              break
          }
        }

        this.selectedPlans = this.getGroup(this.selectedPlanIndex)
      } catch (error) {
        console.error('Error loading CSV files:', error)
      } finally {
        this.isLoading = false
      }
    },

    getGroup(groupId: number) {
      let plans
      switch (groupId) {
        case 1:
          plans = [this.notreParData, this.notreTotData]
          break
        case 2:
          plans = [this.notre50ParData, this.notre50TotData]
          break
        case 3:
          plans = [this.nossoMedIndData]
          break
        case 4:
          plans = [this.nossoMedColData]
          break
        case 5:
          plans = [this.smartIndData, this.smartColData]
          break
        case 6:
          plans = [this.smartUpIndData, this.smartUpColData]
          break
        default:
          plans = [null]
      }

      this.selectedPlans = plans
      this.selectedPlanIndex = groupId
      return plans
    },
  },
})