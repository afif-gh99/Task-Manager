// This page edits an existing task.
// It loads the selected task, hydrates the shared form, then sends
// an update request when the user saves their changes.
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import TaskForm from "../components/TaskForm";
import { emptyTaskFormValues } from "../constants/taskForm";

const API_BASE_URL = "/api";

const EditTask = () => {
  const navigate = useNavigate();
  const { taskId } = useParams();
  // Local page state keeps the loading, submit, and selected task flow easy to follow.
  const [formValues, setFormValues] = useState({ ...emptyTaskFormValues });
  const [selectedTask, setSelectedTask] = useState();
  const [isLoadingTask, setIsLoadingTask] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initial load:
  // fetch the task by id, then copy the backend values into local form state.
  useEffect(() => {
    let isMounted = true;

    const loadTask = async () => {
      setIsLoadingTask(true);

      try {
        const response = await axios.get(`${API_BASE_URL}/tasks/${taskId}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        const task = response.data?.data ?? response.data;

        if (!isMounted) {
          return;
        }

        setSelectedTask(task ?? null);

        if (task) {
          setFormValues({
            title: task.title ?? emptyTaskFormValues.title,
            description: task.description ?? emptyTaskFormValues.description,
            date: task.date ?? emptyTaskFormValues.date,
            status: task.status ?? emptyTaskFormValues.status,
          });
        }
      } catch (err) {
        if (isMounted) {
          const serverMsg = err.response?.data?.message;

          toast.error(serverMsg || "We could not load this task right now.");
          console.log(err);
          setSelectedTask(null);
        }
      } finally {
        if (isMounted) {
          setIsLoadingTask(false);
        }
      }
    };

    loadTask();

    return () => {
      isMounted = false;
    };
  }, [taskId]);

  // Updates one field in the edit form state.
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));
  };

  // Submit flow mirrors the create page, but targets the update endpoint instead.
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

      const response = await axios.put(
        `${API_BASE_URL}/tasks/${taskId}`,
        requestBody,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        },
      );

      toast.success(response.data?.message || "Task updated successfully.");
      navigate("/dashboard");
    } catch (err) {
      const serverMsg = err.response?.data?.message;

      toast.error(serverMsg || "We could not update this task right now.");
      console.log(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingTask) {
    return (
      <div className="font-cairo min-h-screen bg-[radial-gradient(circle_at_top_left,var(--color-page-glow),transparent_32%),radial-gradient(circle_at_top_right,rgba(255,221,185,0.25),transparent_28%),var(--color-page-bg)] px-4 py-5 sm:px-6 md:px-10 lg:px-16 lg:py-7">
        <div className="mt-8 rounded-[34px] border border-(--color-border-strong) bg-(--color-surface-elevated) p-8 text-center shadow-(--color-shadow-soft)">
          <p className="text-base font-semibold text-(--color-text-secondary)">
            Loading task...
          </p>
        </div>
      </div>
    );
  }

  if (selectedTask === null) {
    return (
      <div className="font-cairo min-h-screen bg-[radial-gradient(circle_at_top_left,var(--color-page-glow),transparent_32%),radial-gradient(circle_at_top_right,rgba(255,221,185,0.25),transparent_28%),var(--color-page-bg)] px-4 py-5 sm:px-6 md:px-10 lg:px-16 lg:py-7">
        <div className="mt-8 rounded-[34px] border border-(--color-border-strong) bg-(--color-surface-elevated) p-8 text-center shadow-(--color-shadow-soft)">
          <h1 className="text-3xl font-extrabold text-(--color-text-primary)">
            Task Not Found
          </h1>
          <p className="mt-3 text-sm text-(--color-text-secondary)">
            We could not load this task from the configured data source.
          </p>
          <Link
            to="/dashboard"
            className="mt-6 inline-flex h-12 items-center justify-center rounded-2xl bg-(--color-primary) px-6 text-sm font-semibold text-white transition hover:brightness-95"
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

export default EditTask;
