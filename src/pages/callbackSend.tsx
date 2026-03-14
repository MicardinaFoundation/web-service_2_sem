import React, { useState } from "react";
import { Form, Input, Button, Modal, Typography } from "antd";

const { Text } = Typography;

interface FormValues {
  name: string;
  email: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const [form] = Form.useForm<FormValues>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submittedData, setSubmittedData] = useState<FormValues | null>(null);

  const handleSubmit = (values: FormValues) => {
    setSubmittedData(values);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Form.Item
          label="Имя"
          name="name"
          rules={[{ required: true, message: "Введите ваше имя" }]}
        >
          <Input placeholder="Введите имя" />
        </Form.Item>

        <Form.Item
          label="Почта"
          name="email"
          rules={[
            { required: true, message: "Введите email" },
            { type: "email", message: "Некорректный email" },
          ]}
        >
          <Input placeholder="Введите email" />
        </Form.Item>

        <Form.Item
          label="Сообщение"
          name="message"
          rules={[{ required: true, message: "Введите сообщение" }]}
        >
          <Input.TextArea rows={4} placeholder="Введите сообщение" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Отправить
          </Button>
        </Form.Item>
      </Form>

      <Modal
        title="Данные Обратки"
        open={isModalOpen}
        onCancel={handleClose}
        footer={[
          <Button key="ok" type="primary" onClick={handleClose}>
            Ок
          </Button>,
        ]}
      >
        {submittedData && (
          <div>
            <div>
              <Text>
                <strong>Имя: </strong>{submittedData.name}
              </Text>
            </div>
            <div>
              <Text>
                <strong>Email: </strong>{submittedData.email}
              </Text>
            </div>
            <div>
              <Text>
                <strong>Сообщение: </strong>
              </Text>
                {submittedData.message}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ContactForm;