import React, { useEffect, useState } from "react";
import { StContainer } from "../../styles/FormStyles";
import styled from "styled-components";
import { getAccessToken } from "../token/handleToken";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StAddTodoForm = styled.form`
  display: flex;
  gap: 20px;
`;

const StEditForm = styled.form`
  display: flex;
  gap: 15px;
`;

const StLi = styled.li`
  display: flex;
  margin: 10px;
`;

const StTodo = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  align-items: center;
`;
const StButton = styled.button`
  background-color: ${(props) => (props.disabled ? "gray" : "white")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  border: 1px solid;
  font-weight: 700;
  padding: 10px;
  :hover {
    background-color: ${(props) => (props.disabled ? "#757575" : "#eeeeee")};
  }
`;
const Todo = () => {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [editTodo, setEditTodo] = useState("");
  const [editTodoId, setEditTodoId] = useState(null);

  const access_token = getAccessToken();
  const navigate = useNavigate();

  const handleTodoInput = (e) => {
    setTodo(e.target.value);
  };

  const createTodo = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://www.pre-onboarding-selection-task.shop/todos",
        { todo },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setTodoList([...todoList, response.data]);
      setTodo("");
    } catch (error) {
      alert("Todo 추가 실패");
    }
  };

  const updateTodo = async (e, data) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://www.pre-onboarding-selection-task.shop/todos/${data.id}`,
        { todo: editTodo, isCompleted: data.isCompleted },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const updatedTodoList = todoList.map((todo) =>
        todo.id === data.id ? { ...data, todo: editTodo } : todo
      );
      setTodoList(updatedTodoList);
      setEditTodo("");
      setEditTodoId(null);
    } catch (error) {
      alert("Todo 수정 실패");
    }
  };

  const updateCheck = async (e, data) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://www.pre-onboarding-selection-task.shop/todos/${data.id}`,
        { todo: data.todo, isCompleted: !data.isCompleted },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const updatedTodoList = todoList.map((todo) =>
        todo.id === data.id ? response.data : todo
      );
      setTodoList(updatedTodoList);
    } catch (error) {
      alert("Todo 수정 실패");
    }
  };

  const deleteTodo = async (e, data) => {
    try {
      await axios.delete(
        `https://www.pre-onboarding-selection-task.shop/todos/${data.id}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      const updatedTodoList = todoList.filter((todo) => todo.id !== data.id);
      setTodoList(updatedTodoList);
    } catch (error) {
      alert("Todo 삭제 실패");
    }
  };

  const openEditTodo = (e, data) => {
    e.preventDefault();
    setEditTodo(data.todo);
    setEditTodoId(data.id);
  };

  const closeEditTodo = () => {
    setEditTodoId("");
    setEditTodoId(null);
  };

  const handleEditTodoChange = (e) => {
    setEditTodo(e.target.value);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    alert("로그아웃 했습니다");
    navigate("/");
  };

  useEffect(() => {
    const isToken = getAccessToken();
    if (!isToken) {
      navigate("/signin");
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          "https://www.pre-onboarding-selection-task.shop/todos",
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
        setTodoList([...response.data]);
      } catch (error) {
        console.log("todo 불러오기 실패");
      }
    })();
  }, []);

  return (
    <StContainer>
      <h1>투두리스트</h1>
      <StButton onClick={handleLogout}>로그아웃</StButton>
      <StAddTodoForm onSubmit={createTodo}>
        <input
          data-testid="new-todo-input"
          value={todo}
          onChange={handleTodoInput}
        />
        <StButton data-testid="new-todo-add-button" type="submit">
          추가
        </StButton>
      </StAddTodoForm>
      <ul>
        {todoList.map((data) => {
          return (
            <StLi key={data.id}>
              <input
                type="checkbox"
                checked={data.isCompleted}
                onChange={(e) => updateCheck(e, data)}
              />
              {editTodoId === data.id ? (
                <StEditForm onSubmit={(e) => updateTodo(e, data)}>
                  <input
                    data-testid="modify-input"
                    value={editTodo}
                    onChange={handleEditTodoChange}
                  />
                  <StButton data-testid="submit-button">제출</StButton>
                  <StButton data-testid="cancel-button" onClick={closeEditTodo}>
                    취소
                  </StButton>
                </StEditForm>
              ) : (
                <StTodo>
                  <span>{data.todo}</span>
                  <StButton
                    data-testid="modify-button"
                    onClick={(e) => openEditTodo(e, data)}
                  >
                    수정
                  </StButton>
                  <StButton
                    data-testid="delete-button"
                    onClick={(e) => deleteTodo(e, data)}
                  >
                    삭제
                  </StButton>
                </StTodo>
              )}
            </StLi>
          );
        })}
      </ul>
    </StContainer>
  );
};

export default Todo;
