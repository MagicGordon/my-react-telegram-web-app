import { Table } from "antd"
import { Account } from "near-api-js"
import { useEffect, useState } from "react"

type resultPropsType = {
  queryTarget: string | undefined,
  nearAccount: {
    account_mainnet: Account,
    account_testnet: Account
  },
  refresh: object
}

// type priceDetail = { 
//   multiplier: string | undefined, 
//   decimals: number | undefined
// }

// type assetPrice = {
//   asset_id: string | undefined,
//   price: priceDetail | undefined
// }

// // type priceInfo = {
// //   timestamp: string | undefined,
// //   recency_duration_sec: number | undefined,
// //   prices: assetPrice[]
// // }


type priceInfo = {
  key: string,
  assetId: string | undefined,
  multiplier: string | undefined,
  decimals: number
}

const columns = [
  {
    title: 'AssetId',
    dataIndex: 'assetId',
    key: 'assetId',
  },
  {
    title: 'Multiplier',
    dataIndex: 'multiplier',
    key: 'multiplier',
  },
  {
    title: 'Decimals',
    dataIndex: 'decimals',
    key: 'decimals',
  },
];


function PriceOracle({ queryTarget, nearAccount, refresh }: resultPropsType) {

  const [data, setDate] = useState<priceInfo[]>();

  useEffect(() => {
    async function update() {
      setDate(undefined)
      const network = queryTarget ? queryTarget.split(' ')[1] : undefined;
      if (network == 'mainnet') {
        const result: priceInfo[] = [];
        const view_result = await nearAccount.account_mainnet.viewFunction({
          contractId: "priceoracle.near",
          methodName: "get_price_data",
          args: {}
        })
        for (let i = 0; i < view_result.prices.length; i++) {
          result.push({
            key: i.toString(),
            assetId: view_result.prices[i].asset_id,
            multiplier: view_result.prices[i].price ? view_result.prices[i].price.multiplier : undefined,
            decimals: view_result.prices[i].price ? view_result.prices[i].price.decimals : undefined,
          })
        }
        setDate(result)
      } else if (network == 'testnet') {
        const result: priceInfo[] = [];
        const view_result = await nearAccount.account_testnet.viewFunction({
          contractId: "priceoracle.testnet",
          methodName: "get_price_data",
          args: {}
        })
        for (let i = 0; i < view_result.prices.length; i++) {
          result.push({
            key: i.toString(),
            assetId: view_result.prices[i].asset_id,
            multiplier: view_result.prices[i].price ? view_result.prices[i].price.multiplier : undefined,
            decimals: view_result.prices[i].price ? view_result.prices[i].price.decimals : undefined,
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

export default PriceOracle
