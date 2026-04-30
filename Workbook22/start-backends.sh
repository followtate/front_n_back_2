#!/bin/bash
cd backend
export PORT=3000 && node server.js &
export PORT=3001 && node server.js &
export PORT=3002 && node server.js &
wait