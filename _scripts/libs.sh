
#!/bin/bash



cd libs && find . -maxdepth 1 -type d \( ! -iname ".*" \)  -print0 | sort -z | xargs --null -n1 -I_path -- sh -c 'cd _path && npm run build'
