import { request, Access, Navigate, useAccess, useModel } from "@umijs/max";
import { Button, Form, Input } from "antd";
import { useEffect } from "react";


const DocsPage = () => {

  const access = useAccess();
  const { refresh } = useModel('@@initialState');
  //const { initialState, setlnitialState } = useModel('@@initialState');
    // const loadVariants = () => {
    //   request('/api/Calculator/GetVariant').then((data: Variant[]) => {
    //     ConvertGroupIdToString(data);
    //     setData(data);
    //   })
    // }
  
  useEffect(() => {
    refresh();
  }, [])

  const handleLogin = (data: any) => {
      request('api/auth', { data, method: 'POST' }).then((response: any) => {
      localStorage.setItem('token', response.token);
      refresh();
    })
  }

  return (
    <>
      <Access accessible={!access.isAuth}>
        <Form layout="vertical" onFinish={handleLogin}>
          <Form.Item name="login" label="Login">
            <Input/>
          </Form.Item>
          <Form.Item name="password" label="Password">
            <Input/>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Войти</Button>
          </Form.Item>
        </Form>
      </Access>
      <Access accessible={access.isAuth}>
        <p>User is authorization</p>
        <Navigate to="/studentsList"/>
      </Access>
    </>
  );
};

export default DocsPage;
