import React, { useEffect, useState } from 'react';
import { Button, Form, Input, MenuProps, message, Modal, Popconfirm, Select, Space, Table, TableProps, Typography } from 'antd';
//import avatar from '../assets/avatar.png';
import { cathegoriesSource, studentDataSource } from '@/constants/tableData';
import { Access, Navigate, request, useAccess, history, useModel } from '@umijs/max';
import FormVariantEditor from '@/components/FormVariantEditor';
import ErrorHandler from '@/components/ErrorHandler';
import VariantAdd from '@/components/variant/VariantAdd';
import VariantEdit from '@/components/variant/VariantEdit';
import VariantTable from '@/components/variant/VariantTable';
import VariantSearchForm from '@/components/variant/VariantSearchForm';

const { Option } = Select;
const DocsPage = () => {

  const { data, setData, loadVariants, loadCategories  } = useModel('variantModel');
  const { isModalCreateOpen, setIsModalCreateOpen, handleVariantAdd, handleCreateCancel } = useModel('variantAddModel');
  const { options, setOptions } = useModel('variantCathModel');
  const { form } = useModel('formModel');

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

  useEffect(() => {

    loadCategories();
    loadVariants();

  }, [])



  const access = useAccess();

  const join = () => {
    history.push('/join');
  };

  React.useEffect(() => {
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
        <Space>
          <Button onClick={() => setIsModalCreateOpen(true)}>Add Student</Button>
          <span>Количество студентов: {data.length}</span>
        </Space>
        <VariantSearchForm/>
        <VariantTable/>

        <VariantEdit/>
        <VariantAdd/>
      </Access>

    </div>
  );
};

export default DocsPage;
