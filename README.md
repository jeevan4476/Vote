# Votee: A Decentralized Polling dApp

**Votee** is a decentralized polling application built on the Solana blockchain, allowing users to create polls, register candidates, and vote in a transparent and secure manner. It leverages modern technologies and blockchain infrastructure to provide an interactive and decentralized voting experience.

Deployed:- https://vote-ebon.vercel.app/

---

## Pages

### *Homepage*
### *Create Poll Page*
### *Register Candidate Modal*
### *Voting Page*
---
## Installation and Setup

### version:
- solana-> solana-cli 1.18.18
- avm ->avm 0.30.1

### Steps:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/your-repo-name.git
    ```

2. **Install Dependencies**:
    Navigate into both `client` and `server` directories and run:

    ```bash
    cd program-jeevan4476
    pnpm install
     ```
3.**Start the web app**

```
pnpm dev
```

## Apps

### anchor

This is a Solana program written in Rust using the Anchor framework.

#### Commands

You can use any normal anchor commands. Either move to the `anchor` directory and run the `anchor` command or prefix the command with `pnpm`, eg: `pnpm anchor`.

#### Sync the program id:

Running this command will create a new keypair in the `anchor/target/deploy` directory and save the address to the Anchor config file and update the `declare_id!` macro in the `./src/lib.rs` file of the program.

You will manually need to update the constant in `anchor/lib/votee-exports.ts` to match the new program id.


```bash
cd anchor 
anchor keys sync
```

#### Build the program:

```shell
pnpm anchor-build
```

#### Start the test validator with the program deployed:

```shell
pnpm anchor-localnet
```

#### Run the tests

```shell
pnpm anchor-test
```

#### Deploy to Devnet

```shell
cd anchor 
anchor deploy --provider.cluster devnet
```
