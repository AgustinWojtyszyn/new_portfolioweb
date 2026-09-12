import { defineConfig } from '@playwright/test';
export default defineConfig({testDir:'./tests',use:{baseURL:'http://127.0.0.1:3100',browserName:'chromium'},webServer:{command:'npm start -- --port 3100',url:'http://127.0.0.1:3100/es',reuseExistingServer:true,timeout:120000},reporter:'list'});
