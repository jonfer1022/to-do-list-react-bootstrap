import React, { useState, useEffect } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Task, Error } from '../utils/types';
import TaskModal from '../components/TaskModal';
import TableTasks from '../components/TableTasks';
import DeleteTaskModal from '../components/DeleteTaskModal';
import axiosInstance from '../utils/fetcher';
import { useNavigate } from 'react-router-dom';
import { initialsColumnsTasks } from '../utils/constants';

interface HomeProps {
  setError: (error: Error) => void
}

const Home: React.FC<HomeProps> = ({ setError }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showModal, setShowModal] = useState<[boolean, string]>([false,'create']);
  const [showRemoveModal, setShowRemoveModal] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<Partial<Task>>({});
  const [taskToRemove, setTaskToRemove] = useState<Partial<Task>>({});
  const [filterStatus, setFilterStatus] = useState<string>('');
  const navigate = useNavigate();

  const fetchData = async (statusFilter?: string) => {
    try {
      const response = await axiosInstance.get<Task[]>(`tasks?${statusFilter}`);
      setTasks(response.data);
    } catch (error: any) {
      if(error?.response?.status === 403) {
        setError({ message: error.response.data.message, status: 403 });
        navigate('/');
      } else setError({ message: 'Something went wrong', status: 500 });
    }
  };

  const handleSaveTask = (task: Partial<Task>) => {
    const fetchCreateTask = async (task: Partial<Task>) => {
      try {
        await axiosInstance.post('tasks', task);
        await fetchData();
      } catch (error: any) {
        if(error?.response?.status === 403) {
          setError({ message: error.response.data.message, status: 403 });
          navigate('/');
        } else setError({ message: 'Something went wrong', status: 500 });
      }
    }
    fetchCreateTask(task);
  };

  const handleUpdateTask = (task: Partial<Task>) => {
    const fetchUpdateTask = async (task: Partial<Task>) => {
      try {
        await axiosInstance.put(`tasks/${task.id}`, task);
        await fetchData();
      } catch (error: any) {
        if(error?.response?.status === 403) {
          setError({ message: error.response.data.message, status: 403 });
          navigate('/');
        } else setError({ message: 'Something went wrong', status: 500 });
      }
    }
    fetchUpdateTask(task);
  }

  const handleEditTask = async (task: Partial<Task>) => {
    setTaskToEdit(task);
    setShowModal([true,'edit']);  
  }

  const handleRemoveTask = async (task: Partial<Task>) => {
    setTaskToRemove(task);
    setShowRemoveModal(true);
  }

  const handleDeleteTask = (taskId: string) => {
    const fetchDeleteTask = async (taskId: string) => {
      try {
        await axiosInstance.delete(`tasks/${taskId}`);
        await fetchData();
      } catch (error: any) {
        if(error?.response?.status === 403) {
          setError({ message: error.response.data.message, status: 403 });
          navigate('/');
        } else setError({ message: 'Something went wrong', status: 500 });
      }
    }
    fetchDeleteTask(taskId);
  }

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilterTasks = (option: string) => {
    setFilterStatus(option);
    if(option === 'allTasks') {
      fetchData();
    } else {
      fetchData(`status=${option}`);
    }  
  }

  return (
    <Container className='mt-4'>
      <div className="d-flex justify-content-between mb-3">
        <Button  variant="primary" onClick={() => setShowModal([true,'create'])}>Add Task</Button>
        <div className="d-flex align-items-center">
          <span className="me-2">Filter by:</span>
          <Form.Group controlId="status">
            <Form.Select value={filterStatus} onChange={e => handleFilterTasks(e.target.value)}>
              <option value="allTasks">All tasks</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </Form.Select>
          </Form.Group>
        </div>
      </div>
      <TableTasks 
        dataSource={tasks} 
        columns={initialsColumnsTasks} 
        onClickEdit={handleEditTask}
        onClickDelete={handleRemoveTask}
      />
      <TaskModal
        task={taskToEdit} 
        show={showModal[0]}
        action={showModal[1]}
        onClose={() => {
          setTaskToEdit({});
          setShowModal([false, showModal[1]])
        }}
        onSave={(newTask) => {
          if(showModal[1] === 'create') {
            handleSaveTask(newTask);
          } else {
            handleUpdateTask(newTask);
          }
        }}
      />
      <DeleteTaskModal
        task={taskToRemove}
        showModal={showRemoveModal}
        onClose={() => {
          setShowRemoveModal(false)
          setTaskToRemove({});
        }}
        onDelete={handleDeleteTask}
      />
    </Container>
  );
};

export default Home;