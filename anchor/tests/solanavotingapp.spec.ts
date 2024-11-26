import * as anchor from '@coral-xyz/anchor'
import {Program} from '@coral-xyz/anchor'
import {Keypair} from '@solana/web3.js'
import {Solanavotingapp} from '../target/types/solanavotingapp'
import { assert } from 'console'

describe('solanavotingapp', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const payer = provider.wallet as anchor.Wallet

  const program = anchor.workspace.Solanavotingapp as Program<Solanavotingapp>

  const solanavotingappKeypair = Keypair.generate()

  it('Initialize Solanavotingapp', async () => {
    await program.methods
      .initialize()
      .accounts({
        solanavotingapp: solanavotingappKeypair.publicKey,
        payer: payer.publicKey,
      })
      .signers([solanavotingappKeypair])
      .rpc()

    const currentCount = await program.account.solanavotingapp.fetch(solanavotingappKeypair.publicKey)

    expect(currentCount.count).toEqual(0)
  })

 

  it('Increment Solanavotingapp', async () => {
    await program.methods.increment().accounts({ solanavotingapp: solanavotingappKeypair.publicKey }).rpc()

    const currentCount = await program.account.solanavotingapp.fetch(solanavotingappKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Increment Solanavotingapp Again', async () => {
    await program.methods.increment().accounts({ solanavotingapp: solanavotingappKeypair.publicKey }).rpc()

    const currentCount = await program.account.solanavotingapp.fetch(solanavotingappKeypair.publicKey)

    expect(currentCount.count).toEqual(2)
  })

  

  it('Decrement Solanavotingapp', async () => {
    await program.methods.decrement().accounts({ solanavotingapp: solanavotingappKeypair.publicKey }).rpc()

    const currentCount = await program.account.solanavotingapp.fetch(solanavotingappKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Set solanavotingapp value', async () => {
    await program.methods.set(42).accounts({ solanavotingapp: solanavotingappKeypair.publicKey }).rpc()

    const currentCount = await program.account.solanavotingapp.fetch(solanavotingappKeypair.publicKey)

    expect(currentCount.count).toEqual(42)
  })

  it('Set close the solanavotingapp account', async () => {
    await program.methods
      .close()
      .accounts({
        payer: payer.publicKey,
        solanavotingapp: solanavotingappKeypair.publicKey,
      })
      .rpc()

    // The account should no longer exist, returning null.
    const userAccount = await program.account.solanavotingapp.fetchNullable(solanavotingappKeypair.publicKey)
    expect(userAccount).toBeNull()
  })

  it('Fails to increment when account is not initialized', async () => {
    const uninitializedAccount = Keypair.generate();
    try {
      await program.methods
        .increment()
        .accounts({
          solanavotingapp: uninitializedAccount.publicKey, // Non-existent account
        })
        .rpc();
      throw new Error('Test failed: Increment should not succeed for uninitialized account');
    } catch (err) {
      const error = err as Error;
      expect(error.message).toContain(error.message);
    }
  });

  it('Fails to decrement when count is zero', async () => {
    const emptyAccount = Keypair.generate();

    // Initialize with count = 0
    await program.methods
      .initialize()
      .accounts({
        solanavotingapp: emptyAccount.publicKey,
        payer: payer.publicKey,
      })
      .signers([emptyAccount])
      .rpc();

    // Try to decrement below zero
    try {
      await program.methods
        .decrement()
        .accounts({
          solanavotingapp: emptyAccount.publicKey,
        })
        .rpc();
      throw new Error('Test failed: Decrement should not succeed when count is zero');
    } catch (err) {
      const error = err as Error;

      expect(error.message).toContain(error.message);
    }
  });

  it('Fails to set an invalid value', async () => {
    try {
      await program.methods
        .set(300) // Exceeds u8 max value (255)
        .accounts({
          solanavotingapp: solanavotingappKeypair.publicKey,
        })
        .rpc();
      throw new Error('Test failed: Setting invalid value should not succeed');
    } catch (err) {
      const error = err as Error;

      expect(error.message).toContain(error.message);
    }
  });

  it('Fails to close the account when payer is incorrect', async () => {
    const otherPayer = Keypair.generate(); // A different signer
    try {
      await program.methods
        .close()
        .accounts({
          payer: otherPayer.publicKey, // Incorrect payer
          solanavotingapp: solanavotingappKeypair.publicKey,
        })
        .signers([otherPayer])
        .rpc();
      throw new Error('Test failed: Close should not succeed with incorrect payer');
    } catch (err) {
      const error = err as Error;

      expect(error.message).toContain(error.message);
    }
  });

  it('Fails to initialize an account that already exists', async () => {
    try {
      await program.methods
        .initialize()
        .accounts({
          solanavotingapp: solanavotingappKeypair.publicKey, // Reusing an existing account
          payer: payer.publicKey,
        })
        .signers([solanavotingappKeypair])
        .rpc();
      throw new Error('Test failed: Account initialization should not succeed');
    } catch (err) {
      const error  = err as Error;
      expect(error.message).toContain(error.message);
    }
  });
})
