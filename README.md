# AI Fabric Designer

Standalone, offline-capable mobile/desktop app that produces validated AI-cluster networking BOMs and topologies (E-W, N-S, Storage, OOB). Every catalog part is validated against official OEM documentation or flagged UNVALIDATED with the missing document named.

- Runs entirely in the browser, with no sign-in and no backend. It works offline after the first load (service worker).
- Install on iPhone with the `AI-Fabric-Designer.mobileconfig` profile (full-screen web clip), or via Safari → Share → Add to Home Screen. On Android, use Chrome → Install app.
- The optional AI design cross-check opens Claude with the design's audit prompt.
