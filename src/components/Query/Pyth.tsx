import { Table, TableProps } from "antd";
import { Account } from "near-api-js"
import { useEffect, useState } from "react";

type resultPropsType = {
  queryTarget: string | undefined,
  nearAccount: {
    account_mainnet: Account,
    account_testnet: Account
  },
  refresh: object
}

type priceInfo = {
  key: string,
  label: string | undefined,
  price: string | undefined,
  conf: string | undefined,
  expo: number | undefined,
  publish_time: number | undefined,
}

const price_identifiers_mainnet = {
  "USDT/USD": "2b89b9dc8fdf9f34709a5b106b472f0f39bb6ca9ce04b0fd7f2e971688e2e53b",
  "NEAR/USD": "c415de8d2eba7db216527dff4b60e8f3a5311c740dadb233e13e12547e226750",
  "AURORA/USD": "2f7c4f738d498585065a4b87b637069ec99474597da7f0ca349ba8ac3ba9cac5",
  "DAI/USD": "b0948a5e5313200c632b51bb5ca32f6de0d36e9950a942d19751e833f70dabfd",
  "USDC/USD": "eaa020c61cc479712813461ce153894a96a6c00b21ed0cfc2798d1f9a9e9c94a",
  "ETH/USD": "ff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace",
  "WBTC/USD": "c9d8b075a5c69303365ae23633d4e085199bf5c520a3b90fed1322a0342ffc33",
  "WOO/USD": "b82449fd728133488d2d41131cffe763f9c1693b73c544d9ef6aaa371060dd25",
  "FRAX/USD": "c3d5d8d6d17081b3d0bbca6e2fa3a6704bb9a9561d9f9e1dc52db47629f862ad",
}

const price_identifiers_testnet = {
  "USDT/USD": "1fc18861232290221461220bd4e2acd1dcdfbc89c84092c93c18bdc7756c1588",
  "NEAR/USD": "27e867f0f4f61076456d1a73b14c7edc1cf5cef4f4d6193a33424288f11bd0f4",
  "AURORA/USD": "eb00e1f858549e12034ff880b7592456a71b4237aaf4aeb16e63cd9b68ba4d7e",
  "DAI/USD": "87a67534df591d2dd5ec577ab3c75668a8e3d35e92e27bf29d9e2e52df8de412",
  "USDC/USD": "41f3625971ca2ed2263e78573fe5ce23e13d2558ed3f2e47ab0f84fb9e7ae722",
  "ETH/USD": "ca80ba6dc32e08d06f1aa886011eed1d77c77be9eb761cc10d72b7d0a2fd57a6",
  "WBTC/USD": "ea0459ab2954676022baaceadb472c1acc97888062864aa23e9771bae3ff36ed",
  "WOO/USD": "bf517e0f7ccfc307f0b2fa93b99a737641933989af6af769c928725989c21e66",
  "FRAX/USD": "a46737d6e4686b9cddd59725c9564f851aae93efa37c52f46d9fbcbe03d0344d",
}

const columns: TableProps<priceInfo>['columns'] = [
  {
    title: 'Label',
    dataIndex: 'label',
    key: 'label',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Conf',
    dataIndex: 'conf',
    key: 'conf',
  },
  {
    title: 'Expo',
    dataIndex: 'expo',
    key: 'expo',
  },
  {
    title: 'PublishTime',
    dataIndex: 'publish_time',
    key: 'publish_time',
    render: (text) => text ? new Date(text * 1000).toLocaleString() : text,
  },
];

function Pyth({ queryTarget, nearAccount, refresh }: resultPropsType) {

  const [data, setDate] = useState<priceInfo[]>();

  useEffect(() => {
    async function update() {
      setDate(undefined)
      const network = queryTarget?.split(' ')[1];
      const method = queryTarget?.split(' ')[2] == 'safe' ? 'get_price' : 'get_price_unsafe';
      if (network == 'mainnet') {
        const price_labels: string[] = [];
        const price_promises: Promise<priceInfo>[] = [];

        Object.entries(price_identifiers_mainnet).forEach(([price_label, price_identifier]) => {
          price_labels.push(price_label);
          price_promises.push(nearAccount.account_mainnet.viewFunction({
            contractId: "pyth-oracle.near",
            methodName: method,
            args: {
              price_identifier: price_identifier
            }
          }));
        });
        const price_results: priceInfo[] = await Promise.all(price_promises);
        const result: priceInfo[] = [];
        for (let i = 0; i < price_labels.length; i++) {
          result.push({
            key: i.toString(),
            label: price_labels[i],
            price: price_results[i] == null ? undefined : price_results[i].price,
            conf: price_results[i] == null ? undefined : price_results[i].conf,
            expo: price_results[i] == null ? undefined : price_results[i].expo,
            publish_time: price_results[i] == null ? undefined : price_results[i].publish_time,
          })
        }
        setDate(result)
      } else if (network == 'testnet') {
        const price_labels: string[] = [];
        const price_promises: Promise<priceInfo>[] = [];

        Object.entries(price_identifiers_testnet).forEach(([price_label, price_identifier]) => {
          price_labels.push(price_label);
          price_promises.push(nearAccount.account_testnet.viewFunction({
            contractId: "pyth-oracle.testnet",
            methodName: method,
            args: {
              price_identifier: price_identifier
            }
          }));
        });
        const price_results: priceInfo[] = await Promise.all(price_promises);
        const result: priceInfo[] = [];
        for (let i = 0; i < price_labels.length; i++) {
          result.push({
            key: i.toString(),
            label: price_labels[i],
            price: price_results[i] == null ? undefined : price_results[i].price,
            conf: price_results[i] == null ? undefined : price_results[i].conf,
            expo: price_results[i] == null ? undefined : price_results[i].expo,
            publish_time: price_results[i] == null ? undefined : price_results[i].publish_time,
          })
        }
        setDate(result)
      }
    }
    update()
  }, [nearAccount.account_mainnet, nearAccount.account_testnet, queryTarget, refresh]);

  return (
    <>
      <Table dataSource={data} columns={columns} />
    </>
  )
}

export default Pyth
