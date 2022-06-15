import React, { useRef, useState } from 'react';
import { Button, Form, message, Tree } from 'antd';
import ProForm, { ProFormText, ModalForm } from '@ant-design/pro-form';
import { fetchGetRoleAuth, fetchSetRoleAuth, fetchGetUserAuth } from '../service';
import { useAccess, useModel } from 'umi';
import { permissionToRouter, renderTreeList } from '@/utils';
export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
};
export type CreateUserFormProps = {
  fetchUserList: () => void;
  setModalVisit: (values: boolean) => void;
  modalVisit: boolean;
  slectId: number;
};

const AuthForm: React.FC<CreateUserFormProps> = (props) => {
  const { fetchUserList, modalVisit, slectId, setModalVisit } = props;
  const [form] = Form.useForm();
  const { initialState } = useModel('@@initialState');
  // init State
  const [rolePermission, setRolePermission] = useState<number[]>();
  const [submitPermissionKeys, setSubmitPermissionKeys] = useState<any>();
  // const { permission = [] } = initialState.currentUser.user_info;
  // const { rootRouter } = permissionToRouter(permission);
  // let treeData = renderTreeList(rootRouter);
  const [permission, setPermission] = useState<any>();
  const [rootRouter, setRootRouter] = useState<any>();
  const [treeData, setTreeData] = useState<any>();
  let parentIdMustSelectMap = {}

  // 默认展示key
  React.useEffect(() => {
    getUserPermission(initialState.currentUser.user_info.user_id, slectId)
    // getRolePermission(slectId);
  }, [slectId]);
  // 获取角色列表
  const getRolePermission = async (id: number) => {
    const params = {
      id,
    };
    const res = await fetchGetRoleAuth(params);
    if (res) {
      const permissionkeys: number[] = [];
      res.data.permission.map((x: { permission_id: number, type: number }) =>{
        if(x.type == 2) {
          permissionkeys.push(x.permission_id);
        }
      });
      setRolePermission(permissionkeys);
    }
  };

  // 获取用户权限列表
  const getUserPermission = async (uid: number, role_id: number) => {
    const params = {
      uid,
    };
    const res = await fetchGetUserAuth(params);
    if (res) {
      setPermission(res.data.permission);
      let rootRouterV = permissionToRouter(res.data.permission).rootRouter;
      setRootRouter(rootRouterV);
      let treeDataV = renderTreeList(rootRouterV);
      setTreeData(treeDataV);

      getRolePermission(role_id)
    }
  };

  const findAllParent = (id: number, allAuthMap: any, parentIdMustSelectArr: number[], num: number) => {
    // 设置寻找父亲节点的深度不能超过5层，防止死循环，内存泄漏
    if (num > 5) {
      return parentIdMustSelectArr
    }
    if (parentIdMustSelectMap[allAuthMap[id].parent_id] != true && allAuthMap[id].parent_id != 0) {
      if (!submitPermissionKeys.includes(allAuthMap[id].parent_id)) {
        parentIdMustSelectArr.push(allAuthMap[id].parent_id);
      }
      parentIdMustSelectMap[allAuthMap[id].parent_id] = true;
      num += 1;
      parentIdMustSelectArr = findAllParent(allAuthMap[id].parent_id, allAuthMap, parentIdMustSelectArr, num)
    }
    return parentIdMustSelectArr
  }

  const onCheck = (checkedKeys: any, info: any) => {
    // console.log('onCheck', checkedKeys, info);
    const { halfCheckedKeys } = info;
    // 子级父级相关联
    // let infocheckedKeys = checkedKeys.concat(halfCheckedKeys);
    // setSubmitPermissionKeys(infocheckedKeys);
    // setSubmitPermissionKeys(checkedKeys.checked);
    setSubmitPermissionKeys(checkedKeys);
  };
  console.log(treeData, 'treeData');
  console.log(rolePermission, 'rolePermission');
  console.log(initialState, 'initialState');
  if (!rolePermission) return false;
  return (
    <ModalForm
      form={form}
      layout="horizontal"
      trigger={<Button type="link">设置权限</Button>}
      modalProps={{
        destroyOnClose: true,
        onCancel: () => {
          form.resetFields();
        },
      }}
      visible={modalVisit}
      onVisibleChange={setModalVisit}
      onFinish={async () => {
        //初始化父节点标记
        parentIdMustSelectMap = {};

        console.log(submitPermissionKeys, 'submitPermissionKeys');
        // 过滤选择的权限
        // let allAuth = initialState.currentUser.rootRouter;
        let allAuth = rootRouter;
        let filterAuth: {
          permission_id: number;
        }[] = [];
        let allAuthMap = {}
        allAuth.map((x: any) => {
          filterAuth.push(x);
          allAuthMap[x.permission_id] = x;
          x.children.map((k: any) => {
            filterAuth.push(k);
            allAuthMap[k.permission_id] = k;
            k.children.map((j: any) => {
              filterAuth.push(j);
              allAuthMap[j.permission_id] = j;
            });
          });
        });

        filterAuth.map((x: any) => {
          if (x.children) {
            delete x.children;
          }
        });
        let parentIdMustSelectArr : number[] = []
        submitPermissionKeys.map((x: number) => {
          if (allAuthMap[x].parent_id != 0) {
            //寻找所有父辈节点
            parentIdMustSelectArr = findAllParent(x, allAuthMap, parentIdMustSelectArr, 1)
          }
        });
        let submitPermissionIds = parentIdMustSelectArr.concat(submitPermissionKeys);
        // console.log(parentIdMustSelectArr, 'parentIdMustSelectArr');
        // console.log(submitPermissionIds, 'submitPermissionIds');
        let _submitArr: any = filterAuth.filter((x: { permission_id: number }) =>
          // submitPermissionKeys.includes(x.permission_id),
          submitPermissionIds.includes(x.permission_id),
        );
        // console.log(_submitArr, '_submitArr');
        const res = await fetchSetRoleAuth({
          permission: JSON.stringify(_submitArr),
          id: slectId,
        });
        if (res.code === 0) {
          message.success('设置成功');
          initialState.fetchUserInfo();
          setRolePermission(null);
          fetchUserList();
          return true;
        }
      }}
    >
      <Tree
        checkable
        defaultExpandedKeys={rolePermission}
        defaultSelectedKeys={rolePermission}
        defaultCheckedKeys={rolePermission}
        // onSelect={onSelect}
        onCheck={onCheck}
        treeData={treeData}
        // checkStrictly
        defaultExpandAll
      />
    </ModalForm>
  );
};

export default AuthForm;
