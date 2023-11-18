import * as tokenJson from './assets/AnyToken.json';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ethers } from 'ethers';
import * as dotenv from "dotenv";
dotenv.config();

const MINT_VALUE = ethers.parseUnits("1000000");

@Injectable()
export class AppService {
  contract: ethers.Contract;
  provider: ethers.Provider;
  wallet: ethers.Wallet;

  constructor(private configService: ConfigService) {
    this.provider = new ethers.JsonRpcProvider(
      this.configService.get<string>('RPC_ENDPOINT_URL'),
    );
    this.wallet = new ethers.Wallet(
      this.configService.get<string>('PRIVATE_KEY'),
      this.provider,
    );
    this.contract = new ethers.Contract(
      this.configService.get<string>('TOKEN_ADDRESS'),
      tokenJson.abi,
      this.wallet,
    );
  }

  async getVotes(walletAddress: string) {
    const getVotes = await this.contract.getVotes(walletAddress);
    return getVotes.toString();
  }

  async mintToken(walletAddress: string) {
    const MINTER_ROLE = await this.contract.MINTER_ROLE();
    const roleTx = await this.contract.grantRole(
      MINTER_ROLE,
      walletAddress
    );
    await roleTx.wait();
    const mintTx = await this.contract.mint(walletAddress, MINT_VALUE);
    await mintTx.wait();
  }

  async delegate(receiverWallet: string) {
    const delegateTx = await this.contract.delegate(receiverWallet);
    await delegateTx.wait();
  }
}
