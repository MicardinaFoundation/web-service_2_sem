import { useState } from "react";

export default () => {
    //const [options, setOptions] = useState<Category[]>(cathegoriesSource);
    const [options, setOptions] = useState<Category[]>([]);

    return { options, setOptions };
};