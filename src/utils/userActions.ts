import { toast } from 'react-hot-toast';
import { deleteUser } from '@/services/auth.service';
import type { ActionType } from '@ant-design/pro-components';

/**
 * 删除用户并刷新表格
 * @param id 用户的 GUID 字符串
 * @param actionRef 表格的 actionRef，用于 reload
 */
export const handleDeleteUser = async (
    id: string,
    actionRef?: React.MutableRefObject<ActionType | undefined>
) => {
    const toastId = toast.loading('Deleting user...');
    try {
        await deleteUser(id);
        toast.success('User deleted successfully!', { id: toastId });
        actionRef?.current?.reload();
    } catch (error) {
        toast.error('Delete failed.', { id: toastId });
        console.error('Delete error:', error);
    }
};
