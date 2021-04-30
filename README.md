# sgram-io



NODE MODULES not found inside docker
If using pnpm (preferred), the pnpm store has to be mapped to a volume, otherwise the symlinks won't work.

on Mac it's 
      - "$HOME/.pnpm-store/v3:$HOME/.pnpm-store/v3"