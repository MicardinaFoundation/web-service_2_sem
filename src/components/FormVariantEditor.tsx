import { useModel } from "@umijs/max";
import { Button, Form, Input, Select } from "antd";

export default function (props: any) {
  const { options, setOptions } = useModel('variantCathModel');
  const { Option } = Select;
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
        <Input placeholder="Введите numb" type={"number"} />
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
      <Form.Item name='groupId' label='groupId'>
        <Select
          placeholder='Choose'
        >

          {options.map((opt) => (
            <Option key={opt.idChanged} value={opt.idChanged}>
              {opt.cathegories}
            </Option>
          ))}
        </Select>
      </Form.Item>

    </>
  );
}