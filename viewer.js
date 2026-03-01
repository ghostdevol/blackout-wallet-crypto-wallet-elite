// ===== Neon Blackout Wallet Prototype =====
let provider;
let signer;

const connectBtn = document.getElementById('connect-btn');
const generateBtn = document.getElementById('generate-btn');
const walletAddress = document.getElementById('wallet-address');
const walletBalance = document.getElementById('wallet-balance');
const walletNetwork = document.getElementById('wallet-network');
const nftGrid = document.getElementById('nft-grid');
const swapBtn = document.getElementById('swap-btn');

// ===== Connect MetaMask Wallet =====
async function connectWallet() {
    if (window.ethereum) {
        provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        signer = provider.getSigner();
        const address = await signer.getAddress();
        walletAddress.textContent = address;
        const balance = await provider.getBalance(address);
        walletBalance.textContent = ethers.utils.formatEther(balance) + ' ETH';
        const network = await provider.getNetwork();
        walletNetwork.textContent = network.name;
        loadNFTs(address);
    } else {
        alert("Install MetaMask or another wallet extension!");
    }
}

connectBtn.addEventListener('click', connectWallet);

// ===== Generate New Wallet via BIP-39 =====
generateBtn.addEventListener('click', async () => {
    const mnemonic = bip39.generateMnemonic();
    const seed = bip39.mnemonicToSeedSync(mnemonic);
    const hdwallet = ethereumjs.Wallet.fromMasterSeed(seed);
    const wallet = hdwallet.getWallet();
    const address = '0x' + wallet.getAddress().toString('hex');

    walletAddress.textContent = address;
    walletBalance.textContent = '0 ETH';
    walletNetwork.textContent = 'Custom';

    alert(`Mnemonic Generated! Save it safely:\n\n${mnemonic}`);
});

// ===== Load NFT Grid (Placeholder) =====
function loadNFTs(address) {
    nftGrid.innerHTML = '';
    for (let i = 1; i <= 6; i++) {
        const card = document.createElement('div');
        card.classList.add('nft-card');
        card.innerHTML = `
            <img src="https://via.placeholder.com/180?text=NFT+${i}" alt="NFT ${i}">
            <p>NFT #${i}</p>
        `;
        nftGrid.appendChild(card);
    }
}

// ===== Send / Swap Placeholder =====
swapBtn.addEventListener('click', async () => {
    const recipient = document.getElementById('recipient').value;
    const amount = document.getElementById('amount').value;
    const token = document.getElementById('token-select').value;
    if (!signer) return alert("Connect wallet first!");
    if (!recipient || !amount) return alert("Fill recipient and amount!");
    alert(`Sending ${amount} ${token} to ${recipient} (simulation)`);
});
