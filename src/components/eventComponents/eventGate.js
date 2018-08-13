import React, { Component } from 'react'
import { inject, observer } from "mobx-react"
import { txStatus } from '../../constants';

const etherscan = {
  1: "https://etherscan.io/tx/",
  3: "https://ropesten.etherscan.io/tx/",
  4: "https://rinkeby.etherscan.io/tx/"
}

const txMessage = (_msg, _link) => (
  "<a target=\"_blank\" rel=\"noopener noreferrer\" href=" + _link+ ">" + _msg + "</a>"
)

@inject("web3Store")
@inject("contractStore")
@observer class EventGate extends Component {

  componentDidMount() {
    const { contractStore, web3Store } = this.props
    console.log(contractStore)
    console.log(web3Store)
    const weblink = etherscan[web3Store.network]

    contractStore.txEmitter.on(txStatus.NEW, (hash) => {
      

      contractStore.txEmitter.once(txStatus.PENDING+hash, (data) => {
        
      })

      contractStore.txEmitter.on(txStatus.MINED+hash, (data) => {
        
      })

      contractStore.txEmitter.on(txStatus.FAILED+hash, (data) => {
        
      })
  
      contractStore.txEmitter.on(txStatus.SUCCESS+hash, (data) => {
        
      })
    })

    contractStore.listen("Counter", "Increment", {}, ((err, event) => {
      console.log(event)
    }))
  }
    
  render () {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

export default EventGate;
