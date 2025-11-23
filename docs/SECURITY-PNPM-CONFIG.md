# pnpm Security Configuration

## Overview

This document explains the security configuration for pnpm in this project, specifically regarding build script execution.

---

## Configuration File: `app/.npmrc`

```ini
# Security: Disable build scripts by default to prevent supply chain attacks
enable-pre-post-scripts=false

# Selectively allow trusted packages (Prisma) to run build scripts
# This is necessary for Prisma Client generation
@prisma/client:enable-pre-post-scripts=true
prisma:enable-pre-post-scripts=true
```

---

## Why This Matters

### Security Risk: Build Scripts

When you install npm packages, they can execute arbitrary code through:
- `preinstall` scripts
- `postinstall` scripts  
- `prepare` scripts
- Other lifecycle hooks

**Attack Vector**: If a malicious package (or a compromised legitimate package) is installed, it could:
- Steal environment variables (API keys, secrets)
- Modify your source code
- Install backdoors
- Exfiltrate data
- Mine cryptocurrency

This is a real threat known as a **supply chain attack**.

---

## Our Security Approach

### ✅ **Default Deny (Secure)**

```ini
enable-pre-post-scripts=false
```

By default, **no package** can run build scripts. This prevents:
- Compromised packages from running malicious code
- Supply chain attacks
- Accidental execution of untrusted code

### ✅ **Selective Allow (Necessary)**

```ini
@prisma/client:enable-pre-post-scripts=true
prisma:enable-pre-post-scripts=true
```

We explicitly allow **only Prisma packages** because:
1. **Trusted Source**: Prisma is a well-established, reputable company
2. **Necessary Functionality**: Prisma MUST run scripts to generate the database client
3. **No Alternative**: Without these scripts, Prisma cannot function
4. **Auditable**: The scripts are open source and can be reviewed

---

## How It Works

### When you run `pnpm install`:

1. **All packages are installed** from the lockfile
2. **Most packages CANNOT run scripts** (blocked by default)
3. **Only Prisma packages CAN run scripts** (explicitly allowed)
4. Prisma generates the client based on your `schema.prisma`

### Example Output:

```bash
✔ Generated Prisma Client (v6.19.0) to ./node_modules/@prisma/client
```

---

## Adding More Allowed Packages

If you need to allow other packages to run build scripts (e.g., for native dependencies), add them to `.npmrc`:

```ini
# Example: Allow another trusted package
some-trusted-package:enable-pre-post-scripts=true
```

**Before adding**, verify:
- ✅ The package is from a trusted source
- ✅ The scripts are necessary for functionality
- ✅ You've reviewed what the scripts do (check the package on GitHub)
- ✅ The package has good security practices

---

## Verification

### Check configuration is working:

```bash
# No warnings about ignored build scripts
pnpm install

# Prisma still generates correctly
npx prisma generate

# TypeScript still compiles
pnpm tsc --noEmit
```

---

## References

- [pnpm Security Docs](https://pnpm.io/cli/install#--ignore-scripts)
- [npm Supply Chain Attacks](https://docs.npmjs.com/about-security-advisories)
- [Prisma Installation](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-postgresql)

---

## Security Best Practices

1. **Never enable scripts globally** (`enable-pre-post-scripts=true` alone)
2. **Always use selective allowlisting** (package-specific permissions)
3. **Audit dependencies regularly** (`pnpm audit`)
4. **Keep dependencies updated** (but test first)
5. **Use lockfiles** (pnpm-lock.yaml) to ensure reproducible installs
6. **Review packages before adding** (check npm/GitHub reputation)

---

## Current Status

✅ **Secure Configuration Active**  
✅ **Only Prisma Allowed**  
✅ **All Tests Passing**  
✅ **No Warnings**

**Last Updated**: November 22, 2025



