import React, { useEffect } from 'react';
import { Button, Select, Space } from 'antd';
//import avatar from '../assets/avatar.png';
import { Access, useAccess, history, useModel } from '@umijs/max';
import VariantAdd from '@/components/variant/VariantAdd';
import VariantEdit from '@/components/variant/VariantEdit';
import VariantTable from '@/components/variant/VariantTable';
import VariantSearchForm from '@/components/variant/VariantSearchForm';

const DocsPage = () => {
  const { data, setData, loadVariants, loadCategories } = useModel('variantModel');
  const { isModalCreateOpen, setIsModalCreateOpen, handleVariantAdd, handleCreateCancel } = useModel('variantAddModel');
  const { refresh } = useModel('@@initialState');

  useEffect(() => {
    loadVariants();
  }, [])

  const access = useAccess();

  const join = () => {
    history.push('/join');
  };
  return (
    <div>
      <Access accessible={!access.isAuth}>
        <Space>
          <span>User is not authorization</span>
          <Button onClick={join}>Join</Button>
        </Space>

      </Access>
      <Access accessible={access.isAuth}>
        <VariantSearchForm />
        <VariantTable />

        <VariantEdit />
        <VariantAdd />
      </Access>
    </div>
  );
};

export default DocsPage;
