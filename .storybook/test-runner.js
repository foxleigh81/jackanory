module.exports = {
  // Test runner configuration for Storybook
  async preVisit(page) {
    // Increase timeout for stories that contain map components
    await page.setDefaultTimeout(30000); // 30 seconds
  },
  async postVisit() {
    // Additional configuration can be added here if needed
  },
  // Override Jest timeout settings
  testTimeout: 30000, // 30 seconds
  // Configure specific stories with longer timeouts
  getHttpHeaders: async () => {
    return {};
  },
  // Browser configuration
  browsers: ['chromium'],
  // Additional test runner options
  injectAxeScript: true
};
