import ErrorHandler from "@/components/ErrorHandler";
import { request, useModel } from "@umijs/max";
import { message } from "antd";
import React, { useState } from "react";

// src/models/user.ts
export default () => {
    const { data, setData } = useModel('variantModel');
    const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
    const { form } = useModel('formModel');
    

    const handleCreateCancel = () => {
        setIsModalCreateOpen(false);
        form.resetFields();
    };


    const handleVariantAdd = (values: Variant) => {
        request('/api/Calculator/', { method: 'PUT', data: values }).then((newRow: Variant) => {
            setData([newRow, ...data])
        }).catch((resp: any) => {
            message.error(ErrorHandler(resp.response.status))
        }).finally(() => {
            form.resetFields();
            setIsModalCreateOpen(false);
        })
    };

    return { isModalCreateOpen, setIsModalCreateOpen, handleVariantAdd, handleCreateCancel };
};