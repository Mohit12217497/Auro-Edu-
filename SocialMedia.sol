// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SocialMedia {
    struct Post {
        string content;
        address author;
    }

    Post[] public posts;
    mapping(address => uint256) public reputation;

    function createPost(string memory _content) public {
        posts.push(Post(_content, msg.sender));
        reputation[msg.sender]++;
    }

    function getPostCount() public view returns (uint) {
        return posts.length;
    }
}
