import ErrorHandler from "@/components/ErrorHandler";
import { request, useModel } from "@umijs/max";
import { message } from "antd";
import { useState } from "react";

export default () => {
    //const [data, setData] = React.useState<Variant[]>(studentDataSource);
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const { data, setData, loadVariants, loadCategories } = useModel('variantModel');
    const { form } = useModel('formModel');


    const handleStudentEditStart = (id: number) => {
        request(`/api/Calculator/${id}`).then((data: any) => {
            form.setFieldsValue(data);
            console.log(data)
            setIsModalEditOpen(true);
        }).catch((resp: any) => {
            message.error(ErrorHandler(resp.response.status))
        })
    }

    const handleStudentEdit = (values: Variant) => {
        request(`/api/Calculator`, { method: 'PATCH', data: values }).then((newRow: Variant) => {
            loadVariants();
        }).catch((resp: any) => {
            message.error(ErrorHandler(resp.response.status))
        }).finally(() => {
            form.resetFields();
            setIsModalEditOpen(false);
        })


    }


      const handleEditCancel = () => {
        setIsModalEditOpen(false);
        form.resetFields();
      };
    

    return { isModalEditOpen, setIsModalEditOpen, handleStudentEditStart, handleStudentEdit, handleEditCancel };
};