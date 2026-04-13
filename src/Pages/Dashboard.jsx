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
  const completionRate =
    tasks.length === 0 ? 0 : Math.round((counts.done / tasks.length) * 100);
  const activeTasks = counts.pending + counts.inProgress;

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
    <div className="space-y-5 lg:space-y-6">
      <section className="premium-panel rounded-[34px] px-4 py-4 sm:px-6 sm:py-5 lg:px-7 lg:py-5">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-[-4%] w-[12rem] bg-[radial-gradient(circle,rgba(124,160,255,0.14)_0%,rgba(124,160,255,0.04)_32%,transparent_72%)] blur-[72px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-10 top-0 h-px w-32"
          style={{ background: "var(--panel-top-line)" }}
        />

        <div className="relative z-10 grid gap-4 xl:grid-cols-[minmax(0,1.45fr)_minmax(18rem,0.72fr)] xl:items-start xl:gap-4">
          <div className="min-w-0 max-w-[38rem]">
            <div className="ui-glass-chip inline-flex items-center gap-2 rounded-full px-4 py-2 text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[var(--text-secondary)]">
              <span className="h-2 w-2 rounded-full bg-[var(--brand-primary-500)]" />
              Workspace
            </div>

            <h1 className="mt-3 text-3xl font-black tracking-[-0.05em] text-[var(--text-strong)] sm:text-[2.4rem] lg:text-[2.75rem] lg:leading-[1.06]">
              Task command center
            </h1>

            <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)] sm:text-base">
              Focus, progress, and priorities in one view.
            </p>
          </div>

          <div className="grid min-w-0 grid-cols-2 gap-2.5 xl:max-w-[21rem] xl:self-start">
            <div className="ui-glass-tile rounded-[22px] px-4 py-3.5">
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.22em] text-[var(--text-tertiary)]">
                Done
              </p>
              <div className="mt-2 text-[2rem] font-black tracking-[-0.06em] text-[var(--text-strong)]">
                {completionRate}%
              </div>
            </div>

            <div className="ui-glass-tile rounded-[22px] px-4 py-3.5">
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.22em] text-[var(--text-tertiary)]">
                Active
              </p>
              <div className="mt-2 text-[2rem] font-black tracking-[-0.06em] text-[var(--text-strong)]">
                {activeTasks}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[0.8rem] font-semibold uppercase tracking-[0.22em] text-[var(--text-tertiary)]">
              Snapshot
            </p>
            <h2 className="mt-1.5 text-2xl font-black tracking-[-0.04em] text-[var(--text-strong)] sm:text-[2rem]">
              Metrics
            </h2>
          </div>
        </div>

        <Cards counts={counts} />
      </section>

      <div className="pt-1">
        <TasksTable
          tasks={filteredTasks}
          onDeleteTask={handleDeleteTask}
          onTaskStatusChange={handleTaskStatusChange}
        />
      </div>

      {taskPendingDelete && (
        <ConfirmModal
          title="Delete Task?"
          message={
            <>
              Delete{" "}
              <span className="font-bold text-[var(--color-text-primary)]">
                {taskPendingDelete.title}
              </span>
              {" "}from this dashboard view?
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
