import { Link, Outlet } from 'umi';
import styles from './index.less';
import { Breadcrumb, Layout, Menu, theme } from 'antd';

const { Header, Content, Footer } = Layout;

const items = [
  {
    key: 'home',
    label: <Link to="/">Дом</Link>
  },
  {
    key: 'docs',
    label: <Link to="/docs">О программе</Link>
  },
  {
    key: 'callbackSend',
    label: <Link to="/callbackSend">Обратная связь</Link>
  }
]


export default function LayoutPage() {
  return (

    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={items}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Content style={{ padding: '0 48px' }}>
        <Breadcrumb
          style={{ margin: '16px 0' }}
          items={[{ title: 'Home' }, { title: 'List' }, { title: 'App' }]}
        />
        <div
          // style={{
          //   background: colorBgContainer,
          //   minHeight: 280,
          //   padding: 24,
          //   borderRadius: borderRadiusLG,
          // }}
        >
          <Outlet />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>

    // <div className={styles.navs}>
    //   <ul>
    //     <li>
    //       
    //     </li>
    //     <li>
    //       
    //     </li>
    //     <li>
    //       <a href="https://github.com/umijs/umi">Github</a>
    //     </li>
    //   </ul>
    //   <Outlet />
    // </div>
  );
}
