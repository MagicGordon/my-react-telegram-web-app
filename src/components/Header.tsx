// import { DownOutlined } from '@ant-design/icons';
// import type { MenuProps } from 'antd';
import { TreeSelect, Space } from 'antd';
import { useEffect, useState } from 'react';

// const handleChange = (value: string) => {
//   console.log(`selected ${value}`);
// };
type propsType = {
  queryTarget: string | undefined,
  setQueryTarget: (s: string) => void
}

function Header({ queryTarget, setQueryTarget }: propsType) {

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth - 20,
        height: window.innerHeight
      });
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const treeData = [
    {
      value: 'testnet',
      title: 'testnet',
      children: [
        {
          value: 'pyth testnet safe',
          title: 'Pyth',
        },
        {
          value: 'pyth testnet unsafe',
          title: 'Pyth unsafe',
        },
        {
          value: 'priceoracle testnet',
          title: 'PriceOracle',
        },
      ],
    },
    {
      value: 'mainnet',
      title: 'mainnet',
      children: [
        {
          value: 'pyth mainnet safe',
          title: 'Pyth',
        },
        {
          value: 'pyth mainnet unsafe',
          title: 'Pyth unsafe',
        },
        {
          value: 'priceoracle mainnet',
          title: 'PriceOracle',
        },
      ],
    },
  ];

  const onChange = (newValue: string) => {
    setQueryTarget(newValue);
  };

  return (
    <>
      <div className="space-align-container">
        <div className="space-align-block">
          <Space align="center">
            <TreeSelect
              showSearch
              style={{ width: windowSize.width }}
              value={queryTarget}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              placeholder="Please select"
              allowClear
              treeDefaultExpandAll
              onChange={onChange}
              treeData={treeData}
            />
          </Space>
        </div>
      </div>

    </>
  )
}

export default Header
