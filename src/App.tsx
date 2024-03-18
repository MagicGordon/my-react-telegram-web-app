import { useState } from 'react'

import { ConfigProvider, Divider, Flex, Layout, Space, theme } from 'antd';
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
