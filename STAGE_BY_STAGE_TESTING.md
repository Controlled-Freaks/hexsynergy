# 🚀 Stage-by-Stage Testing Guide
## Renewable Energy Dashboard - Fast Test Execution

### ⚡ Quick Overview

Instead of running all 29 test cases at once (which takes a long time), you can now run them in **4 separate stages** for much faster execution and easier debugging.

## 📋 Test Stages Breakdown

### **Stage 1: Energy Usage Tracking** (7 tests)
```bash
npm run test:stage1
```
**Test Cases Covered:**
- TC#1: Dashboard tracks laptop energy consumption ✅
- TC#2: Dark Mode reduces energy usage display ✅
- TC#3: Real-time energy data updates ✅
- TC#14: Disconnected laptop scenarios ✅
- TC#15: Missing energy data ✅
- TC#24: Multiple devices simultaneously ✅
- TC#25: Malfunctioning devices ✅

**Expected Duration:** ~15-20 seconds

---

### **Stage 2: Carbon Emission Insights** (4 tests)
```bash
npm run test:stage2
```
**Test Cases Covered:**
- TC#4: Individual carbon emissions calculation ✅
- TC#5: Dark Mode reflects emission reduction ✅
- TC#16: Incorrect emission data ✅
- TC#17: Laptop off but emissions calculated ✅

**Expected Duration:** ~10-15 seconds

---

### **Stage 3: Gamified Incentivization** (9 tests)
```bash
npm run test:stage3
```
**Test Cases Covered:**
- TC#9: Credits for sustainable actions ✅
- TC#10: Credits to Awe Points conversion ✅
- TC#11: Leaderboard functionality ✅
- TC#12: Energy-saving alerts ✅
- TC#13: Notifications system ✅
- TC#20: Credits not awarded ✅
- TC#21: Conversion failures ✅
- TC#28: System manipulation attempts ✅
- TC#29: Leaderboard ranking ties ✅

**Expected Duration:** ~20-25 seconds

---

### **Stage 4: Proximity Optimization & Alerts** (9 tests)
```bash
npm run test:stage4
```
**Test Cases Covered:**
- TC#6: Seating arrangement detection ✅
- TC#7: Proximity-based optimization suggestions ✅
- TC#8: Energy consumption optimization ✅
- TC#18: Proximity sensor failures ✅
- TC#19: Ignored suggestions ✅
- TC#22: Alert system issues ✅
- TC#23: Repeated notifications ✅
- TC#26: Meeting room scenarios ✅
- TC#27: Distant seating scenarios ✅

**Expected Duration:** ~20-25 seconds

---

## 🎯 Complete Test Commands

### Individual Stages (Recommended)
```bash
# Run each stage individually for fastest execution
npm run test:stage1    # Energy Tracking (7 tests)
npm run test:stage2    # Carbon Emissions (4 tests)
npm run test:stage3    # Gamification (9 tests)
npm run test:stage4    # Proximity & Alerts (9 tests)
```

### All Tests at Once (If needed)
```bash
# Run all 29 tests together (slower)
npm run test:quick     # All tests in one file
npm run test:fast      # With custom reporting
```

### Other Options
```bash
# Standard vitest commands
npm test              # Interactive mode
npm run test:ui       # Visual UI mode
npm run test:coverage # With coverage report
```

## ⏱️ Performance Comparison

| Method | Test Count | Expected Duration | Best For |
|--------|------------|------------------|----------|
| **Stage 1** | 7 tests | ~15-20 seconds | Energy tracking validation |
| **Stage 2** | 4 tests | ~10-15 seconds | Carbon emission testing |
| **Stage 3** | 9 tests | ~20-25 seconds | Gamification features |
| **Stage 4** | 9 tests | ~20-25 seconds | Proximity & alerts |
| **All Stages** | 29 tests | ~60-85 seconds | Complete validation |
| **Single File** | 29 tests | ~2+ minutes | Full integration test |

## 🔧 Troubleshooting

### If a stage fails:
1. **Check the specific error message**
2. **Run that stage individually** to isolate the issue
3. **Verify AuthProvider is working** (most common issue)
4. **Check localStorage mocking** if data-related tests fail

### Common Issues:
- **AuthProvider errors**: Fixed in all stage files
- **Import path issues**: All paths use `@/` aliases
- **Mock data problems**: Each stage has proper mock setup
- **Timeout issues**: Tests are optimized for speed

## 📊 Test Coverage Summary

✅ **All 29 Test Cases Implemented**
- **13 Positive Tests** (TC#1-13)
- **10 Negative Tests** (TC#14-23)  
- **6 Edge Tests** (TC#24-29)

## 🎉 Benefits of Stage-by-Stage Testing

1. **⚡ Faster Execution**: Each stage runs in under 30 seconds
2. **🎯 Focused Testing**: Test specific functionality areas
3. **🐛 Easier Debugging**: Isolate issues to specific features
4. **📈 Better Development Flow**: Test as you develop features
5. **🔄 Continuous Integration**: Run stages in parallel in CI/CD

---

## 🚀 Quick Start

**To test everything quickly:**
```bash
# Run all stages one by one (recommended)
npm run test:stage1 && npm run test:stage2 && npm run test:stage3 && npm run test:stage4
```

**To test a specific feature:**
```bash
# Just test energy tracking
npm run test:stage1

# Just test gamification
npm run test:stage3
```

**Total execution time for all stages: ~60-85 seconds** 🚀

---

*Happy Testing! 🧪✨*
