// App.js - Main React Component
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import SocialMediaABI from "./abis/SocialMedia.json";
import { Button } from "./components/ui/button";

const CONTRACT_ADDRESS = "YOUR_CONTRACT_ADDRESS_HERE"; // Replace after deployment

export default function App() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const prov = new ethers.providers.Web3Provider(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const signer = prov.getSigner();
        const contract = new ethers.Contract(CONTRACT_ADDRESS, SocialMediaABI.abi, signer);

        const accounts = await prov.listAccounts();
        setAccount(accounts[0]);
        setProvider(prov);
        setSigner(signer);
        setContract(contract);

        loadPosts(contract);
      }
    };
    init();
  }, []);

  const loadPosts = async (contract) => {
    const postCount = await contract.getPostCount();
    const posts = [];
    for (let i = 0; i < postCount; i++) {
      const post = await contract.posts(i);
      posts.push(post);
    }
    setPosts(posts);
  };

  const createPost = async () => {
    const tx = await contract.createPost(content);
    await tx.wait();
    loadPosts(contract);
    setContent("");
  };

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-4">Decentralized Social Media</h1>
      <p className="text-sm mb-2">Connected as: {account}</p>
      <textarea
        className="w-full p-2 border rounded mb-2"
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button onClick={createPost}>Post</Button>
      <div className="mt-4 space-y-4">
        {posts.map((post, idx) => (
          <div key={idx} className="p-4 border rounded shadow">
            <p>{post.content}</p>
            <p className="text-sm text-gray-500">By: {post.author}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
