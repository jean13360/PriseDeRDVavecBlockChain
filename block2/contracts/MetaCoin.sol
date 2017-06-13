pragma solidity ^0.4.11;

import "./ConvertLib.sol";

// This is just a simple example of a coin-like contract.
// It is not standards compatible and cannot be expected to talk to other
// coin/token contracts. If you want to create a standards-compliant
// token, see: https://github.com/ConsenSys/Tokens. Cheers!

/// @title Test d'une prise de RDV
contract MetaCoin {
	
	mapping (address => uint) balances;
	struct Quoi {
        bytes32[] activite;
        bytes32[] commentaire;
    }
	
	struct Quand {
		bytes32[] date;
		bytes32[] heure;
		bytes32[] duree;
	}
	enum EtatRDV { Propose }
 	
	struct Rdv {
		address client; 		// demendeur du RDV
        address fournisseur;  	// la personne qui donne le rdv
		//bytes32 etatDuRdv;  	// Etat du rdv dans le process PE
        //Quoi activite; 			// pourquoi le rdv a lieu
       
		//Quand[] plagetemporel;  // Dates ou proposité de rdv
    }
    // This declares a state variable that
    // stores a `Rdv[]` struct for each possible address.
    mapping(address => Rdv[])  agenda;

	event Transfer(address indexed _from, address indexed _to, uint256 _value);
	event DemandeRDV(address _from,address indexed _to, uint256  lastItem);
	event Deposit(
        address indexed _from,
        uint256 indexed _id
    );
	function MetaCoin() {
		balances[tx.origin] = 10000000000000000000;
		
	}
	 /// Réalise une demande de RDV pour le conseiller Ref
	function demandeDeRDV(address conseillerRef)  {			 
		uint lastItem = agenda[conseillerRef].push( Rdv({client : msg.sender, fournisseur :conseillerRef/*, etatDuRdv : 0*/}));		
		DemandeRDV(msg.sender, conseillerRef, lastItem);
	}


	function sendCoin(address receiver, uint amount) returns(bool sufficient) {
		if (balances[msg.sender] < amount) return false;
		balances[msg.sender] -= amount;
		balances[receiver] += amount;
		Transfer(msg.sender, receiver, amount);
		
		return true;
	}

	function getBalanceInEth(address addr) returns(uint){
		return ConvertLib.convert(getBalance(addr),2);
	}

	function getBalance(address addr) returns(uint) {
		return balances[addr];
	}

    function multiply(uint amount) returns (uint d)	{
		return amount * 7;
	}

/*
	function getNombreDeRDVConseiller(address conseillerRef) returns(uint) {
		return 	agenda[conseillerRef].length;
	}
	*/
	function getRDVConseiller() returns(address, address) {
		
		return 	(
			agenda[msg.sender][0].client, 
			agenda[msg.sender][0].fournisseur
			//, agenda[conseillerRef][idRdv].etatDuRdv
		);		
	}    
}
