import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import avatar from '../assets/avatar.png';


const DocsPage = () => {

const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Показать окно с разработчиком
      </Button>
      <Modal
        title="Окно знакомств"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Закрыть
          </Button>,
        ]}
      >
      <p>
        <img src={"avatar"} width="388" />
      </p>
        <p>Аватар создателя</p>
      </Modal>
    </div>
  );
};

export default DocsPage;
