import { taskListSchema } from "@/features/tasks/model/taskSchema";

const rawSeedTasks = [
    {
        id: "878c6930-116e-4807-b692-2272dabb5674",
        title: "Plan Taskly data model",
        description: "Define and validate the structure of every Taskly task.",
        category: "Study",
        priority: "High",
        dueDate: "2026-07-21",
        tags: ["Desk", "Deep_Work"],
        createdAt: "2026-07-21T08:00:00.000Z",
        updatedAt: "2026-07-21T08:00:00.000Z",
    },
    {
        id: "878c6930-116e-4807-b692-2272dabb5675",
        title: "Integrate Taskly data model",
        description: "Integrate and validate the structure of every Taskly task.",
        category: "Work",
        priority: "Medium",
        dueDate: "2026-07-24",
        tags: ["Desk", "Review"],
        createdAt: "2026-07-21T08:00:00.000Z",
        updatedAt: "2026-07-21T08:00:00.000Z",
    },
    {
        id: "2b372135-bf91-4fb6-a7b2-621dbef2598d",
        title: "Review Taskly accessibility checklist",
        description: "Check keyboard navigation, labels, and visible focus states.",
        category: "Work",
        priority: "Low",
        dueDate: "2026-07-20",
        tags: ["Review", "Solo"],
        createdAt: "2026-07-19T09:00:00.000Z",
        updatedAt: "2026-07-20T14:30:00.000Z",
        completed: true,
        completedAt: "2026-07-20T14:30:00.000Z",
    },
    {
        id: "7e6a1c42-9d58-4f21-a3b7-6c90e8d14f52",
        title: "Organize old Taskly planning notes",
        description: "Archive outdated planning material that is no longer actively needed.",
        category: "Personal",
        priority: "Medium",
        dueDate: "2026-07-18",
        tags: ["Home", "Admin"],
        createdAt: "2026-07-15T11:00:00.000Z",
        updatedAt: "2026-07-19T16:45:00.000Z",
        archived: true,
        archivedAt: "2026-07-19T16:45:00.000Z",
    }
]

export const seedTasks = taskListSchema.parse(rawSeedTasks);