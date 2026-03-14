import React, { useState } from 'react';
import { Button, Form, Input, message, Modal, Space, Table, TableProps } from 'antd';
import avatar from '../assets/avatar.png';
import { studentDataSource } from '@/constants/tableData';
//import { studentColumns } from '@/constants/tableColumns';

const DocsPage = () => {
  const [data, setData] = React.useState<Student[]>(studentDataSource);
  //const [submittedData, setSubmittedData] = useState<Student | null>(null);
const studentColumns: TableProps<any>['columns'] = [
  {
    title: 'Фамилия',
    dataIndex: 'lastName',
    key: 'lastName',
  },
  {
    title: 'Имя',
    dataIndex: 'firstName',
    key: 'firstName',
  },
  {
    title: 'Отчество',
    dataIndex: 'midName',
    key: 'midName',
  },
  {
    title: 'Группа',
    dataIndex: 'group',
    key: 'group',
  },
  {
    title: 'Действия',
    key: 'action',
    render: (_, record) => <><a onClick={() => handleStudentRemove(record.id)}>Delete</a></>
  }
]
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleSubmit = (values: Student) => {
    const id = data.length > 0 ? Math.max(...data.map(s => s.id)) : 0;

    values.id = id+1;

    setData([values, ...data])
    console.log(values);
    //setSubmittedData(values);
    form.resetFields();
    setIsModalOpen(false);
  };

const handleStudentRemove = (id: number) => {
  setData(data.filter(x => x.id != id))
}

  React.useEffect(() => {
    message.info("Students list refresshed");
  }, [data])

  return (
    <div>
      <Space>
        <Button onClick={() => setIsModalOpen(true)}>Add Student</Button>
        <span>Количество студентов: {data.length}</span>
      </Space>
      <Table dataSource={data} columns={studentColumns} />;

      <Modal
        title="New students"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}

        >
          <Form.Item
            label="Фамилия"
            name="lastName"
            rules={[{ required: true, message: "Введите ваше lastName" }]}
          >
            <Input placeholder="Введите lastName" />
          </Form.Item>

          <Form.Item
            label="Имя"
            name="firstName"
            rules={[{ required: true, message: "Введите ваше firstName" }]}
          >
            <Input placeholder="Введите firstName" />
          </Form.Item>

          <Form.Item
            label="Отчество"
            name="midName"
            rules={[{ required: false, message: "Введите ваше midName" }]}
          >
            <Input placeholder="Введите midName" />
          </Form.Item>

          <Form.Item
            label="Группа"
            name="group"
            rules={[{ required: true, message: "Введите ваше group" }]}
          >
            <Input placeholder="Введите group" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Отправить
            </Button>
          </Form.Item>
        </Form>
      </Modal>

    </div>
  );
};

export default DocsPage;
