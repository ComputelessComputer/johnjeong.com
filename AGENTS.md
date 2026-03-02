- use bun
- use `bun fmt` for formatting

## Procedure

- before finishing any code change, run `bun run check`
- `bun run check` must pass (`bun run lint` + `bun run fmt:check`)
- if formatting fails, run `bun fmt`, then re-run `bun run check`
