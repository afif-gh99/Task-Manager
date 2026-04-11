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
    <div className="font-cairo min-h-screen bg-[radial-gradient(circle_at_top_left,var(--color-page-glow),transparent_32%),radial-gradient(circle_at_top_right,rgba(255,221,185,0.25),transparent_28%),var(--color-page-bg)] px-4 py-5 sm:px-6 md:px-10 lg:px-16 lg:py-7">
      <TaskForm
        title="Shape the next high-impact task."
        subtitle="Capture the brief, lock the date, and give the team a crisp starting point."
        submitLabel="Create task"
        badgeLabel="Create task"
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

export default CreateTask;
