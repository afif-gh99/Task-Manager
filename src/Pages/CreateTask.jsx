import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import TaskForm from "../components/TaskForm";
import { emptyTaskFormValues } from "../constants/taskForm";
import { getApiErrorMessage } from "../lib/api/getApiErrorMessage";
import { taskService } from "../services/taskService";

const CreateTask = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({ ...emptyTaskFormValues });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !formValues.title ||
      !formValues.description ||
      !formValues.date ||
      !formValues.status
    ) {
      toast.error("Please complete all task fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      const requestBody = {
        title: formValues.title,
        description: formValues.description,
        date: formValues.date,
        status: formValues.status,
      };

      const response = await taskService.createTask(requestBody);
      toast.success(response?.message || "Task created successfully.");
      navigate("/dashboard");
    } catch (error) {
      toast.error(
        getApiErrorMessage(error, "We could not create this task right now."),
      );
    } finally {
      setIsSubmitting(false);
    }
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
        isSubmitting={isSubmitting}
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
