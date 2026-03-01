// ====== Wallet Connection ======
let provider;
let signer;
let userAddress;

const connectBtn = document.getElementById("connect-btn");
connectBtn.onclick = async () => {
    if(window.ethereum){
        provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        signer = provider.getSigner();
        userAddress = await signer.getAddress();
        connectBtn.innerText = "Connected";
        document.getElementById("wallet-address").innerText = userAddress;
        loadBalance();
        loadNFTs();
    } else {
        alert("Install MetaMask!");
    }
}

async function loadBalance(){
    if(!provider || !userAddress) return;
    const balance = await provider.getBalance(userAddress);
    document.getElementById("wallet-balance").innerText = "Balance: " + ethers.utils.formatEther(balance) + " ETH";
}

// ====== NFT Viewer ======
const nftContainerSelector = "#nft-container";
const nftContractAddress = "0xYourNFTContractAddress";
const nftABI = [
    "function balanceOf(address owner) view returns (uint256)",
    "function tokenOfOwnerByIndex(address owner, uint index) view returns (uint256)"
];
let nftContract = null;

async function loadNFTs(){
    const container = document.querySelector(nftContainerSelector);
    if(!container || !userAddress) return;
    container.innerHTML = "";
    nftContract = new ethers.Contract(nftContractAddress, nftABI, provider);
    const balance = await nftContract.balanceOf(userAddress);
    for(let i=0;i<balance;i++){
        const tokenId = await nftContract.tokenOfOwnerByIndex(userAddress, i);
        const card = document.createElement("div");
        card.className = "nft-card";
        card.innerHTML = `<img src="assets/placeholder-nft.png" alt="NFT #${tokenId}"><h3>#${tokenId}</h3>`;
        container.appendChild(card);
    }
}

// ====== Token Swap Simulation ======
document.getElementById("swap-btn").onclick = () => {
    const amount = parseFloat(document.getElementById("swap-amount").value);
    const from = document.getElementById("swap-from").value;
    const to = document.getElementById("swap-to").value;
    if(!amount || from === to) return alert("Invalid swap");
    alert(`Swapped ${amount} ${from} → ${to} (simulated)`);
};
