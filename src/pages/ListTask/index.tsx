import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Badge, Button, Table } from 'react-bootstrap';
import moment from 'moment';

import Api from '../../services/api';
import { ITask } from '../../interfaces/task';

const ListTask: React.FC = () => {
  const history = useHistory();

  const [tasks, setTasks] = useState<ITask[]>([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const resp = await Api.get<ITask[]>('/tasks');

    setTasks(resp.data);
  };

  const formatDate = (date: string) => moment(date).format('DD/MM/YYYY HH:mm:ss');

  const createTask = () => history.push('/tasks/create');

  const editTask = (id?: number) => history.push(`/tasks/${id}`);

  const finishTask = async (task: ITask) => {
    const data = { ...task, finished: true, updatedAt: moment().format() };

    await Api.put<ITask[]>(`/tasks/${task.id}`, data);

    loadTasks();
  };

  const deleteTask = async (id?: number) => {
    await Api.delete<ITask[]>(`/tasks/${id}`);

    loadTasks();
  };

  return (
    <>
      <div className="task-header mt-4">
        <h1>Atividades</h1>

        <Button variant="dark" onClick={createTask}>Nova atividade</Button>
      </div>

      <Table className="mt-4" striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Título</th>
            <th>Descrição</th>
            <th>Atualização</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            tasks.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.description}</td>
                <td>{item.updatedAt ? formatDate(item.updatedAt) : ''}</td>
                <td>
                  <h5>
                    <Badge variant={item.finished ? 'success' : 'warning'}>
                      {item.finished ? 'Concluída' : 'Pendente'}
                    </Badge>
                  </h5>
                </td>
                <td className="text-center">
                  <Button size="sm" className="mr-2" onClick={() => editTask(item.id)} disabled={item.finished}>
                    Editar
                  </Button>
                  <Button size="sm" variant="success" className="mr-2" onClick={() => finishTask(item)} disabled={item.finished}>
                    Finalizar
                  </Button>
                  <Button size="sm" variant="danger" onClick={() => deleteTask(item.id)}>
                    Remover
                  </Button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    </>
  );
}

export default ListTask;
