import './App.css';
import React, { Component } from 'react';
import Taskform from './Components/Taskform';
import Control from './Components/Control';
import Tasklist from './Components/Tasklist';
import randomstring from 'randomstring';
import _ from 'lodash';

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            isDisplayForm: true,
            taskEditing: null,
            filter: {
                name: '',
                status: -1
            },
            keyword: '',
            sortBy: 'name',
            sortValue: 1,
        }
    }

    componentDidMount() {
        if (localStorage && localStorage.getItem('tasks')) {
            let tasks = JSON.parse(localStorage.getItem('tasks'));
            this.setState({
                tasks: tasks
            })
        }
    }

    onToggleForm = () => {
        if (this.state.isDisplayForm && this.state.taskEditing) {
            this.setState({
                isDisplayForm: true,
                taskEditing: null
            })
        } else {
            this.setState({
                isDisplayForm: !this.state.isDisplayForm,
                taskEditing: null
            })
        }
    }

    onCloseForm = () => {
        this.setState({
            isDisplayForm: false
        })
    }

    onShowForm = () => {
        this.setState({
            isDisplayForm: true
        })
    }

    onSubmit = (data) => {
        let { tasks } = this.state;
        if (data.id === '') {
            data.id = randomstring.generate();
            tasks.push(data);
        } else {
            let index = this.findIndex(data.id);
            tasks[index] = data;
        }
        this.setState({
            tasks: tasks,
            taskEditing: null
        })
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    onUpdateStatus = (id) => {
        let { tasks } = this.state;
        // let index = this.findIndex(id);
        let index=_.findIndex(tasks,(task)=>{
            return task.id ===id;
        })
        if (index !== -1) {
            tasks[index].status = !tasks[index].status; 
            this.setState({
                tasks: tasks
            });
            localStorage.getItem('tasks', JSON.stringify('tasks'))
        }
    }

    findIndex = (id) => {
        let { tasks } = this.state;
        let result = -1;
        tasks.forEach((task, index) => {
            if (task.id === id) {
                result = index;
            }
        });
        return result
    }

    onDelete = (id) => {
        let { tasks } = this.state;
        let index = this.findIndex(id);
        if (index !== -1) {
            tasks.splice(index, 1)
            this.setState({
                tasks: tasks
            });
            localStorage.getItem('tasks', JSON.stringify('tasks'))
        }
        this.onCloseForm()
    }

    onUpdate = (id) => {
        let { tasks } = this.state;
        let index = this.findIndex(id);
        let taskEditing = tasks[index]
        this.setState({
            taskEditing: taskEditing
        });
        this.onShowForm();
    }

    onFilter = (filterName, filterStatus) => {
        filterStatus = parseInt(filterStatus, 10);
        this.setState({
            filter: {
                name: filterName.toLowerCase(),
                status: filterStatus,
            }
        })
    }

    onSearch = (keyword) => {
        this.setState({
            keyword: keyword
        })
    }

    onSort = (sortBy, sortValue) => {
        this.setState({
            sortBy: sortBy,
            sortValue: sortValue
        })
    }

    render() {
        let { tasks, isDisplayForm, taskEditing, filter, keyword, sortBy, sortValue } = this.state;
        if (filter) {
            if (filter.name) {
                // tasks = tasks.filter((task) => {
                //     return task.name.toLowerCase().indexOf(filter.name) !== -1;
                // });
                tasks = _.filter(tasks,(task)=>{
                    return task.name.toLowerCase().indexOf(filter.name) !==-1
                })
            }
            tasks = tasks.filter((task) => {
                if (filter.status === -1) {
                    return task;
                } else {
                    return task.status === (filter.status === 1 ? true : false)
                }
            });
        }

        if (keyword) {
            tasks = tasks.filter((task) => {
                return task.name.toLowerCase().indexOf(keyword) !== -1;
            });
        }

        if (sortBy === 'name') {
            tasks.sort((a, b) => {
                if (a.name > b.name) return sortValue;
                else if (a.name < b.name) return -sortValue;
                else return 0;
            })
        } else {
            tasks.sort((a, b) => {
                if (a.status > b.status) return -sortValue;
                else if (a.status < b.status) return sortValue;
                else return 0;
            })
        }

        let elmTaskForm = isDisplayForm
            ? <Taskform
                onSubmit={this.onSubmit}
                onCloseForm={this.onCloseForm}
                task={taskEditing}
            /> : '';

        return (
            <div className="container">
                <div className='text-center'>
                    <h1>Quản lý công việc</h1><hr />
                </div>
                <div className="row">
                    <div className={isDisplayForm ? 'col-md-12 col-lg-4' : ''}>
                        {/*Form*/}
                        {elmTaskForm}
                    </div>
                    <div className={isDisplayForm ? "col-md-12 col-lg-8" : "col-md-12 col-lg-12"}>
                        <div>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={this.onToggleForm}
                            >
                                <span className='fa fa-plus mr-5'></span>Thêm công việc
                            </button>
                        </div>&nbsp;
                        {/*Search Sort*/}
                        <Control
                            onSearch={this.onSearch}
                            onSort={this.onSort}
                            sortBy={sortBy}
                            sortValue={sortValue}
                        />
                        {/*List*/}
                        <div className='row mt-15'>
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <Tasklist
                                    tasks={tasks}
                                    onUpdateStatus={this.onUpdateStatus}
                                    onDelete={this.onDelete}
                                    onUpdate={this.onUpdate}
                                    onFilter={this.onFilter}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

