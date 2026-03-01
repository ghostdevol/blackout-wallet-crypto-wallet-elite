// viewer.js

// Elements
const connectBtn = document.getElementById("connect-wallet");
const sendBtn = document.getElementById("send-eth");
const balanceEl = document.querySelector(".wallet-balance");

// Global state
let userAddress = null;
let provider = null;

// Connect Wallet
async function connectWallet() {
    if (window.ethereum) {
        try {
            provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            userAddress = await signer.getAddress();
            const balance = await provider.getBalance(userAddress);
            const ethBalance = ethers.utils.formatEther(balance);
            balanceEl.textContent = `Balance: ${ethBalance} ETH`;
            connectBtn.textContent = `Connected: ${userAddress.slice(0,6)}...${userAddress.slice(-4)}`;
            connectBtn.disabled = true;
            sendBtn.disabled = false;
        } catch (err) {
            console.error(err);
            alert("Wallet connection failed.");
        }
    } else {
        alert("MetaMask or another Ethereum wallet is required.");
    }
}

// Mock Send ETH
function sendETH() {
    if (!userAddress) {
        alert("Connect wallet first!");
        return;
    }
    // Mock transaction (for demo only)
    alert(`Pretending to send ETH from ${userAddress}`);
}

// Event listeners
connectBtn.addEventListener("click", connectWallet);
sendBtn.addEventListener("click", sendETH);

// Initialize
sendBtn.disabled = true; // Disabled until wallet connects
