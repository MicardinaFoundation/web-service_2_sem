import { Button, Form, Input, message, Modal, Select } from "antd";
import FormVariantEditor from "../FormVariantEditor";
import { request, useModel } from "@umijs/max";
import ErrorHandler from "../ErrorHandler";

export default function (props: any) {

  const { data, setData  } = useModel('variantModel');
    const { options, setOptions } = useModel('variantCathModel');
    //const { form } = useModel('formModel');
    const { Option } = Select;

    const handleSearch = (values: any) => {
        request(`/api/Calculator`, { method: 'POST', data: values }).then((newRow: Variant[]) => {
            setData(newRow);
        }).catch((resp: any) => {
            message.error(ErrorHandler(resp.response.status))
        })

    }


    return (
        <>
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


        </>
    );
}