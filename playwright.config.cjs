const { defineConfig } = require("@playwright/test");

const projects = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE
  ? [
      {
        name: "chromium-system",
        use: {
          browserName: "chromium",
          launchOptions: {
            executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE,
            args: ["--no-sandbox", "--disable-dev-shm-usage", "--disable-gpu"],
          },
        },
      },
    ]
  : [
      { name: "chromium", use: { browserName: "chromium" } },
      { name: "firefox", use: { browserName: "firefox" } },
      { name: "webkit", use: { browserName: "webkit" } },
    ];

module.exports = defineConfig({
  testDir: "tests/browser",
  timeout: 30000,
  fullyParallel: false,
  workers: 1,
  reporter: "list",
  projects,
  webServer: {
    command: "python3 -m http.server 8000 --bind 0.0.0.0",
    url: "http://127.0.0.1:8000/index.html",
    reuseExistingServer: !process.env.CI,
    timeout: 30000,
  },
  use: {
    baseURL: "http://127.0.0.1:8000",
    headless: true,
  },
});
