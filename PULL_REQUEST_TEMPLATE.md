### PR checklist
- [ ] `npm run typecheck && npm run lint && npm run build` passes locally
- [ ] All images referenced exist under `/public` (or are allowed in `next.config`)
- [ ] New components accept undefined-safe props (no `.map` on maybe-undefined)
- [ ] No imports inside JSX or stray code in components
- [ ] Screenshots attached (desktop + mobile) if UI changed