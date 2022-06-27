import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ITodo } from '../types/types';

type TodoItemPageParams = {
    id: string;
};

const TodoItemPage: FC = () => {
    const [todo, setTodo] = useState<ITodo | null>(null);
    const params = useParams<TodoItemPageParams>();
    const navigate = useNavigate();

    useEffect(() => {
        fetchTodo();
    }, []);

    async function fetchTodo() {
        try {
            const response = await axios.get<ITodo>(
                'https://jsonplaceholder.typicode.com/todos/' + params.id,
            );
            setTodo(response.data);
        } catch (e) {
            alert(e);
        }
    }
    console.log(todo);

    return (
        <div>
            <button onClick={() => navigate('/todos')}>back</button>
            <h1>
                <input type="checkbox" checked={todo?.completed} />
                {todo?.id}. {todo?.title}
            </h1>
        </div>
    );
};

export default TodoItemPage;
