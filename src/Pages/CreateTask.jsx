// This page creates a new task.
// It owns the task form state, validates required fields, sends the create
// request, and redirects back to the dashboard after success.
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import TaskForm from "../components/TaskForm";
import { emptyTaskFormValues } from "../constants/taskForm";
import { getApiErrorMessage } from "../lib/api/getApiErrorMessage";
import { taskService } from "../services/taskService";

const CreateTask = () => {
  const navigate = useNavigate();
  // Form state stays local to this page so the shared TaskForm stays presentational.
  const [formValues, setFormValues] = useState({ ...emptyTaskFormValues });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Updates one field in the local form state.
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));
  };

  // Submit flow:
  // 1. validate required fields
  // 2. send the create request
  // 3. show feedback
  // 4. return to the dashboard
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
      // The service will map UI status values before sending them to the API.
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
