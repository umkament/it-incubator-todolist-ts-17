import React, { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { FilterValuesType, todolistsActions, todolistsThunks } from "./todolists-reducer";
import { tasksThunks } from "./tasks-reducer";
import { Grid, Paper } from "@mui/material";
import { Todolist } from "./Todolist/Todolist";
import { Navigate } from "react-router-dom";
import { useAppDispatch } from "common/hooks/useAppDispatch";
import { selectTodolists } from "features/TodolistsList/todolists-selector";
import { selectTasks } from "features/TodolistsList/tasks-selector";
import { selectAuthIsLoggedIn } from "features/Login/auth-selector";
import { AddItemForm } from "common/components/AddItemForm";
import { TaskStatuses } from "common/enum";

type PropsType = {
  demo?: boolean;
};

export const TodolistsList: React.FC<PropsType> = ({ demo = false }) => {
  const todolists = useSelector(selectTodolists);
  const tasks = useSelector(selectTasks);
  const isLoggedIn = useSelector(selectAuthIsLoggedIn);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (demo || !isLoggedIn) {
      return;
    }
    const thunk = todolistsThunks.fetchTodolists();
    dispatch(thunk);
  }, []);

  const removeTask = useCallback(
    function (taskId: string, todolistId: string) {
      const thunk = tasksThunks.removeTask({ taskId, todolistId });
      dispatch(thunk);
    },
    [dispatch]
  );

  const addTask = useCallback(
    function (title: string, todolistId: string) {
      dispatch(tasksThunks.addTask({ title, todolistId }));
    },
    [dispatch]
  );

  const changeStatus = useCallback(
    function (taskId: string, status: TaskStatuses, todolistId: string) {
      const thunk = tasksThunks.updateTask({ taskId, domainModel: { status }, todolistId });
      dispatch(thunk);
    },
    [dispatch]
  );

  const changeTaskTitle = useCallback(
    function (taskId: string, newTitle: string, todolistId: string) {
      const thunk = tasksThunks.updateTask({ taskId, domainModel: { title: newTitle }, todolistId });
      dispatch(thunk);
    },
    [dispatch]
  );

  const changeFilter = useCallback(
    function (value: FilterValuesType, todolistId: string) {
      const action = todolistsActions.changeTodolistFilter({ id: todolistId, filter: value });
      dispatch(action);
    },
    [dispatch]
  );

  const removeTodolist = useCallback(
    function (todolistId: string) {
      const thunk = todolistsThunks.removeTodolist({ todolistId });
      dispatch(thunk);
    },
    [dispatch]
  );

  const changeTodolistTitle = useCallback(
    function (id: string, title: string) {
      const thunk = todolistsThunks.changeTodolistTitle({ todolistId: id, title });
      dispatch(thunk);
    },
    [dispatch]
  );

  const addTodolist = useCallback(
    (title: string) => {
      const thunk = todolistsThunks.addTodolist({ title });
      dispatch(thunk);
    },
    [dispatch]
  );

  if (!isLoggedIn) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <Grid container style={{ padding: "20px" }}>
        <AddItemForm addItem={addTodolist} />
      </Grid>
      <Grid container spacing={3}>
        {todolists.map((tl) => {
          let allTodolistTasks = tasks[tl.id];

          return (
            <Grid item key={tl.id}>
              <Paper style={{ padding: "10px" }}>
                <Todolist
                  todolist={tl}
                  tasks={allTodolistTasks}
                  removeTask={removeTask}
                  changeFilter={changeFilter}
                  addTask={addTask}
                  changeTaskStatus={changeStatus}
                  removeTodolist={removeTodolist}
                  changeTaskTitle={changeTaskTitle}
                  changeTodolistTitle={changeTodolistTitle}
                  demo={demo}
                />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
