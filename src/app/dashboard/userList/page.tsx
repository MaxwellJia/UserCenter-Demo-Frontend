"use client"

import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {ProTable} from '@ant-design/pro-components';
import {useRef} from 'react';
import type {CurrentUser, FilterUser} from '@/types/auth';
import { searchUsers } from "@/services/auth.service"; // deleteUser, update
import {Image, message} from "antd";

const waitTimePromise = async (time: number = 100) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
};

const waitTime = async (time: number = 100) => {
    await waitTimePromise(time);
};

const columns: ProColumns<CurrentUser>[] = [
    {
        title: 'User ID',
        dataIndex: 'id',
        valueType: 'text',
    },
    {
        title: 'Username',
        dataIndex: 'userName',
        copyable: true,
    },
    {
        title: 'Nickname',
        dataIndex: 'nickName',
    },
    {
        title: 'Avatar',
        dataIndex: 'avatarUrl',
        render: (_, record) => (
            <Image src={record.avatarUrl} width={100} />
        ),
    },
    {
        title: 'Gender',
        dataIndex: 'gender',
        valueType: 'select',
        valueEnum: {
            0: { text: 'Female', status: 'Default' },
            1: { text: 'Male', status: 'Success' },
        },
        filters: [
            { text: 'Female', value: 0 },
            { text: 'Male', value: 1 },
        ],
    },
    {
        title: 'Phone Number',
        dataIndex: 'phone',
    },
    {
        title: 'Email',
        dataIndex: 'email',
    },
    {
        title: 'User Role',
        dataIndex: 'userRole',
        valueType: 'select',
        valueEnum: {
            0: { text: 'Normal User', status: 'Default' },
            1: { text: 'Administrator', status: 'Success' },
        },
    },

    // {
    //   disable: true,
    //   title: '状态',
    //   dataIndex: 'state',
    //   filters: true,
    //   onFilter: true,
    //   ellipsis: true,
    //   valueType: 'select',
    //   valueEnum: {
    //     all: { text: '超长'.repeat(50) },
    //     open: {
    //       text: '未解决',
    //       status: 'Error',
    //     },
    //     closed: {
    //       text: '已解决',
    //       status: 'Success',
    //       disabled: true,
    //     },
    //     processing: {
    //       text: '解决中',
    //       status: 'Processing',
    //     },
    //   },
    // },
    // {
    //   disable: true,
    //   title: '标签',
    //   dataIndex: 'labels',
    //   search: false,
    //   renderFormItem: (_, { defaultRender }) => {
    //     return defaultRender(_);
    //   },
    //   render: (_, record) => (
    //     <Space>
    //       {record.labels.map(({ name, color }) => (
    //         <Tag color={color} key={name}>
    //           {name}
    //         </Tag>
    //       ))}
    //     </Space>
    //   ),
    // },
    {
        title: 'Operate',
        valueType: 'option',
        key: 'option',
        render: (text, record, _, action) => [
            <a
                key="editable"
                onClick={() => {
                    action?.startEditable?.(record.id);
                }}
            >
                Edit
            </a>,
            // <a
            //     key="delete"
            //     onClick={async () => {
            //         try {
            //             // Call delete api
            //             console.log('ID IS ', record.id);
            //             const response = await deleteUser(record.id);
            //             if (response) {
            //                 message.success('User deleted successfully!');
            //                 action?.reload();  // Refresh the data
            //             }
            //         } catch (error) {
            //             console.error('Delete failed:', error);
            //             message.error('Delete failed, please try again later');
            //         }
            //     }}>
            //     Delete
            // </a>,
        ],
    },
];

export default () => {
    const actionRef = useRef<ActionType | undefined>(undefined);
    return (
        <ProTable<CurrentUser>
            columns={columns}
            actionRef={actionRef}
            cardBordered
            request={async (params: FilterUser, sort, filter) => {
                console.log(params);

                const response = await searchUsers(params);
                console.log(response.data);
                return {
                    data: response.data,
                    total: response.total,
                    success: true,
                }
            }}
            // editable={{
            //     type: 'multiple',
            //     onSave: async (id, data) => {
            //         console.log('Saving:', id, data);
            //         try {
            //             const updatedList = await update(data);
            //             if (updatedList){
            //                 actionRef.current?.reload();
            //                 message.success('edit successfully！');
            //             }
            //
            //         } catch (error) {
            //             console.error('edit fail:', error);
            //             message.error('edit fail, please try again later');
            //         }
            //     },
            // }}
            columnsState={{
                persistenceKey: 'pro-table-singe-demos',
                persistenceType: 'localStorage',
                defaultValue: {
                    option: { fixed: 'right', disable: true },
                },
                onChange(value) {
                    console.log('value: ', value);
                },
            }}
            rowKey="id"
            search={{
                labelWidth: 'auto',
            }}
            options={{
                setting: {
                    listsHeight: 400,
                },
            }}
            form={{
                // 由于配置了 transform，提交的参数与定义的不同这里需要转化一下
                syncToUrl: (values, type) => {
                    if (type === 'get') {
                        return {
                            ...values,
                            created_at: [values.startTime, values.endTime],
                        };
                    }
                    return values;
                },
            }}
            pagination={{
                pageSize: 5,
                onChange: (page) => console.log(page),
            }}
            dateFormatter="string"
            headerTitle="Advanced Tables"></ProTable>
    );
};
