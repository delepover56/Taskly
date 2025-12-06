# TASKLY – DEVELOPMENT CONTEXT FOR AI

## PROJECT SUMMARY
Taskly is a modern task management app built in React using Vite. 
Design is dark, sleek, and uses glassmorphism (frosted glass UI). 
UI elements should match the dark navy / blue / purple gradient theme from the current mockups.

## DESIGN LANGUAGE
- Dark mode native
- Background: deep navy → blue → purple radial gradient
- UI: glassmorphism cards with blur (backdrop-filter)
- Rounded corners: 16px to 22px
- Colors:
  - #4C236D (Deep Cosmos Purple)
  - #151B42 (Midnight Indigo)
  - #101538 (Deep Night Sky)
  - #0F1028 (Core Shadow/Black Hole)
  - #7D56C4 (Highlight Violet)
  - #321E64 (Muted Nebula)
  - #141637 (Linear Gradient End)
  - glass white: rgba(255,255,255,0.12–0.45)

## TECH STACK
- "react": "^19.2.0",
- "@tailwindcss/vite": "^4.1.17",
- LocalStorage (for tasks)
- Custom Hooks
- Component-driven architecture

## FEATURES
### Tasks
- Add task with: title, description, priority, due date
- Mark task complete
- Delete task
- Edit task
- Tasks saved in localStorage automatically

### Filters
- All
- Pending
- Completed
- Priority (optional)

### Dashboard
- Sidebar (glass)
- User info box
- Task stats (completed, pending, overdue)
- Graph/Charts (optional UI-only)
- Task categories
- Priority breakdown
- Recent activity

### Modals
- Add Task Modal (glass)
- Edit Task Modal
- Delete Confirmation

### Reusable Components
- TaskCard
- FilterPills
- AddTaskInput
- ModalWrapper
- Sidebar
- Header
- StatsCard
- PriorityBadge
- GlassCard

## CODING RULES (VERY IMPORTANT)
- Use functional React components
- Use Tailwind for ALL styling
- Use custom hooks for logic (useTasks, useLocalStorageTasks)
- Use clean, readable code (no clutter)
- Prefer reusable components
- Use mobile-first responsive design
- Avoid inline styles
- Avoid random unnecessary comments

## HOW CODEX SHOULD RESPOND
When asked for code:
- Generate complete components unless asked otherwise
- Follow TailwindCSS best practices
- Use the Taskly color palette
- Follow Taskly layout & glassmorphism style
- Use consistent spacing
- Return clean JSX with proper naming
- Add basic comments ONLY where helpful

This file should always be used as global project context.