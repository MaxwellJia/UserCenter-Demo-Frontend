"use client"

import {ActionType, ProColumns} from '@ant-design/pro-components';
import {ProTable} from '@ant-design/pro-components';
import React, {useRef, useState} from 'react';
import {CurrentUser, FilterUser} from '@/types/auth';
import {searchUsers, updateUser} from "@/services/auth.service"; // deleteUser, update
import {Image} from "antd";
import { Toaster, toast } from 'react-hot-toast';
import { handleDeleteUser } from '@/utils/userActions';
import enUS from 'antd/locale/en_US';
import { ConfigProvider } from 'antd';
import {useAuthRedirect} from "@/hooks/useAuthRedirect";

// 生成 intl 对象

// const waitTimePromise = async (time: number = 100) => {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve(true);
//         }, time);
//     });
// };
//
// const waitTime = async (time: number = 100) => {
//     await waitTimePromise(time);
// };

const UserListPage =  () => {
    useAuthRedirect(); // 重定向到login如果token无效

    const actionRef = useRef<ActionType | undefined>(undefined);
    const [initialLoading, setInitialLoading] = useState(true);

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
            // render: (_, record) => (
            //     <Image src={record.avatarUrl} width={100} />
            // ),
            render: (_, record) =>
                record.avatarUrl
                    ? <Image src={record.avatarUrl} width={100} alt="User avatar"/>
                    : null,

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
                <a
                    key="delete"
                    onClick={() => handleDeleteUser(record.id, actionRef)}>
                    Delete
                </a>,
            ],
        },
    ];

    return (
        <div className="max-w-7xl mx-auto p-4">
            <Toaster position="top-center"/>
            <ConfigProvider locale={enUS}>
                <ProTable<CurrentUser>
                    columns={columns}
                    actionRef={actionRef}
                    cardBordered
                    loading={initialLoading} //  设置表格加载状态
                    request={async (params: FilterUser) => {
                        const toastId = toast.loading("Loading data...");

                        try {
                            const response = await searchUsers(params);
                            toast.success("Data loaded", {id: toastId});

                            //  首次加载完成
                            if (initialLoading) setInitialLoading(false);

                            return {
                                data: response.data,
                                total: response.total,
                                success: true,
                            };
                        } catch (error) {
                            console.error('Failed to load users:', error);
                            toast.error("Failed to load data", {id: toastId});

                            // 即使失败也要移除初始加载
                            if (initialLoading) setInitialLoading(false);

                            return {
                                data: [],
                                total: 0,
                                success: false,
                            };
                        }
                    }}
                    editable={{
                        type: 'multiple',
                        onSave: async (id, data) => {
                            const toastId = toast.loading('Updating user...');
                            try {
                                await updateUser(data); // 调用 API
                                toast.success('User updated successfully!', {id: toastId});
                                actionRef.current?.reload(); // 刷新表格
                            } catch (error) {
                                toast.error('Update failed.', {id: toastId});
                                console.error('Update error:', error);
                            }
                        },
                        onDelete: async (id, data) => {
                            await handleDeleteUser(data.id, actionRef)
                        },
                    }}
                    columnsState={{
                        persistenceKey: 'pro-table-singe-demos',
                        persistenceType: 'localStorage',
                        defaultValue: {
                            option: {fixed: 'right', disable: true},
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
                    headerTitle="Advanced Tables">
                </ProTable>
            </ConfigProvider>
        </div>
    );
};

export default UserListPage;
