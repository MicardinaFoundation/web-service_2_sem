import { request, useModel } from "@umijs/max";
import { message, Popconfirm, Space, Table, TableProps } from "antd";
import ErrorHandler from "../ErrorHandler";

export default function (props: any) {
  const { data, setData, loadVariants, loadCategories  } = useModel('variantModel');
    const { isModalCreateOpen, setIsModalCreateOpen, handleVariantAdd, handleCreateCancel } = useModel('variantAddModel');
  

  const { isModalEditOpen, setIsModalEditOpen, handleStudentEditStart, handleStudentEdit, handleEditCancel } = useModel('variantEditModel');
      //const { options, setOptions } = useModel('variantCathModel');
    const { form } = useModel('formModel');


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



    const handleStudentRemove = (id: number) => {
    request(`/api/Calculator?id=${id}`, { method: 'DELETE' }).then((newRow: Variant) => {
      loadVariants();
    }).catch((resp: any) => {
      message.error(ErrorHandler(resp.response.status))
    }).finally(() => {
      form.resetFields();
      setIsModalCreateOpen(false);
    })


    setData(data.filter(x => x.id != id))
  }




  const handleDiplicate = (id: number) => {
    request(`/api/Calculator/DiplicateVariant${id}`, { method: 'PUT', data: id }).then((data: any) => {
      loadVariants();
      console.log(data)
    }).catch((resp: any) => {
      message.error(ErrorHandler(resp.response.status) + `. /api/Calculator/DiplicateVariant${id}`)
    })
  }

    return (
        <>
            <Table dataSource={data} columns={studentColumns} />;
        </>
    );
}