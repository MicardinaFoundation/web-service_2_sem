import ErrorHandler from "@/components/ErrorHandler";
import { request, useModel } from "@umijs/max";
import { message } from "antd";
import React from "react";

// src/models/user.ts
export default () => {
  //const [data, setData] = React.useState<Variant[]>(studentDataSource);
  const [data, setData] = React.useState<Variant[]>([]);
  const { options, setOptions } = useModel('variantCathModel');
  const { refresh } = useModel('@@initialState');


  const loadVariants = () => {
    request('/api/Calculator/GetVariant').then((data: Variant[]) => {
      loadCategories();
      setData(data);
    }).catch((resp: any) => {
      if (resp.response.status == 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        //console.log('redf');
        refresh();
      }
      message.error(ErrorHandler(resp.response.status))
    })

  }
  const loadCategories = () => {
    request('/api/Calculator/CategoriesList').then((data: Category[]) => {
      setOptions(data);
    }).catch((resp: any) => {
      message.error(ErrorHandler(resp.response.status))
    })
  }
  // function ConvertGroupIdToString(data: Variant[]) {
  //     setCData(data);
  //   if (options == null) loadCategories;
  //   // data.forEach((el) => {
  //   //   if (parseInt(el.groupId) < options.length) el.groupId = options[parseInt(el.groupId)].cathegories;
  //   //   else el.groupId = `<NULL GROUP FOR THIS ID> | <ID = ${el.groupId}> <${el.name}>`
  //   // })
  //   return data
  // }


  return { data, setData, loadVariants, loadCategories };
};