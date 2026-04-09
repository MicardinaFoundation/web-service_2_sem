import { request } from "@umijs/max";
import React from "react";

// src/models/user.ts
export default () => {
  //const [data, setData] = React.useState<Variant[]>(studentDataSource);
  const [data, setData] = React.useState<Variant[]>([]);



 return { data, setData };
};