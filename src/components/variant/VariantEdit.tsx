import { Form, Input, Modal, Select } from "antd";
import FormVariantEditor from "../FormVariantEditor";
import { useModel } from "@umijs/max";

export default function (props: any) {

  const { isModalEditOpen, setIsModalEditOpen, handleStudentEditStart, handleStudentEdit, handleEditCancel } = useModel('variantEditModel');
      //const { options, setOptions } = useModel('variantCathModel');
    const { form } = useModel('formModel');

    return (
        <>
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
          </Form>
        </Modal>



        </>
    );
}