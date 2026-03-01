// viewer.js

document.addEventListener("DOMContentLoaded", () => {

  /*** PIN Modal Logic ***/
  const pinModal = document.getElementById("pinModal");
  const pinInput = document.getElementById("pinInput");
  const submitPinBtn = document.getElementById("submitPinBtn");
  const skipPinBtn = document.getElementById("skipPinBtn");

  // Show PIN modal on load
  pinModal.classList.remove("hidden");

  submitPinBtn.addEventListener("click", () => {
    if (pinInput.value.length === 6) {
      pinModal.classList.add("hidden");
      alert("PIN accepted ✅");
    } else {
      alert("Enter a 6-digit PIN");
    }
  });

  skipPinBtn.addEventListener("click", () => {
    pinModal.classList.add("hidden");
  });

  /*** User Menu Toggle ***/
  const userMenuBtn = document.getElementById("userMenuBtn");
  const userMenu = document.getElementById("userMenu");
  userMenuBtn.addEventListener("click", () => {
    userMenu.classList.toggle("hidden");
  });

  /*** Theme Toggle ***/
  const themeToggle = document.getElementById("themeToggle");
  themeToggle.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");
  });

  /*** Wallet Storage ***/
  const wallets = [];

  // Helper to generate Ethereum wallet from mnemonic
  async function createEthereumWallet() {
    const mnemonic = bip39.generateMnemonic();
    const seed = await bip39.mnemonicToSeed(mnemonic);
    const hdkey = ethereumjs.HDKey.fromMasterSeed(seed);
    const wallet = hdkey.derivePath("m/44'/60'/0'/0/0").getWallet();
    const address = "0x" + wallet.getAddress().toString("hex");
    const privateKey = wallet.getPrivateKey().toString("hex");
    return { address, privateKey, mnemonic };
  }

  /*** Create Wallet Button ***/
  const createWalletBtn = document.getElementById("createWalletBtn");
  createWalletBtn.addEventListener("click", async () => {
    const wallet = await createEthereumWallet();
    wallets.push(wallet);
    alert(`New wallet created!\nAddress: ${wallet.address}\nMnemonic: ${wallet.mnemonic}`);
    updateWalletOverview();
  });

  /*** Import Wallet Button ***/
  const importWalletBtn = document.getElementById("importWalletBtn");
  importWalletBtn.addEventListener("click", async () => {
    const mnemonic = prompt("Enter your 12/24 word mnemonic:");
    if (mnemonic && bip39.validateMnemonic(mnemonic)) {
      const seed = await bip39.mnemonicToSeed(mnemonic);
      const hdkey = ethereumjs.HDKey.fromMasterSeed(seed);
      const wallet = hdkey.derivePath("m/44'/60'/0'/0/0").getWallet();
      const address = "0x" + wallet.getAddress().toString("hex");
      const privateKey = wallet.getPrivateKey().toString("hex");
      wallets.push({ address, privateKey, mnemonic });
      alert(`Wallet imported!\nAddress: ${address}`);
      updateWalletOverview();
    } else {
      alert("Invalid mnemonic!");
    }
  });

  /*** Connect dApp Button (Simulated) ***/
  const connectDappBtn = document.getElementById("connectDappBtn");
  connectDappBtn.addEventListener("click", () => {
    alert("dApp connected! ✅");
  });

  /*** Wallet Overview Update ***/
  function updateWalletOverview() {
    // For simplicity, just update balances & display
    // Grab the first wallet for display demo
    if (wallets.length === 0) return;

    const ethBalance = (Math.random() * 10).toFixed(4);
    const btcBalance = (Math.random() * 1).toFixed(4);

    // Update wallet cards dynamically
    const walletCards = document.querySelectorAll(".wallet-card");
    if (walletCards[0]) walletCards[0].querySelector("h3").innerText = `$${(Math.random()*50000).toFixed(2)}`;
    if (walletCards[1]) walletCards[1].querySelector("h3").innerText = `${ethBalance} ETH`;
    if (walletCards[2]) walletCards[2].querySelector("h3").innerText = `${btcBalance} BTC`;

    // Could expand to dynamically update transactions, NFTs, etc.
  }

  /*** Initial Update ***/
  updateWalletOverview();

});
