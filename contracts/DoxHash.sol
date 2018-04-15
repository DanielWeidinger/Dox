pragma solidity ^0.4.17;

contract DoxHash {
    

    //events
    event OwnershipTransferred(address indexed _previousOwner, address indexed _newOwner);
    event NewHashStored(address indexed _hashSender, uint _hashId, string _hashContent, uint timestamp);
    event Withdrawn(address indexed _hashSender, uint amount);
    event PriceChanged(uint newPrice);

    //structs

    struct Hash {
        address sender;
        string content;
        uint timestamp;
    }

    //variables

    mapping(uint => Hash) public hashes;
    address owner;
    uint public lastHashId;
    uint public price;

    //modifiers

    modifier ownerOnly(){
        require(msg.sender == owner);
        _;
    }

    //constructor

    function DoxHash(uint _price) public{
        require(_price > 0);

        owner = msg.sender;
        price = _price;
        lastHashId = 0;
    }

    //functions

    function transferOwnership(address _newOwner) ownerOnly public {
        require(_newOwner != address(0));

        owner = _newOwner;

        //invoke event
        OwnershipTransferred(owner, _newOwner);
    }


    function withdrawBalance() ownerOnly public {

        var amount = this.balance;

        //transfer balance
        owner.transfer(this.balance);

        //Log event
        Withdrawn(owner, amount);
    }


    function changePrice(uint newPrice) ownerOnly public {
        require(newPrice >= 0);

        price = newPrice;

        PriceChanged(newPrice);
    }

    function kill() ownerOnly public {
        selfdestruct(owner);
    }


    function save(string _hashContent) payable public {
        require(msg.value >= price);

        //save/map the hash
        uint hashId = lastHashId;

        hashes[hashId].sender = msg.sender;
        hashes[hashId].content = _hashContent;
        hashes[hashId].timestamp = block.timestamp;

        lastHashId++;

        //Log event
        NewHashStored(hashes[hashId].sender, hashId, hashes[hashId].content, hashes[hashId].timestamp);
    }

    function find(uint _hashId) view public returns (address hashSender, string hashContent, uint hashTimestamp) {
        return (hashes[_hashId].sender, hashes[_hashId].content, hashes[_hashId].timestamp);
    }
}