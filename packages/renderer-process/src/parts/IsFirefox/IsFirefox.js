export const isFirefox = () => {
  // @ts-ignore
  const userAgentData = navigator.userAgentData
  if (userAgentData) {
    for (const brand of userAgentData.brands) {
      const actualBrand = brand.brand.toLowerCase()
      if (actualBrand === 'firefox') {
        return true
      }
    }
    return false
  }
  return navigator.userAgent.toLowerCase().includes('firefox')
}
