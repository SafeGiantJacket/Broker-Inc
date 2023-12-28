import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import './App.css'; // Import the CSS file

const certIITechABI = [
  {
    "type": "constructor",
    "name": "",
    "inputs": [],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "event",
    "name": "CertificateCreated",
    "inputs": [
      {
        "type": "bytes32",
        "name": "certificateHash",
        "indexed": false,
        "internalType": "bytes32"
      },
      {
        "type": "address",
        "name": "issuer",
        "indexed": true,
        "internalType": "address"
      },
      {
        "type": "address",
        "name": "recipient",
        "indexed": true,
        "internalType": "address"
      }
    ],
    "outputs": [],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "CertificateInvalidated",
    "inputs": [
      {
        "type": "bytes32",
        "name": "certificateHash",
        "indexed": false,
        "internalType": "bytes32"
      },
      {
        "type": "address",
        "name": "issuer",
        "indexed": true,
        "internalType": "address"
      }
    ],
    "outputs": [],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "CertificateModified",
    "inputs": [
      {
        "type": "bytes32",
        "name": "certificateHash",
        "indexed": false,
        "internalType": "bytes32"
      },
      {
        "type": "string",
        "name": "newData",
        "indexed": false,
        "internalType": "string"
      }
    ],
    "outputs": [],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "CertificateSigned",
    "inputs": [
      {
        "type": "bytes32",
        "name": "certificateHash",
        "indexed": false,
        "internalType": "bytes32"
      },
      {
        "type": "address",
        "name": "signer",
        "indexed": true,
        "internalType": "address"
      }
    ],
    "outputs": [],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "CertificateTransferred",
    "inputs": [
      {
        "type": "bytes32",
        "name": "certificateHash",
        "indexed": false,
        "internalType": "bytes32"
      },
      {
        "type": "address",
        "name": "oldOwner",
        "indexed": true,
        "internalType": "address"
      },
      {
        "type": "address",
        "name": "newOwner",
        "indexed": true,
        "internalType": "address"
      },
      {
        "type": "string",
        "name": "newData",
        "indexed": false,
        "internalType": "string"
      }
    ],
    "outputs": [],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "PolicyPurchased",
    "inputs": [
      {
        "type": "string",
        "name": "name",
        "indexed": false,
        "internalType": "string"
      },
      {
        "type": "address",
        "name": "ethAddress",
        "indexed": true,
        "internalType": "address"
      },
      {
        "type": "string",
        "name": "phoneNumber",
        "indexed": false,
        "internalType": "string"
      },
      {
        "type": "uint256",
        "name": "age",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "RequestRemoved",
    "inputs": [
      {
        "type": "uint256",
        "name": "index",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "anonymous": false
  },
  {
    "type": "function",
    "name": "CertificateModification",
    "inputs": [
      {
        "type": "bytes32",
        "name": "_certificateHash",
        "internalType": "bytes32"
      },
      {
        "type": "string",
        "name": "_newData",
        "internalType": "string"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "addEmployee",
    "inputs": [
      {
        "type": "address",
        "name": "_employee",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "authorizedIssuer",
    "inputs": [],
    "outputs": [
      {
        "type": "address",
        "name": "",
        "internalType": "address"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "autoInvalidateCertificate",
    "inputs": [
      {
        "type": "bytes32",
        "name": "_certificateHash",
        "internalType": "bytes32"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "certificates",
    "inputs": [
      {
        "type": "bytes32",
        "name": "",
        "internalType": "bytes32"
      }
    ],
    "outputs": [
      {
        "type": "address",
        "name": "issuer",
        "internalType": "address"
      },
      {
        "type": "address",
        "name": "recipient",
        "internalType": "address"
      },
      {
        "type": "string",
        "name": "data",
        "internalType": "string"
      },
      {
        "type": "bool",
        "name": "isSigned",
        "internalType": "bool"
      },
      {
        "type": "bool",
        "name": "isValid",
        "internalType": "bool"
      },
      {
        "type": "uint256",
        "name": "timestamp",
        "internalType": "uint256"
      },
      {
        "type": "uint256",
        "name": "invalidateAfter",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "changeOwner",
    "inputs": [
      {
        "type": "address",
        "name": "_newOwner",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "employees",
    "inputs": [
      {
        "type": "uint256",
        "name": "",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "type": "address",
        "name": "",
        "internalType": "address"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "generateCertificate",
    "inputs": [
      {
        "type": "address",
        "name": "_recipient",
        "internalType": "address"
      },
      {
        "type": "string",
        "name": "_data",
        "internalType": "string"
      },
      {
        "type": "uint256",
        "name": "_invalidateAfter",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "getCertificateDetails",
    "inputs": [
      {
        "type": "bytes32",
        "name": "_certificateHash",
        "internalType": "bytes32"
      }
    ],
    "outputs": [
      {
        "type": "address",
        "name": "issuer",
        "internalType": "address"
      },
      {
        "type": "address",
        "name": "recipient",
        "internalType": "address"
      },
      {
        "type": "string",
        "name": "data",
        "internalType": "string"
      },
      {
        "type": "bool",
        "name": "isSigned",
        "internalType": "bool"
      },
      {
        "type": "bool",
        "name": "isValid",
        "internalType": "bool"
      },
      {
        "type": "uint256",
        "name": "timestamp",
        "internalType": "uint256"
      },
      {
        "type": "uint256",
        "name": "invalidateAfter",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getPolicyInfo",
    "inputs": [
      {
        "type": "address",
        "name": "_user",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "type": "string",
        "name": "name",
        "internalType": "string"
      },
      {
        "type": "string",
        "name": "phoneNumber",
        "internalType": "string"
      },
      {
        "type": "uint256",
        "name": "age",
        "internalType": "uint256"
      },
      {
        "type": "uint256",
        "name": "timestamp",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getUserCertificates",
    "inputs": [
      {
        "type": "address",
        "name": "_user",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "type": "bytes32[]",
        "name": "",
        "internalType": "bytes32[]"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "hasCertificate",
    "inputs": [
      {
        "type": "address",
        "name": "_user",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "type": "bool",
        "name": "",
        "internalType": "bool"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "invalidateCertificate",
    "inputs": [
      {
        "type": "bytes32",
        "name": "_certificateHash",
        "internalType": "bytes32"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "owner",
    "inputs": [],
    "outputs": [
      {
        "type": "address",
        "name": "",
        "internalType": "address"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "policy",
    "inputs": [
      {
        "type": "string",
        "name": "_name",
        "internalType": "string"
      },
      {
        "type": "string",
        "name": "_phoneNumber",
        "internalType": "string"
      },
      {
        "type": "uint256",
        "name": "_age",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "payable"
  },
  {
    "type": "function",
    "name": "policyInfo",
    "inputs": [
      {
        "type": "address",
        "name": "",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "type": "string",
        "name": "name",
        "internalType": "string"
      },
      {
        "type": "string",
        "name": "phoneNumber",
        "internalType": "string"
      },
      {
        "type": "uint256",
        "name": "age",
        "internalType": "uint256"
      },
      {
        "type": "uint256",
        "name": "timestamp",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "removeEmployee",
    "inputs": [
      {
        "type": "address",
        "name": "_employee",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "signCertificate",
    "inputs": [
      {
        "type": "bytes32",
        "name": "_certificateHash",
        "internalType": "bytes32"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "userCertificates",
    "inputs": [
      {
        "type": "address",
        "name": "",
        "internalType": "address"
      },
      {
        "type": "uint256",
        "name": "",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "type": "bytes32",
        "name": "",
        "internalType": "bytes32"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "withdraw",
    "inputs": [],
    "outputs": [],
    "stateMutability": "nonpayable"
  }
];

function WalletConnect() {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [connected, setConnected] = useState(false);
  const [userAddress, setUserAddress] = useState('');
  const [certificateFormData, setCertificateFormData] = useState({
    address: '',
    data: '',
    invalidationTime: '',
  });
  const [contract, setContract] = useState(null);
  const [userCertificates, setUserCertificates] = useState([]);
  const [certificateHashToSign, setCertificateHashToSign] = useState('');
  const [certificateHashToInvalidate, setCertificateHashToInvalidate] = useState('');

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        try {
          const web3Instance = new Web3(window.ethereum);
          setWeb3(web3Instance);

          const accs = await window.ethereum.request({ method: 'eth_requestAccounts' });
          setAccounts(accs);
          setConnected(true);
        } catch (error) {
          console.error('Error connecting wallet:', error);
        }
      } else {
        console.error('Ethereum provider not found');
      }
    };

    initWeb3();
  }, []);

  useEffect(() => {
    if (web3) {
      const contractAddress = '0xD7A6141b27c6A19D059334a40e31d15898208ca3'; // Use the actual contract address
      const contractInstance = new web3.eth.Contract(certIITechABI, contractAddress);
      setContract(contractInstance);
    }
  }, [web3]);

  const connectWallet = async () => {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      setConnected(true);
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCertificateFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const generateCertificate = async () => {
    try {
      if (web3 && connected && contract) {
        if (certificateFormData.address && certificateFormData.data && certificateFormData.invalidationTime) {
          await contract.methods
            .generateCertificate(
              certificateFormData.address,
              certificateFormData.data,
              parseInt(certificateFormData.invalidationTime)
            )
            .send({ from: accounts[0] });

          setCertificateFormData({
            address: '',
            data: '',
            invalidationTime: '',
          });
        } else {
          console.error('Certificate data is incomplete');
        }
      } else {
        console.error('Web3, wallet, or contract not properly initialized');
      }
    } catch (error) {
      console.error('Error generating certificate:', error);
    }
  };

  const getCertificate = async (userAddress) => {
    try {
      if (web3 && connected && contract) {
        const userCertificatesResult = await contract.methods.getUserCertificates(userAddress).call();
        setUserCertificates(userCertificatesResult);
      } else {
        console.error('Web3, wallet, or contract not properly initialized');
      }
    } catch (error) {
      console.error('Error getting certificates:', error);
    }
  };

  const signCertificate = async () => {
    try {
      if (web3 && connected && contract) {
        if (certificateHashToSign) {
          await contract.methods.signCertificate(certificateHashToSign).send({ from: accounts[0] });
          setCertificateHashToSign('');
        } else {
          console.error('Certificate hash to sign is missing');
        }
      } else {
        console.error('Web3, wallet, or contract not properly initialized');
      }
    } catch (error) {
      console.error('Error signing certificate:', error);
    }
  };

  const invalidateCertificate = async () => {
    try {
      if (web3 && connected && contract) {
        if (certificateHashToInvalidate) {
          await contract.methods.invalidateCertificate(certificateHashToInvalidate).send({ from: accounts[0] });
          setCertificateHashToInvalidate('');
        } else {
          console.error('Certificate hash to invalidate is missing');
        }
      } else {
        console.error('Web3, wallet, or contract not properly initialized');
      }
    } catch (error) {
      console.error('Error invalidating certificate:', error);
    }
  };

  return (
    <div className="WalletConnect">
      <h1>Broker Inc (Backend)</h1>
      {connected ? (
        <div>
          <p>Connected to wallet with address:</p>
          <p>{accounts[0]}</p>
          <button onClick={() => setConnected(false)}>Disconnect Wallet</button>
          <div>
            <h2>Generate Certificate</h2>
            <label>
              Address:
              <input
                type="text"
                name="address"
                value={certificateFormData.address}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Data:
              <input
                type="text"
                name="data"
                value={certificateFormData.data}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Invalidation Time:
              <input
                type="text"
                name="invalidationTime"
                value={certificateFormData.invalidationTime}
                onChange={handleInputChange}
              />
            </label>
            <button onClick={generateCertificate}>Generate Certificate</button>
            <br />
            <hr />
            <h2>Get Certificates for User</h2>
            <label>
              User Address:
              <input
                type="text"
                value={userAddress}
                onChange={(e) => setUserAddress(e.target.value)}
              />
            </label>
            <button onClick={() => getCertificate(userAddress)}>Get Certificates</button>
            <div>
              <h3>User Certificates:</h3>
              <ul>
                {userCertificates.map((certHash) => (
                  <li key={certHash}>{certHash}</li>
                ))}
              </ul>
            </div>
            <br />
            <hr />
            <h2>Sign and Invalidate Certificates</h2>
            <label>
              Certificate Hash to Sign:
              <input
                type="text"
                value={certificateHashToSign}
                onChange={(e) => setCertificateHashToSign(e.target.value)}
              />
            </label>
            <button onClick={signCertificate}>Sign Certificate</button>
            <br />
            <label>
              Certificate Hash to Invalidate:
              <input
                type="text"
                value={certificateHashToInvalidate}
                onChange={(e) => setCertificateHashToInvalidate(e.target.value)}
              />
            </label>
            <button onClick={invalidateCertificate}>Invalidate Certificate</button>
          </div>
        </div>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
}

export default WalletConnect;
