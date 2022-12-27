import { Client } from 'dash'

export const getDashAccount = async (mnemonic) => {
  console.log(mnemonic)
  const client = new Client({
    network: 'testnet',
    // seeds: [
    //   {
    //     host: 'seed-1.testnet.networks.dash.org',
    //     httpPort: 3000,
    //     grpcPort: 3010,
    //   },
    // ],
    wallet: {
      mnemonic,
      offlineMode: !mnemonic ? true : false,
      unsafeOptions: {
        skipSynchronizationBeforeHeight: 650000,
      },
    },
  })

  const account = await client.getWalletAccount()
  return {
    address: account.getUnusedAddress().address,
    balance: {
      confirmed: account.getConfirmedBalance(),
      total: account.getTotalBalance(),
    },
    mnemonic: client.wallet.exportWallet(),
  }
}

export const registerIdentity = async (mnemonic) => {
  const client = new Client({
    network: 'testnet',
    wallet: {
      mnemonic,
      unsafeOptions: {
        skipSynchronizationBeforeHeight: 650000,
      },
    },
  })
  const account = await client.getWalletAccount()
  const identities = account.identities.getIdentityIds()
  let identity = (identities || [null])[0]
  if (!identity) {
    identity = await client.platform.identities
      .register()
      .then((d) => d.toJSON())
    identity = (identity || {}).id
  }
  return identity
}
