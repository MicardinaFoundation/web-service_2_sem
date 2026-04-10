import { request, useModel } from "@umijs/max";
import { message, Popconfirm, Space, Table, TableProps } from "antd";
import ErrorHandler from "../ErrorHandler";
import { Column, Pie } from "@ant-design/charts";

export default function (props: any) {
    const { data, setData, loadVariants, loadCategories } = useModel('variantModel');
    const { isModalCreateOpen, setIsModalCreateOpen, handleVariantAdd, handleCreateCancel } = useModel('variantAddModel');
    const { options, setOptions } = useModel('variantCathModel');


    const { isModalEditOpen, setIsModalEditOpen, handleStudentEditStart, handleStudentEdit, handleEditCancel } = useModel('variantEditModel');
    const { form } = useModel('formModel');

    const convData = data;
    //console.log(data)
    // convData.forEach((el) => {
    //     if (parseInt(el.groupId) < options.length) el.groupId = options[parseInt(el.groupId)].cathegories;
    //     else {
    //         if (parseInt(el.groupId) < options.length)
    //             el.groupId = `<NULL GROUP FOR THIS ID> | <ID = ${el.groupId}> <${el.name}>`
    //     }
    // })


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
            title: 'Номер',
            dataIndex: 'numb',
            key: 'numb',
        },
        {
            title: 'Группа',
            dataIndex: 'groupId',
            key: 'groupId',
            width: 150
        },
        {
            title: 'Был создан в',
            dataIndex: 'createdAt',
            key: 'numb',
        },
        {
            title: 'Обновлен в',
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




    const calculateGraphData = () => {
        let dt = options.map(item => ({
            groupName: item.cathegories,
            id: item.idChanged,
            count: 0
        }))

        for (let i = 0; i < dt.length; i++) {
            let sum = 0;
            for (let j = 0; j < data.length; j++) {
                if (dt[i].id == parseInt(data[j].groupId)) sum++
            }
            dt[i].count = sum
        }

        const cleanData = dt.map(item => ({
            type: item.groupName,
            value: item.count
        }))
        console.log(dt);
        return cleanData;
    };

    const cleanData = calculateGraphData();
    const config = {
    data: cleanData,
    xField: 'type',
    yField: 'value',
    colorField: 'type',
  };
  <Column {...config} />;
    // const config = {
    //     data: cleanData,
    //     angleField: 'value',
    //     colorField: 'type'
    // }

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
            <Table dataSource={convData} columns={studentColumns} />;
            {/* <Pie {...config} /> */}
            <h2>Диаграмма пользователей по группам</h2>
            <Column {...config} />;
        </>
    );
}