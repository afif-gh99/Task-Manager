import { useMemo, useState } from "react";
import { useOutletContext } from "react-router";
import Cards from "../components/Cards";
import ConfirmModal from "../components/ConfirmModal";
import TasksTable from "../components/TasksTable";
import { fakeTasks } from "../fakeTasks";

const Dashboard = () => {
  const { searchQuery = "" } = useOutletContext() ?? {};
  const [tasks, setTasks] = useState(fakeTasks);
  const [taskPendingDelete, setTaskPendingDelete] = useState(null);

  const normalizedSearchQuery = searchQuery.trim().toLowerCase();

  const filteredTasks = useMemo(() => {
    if (!normalizedSearchQuery) {
      return tasks;
    }

    return tasks.filter((task) =>
      task.title.toLowerCase().includes(normalizedSearchQuery),
    );
  }, [normalizedSearchQuery, tasks]);

  const counts = useMemo(
    () => ({
      total: tasks.length,
      pending: tasks.filter((task) => task.status === "pending").length,
      inProgress: tasks.filter((task) => task.status === "in-progress").length,
      done: tasks.filter((task) => task.status === "done").length,
    }),
    [tasks],
  );

  const handleTaskStatusChange = (taskId, nextStatus) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, status: nextStatus } : task,
      ),
    );
  };

  const handleDeleteTask = (taskId) => {
    const selectedTask = tasks.find((task) => task.id === taskId) ?? null;

    setTaskPendingDelete(selectedTask);
  };

  const confirmDeleteTask = () => {
    if (!taskPendingDelete) {
      return;
    }

    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskPendingDelete.id),
    );

    setTaskPendingDelete(null);
  };

  return (
    <div>
      <Cards counts={counts} />
      <TasksTable
        tasks={filteredTasks}
        onDeleteTask={handleDeleteTask}
        onTaskStatusChange={handleTaskStatusChange}
      />

      {taskPendingDelete && (
        <ConfirmModal
          title="Delete Task?"
          message={
            <>
              Are you sure you want to delete{" "}
              <span className="font-bold text-[var(--color-text-primary)]">
                {taskPendingDelete.title}
              </span>
              ? This is a temporary local delete and will remove it from the
              current dashboard view.
            </>
          }
          confirmLabel="Delete Task"
          type="danger"
          onConfirm={confirmDeleteTask}
          onCancel={() => setTaskPendingDelete(null)}
        />
      )}
    </div>
  );
};

export default Dashboard;
