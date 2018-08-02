import { types } from 'mobx-state-tree'
import { web3Context } from "../constants"
import { BigNumber } from 'bignumber.js';


export const Web3Store = types
  .model({
    account: types.optional(types.string, ""),
    web3: types.frozen(),
    balance: types.string,
    network: types.number,
    status: types.enumeration(
      [
        web3Context.WEB3_LOAD_ERR,
        web3Context.WEB3_NET_ERR,
        web3Context.WEB3_LOADED,
        web3Context.WEB3_LOADING,
        web3Context.WEB3_LOCKED,
        web3Context.WEB3_CONTRACT_ERR
      ]
    )
  })
  .actions(self => ({
    setWeb3(_web3) {
      self.web3 = _web3
    },
    setAccount(_account) {
      self.account = _account
      self.updateStatus("LOADED")
    },
    updateStatus(_status) {
      self.status = _status
    },
    updateBalance(_balance) {
      self.balance = _balance
    },
    updateNetwork(_network) {
      self.network = _network
    } 
  }))
  .views(self => ({
    get instance() {
      return self.web3
    },
    get balanceEth() {
      const _bal = new BigNumber(self.balance)
      return {
        balance: _bal.shiftedBy(-18).toString(),
        denom: "eth"
      }
    },
    get balanceGwei() {
      const _bal = new BigNumber(self.balance)
      return {
        balance: _bal.shiftedBy(-9).toString(),
        denom: "gwei"
      }
    },
    get balanceWei() {
      const _bal = new BigNumber(self.balance)
      return {
        balance: _bal.toString(),
        denom: "wei"
      }
    }
  }))
  