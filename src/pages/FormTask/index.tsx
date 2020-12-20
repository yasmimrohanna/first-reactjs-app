import React, { ChangeEvent, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Card, Form } from 'react-bootstrap';
import moment from 'moment';

import Api from '../../services/api';
import { ITask } from '../../interfaces/task';

const FormTask: React.FC = () => {
  const history = useHistory();
  const params = useParams<{ id: string }>();

  const [model, setModel] = useState<ITask>({
    title: '',
    description: '',
    finished: false
  });

  useEffect(() => {

    if (params.id) {
      getTask(params.id);
    }

  }, [params]);

  const updateModel = (e: ChangeEvent<HTMLInputElement>) => {
    setModel({ ...model, [e.target.name]: e.target.value });
  };

  const backPage = () => history.goBack();

  const getTask = async (id: string) => {
    const response = await Api.get<ITask>(`/tasks/${id}`);

    setModel(response.data);
  };

  const onSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (model.id) {
      const data = { ...model, updatedAt: moment().format() };

      await Api.put(`/tasks/${model.id}`, data);

    } else {
      const data = { ...model, createdAt: moment().format(), updatedAt: moment().format() };

      await Api.post('/tasks', data);
    }

    backPage();
  };

  return (
    <>
      <div className="task-header my-4">
        <h1>Nova atividade</h1>

        <Button variant="dark" onClick={backPage}>Voltar</Button>
      </div>

      <Card body>
        <Form onSubmit={onSubmit}>
          <Form.Group controlId="title">
            <Form.Label>Título</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={model.title}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)} />
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>Descrição</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              name="description"
              value={model.description}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)} />
          </Form.Group>

          <Button variant="dark" type="submit" className="mt-4">
            Salvar
          </Button>
        </Form>
      </Card>
    </>
  );
}

export default FormTask;
