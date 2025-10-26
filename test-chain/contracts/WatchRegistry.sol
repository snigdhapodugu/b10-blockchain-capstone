pragma solidity ^0.8.0;

contract WatchRegistry {
    struct Watch {
        string brand;
        string model;
        string serialNumber;
        uint256 yearManufactured;
        address currentOwner;
        bool isAuthentic;
        uint256 registrationDate;
    }
    
    mapping(uint256 => Watch) public watches;
    mapping(string => bool) public serialNumberExists;
    uint256 public watchCount;
    
    event WatchRegistered(
        uint256 indexed watchId, 
        string brand, 
        string model,
        string serialNumber,
        address owner
    );
    event OwnershipTransferred(
        uint256 indexed watchId, 
        address indexed from, 
        address indexed to
    );
    
    function registerWatch(
        string memory _brand,
        string memory _model,
        string memory _serialNumber,
        uint256 _yearManufactured
    ) public returns (uint256) {
        require(!serialNumberExists[_serialNumber], "Watch already registered");
        require(_yearManufactured <= block.timestamp / 365 days + 1970, "Invalid year");
        
        watchCount++;
        watches[watchCount] = Watch({
            brand: _brand,
            model: _model,
            serialNumber: _serialNumber,
            yearManufactured: _yearManufactured,
            currentOwner: msg.sender,
            isAuthentic: true,
            registrationDate: block.timestamp
        });
        
        serialNumberExists[_serialNumber] = true;
        
        emit WatchRegistered(watchCount, _brand, _model, _serialNumber, msg.sender);
        return watchCount;
    }
    
    function transferOwnership(uint256 _watchId, address _newOwner) public {
        require(_watchId > 0 && _watchId <= watchCount, "Invalid watch ID");
        require(watches[_watchId].currentOwner == msg.sender, "Not the owner");
        require(_newOwner != address(0), "Invalid address");
        
        address previousOwner = watches[_watchId].currentOwner;
        watches[_watchId].currentOwner = _newOwner;
        
        emit OwnershipTransferred(_watchId, previousOwner, _newOwner);
    }
    
    function getWatch(uint256 _watchId) public view returns (
        string memory brand,
        string memory model,
        string memory serialNumber,
        uint256 yearManufactured,
        address currentOwner,
        bool isAuthentic,
        uint256 registrationDate
    ) {
        require(_watchId > 0 && _watchId <= watchCount, "Invalid watch ID");
        Watch memory watch = watches[_watchId];
        return (
            watch.brand,
            watch.model,
            watch.serialNumber,
            watch.yearManufactured,
            watch.currentOwner,
            watch.isAuthentic,
            watch.registrationDate
        );
    }
    
    function verifyAuthenticity(uint256 _watchId) public view returns (bool) {
        require(_watchId > 0 && _watchId <= watchCount, "Invalid watch ID");
        return watches[_watchId].isAuthentic;
    }
}