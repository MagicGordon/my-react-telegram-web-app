import { useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import Header from './components/Header'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <Header/>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

import { Button, ConfigProvider, Divider, Flex, Input, Layout, Space, theme } from 'antd';
import Header from './components/Header';
import Body from './components/Body';
// import { Account, Connection, connect, keyStores } from 'near-api-js';

import * as nearAPI from "near-api-js";

const account_mainnet = new nearAPI.Account(nearAPI.Connection.fromConfig({
  networkId: 'mainnet',
  provider: { type: 'JsonRpcProvider', args: { url: 'https://rpc.mainnet.near.org' } },
  signer: {},
  jsvmAccountId: 'jsvm.mainnet'
}), 'near');

const account_testnet = new nearAPI.Account(nearAPI.Connection.fromConfig({
  networkId: 'testnet',
  provider: { type: 'JsonRpcProvider', args: { url: 'https://rpc.testnet.near.org' } },
  signer: {},
  jsvmAccountId: 'jsvm.testnet'
}), 'testnet');

function App() {

  const [queryTarget, setQueryTarget] = useState<string>();

  // useEffect(() => {
  //   // const account_mainnet = new Account(Connection.fromConfig({
  //   //   networkId: 'mainnet',
  //   //   provider: { type: 'JsonRpcProvider', args: { url: 'https://rpc.mainnet.near.org' } },
  //   //   // signer: { type: 'InMemorySigner', keyStore: config.keyStore },
  //   //   // jsvmAccountId: 'jsvm.mainnet'
  //   // }), 'near');
  //   // const account_mainnet = new Account(new Connection('mainnet', new JsonRpcProvider({ url: 'https://rpc.mainnet.near.org' }), new InMemorySigner(new BrowserLocalStorageKeyStore()), 'jsvm.mainnet'), 'near');
  //   // const account_mainnet = new Account({
  //   //   provider: new JsonRpcProvider({ url: 'https://rpc.mainnet.near.org' }),
  //   // }, 'near');
  //   // async function getAccount() {
  //   //   const { keyStores, connect } = nearAPI;
  //   //   const myKeyStore = new keyStores.BrowserLocalStorageKeyStore();
  //   //   const connectionConfig = {
  //   //     networkId: "testnet",
  //   //     keyStore: myKeyStore, // first create a key store
  //   //     nodeUrl: "https://rpc.testnet.near.org",
  //   //     walletUrl: "https://testnet.mynearwallet.com/",
  //   //     helperUrl: "https://helper.testnet.near.org",
  //   //     explorerUrl: "https://testnet.nearblocks.io",
  //   //   };
  //   //   const nearConnection = await connect(connectionConfig);
  //   //   // const connectionConfig = {
  //   //   //   networkId: "testnet",
  //   //   //   // keyStore: new keyStores.BrowserLocalStorageKeyStore(),
  //   //   //   nodeUrl: "https://rpc.testnet.near.org",
  //   //   //   // walletUrl: "https://testnet.mynearwallet.com/",
  //   //   //   // helperUrl: "https://helper.testnet.near.org",
  //   //   //   // explorerUrl: "https://testnet.nearblocks.io",
  //   //   // };
      
  //   //   // // connect to NEAR
  //   //   // const nearConnection = await connect(connectionConfig);
  //   // }
  //   // getAccount()
  //   // async function name() {
  //   //   const nearPrice = await account_mainnet.viewFunction({
  //   //     contractId: "pyth-oracle.near",
  //   //     methodName: "get_price",
  //   //     args: {
  //   //       price_identifier: "c415de8d2eba7db216527dff4b60e8f3a5311c740dadb233e13e12547e226750"
  //   //     }
  //   //   });
  //   //   console.log(nearPrice)
  //   // }
  //   // name()
  // }, []);

  return (
    <ConfigProvider
      theme={{
        // 1. Use dark algorithm
        algorithm: theme.darkAlgorithm,

        // 2. Combine dark algorithm and compact algorithm
        // algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
      }}
    >
      <Flex gap="middle" wrap="wrap">
        <Layout>
          <Space direction="vertical">
            <Divider>Query Helper</Divider>
            <Header queryTarget={queryTarget} setQueryTarget={setQueryTarget} />
            <Body queryTarget={queryTarget} nearAccount={{account_mainnet, account_testnet}} />
          </Space>
        </Layout>
      </Flex>
    </ConfigProvider>
  )
}

export default App
