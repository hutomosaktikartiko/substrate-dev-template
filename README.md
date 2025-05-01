<div align="center">

# Substrate Dev Template

<img height="70px" alt="Polkadot SDK Logo" src="https://github.com/paritytech/polkadot-sdk/raw/master/docs/images/Polkadot_Logo_Horizontal_Pink_White.png#gh-dark-mode-only"/>
<img height="70px" alt="Polkadot SDK Logo" src="https://github.com/paritytech/polkadot-sdk/raw/master/docs/images/Polkadot_Logo_Horizontal_Pink_Black.png#gh-light-mode-only"/>
<br /><br />
<a href="r0gue.io"><img src="https://github.com/user-attachments/assets/96830651-c3db-412a-9cb4-6fcd8ea6231b" alt="R0GUE Logo" /></a>

[![Twitter URL](https://img.shields.io/twitter/follow/Pop?style=social)](https://x.com/onpopio/)
[![Twitter URL](https://img.shields.io/twitter/follow/R0GUE?style=social)](https://twitter.com/gor0gue)
[![Telegram](https://img.shields.io/badge/Telegram-gray?logo=telegram)](https://t.me/onpopio)

> This template is used to generate parachains using [Pop CLI](https://github.com/r0gue-io/pop-cli) - an all-in-one tool for Polkadot development.

> It is based on the [Polkadot SDK](https://github.com/paritytech/polkadot-sdk) and is updated by [R0GUE](r0gue.io) after releases in the main [Polkadot SDK monorepo](https://github.com/paritytech/polkadot-sdk).

</div>

* ⏫ This template provides a starting point to build a [parachain](https://wiki.polkadot.network/docs/learn-parachains).

* ☁️ It is based on the
[Cumulus](https://paritytech.github.io/polkadot-sdk/master/polkadot_sdk_docs/polkadot_sdk/cumulus/index.html) framework.

* 🔧 Its runtime is configured with a single custom pallet as a starting point, and a handful of ready-made pallets
such as a [Balances pallet](https://paritytech.github.io/polkadot-sdk/master/pallet_balances/index.html).

## Template Structure

A Polkadot SDK based project such as this one consists of:

* 💿 [Node](./node/README.md) - the binary application.
* 🧮 [Runtime](./runtime/README.md) - the core logic of the parachain.

## Getting Started

### Parachain

#### Install [Pop CLI](https://github.com/r0gue-io/pop-cli) - the all-in-one Polkadot development tool:
> Detailed installation instructions can be found [here](https://learn.onpop.io/v/cli/installing-pop-cli).

```bash
cargo install --force --locked pop-cli
```

#### Install Zombienet
Zombienet is a testing framework for parachains. Install it using the following command:

```bash
cargo install --locked zombienet
```

#### Set Up Local Provider
Set up the local provider for your parachain using Zombienet:

```bash
zombienet setup polkadot polkadot-parachain
```

#### Running Parachain
Run your parachain locally with the following command:

```bash
zombienet spawn network.toml
```

### Frontend

#### Navigate to the Frontend Folder
Move into the frontend directory:

```bash
cd frontend
```

#### Install Node.js
Ensure you have Node.js installed. You can download it from [Node.js official website](https://nodejs.org/).

#### Install PNPM
Install PNPM, a fast and efficient package manager:

```bash
npm install -g pnpm
```

#### Install Dependencies
Install the required dependencies for the frontend:

```bash
pnpm install
```

#### Running Frontend
Start the frontend development server:

```bash
pnpm dev
```

You can now access the frontend in your browser at the provided local development URL.

### Learning Resources

* 🧑‍🏫 To learn about Polkadot in general, [Polkadot.network](https://polkadot.network/) website is a good starting point.

  * ⭕ Learn more about parachains [here](https://wiki.polkadot.network/docs/learn-parachains).

* 🧑‍🔧 For technical introduction, [here](https://github.com/paritytech/polkadot-sdk#-documentation) are
the Polkadot SDK documentation resources.

* 📖 To learn how to develop parachains with Pop CLI, read the [guides](https://learn.onpop.io/v/appchains).

### Support

* 💡 Be part of our passionate community of Web3 pioneers. [Join our Telegram](https://t.me/onpopio)!

* 👥 Additionally, there are [GitHub issues](https://github.com/r0gue-io/base-parachain/issues) and
[Polkadot Stack Exchange](https://polkadot.stackexchange.com/).

