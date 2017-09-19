#!/bin/bash

pm2 delete course-section-generator

source .env

npm install
npm run test-server
npm run build

pm2 -f start dist/course-section-generator.js
