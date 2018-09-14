import React, { Component } from 'react';
import { Layout } from 'antd';

const { Content } = Layout;

class Landing extends Component {
  render() {
    return (
      <Layout style={{ padding: '24px 24px 24px' }}>
        <Content
          style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}
        >
          Landing
        </Content>
      </Layout>
    );
  }
}

export default Landing;
