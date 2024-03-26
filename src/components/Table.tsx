import React from 'react';

interface TableProps {
  data: Array<any>;
  columns: Array<any>;
  loading: boolean;
  component: any;
  checkbox?: boolean;
  onClick?: any;
  dataSource?: Array<any>;
}

const Table: React.FC<TableProps> = ({
  data = [],
  columns = [],
  loading,
  component,
  checkbox,
  onClick
}) => {

  return (
    <div>
      <table className="table table-bordered table-hover table-striped">
        <thead>
          <tr>
            {columns.length
              ? columns.map((item: { width: any; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }, i: any) => {
                  return (
                    <th
                      key={`column-table-${i}`}
                      style={{
                        width: item.width
                      }}
                    >
                      <div >
                        <span>{item.name}</span>
                      </div>
                    </th>
                  );
                })
              : null}
          </tr>
        </thead>
        <tbody>
          {!loading ? (
            data.length ? (
              data.map((item: { dataRow: any[]; }, i: number) => 
              {
                const rowId = item?.dataRow.find((el: { key: string; }) => el.key === 'id');

                return (
                  <tr
                    key={`row-table-${i}`}
                    className={
                      i === data.length - 1
                        ? 'row-data'
                        : 'row-data lowerBorder'
                    }
                  >
                    {item.dataRow.map(data => {
                      if (columns.find((el: { key: any; }) => el.key === data.key)) {
                        return (
                          <td
                            key={`row-data-${data.key}`}
                          >
                            {data.key === 'teamName' ||
                            data.key === 'groupName' ? (
                              <button
                                onClick={() => onClick(rowId)}
                              >
                                {data.value}
                              </button>
                            ) : (
                              data.value
                            )}
                          </td>
                        );
                      } else return null;
                    })}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={columns?.length + 1}>
                  {component || <div>No data</div>}
                </td>
              </tr>
            )
          ) : (
            <tr>
              <td colSpan={columns?.length + 1}>
                <div style={{ textAlign: 'center', padding: '120px' }}>
                  <span>Loading...</span>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
