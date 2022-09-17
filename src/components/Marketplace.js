import Navbar from "./Navbar";
import NFTTile from "./NFTTile";
import MarketplaceJSON from "../Marketplace.json";
import axios from "axios";
import { useState } from "react";

export default function Marketplace() {
    const sampleData = [
        {
            "name": "NFT#1",
            "description": "Alchemy's First NFT",
            "website": "http://axieinfinity.io",
            "image": "https://gateway.pinata.cloud/ipfs/QmTsRJX7r5gyubjkdmzFrKQhHv74p5wT9LdeF1m3RTqrE5",
            "price": "0.03ETH",
            "currentlySelling": "True",
            "address": "0xe81Bf5A757CB4f7F82a2F23b1e59bE45c33c5b13",
        },
        {
            "name": "NFT#2",
            "description": "Alchemy's Second NFT",
            "website": "http://axieinfinity.io",
            "image": "https://gateway.pinata.cloud/ipfs/QmdhoL9K8my2vi3fej97foiqGmJ389SMs55oC5EdkrxF2M",
            "price": "0.03ETH",
            "currentlySelling": "True",
            "address": "0xe81Bf5A757C4f7F82a2F23b1e59bE45c33c5b13",
        },
        {
            "name": "NFT#3",
            "description": "Alchemy's Third NFT",
            "website": "http://axieinfinity.io",
            "image": "https://gateway.pinata.cloud/ipfs/QmTsRJX7r5gyubjkdmzFrKQhHv74p5wT9LdeF1m3RTqrE5",
            "price": "0.03ETH",
            "currentlySelling": "True",
            "address": "0xe81Bf5A757C4f7F82a2F23b1e59bE45c33c5b13",
        },
    ];
    const [data, updateData] = useState(sampleData);
    const [dataFetched, updateFetched] = useState(false);

    const api_key = process.env.REACT_APP_ALCHEMY_API_KEY;
    const baseURL = `https://eth-goerli.g.alchemy.com/nft/v2/${api_key}`;

    async function getAllNFTsAlchemy() {
        // Construct the axios request:
        var config = {
            method: 'get',
            url: `${baseURL}/getNFTsForCollection/?contractAddress=${MarketplaceJSON.address}&withMetadata=${"true"}`
        };

        // Make the request and print the formatted response:
        axios(config)
            .then(response => {
                // console.log(JSON.stringify(response.data, null, 2));

                // convert response to items used in state
                const items = response.data.nfts.map(nft => {
                    let item = {
                        price: nft.metadata.price,
                        tokenId: nft.id.tokenId,
                        // seller: i.seller,
                        owner: nft.contract.address,
                        image: nft.media[0].gateway,
                        name: nft.metadata.name,
                        description: nft.metadata.description,
                    }
                    return item;
                });
                console.log(items);
                updateFetched(true);
                updateData(items);
            })
            .catch(error => console.log("getAllNftsAlchemy failed: ", error));
    }

    // async function getAllNFTs() {
    //     const ethers = require("ethers");
    //     //After adding your Hardhat network to your metamask, this code will get providers and signers
    //     const provider = new ethers.providers.Web3Provider(window.ethereum);
    //     const signer = provider.getSigner();
    //     //Pull the deployed contract instance
    //     let contract = new ethers.Contract(MarketplaceJSON.address, MarketplaceJSON.abi, signer)
    //     //create an NFT Token
    //     let transaction = await contract.getAllNFTs()

    //     //Fetch all the details of every NFT from the contract and display
    //     const items = await Promise.all(transaction.map(async i => {
    //         const tokenURI = await contract.tokenURI(i.tokenId);
    //         let meta = await axios.get(tokenURI);
    //         meta = meta.data;

    //         let price = ethers.utils.formatUnits(i.price.toString(), 'ether');
    //         let item = {
    //             price,
    //             tokenId: i.tokenId.toNumber(),
    //             seller: i.seller,
    //             owner: i.owner,
    //             image: meta.image,
    //             name: meta.name,
    //             description: meta.description,
    //         }
    //         return item;
    //     }))

    //     updateFetched(true);
    //     updateData(items);
    // }

    if (!dataFetched)
        getAllNFTsAlchemy();

    return (
        <div>
            <Navbar></Navbar>
            <div className="flex flex-col place-items-center mt-20">
                <div className="md:text-xl font-bold text-white">
                    Top NFTs
                </div>
                <div className="flex mt-5 justify-between flex-wrap max-w-screen-xl text-center">
                    {data.map((value, index) => {
                        return <NFTTile data={value} key={index}></NFTTile>;
                    })}
                </div>
            </div>
        </div>
    );

}