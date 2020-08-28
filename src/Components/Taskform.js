import React, { Component } from 'react'

export default class Taskform extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            status: false
        }
    }

    componentDidMount() {
        if (this.props.task) {
            this.setState({
                id: this.props.task.id,
                name: this.props.task.name,
                status: this.props.task.status,
            });
        }
    }

    // static getDerivedStateFromProps(nextProps) {
    //     if (nextProps && nextProps.task) {
    //         return {
    //             id: nextProps.task.id,
    //             name: nextProps.task.name,
    //             status: nextProps.task.status,
    //         };
    //     }
    //     else if (!nextProps.task) {
    //         return {
    //             id: '',
    //             name: '',
    //             status: false
    //         };
    //     }
    // }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.task) {
            this.setState({
                id: nextProps.task.id,
                name: nextProps.task.name,
                status: nextProps.task.status,
            })
        }
        else if (!nextProps.task) {
            this.setState({
                id: '',
                name: '',
                status: false
            })
        }
    }

    onChange = (event) => {
        let target = event.target;
        let name = target.name;
        let value = target.value;
        if (name === 'status') {
            value = target.value === 'true' ? true : false
        }
        this.setState({
            [name]: value
        })
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state);
        this.onClear();
        this.onCloseForm();
    }

    onCloseForm = () => {
        this.props.onCloseForm();
    }

    onClear = () => {
        this.setState({
            name: '',
            status: false
        })
    }

    render() {
        let { id } = this.state;
        return (
            <div className="panel panel-danger">
                <div className="panel-heading">
                    <h3 className="panel-title">
                        {id !== '' ? 'Cập nhật công việc' : 'Thêm công việc'}
                        <span
                            className='fa fa-times-circle text-right'
                            onClick={this.onCloseForm}
                        ></span>
                    </h3>
                </div>
                <div className="panel-body">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Tên: </label>
                            <input
                                type='text'
                                className='form-control'
                                name='name'
                                value={this.state.name}
                                onChange={this.onChange}
                            />
                        </div>
                        <label>Trạng thái: </label>
                        <select
                            className='form-control'
                            name='status'
                            value={this.state.status}
                            onChange={this.onChange}
                        >
                            <option value={true}>Kích hoạt</option>
                            <option value={false}>Ẩn</option>
                        </select><br />
                        <div className='text-center'>
                            <button type="submit" className="btn btn-warning">
                                <span className='fa fa-plus mr-5'></span>Lưu lại
                                    </button>&nbsp;
                                    <button
                                type="button"
                                className="btn btn-danger"
                                onClick={this.onClear}
                            >
                                <span className='fa fa-times mr-5'></span>Hủy bỏ
                                    </button>&nbsp;
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
