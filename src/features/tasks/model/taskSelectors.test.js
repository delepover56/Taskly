import { describe, expect, it } from 'vitest'
import {
    selectArchivedTasks,
    selectCompletedTasks,
    selectHighPriorityTasks,
    selectLowPriorityTasks,
    selectMediumPriorityTasks,
    selectNonArchivedTasks,
    selectTodaysTasks,
    selectUpcomingTasks,
} from './taskSelectors'

describe('task selectors', () => {
    it('removes archived tasks', () => {
        const tasks = [
            { id: 'active-task', archived: false },
            { id: 'archived-task', archived: true },
        ]

        const result = selectNonArchivedTasks(tasks)

        expect(result).toEqual([
            { id: 'active-task', archived: false },
        ])
    })
    it("returns today's incomplete and non-archived tasks", () => {
        const tasks = [
            {
                id: 'correct-task',
                dueDate: '2026-07-24',
                completed: false,
                archived: false,
            },
            {
                id: 'completed-task',
                dueDate: '2026-07-24',
                completed: true,
                archived: false,
            },
            {
                id: 'archived-task',
                dueDate: '2026-07-24',
                completed: false,
                archived: true,
            },
            {
                id: 'future-task',
                dueDate: '2026-07-25',
                completed: false,
                archived: false,
            },
        ]

        const result = selectTodaysTasks(tasks, '2026-07-24')

        expect(result).toEqual([
            {
                id: 'correct-task',
                dueDate: '2026-07-24',
                completed: false,
                archived: false,
            },
        ])
    })

    it('returns future incomplete and non-archived tasks', () => {
        const tasks = [
            { id: 'future', dueDate: '2026-07-25', completed: false, archived: false },
            { id: 'today', dueDate: '2026-07-24', completed: false, archived: false },
            { id: 'completed-future', dueDate: '2026-07-25', completed: true, archived: false },
            { id: 'archived-future', dueDate: '2026-07-25', completed: false, archived: true },
        ]

        expect(selectUpcomingTasks(tasks, '2026-07-24')).toEqual([tasks[0]])
    })

    it('returns the correct incomplete and non-archived priority tasks', () => {
        const tasks = [
            { id: 'high', priority: 'High', completed: false, archived: false },
            { id: 'medium', priority: 'Medium', completed: false, archived: false },
            { id: 'low', priority: 'Low', completed: false, archived: false },
            { id: 'completed-high', priority: 'High', completed: true, archived: false },
            { id: 'archived-medium', priority: 'Medium', completed: false, archived: true },
        ]

        expect(selectHighPriorityTasks(tasks)).toEqual([tasks[0]])
        expect(selectMediumPriorityTasks(tasks)).toEqual([tasks[1]])
        expect(selectLowPriorityTasks(tasks)).toEqual([tasks[2]])
    })

    it('returns completed and non-archived tasks', () => {
        const tasks = [
            { id: 'completed', completed: true, archived: false },
            { id: 'incomplete', completed: false, archived: false },
            { id: 'completed-archived', completed: true, archived: true },
        ]

        expect(selectCompletedTasks(tasks)).toEqual([tasks[0]])
    })

    it('returns archived tasks', () => {
        const tasks = [
            { id: 'archived', archived: true },
            { id: 'active', archived: false },
        ]

        expect(selectArchivedTasks(tasks)).toEqual([tasks[0]])
    })
})
