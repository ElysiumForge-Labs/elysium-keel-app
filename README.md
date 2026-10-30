# elysium-keel-app

**Keel** web interface for token launches on **Kinetiq's Elysium testnet**. A launch is absorbed on a constant-product curve, graduates when that curve sells out, and settles onto the Hyperliquid Core spot book.

Part of [ElysiumForge Labs](https://github.com/ElysiumForge-Labs). Companion contracts: [elysium-keel-contracts](https://github.com/ElysiumForge-Labs/elysium-keel-contracts).

> **Independent research repository. Testnet only.** Not affiliated with, endorsed by, or sponsored by Kinetiq or Hyperliquid. Test tokens have no monetary value. Figures on screen are read from chain when a live deployment manifest is present.

## Launch stages

| Stage | Where | What happens |
| --- | --- | --- |
| Absorb | Elysium | Buyers and sellers trade a constant-product curve. 800M of 1B supply sold on the curve. First 60s: launch guard caps each address at 1% of the sale. |
| Graduate | Elysium | At 800M sold, pool freezes. Anyone may call `graduate()`. Raised HYPE and 200M book tokens move to settlement at `listPrice`. |
| Settle | HyperEVM → HyperCore | Keeper registers mirror, dispatches bridge, claims after challenge period, runs HIP-1 listing. Undispatched after 7 days → abort and trading reopens. |

## Features

- Launches list with curve progress and HYPE raised vs graduation target
- Search by ticker, launch id, token address, or pool address
- Per-launch curve, price, reserves, and trade chart
- Issue form: one transaction deploys token + curve (symbol once-only; reserved HyperCore tickers refused; optional creator buy capped at 2% of supply)
- In-app manual for mechanism, parameters, trust model, and addresses

## Stack

| Layer | Technology |
| --- | --- |
| UI | Vite, TypeScript, React |
| Chain reads | `src/chain.ts`, ABIs under `src/abi/` |
| Deployments | `src/deployments/99801.json` |
| RPC proxy | `api/rpc.js` (deployed site; falls back to public Elysium RPC) |

## Development

```bash
npm install
npm run dev
npm run build
npm run typecheck
npm run preview
```

A dry-run deployment manifest leaves the app in a pre-deployment state with no live chain data.
