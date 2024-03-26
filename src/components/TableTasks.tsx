import React from 'react';
import Table from './Table';
import { Task } from '../utils/types';
import { Pencil, Trash, JournalBookmark } from "react-bootstrap-icons";

interface TableProps {
  dataSource: Task[];
  loading?: boolean;
  columns: any;
  onClickEdit: any;
  onClickDelete: any;
}

const NoData = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center mt-5 mb-5">
      <JournalBookmark color="black" size="48" />
      <div>
        <span className="text-normal">No tasks created</span>
      </div>
    </div>
  );
};

const TableTasks: React.FC<TableProps> = ({
  dataSource = [],
  loading = false,
  columns = [],
  onClickEdit,
  onClickDelete
}) => {
  const columnsActives = columns.filter((item: { active: boolean; }) => item.active);
  const data: {
    dataRow: { key: string | number; value: React.ReactNode | any; }[]
  }[] = [];

  dataSource.forEach((item: Task, i: number) => {
    columnsActives.forEach((col: { key: string | number; active: boolean; }) => {
      switch (col.key) {
        case 'title':
          if (col.active)
            data[i] = {
              dataRow: new Array({
                key: col.key,
                value: (
                  <span>{item.title}</span>
                )
                })
              };
          break;
        case 'description':
          if (col.active)
            data[i].dataRow.push({
              key: col.key,
              value: (
                <span>{item.description}</span>
              )
            });
          break;
        case 'status':
          if (col.active)
            data[i].dataRow.push({
              key: col.key,
              value: (
                <span>{item.status.charAt(0).toUpperCase() + item.status.slice(1)}</span>
              )
            });
          break;
        case 'date':
          if (col.active) {
            data[i].dataRow.push({
              key: 'date',
              value: (
                <span>{new Date(item?.updatedAt || 0).toLocaleString('en-GB')}</span>
              )
            });
          }
          break;
          case 'action':
            if (col.active)
              data[i].dataRow.push({
                key: col.key,
                value: (
                  <div
                    className="d-flex align-items-center gap-2 cursor-pointer justify-content-center"
                    style={{ cursor: 'pointer' }}
                  >
                    <Pencil onClick={() => onClickEdit(item)} className="bi bi-pencil"/>
                    <Trash onClick={() => onClickDelete(item)} className="bi bi-pencil"/>
                  </div>
                )
              });
            break;
        default:
          break;
      }
    });
    data[i].dataRow.push({
      key: 'id',
      value: item.id
    });
  });

  return (
    <Table
      data={data}
      dataSource={dataSource}
      columns={columnsActives}
      loading={loading}
      component={<NoData />}
    />
  );
};

export default TableTasks;
