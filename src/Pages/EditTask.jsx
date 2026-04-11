import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import TaskForm from "../components/TaskForm";
import { emptyTaskFormValues, fakeTasks } from "../fakeTasks";

const EditTask = () => {
  const navigate = useNavigate();
  const { taskId } = useParams();
  const [formValues, setFormValues] = useState({ ...emptyTaskFormValues });

  const selectedTask = fakeTasks.find((task) => task.id === taskId);

  useEffect(() => {
    if (selectedTask) {
      setFormValues({
        title: selectedTask.title,
        description: selectedTask.description,
        date: selectedTask.date,
        status: selectedTask.status,
      });
    }
  }, [selectedTask]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Edit task payload:", { taskId, ...formValues });
    navigate("/dashboard");
  };

  if (!selectedTask) {
    return (
      <div className="font-cairo min-h-screen bg-[radial-gradient(circle_at_top_left,var(--color-page-glow),transparent_32%),radial-gradient(circle_at_top_right,rgba(255,221,185,0.25),transparent_28%),var(--color-page-bg)] px-4 py-5 sm:px-6 md:px-10 lg:px-16 lg:py-7">
        <div className="mt-8 rounded-[34px] border border-[var(--color-border-strong)] bg-[var(--color-surface-elevated)] p-8 text-center shadow-[var(--color-shadow-soft)]">
          <h1 className="text-3xl font-extrabold text-[var(--color-text-primary)]">
            Task Not Found
          </h1>
          <p className="mt-3 text-sm text-[var(--color-text-secondary)]">
            This temporary edit page could not match the task id from the local
            fake data source.
          </p>
          <Link
            to="/dashboard"
            className="mt-6 inline-flex h-12 items-center justify-center rounded-2xl bg-[var(--color-primary)] px-6 text-sm font-semibold text-white transition hover:brightness-95"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="font-cairo min-h-screen bg-[radial-gradient(circle_at_top_left,var(--color-page-glow),transparent_32%),radial-gradient(circle_at_top_right,rgba(255,221,185,0.25),transparent_28%),var(--color-page-bg)] px-4 py-5 sm:px-6 md:px-10 lg:px-16 lg:py-7">
      <TaskForm
        title="Refine the task before it ships."
        subtitle="Tighten the title, adjust the timeline, and keep the next step clear for the team."
        submitLabel="Update task"
        badgeLabel="Edit task"
        values={formValues}
        onChange={handleChange}
        onStatusChange={(status) =>
          setFormValues((currentValues) => ({
            ...currentValues,
            status,
          }))
        }
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default EditTask;
