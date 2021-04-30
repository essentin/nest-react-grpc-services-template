echo "Pruning node modules in all directories..."

find . -name 'package-lock.json' -type f -prune -exec rm -rf '{}' + && \
find . -name 'pnpm-lock.yaml' -type f -prune -exec rm -rf '{}' + && \
find . -name 'yarn.lock' -type f -prune -exec rm -rf '{}' + && \
find . -name 'node_modules' -type d -prune -exec rm -rf '{}' +

echo "Done"