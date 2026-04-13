import { useState } from "react";
import { useNavigate } from "react-router";
import TaskForm from "../components/TaskForm";
import { emptyTaskFormValues } from "../fakeTasks";

const CreateTask = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({ ...emptyTaskFormValues });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Create task payload:", formValues);
    navigate("/dashboard");
  };

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
          eyebrow="Create"
          title="Create task"
          subtitle="Add the task and set its first status."
          submitLabel="Create task"
          badgeLabel="Create"
          insightLabel="Task"
          insightTitle="Ready to create"
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

export default CreateTask;
