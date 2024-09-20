"use client";

import '../../styles/global.scss';
import { FiTrash } from "react-icons/fi";
import { useState } from 'react';
import styles from './todo.module.scss';
import Image from 'next/image';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

export default function Todo() {
  dayjs.locale('pt-br');

  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      setTasks([...tasks, { text: newTaskTitle, isCompleted: false }]);
      setNewTaskTitle('');
      setShowModal(false);
    }
  };

  const handleToggleTask = (taskToToggle) => {
    const newTasks = tasks.map(task =>
      task === taskToToggle
        ? { ...task, isCompleted: !task.isCompleted }
        : task
    );
    setTasks(newTasks);
  };

  const handleInputChange = (e) => {
    setNewTaskTitle(e.target.value);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNewTaskTitle('');
  };

  const handleOpenDeleteModal = (task) => {
    setTaskToDelete(task);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setTaskToDelete(null);
  };

  const handleDeleteTask = () => {
    setTasks(tasks.filter(task => task !== taskToDelete));
    setShowDeleteModal(false);
    setTaskToDelete(null);
  };

  const today = dayjs();
  let todaysDate = today.format('dddd, DD [de] MMMM [de] YYYY');
  const [dayOfWeek, restOfDate] = todaysDate.split(', ');
  todaysDate = `${dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1)}, ${restOfDate}`;

  const activeTasks = tasks.filter(task => !task.isCompleted);
  const completedTasks = tasks.filter(task => task.isCompleted);

  return (
    <div className={styles.todoContainer}>
      <div className={styles.header}>
        <Image
          src="/logo.svg"
          alt='FocalPoint Logo'
          width={150}
          height={36}
        />
        <h1 className={styles.title}>Bem-Vindo de volta, Marcus</h1>
        <p>{todaysDate}</p>
      </div>

      <div className={styles.tasksMainContainer}>
        <div className={styles.tasksContainer}>
          <p className={styles.todayTasks}>Suas tarefas de hoje</p>
          <ul className={styles.taskList}>
            {activeTasks.length > 0 ? (
              activeTasks.map((task, index) => (
                <li
                  key={index}
                  className={styles.taskItem}>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={task.isCompleted}
                    onChange={() => handleToggleTask(task)}
                    maxLength={30}
                  />
                  <p className={styles.taskText}>{task.text}</p>
                  <button onClick={() => handleOpenDeleteModal(task)}>
                    <FiTrash size={24} />
                  </button>
                </li>
              ))
            ) : (
              <p className={styles.noTasksMessage}>Você não possui tarefas criadas</p>
            )}
          </ul>
          {completedTasks.length > 0 && (
            <>
              <p className={styles.completedLabel}>Tarefas finalizadas</p>
              <ul className={styles.taskList}>
                {completedTasks.map((task, index) => (
                  <li
                    key={index}
                    className={`${styles.taskItem} ${styles.completedTask}`}>
                    <input
                      type="checkbox"
                      className={styles.checkbox}
                      checked={task.isCompleted}
                      onChange={() => handleToggleTask(task)}
                      maxLength={30}
                    />
                    <p className={styles.taskText}>{task.text}</p>
                    <button onClick={() => handleOpenDeleteModal(task)}>
                      <FiTrash size={24} />
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
        <button onClick={handleOpenModal} className={styles.addButton}>
          Adicionar nova tarefa
        </button>

        {showModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
              <h2>Nova tarefa</h2>
              <label>Título</label>
              <input
                type="text"
                value={newTaskTitle}
                onChange={handleInputChange}
                placeholder="Digite o título da tarefa"
                maxLength={35}
              />
              <div className={styles.modalButtons}>
                <button onClick={handleCloseModal} className={styles.cancelButton}>
                  Cancelar
                </button>
                <button onClick={handleAddTask} className={styles.addTaskButton}>
                  Adicionar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal de confirmação de exclusão */}
        {showDeleteModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
              <h2>Excluir Tarefa</h2>
              <p>Tem certeza que deseja excluir esta tarefa?</p>
              <div className={styles.modalButtons}>
                <button onClick={handleCloseDeleteModal} className={styles.cancelButton}>
                  Cancelar
                </button>
                <button onClick={handleDeleteTask} className={styles.deleteButton}>
                  Deletar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
