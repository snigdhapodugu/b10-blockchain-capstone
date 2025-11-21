# Document Verification Blockchain

An end-to-end prototype where universities issue credentials on-chain, store documents off-chain, and expose a browser dApp for students, faculty, and verifiers.

This repo contains:
- Hardhat workspace (contracts/, scripts/, test/) for the Solidity registry.
- Production dApp in docs/ (deployed via GitHub Pages) with Supabase Auth/Storage and MetaMask integration.
- Legacy demos in demo_site/ and verify/ preserved for reference.

---

## Highlights

- Role-aware portal – Supabase email/password login. Admins get issuance dashboards; students see issued records. Wallet connect is admin-only.
- On-chain anchoring – files are hashed locally (Web Crypto SHA-256) and registerDocument stores (docId, docHash, uri) on Sepolia while showing the pending transaction hash.
- Off-chain storage – issued files upload to a Supabase Storage bucket; metadata (hash, tx hash, file URL, student ID, timestamp) is written to Postgres.
- Verification UX – anyone can upload a file or paste a hash; the client re-hashes, checks the contract, and shows match status plus download/transaction links.
- Requests workflow (optional) – students request credentials, admins approve/deny/issue entirely via Supabase tables.

## Smart Contract

Located at contracts/DocumentRegistry.sol. Core entrypoints:
- registerDocument(bytes32 docId, bytes32 docHash, string uri) – stores a fingerprint once (reverts on duplicates).
- verifyDocument(bytes32 docId, bytes32 docHash) – pure check comparing a provided hash to the stored value.

Deploy with Hardhat:

Commands:
    npm install
    npm run build
    npm run test

    # local
    npx hardhat node
    npm run deploy:local

    # Sepolia (.env needs ALCHEMY_SEPOLIA_URL + PRIVATE_KEY)
    npm run deploy:sepolia

---

## Frontend (docs/)

GitHub Pages serves everything from docs/. Main pages:
- signin.html – auth splash for students/admins.
- admin.html – queue of pending Supabase requests.
- faculty_staff.html – issuance form (doc ID + student ID + file).
- admin_request.html / admin_verify.html – admin utilities.
- my_documents.html – students see issued documents fetched from Supabase.
- verify.html – public verification (file upload or hash input).

Open docs/index.html directly during local testing or run npx serve docs for a lightweight dev server.

---

## Supabase Setup

1. Set docs/supabase-config.js with your project URL and anon key.
2. Create users under Supabase Auth and assign roles (admins get role=admin, students get role=student plus studentId). Use SQL similar to the snippets in docs/sql/reset_documents_policies.sql.
3. Run docs/sql/reset_documents_policies.sql to create the documents table policies (admins insert/select, students select by student_id).
4. Optionally create the requests table (id, student_id, doc_type, status, file_url, tx_hash, doc_id, doc_hash, notes, timestamps) and add policies so students insert/select their rows and admins can select/update all.
5. Create a documents storage bucket (public for now). Admin issuance uploads files there and stores the public URL.

Supabase Auth sessions live in sessionStorage, so closing the tab requires signing in again. Students never connect a wallet; admins must connect MetaMask on Sepolia.

---

## GitHub Pages Deployment

The workflow .github/workflows/static.yml uploads the docs/ directory on every push to main. Leave it as-is, ensure GitHub Pages is set to GitHub Actions, and push your changes (including docs/supabase-config.js placeholders). The deploy job will publish automatically.

---

## Legacy Folders

- demo_site/ – original static walkthrough without Supabase.
- verify/ – lightweight verification-only site.

They remain untouched but are no longer part of the production deployment.

---

## Summary

1. Deploy DocumentRegistry.sol (local or Sepolia) and point docs/js/registry.js at the new address.
2. Configure Supabase Auth/Storage following the steps above.
3. Serve docs/ via GitHub Pages, connect MetaMask as an admin, and issue documents. Students immediately see issued documents, can download from Supabase, and verify on-chain.

Only SHA-256 hashes ever touch the blockchain—documents stay private in Supabase Storage yet remain verifiable by anyone holding the file.
