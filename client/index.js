const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
  // TODO: how do we prove to the server we're on the nice list? 

  const tree = new MerkleTree(niceList);

  console.log(process.argv[2])
  const name = process.argv[2];
  // const name = "Ruben Toy"
  const index = niceList.findIndex(n => n === name);
  const proof = tree.getProof(index);
  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    // TODO: add request body parameters here!

    name, 
    proof,
  });

  console.log({ gift });
}

main();