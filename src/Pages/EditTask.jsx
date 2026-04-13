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
      <div className="page-enter font-cairo relative min-h-screen overflow-x-clip bg-[var(--page-background)]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div
            className="absolute inset-x-0 top-0 h-[30rem]"
            style={{ background: "var(--page-shell-top-wash)" }}
          />
          <div
            className="absolute left-[-8rem] top-[-4rem] h-[28rem] w-[28rem] rounded-full blur-[128px]"
            style={{ backgroundColor: "var(--page-shell-primary-glow)" }}
          />
          <div
            className="absolute right-[-7rem] top-[4rem] h-[24rem] w-[24rem] rounded-full blur-[120px]"
            style={{ backgroundColor: "var(--page-shell-warm-glow)" }}
          />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[72rem] px-4 py-4 sm:px-6 md:px-8 lg:px-10 lg:py-6">
          <div className="premium-panel mt-6 rounded-[32px] px-6 py-7 text-center sm:px-8">
            <div className="relative z-10">
              <h1 className="text-3xl font-black tracking-[-0.04em] text-[var(--text-strong)]">
                Task Not Found
              </h1>
              <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)] sm:text-base">
                This task is not available.
              </p>
              <div className="mt-5 flex justify-center">
                <Link
                  to="/dashboard"
                  className="ui-btn-secondary min-h-11 px-6 text-sm md:text-[0.95rem]"
                >
                  Back to Dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-enter font-cairo relative min-h-screen overflow-x-clip bg-[var(--page-background)]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-x-0 top-0 h-[30rem]"
          style={{ background: "var(--page-shell-top-wash)" }}
        />
        <div
          className="absolute left-[-8rem] top-[-4rem] h-[28rem] w-[28rem] rounded-full blur-[128px]"
          style={{ backgroundColor: "var(--page-shell-primary-glow)" }}
        />
        <div
          className="absolute right-[-7rem] top-[4rem] h-[24rem] w-[24rem] rounded-full blur-[120px]"
          style={{ backgroundColor: "var(--page-shell-warm-glow)" }}
        />
        <div className="premium-grid absolute inset-0 opacity-24 [mask-image:linear-gradient(to_bottom,black,transparent_80%)]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[78rem] px-4 py-4 sm:px-6 md:px-8 lg:px-10 lg:py-5">
        <TaskForm
          eyebrow="Edit"
          title="Edit task"
          subtitle="Update the task and keep it moving."
          submitLabel="Update task"
          badgeLabel="Edit"
          insightLabel="Task"
          insightTitle="Ready to update"
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
    </div>
  );
};

export default EditTask;
