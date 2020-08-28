import React, { Component } from 'react'
import Taskitem from './Taskitem'

export default class Tasklist extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filterName: '',
            filterStatus: -1 //all=-1, active=1,deactive=0
        }
    }

    onChange = (event) => {
        let target = event.target;
        let name = target.name;
        let value = target.value;
        this.props.onFilter(
            name === 'filterName' ? value : this.state.filterName,
            name === 'filterStatus' ? value : this.state.filterStatus,
        )
        this.setState({
            [name]: value
        });
    }

    render() {

        let { tasks } = this.props;
        let { filterName, filterStatus } = this.state
        let elmTasks = tasks.map((task, index) => {
            return <Taskitem
                key={task.id}
                index={index}
                task={task}
                onUpdateStatus={this.props.onUpdateStatus}
                onDelete={this.props.onDelete}
                onUpdate={this.props.onUpdate}
            />
        })

        return (
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th className='text-center'>STT</th>
                        <th className='text-center'>Tên</th>
                        <th className='text-center'>Trạng thái</th>
                        <th className='text-center'>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td>
                            <input
                                type='text'
                                className='form-control'
                                name='filterName'
                                value={filterName}
                                onChange={this.onChange}
                            />
                        </td>
                        <td>
                            <select
                                className='form-control'
                                name='filterStatus'
                                value={filterStatus}
                                onChange={this.onChange}
                            >
                                <option value={-1}>Tất cả</option>
                                <option value={0}>Ẩn</option>
                                <option value={1}>Kích hoạt</option>
                            </select>
                        </td>
                        <td></td>
                    </tr>
                    {elmTasks}
                </tbody>
            </table>
        )
    }
}
