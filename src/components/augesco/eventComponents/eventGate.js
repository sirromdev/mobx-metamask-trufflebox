import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { txStatus } from "../../../constants";
import { notification, Icon } from "antd";

const etherscan = {
  1: "https://etherscan.io/tx/",
  3: "https://ropesten.etherscan.io/tx/",
  4: "https://rinkeby.etherscan.io/tx/"
};

const txMessage = (_msg, _link) => (
  <a target="_blank" rel="noopener noreferrer" href={_link}>
    {_msg}
  </a>
);

@inject("augesco")
@observer
class EventGate extends Component {
  componentDidMount() {
    const { augesco } = this.props;
    const weblink = etherscan[augesco.network];

    augesco.witness.on(txStatus.NEW, hash => {
      notification.open({
        key: hash,
        message: txMessage(
          "Tx: " + hash.substring(0, 12) + "... broadcasted",
          weblink + hash
        ),
        description: "A new transaction has been submitted to the blockchain",
        duration: 0,
        icon: <Icon type="to-top" style={{ color: "blue" }} />
      });

      augesco.witness.once(txStatus.PENDING + hash, data => {
        notification.open({
          key: hash,
          message: txMessage(
            "Tx: " + hash.substring(0, 12) + "... pending",
            weblink + hash
          ),
          description: "This transaction is waiting to be mined",
          icon: <Icon type="loading" style={{ color: "green" }} spin />,
          duration: 0
        });
      });

      augesco.witness.on(txStatus.MINED + hash, data => {
        notification.open({
          key: hash,
          message: txMessage(
            "Tx: " + hash.substring(0, 12) + "... mined",
            weblink + hash
          ),
          description: "This transaction has been mined",
          icon: <Icon type="tool" style={{ color: "black" }} />,
          duration: 0
        });
      });

      augesco.witness.on(txStatus.FAILED + hash, data => {
        notification.open({
          key: hash,
          message: txMessage(
            "Tx: " + hash.substring(0, 12) + "... failed",
            weblink + hash
          ),
          description: "This transaction has failed!",
          icon: <Icon type="close-square" style={{ color: "red" }} />,
          duration: 10
        });
      });

      augesco.witness.on(txStatus.SUCCESS + hash, data => {
        notification.open({
          key: hash,
          message: txMessage(
            "Tx: " + hash.substring(0, 12) + "... succeeded",
            weblink + hash
          ),
          description: "This transaction has succeeded!",
          icon: <Icon type="safety" style={{ color: "green" }} />,
          duration: 10
        });
      });
    });
  }

  componentWillUnmount() {
    const { augesco } = this.props;
    augesco.stopNewBlocks();
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default EventGate;