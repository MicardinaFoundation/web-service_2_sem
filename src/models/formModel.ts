import { Form } from "antd";
import { useState } from "react";

export default () => {
    //const [form] = useState(false);

    const [form] = Form.useForm();

    return { form };
};