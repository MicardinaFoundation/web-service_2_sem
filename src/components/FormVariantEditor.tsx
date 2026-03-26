import { Button, Form, Input } from "antd";

export default function (props: any) {
    return (
        <>
                      <Form.Item
                        label="Фамилия"
                        name="namsName"
                        rules={[{ required: true, message: "Введите ваше namsName" }]}
                      >
                        <Input placeholder="Введите namsName" />
                      </Form.Item>
            
                      <Form.Item
                        label="Имя"
                        name="name"
                        rules={[{ required: true, message: "Введите ваше name" }]}
                      >
                        <Input placeholder="Введите name" />
                      </Form.Item>
            
                      <Form.Item
                        label="Номер"
                        name="numb"
                        rules={[{ required: true, message: "Введите ваше numb" }]}
                      >
                        <Input placeholder="Введите numb" type={"number"}/>
                      </Form.Item>
                      <Form.Item
                        label="description"
                        name="description"
                        rules={[{ required: false, message: "Введите description" }]}
                      >
                        <Input placeholder="Введите description" />
                      </Form.Item>
            
                      {/* <Form.Item
                        label="Группа"
                        name="groupId"
                        rules={[{ required: true, message: "Введите ваше groupId" }]}
                      >
                        <Input placeholder="Введите groupId" type={"number"}/>
                      </Form.Item> */}
            
                      <Form.Item>
                        <Button type="primary" htmlType="submit">
                          Отправить
                        </Button>
                      </Form.Item>
            
        </>
    );
}