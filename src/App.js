import React, { Component } from 'react'
import Web3Gate from "./components/web3Gate"
import { inject, observer } from "mobx-react"
import { netContext } from "./constants"

const contractPurchase = require("../build/contracts/Purchase.json")


@inject("web3Store")
@inject("contractStore")
@observer class App extends Component {

  render () {
    //console.log(this.props.contractStore.contracts.get("Purchase"))
    return (
      <Web3Gate 
        networks={[
          netContext.LOCAL,
          netContext.MAIN,
          netContext.ROPESTEN
        ]}
        contracts={[
          contractPurchase
        ]}
      >
        <div className='uk-container'> 
          <h1 className='uk-heading-divider uk-text-center'>Mobx truffle box</h1>
          {this.props.web3Store.account}
          <br/>
          {this.props.web3Store.status}
          <br/>
          {this.props.web3Store.balance}
          <br/>
          {this.props.web3Store.network}
          <br/>
          {this.props.web3Store.balanceEth.balance} {this.props.web3Store.balanceEth.denom}
          <br/>
          {this.props.web3Store.balanceGwei.balance} {this.props.web3Store.balanceGwei.denom}
          <br/>
          {this.props.web3Store.balanceWei.balance} {this.props.web3Store.balanceWei.denom}
        </div>
      </Web3Gate>
    )
  }
}

export default App;
