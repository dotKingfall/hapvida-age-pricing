import { defineStore } from 'pinia'
import Papa from 'papaparse'
import { loadFileData } from '@/utils/fileLoader'
import * as labels from '@/labels'
import { Plan, Tier } from '@/types/planTypes'

// Interface for CSV file configuration
interface CsvFileConfig {
  name: string
  stateKey: string
  planName: string
  type: 'p' | 't' | 'both'
}

// Interface for grouped plan data
interface PlanGroup {
  stateKeys: string[]
  parsedDataP?: any[]
  parsedDataT?: any[]
}

export const useAppStore = defineStore('app', {
  state: () => ({
    isLoading: false,
    parsedData: [] as any[], // Stores raw parsed CSV data for each file
    spPlans: [] as Plan[], // Stores the 6 created Plan objects
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
    selectedPlan: null as Plan | null,
    selectedPlanIndex: 1 as number,
  }),

  actions: {
    // Parses a CSV file content into an array of objects
    async parseCsvFile(fileContent: string): Promise<any[]> {
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

    // Loads and parses all CSV files, creating Plans and assigning to state
    async loadAndParseAllCsvFiles() {
      this.isLoading = true
      const csvFiles: CsvFileConfig[] = [
        { name: 'notre_par.csv', stateKey: 'notreParData', planName: labels.plan_names[0], type: 'p' },
        { name: 'notre_tot.csv', stateKey: 'notreTotData', planName: labels.plan_names[0], type: 't' },
        { name: 'notre50_par.csv', stateKey: 'notre50ParData', planName: labels.plan_names[1], type: 'p' },
        { name: 'notre50_tot.csv', stateKey: 'notre50TotData', planName: labels.plan_names[1], type: 't' },
        { name: 'nosso_med_ind.csv', stateKey: 'nossoMedIndData', planName: labels.plan_names[2], type: 'both' },
        { name: 'nosso_med_col.csv', stateKey: 'nossoMedColData', planName: labels.plan_names[3], type: 'both' },
        { name: 'smart_ind.csv', stateKey: 'smartIndData', planName: labels.plan_names[4], type: 'p' },
        { name: 'smart_col.csv', stateKey: 'smartColData', planName: labels.plan_names[4], type: 't' },
        { name: 'smart_up_ind.csv', stateKey: 'smartUpIndData', planName: labels.plan_names[5], type: 'p' },
        { name: 'smart_up_col.csv', stateKey: 'smartUpColData', planName: labels.plan_names[5], type: 't' },
      ]

      try {
        const parsedFiles = await this.loadFiles(csvFiles)
        this.spPlans = this.createPlans(parsedFiles)
        this.assignPlansToState(parsedFiles)
        this.selectedPlan = this.spPlans[0]
      } catch (error) {
        console.error('Error loading and parsing CSV files:', error)
      } finally {
        this.isLoading = false
      }
    },

    // Loads and parses all CSV files
    async loadFiles(csvFiles: CsvFileConfig[]): Promise<{ stateKey: string; planName: string; type: 'p' | 't' | 'both'; parsedData: any[] }[]> {
      const loadPromises = csvFiles.map(async ({ name, stateKey, planName, type }) => {
        const fileContent = await loadFileData(name)
        const parsedData = await this.parseCsvFile(fileContent)
        return { stateKey, planName, type, parsedData }
      })
      return Promise.all(loadPromises)
    },

    // Groups parsed data by planName and creates Plan objects
    createPlans(parsedFiles: { stateKey: string; planName: string; type: 'p' | 't' | 'both'; parsedData: any[] }[]): Plan[] {
      const plansByName: { [key: string]: PlanGroup } = {}

      // Group parsed data
      parsedFiles.forEach(({ stateKey, planName, type, parsedData }) => {
        this.parsedData.push(parsedData) // Store raw parsed data
        if (!plansByName[planName]) {
          plansByName[planName] = { stateKeys: [] }
        }
        plansByName[planName].stateKeys.push(stateKey)
        if (type === 'p') {
          plansByName[planName].parsedDataP = parsedData
        } else if (type === 't') {
          plansByName[planName].parsedDataT = parsedData
        } else if (type === 'both') {// Use same data for _p and _t
          plansByName[planName].parsedDataP = parsedData
          plansByName[planName].parsedDataT = parsedData 
        }
      })

      // Create Plans
      return Object.keys(plansByName).map((planName, index) => {
        const { parsedDataP, parsedDataT } = plansByName[planName]
        const tiers = this.convertToTiers(parsedDataP || [], parsedDataT || [], planName)
        const plan = new Plan(index + 1, planName, tiers)
        return plan
      })
    },

    // Assigns Plans to their respective state properties
    assignPlansToState(parsedFiles: { stateKey: string; planName: string; type: 'p' | 't' | 'both'; parsedData: any[] }[]) {
      const plansByName: { [key: string]: PlanGroup } = {}
      const plans: { [key: string]: Plan } = {}

      // Group state keys and store plans
      this.spPlans.forEach((plan) => {
        const planName = plan.getName()
        plans[planName] = plan //TODO FIX LATER
        parsedFiles
          .filter((file) => file.planName === planName)
          .forEach((file) => {
            if (!plansByName[planName]) {
              plansByName[planName] = { stateKeys: [] }
            }
            plansByName[planName].stateKeys.push(file.stateKey)
          })
      })

      // Assign Plans to state
      Object.keys(plansByName).forEach((planName) => {
        const { stateKeys } = plansByName[planName]
        stateKeys.forEach((stateKey) => {
          this[stateKey] = plans[planName] //TODO FIX LATER
        })
      })
    },

    // Converts parsed CSV data to Tier[], handling four values for Smart plans
    convertToTiers(parsedDataP: any[], parsedDataT: any[], planName: string): Tier[] {
      // Collect unique ranges dynamically
      const ranges = Array.from(
        new Set([
          ...parsedDataP.map((row: any) => row.range).filter(Boolean),
          ...parsedDataT.map((row: any) => row.range).filter(Boolean),
        ])
      ).sort((a, b) => a - b)

      // Create maps for partial and total data by range
      const pMap: { [range: number]: any } = {}
      const tMap: { [range: number]: any } = {}

      // Populate partial data map (_p or single-person data)
      parsedDataP.forEach((row: any) => {
        if (row.range) {
          pMap[row.range] = row
        }
      })

      // Populate total data map (_t or multi-person data)
      parsedDataT.forEach((row: any) => {
        if (row.range) {
          tMap[row.range] = row
        }
      })

      // Create Tiers for each range
      return ranges.map((range) => {
        const pRow = pMap[range] || {}
        const tRow = tMap[range] || {}

        // For Smart and Smart Up plans, use four values
        if (planName === labels.plan_names[4] || planName === labels.plan_names[5]) {
          return new Tier(
            range,
            [
              pRow.enf_p || null, // Single-person partial
              pRow.enf_t || null, // Single-person total
              tRow.enf_p || null, // Multi-person partial
              tRow.enf_t || null, // Multi-person total
            ],
            [
              null, // Single-person amb not provided
              null, // Single-person amb not provided
              tRow.amb_p || null, // Multi-person partial
              tRow.amb_t || null, // Multi-person total
            ],
            [
              null, // Single-person apt not provided
              null, // Single-person apt not provided
              tRow.apt_p || null, // Multi-person partial
              tRow.apt_t || null, // Multi-person total
            ]
          )
        }

        // For other plans, use two values
        return new Tier(
          range,
          [pRow.enf_p || null, tRow.enf_t || null],
          [pRow.amb_p || null, tRow.amb_t || null],
          [pRow.apt_p || null, tRow.apt_t || null]
        )
      })
    },
  },
})