import '@nomiclabs/hardhat-ethers'
import '@nomicfoundation/hardhat-toolbox'
import 'hardhat-deploy'

import fs from 'fs'

import { HardhatUserConfig } from 'hardhat/config'
import { NetworkUserConfig } from 'hardhat/src/types/config'

const privateKeyFileName = process.env.PRIVATE_KEY_FILE
let privateKey = 'test '.repeat(11) + 'junk'
if (privateKeyFileName != null && fs.existsSync(privateKeyFileName)) {
  console.warn('Hardhat does not seem to ')
  privateKey = fs.readFileSync(privateKeyFileName, 'ascii').replace(/(\r\n|\n|\r)/gm, '')
}

const infuraUrl = (name: string): string => `https://${name}.infura.io/v3/${process.env.INFURA_ID}`

function getNetwork (url: string): NetworkUserConfig {
  return {
    url,
    accounts: [privateKey]
  }
}

function getInfuraNetwork (name: string): NetworkUserConfig {
  return getNetwork(infuraUrl(name))
}

const config: HardhatUserConfig = {
  typechain: {
    outDir: 'src/types',
    target: 'ethers-v5'
  },
  networks: {
    localhost: {
      url: 'http://localhost:8545/'
    },
    goerli: getInfuraNetwork('goerli'),
    mumbai: {
      url: 'https://polygon-mumbai.g.alchemy.com/v2/ftxADEn4GBca7w-Bq4pM1N9Nyq4XHAGe',
      accounts: [privateKey]
    }
  },
  solidity: {
    version: '0.8.15',
    settings: {
      optimizer: { enabled: true }
    }
  }
}

export default config
