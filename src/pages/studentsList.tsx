import React, { useEffect, useState } from 'react';
import { Button, Form, Input, MenuProps, message, Modal, Popconfirm, Select, Space, Table, TableProps, Typography } from 'antd';
//import avatar from '../assets/avatar.png';
import { cathegoriesSource, studentDataSource } from '@/constants/tableData';
import { Access, Navigate, request, useAccess, history } from '@umijs/max';
import FormVariantEditor from '@/components/FormVariantEditor';
//import { studentColumns } from '@/constants/tableColumns';
const { Option } = Select;
const DocsPage = () => {
  const [data, setData] = React.useState<Variant[]>(studentDataSource);
  const [options, setOptions] = useState<Category[]>(cathegoriesSource);
  //const [submittedData, setSubmittedData] = useState<Student | null>(null);
  const studentColumns: TableProps<any>['columns'] = [
    {
      title: 'Имя',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Фамилия',
      dataIndex: 'namsName',
      key: 'namsName',
    },
    {
      title: 'Описание',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Number',
      dataIndex: 'numb',
      key: 'numb',
    },
    {
      title: 'GroupId',
      dataIndex: 'groupId',
      key: 'groupId',
      width: 150
    },
    {
      title: 'createdAt',
      dataIndex: 'createdAt',
      key: 'numb',
    },
    {
      title: 'updatedAt',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
    },
    {
      title: 'Действия',
      key: 'action',
      render: (_, record) => <Space>
        <a onClick={() => handleStudentEditStart(record.id)}>Edit</a>
        <a onClick={() => handleDiplicate(record.id)}>Diplicate</a>
        <Popconfirm
          title="Delete this value?"
          okText="Yes"
          onConfirm={() => handleStudentRemove(record.id)}
          cancelText="No"
        >
          <a>Delete</a>
        </Popconfirm>



      </Space>
    }
  ]
  const items: MenuProps['items'] = [
    {
      key: '0',
      label: 'Item 1',
    },
    {
      key: '1',
      label: 'Item 2',
    },
    {
      key: '2',
      label: 'Item 3',
    },
  ];
  const loadVariants = () => {
    request('/api/Calculator/GetVariant').then((data: Variant[]) => {
      ConvertGroupIdToString(data);
      setData(data);
    }).catch((resp: any) => {
      message.error(errorHandlr(resp.response.status))
    })
    
  }
  const loadCategories = () => {
    request('/api/Calculator/CategoriesList').then((data: Category[]) => {
      setOptions(data);
    }).catch((resp: any) => {
      message.error(errorHandlr(resp.response.status))
    })
  }
  function ConvertGroupIdToString(data: Variant[]) {
    if (options == null) loadCategories;
    data.forEach((el) => {
      if (parseInt(el.groupId) < options.length) el.groupId = options[parseInt(el.groupId)].cathegories;
      else el.groupId = `<NULL GROUP FOR THIS ID> | <ID = ${el.groupId}> <${el.name}>`
    })
    return data
  }
  useEffect(() => {

    loadCategories();
    loadVariants();

  }, [])
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);

  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalCreateOpen(true);
  };

  const handleOk = () => {
    setIsModalCreateOpen(false);
  };

  const handleCreateCancel = () => {
    setIsModalCreateOpen(false);
    form.resetFields();
  };
  const handleEditCancel = () => {
    setIsModalEditOpen(false);
    form.resetFields();
  };
  const handleSubmit = (values: Variant) => {
    request('/api/Calculator/', { method: 'PUT', data: values }).then((newRow: Variant) => {
      setData([newRow, ...data])
    }).catch((resp: any) => {
      message.error(errorHandlr(resp.response.status))
    }).finally(() => {
      form.resetFields();
      setIsModalCreateOpen(false);
    })
    // const id = data.length > 0 ? Math.max(...data.map(s => s.id)) : 0;

    // values.id = id+1;

    // setData([values, ...data])
    // console.log(values);
    // //setSubmittedData(values);
  };

  const handleStudentRemove = (id: number) => {
    request(`/api/Calculator?id=${id}`, { method: 'DELETE' }).then((newRow: Variant) => {
      loadVariants();
    }).catch((resp: any) => {
      message.error(errorHandlr(resp.response.status))
    }).finally(() => {
      form.resetFields();
      setIsModalCreateOpen(false);
    })


    setData(data.filter(x => x.id != id))
  }

  // const handleCategories = () => {
  //   request(`/api/Calculator/CategoriesList`).then((newRow: Category) => {
  //     console.log(newRow)
  //   }).catch(() => {

  //   })
  // }


  const handleStudentEditStart = (id: number) => {
    request(`/api/Calculator/${id}`).then((data: any) => {
      form.setFieldsValue(data);
      console.log(data)
      setIsModalEditOpen(true);
    }).catch((resp: any) => {
      message.error(errorHandlr(resp.response.status))
    })
  }

  const handleDiplicate = (id: number) => {
    request(`/api/Calculator/DiplicateVariant${id}`, { method: 'PUT', data: id }).then((data: any) => {
      loadVariants();
      console.log(data)
    }).catch((resp: any) => {
      message.error(errorHandlr(resp.response.status) + `. /api/Calculator/DiplicateVariant${id}`)
    })
  }

  const handleStudentEdit = (values: Variant) => {
    request(`/api/Calculator`, { method: 'PATCH', data: values }).then((newRow: Variant) => {
      loadVariants();
      //console.log([newRow, ...data])
    }).catch((resp: any) => {
      message.error(errorHandlr(resp.response.status))
    }).finally(() => {
      form.resetFields();
      setIsModalEditOpen(false);
    })


    //setData(data.filter(x => x.id != id))
  }
  const handleSearch = (values: any) => {
    request(`/api/Calculator`, { method: 'POST', data: values }).then((newRow: Variant[]) => {
      setData(newRow);
      //console.log([newRow, ...data])
    }).catch((resp: any) => {
      message.error(errorHandlr(resp.response.status))
    })

  }

  function errorHandlr(resp: number) {
    switch (resp) {
      case 400:
        return "Bad Request: Неверный запрос";
      case 401:
        return "Unauthorized: Требуется авторизация";
      case 403:
        return "Forbidden: Доступ запрещен";
      case 404:
        return "Not Found: Страница не найдена";
      case 405:
        return "Method Not Allowed: Метод не поддерживается";
      case 408:
        return "Request Timeout: Время ожидания истекло";
      case 429:
        return "Too Many Requests: Слишком много запросов";
      case 500:
        return "Internal Server Error: Ошибка сервера";
        break;
      case 502:
        return "Bad Gateway: Ошибка шлюза";
        break;
      case 503:
        return "Service Unavailable: Сервис временно недоступен";
        break;
      case 504:
        return "Gateway Timeout: Шлюз не отвечает";
      default:
        return `Unknown Status: Неизвестный код ошибки (${resp})`;
    }

  }
  const access = useAccess();

  const join = () => {
    history.push('/join');
  };

  React.useEffect(() => {
    //message.info("Students list refresshed");
  }, [data])

  return (
    <div>
      <Access accessible={!access.isAuth}>
        <Space>
          <span>User is not authorization</span>
          <Button onClick={join}>Join</Button>
        </Space>

      </Access>
      <Access accessible={access.isAuth}>
        <p>User is authorization</p>
        <Space>
          <Button onClick={() => setIsModalCreateOpen(true)}>Add Student</Button>
          <span>Количество студентов: {data.length}</span>
        </Space>
        <Form layout='inline' onFinish={handleSearch}>
          <Form.Item name='name' label='Name'>
            <Input />
          </Form.Item>
          <Form.Item name='namsName' label='namsName'>
            <Input />
          </Form.Item>

          <Form.Item name='groupId' label='groupId'>
            <Select
              placeholder='Choose'
              defaultValue={0}
            >
              {options.map((opt) => (
                <Option key={opt.idChanged} value={opt.idChanged}>
                  {opt.cathegories}
                </Option>
              ))}
              <Option key="-1" value={-1}>
                All
              </Option>

            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Find
            </Button>
          </Form.Item>

        </Form>

        <Table dataSource={data} columns={studentColumns} />;

        <Modal
          title="New students"
          closable={{ 'aria-label': 'Custom Close Button' }}
          open={isModalCreateOpen}
          onOk={() => setIsModalCreateOpen(false)}
          onCancel={(handleCreateCancel)}
          footer={null}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}

          >
            <FormVariantEditor />
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

          </Form>
        </Modal>
        <Modal
          title="Edit students"
          closable={{ 'aria-label': 'Custom Close Button' }}
          open={isModalEditOpen}
          onCancel={(handleEditCancel)}
          footer={null}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleStudentEdit}

          >
            <Form.Item name="id" hidden>
              <Input />
            </Form.Item>
            <FormVariantEditor />
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

          </Form>
        </Modal>

      </Access>

    </div>
  );
};

export default DocsPage;
