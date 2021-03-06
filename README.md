## White Paper 

# DOX – Ethereum blockchain memory

## January 8, 2018 

#### Purpose 

The purpose of this paper is to articulate the research efforts completed to date as well as ongoing and future efforts to evaluate and potentially better standardize the Progress of our Project.

#### Background 

Dox will be a smart-contract saved in the Ethereum blockchain. By sending a message to the contract with the data the user wants to save in the blockchain, another contract will be made with the data,
that gets converted in a zip by the Dox-contract. After this process the user will get an address to his new created smart-contract. When the user wants to download his data he simply has to send a 
message to his contract, which then send him all his data. Documents saved in the Blockchain are undeletable and everybody can access the data. We plan to make this process as comfortable as possible
by creating a website where the user just has to upload his file.

A smart contract, also known as a crypto-contract, is a computer program that directly controls the transfer of digital currencies or assets between parties under certain conditions. A smart contract
not only defines the rules and penalties around an agreement in the same way that a traditional contract does, but it can also automatically enforce those obligations. It does this by taking in 
information as input, assigning value to that input through the rules set out in the contract, and executing the actions required by those contractual clauses – for example, determining whether 
an asset should go to one person or returned to the other person from whom the asset originated. These contracts are stored on blockchain technology a decentralized ledger that also underpins
bitcoin and other cryptocurrencies. Blockchain is ideal for storing smart contracts because of the technology's security and immutability.

#### Detailed Steps of the Program

1. User uploads file to the DOX website
2. The DOX HTML Client sends the File to the IPFS Network  
3. The file is saved on a node in the IPFS Network
4. The IPFS networks sends a hash to the HTML Client
5. The HTML Client sends the IPFS hash to the Ethereum blockchain Dox-smartcontract
6. The Dox-smartcontract creates a new smartcontract.
7. The Dox-smartcontract sends the IPFS-hash to the newly created smartcontract.
8. The IPFS-Hash gets saved on the new smartcontract.
9. The Pointer that points to the new smartcontract gets returned to the Dox-smartcontract.
10. The Dox-smartcontract sends the Pointer to the HTML Client.
11. The user can now save his file-pointer on his Computer


![](Dox.png "Logo Title Text 1")


#### Practical uses for Dox.

