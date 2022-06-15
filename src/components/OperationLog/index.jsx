/* 操作日志组件 */
import React from 'react';
import moment from 'moment';
import { Table } from 'antd';
import { userLog } from '@/services/login';

class OperationLogModal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tableLogLoading: false, // 表格加载
      logData: [], // 表格数据
    };
  }

  componentDidMount() {
    const { selectRecord, type, id } = this.props;
    const params = {
      res_id: `${id}` || '',
      res_type: type || '',
    };
    // 获取日志
    this.setState({ tableLogLoading: true });
    userLog(params).then((res) => {
      if (res) {
        this.setState({
          logData: res.data.log_list || [],
          tableLogLoading: false,
        });
      }
    });
  }

  // 获取表格
  getTable = () => {
    const { addColumns = [] } = this.props;
    const { tableLogLoading, logData } = this.state;
    const dataSource = logData.map((item, index) => {
      item.key = index;
      return item;
    });

    // 操作内容是op_reasons优先，为空用op_remarks
    const columns = [
      {
        title: '操作人',
        dataIndex: 'user_name',
      },
      {
        title: '操作时间',
        dataIndex: 'create_time',
        sorter: (a, b) => moment(a.create_time) - moment(b.create_time),
      },
      {
        title: '操作内容',
        dataIndex: 'remarks',
        render: (text, record) => {
          return (
            <>
              <div>{text || record.reasons}</div>
            </>
          );
        },
      },
    ];

    return (
      <Table
        loading={tableLogLoading}
        bordered={false}
        size="middle"
        pagination={logData.length > 10}
        columns={[...columns, ...addColumns]}
        dataSource={dataSource}
      />
    );
  };

  render() {
    return <div style={{ minHeight: 200 }}>{this.getTable()}</div>;
  }
}

export default OperationLogModal;
