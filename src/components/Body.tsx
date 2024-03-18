import { Button, Divider } from "antd"
import Pyth from "./Query/Pyth"
import PriceOracle from "./Query/PriceOracle";
import { Account } from "near-api-js";
import { useState } from "react";


type propsType = {
  queryTarget: string | undefined,
  nearAccount: {
    account_mainnet: Account, 
    account_testnet: Account
  },
}

function Body({ queryTarget, nearAccount }: propsType) {

  const [refresh, setRefresh] = useState(new Date());

  const onClick = () => {
    setRefresh(new Date())
  };

  return (
    <>
      <Button type="primary" onClick={onClick}>Refresh</Button>
      <Divider>Result</Divider>
      <ShowResult queryTarget={queryTarget} nearAccount={nearAccount} refresh={refresh} />
    </>
  )
}


type resultPropsType = {
  queryTarget: string | undefined,
  nearAccount: {
    account_mainnet: Account, 
    account_testnet: Account
  },
  refresh: object
}

function ShowResult({ queryTarget, nearAccount, refresh }: resultPropsType) {
  const quer_type = queryTarget ? queryTarget.split(' ')[0] : 'none';
  switch (quer_type) {
    case 'pyth':
      return <Pyth queryTarget={queryTarget} nearAccount={nearAccount} refresh={refresh} />;
    case 'priceoracle':
      return <PriceOracle queryTarget={queryTarget} nearAccount={nearAccount} refresh={refresh} />;
    case 'none':
      return null;
    default:
      return <h1>Invalid Select</h1>;
  }
}

export default Body
