import { request, Access, Navigate, useAccess, useModel } from "@umijs/max";
import { Button, Form, Input, message } from "antd";
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
      localStorage.setItem('userName', data.login);
      refresh();
    }).catch((resp: any) => {
      let inf = "";
      // switch (resp.response.status) {
      //   case 405:
      //     inf = "Некорректный ответ с сервера!"
      //     break;
      //   default:
      //     inf = "Другая ошибка!"
      //     break;
      // }
      switch (resp.response.status) {
        // --- 4xx Ошибки клиента ---
        case 400:
          inf = "Bad Request: Неверный запрос";
          break;
        case 401:
          inf = "Unauthorized: Требуется авторизация";
          break;
        case 403:
          inf = "Forbidden: Доступ запрещен";
          break;
        case 404:
          inf = "Not Found: Страница не найдена";
          break;
        case 405:
          inf = "Method Not Allowed: Метод не поддерживается";
          break;
        case 408:
          inf = "Request Timeout: Время ожидания истекло";
          break;
        case 429:
          inf = "Too Many Requests: Слишком много запросов";
          break;

        // --- 5xx Ошибки сервера ---
        case 500:
          inf = "Internal Server Error: Ошибка сервера";
          break;
        case 502:
          inf = "Bad Gateway: Ошибка шлюза";
          break;
        case 503:
          inf = "Service Unavailable: Сервис временно недоступен";
          break;
        case 504:
          inf = "Gateway Timeout: Шлюз не отвечает";
          break;

        // --- Значение по умолчанию ---
        default:
          inf = `Unknown Status: Неизвестный код ошибки (${resp.response.status})`;
      }
      message.error(`${inf}. Open console for advanced information`);
      console.log(resp);
    })
  }

  return (
    <>
      <Access accessible={!access.isAuth}>
        <Form layout="vertical" onFinish={handleLogin}>
          <Form.Item name="login" label="Login">
            <Input />
          </Form.Item>
          <Form.Item name="password" label="Password">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Войти</Button>
          </Form.Item>
        </Form>
      </Access>
      <Access accessible={access.isAuth}>
        <p>User is authorization</p>
        <Navigate to="/studentsList" />
      </Access>
    </>
  );
};

export default DocsPage;
