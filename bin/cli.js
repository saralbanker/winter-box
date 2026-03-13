#!/usr/bin/env node

// ag-kit-winter-box — CLI v1.1.0
// Winter-box: global skills, rules, and agents for Antigravity IDE

const fs = require('fs');
const path = require('path');

// ─── COLORS ────────────────────────────────────────────────────────────────

const STYLES = {
    reset: '\x1b[0m',
    bold: '\x1b[1m',
    dim: '\x1b[2m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    cyan: '\x1b[36m',
    magenta: '\x1b[35m',
};

function c(style, text) {
    return `${STYLES[style] || ''}${text}${STYLES.reset}`;
}

// ─── CONSTANTS ─────────────────────────────────────────────────────────────

const PKG_ROOT = path.resolve(__dirname, '..');
const AGENT_DIR = path.join(PKG_ROOT, '.agent');
const TARGET_DIR = process.cwd();
const TARGET_AGENT = path.join(TARGET_DIR, '.agent');

const SKILL_NAMES = [
    'task-planner', 'debugging-master', 'code-synthesizer', 'architecture-analyst',
    'system-auditor', 'test-generator', 'security-auditor', 'performance-optimizer',
    'refactoring-specialist', 'research-engine', 'dependency-analyzer', 'documentation-writer',
];

const RULE_NAMES = [
    'global-engineering-standards', 'skill-routing-protocol',
    'output-quality-contract', 'token-hygiene',
];

const AGENT_NAMES = [
    'senior-engineer', 'system-investigator', 'quality-enforcer',
];

// ─── UTILS ─────────────────────────────────────────────────────────────────

function ensureDir(dir) {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function copyDir(src, dest) {
    ensureDir(dest);
    for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        if (entry.isDirectory()) {
            copyDir(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

function copyFile(src, dest) {
    ensureDir(path.dirname(dest));
    fs.copyFileSync(src, dest);
}

// ─── COMMANDS ──────────────────────────────────────────────────────────────

const COMMANDS = {
    init: cmdInit,
    add: cmdAdd,
    list: cmdList,
    remove: cmdRemove,
    setup: cmdSetup,
    help: cmdHelp,
};

// ─── INIT ──────────────────────────────────────────────────────────────────

function cmdInit() {
    console.log(c('bold', c('cyan', '\n⚡ ag-kit-winter-box — Installing complete toolkit\n')));

    // Copy entire .agent directory structure
    const sections = [
        { name: 'skills', label: 'skill', color: 'cyan' },
        { name: 'agents', label: 'agent', color: 'magenta' },
        { name: 'rules', label: 'rule', color: 'yellow' },
        { name: 'workflows', label: 'workflow', color: 'green' },
        { name: 'scripts', label: 'script', color: 'dim' },
    ];

    const counts = {};

    for (const section of sections) {
        const srcDir = path.join(AGENT_DIR, section.name);
        const destDir = path.join(TARGET_AGENT, section.name);

        if (!fs.existsSync(srcDir)) continue;
        ensureDir(destDir);

        const entries = fs.readdirSync(srcDir, { withFileTypes: true });
        let count = 0;

        for (const entry of entries) {
            const srcPath = path.join(srcDir, entry.name);
            const destPath = path.join(destDir, entry.name);

            if (entry.isDirectory()) {
                copyDir(srcPath, destPath);
            } else {
                fs.copyFileSync(srcPath, destPath);
            }
            count++;
        }

        counts[section.name] = count;
        console.log(`  ${c('green', '✓')} ${c(section.color, `${count} ${section.label}${count !== 1 ? 's' : ''}`)}`);
    }

    // Copy .shared if it exists
    const sharedSrc = path.join(AGENT_DIR, '.shared');
    const sharedDest = path.join(TARGET_AGENT, '.shared');
    if (fs.existsSync(sharedSrc)) {
        copyDir(sharedSrc, sharedDest);
        console.log(`  ${c('green', '✓')} ${c('dim', '.shared directory')}`);
    }

    // Copy ARCHITECTURE.md
    const archSrc = path.join(AGENT_DIR, 'ARCHITECTURE.md');
    const archDest = path.join(TARGET_AGENT, 'ARCHITECTURE.md');
    if (fs.existsSync(archSrc)) {
        fs.copyFileSync(archSrc, archDest);
        console.log(`  ${c('green', '✓')} ${c('dim', 'ARCHITECTURE.md')}`);
    }

    const total = Object.values(counts).reduce((a, b) => a + b, 0);
    console.log(c('bold', c('green', `\n✅ Installed ${total} components into .agent/\n`)));
}

// ─── ADD ───────────────────────────────────────────────────────────────────

function cmdAdd() {
    const name = process.argv[3];
    if (!name) {
        console.log(c('red', 'Usage: npx ag-kit-winter-box add <skill-name>'));
        console.log(c('dim', 'Run "npx ag-kit-winter-box list" to see available skills'));
        process.exit(1);
    }

    if (!SKILL_NAMES.includes(name)) {
        console.log(c('red', `Unknown skill: ${name}`));
        console.log(c('dim', `Available: ${SKILL_NAMES.join(', ')}`));
        process.exit(1);
    }

    const src = path.join(AGENT_DIR, 'skills', name);
    const dest = path.join(TARGET_AGENT, 'skills', name);

    if (!fs.existsSync(src)) {
        console.log(c('red', `Source not found: ${src}`));
        process.exit(1);
    }

    ensureDir(dest);
    copyDir(src, dest);
    console.log(`${c('green', '✓')} Added skill: ${c('cyan', name)}`);
}

// ─── LIST ──────────────────────────────────────────────────────────────────

function cmdList() {
    console.log(c('bold', c('cyan', '\nag-kit-winter-box — Available components\n')));

    console.log(c('bold', '📦 Skills (12):'));
    for (const s of SKILL_NAMES) {
        const installed = fs.existsSync(path.join(TARGET_AGENT, 'skills', s, 'SKILL.md'));
        const status = installed ? c('green', '✓') : c('dim', '○');
        console.log(`  ${status} ${s}`);
    }

    console.log(c('bold', '\n📏 Rules (4):'));
    for (const r of RULE_NAMES) {
        const installed = fs.existsSync(path.join(TARGET_AGENT, 'rules', `${r}.md`));
        const status = installed ? c('green', '✓') : c('dim', '○');
        console.log(`  ${status} ${r}`);
    }

    console.log(c('bold', '\n🤖 Agents (3):'));
    for (const a of AGENT_NAMES) {
        const installed = fs.existsSync(path.join(TARGET_AGENT, 'agents', `${a}.md`));
        const status = installed ? c('green', '✓') : c('dim', '○');
        console.log(`  ${status} ${a}`);
    }

    console.log('');
}

// ─── REMOVE ────────────────────────────────────────────────────────────────

function cmdRemove() {
    const name = process.argv[3];
    if (!name) {
        console.log(c('red', 'Usage: npx ag-kit-winter-box remove <skill-name>'));
        process.exit(1);
    }

    const dest = path.join(TARGET_AGENT, 'skills', name);
    if (!fs.existsSync(dest)) {
        console.log(c('yellow', `Skill not installed: ${name}`));
        process.exit(0);
    }

    fs.rmSync(dest, { recursive: true, force: true });
    console.log(`${c('green', '✓')} Removed skill: ${c('cyan', name)}`);
}

// ─── SETUP ─────────────────────────────────────────────────────────────────

function cmdSetup() {
    console.log(c('bold', c('cyan', '⚡ winter-box: full setup\n')));

    const { execSync } = require('child_process');

    // Step 1: Install ag-kit base
    console.log(c('yellow', '📦 Step 1/2 — Installing @vudovn/ag-kit base...'));
    try {
        execSync('npx @vudovn/ag-kit@latest init', { stdio: 'inherit' });
        console.log(c('green', '✓ ag-kit base installed\n'));
    } catch (e) {
        console.log(c('yellow', '⚠  ag-kit base install failed — continuing with vonod skills only\n'));
    }

    // Step 2: Install vonod global skills
    console.log(c('yellow', '📦 Step 2/2 — Installing ag-kit-winter-box global skills...'));
    cmdInit();

    // Summary
    const skillCount = (() => {
        try {
            const dir = path.join(process.cwd(), '.agent', 'skills');
            return fs.existsSync(dir) ? fs.readdirSync(dir).filter(f =>
                fs.statSync(path.join(dir, f)).isDirectory()
            ).length : 0;
        } catch { return '?'; }
    })();

    console.log(c('bold', c('green', '\n✅ winter-box setup complete')));
    console.log(c('dim', `   ${skillCount} skills now active in .agent/skills/`));
    console.log(c('dim', '   Activate any skill with @skill-name in Antigravity IDE\n'));
}

// ─── HELP ──────────────────────────────────────────────────────────────────

function cmdHelp() {
    console.log(c('bold', c('cyan', '\nag-kit-winter-box v1.1.0\n')));
    console.log('Global skills, rules, and agents for Antigravity IDE.\n');
    console.log(c('bold', 'Usage:'));
    console.log(`  ${c('cyan', 'npx ag-kit-winter-box init')}          Install all skills, rules, and agents`);
    console.log(`  ${c('cyan', 'npx ag-kit-winter-box setup')}         Full setup: ag-kit base + vonod global skills`);
    console.log(`  ${c('cyan', 'npx ag-kit-winter-box add <skill>')}   Install a single skill`);
    console.log(`  ${c('cyan', 'npx ag-kit-winter-box list')}          List all available components`);
    console.log(`  ${c('cyan', 'npx ag-kit-winter-box remove <skill>')} Remove a skill`);
    console.log(`  ${c('cyan', 'npx ag-kit-winter-box help')}          Show this help message`);
    console.log('');
    console.log(c('bold', 'Examples:'));
    console.log(`  ${c('dim', 'npx ag-kit-winter-box setup')}                    ${c('dim', '# Install everything')}`);
    console.log(`  ${c('dim', 'npx ag-kit-winter-box add debugging-master')}     ${c('dim', '# Add one skill')}`);
    console.log(`  ${c('dim', 'npx ag-kit-winter-box add security-auditor')}     ${c('dim', '# Add another skill')}`);
    console.log('');
}

// ─── MAIN ──────────────────────────────────────────────────────────────────

const cmd = process.argv[2] || 'help';
const handler = COMMANDS[cmd];

if (!handler) {
    console.log(c('red', `Unknown command: ${cmd}`));
    cmdHelp();
    process.exit(1);
}

handler();
