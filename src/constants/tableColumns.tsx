import { TableProps } from "antd";

export const studentxColumns: TableProps<any>['columns'] = [
  {
    title: 'Фамилия',
    dataIndex: 'lastName',
    key: 'lastName',
  },
  {
    title: 'Имя',
    dataIndex: 'firstName',
    key: 'firstName',
  },
  {
    title: 'Отчество',
    dataIndex: 'midName',
    key: 'midName',
  },
  {
    title: 'Группа',
    dataIndex: 'group',
    key: 'group',
  },
  {
    title: 'Действия',
    key: 'action',
    render: () => <><a>Delete</a></>
  }
];
