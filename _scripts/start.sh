
#!/bin/bash

# build docker images and run containers
npm run repo:build && docker-compose -f docker-compose.yaml build --parallel && docker-compose -f docker-compose.yaml up