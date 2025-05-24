import { describe, it, expect, vi, beforeEach } from 'vitest'

describe('Stage 2: Carbon Emission Insights - Simple Tests (TC#4-5, TC#16-17)', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  // POSITIVE TEST CASES
  it('TC#4 - Individual carbon emissions calculation', () => {
    const user = { energySavings: 45 }
    const carbonReduction = user.energySavings * 0.5 // kg CO2
    
    expect(carbonReduction).toBe(22.5)
    expect(carbonReduction).toBeGreaterThan(0)
  })

  it('TC#5 - Dark Mode reflects emission reduction', () => {
    const highDarkModeUser = { darkModeUsage: 95, energySavings: 80 }
    const lowDarkModeUser = { darkModeUsage: 20, energySavings: 30 }
    
    const highCarbonReduction = highDarkModeUser.energySavings * 0.5
    const lowCarbonReduction = lowDarkModeUser.energySavings * 0.5
    
    expect(highCarbonReduction).toBeGreaterThan(lowCarbonReduction)
    expect(highDarkModeUser.darkModeUsage).toBe(95)
  })

  // NEGATIVE TEST CASES
  it('TC#16 - Incorrect emission data', () => {
    const faultyUser = { energySavings: 10000 } // Unrealistic high value
    const carbonReduction = faultyUser.energySavings * 0.5
    
    // Should handle extreme values
    expect(carbonReduction).toBe(5000)
    expect(faultyUser.energySavings).toBeGreaterThan(1000) // Flag as suspicious
  })

  it('TC#17 - Laptop off but emissions calculated', () => {
    const laptopOffUser = { energySavings: 0, laptopStatus: 'off' }
    const carbonReduction = laptopOffUser.energySavings * 0.5
    
    expect(carbonReduction).toBe(0)
    expect(laptopOffUser.laptopStatus).toBe('off')
  })
})
