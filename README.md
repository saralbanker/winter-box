# @vonod/ag-kit — Winter Box 🧊

> Lyra-class skill library for [Antigravity IDE](https://antigravity.dev) — 12 global skills, 4 rules, 3 specialist agents that work on any project, any stack, any model.

Built on top of [@vudovn/ag-kit](https://www.npmjs.com/package/@vudovn/ag-kit).

---

## Install

### Option A — One command (recommended after npm publish)

```bash
npx @vonod/ag-kit setup
```

This installs everything in sequence:
1. `@vudovn/ag-kit` base (20 agents, 36 skills, 11 workflows — ag-kit official)
2. `@vonod/ag-kit` global skills (12 skills, 4 rules, 3 agents — winter-box)

### Option B — Manual two-step (use this before npm publish)

```bash
# Step 1 — ag-kit base
npx @vudovn/ag-kit@latest init

# Step 2 — vonod global skills (from GitHub, no npm account needed)
npx degit vonod/ag-kit/skills .agent/skills --force
npx degit vonod/ag-kit/rules .agent/rules --force
npx degit vonod/ag-kit/agents .agent/agents --force
```

Requires: `npm install -g degit` (one-time). Replace `vonod/ag-kit` with your actual GitHub repo path.

### Option C — Add single skill

```bash
npx @vonod/ag-kit add debugging-master
npx @vonod/ag-kit add security-auditor
```

### Option D — List everything available

```bash
npx @vonod/ag-kit list
```

---

### One-time npm publish (to enable Option A)

```bash
cd /path/to/vonod-ag-kit
npm login
npm publish --access public
```

Takes 2 minutes. After this, `npx @vonod/ag-kit setup` works anywhere, on any machine, forever.

---

## 🌍 Global Skills (v1.1.0) — Work in Any Project

| Skill | Purpose |
|-------|---------|
| `task-planner` | Decompose goals into ordered, dependency-aware subtasks |
| `debugging-master` | Systematic fault isolation: trace → hypothesis → fix → test |
| `code-synthesizer` | TDD-enforced production code generation |
| `architecture-analyst` | Codebase mapping, dependency graphs, anti-pattern detection |
| `system-auditor` | System-level incident investigation with evidence-first approach |
| `test-generator` | Minimal, complete test suites with boundary value analysis |
| `security-auditor` | OWASP Top 10, injection patterns, CVE scanning |
| `performance-optimizer` | Profile-first optimization with regression protection |
| `refactoring-specialist` | Safe incremental refactoring using Fowler smell taxonomy |
| `research-engine` | Evidence-based research with source hierarchy and synthesis |
| `dependency-analyzer` | SemVer, CVE, license compliance, transitive risk |
| `documentation-writer` | Audience-first docs: READMEs, API refs, architecture docs |

---

## 🤖 Agents (3 Global)

| Agent | Persona | Skills Loaded |
|-------|---------|---------------|
| `senior-engineer` | Full-stack dev — TDD, clean code, architecture-first | debugging-master, code-synthesizer, architecture-analyst, test-generator |
| `system-investigator` | SRE — evidence-first incident response | system-auditor, debugging-master, performance-optimizer, dependency-analyzer |
| `quality-enforcer` | QA architect — pre-release quality gate | security-auditor, test-generator, refactoring-specialist, documentation-writer, dependency-analyzer |

---

## 📏 Rules (4 Global)

| Rule | Purpose |
|------|---------|
| `global-engineering-standards` | TypeScript strict, max 50-line functions, no secrets, naming conventions |
| `skill-routing-protocol` | Check skills before free-form work, context hygiene |
| `output-quality-contract` | Type-specific quality bars for every output |
| `token-hygiene` | Context window management, no redundant injection |

---

## 📁 Structure

```
.agent/
├── rules/              # 4 global rules (always-on guardrails)
├── skills/             # 12 global skills (domain knowledge)
│   ├── task-planner/
│   ├── debugging-master/
│   ├── code-synthesizer/
│   ├── architecture-analyst/
│   ├── system-auditor/
│   ├── test-generator/
│   ├── security-auditor/
│   ├── performance-optimizer/
│   ├── refactoring-specialist/
│   ├── research-engine/
│   ├── dependency-analyzer/
│   └── documentation-writer/
└── agents/             # 3 specialist agents
    ├── senior-engineer.md
    ├── system-investigator.md
    └── quality-enforcer.md
```

---

## 🔗 Skill Activation

In Antigravity IDE, activate skills with `@skill-name`:
```
@debugging-master   — debug a bug
@task-planner       — break down a feature
@security-auditor   — audit for vulnerabilities
```

---

## License

MIT
