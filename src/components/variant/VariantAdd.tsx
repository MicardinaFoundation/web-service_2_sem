import { Form, Modal, Select } from "antd";
import FormVariantEditor from "../FormVariantEditor";
import { useModel } from "@umijs/max";

export default function (props: any) {

      const { isModalCreateOpen, setIsModalCreateOpen, handleVariantAdd, handleCreateCancel } = useModel('variantAddModel');
      //const { options, setOptions } = useModel('variantCathModel');
    const { form } = useModel('formModel');

    return (
        <>
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
                    onFinish={handleVariantAdd}

                >
                    <FormVariantEditor />
                </Form>
            </Modal>


        </>
    );
}