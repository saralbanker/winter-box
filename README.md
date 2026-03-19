# @vonod/ag-kit — Winter Box 🧊

> Lyra-class skill library for [Antigravity IDE](https://antigravity.dev) — 13 global skills, 4 rules, 3 specialist agents that work on any project, any stack, any model.

Built on top of [@vudovn/ag-kit](https://www.npmjs.com/package/@vudovn/ag-kit).

---

## Install

### Option A — One command (recommended after npm publish)

```bash
npx @vonod/ag-kit setup
```

This installs everything in sequence:
1. `@vudovn/ag-kit` base (20 agents, 36 skills, 11 workflows — ag-kit official)
2. `@vonod/ag-kit` global skills (13 skills, 4 rules, 3 agents — winter-box)

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

### ⚡ One-Shot Install (AG-Kit + Winter-Box)

Install the Antigravity CLI and all Winter-Box global skills, rules, and agents
in a single command:

```bash
npx @vudovn/ag-kit@latest init && npx degit saralbanker/winter-box/.agent/skills .agent/skills --force && npx degit saralbanker/winter-box/.agent/rules .agent/rules --force && npx degit saralbanker/winter-box/.agent/agents .agent/agents --force
```

This installs:
- AG-Kit CLI and project scaffolding
- 13 global skills (task-planner, debugging-master, code-synthesizer, + 10 more)
- 4 global rules (engineering standards, skill routing, output quality, token hygiene)
- 3 global agents (senior-engineer, system-investigator, quality-enforcer)

---

### 🔨 Install skill-forge Only

To download only the skill-forge meta-skill (without the full Winter-Box suite):

```bash
npx degit saralbanker/winter-box/.agent/skills/skill-forge .agent/skills/skill-forge --force
```

This gives you the ability to create new SKILL.md files on demand using `@skill-forge`.

---

### 🔄 Update Skill Routing Rule

To update the skill routing protocol rule (adds `@skill-forge` as automatic fallback):

```bash
npx degit saralbanker/winter-box/.agent/rules/skill-routing-protocol.md .agent/rules/ --force
```

Run this if your existing `skill-routing-protocol.md` does not automatically invoke
`@skill-forge` for unknown domains.

---

### One-time npm publish (to enable Option A)

```bash
cd /path/to/vonod-ag-kit
npm login
npm publish --access public
```

Takes 2 minutes. After this, `npx @vonod/ag-kit setup` works anywhere, on any machine, forever.

---

## 🌍 Global Skills (v1.2.0) — Work in Any Project

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
| `skill-forge` | Meta-skill: creates new SKILL.md capability modules on demand |

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
├── skills/             # 13 global skills (domain knowledge)
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
│   ├── documentation-writer/
│   └── skill-forge/
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
