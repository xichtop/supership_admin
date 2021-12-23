import React, { useEffect, useState } from 'react';
import wareAPI from '../api/wareAPI';
import { ButtonToggle } from 'reactstrap';
import { useSelector } from 'react-redux';


// React bootstrap table
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';

const EditButton = (props) => {

    return (
        <div>
            <td>
                <ButtonToggle color="info" onClick={() => alert('sửa')}>Sửa</ButtonToggle>{' '}
            </td>
            <td>
                <ButtonToggle color="danger" onClick={() => alert('xóa')}>Xóa</ButtonToggle>{' '}
            </td>

        </div>
    );
};

const WareTable = () => {

    const token = useSelector(state => state.staff.token);

    const [wares, setWares] = useState([]);

    const fetchWares = async () => {
        var wares = [];
        try {
            wares = await wareAPI.getAll(token);
        } catch (error) {
            console.log("Failed to fetch options: ", error);
        }
        setWares(wares);
    }

    useEffect(() => {
        fetchWares();
    }, []);

    const cellButton = (cell, row, rowIndex) => (
        <EditButton cell={cell} row={row} rowIndex={rowIndex} />
    );


    const columns = [
        {
            dataField: 'WareHouseId',
            text: 'Mã nhà kho',
            sort: true,
            filter: textFilter({ placeholder: 'Mã nhà kho...', }),
            style: {
                fontWeight: 'bold',
            },
            headerStyle: {
                width: '120px',
            }
        },
        {
            dataField: 'Name',
            text: 'Tên nhà kho',
            sort: true,
            filter: textFilter({ placeholder: 'Tên nhà kho...', }),
            headerStyle: {
                width: '120px',
            }
        },
        {
            dataField: 'Address',
            text: 'Địa chỉ chỉ tiết',
            sort: true,
            filter: textFilter({ placeholder: 'Địa chỉ chỉ tiết...', }),
            headerStyle: {
                width: '140px',
            }
        },
        {
            text: "Thao Tác",
            formatter: cellButton,
            sort: true,
            headerStyle: {
                width: '82px',
            },
        }
    ];

    const PageOptions = {
        sizePerPageList: [{
            text: '5', value: 5
        }, {
            text: '10', value: 10
        }, {
            text: '15', value: 15
        }, {
            text: 'All', value: wares.length
        }]
    };

    const MyExportCSV = (props) => {
        const handleClick = () => {
            props.onExport();
        };
        return (
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
            }}>
                <button className="btn btn-info" onClick={handleClick}>Xuất File</button>
            </div>
        );
    };


    return (
        <div >
            <div className="row">
                <div className="col-sm-12 title">
                    Danh Sách Nhà Kho
                </div>
            </div>
            <ToolkitProvider
                keyField="WareHouseId"
                data={wares}
                columns={columns}
                exportCSV={{
                    fileName: 'warehouses.csv',
                    blobType: 'text/csv;charset=UTF-8'
                }}
            >
                {
                    props => (
                        <div>
                            <BootstrapTable
                                keyField='WareHouseId'
                                data={wares}
                                columns={columns}
                                tabIndexCell
                                striped
                                hover
                                condensed
                                pagination={paginationFactory(PageOptions)}
                                filter={filterFactory()}
                                filterPosition="top"
                                {...props.baseProps} />
                            <hr />
                            <MyExportCSV {...props.csvProps}>Xuất File Excel!!</MyExportCSV>
                            <hr />
                        </div>
                    )
                }
            </ToolkitProvider>
        </div>
    )
}

export default WareTable;