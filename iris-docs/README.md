# Iris Docs

Collaborative editing tool. Decentralized: accounts are [Nostr](https://nostr.com) public keys and data can be synced over multiple relays.

Currently features canvas, text editor and an explorer for the underlying [IrisDB](srcrisdb/README.md) data structure.

Deployed on [docs.iris.to](https://docs.iris.to/).

## Stack
* Vite
* React
* [Tailwind](https://tailwindcss.com/docs/installation)
* [DaisyUI](https://daisyui.com/)
* [IrisDB](srcrisdb/README.md)
* [NDK](https://github.com/nostr-dev-kit/ndk) for syncing data over [Nostr](https://nostr.com)

## Development
```sh
npm install
npm run dev
```