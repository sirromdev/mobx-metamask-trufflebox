import { types } from 'mobx-state-tree'

export const ContractInstance = types
  .model({
    name: types.identifier,
    abi: types.frozen(),
    txHash: types.frozen(),
    address: types.string,
    contract: types.frozen(),
    methods: types.optional(types.frozen(), {}),
  })

export const ContractStore = types
  .model({
    contracts: types.map(ContractInstance),
    loaded: types.boolean
  })
  .actions(self => ({
    add(_id, _abi, _txHash, _address, _contract, _methods) {
      self.contracts.set(_id, { 
          name: _id,
          abi: _abi,
          txHash: _txHash,
          address: _address,
          contract: _contract,
          methods:  _methods
        })
    },
    delete(_id) {
      self.contracts.delete(_id)
    },
    toggleLoaded() {
      self.loaded = !self.loaded
    },
    use(_id) {
      if(self.loaded && self.contracts.has(_id)) {
        return self.contracts.get(_id)
      } else {
        return {}
      }      
    }  
  }))
  .views(self => ({
    get keys() {
      return Array.from(self.contracts.keys())
    },
    get values() {
      return Array.from(self.contracts.values())
    },
    get json() {
      return self.contracts.toJSON()
    }    
  }))